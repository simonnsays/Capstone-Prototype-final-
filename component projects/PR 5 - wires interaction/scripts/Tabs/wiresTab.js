import Drawer from "./drawer.js"
import portRef from "../Data/portReference.js"

class WiresTab {
    constructor(elementHandler, utilityTool, displayArea) {
        // Utility
        this.utilityTool = utilityTool
        this.elements = elementHandler.getWiresElements()
        if(!this.elements) throw new Error('Missing Connections Elements')

        // Open / Close tab buttons
        this.openBtn = this.elements.openBtn
        this.closeBtn = this.elements.closeBtn

        // Wires / port tab
        this.modal = this.elements.modal
        this.portsContainer = this.elements.portsContainer
        this.isActive = false

        // Drawer
        this.drawer = new Drawer(elementHandler)
        
        // Wires
        this.wires = []

        // Ports
        this.ports = []

        // Display Area
        this.displayArea = displayArea

        this.portAreas = {
            single: {area: 0, },
            grid: [
                {area: 0, },
                {area: 0, },
                {area: 0, },
                {area: 0, },
                {area: 0, },
                {area: 0, }
            ]
        }

        // Events
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

    createPortAttr(port, ref) {
        // create clone of the port
        const clone = {...port}

        // find the reference for the specific port type
        const currentRef = ref.find(refPort => refPort.type === port.type)

        // copy ref attributes to the copy of the port
        clone.image = currentRef.image
        clone.offset = currentRef.offset

        return clone
    }

    getPorts(component) {
        const currentComponent = component.type
        const ref = portRef[currentComponent] // reference for ports (see imports)
        // create a new port object
        const portObj = {}

        portObj.component = currentComponent
        portObj.ports = []

        // fill ports attribute
        component.ports.forEach(port => {
            // create port attributes
            const portCopy =  this.createPortAttr(port, ref)

            // insert copy in portObj
            portObj.ports.push(portCopy)
        })

        // puh object to the port list
        this.ports.push(portObj) 

        // do the same for attached components (recursive)
        component.slots.forEach(slot => {
            if(slot.component) {
                this.getPorts(slot.component)
            }
        })
    }

    createPortGrid(tableComponent) {
        // get ports
        this.getPorts(tableComponent)

        this.ports.forEach(group => {
            group.ports.forEach(port => {
                // create cell div
                const cellObj = document.createElement('div')
                cellObj.className = 'portCell'

                // create image representing port
                const cellImg = document.createElement('img')
                cellImg.className = 'port'
                cellImg.src = port.image.imageSrc

                // create slider for port info
                const celllSlider = document.createElement('div')
                celllSlider.className = 'port-slider'
                celllSlider.innerHTML = port.type

                // append to cell div
                cellObj.appendChild(cellImg)
                cellObj.appendChild(celllSlider)

                // append to container
                this.portsContainer.appendChild(cellObj)
            })
            
        })
    }

    // Main Update Function
    update() {
        // delete port cells
        while(this.portsContainer.firstChild) {
            this.portsContainer.removeChild(this.portsContainer.firstChild)
        }
        this.ports = []

        console.log(this.ports)

        // check if the table has a component
        if(this.displayArea.table.component) {
            const tableComponent = this.displayArea.table.component
            this.createPortGrid(tableComponent)
        }
    }
}

export default WiresTab