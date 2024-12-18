class Component {
    constructor({
        id,
        name, 
        type,
        size, 
        specs,
        watts,
        dimensions, 
        isRotatable, 
        isAttached = false,
        isModular = false, // if psu is non modular set value to false | if psu is modular set value to true
        defaultSource, 
        images, 
        slots = [], 
        ports = [],
        cables = []
    }) {

        // Description
        this.id = id
        this.name = name
        this.size = size
        this.type = type
        this.specs = specs
        this.dimensions = dimensions
        
        // Image
        this.images = images
        this.defaultSource = defaultSource

        // States
        this.isRotatable = isRotatable
        this.isAttached = isAttached
        this.isModular = isModular 

        // Slots
        this.slots = slots

        // Ports
        this.ports = ports

        // Cables
        this.cables = cables

        // Wattage
        this.watts = watts

        if(this.type === 'psu') {
            switch(this.specs.cableModularity) {
                case 'non-modular':
                    this.ports.push({type: 'non-modular'})
                    break
                case 'semi-modular':
                    this.ports.push({type: 'semi-modular'})
            }
        }
    }

    handleComponent(component) {
        // Handle Image dimensions
        component.images.forEach(element => { 
            // adjust width and height depending on side
            switch(element.side) {
                case 'left':
                case 'right':
                    element.width = component.dimensions.depth
                    element.height = component.dimensions.height
                    break
                case 'front':
                case 'rear':
                    element.width = component.dimensions.width
                    element.height = component.dimensions.height
                    break
                default:
                    element.width = component.dimensions.width
                    element.height = component.dimensions.height
            }
        })
    }

    findAvailablePort(cable) {
        // find the next available port that matches the cable type
        return this.ports.find(port => 
            Object.keys(port.offset).some(key => 
                port.offset[key].takes === cable.type && !port.offset[key].cableAttached)
        ) || null
    }

    attachCable(port, cable, componentType) {
        Object.keys(port.offset).forEach(key => {
            const currentOffset = port.offset[key]

            if(!currentOffset.cableAttached && !cable.ends[componentType].connected) {
                currentOffset.cableAttached = cable
                cable.ends[componentType].connected = true
            }
        })
    }
}

export default Component