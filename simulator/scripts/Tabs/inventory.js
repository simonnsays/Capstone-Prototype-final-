import portRef from "../Data/portReference.js"
import cableRef from "../Data/cableReference.js"
import Cable from "../Data/cable.js"

class Inventory {
    constructor(elementHandler, utilityTool, eventBus, displayArea) {
        // Utility
        this.utilityTool = utilityTool
        this.eventBus = eventBus
        this.elements = elementHandler.getInventoryElements()
        if(!this.elements) throw new Error('Missing Inventory Elements')

        // Elements
        this.openBtn = this.elements.openBtn
        this.closeBtn = this.elements.closeBtn
        this.modal = this.elements.modal
        this.itemsContainer = this.elements.itemsContainer
        this.isActive = false

        // Items
        this.items = []

        // Display Area
        this.displayArea = displayArea
        displayArea.inventory = this

        // Events
        this.openBtn.addEventListener('click', () => {
            this.eventBus.emit('invOpened')
            this.openTab(this.modal)
        })
        this.closeBtn.addEventListener('click', () => this.closeTab(this.modal))
        this.boundMouseDown = (e) => this.handleOutofBounds(e, this.modal)
        // window.addEventListener('mousedown', (e) => this.handleOutofBounds(e, this.modal))
    }

    init() {
        this.subscribeToEvents()
    }

///////////////////////////////////// event monitor /////////////////////////////////
    subscribeToEvents() {
        this.eventBus.on('gamePause', () => this.pause())
        this.eventBus.on('gameResume', () => this.resume())

        // ['set1Placed', 'set2Placed'].forEach(event => {
        //     this.eventBus.on(event, () => this.closeTab(this.modal))
        // })
        
        this.eventBus.on('set1Placed', () => this.closeTab(this.modal))
        this.eventBus.on('set2Placed', () => this.closeTab(this.modal))

        // highlightEvents
        this.eventBus.on('addInvSetHighlights', (arr) => {
            arr.forEach(element => {
                const itemsFound = this.items.filter(item => item.name === element)
                itemsFound.forEach(item => {
                    if(!item.hasElHighlight) {
                        item.hasElHighlight = true 
                    }
                })
            })
        })
    }

    checkPlaceEmitListeners(name) {
        switch(name) {
            case 'ASRock X570 PG Velocita':
                this.eventBus.emit('motherboardPlaced')
                this.closeTab(this.modal)
                break
        }
    }
///////////////////////////////////// event monitor /////////////////////////////////


    pause() {
        window.removeEventListener('mousedown', this.boundMouseDown)
    }

    resume() {
        window.addEventListener('mousedown', this.boundMouseDown)
    }

    openTab(modal) {
        modal.show()
        modal.isOpen = true

        // for canvas monitoring 
        this.isActive = true
    }

    closeTab(modal) {
        modal.close()
        modal.isOpen = false

        // for canvas monitoring 
        this.isActive = false
    }

    // Handle User Click Out of Bounds
    handleOutofBounds(e, modal) {
        const rawMouse = {x: e.clientX, y: e.clientY}
        const rect = modal.getBoundingClientRect()

        if(!this.utilityTool.isInsideBox(rawMouse, rect) && modal.isOpen) {
            
            this.closeTab(modal)
        }
    }

