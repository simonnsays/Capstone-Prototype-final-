import cableRef from "../Data/cableReference.js";

class Drawer {
    constructor(elementHandler, utilityTool, eventBus) {
        // Utility
        this.utilityTool = utilityTool
        this.eventBus = eventBus
        this.elementHandler = elementHandler
        this.elements = this.elementHandler.getDrawerElements()
        if(!this.elements) throw new Error('Missing Drawer Elements');
       
        // Elements
        this.modal = this.elements.modal
        this.pullBtn = this.elements.pullBtn
        this.cableContainer = this.elements.cableContainer
        this.isActive = false

        this.cables = []
        this.cableSelected = null

        // Events
        this.pullBtn.addEventListener('click', () => {
            this.eventBus.emit('drawerPulled')
            this.toggleDrawer()
        })
    }

    init() {
        this.subscribeToEventHub()
    }

    subscribeToEventHub() {
        this.eventBus.on('addEpsPinHighlight', (data) => {
            const foundEls = [...this.cableContainer.querySelectorAll(`[data-type="${data}"]`)]
            if(foundEls.length === 0) return

            foundEls.forEach(element => {
                element.classList.add('highlight-element')
            })
        }) 

        // this.eventBus.on('taskAdvanced', () => {
        //     const elements = this.cableContainer.querySelectorAll('.cableCell')
        //     for(let el of elements) {
        //         elements[el]?.classList.remove('highlight-element')
        //     }
        // })

        this.eventBus.on('bootUpTabOpened', () => {
            const image = this.pullBtn?.querySelector('img')
            if (image) this.closeDrawer(image)
        })
    }
    
    // Open Drawer
    openDrawer(image) {
        // pull up drawer
        this.modal.classList.remove('return')
        this.modal.classList.add('pull')

        image.style.transform = 'rotate(180deg)'

        // toggle state
        this.isActive = true
    }

    // Close Drawer
    closeDrawer(image) {
        // return drawer
        this.modal.classList.remove('pull')
        this.modal.classList.add('return')  

        image.style.transform = 'rotate(0)'

        // toggle state
        this.isActive = false
    }

    // Toggle Drawer State
    toggleDrawer() {
        // get the arrow image to manipulate
        const image = this.pullBtn.querySelector('img')

        // toggle
        if(this.isActive) {
            this.closeDrawer(image)
        } else {
            this.openDrawer(image)
        }
    }
    
    isBeingOpened(mouse) {
        if(this.utilityTool.isInsideBox(mouse, this.pullBtn.getBoundingClientRect())) {
            return true
        } 
        return false
    }

    isBeingUsed(mouse) {
        if(this.utilityTool.isInsideBox(mouse, this.cableContainer.getBoundingClientRect())) {
            return true
        } 
        return false
    }

    isBeingOpened(mouse) {
        if(this.utilityTool.isInsideBox(mouse, this.pullBtn.getBoundingClientRect())) {
            return true
        } 
        return false
    }

    isBeingUsed(mouse) {
        if(this.utilityTool.isInsideBox(mouse, this.cableContainer.getBoundingClientRect())) {
            return true
        } 
        return false
    }

    // Remind User to Pull Drawer Down
    remindUser() {
        const image = document.querySelector('#pulleyImage')
        // wiggle pulley button a couple times
        setTimeout(() => {
            this.pullBtn.classList.add('remind')
        }, 200)
        this.pullBtn.classList.remove('remind')
    }

    // Clear Selected Cable
    clearSelectedCable() {
        if(this.cableSelected) {
            this.cableSelected.div.classList.remove('active')
            this.cableSelected = null
        }
    }

    // Select Cable
    selectCable(cable) {
        this.cableSelected = cable
        cable.div.classList.add('active')
    }

    // Attach PSU Cables Automatically if Non-Modular
    initializePSUCables(component) {
        // Handle non-modular PSU
        if (!component.isModular) {
            // console.log("PSU is non-modular. Attaching all PSU cables by default.");

            // Connect all PSU cables
            component.cables.forEach((cable) => {
                cable.ends.psu.connected = true;
                // console.log(`Cable ${cable.type} connected to PSU.`);
            });
        }
    }
    
    initializeStoragePowerCables(storageComponent, psu) {
        // Check if PSU is non-modular
        if (!psu.isModular) {
            // console.log("PSU is non-modular. Attaching storage power cables without ports.");
    
            // Iterate over storage component's cables
            storageComponent.cables.forEach((cable) => {
                // Handle only sata-power cables
                if (cable.type === "sata-power" && cable.ends) {
                    cable.ends.psu.connected = true; // Mark the PSU end as connected
                    cable.ends.storage.connected = true; // Mark the Storage end as connected
                    console.log(`Storage power cable ${cable.type} connected directly to PSU and storage.`);
                } else {
                    // console.warn(`Cable ${cable.type} is not a power cable or lacks ends.`);
                }
            });
        } else {
            // console.log("PSU is modular. Storage power cables require port connections.");
        }
    }

    // Create Cable Attributes
    createCableAttr(cable, ref) {
        // create clone of the port
        const clone = {...cable}

        // find the reference for the specific port type
        const currentRef = ref.find(refcable => refcable.type === cable.type)

        // copy ref attributes to the copy of the cable
        clone.images = currentRef.images
        clone.scale = currentRef.scale

        return clone
    }

    // Get Cable Information
    getCables(component) {
        // fill drawer
        component.cables.forEach(cable => {
            this.cables.push(cable)
        })

        // do the same for attached components (recursive)
        component.slots.forEach(slot => {
            if(slot.component) this.getCables(slot.component)
        })
    }

    adjustCableStateStyle(cable, cell) {
        let endsConnected = 0

        for(let end in cable.ends) {
            if(cable.ends[end].connected) endsConnected++
        }

        switch(endsConnected) {
            case 1:
                cell.classList.add('semi-used')
                break
            case 2:
                cell.classList.add('used')
                break
            default:
                cell.classList.add('unused')
        }
    }

    // Create Cable Cells
    createCableCells() {
        // iterate through this.cables
        this.cables.forEach(cable => {
            // create cells 
            const cableCell = document.createElement('div')
            cableCell.className = 'cableCell'
            cableCell.dataset.type = cable.type

            // adjust cable background to indicate what state it is in
            this.adjustCableStateStyle(cable, cableCell)

            // create image
            const cableImage = document.createElement('img')
            cableImage.src = cable.images.drawer.imageSrc

            // create slider
            const cableSlider = document.createElement('div')
            cableSlider.className = 'cable-slider'
            cableSlider.innerHTML = cable.type + ' Cable'

            // append elements
            cableCell.appendChild(cableImage)
            cableCell.appendChild(cableSlider)
            this.cableContainer.appendChild(cableCell)

            // create div property
            cable.div = cableCell 
            
            // create bounding box of div for matching
            cable.div.rect = cable.div.getBoundingClientRect()
        })
    }

    // Main Update Function
    update(table, shelf) {
        let scrollPosition = this.cableContainer.scrollTop
        // delete cable cells
        while(this.cableContainer.firstChild) {
            this.cableContainer.removeChild(this.cableContainer.firstChild)
        }
        this.cables = []

        // get cable information from [ TABLE ]
        if(table.component) {
            this.getCables(table.component)
        }

        // get cable information from [ SHELF ]
        shelf.forEach(spot => {
            if(spot.component) {
                this.getCables(spot.component) 
            }
        })

        // create cells
        this.createCableCells()
        this.cableContainer.scrollTop = scrollPosition
    }
}

export default Drawer