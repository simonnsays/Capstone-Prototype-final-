class Shop {
    constructor(elementHandler, utilityTool ) {
        this.elements = elementHandler.getShopElements()

        if(!this.elements) throw new Error('Missing Shop Elements');

        console.log(this.elements)
        // get Shop Elements
        this.openBtn = this.elements.openBtn
        this.closeBtn = this.elements.closeBtn
        this.modal = this.elements.modal

        console.log(this.elements)

        this.openBtn.addEventListener('click', () => this.openShop(this.modal))
        this.closeBtn.addEventListener('click', () => this.closeShop(this.modal))
    }

    openShop(modal) {
        modal.showModal()
    }

    closeShop(modal) {
        modal.close()
    }
}

export default Shop