class Canvas {
    constructor(elementHandler, utilityTool, displayArea, user) {
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
        this.table = displayArea.table
        this.shelf = displayArea.shelf

        // User
        this.user = user

        // Mouse Move Events
        window.addEventListener('mousedown', (e) => this.handleMouseDown(e))
        window.addEventListener('mousemove', (e) => this.handleMouseMove(e))
        window.addEventListener('mouseup', () => this.handleMouseUp())
    }

    // Mouse Down Event
    handleMouseDown(e) {
        // only accept left click
        if(e.button !== 0) return

        // try to select one of the components in shelf
        this.user.componentSelected = this.user.selectComponent(this.shelf)

        // do nothing if no selected component
        if(!this.user.componentSelected) return

        // if a component is selected
        this.user.createTempProperties()

        // match slots 
        this.displaySlots(this.table.component, this.user.componentSelected)
    }

    displaySlots(baseComponent,  componentSelected) {
        // baseComponent.slots.forEach(slot => {
            
        // })
        this.user.availableSlots = baseComponent.slots.filter(slot => slot.type === componentSelected.type)
        console.log(this.user.availableSlots)
    }

    // Mouse Move Event
    handleMouseMove(e) {
        // adjust mouse point relative to the canvas
        const canvasRect = this.element.getBoundingClientRect()
        const rawMouse = {x: e.clientX, y: e.clientY}

        this.user.mousePoint = {
            x: rawMouse.x - canvasRect.left,
            y: rawMouse.y - canvasRect.top
        }

        // dragging event
        if(this.user.componentSelected && this.user.isDragging) {
            this.user.dragComponent()

            // return component if out of bounds
            if(!this.utilityTool.isInsideBox(rawMouse, canvasRect)) {
                this.user.returnComponentToShelf()

                this.user.resetTempProperties()
            }
        }
    }

    // Mouse Up Event 
    handleMouseUp() {
        // return if no selected component
        if(!this.user.componentSelected) return

        let isInteracting = false

        // swap components if component dragged is in table display area
        if(!isInteracting && this.utilityTool.isInsideBox(this.user.mousePoint, this.table.area)) {
            isInteracting = true

            // reset user orientation
            this.displayArea.curr = 0
            this.displayArea.currentSide = this.displayArea.displaySides[this.displayArea.curr]

            // swap components
            this.displayArea.swapComponents(this.user.componentSelected)
        }

        // return to shelf if no interaction
        if(!isInteracting) {
            this.user.returnComponentToShelf()
        }

        // clear temporary properties
        this.user.resetTempProperties()
    }

    // Rects With Border Radius(bent corners)
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

    // Draw Component Image
    drawComponent(box, image) {
        this.c.drawImage(
            image,
            box.x,
            box.y,
            box.width,
            box.height
        )
    }

    // Draw Componnent in Table Area
    drawTableComponent(component, currentSide) {
        // some components can't be rotated so we use default source for that case
        let componentSide = component.isRotatable 
        ? this.utilityTool.getSide(component, currentSide) 
        : this.utilityTool.getSide(component, component.defaultSource)

        this.drawComponent(component.box, componentSide.image)
    }

    // Draw Available Slots
    drawAvailableSlots(baseComponent) {
        // do nothing if no available slots
        if(this.user.availableSlots.length === 0) return

        // highlight default slot box (not necessarily compatible yet)
        this.user.availableSlots.forEach(slot => {
            const side = slot.sides[this.displayArea.currentSide]
            
            // sometimes there are slot offsets only available on certain sides
            if(side) {
                const offset = side.offsets['default']

                this.c.fillStyle = 'rgba(0, 255, 0, 0.4)'
                this.c.fillRect(
                    baseComponent.box.x + offset.x,
                    baseComponent.box.y + offset.y,
                    offset.width,
                    offset.height
                )
            }
        })
    }

    // Main Animate Function
    animate() {
        const table = this.table
        const shelf = this.shelf

        // clear
        this.c.clearRect(0, 0, this.element.width, this.element.height)
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
            this.drawTableComponent(table.component, this.displayArea.currentSide)

            // draw attached components

            // draw available slots
            this.drawAvailableSlots(table.component)
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

        // Loop Canvas
        requestAnimationFrame(() => this.animate())
    }

}

export default Canvas