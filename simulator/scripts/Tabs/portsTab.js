import Drawer from "./drawer.js"

class PortsTab {
    constructor(elementHandler, utilityTool, pcUnit, drawer) {
        // Utility
        this.utilityTool = utilityTool
        this.elements = elementHandler.getWiresElements()
        if(!this.elements) throw new Error('Missing Connections Elements')
        this.pcUnit = pcUnit
        this.drawer = drawer

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
        this.drawer = new Drawer(elementHandler, utilityTool)
        
        // Wires
        this.wires = []

        // This will keep track of the attachment status for cables
        this.attachedCablesStatus = []
        

        // Ports
        this.portGroups = []
        this.portConnectionStatus = []
        this.i = 0
        this.currentGroupPage = this.portGroups[this.i]

        this.displayArea = {
            table: null,
            shelf: null
        }

        // Events
        this.openBtn.addEventListener('click', () => this.openTab(this.modal))
        this.closeBtn.addEventListener('click', () => this.closeTab(this.modal)) 
        window.addEventListener('click', (e) => this.handleWindowClick(e))

        // port group page change event
        window.addEventListener('mousedown', (e) => this.handleOutofBounds(e, this.modal))
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
    
    handleOutofBounds(e, modal) {
        const rawMouse = {x: e.clientX, y: e.clientY}
        const rect = modal.getBoundingClientRect()
        if(this.drawer.isBeingOpened(rawMouse) || this.drawer.isBeingUsed(rawMouse)) {
            return
        }
        if(!this.utilityTool.isInsideBox(rawMouse, rect) && modal.isOpen)  {
            
            this.closeTab(modal)
        }
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

        // create cells based on new information
        this.updateTabUI()
        this.displayAttachedCables()
        if(this.drawer.cableSelected) {
            this.highlightPorts(this.drawer.cableSelected)
        }
        this.cableAttachmentListener(this.drawer.cableSelected)      
    }

    // Get Port Informations
    getPorts(component) {
        // // For PSU handling (i.e. modular or non-modular)
        // if (component.type === "psu") {
        //     // checking if psu is modular or non-modular
        //     if (component.isModular) {
        //         console.log("PSU is modular. Including ports in portGroups.");
        //     }else {
        //         console.log("PSU is non-modular. Ports will not be included.");
        //         return; // Skip adding non-modular PSU ports
        //     }
        // }

        // only create groups for components with ports 
        if(component.ports.length > 0) {
            const currentComponentType = component.type

            // create a new port object to group components
            const portGroup = {
                component: currentComponentType,    // name of the component of the group of ports
                ports: []                            // the group of ports
            }

            if(currentComponentType === 'psu') {
                switch(component.specs.cableModularity) {
                    case 'non-modular':
                        portGroup.ports.push(component.ports.find(port => port.type === 'non-modular'))
                        break
                    case 'semi-modular':
                        const nonDisplayedCables = ['24-pin-power', '8-pin-power']
                        // filter out the ATX and CPU connectors
                        portGroup.ports = component.ports.filter(port => nonDisplayedCables.find(cable => port.type !== cable)) 
                        // place the semi modular display in start of the array
                        portGroup.ports.unshift(portGroup.ports.splice(portGroup.ports.findIndex(port => port.type === 'semi-modular'),1)[0])               
                        break
                    default:
                        portGroup.ports = [...component.ports]
                        break
                }
            } else {
                portGroup.ports = [...component.ports]
            }
            
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
    updateTabUI() { 
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

        const component = this.currentGroupPage.component;

        // Verify if the cable has an end for this component type
        if (cable.ends[component] === undefined) {
            console.error(`Cable end not valid for component: ${component}`);
            return;
        }
    
        // Attach cable in logic
        port.cableAttached = cable;
    
        // Update cable connection state
        cable.ends[component].connected = true;
    
        // Get cable status for motherboard psu as false(starting value) for both ends
        if (!this.attachedCablesStatus[cable.type]) {
            this.attachedCablesStatus[cable.type] = { motherboard: false, psu: false, fullyConnected: false };
        }
    
        // Update the cable status for this component end
        this.attachedCablesStatus[cable.type][component] = true;
    
        // Check if both ends are now connected
        const bothEndsConnected = 
            (cable.ends.motherboard && cable.ends.motherboard.connected) &&
            (cable.ends.psu && cable.ends.psu.connected);
    
        // Only set fully connected if both ends are attached
        if (bothEndsConnected) {
            this.attachedCablesStatus[cable.type].fullyConnected = true;
            // console.log(`Cable ${cable.type} is fully connected.`);
        } else {
            this.attachedCablesStatus[cable.type].fullyConnected = false;
        }
    }       
    
    // Method to get the current attached cables status
    getAttachedCablesStatus() {
        return this.attachedCablesStatus;
    }

    // Helper method to find a port by type
    findPortByType(portType) {
        for (const group in this.portGroups) {
            const ports = this.portGroups[group];
            for (const port of ports) {
                if (port.type === portType) {
                    return port;
                }
            }
        }
        return null;
        // attach cable in logic
        port.cableAttached = cable      
        // update cable connection state
        cable.ends[this.currentGroupPage.component].connected = true
    }

    // Remove Matching Port Highlight
    removeHighlights() {
        this.portGroups.forEach(group => {
            group.ports.forEach(port => {
                if(port.offset) {
                    Object.keys(port.offset).forEach(key => {
                        const currentOffset = port.offset[key]
    
                        if(currentOffset.highlight) {
                            port.div.removeChild(currentOffset.highlight)
                            delete currentOffset.highlight
                        }
                    })
                }
            })
        })
    }

    cableEndsMatchCurrentPage(cable, page) {
        // return true if at least one of the cable ends matches the page component name
        Object.keys(cable.ends).forEach(endKey => {
            if (page && endKey === page.component) return true
        }) 
    
        return false
    }

    // Show Matching Port Highlight
    highlightPorts(cable) {
        const currentPage = this.currentGroupPage
        // don't highlight if cable end is already connected
        if(!currentPage || this.cableEndsMatchCurrentPage(cable, currentPage) || cable.ends[currentPage.component]?.connected) return

        currentPage.ports.forEach(port => {
            const baseDiv = port.div
            // match the cable type to the port.takes
            if(!port.offset)return
            Object.keys(port.offset).forEach(key => {
                const currentOffset = port.offset[key]  

                // highlight port when matched and no attached cable yet
                if (!currentOffset.cableAttached && cable.type === currentOffset.takes) {
                    currentOffset.highlight = this.createHighlight(currentOffset) 
                    baseDiv.appendChild(currentOffset.highlight)
                } 
            })
        })
    }

    createHighlight(offset) {
        // create the highlight div
        const highlight = document.createElement('div')
        highlight.className = 'port-highlight'
        highlight.style.top = offset.top
        highlight.style.left = offset.left
        highlight.style.width = offset.width
        highlight.style.height = offset.height

        return highlight
    }

    // Display Attached Cables
    displayAttachedCables() {
        if(this.portGroups.length < 1 || !this.currentGroupPage || this.currentGroupPage.ports.some(port => port.type === 'non-modular' || port.type === 'semi-modular') ) return
        // iterate through group page
        this.currentGroupPage.ports.forEach(port => {
            const baseDiv = port.div    

            console.log(port)
            Object.keys(port.offset).forEach(key => {
                const currentOffset = port.offset[key]  

                if(currentOffset.cableAttached) {
                    const cableImageRef = currentOffset.cableAttached.images[port.style].find(image => image.attachedTo === this.currentGroupPage.component)
                    const attachedCableImageDiv = this.createAttachedCableImage(cableImageRef, key)

                    baseDiv.appendChild(attachedCableImageDiv)
                }   
            })
        })
    }

    // Creation of Attached Cable Div
    createAttachedCableImage(cableImageRef, key = null) {
        // create image element
        const imgElement = document.createElement('img')
        imgElement.src = cableImageRef.imageSrc
        imgElement.className = 'port-attached'

        // for cables on different port of the same image
        let cableOffset = cableImageRef.offset[key] ?? cableImageRef.offset

        // set style
        imgElement.style.top = cableOffset.top
        imgElement.style.left = cableOffset.left
        imgElement.style.transform = 'scale('+ cableImageRef.scale.width + ',' + cableImageRef.scale.height + ')'
        imgElement.style.transformOrigin = 'top left'
        
        return imgElement
    }

    // ReInitializingh of the Onclick Event
    cableAttachmentListener(cable) {
        this.currentGroupPage.ports.forEach(port => {
            if(port.offset) {
                Object.keys(port.offset).forEach(key => {
                    const currentOffset = port.offset[key] 
                    // highlight onclick
                    if(currentOffset.highlight) {
                        const clickHandler = () => {
                            // attempt to attach cable
                            this.attachCable(currentOffset, cable)
                            // remove port highlight
                            this.removeHighlights()
                            // remove cable highlight
                            this.drawer.clearSelectedCable()
                            // update ports and cables
                            this.update(this.displayArea.table, this.displayArea.shelf)
                        }
                        currentOffset.highlight.removeEventListener('click', clickHandler)
                        currentOffset.highlight.addEventListener('click', clickHandler)
                    }    
                })
            }
        })
    }

    // Main Update Function
    update(table, shelf) {
        // delete port cells
        this.clearCells()
        this.portGroups = []
        this.drawer.cables = []

        this.displayArea.table = table
        this.displayArea.shelf = shelf

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
            this.updateTabUI(tableComponent)
            
            // display attached cables
            this.displayAttachedCables()

            // update drawer
            this.drawer.update(table, shelf)
        }

        // listen if one of the cable cells are clicked
        this.drawer.cables.forEach(cable => {
            cable.div.addEventListener('click', () => {                
                // clear previously selected cable
                if(this.drawer.cableSelected) {
                    this.drawer.clearSelectedCable()
                }
                // select cable
                this.drawer.selectCable(cable)

                // reset port highlights
                
                this.removeHighlights()
                this.highlightPorts(cable)

                if(!this.currentGroupPage) return

                // cable attachment
                this.cableAttachmentListener(cable)
                
            })
        })
    }
    
}
export default PortsTab
