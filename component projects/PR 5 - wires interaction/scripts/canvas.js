class Canvas {
    constructor(elementHandler, utilityTool) {
        // Canvas Area
        this.element = elementHandler.getCanvas()
        if(!this.element) {
            throw new Error('no canvas element found')
        }
        this.element.width = 1300
        this.element.height = 680
        this.c = this.element.getContext('2d')

        this.utilityTool = utilityTool
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

    createBox(component, display) {
        let componentSide = this.utilityTool.getSide(component, component.defaultSource)
        let scale = this.utilityTool.determineScale(componentSide.height, display.area.height - 20)
        let toCenter = {
            x: display.area.x + (display.area.width / 2),
            y: display.area.y + (display.area.height / 2) 
        }
        
        component.box = {
            x: toCenter.x - ((componentSide.width * scale) / 2),
            y: toCenter.y - ((componentSide.height * scale) / 2),
            width: componentSide.width * scale,
            height: componentSide.height * scale 
        }
    }

    animate(displayArea) {
        const table = displayArea.table
        const shelf = displayArea.shelf

        // clear
        this.clear()
        this.c.imageSmoothEnabed = true

        // Fill Background
        this.c.fillStyle = '#fef9db'
        this.c.fillRect(0, 0, this.element.width, this.element.height)

        // fill display area
        this.fillRoundRect(table.area.x, table.area.y, table.area.width, table.area.height, 30)

        // fill shelf areas
        shelf.forEach(spot => {
            this.fillRoundRect(spot.area.x, spot.area.y, spot.area.width, spot.area.height, 20)
        })

        // draw Display area component
        if(displayArea.component) {
            // draw component
            drawDisplayComponent(displayArea.component)

            // draw attached components

            // draw available slots
        }

        // draw shelf components
        shelf.forEach(spot => {
            if(spot.component) {
                drawShelfComponent(spot.component)
            }
        })

        requestAnimationFrame(animate)
    }
}

export default Canvas