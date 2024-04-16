import Drawer from "./drawer.js"

class WiresTab {
    constructor(elementHandler, utilityTool, displayArea) {
        // Utility
        this.utilityTool = utilityTool
        this.elements = elementHandler.getWiresElements()
        if(!this.elements) throw new Error('Missing Connections Elements')

        // Open / Close tab buttons
        this.openBtn = this.elements.openBtn
        this.closeBtn = this.elements.closeBtn

        // Wires / port tab
        this.modal = this.elements.modal
        this.portsContainer = this.elements.portsContainer
        this.isActive = false

        // Drawer
        this.drawer = new Drawer(elementHandler)
        
        // Wires
        this.wires = []

        // Ports
        this.ports = []

        // Display Area
        this.displayArea = displayArea

        this.portAreas = {
            single: {area: 0, },
            grid: [
                {area: 0, },
                {area: 0, },
                {area: 0, },
                {area: 0, },
                {area: 0, },
                {area: 0, }
            ]
        }

        // Events
        
        this.openBtn.addEventListener('click', () => this.openTab(this.modal))
        this.closeBtn.addEventListener('click', () => this.closeTab(this.modal))
        
    }

    openTab(modal) {
        // modal.showModal()
        modal.isOpen = true
        modal.style.display = 'block'

        // for canvas monitoring
        this.isActive = true
    }

    closeTab(modal) {
        // modal.close()
        modal.isOpen = false
        modal.style.display = 'none'

        // for canvas monitoring
        this.isActive = false
    }

    createPortCells(tableComponent) {
        tableComponent.ports.forEach(port)
    }

    // Main Update Function
    update() {
        // check if the table has a component
        if(this.displayArea.table.component) {
            const tableComponent = this.displayArea.table.component
            this.createPortCells(tableComponent)
        }
    }
}

export default WiresTab