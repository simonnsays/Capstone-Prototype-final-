class DisplayArea {
    constructor(elementHandler, utilityTool, eventBus, portsTab, bootUpTab, user, wattageCalculator) {
        // Utility
        this.elementHandler = elementHandler
        this.utilityTool = utilityTool
        this.eventBus = eventBus
        this.bootUpTab = bootUpTab
        this.user = user
        this.wattageCalculator = wattageCalculator
        // Elements
        this.elements = this.elementHandler.getDisplayAreaElements()
        if (!this.elements) {
            throw new Error('Missing Display Area Elements')
        }

        // Inventory
        this.inventory = null

        // Wires Tab
        this.portsTab = portsTab

        // Tab Buttons
        this.menuButton = this.elements.menuButton
        this.tabButtons = this.elements.tabButtons

        // Table Labels and Interactivity
        this.leftBtn = this.elements.leftBtn
        this.rightBtn = this.elements.rightBtn
        this.compLabel = this.elements.compLabel
        this.compName = this.elements.compName
        this.panelIndicator = this.elements.panelIndicator

        // Table
        this.table = { area: { x: 10, y: 10, width: 650, height: 660 }, component: null };

        // Shelf
        this.shelf = [
            { area: { x: 670, y: 10, width: 300, height: 210 }, component: null },
            { area: { x: 980, y: 10, width: 310, height: 210 }, component: null },
            { area: { x: 670, y: 230, width: 300, height: 220 }, component: null },
            { area: { x: 980, y: 230, width: 310, height: 220 }, component: null },
            { area: { x: 670, y: 460, width: 300, height: 210 }, component: null },
            { area: { x: 980, y: 460, width: 310, height: 210 }, component: null }
        ]

        // Bin
        this.trashBin = {
            element: this.elements.trashBin,
            dialog: this.elements.trashDialog,
            area: { x: 570, y: 20, width: 80, height: 80 },
            confirmBtn: this.elements.trashConfirm,
            closeBtn: this.elements.trashClose,
            returnBtn: this.elements.trashReturn,
            isActive: false
        }

        // Mode
        this.mountModeButton = this.elements.mountToggle
        this.isInMountMode = true

        // Display Sides
        this.displaySides = ['left', 'front', 'right', 'rear']
        this.curr = 0
        this.currentSide = this.displaySides[this.curr]

        // States
        this.monitoringShelfTutorial = false
        this.monitoringTableTutorial = false
        this.set2Check = false
        this.set1check = false

        // Events
        this.leftBtn.addEventListener('click', () => this.rotateLeft())
        this.rightBtn.addEventListener('click', () => this.rotateRight())

        this.trashBin.element.addEventListener('click', () => {
            if(this.table.component)this.showConfirmationDialog(this.table.component)
        })
        this.trashBin.closeBtn.addEventListener('click', () => this.cancelRemoval())
        this.trashBin.confirmBtn.addEventListener('click', () => this.confirmRemoval())
        this.trashBin.returnBtn.addEventListener('click', () => this.returnTrashToInv(this.user.componentToTrash))
    }

    // Rotate Left
    rotateLeft() {
        this.curr = (this.curr + 1) % this.displaySides.length
        this.currentSide = this.displaySides[this.curr]
        this.update()
    }
    
    // Rotate Right
    rotateRight() {
        this.curr = (this.curr - 1 + this.displaySides.length) % this.displaySides.length;
        this.currentSide = this.displaySides[this.curr]
        this.update()
    }

    // Confirmation Dialog Handling
    showConfirmationDialog(component) {
        this.trashBin.dialog.style.display = 'block'
        this.trashBin.isActive = true
        
        this.user.componentToTrash = component
    }

    confirmRemoval() {
        if(this.monitoringTableTutorial && this.user.componentToTrash.name == 'Seagate Barracuda') {
            console.log('ready to emit removal of ssd')
            this.eventBus.emit('storageRemoved')
        }

        this.removeComponent(this.user.componentToTrash)
        this.trashBin.dialog.style.display = 'none'
        this.trashBin.isActive = false

        this.update()
    }
    
    // Function to cancel the removal process
    cancelRemoval() {
        this.trashBin.dialog.style.display = 'none'
        this.trashBin.isActive = false  
    }

    // Attach Component
    attachComponent(componentSelected, slot) {
        slot.component = componentSelected
        slot.component.isAttached = true
        slot.component.box = slot.box
        
        // Add component to PCUnit attached components
        //this.bootUpTab.pcUnit.addAttachedComponent(componentSelected);

        // remove selected component from shelf
        const i = this.shelf.findIndex(
            spot => spot.component && spot.component.id === componentSelected.id)
        this.shelf[i].component = null

        // update display area information
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

        // removed any attached cables
        /* 
        *
        *           CONTINURE WORKING HERE ! ! !
        * 
        */

        // update display area information
        this.update()
    }

    // Fill Shelf
    fillShelf(newComponent, shelf) {
        for(let i = 0; i < shelf.length; i++) {
            const spot = shelf[i]
    
            // if the component property is null, add the new component
            if(spot.component === null) {
                spot.component = newComponent
                this.createBox(newComponent, spot, newComponent.defaultSource)
                return true
            }
        }

        return false
    }

    removeComponent(component) {
        // console.log(`Removing component: ${component.name}`);

        // Remove from table
        if (this.table.component && this.table.component.id === component.id) {
            this.table.component = null;
            // console.log(`${component.name} removed from table.`);
        }

        // Remove from shelf
        const shelfIndex = this.shelf.findIndex(
            (spot) => spot.component && spot.component.id === component.id
        );
        if (shelfIndex !== -1) {
            this.shelf[shelfIndex].component = null;
            // console.log(`${component.name} removed from shelf.`);
        }

        // Tutorial Emit Listener 
        if(component.name == 'Seagate Barracuda') {
            this.eventBus.emit('hddRemoved')
        }

        // Update display area information
        this.update();
    }

    // returning components to Inventory 
    returnTrashToInv(component) {
        this.inventory.returnToInv(component)
        this.inventory.update()

        this.removeComponent(component)
        this.trashBin.dialog.style.display = 'none'
        this.trashBin.isActive = false

    }

    // Create Bounding Box
    createBox(component, display, givenSide) {
        // get access to the components default side
        let componentSide = this.utilityTool.getSide(component, givenSide)
        let scale = this.utilityTool.determineScale(componentSide.height, display.area.height - 20)
        display.scale = scale

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
        this.compLabel.innerHTML = component.type.toUpperCase()
        this.compName.innerHTML = component.name
    }

    // clear Display
    clearDisplay() {
        this.compLabel.innerHTML = ''
        this.compName.innerHTML = ''
        this.rightBtn.style.visibility = 'hidden'
        this.leftBtn.style.visibility = 'hidden'
        this.panelIndicator.style.visibility = 'hidden'
    }

    // Update Slot Box
    updateSlotBox(baseComponent, slot) {    
        const side = slot.sides[this.currentSide]

        if(!side) {
            slot.box = {x: 0, y: 0 ,width: 0 ,height: 0}
            return
        }

        if(baseComponent.isAttached) {
            // get the original dimensions of the base component
            const imageSide = this.utilityTool.getSide(baseComponent, this.currentSide)

            // find the scale by getting the change happened in the component's width and height
            const scale = {
                width: baseComponent.box.width / imageSide.width,
                height: baseComponent.box.height / imageSide.height,
            }
          
            const offset = side.offsets['default']

            slot.box = {
                x: baseComponent.box.x + (offset.x * scale.width),
                y: baseComponent.box.y + (offset.y * scale.height),
                width: offset.width * scale.width,
                height: offset.height * scale.width,
            }
        } else {
            const base = baseComponent.box
            const offset = side.offsets['default']

            slot.box = {
                x: base.x + offset.x,
                y: base.y + offset.y,
                width: offset.width,
                height: offset.height
            }
        }

        if(slot.component) {
            slot.component.slots.forEach(childSlot => {
                this.updateSlotBox(slot.component, childSlot)
            })
        }
    }

    updateAttachedComponentBox(baseComponent, slot) {
        // only update when a side for slot is available
        const side = slot.sides[this.currentSide]
        if(!side) {
            slot.component.box = {
                x: 0,
                y: 0,
                width: 0,
                height: 0,
            }
            return
        }

        if(baseComponent.isAttached) {

            // get the original dimensions of the base component
            const imageSide = this.utilityTool.getSide(baseComponent, this.currentSide)

            // find the scale by getting the change happened in the component's width and height
            const scale = {
                width: baseComponent.box.width / imageSide.width,
                height: baseComponent.box.height / imageSide.height,
            }
          
            const offset = side.offsets['default']

            slot.component.box = {
                x: baseComponent.box.x + (offset.x * scale.width),
                y: baseComponent.box.y + (offset.y * scale.height),
                width: offset.width * scale.width,
                height: offset.height * scale.width,
            }
        } else {
            const offset = side.offsets['default']
            const base = baseComponent.box

            slot.component.box = {
                x: base.x + offset.x,
                y: base.y + offset.y,
                width: offset.width,
                height: offset.height
            }
        }

        // do the same for components attached to this attached component (if there are)
        slot.component.slots.forEach(childSlot => {
            if(childSlot.component) {
                this.updateAttachedComponentBox(slot.component, childSlot)
            }
        })
    }

    hideButtons(buttons) {
        for(let i = 0; i < buttons.length; i++) {
            // show buttons
            if(buttons[i].id === 'mountUnmount') {
                buttons[i].style.transform = ''
            } else {
                buttons[i].style.transform = 'translateY('+ (-1 * (53 * i) - 53)+'px)'
            }

            // adjust z-index to go under menu button
            buttons.forEach(button => {
                button.classList.add('.z-0')
            })
            // buttons[i].style.zIndex = buttons.length - i
        }
    }

    showButtons(buttons) {
        buttons.forEach(button => {
            if(button.id === 'mountUnmount') button.style['transform'] = 'translateX(155px)'
            else button.style['transform'] = ''
            button.classList.remove('z-0')
        })
    }

    toggleMenu(menu, buttons, menuImg) {
        // switch menu's active state
        switch(menu.dataset.active) {
            case 'true':
                menu.dataset.active = 'false'
                break
            case 'false':
                menu.dataset.active = 'true'
                break
        }

        // adjust elements based of active state
        if(menu.dataset.active === 'false') {
            
            this.hideButtons(buttons)

            // swap menu image
            menuImg.classList.add('rotate0')
            menuImg.classList.remove('rotate180')
            menuImg.src = './assets/svg/3line.svg'
            return
        }

        menuImg.classList.add('rotate180')
        menuImg.classList.remove('rotate0')
        menuImg.src = './assets/svg/dropup.svg'
        this.showButtons(buttons)
    }

    toggleMountMode() {
        this.isInMountMode = !this.isInMountMode

        if(this.isInMountMode) {
            this.mountModeButton.style.backgroundColor = 'var(--green)'
            this.mountModeButton.innerHTML = 'Mount Mode'
        } else {
            this.mountModeButton.style.backgroundColor = 'var(--orange)'
            this.mountModeButton.innerHTML = 'Unount Mode'
        }
    }

    updateDetachableComponents(baseComponent) {
        this.user.detachableComponents.push(baseComponent)

        baseComponent.slots.forEach(slot => {
            if(slot.component) {
                this.updateDetachableComponents(slot.component)
            }
        })
    }

    // Main Dispay Area Update Method 
    update() {
        this.clearDisplay()
        this.user.detachableComponents = []
        const currShelfItems = []
        const currTableComponents = []

        if(this.table.component) {
            const tableComponent = this.table.component
            // create bounding box for table component adjusted to the current side
            if(tableComponent.isRotatable) {
                this.createBox(tableComponent, this.table, this.currentSide)
            } else if(!tableComponent.tableDisplay) {
                console.log('Missing tableDisplay attribute. See Data.js and compare to component.js:14')
            } else {
                this.createBox(tableComponent, this.table, tableComponent.tableDisplay)
            }
            
            // update labels and rotate buttons visibility
            this.updateRotatableStyles(tableComponent.isRotatable)
            this.updateComponentLabels(tableComponent)

            //update table component slot information
            tableComponent.slots.forEach(slot => {
                // update component boxes attached to slots
                if(slot.component) {
                    this.updateAttachedComponentBox(tableComponent, slot)

                    // update detachableComponents
                    this.updateDetachableComponents(slot.component)
                }

                // update slot boxes
                this.updateSlotBox(tableComponent, slot)
            })

            const fill = (mainComponent) => {
                mainComponent.slots.forEach(slot => {
                    if(slot.component) {
                        currTableComponents.push(slot.component.type)
                        fill(slot.component)
                    }
                })
            }
            
            currTableComponents.push(tableComponent.type)
            fill(tableComponent)
            this.eventBus.emit('mainUnitUpdated', this.table.component)
        }

        // create bounding boxes for components inside shelf
        this.shelf.forEach(spot => {
            const shelfComponent = spot.component
            if(shelfComponent) {
                currShelfItems.push(shelfComponent.type)

                this.createBox(shelfComponent, spot, shelfComponent.defaultSource)
            }
        })

        // update WIRES TAB
        this.portsTab.update(this.table, this.shelf)

        // update BOOT TAB
        this.bootUpTab.update(this.table.component)

        // Table Emit Event
        if(this.monitoringTableTutorial) {
            this.updateTableEmits(currTableComponents)
        }

        // Shelf Emit Event
        if(this.monitoringShelfTutorial) {
            const proceedReq1 = ['cpu','cooling','ram','gpu']
            const proceedReq2 = ['chassis', 'psu', 'storage']
            if(proceedReq1.every(item => currShelfItems.includes(item))) {
                this.eventBus.emit('set1Placed')
            } else if (proceedReq2.every(item => currShelfItems.includes(item))) {
                this.eventBus.emit('set2Placed')
            }
        }
    }

    updateTableEmits(currTableComponents) {
        const  hasRequiredItems = (requiredArr, availableArr) => {
            const requiredCount = {}
            const availableCount = {}
            // Count required items
            for (let item of requiredArr) {
                requiredCount[item] = (requiredCount[item] || 0) + 1
            }
            // Count available items
            for (let item of availableArr) {
                availableCount[item] = (availableCount[item] || 0) + 1
            }
            // Compare counts
            for (let item in requiredCount) {
                if (!availableCount[item] || availableCount[item] < requiredCount[item]) {
                return false
                }
            }
            return true
        }

        const proceedReq1 = ['motherboard', 'cpu', 'cooling', 'ram', 'gpu']
        const proceedReq2 = ['chassis', 'motherboard', 'cpu', 'cooling', 'ram', 'gpu', 'psu', 'storage']
     
        if(hasRequiredItems(proceedReq2, currTableComponents) && this.set2Check) {
            console.log('returned 2: procReq2')
            this.eventBus.emit('assemblyCompleted')
            return
        } 
        if(hasRequiredItems(proceedReq1, currTableComponents) && this.set1check) {
            this.eventBus.emit('set1Attached')
            // console.log('returned 1: procReq1')
            return
        } 

        if (this.currentSide == 'right') {
            this.eventBus.emit('rightSideAccessed')
            // console.log('accessed right ')
            return
        }
        
        if (currTableComponents.length === 1 && currTableComponents[0] === 'chassis') {
            this.eventBus.emit('chassisPlacedInMain')
            // console.log('returned 3')
            return
        } 
    }

    init() {
        let menuImg = document.createElement('img')
        menuImg.src = './assets/svg/3line.svg'
        this.menuButton.appendChild(menuImg)

        this.hideButtons(this.tabButtons)

        this.menuButton.addEventListener('click', () => {
            this.toggleMenu(this.menuButton, this.tabButtons, menuImg)
            this.eventBus.emit('tabsMenuOpened')
        } )
        this.mountModeButton.addEventListener('click', () => this.toggleMountMode())

        this.subscribeToEvents()
    }

    subscribeToEvents() {
        this.eventBus.on('motherboardPlaced', () => this.monitoringShelfTutorial = true)
        this.eventBus.on('set1Placed', () => this.monitoringTableTutorial = true) 

        this.eventBus.on('findSet2', () => {
            this.set2Check = true
            this.set1check = false
        })
        this.eventBus.on('findSet1', () => {
            this.set2Check = false
            this.set1check = true
        })
        this.eventBus.on('findNoSet', () => {
            this.set2Check = false
            this.set1check = false
        })
    }
}

export default DisplayArea
