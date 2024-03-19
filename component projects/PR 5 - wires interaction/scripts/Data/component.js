class Component {
    constructor({name, type, specs, dimensions, isRotatable, isAttached = false, defaultSource, images, slots}) {
        // Description
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
    }
}

export default Component