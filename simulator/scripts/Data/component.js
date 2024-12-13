class Component {
    constructor({
        id,
        name, 
        type, 
        specs, 
        dimensions, 
        isRotatable, 
        isAttached = false, 
        defaultSource, 
        images, 
        slots = [], 
        ports = [],
        cables = []
    }) {

        // Description
        this.id = id
        this.name = name
        this.type = type
        this.specs = specs
        this.dimensions = dimensions
        
        // Image
        this.images = images
        this.defaultSource = defaultSource

        // States
        this.isRotatable = isRotatable
        this.isAttached = isAttached

        // Slots
        this.slots = slots

        // Ports
        this.ports = ports

        // Cables
        this.cables = cables
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

    adjustPortAndCableModularity(component) {
        component.ports.forEach(port => {
            console.log (port)    
        })
    }
}

export default Component