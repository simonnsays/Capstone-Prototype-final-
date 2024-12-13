import Component from "../Data/component.js"
import components from "../Data/data.js"
import SearchBar from "../Utility/searchBar.js"

class Shop{
    constructor(elementHandler, utilityTool, inventory, itemInfo) {
        // Utility
        this.utilityTool = utilityTool
        this.elements = elementHandler.getShopElements()
        if(!this.elements) throw new Error('Missing Shop Elements')

        // Elements
        this.openBtn = this.elements.openBtn
        this.closeBtn = this.elements.closeBtn
        this.modal = this.elements.modal
        this.itemsContainer = this.elements.itemsContainer
        this.quickBuy = this.elements.quickBuy
        this.itemInfo = itemInfo

        // Search Bar
        this.searchBar = new SearchBar(this.elements.shopSearchBar)
        this.searchResults = []

        // Component Categories
        this.categories = this.elements.shopCategories
        this.selectedCategory = ''

        // Items
        this.items =  []
        this.filteredItems // when a search or active category happens

        // Inventory (class module)
        this.inventory = inventory

        // Events
        this.openBtn.addEventListener('click', () => this.openTab(this.modal))
        this.closeBtn.addEventListener('click', () => this.closeTab(this.modal))
        window.addEventListener('mousedown', (e) => this.handleOutofBounds(e, this.modal))

        this.isActive = false
    }

    // Open Shop Tab
    openTab(modal) {
        modal.showModal()
        modal.isOpen = true
        this.isActive = true
    }

    // Close Shop Tab
    closeTab(modal) {
        modal.close()
        modal.isOpen = false
        this.isActive = false
    }

    // Handle Mouse Point Out of Shop Tab Bounds
    handleOutofBounds(e, modal) {
        const rawMouse = {x: e.clientX, y: e.clientY}
        const rect = modal.getBoundingClientRect()

        if(!this.utilityTool.isInsideBox(rawMouse, rect) && modal.isOpen) {
            
            this.closeTab(modal)
        }
    }

    // Fill Shop Items from Data Imported from data.js
    fillShopItems(items, carrier) {
        // fill shop with items
        items.forEach(item => {
            carrier.push(item)
        })

        // reference filters to this.items on initialize
        this.filteredItems = this.items
        this.searchResults = this.items
    }

    // Create Interactive Elements to Show in Shop Tab
    createItemElements(items, container) {
        items.forEach(item => {
            const imageSource = item.images.find(image => image.side == item.defaultSource).imageSrc
            const element = this.utilityTool.makeItemElement(item, imageSource) 

            // associate item with the html element 
            element.component = item

            container.appendChild(element)
        })
    }

    // Buy Component
    buyComponent(component) {
        // create clone of the component
        // const componentClone = JSON.parse(JSON.stringify(component))
        const componentClone = new Component({
            id: this.utilityTool.createID(component.type),
            name: component.name,
            type: component.type,
            specs: component.specs,
            dimensions: component.dimensions,
            isRotatable: component.isRotatable,
            isAttached: component.isAttached,
            defaultSource: component.defaultSource,
            images: component.images,
            slots: component.slots,
            ports: component.ports,
            cables: component.cables,
        })

        // render component images
        this.utilityTool.createImages(componentClone.images)
        componentClone.handleComponent(componentClone)

        // create unique ID 
        // componentClone.id = this.utilityTool.createID(componentClone.type)
        this.inventory.items.push(componentClone)

         // update inventory container
         this.inventory.update()
    }

    // Search Input Handling
    handleSearchInput(e) {
        const pattern = e.target.value
        let searchResults = []
        // use kmp search to match names of components to input search
        searchResults = this.items.filter(item => 
            this.searchBar.kmpSearch(item.name.toLowerCase(), pattern.toLowerCase()).length > 0)
        // update shop display that is returned by the search result
        if(searchResults.length > 0 || pattern.length > 0) {
            this.searchResults = searchResults
        } else {
            // if search input has no value
            this.searchResults = this.items
        }

        this.update()
    } 

    // Selection of Category
    selectCategory(categoryID) {
        // set a check if a category is selected
        let categoryIsSelected = false

        this.categories.forEach(category => {
            // toggle the selected category
            if(category.dataset.id === categoryID) {
                switch(category.dataset.selected) {
                    case 'false':
                        category.dataset.selected = 'true'
                        // imply that a category is selected
                        categoryIsSelected = true
                        break
                    case 'true':
                        category.dataset.selected = 'false'
                        break    
                }
            } else {
                // categories not selected are always set to false
                category.dataset.selected = 'false'
            }
        })

        // update this.selectedCategory of a category is selected
        categoryIsSelected
        ? this.selectedCategory = categoryID
        : this.selectedCategory = ''
    }

    displayItemInfo(component) {
        const itemInfoModal = this.itemInfo.modal

        // change image
        while(this.itemInfo.imageContainer.firstChild) {
            this.itemInfo.imageContainer.removeChild(this.itemInfo.imageContainer.firstChild)
        }
        const infoImage = new Image
        infoImage.src = component.images.find(image => image.side === component.defaultSource).imageSrc
        infoImage.style.maxHeight = '90%'
        infoImage.style.maxWidth = '90%'
        // infoImage.onload = () => 
        this.itemInfo.imageContainer.appendChild(infoImage)

        // change info name 
        this.itemInfo.infoName.innerHTML = component.name

        // change specs list 
        /*
        *   ENTER CHANGE OF SPECS LOGIC HERE
        */

        // button events
        const buyEvent = () => {
            this.buyComponent(component)
            itemInfoModal.close()

            // remove event listener after button events to avoid stacking of components being bought
            this.itemInfo.btn1.removeEventListener('click', buyEvent)
        }

        this.itemInfo.btn1.addEventListener('click', buyEvent)
        this.itemInfo.btn2.addEventListener('click', () => {
            itemInfoModal.close()

            // remove event listener after button events to avoid stacking of components being bought
            this.itemInfo.btn1.removeEventListener('click', buyEvent)
        })

        // display info
        itemInfoModal.showModal()
    }

    // Main Shop Update Method
    update() {
        while (this.itemsContainer.firstChild) {
            this.itemsContainer.removeChild(this.itemsContainer.firstChild)
        }

        // apply category filter
        if(this.selectedCategory.length !== 0) {

            this.filteredItems = this.searchResults
            .filter(item => 
                item.type.toLowerCase() === this.selectedCategory.toLowerCase())
        } else {
            // apply search filter instead
            this.filteredItems = this.searchResults
        }

        // create elements after filter application
        this.createItemElements(this.filteredItems, this.itemsContainer)

        // Purchase event
        Array.from(this.itemsContainer.children).forEach(child => {
            child.addEventListener('click', () => {
                if(this.quickBuy.checked) {
                    // buy component
                    this.buyComponent(child.component)
                } else {
                    // display component information first
                    this.displayItemInfo(child.component)
                }
            })
        })
    }

    // Main Shop Initialization Method
    init() {
        // Fill Shop Items
        this.fillShopItems(components, this.items)

        // search bar event
        this.searchBar.element.addEventListener('input', (e) => this.handleSearchInput(e))

        // shop categories event
        this.categories.forEach(category => {
            category.addEventListener('click', () => {
                // toggle this category
                this.selectCategory(category.dataset.id)
                
                this.update()
            })
        })

        // use update method
        this.update()
    }
}

export default Shop