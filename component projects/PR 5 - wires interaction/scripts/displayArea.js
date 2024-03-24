class DisplayArea {
    constructor(elementHandler, utilityTool) {
        // Utility
        this.elementHandler = elementHandler
        this.utilityTool = utilityTool

        // Table
        this.table = {area: {x: 10, y: 10, width: 650, height: 660}, component: null}

        // Shelf
        this.shelf = [
            {area: {x: 670, y: 10, width: 300, height: 210}, component: null},
            {area: {x: 980, y: 10, width: 310, height: 210}, component: null},
        
            {area: {x: 670, y: 230, width: 300, height: 220}, component: null},
            {area: {x: 980, y: 230, width: 310, height: 220}, component: null},
        
            {area: {x: 670, y: 460, width: 300, height: 210}, component: null},
            {area: {x: 980, y: 460, width: 310, height: 210}, component: null}
        ]

        // Elements
        this.elements = this.elementHandler.getDisplayAreaElements()
        if(!this.elements) {
            throw new Error ('Missing Display Area Elements')
        }

        this.leftBtn = this.elements.leftBtn
        this.rightBtn = this.elements.rightBtn
        this.compLabel = this.elements.compLabel
        this.compName = this.elements.compName
        this.panelIndicator = this.elements.panelIndicator

        // Display Sides
        this.displaySides = ['left', 'front', 'right', 'rear']
        this.curr = 0
        this.currentSide = this.displaySides[this.curr]

        // Events
        this.leftBtn.addEventListener('click', () => this.rotateLeft())
        this.rightBtn.addEventListener('click', () => this.rotateRight())
    }

    // Rotate Left
    rotateLeft() {
        console.log('hit')
        this.curr = (this.curr - 1 + this.displaySides.length) % this.displaySides.length;
        this.currentSide = this.displaySides[this.curr]

        this.update()
    }
    
    // Rotate Right
    rotateRight() {
        this.curr = (this.curr + 1) % this.displaySides.length
        this.currentSide = this.displaySides[this.curr]

        this.update()
    }

    // Swap Components
    swapComponents(componentSelected) {
        const tempComponent = this.table.component
        const index = this.shelf.findIndex(spot => spot.component && 
            spot.component.id === componentSelected.id)

        // swap
        this.table.component = componentSelected
        this.shelf[index].component = tempComponent

        // update display area information
        this.update()
    }

    // Create Bounding Box
    createBox(component, display, givenSide) {
        // get access to the components default side
        let componentSide = this.utilityTool.getSide(component, givenSide)
        let scale = this.utilityTool.determineScale(componentSide.height, display.area.height - 20)

        // Offset to adjust the image drawing to center
        let toCenter = {
            x: display.area.x + (display.area.width / 2),
            y: display.area.y + (display.area.height / 2) 
        }
        
        // creation of box with added
        component.box = {
            x: toCenter.x - ((componentSide.width * scale) / 2),
            y: toCenter.y - ((componentSide.height * scale) / 2),
            width: componentSide.width * scale,
            height: componentSide.height * scale 
        }
    }

    // Update Stylesheet Depending if The Component is Rotatable or Not
    updateRotatableStyles(rotatable) {
        if(rotatable) {
            this.rightBtn.style.visibility = 'visible'
            this.leftBtn.style.visibility = 'visible'
            this.panelIndicator.style.visibility = 'visible'
            this.panelIndicator.innerHTML = this.currentSide + ' side'
        } else {
            this.rightBtn.style.visibility = 'hidden'
            this.leftBtn.style.visibility = 'hidden'
            this.panelIndicator.style.visibility = 'hidden'
        }
    }

    // Update Labels
    updateComponentLabels(component) {
        this.compLabel.innerHTML = component.type
        this.compName.innerHTML = component.name
    }

    // Main Dispay Area Update Method 
    update() {
        if(this.table.component) {
            const tableComponent = this.table.component
            this.createBox(tableComponent, this.table, this.currentSide)

            this.updateRotatableStyles(tableComponent.isRotatable)
            this.updateComponentLabels(tableComponent)
        }

        this.shelf.forEach(spot => {
            const shelfComponent = spot.component

            if(shelfComponent) {
                this.createBox(shelfComponent, spot, shelfComponent.defaultSource)
            }
        })
    }
}

export default DisplayArea