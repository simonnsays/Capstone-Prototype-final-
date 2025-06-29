import Component from "../Data/component.js"
import components from "../Data/data1.js"
import tutComponents from "../Data/tutorialSet.js"
import SearchBar from "../Utility/searchBar.js"

class Shop{
    constructor(elementHandler, utilityTool, eventBus, inventory, itemInfo) {
        // Utility
        this.utilityTool = utilityTool
        this.elements = elementHandler.getShopElements()
        if(!this.elements) throw new Error('Missing Shop Elements')
        this.eventBus = eventBus

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
        this.categoryMore = document.querySelector('.more-category')

        // Items
        this.items =  []
        this.filteredItems

        // Inventory (class module)
        this.inventory = inventory

        // Compatibility tracking
        this.compatibilityFilters = {
            buildType: null,
            motherboard: null,
            cpu: null,
            ram: null,
            gpu: null
        }

        // Price filter
        this.priceRange = { min: 0, max: 100000 }

        // State
        this.isActive = false
        this.setUsage = 'tutorial'

        // Events
        this.openBtn.addEventListener('click', () => {
            eventBus.emit('shopOpened')
            this.openTab(this.modal)
        })
        this.closeBtn.addEventListener('click', () => this.closeTab(this.modal))

        // this.boundMouseDown = this.handleOutofBounds(e, this.modal)
        this.boundMouseDown = (e) => this.handleOutofBounds(e, this.modal)
        // window.addEventListener('mousedown', this.boundMouseDown)
    }

