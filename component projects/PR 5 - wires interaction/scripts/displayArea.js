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
    }

    // Create Bounding Box
    createBox(component, display) {
        // get access to the components default side
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

    // Main Dispay Area Update Method 
    update() {
        if(this.table.component) {
            const tableComponent = this.table.component
            this.createBox(tableComponent, this.table)
        }

    this.shelf.forEach(spot => {
        const shelfComponent = spot.component

        if(shelfComponent) {
            this.createBox(shelfComponent, spot)
        }
    })
    }
}

export default DisplayArea