    // Create HTML Element for Each Item in Inventory
    createItemElements(items, container) {
        container.innerHTML = '' // Clear existing items
        items.forEach(item => {
            const imageSource = item.images.find(image => image.side == item.defaultSource).imageSrc
            const element = this.utilityTool.makeItemElement(item, imageSource) 

            // Associate the item with the element.
            element.component = item;

            // Create a remove marker ("X") with absolute positioning.
            const removeBtn = document.createElement('div');
            removeBtn.className = 'remove-btn';
            removeBtn.textContent = '↩'; // palitan na lang pag di trip yung emoji hahaha

            // Bind the click event listener to remove this component from the inventory.
            removeBtn.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent placement behavior.
                const index = this.items.indexOf(item);
                if (index > -1) { // check index if it exists
                    this.items.splice(index, 1); // Remove the item from the inventory array
                }
                // Re-render the inventory display.
                this.update();
                // Show notif of item deletion
                this.showItemDeletionNotification(item);
            });
            // append remove button to element
            element.appendChild(removeBtn);

            element.classList.toggle('highlight-element', !!item.hasElHighlight)

            container.appendChild(element)
        })
    }

    showItemDeletionNotification(item) {
        const toast = document.createElement('div');
        toast.className = 'toast-notification';
        toast.innerHTML = `
            <div class="toast-header">
                <span class="toast-title">Item Removed</span>
                <button class="close-toast">×</button>
            </div>
            <div class="toast-content">
                Removed ${item.name} from inventory
            </div>
        `;

        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    }
    // Add Component to Shelf
    addToShelf(newComponent, shelf) {
        let added = this.displayArea.fillShelf(newComponent, shelf)
    
        // if all component properties are occupied, shift components to the next object
        if(!added) {
            const lastElement = shelf[shelf.length - 1]
            const removedComponent = lastElement.component
    
            for(let i = shelf.length - 1; i > 0; i--) {
                const prevElement = shelf[i - 1]
                shelf[i].component = prevElement.component
            }
    
            // Add the new component to the first object
            shelf[0].component = newComponent

            // Return removed item to inventory
            this.returnToInv(removedComponent)
            // this.items.push(removedComponent)
        }
    }
    
    // returning components to Inventory 
    returnToInv(component) {
        const tempDetachedComponents = []

        const gatherAttachedComponents = (component) => {
            component.slots.forEach(slot => {
                if(slot.component) {
                    tempDetachedComponents.push(slot.component)
    
                    gatherAttachedComponents(slot.component)
                    slot.component = null
                    
                }
            })
        }

        gatherAttachedComponents(component)

        // remove attached component first
        if(tempDetachedComponents.length > 0) {
            tempDetachedComponents.forEach(tempItem => {
                this.items.push(tempItem)
            })
        }  

        this.items.push(component)
    }

    // Create Port Attributes
    createPortAttr(port, ref) { 
        // create a copy of the reference to avoid ports pointing on the same attributes
        const refClone = JSON.parse(JSON.stringify(ref))

        // find the reference for the specific port type
        const currentRef = refClone.find(refPort => refPort.type === port.type)

        // copy reference attributes to the copy of the port\
        port.image = currentRef.image
        port.offsets = currentRef.offsets
        port.style = currentRef.style
    }

   // Create Cable Attributes
   createCableAttr(cable, ref) {
        // create a copy of the reference to avoid cables pointing on the same attributes
        const refClone = JSON.parse(JSON.stringify(ref))

        // find the reference for the specific port type
        const currentRef = refClone.find(refcable => refcable.type === cable.type) 

        // return new class object
        return new Cable({
            id: this.utilityTool.createID('cable'),
            name: currentRef.name,
            type: currentRef.type,
            ends: currentRef.ends,
            images: currentRef.images
        })  
    }

    // Placing of Components to Display Area
    placeComponent(component) {
        const table = this.displayArea.table
        const shelf = this.displayArea.shelf
        const componentType = component.type
        
        const currentPortRef = portRef[componentType]
        const currentCableRef = cableRef[componentType]

        // create(fill) port attributes
        component.ports.forEach(port => {
            this.createPortAttr(port, currentPortRef)
        })

        // create(fill) cable attributes
        switch(component.type) {
            case 'psu':
                // different handling for PSUs
                const modularity = component.specs.cableModularity
                if(modularity === 'non-modular') {
                    component.cables = component.cables.map(cable => {
                        // create cable instance
                        const newCable = this.createCableAttr(cable, currentCableRef)
                        //  available port
                        const availablePort =  component.findAvailablePort(newCable)
                        if(availablePort) {
                            component.attachCable(availablePort, newCable, component.type)
                        }
                        return newCable
                    })
                } else if (modularity === 'semi-modular') {
                    component.cables = component.cables.map(cable => {
                        // cable instance
                        const newCable = this.createCableAttr(cable, currentCableRef)
                        // different handling for Motherboard ATX and CPU connectors
                        if(cable.type === '24-pin-power' || cable.type === '8-pin-power') {
                            // available port
                            const availablePort = component.findAvailablePort(newCable)
                            if(availablePort) component.attachCable(availablePort, newCable, component.type)
                        } 
                        return newCable
                    })
                } else {
                    component.cables = component.cables.map(cable=> this.createCableAttr(cable, currentCableRef))
                }  
                break 
            case 'cooling':
                component.cables = component.cables.map(cable=> this.createCableAttr(cable, currentCableRef))
                // update logic so that cooling cables are already attached
                component.ports[0].offsets[0].cableAttached = component.cables[0]
                break
            default: 
            component.cables = component.cables.map(cable=> this.createCableAttr(cable, currentCableRef))
        }
            
        // add to Table
        if(!table.component) {
            this.displayArea.table.component = component
            return
        }

        // add to Shelf
        this.addToShelf(component, shelf)
    }
    
    // Main Inventory Update Method
    update() {
        // clear Item Elements
        while (this.itemsContainer.firstChild) {
            this.itemsContainer.removeChild(this.itemsContainer.firstChild);
        }

        // recreate Item Elements
        this.createItemElements(this.items, this.itemsContainer)

        // placing event
        let containerChildren = Array.from(this.itemsContainer.children) 

        containerChildren.forEach((child, index) => {
            child.addEventListener('click', () => {
                // remove component from inventory
                const removedComponent = this.items.splice(index, 1)

                // place removed component to display area
                this.placeComponent(removedComponent[0])

                this.checkPlaceEmitListeners(child.dataset.name)

                // update display area information
                this.displayArea.update()
                
                // update inventory information
                this.update()
            })
        })
    }
}

export default Inventory