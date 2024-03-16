class Inventory {
    constructor(elementHandler, UtilityTool) {
        this.elements = elementHandler.getInventoryElements()

        if(!this.elements) throw new Error('Missing Inventory Elements')

        // Elements
        this.openBtn = this.elements.openBtn
        this.closeBtn = this.elements.closeBtn
        this.modal = this.elements.modal

        // Events
        this.openBtn.addEventListener('click', () => this.openInv(this.modal))
        this.closeBtn.addEventListener('click', () => this.closeInv(this.modal))
    }

    openInv(modal) {
        modal.showModal()
    }

    closeInv(modal) {
        modal.close()
    }
}

export default Inventory