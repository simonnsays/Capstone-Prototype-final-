import Drawer from "./drawer.js"
import portRef from "../Data/portReference.js"

class WiresTab {
    constructor(elementHandler, utilityTool) {
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
        this.portsGroupLabel = this.elements.portsGroupLabel

        // Drawer
        this.drawer = new Drawer(elementHandler)
        
        // Wires
        this.wires = []

        // Ports
        this.ports = []
        this.i = 0
        this.currentGroup = this.ports[this.i]

        // Events
        this.openBtn.addEventListener('click', () => this.openTab(this.modal))
        this.closeBtn.addEventListener('click', () => this.closeTab(this.modal)) 
        // this.drawer.pullBtn.addEventListener('click', () => this.toggleDrawer())
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

        // clear selected cable
        this.drawer.clearSelectedCable()

        // remove port highlights
        this.removeHighlights()
    }

    // Create Port Attributes
    createPortAttr(port, ref) {
        // create clone of the port
        const clone = {...port}

        // find the reference for the specific port type
        const currentRef = ref.find(refPort => refPort.type === port.type)

        // copy ref attributes to the copy of the port
        clone.image = currentRef.image
        clone.offset = currentRef.offset

        // other attributes
        clone.cableAttached = null

        return clone
    }

    // Get Port Informations
    getPorts(component) {
        const currentComponent = component.type
        const ref = portRef[currentComponent] // reference for ports (see imports)
        console.log(ref)

        // create a new port object to group components
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

    // Create Port Grid
    createPortGrid() {
        // create cells for each group
        this.ports.forEach(group => {
            this.portsGroupLabel.innerHTML = group.component.toUpperCase()

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
                celllSlider.innerHTML = port.type + ' Port'

                // append to cell div
                cellObj.appendChild(cellImg)
                cellObj.appendChild(celllSlider)

                // append to container
                this.portsContainer.appendChild(cellObj)
                port.div = cellObj
            })
        })
    }

    // Attach Cable
    attachCable(port, cable) {
        port.cableAttached = cable
        console.log(port.cableAttached)

        /*
        /       Maybe Abstract this
        */ 
        const baseDiv = port.div
        const imgElement = document.createElement('img')
        imgElement.src = cable.images.find(image => image.state === 'attached1').imageSrc
        imgElement.className = 'port-attached'

        // style to adjust port offset
        imgElement.style.top = port.offset.top
        imgElement.style.left = port.offset.left
        imgElement.style.transform = 'scale('+ cable.scale.width + ',' + cable.scale.height + ')'
        imgElement.style.transformOrigin = 'top left'

        baseDiv.appendChild(imgElement)

        // change cable display
        cable.div.classList.remove('unused')
        cable.div.classList.add('used')
    }

    removeHighlights() {
        this.ports.forEach(group => {
            group.ports.forEach(port => {
                if(port.highlight) {
                    port.div.removeChild(port.highlight)
                    delete port.highlight
                }
            })
        })
    }

    matchPorts(cable) {
        this.ports.forEach(group => {
            group.ports.forEach(port => {
                // highlight port when matched and no attached cable yet
                if(cable.type === port.type && !port.cableAttached) {
                    const baseDiv = port.div

                    // highlight div
                    const highlight = document.createElement('div')
                    highlight.className = 'port-highlight'
                    highlight.style.top = port.offset.top
                    highlight.style.left = port.offset.left
                    highlight.style.width = port.offset.width
                    highlight.style.height = port.offset.height

                    // append
                    baseDiv.appendChild(highlight)
                    port.highlight = highlight

                    // if highlight is selected
                    highlight.addEventListener('click', () => {
                        // attach cable
                        this.attachCable(port, cable)

                        // remove port highlight
                        this.removeHighlights()

                        // remove cable highlight
                        this.drawer.clearSelectedCable()
                    })
                }
            })
        })
    }

    // Main Update Function
    update(table, shelf) {
        // delete port cells
        while(this.portsContainer.firstChild) {
            this.portsContainer.removeChild(this.portsContainer.firstChild)
        }
        this.ports = []
        this.drawer.cables = []

        // check if the table has a component
        if(table.component) {
            const tableComponent = table.component

            // get ports
            this.getPorts(tableComponent)

            // create the grid for port display
            this.createPortGrid(tableComponent)

            // update drawer
            this.drawer.update(table, shelf)
        }

        // listen if one of the cable cells are clicked
        this.drawer.cables.forEach(cable => {
            cable.div.addEventListener('click', () => {
                // select cable
                this.drawer.selectCable(cable)

                // reset highlights
                this.removeHighlights()

                // highlight matching ports
                this.matchPorts(cable)
            })
        })
    }
}

export default WiresTab