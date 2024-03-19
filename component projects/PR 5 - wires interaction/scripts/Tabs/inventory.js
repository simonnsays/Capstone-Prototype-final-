class Inventory {
    constructor(elementHandler, utilityTool) {
        // Utility
        this.utilityTool = utilityTool
        this.elements = elementHandler.getInventoryElements()
        if(!this.elements) throw new Error('Missing Inventory Elements')

        // Elements
        this.openBtn = this.elements.openBtn
        this.closeBtn = this.elements.closeBtn
        this.modal = this.elements.modal
        this.itemsContainer = this.elements.itemsContainer

        // Items
        this.items = []

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

    createItemElements(items, container) {
        items.forEach(item => {
            const imageSource = item.images.find(image => image.side == item.defaultSource).imageSrc
            const element = this.utilityTool.makeItemElement(item, imageSource) 

            // associate item with the html element 
            element.component = item

            container.appendChild(element)
        })
    }

    placeComponent(child) {
        console.log(child)
    }

    // Main Inventory Function
    update() {
        // Clear Items
        while (this.itemsContainer.firstChild) {
            this.itemsContainer.removeChild(this.itemsContainer.firstChild);
        }

        this.createItemElements(this.items, this.itemsContainer)

        // Placing event
        let containerChildren = Array.from(this.itemsContainer.children) 
        let removeIndex = null

        containerChildren.forEach((child, index) => {
            child.addEventListener('click', () => {
                this.placeComponent(child.component)
                
                // Remove component from inventory
                this.items.splice(index, 1)

                this.update()
            })
        })
    }
}

export default Inventory