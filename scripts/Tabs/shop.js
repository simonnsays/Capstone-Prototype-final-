import components from "../Data/data.js"
import SearchBar from "../Utility/searchBar.js"

class Shop{
    constructor(elementHandler, utilityTool, inventory) {
        // Utility
        this.utilityTool = utilityTool
        this.elements = elementHandler.getShopElements()
        if(!this.elements) throw new Error('Missing Shop Elements')

        // Elements
        this.openBtn = this.elements.openBtn
        this.closeBtn = this.elements.closeBtn
        this.modal = this.elements.modal
        this.itemsContainer = this.elements.itemsContainer

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
        const componentClone = JSON.parse(JSON.stringify(component))

        // render component images
        this.utilityTool.createImages(componentClone.images)

        // create unique ID 
        this.utilityTool.createID(componentClone)
        this.inventory.items.push(componentClone)
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
                // buy component
                this.buyComponent(child.component)
                
                // update inventory container
                this.inventory.update()
            })
        })
    }

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