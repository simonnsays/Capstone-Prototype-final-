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

    adjustCableModularity(component, cableClone) {
        switch(component.specs.cableModularity) {
            case 'non-modular':
                cableClone.ends[component.type].connected = true
                break
            case 'semi-modular':
                if(cableClone.name === 'ATX power' || cableClone.name === 'CPU Connector') {
                    cableClone.ends[component.type].connected = true
                }
                break
            case 'modular':
                cableClone.ends[component.type].connected = false
                break
            default:
                console.error('no modularity attribut found')
        }
        console.log(component)
    }
}

export default Cable