    // Open Shop Tab
    openTab(modal) {
        modal.show();
        modal.isOpen = true;    
        this.isActive = true;
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
            let price = 0;
            let priceText = '';
            // check if item has price in specs(array or single value)
            if (Array.isArray(item.specs?.price)) {
                const min = parseInt(item.specs.price[0]) || 0;
                const max = parseInt(item.specs.price[1]) || 0;
                price = min; // take min for filtering and dataset
                priceText = `₱${min.toLocaleString()} to ₱${max.toLocaleString()}`;
            } else {
                price = parseInt(item.specs?.price) || 0;
                priceText = `₱${price.toLocaleString()}`;
            }
            const isInRange = price >= this.priceRange.min && 
                            price <= this.priceRange.max;

            const element = this.utilityTool.makeItemElement(item, 
                item.images.find(img => img.side === item.defaultSource).imageSrc);
            
            // Add price display
            const priceDisplay = document.createElement('div');
            priceDisplay.className = `item-price ${isInRange ? '' : 'price-out-of-range'}`;
            priceDisplay.dataset.price = price;
            priceDisplay.textContent = priceText;
            element.appendChild(priceDisplay);

            element.component = item;
            element.dataset.name = item.name

            element.classList.toggle('highlight-element', !!item.hasElHighlight)

            // Emit Chassis expanded
            this.addElEmitListeners(element, element.dataset.name, item)

            // Append Element
            container.appendChild(element);
        });

        this.updateCompatibilityDisplay();
    }
    

    setCompatibilityFilters(buildType) {
        this.compatibilityFilters.buildType = buildType;
        this.updateCompatibilityDisplay();
    }
    
    showPurchaseNotification(component) {
        const toast = document.createElement('div');
        toast.className = 'toast-notification';
        toast.innerHTML = `
            <div class="toast-header">
                <span class="toast-title">Item Purchased</span>
                <button class="close-toast">×</button>
            </div>
            <div class="toast-content">
                Added ${component.name} to inventory
            </div>
            <div class="toast-specs">
                ${Object.entries(component.specs)
                    .slice(0, 2)
                    .map(([key, value]) => `${key}: ${value}`)
                    .join(' • ')}
            </div>
        `;

        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    }

    categorizeCPU(component) {
        const tier = {
            gaming: ['i9', 'i7', 'Ryzen 9', 'Ryzen 7', '7900X', '7800X'],
            office: ['i5', 'Ryzen 5'],
            casual: ['i3', 'Ryzen 3']
        };

        for (const [category, keywords] of Object.entries(tier)) {
            if (keywords.some(keyword => component.name.toLowerCase().includes(keyword.toLowerCase()))) {
                return category;
            }
        }
        return 'casual'; 
    }

    categorizeGPU(component) {
        const tier = {
            gaming: ['RTX 40', 'RTX 30', 'RX 79', 'RX 76','RX 67'],
            office: ['RTX 20', 'GTX 16', 'RX 65'],
            casual: ['GTX 10', 'GTX 1650', 'RX 53']
        };

        for (const [category, keywords] of Object.entries(tier)) {
            if (keywords.some(keyword => component.name.toLowerCase().includes(keyword.toLowerCase()))) {
                return category;
            }   
        }
        return 'casual'; 
    }

    checkCompatibility(component) {
        if (!component) {
            console.error("Error: Invalid component");
            return false;
        }

        const buildType = this.compatibilityFilters.buildType;
        if (!buildType) return true;

        switch(component.type) {
            case 'chassis': return true;
    
            case 'cpu':
                const cpuCategory = this.categorizeCPU(component);
                // Gaming CPUs work for all builds, office CPUs work for office/casual builds
                if (buildType === 'gaming' && cpuCategory !== 'gaming') return false;
                if (buildType === 'office' && cpuCategory === 'casual') return false;
                
                //  Socket compatibility checking
                if (this.compatibilityFilters.motherboard) {
                    const moboSocket = this.compatibilityFilters.motherboard.specs.cpuslot;
                    return component.specs.socket === moboSocket;
                }
                return true;

            case 'gpu':
                // Specific GPU compatibility checking for gaming,office and casual
                if (component.type === 'gpu' && this.compatibilityFilters.buildType === 'gaming') {
                    const gpuCategory = this.categorizeGPU(component);
                    if (gpuCategory !== 'gaming') return false;
                }
                if (component.type === 'gpu' && this.compatibilityFilters.buildType === 'office') {
                    const gpuCategory = this.categorizeGPU(component);
                    if (gpuCategory !== 'office') return false;
                }
                if (component.type === 'gpu' && this.compatibilityFilters.buildType === 'casual') {
                    const gpuCategory = this.categorizeGPU(component);
                    if (gpuCategory !== 'casual') return false;
                }
                return true;

            case 'ram':
                // Check motherboard compatibility
                if (this.compatibilityFilters.motherboard) {
                    const ramSlots = this.compatibilityFilters.motherboard.slots.find(
                        slot => slot.type === 'ram'
                    );
                    return ramSlots?.supports.includes(component.size);
                }
                return true;

            case 'motherboard':
                // Check CPU socket compatibility
                if (this.compatibilityFilters.cpu) {
                    const cpuSocket = this.compatibilityFilters.cpu.specs.socket;
                    return component.specs.cpuslot === cpuSocket;
                }
                return true;
    
            case 'psu':
                // Check if PSU wattage is sufficient for all components
                const totalWatts = Object.values(this.compatibilityFilters)
                .reduce((sum, comp) => { 
                    // Get component watts, checking both watts and specs.wattage
                    if (component.type !== 'psu') {// Skip PSU itself
                        const watts = comp?.watts || comp?.specs?.wattage || 0;
                        return sum + parseInt(watts);
                    } 
                    return sum;
                }, 0);

                // Get PSU wattage, checking both specs.wattage and watts
                const psuWatts = parseInt(component.specs?.wattage) || parseInt(component.watts) || 0;
                
                if (psuWatts < totalWatts) {
                    return false;
                }
    
                return true;

            case 'cooling': return true; 

            case 'storage':
                // Check if chassis has slots for the storage component
                if (this.compatibilityFilters.chassis) {
                    // if component is m.2 then pass as true since it is for a motherboard slot
                    if(component.size === 'm.2'){return true}
                    // Check if chassis has slots that support the component size
                    return this.compatibilityFilters.chassis.slots.some(slot => 
                        slot.type === 'storage' && 
                        slot.supports.includes(component.size)
                    );
                }
                // Check storage interface compatibility
                if (this.compatibilityFilters.motherboard) {
                    if (component.size === 'm.2') {
                        // Check if motherboard has M.2 slots
                        return this.compatibilityFilters.motherboard.slots.some(
                            slot => slot.type === 'storage' && slot.supports.includes('m.2')
                        );
                    } else if (component.specs.interface === 'SATA') {
                        // Check if motherboard has SATA ports
                        return this.compatibilityFilters.motherboard.ports.some(
                            port => port.type.includes('sata')
                        );
                    }
                }
                return true;

            default:
                console.warn(`Unknown component type: ${component.type}`);
                return true;
        }
    }
    applyFilters(items) {
        return items.filter(item => {
            const price = parseInt(item.specs?.price) || 0;
            const meetsPrice = price >= this.priceRange.min && 
                             price <= this.priceRange.max;
            
            const meetsBuildType = !this.compatibilityFilters.buildType || 
                                 this.checkCompatibility(item);

            return meetsPrice && meetsBuildType;
        });
    }

    setPriceRange(min, max) {
        min = Math.max(0, parseInt(min) || 0);
        max = Math.min(100000, parseInt(max) || 100000);
        
        if (min > max) [min, max] = [max, min];

        this.priceRange = { min, max };
        this.updatePriceUI();
        this.update(); // refresh shop view
    }

    updatePriceUI() {
        // Update price display elements
        const priceElements = document.querySelectorAll('.item-price');
        priceElements.forEach(el => {
            const price = parseInt(el.dataset.price);
            const isInRange = price >= this.priceRange.min && 
                            price <= this.priceRange.max;
            
            el.classList.toggle('price-out-of-range', !isInRange);
            el.textContent = `₱${price.toLocaleString()}`
        });
    }

    updateCompatibilityDisplay() {
        const items = this.itemsContainer.children;
        Array.from(items).forEach(item => {
            const isCompatible = this.checkCompatibility(item.component);
            item.classList.toggle('incompatible', !isCompatible);
            
            // Add compatibility indicator
            let indicator = item.querySelector('.compatibility-indicator');
            if (!indicator) {
                indicator = document.createElement('div');
                indicator.className = 'compatibility-indicator';
                item.appendChild(indicator);
            }
            indicator.innerHTML = isCompatible ? '✓' : '✗';
            indicator.className = `compatibility-indicator ${isCompatible ? 'compatible' : 'incompatible'}`;
        });
    }
    
    // Buy Component
    buyComponent(component) {
        // create clone of the component
        const componentRef = JSON.parse(JSON.stringify(component))
        const componentClone = new Component({
            id: this.utilityTool.createID(component.type),
            name: componentRef.name,
            type: componentRef.type,
            size: componentRef.size,
            specs: componentRef.specs,
            watts: componentRef.watts,
            dimensions: componentRef.dimensions,
            isRotatable: componentRef.isRotatable,
            isAttached: componentRef.isAttached,
            tableDisplay: componentRef.tableDisplay,
            defaultSource: componentRef.defaultSource,
            images: componentRef.images,
            slots: componentRef.slots,
            ports: componentRef.ports,
            cables: componentRef.cables,
        })

        // render component images
        this.utilityTool.createImages(componentClone.images)
        componentClone.handleComponent(componentClone)
    
        this.inventory.items.push(componentClone)

        // update inventory container
        this.inventory.update()

        // Update compatibility filters when component is bought
        this.compatibilityFilters[component.type] = component;
        
        // Update compatibility display
        this.updateCompatibilityDisplay();

        // Show purchase notification
        this.showPurchaseNotification(component);

        // remove hightlight
        component.hasElHighlight = false
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
        const specsList = document.getElementById("itemInfoSpecs");
        specsList.innerHTML = ""; // Clear previous specs

        if (component.specs) {
            for (const [key, value] of Object.entries(component.specs)) {
                const listItem = document.createElement("li");
                listItem.innerHTML = `<strong>${key}:</strong> ${value}`;
                specsList.appendChild(listItem);
            }
        } else {
            const listItem = document.createElement("li");
            listItem.innerText = "No specifications available";
            specsList.appendChild(listItem);
        }

        // button events
        const buyEvent = () => {
            this.buyComponent(component)
            itemInfoModal.close()

            // Event Emits
            this.checkBuyEmitListeners(component.name)

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
        itemInfoModal.show()
    }
///////////////////////////////////// event monitor /////////////////////////////////
    checkBuyEmitListeners(name) {
        switch(name) {
            case 'NZXT H5 Flow': 
                this.eventBus.emit('chassisBought')
                break
            case 'ASRock X570 PG Velocita': 
                this.eventBus.emit('motherboardBought')
                break
            case 'AMD Ryzen 9 5900X': 
                this.eventBus.emit('cpuBought')
                break
            case 'EVGA Supernova 1300 P+': 
                this.eventBus.emit('psuBought')
                break
            case 'Kingston HyperX Beast RGB DDR4': 
                this.eventBus.emit('ramBought')
                break
            case 'Seagate Barracuda': 
                this.eventBus.emit('romBought')
                break
            case 'AMD wraith Prism': 
                this.eventBus.emit('coolingDeviceBought')
                break
            case "Gigabyte Radeon RX 7900 XTX": 
                this.eventBus.emit('gpuBought')
            break   
        }
    }

    // On Expand
    addElEmitListeners(element, name, item) {
        // delete item.hasElHighlight
        switch(name) {
            case "NZXT H5 Flow": 
                element.addEventListener('click', () => {this.eventBus.emit('chassisExpanded')})
                break
            case "ASRock X570 PG Velocita": 
                element.addEventListener('click', () => {this.eventBus.emit('motherboardExpanded')})
                break
            case "AMD Ryzen 9 5900X": 
                element.addEventListener('click', () => {this.eventBus.emit('cpuExpanded')})
                break
            case "EVGA Supernova 1300 P+": 
                element.addEventListener('click', () => {this.eventBus.emit('psuExpanded')})
                break
            case "Kingston HyperX Beast RGB DDR4": 
                element.addEventListener('click', () => {this.eventBus.emit('ramBought')})
                break    
            case "Seagate Barracuda": 
                element.addEventListener('click', () => {this.eventBus.emit('romBought')})
                break    
            case "AMD wraith Prism": 
                element.addEventListener('click', () => {this.eventBus.emit('coolingDeviceBought')})
                break    
            case "Gigabyte Radeon RX 7900 XTX": 
                element.addEventListener('click', () => {this.eventBus.emit('gpuBought')})
                break    
        }
    }

    subscribeToEvents() {
        // ONs
        [
            'addChassisHighlight','addMotherboardHighlight', 'addCpuHighlight', 'addPsuHighlight', 
            'addRamHighlight', 'addRomHighlight', 'addCoolingDeviceHighlight', 'addGpuHighlight',
            'addSsdHighlight'
        ].forEach(event => {
            // Listening for Highlight
            this.eventBus.on(event, (data) => {
                const foundItem = this.items.find(item => item.name == data)
                if(!foundItem.hasElHighlight) {
                    foundItem.hasElHighlight = true                    
                }
            })
        })

        this.eventBus.on('gamePause', () => this.pause())
        this.eventBus.on('gameResume', () => this.resume())

        const changeShopItemsEvents = ['tutSkipped','tutorialFinished']
        changeShopItemsEvents.forEach(event => {
            this.eventBus.on(event, () => {
            this.setUsage === 'main'
            this.items = []
             while (this.itemsContainer.firstChild) {
                this.itemsContainer.removeChild(this.itemsContainer.firstChild)
            }
            this.fillShopItems(components, this.items)

            this.selectCategory('chassis')
            this.update()
        })
        })

        this.eventBus.on('emitTaskId', (data) => {
            console.log(data)
            if(data === 'buyCoolingDevice') {
                this.categoryMore.classList.remove('invisible')
                console.log(this.categoryMore)
            } else  {
                this.categoryMore.classList.add('invisible')
                // console.log(`${parse}`)
            }
        })

        // EMITs
        this.quickBuy.addEventListener('click', () => {
            if(this.quickBuy.checked) this.eventBus.emit('quickBuyChecked')
        })
    }
///////////////////////////////////// event monitor ///////////////////////////////// 



    pause() {
        window.removeEventListener('mousedown', this.boundMouseDown)
    }

    resume() {
        window.addEventListener('mousedown', this.boundMouseDown)
    }

    // Main Shop Update Method
    update() {
        while (this.itemsContainer.firstChild) {
            this.itemsContainer.removeChild(this.itemsContainer.firstChild)
        }

        // Apply all filters in sequence
        let filteredItems = this.items;

        // Apply all other filters (price, category, build type)
        filteredItems = this.applyFilters(filteredItems);

        // Apply selected category filter
        if(this.selectedCategory.length !== 0) {
            this.filteredItems = this.searchResults.filter(
                item => item.type.toLowerCase() === this.selectedCategory.toLowerCase())
        } else {
            // apply search filter instead
            this.filteredItems = this.searchResults
        }
        // create elements after filter application
        this.createItemElements(this.filteredItems, this.itemsContainer)
    }

    // Main Shop Initialization Method
    init() {
        if(this.setUsage === 'tutorial') {
            this.fillShopItems(tutComponents, this.items)
            console.log(this.items)
        }
        //  else if(this.setUsage === 'main') {
        //     while (this.itemsContainer.firstChild) {
        //         this.itemsContainer.removeChild(this.itemsContainer.firstChild)
        //     }
        //     this.fillShopItems(components, this.items)
        // }
        // Fill Shop Items
        // this.fillShopItems(components, this.items)

        // Subscribe to eventBus events
        this.subscribeToEvents()

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
        this.selectCategory('chassis')

        // Purchase event
        this.itemsContainer.addEventListener('click', (e) => {
            const foundElement = e.target.closest('.content')
            if(!foundElement) return

            if(this.quickBuy.checked) {
                // buy component
                this.buyComponent(foundElement.component)
            } else {
                // display component information first
                this.displayItemInfo(foundElement.component)
            }
        })

        // use update method
        this.update()
    }
}

export default Shop