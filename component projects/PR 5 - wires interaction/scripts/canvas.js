class Canvas {
    constructor(elementHandler, utilityTool, displayArea) {
        // Utility
        this.elementHandler = elementHandler
        this.utilityTool = utilityTool
        
        // Canvas Area
        this.element = elementHandler.getCanvas()
        if(!this.element) {
            throw new Error('no canvas element found')
        }
        this.element.width = 1300
        this.element.height = 680
        this.c = this.element.getContext('2d')

        // Display Area
        this.displayArea = displayArea
    }

    clear() {
        this.c.clearRect(0, 0, this.element.width, this.element.height)
    }

    fillRoundRect(left, top, width, height, radius) {
        this.c.beginPath();
        this.c.moveTo(left + radius, top);
        this.c.lineTo(left + width - radius, top);
        this.c.arcTo(left + width, top, left + width, top + radius, radius);
        this.c.lineTo(left + width, top + height - radius);
        this.c.arcTo(left + width, top + height, left + width - radius, top + height, radius);
        this.c.lineTo(left + radius, top + height);
        this.c.arcTo(left, top + height, left, top + height - radius, radius);
        this.c.lineTo(left, top + radius);
        this.c.arcTo(left, top, left + radius, top, radius);

        // any color you want
        this.c.fillStyle = '#527e71'; // dark 
        this.c.fillStyle = '#c7ddcc'; // light 
        this.c.fill();
    }

    drawComponent(box, image) {
        this.c.drawImage(
            image,
            box.x,
            box.y,
            box.width,
            box.height
        )
    }

    drawDisplayComponent(component, currentSide) {
        // some components can't be rotated so we use default source for that case
        let componentSide = component.rotatable 
        ? this.utilityTool.getSide(component, currentSide) 
        : this.utilityTool.getSide(component, component.defaultSource)

        this.drawComponent(component.box, componentSide.image)
    }

    animate(displayArea) {
        const table = displayArea.table
        const shelf = displayArea.shelf

        // clear
        this.clear()
        this.c.imageSmoothEnabed = true

        // fill Background
        this.c.fillStyle = '#fef9db'
        this.c.fillRect(0, 0, this.element.width, this.element.height)

        // fill display area
        this.fillRoundRect(table.area.x, table.area.y, table.area.width, table.area.height, 30)

        // fill shelf areas
        shelf.forEach(spot => {
            this.fillRoundRect(spot.area.x, spot.area.y, spot.area.width, spot.area.height, 20)
        })

        // draw Display area component
        if(table.component) {
            // draw component
            this.drawDisplayComponent(table.component, table.currentSide)

            // draw attached components

            // draw available slots
        }

        // draw shelf components
        shelf.forEach(spot => {
            if(spot.component) {
                // all shelf components will use default source
                const component = spot.component
                const componentSide = this.utilityTool.getSide(component, component.defaultSource) 
                this.drawComponent(component.box, componentSide.image)
            }
        })

        requestAnimationFrame(() => this.animate(this.displayArea))
    }

    init() {
        this.animate(this.displayArea)
    }
}

export default Canvas