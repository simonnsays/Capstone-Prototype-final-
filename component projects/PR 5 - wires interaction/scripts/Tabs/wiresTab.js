class WiresTab {
    constructor(elementHandler, utilityTool, displayArea) {
        // Utility
        this.utilityTool = utilityTool
        this.elements = elementHandler.getWiresElements()
        if(!this.elements) throw new Error('Missing Connections Elements')

        // Elements
        this.openBtn = this.elements.openBtn
        this.closeBtn = this.elements.closeBtn
        this.modal = this.elements.modal
        this.portsContainer = this.elements.portsContainer
        this.isActive = false

        // Drawer
        this.drawer = {
            element: this.elements.drawer,
            isActive: false,
            pullBtn: this.elements.pullBtn,
            cableContainer: this.elements.cableContainer
        }

        // Wires
        this.wires = []

        // Ports
        this.ports = []

        // Display Area
        this.displayArea = displayArea

        this.portAreas = {
            single: {area: 0, },
            grid: [
                {area: 0, }
            ]
        }

        // Events
        this.drawer.pullBtn.addEventListener('click', () => this.toggleDrawer())
        this.openBtn.addEventListener('click', () => this.openTab(this.modal))
        this.closeBtn.addEventListener('click', () => this.closeTab(this.modal))
        
    }

    openTab(modal) {
        // modal.showModal()
        modal.isOpen = true
        modal.style.display = 'block'

        // for canvas monitoring
        this.isActive = true
    }

    closeTab(modal) {
        // modal.close()
        modal.isOpen = false
        modal.style.display = 'none'

        // for canvas monitoring
        this.isActive = false
    }


    // Toggle Drawer State
    toggleDrawer() {
        // get the arrow image to manipulate
        const image = this.drawer.pullBtn.querySelector('img')
        
        if(this.drawer.isActive) {
            // return drawer
            this.drawer.element.classList.remove('pull')
            this.drawer.element.classList.add('return')  

            image.style.transform = 'rotate(0)'
        } else {
            // pull up drawer
            this.drawer.element.classList.remove('return')
            this.drawer.element.classList.add('pull')

            image.style.transform = 'rotate(180deg)'

        }
        
        // toggle drawer state
        this.drawer.isActive = !this.drawer.isActive
    }

    // Main Update Function
    update() {
        this.ports.forEach(port => {
            const element = document.createElement('div')
            const image  = document.createElement('img')
            image.width = 900
            image.height = 600


            element.appendChild(image)
            this.portsContainer.appendChild(element)
        })

        // check if the table has a component
        if(this.displayArea.table.component) {
            // display ports of the component and attached components to it in wires tab
        }
    }
}

export default WiresTab