import Drawer from "./drawer.js"

class PortsTab {
    constructor(elementHandler, utilityTool) {
        // Utility
        this.utilityTool = utilityTool
        this.elements = elementHandler.getWiresElements()
        if(!this.elements) throw new Error('Missing Connections Elements')

        // Open / Close tab buttons
        this.openBtn = this.elements.openBtn
        this.closeBtn = this.elements.closeBtn

        // Wires / port tab
        this.isActive = false
        this.modal = this.elements.modal
        this.portsContainer = this.elements.portsContainer
        this.portsGroupLabel = this.elements.portsGroupLabel
        this.pageRightBtn = this.elements.pageRightBtn
        this.pageLeftBtn = this.elements.pageLeftBtn

        // Drawer
        this.drawer = new Drawer(elementHandler)
        
        // Wires
        this.wires = []

        // Ports
        this.portGroups = []
        this.i = 0
        this.currentGroupPage = this.portGroups[this.i]

        // Events
        this.openBtn.addEventListener('click', () => this.openTab(this.modal))
        this.closeBtn.addEventListener('click', () => this.closeTab(this.modal)) 
        window.addEventListener('click', (e) => this.handleWindowClick(e))

        // port group page change event
        this.pageRightBtn.addEventListener('click', () => this.turnPortPageRight())
        this.pageLeftBtn.addEventListener('click', () => this.turnPortPageLeft())
    }

    // Open Tab
    openTab(modal) {
        // modal.showModal()
        modal.isOpen = true
        modal.style.display = 'block'

        // for canvas monitoring
        this.isActive = true
    }

    // Close Tab
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

    // Clear Cells
    clearCells() {
        while(this.portsContainer.firstChild) {
            this.portsContainer.removeChild(this.portsContainer.firstChild)
        }
    }

    // Handle Window Click
    handleWindowClick(e) {
        const mousePoint = {x: e.clientX, y: e.clientY}

        // remind user if that canvas is unavailable to use when drawer is open
        if(
            !this.isActive && 
            this.drawer.isActive &&
            !this.utilityTool.isInsideBox(mousePoint, this.drawer.modal.getBoundingClientRect())
        ) {
            this.drawer.remindUser()
        }
    }

    // Turn Port Page Right
    turnPortPageRight() {
        // adjust this.i and this.currentGroupPage to iterate to the next page
        this.i = (this.i - 1 + this.portGroups.length) % this.portGroups.length;
        this.currentGroupPage = this.portGroups[this.i]

        if(!this.currentGroupPage) return

        // update port page
        this.updatePage()
    }

    // Turn Port Page Left
    turnPortPageLeft() {
        // adjust this.i and this.currentGroupPage to iterate to the previous page
        this.i = (this.i + 1) % this.portGroups.length
        this.currentGroupPage = this.portGroups[this.i]

        if (!this.currentGroupPage) return

        // update port page
        this.updatePage()
    }

    // Update Port Page
    updatePage() {
        // clear cells
        this.clearCells()

        // clear selected cable
        this.drawer.clearSelectedCable()

        // create cells based on new information
        this.createPortCells()

        this.displayAttachedCables()
    }

    

    // Get Port Informations
    getPorts(component) {
        // only create groups for components with ports 
        if(component.ports.length > 0) {
            const currentComponentType = component.type
            // const ref = portRef[currentComponentType] // reference for ports (see imports)

            // create a new port object to group components
            const portGroup = {}

            portGroup.component = currentComponentType    // name of the component of the group of ports
            portGroup.ports = []                      // the group of ports

            // fill ports attribute
            component.ports.forEach(port => {
                // create port attributes
                // const portCopy =  this.createPortAttr(port, ref)

                // insert copy in portGroup
                portGroup.ports.push(port)
            })

            // puh object to the portGroups list
            this.portGroups.push(portGroup) 
        }
        
        // do the same for attached components (recursive)
        component.slots.forEach(slot => {
            if(slot.component) {
                if(slot.component.ports.length > 0) {
                    this.getPorts(slot.component)
                }
                
            }
        })
    }

    // Create Port Grid
    createPortCells() {
        if(!this.currentGroupPage) return
        
        // set title to the group component of the current group page
        this.portsGroupLabel.innerHTML = this.currentGroupPage.component.toUpperCase()

        // create cell for each port of the group
        this.currentGroupPage.ports.forEach(port => {
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
    }

    // Attach Cable
    attachCable(port, cable) {
        // attach cable in logic
        port.cableAttached = cable        

        // change cable display
        cable.div.classList.remove('unused')
        cable.div.classList.add('used')
    }

    // Remove Matching Port Highlight
    removeHighlights() {
        this.portGroups.forEach(group => {
            group.ports.forEach(port => {
                if(port.highlight) {
                    port.div.removeChild(port.highlight)
                    delete port.highlight
                }
            })
        })
    }

    // Show Matching Port Highlight
    highlightPorts(cable) {
        const currentPage = this.currentGroupPage

        currentPage.ports.forEach(port => {
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

                // create port highlight property
                port.highlight = highlight
            }
        })
    }

    // Display Attached Cables
    displayAttachedCables() {
        if(this.portGroups.length < 1 || !this.currentGroupPage) return

        this.currentGroupPage.ports.forEach(port => {
            if(!port.cableAttached) return

            // get image asset based on the current group page component
            const cableImage = port.cableAttached.images.find(image => image.attachedTo === this.currentGroupPage.component)

            /*
            /       Maybe Abstract this
            */ 
            const baseDiv = port.div
            const imgElement = document.createElement('img')
            imgElement.src = cableImage.imageSrc
            imgElement.className = 'port-attached'

            // style to adjust port offset
            imgElement.style.top = port.offset.top
            imgElement.style.left = port.offset.left
            imgElement.style.transform = 'scale('+ cableImage.scale.width + ',' + cableImage.scale.height + ')'
            imgElement.style.transformOrigin = 'top left'

            baseDiv.appendChild(imgElement)
        })

        
        
    }

    // Main Update Function
    update(table, shelf) {
        // delete port cells
        this.clearCells()
        this.portGroups = []
        this.drawer.cables = []
        // this.i = this.i

        // check if the table has a component
        if(table.component) {
            const tableComponent = table.component

            /*  get ports method;
            *   this method gets the type of port from data
            *   and use that as reference to create other port attributes
            *   taken from portReference.js
            */
            this.getPorts(tableComponent)

            // get the current port group page
            this.currentGroupPage = this.portGroups[this.i]

            // create the cells for port display
            this.createPortCells(tableComponent)
            
            // display attached cables
            this.displayAttachedCables()

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
                this.highlightPorts(cable)

                // cable attachment
                this.currentGroupPage.ports.forEach(port => {
                    // if highlight is selected

                    if(!port.highlight) return

                    port.highlight.addEventListener('click', () => {
                        // attach cable
                        this.attachCable(port, cable)

                        // remove port highlight
                        this.removeHighlights()

                        // remove cable highlight
                        this.drawer.clearSelectedCable()

                        this.update(table, shelf)
                    })
                })
                
            })
        })
    }
}

export default PortsTab