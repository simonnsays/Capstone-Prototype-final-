class WiresTab {
    constructor(elementHandler, utilityTool) {
        // Utility
        this.utilityTool = utilityTool
        this.elements = elementHandler.getConnectionsElements()
        if(!this.elements) throw new Error('Missing Connections Elements')

        // Elements
        this.openBtn = this.elements.openBtn
        this.closeBtn = this.elements.closeBtn
        this.modal = this.elements.modal

        // Wires
        this.wires = []

        // Events
        this.openBtn.addEventListener('click', () => this.openTab(this.modal))
        this.closeBtn.addEventListener('click', () => this.closeTab(this.modal))
        window.addEventListener('mousedown', (e) => this.handleOutofBounds(e, this.modal))
    }

    openTab(modal) {
        modal.showModal()
        modal.isOpen = true
    }

    closeTab(modal) {
        modal.close()
        modal.isOpen = false
    }

    handleOutofBounds(e, modal) {
        const rawMouse = {x: e.clientX, y: e.clientY}
        const rect = modal.getBoundingClientRect()

        if(!this.utilityTool.isInsideBox(rawMouse, rect) && modal.isOpen) {
            
            this.closeTab(modal)
        }
    }

}

export default WiresTab