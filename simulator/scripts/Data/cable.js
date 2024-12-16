class Cable {
    constructor({id, name, type, ends, images}) {
        this.id = id
        this.name = name
        this.type = type
        this.ends = ends                                
        this.images = images

        Object.keys(this.ends).forEach(key => {
            this.ends[key].portAttachedTo = null
        })
    }   
}

export default Cable