class UtilityTool {
    constructor() {
        this.idCount = 1
    }
    // Is point inside Box
    isInsideBox(point, box) {
        return point.x > box.x &&
            point.x < box.x + box.width &&
            point.y > box.y &&
            point.y < box.y + box.height
    }    

    makeItemElement(item, imageSource){
        // CREATE THE DIV
        const element = document.createElement('div')
        element.classList = 'content'
        element.id = item.name

        // CREATE IMAGE FOR THE DIV
        const image = new Image()
        image.src = imageSource
        image.style.width = '100%'
        image.style.height = '100%'
        image.alt = item.name
        element.appendChild(image)

        // CREATE SLIDER DIV FOR TITLE
        const slider = document.createElement('div')
        slider.classList = 'slider'
        slider.textContent = item.name + ' (' + item.type + ')'
        element.appendChild(slider)
        return element  
    }

    createID(component) {
        const types = {
            chassis: 'ch',
            cpu: 'cp',
            gpu: 'gp'
        }

        if (!types.hasOwnProperty(component.type)) {
            throw new Error('Not Supported Component')
        }

        const count = this.idCount.toString()
        const typePrefix = types[component.type]
        let id = null

        switch(count.length) {
            case 1:
                id  = typePrefix + ('0' + '0' + count)
                break
            case 2:
                id  = typePrefix + ('0' + count)
                break
            default:
                id  = typePrefix + count
                break
        }
        
        component.id = id
        this.idCount++
        console.log(count.length)
    }

    getSide(component, side) {
        return component.images.find(element => element.side == side) || null
    }

    determineScale(componentHeight, baseHeight) {
        // start with 1 as scale and lower if it still doesnt fit
        let scale = 1
        while (componentHeight * scale > baseHeight && scale > 0 ) {
            scale -= .1
        }
    
        return scale
    }
}

export default UtilityTool