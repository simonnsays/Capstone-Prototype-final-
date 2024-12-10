class Cable {
    constructor({id, name, type, ends, images}) {
        this.id = id
        this.name = name
        this.type = type
        this.ends = ends                                
        this.images = images

        Object.keys(this.ends).forEach(key => {
            this.ends[key].portAttached = null
        })
    }

    adjustCableModularity(component) {
        switch(component.specs.cableModularity) {
            case 'non-modular':
                this.ends[component.type].connected = true
                break
            case 'semi-modular':
                if(this.name === 'ATX power' || this.name === 'CPU Connector') {
                    this.ends[component.type].connected = true
                }
                break
            case 'modular':
                this.ends[component.type].connected = false
                break
            default:
                console.error('no modularity attribut found')
        }
    }

    
}

export default Cable