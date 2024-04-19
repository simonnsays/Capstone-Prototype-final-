import cableRef from "../Data/cableReference.js";

class Drawer {
    constructor(elementHandler, utilityool) {
        // Utility
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
        this.pullBtn.addEventListener('click', () => this.toggleDrawer())
    }

    // Toggle Drawer State
    toggleDrawer() {
        // get the arrow image to manipulate
        const image = this.pullBtn.querySelector('img')
        
        if(this.isActive) {
            // return drawer
            this.modal.classList.remove('pull')
            this.modal.classList.add('return')  

            image.style.transform = 'rotate(0)'

            // clear selected cable
            this.cableSelected.div.classList.remove('active')
            this.cableSelected = null
        } else {
            // pull up drawer
            this.modal.classList.remove('return')
            this.modal.classList.add('pull')

            image.style.transform = 'rotate(180deg)'
        }
        
        // toggle drawer state
        this.isActive = !this.isActive
    }

    // Select Cable
    selectCable(cable) {
        console.log('this cell is active')
        this.cableSelected = cable
        cable.div.classList.add('active')
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
        const ref = cableRef[component.type] // reference for cables (see imports) 

        // fill drawer
        component.cables.forEach(cable => {
            const cableCopy = this.createCableAttr(cable, ref)

            this.cables.push(cableCopy)
        })

        // do the same for attached components (recursive)
        component.slots.forEach(slot => {
            if(slot.component) {
                this.getCables(slot.component)
            }
        })
    }


    // Create Cable Cells
    createCableCells() {
        // iterate through this.cables
        this.cables.forEach(cable => {
            // create cells 
            const cableCell = document.createElement('div')
            cableCell.className = 'cableCell unused'

            // create image
            const cableImage = document.createElement('img')
            cableImage.src = cable.images.find(image => image.state === 'default').imageSrc

            // create slider
            const cableSlider = document.createElement('div')
            cableSlider.className = 'cable-slider'
            cableSlider.innerHTML = cable.type + ' Cable'

            // append elements
            cableCell.appendChild(cableImage)
            cableCell.appendChild(cableSlider)
            this.cableContainer.appendChild(cableCell)
            cable.div = cableCell   
            cable.div.rect = cable.div.getBoundingClientRect()
        })
        
    }

    // Main Update Function
    update(table, shelf) {
        // delete cable cells
        while(this.cableContainer.firstChild) {
            this.cableContainer.removeChild(this.cableContainer.firstChild)
            this.cables = []
        }

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
    }
}

export default Drawer