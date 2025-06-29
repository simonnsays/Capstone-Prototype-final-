import Drawer from "./drawer.js"

class PortsTab {
    constructor(elementHandler, utilityTool, eventBus, bootUpTab) {
        // Utility
        this.utilityTool = utilityTool
        this.eventBus = eventBus
        this.elements = elementHandler.getWiresElements()
        if(!this.elements) throw new Error('Missing Connections Elements')
        this.bootUpTab = bootUpTab
        // Open / Close tab buttons
        this.openBtn = this.elements.openBtn
        this.closeBtn = this.elements.closeBtn
        
        // port tab
        this.isActive = false
        this.modal = this.elements.modal
        this.portsContainer = this.elements.portsContainer
        this.portsGroupLabel = this.elements.portsGroupLabel
        this.pageRightBtn = this.elements.pageRightBtn
        this.pageLeftBtn = this.elements.pageLeftBtn

        // Drawer
        this.drawer = new Drawer(elementHandler, utilityTool, this.eventBus)
        
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
        this.portsMonitoring = false

        // Events
        this.openBtn.addEventListener('click', () => {
            eventBus.emit('portsTabOpened')
            this.openTab(this.modal)
        })
        this.closeBtn.addEventListener('click', () => this.closeTab(this.modal)) 
        window.addEventListener('click', (e) => this.handleWindowClick(e))

        // port group page change event
        this.boundHandleOutofBounds = (e) => this.handleOutofBounds(e, this.modal)
        window.addEventListener('mousedown', this.boundHandleOutofBounds)
        this.pageRightBtn.addEventListener('click', () => {
            this.turnPortPageRight()
        })
        this.pageLeftBtn.addEventListener('click', () => this.turnPortPageLeft())
    }

    isSystemPoweredOn() {
        return this.bootUpTab.pcUnit.power === 'on';
    }

    init() {
        this.subscribeToEvents() 
        this.drawer.init()
    }

    subscribeToEvents() {
        this.eventBus.on('gamePause', () => this.pause())
        this.eventBus.on('gameResume', () => this.resume())

        this.eventBus.on('portsTabOpened', () => {this.portsMonitoring = true})
    }

    pause() {
        window.removeEventListener('mousedown', this.boundHandleOutofBounds)
    }

    resume() {
        window.addEventListener('mousedown', this.boundHandleOutofBounds)
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

        this.emitPageName(this.currentGroupPage.component)
        this.updatePage()
    }

    // Turn Port Page Left
    turnPortPageLeft() {
        // adjust this.i and this.currentGroupPage to iterate to the previous page
        this.i = (this.i + 1) % this.portGroups.length
        this.currentGroupPage = this.portGroups[this.i]
        
        if (!this.currentGroupPage) return
        
        this.emitPageName(this.currentGroupPage.component)
        this.updatePage()
    }
    
    emitPageName(name) {
        switch(name) {
            case 'motherboard':
                this.eventBus.emit('portMoboNavigated')
                break
            case 'psu':
                this.eventBus.emit('portPsuNavigated')
                break
            case 'storage':
                this.eventBus.emit('portRomNavigated')
                break
            case 'gpu':
                this.eventBus.emit('portGpuNavigated')
                break
        }
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
        this.detachmentListener()   
    }

    // Get Port Informations
    getPorts(component) {
        // only create groups for components with ports 
        if(component.ports.length > 0) {
            const currentComponentType = component.type

            // create a new port object to group components
            const portGroup = {
                id: component.id,
                component: currentComponentType,    // name of the component of the group of ports
                ports: []                            // the group of ports
            }

            if(currentComponentType === 'psu') {
                switch(component.specs.cableModularity) {
                    case 'non-modular':
                        // only display the wired display
                        portGroup.ports.push(component.ports.find(port => port.type === 'non-modular'))
                        break
                    case 'semi-modular':
                        const nonDisplayedCables = ['24-pin-power', '8-pin-power']
                        // filter out the ATX and CPU connectors
                        portGroup.ports = component.ports.filter(port => {
                            const filteredPort = nonDisplayedCables.find(cable => port.type === cable)
                            if(!filteredPort) return port
                        })
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
            if(portGroup.component !== 'cooling') {
                this.portGroups.push(portGroup)
            }
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
        let groupDuplicates = this.portGroups.filter(group => group.component === this.currentGroupPage.component).reverse()
        
        // Add power state indicator
        const isPoweredOn = this.isSystemPoweredOn();
        if (isPoweredOn) {
            const warning = document.createElement('div');
            warning.className = 'power-warning';
            warning.textContent = '❌ System must be powered off to modify cables';
            this.portsContainer.appendChild(warning);
        }
        
        // set title to the group component of the current group page
        if(groupDuplicates.length === 1) {
            this.portsGroupLabel.innerHTML = this.currentGroupPage.component.toUpperCase()
        } else {
            this.portsGroupLabel.innerHTML = this.currentGroupPage.component.toUpperCase() + ' ' + (groupDuplicates.findIndex(group => group === this.currentGroupPage) + 1)
        }
        
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

            cellObj.addEventListener('mouseenter', () => {
                setTimeout(() => 
                    this.eventBus.emit('cellHovered')
                    , 1000)   
            })
            // append to container
            this.portsContainer.appendChild(cellObj)
            port.div = cellObj
        })
    }    

    emitAttached(cable, page) {
        const typeMap = {
            '24-pin-power': {
                motherboard: '24pinMoboAttached',
                psu: '24pinPsuAttached',
                // log: 'ATX Connector is attached'
            },
            '8-pin-power': {
                motherboard: 'epsMoboAttached',
                psu: 'epsPsuAttached',
                // log: 'EPS connector is attached'
            },
            '3-pin-cooling': { 
                any: 'cpuCoolingAttached' 
            },
            'frontPanel': { 
                any: 'frontPanelAttached' 
            },
            'sata-data': {
                motherboard: 'sDataMoboAttached',
                storage: 'sDataRomAttached'
            },
            'sata-power': {
                psu: 'sPowerPsuAttached',
                storage: 'sPowerRomAttached'
            },
            '8-pin-pcie': {
                psu: 'pciePsuAttached',
                gpu: 'pcieGpuAttached',
                // log: '8-pin-pcie e is attached'
            }
        }

        const config = typeMap[cable.type]
        if (!config) return console.warn(`Unknown cable type: ${cable.type}`)

        this.eventBus.emit(config[page] || config.any)
        if(config.log) console.log(config.log)
    }

    // Attach Cable
    attachCable(port, cable) {
        const componentPage = this.currentGroupPage.component;
        // Verify if the cable has an end for this component type
        if (!cable.ends[componentPage]) {
            console.warn(`Cable end not valid for component: ${componentPage}; \n\nChange CurrentGroupPage`);
            return;
        }
    
        // Attach cable in logic
        port.cableAttached = cable
        this.emitAttached(cable, componentPage)
    
        // Update cable connection state
        cable.ends[componentPage].connected = true
        cable.ends[componentPage].portAttachedTo = port
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
    }

    // Remove Matching Port Highlight
    removeHighlights() {
        this.portGroups.forEach(group => {
            group.ports.forEach(port => {
                if(port.offsets) {
                    port.offsets.forEach(offset => {
                        if(offset.highlight) {
                            port.div.removeChild(offset.highlight)
                            delete offset.highlight
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
            if(!port.offsets)return
            port.offsets.forEach(offset => {  

                // highlight port when matched and no attached cable yet
                if (!offset.cableAttached && cable.type === offset.takes) {
                    offset.highlight = this.createHighlight(offset, 'port-highlight') 
                    baseDiv.appendChild(offset.highlight)
                } 
            })
        })
    }

    createHighlight(offset, className) {
        // create the highlight div
        const highlight = document.createElement('div')
        highlight.className = className //'port-highlight'
        highlight.style.top = offset.top
        highlight.style.left = offset.left
        highlight.style.width = offset.width
        highlight.style.height = offset.height

        return highlight
    }

    // Display Attached Cables
    displayAttachedCables() { 
        if(this.portGroups.length < 1 || !this.currentGroupPage ) return
        let updatedPorts = this.currentGroupPage.ports

        // remove semi modular and modular titles for displaying cables
        if(this.currentGroupPage.ports.some(port => port.type === 'semi-modular' || port.type === 'non-modular')) {
            updatedPorts = this.currentGroupPage.ports.filter(port => port.type !== 'semi-modular' && port.type !== 'non-modular')
        }

        // iterate through page ports
        updatedPorts.forEach(port => {
            const baseDiv = port.div    
            port.offsets.forEach((offset, index) => {  
                if(offset.cableAttached) {
                    // find the cable image reference
                    const cableImageRef = offset.cableAttached.images[port.style].find(image => image.attachedTo === this.currentGroupPage.component)
                    // create attached cable image
                    const attachedCableImageDiv = offset.cableAttached.imgElement = this.createAttachedCableImage(cableImageRef, index)
                    
                    // append
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
        let cableOffset = cableImageRef.offsets[key] ?? null

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
            if(port.offsets) {
                port.offsets.forEach(offset => {
 
                    // highlight onclick
                    if(offset.highlight) {
                        const clickHandler = () => {
                             // Check system power state
                            if (this.isSystemPoweredOn()) {
                                return
                            }
                            // attempt to attach cable
                            this.attachCable(offset, cable)
                            // remove port highlight
                            this.removeHighlights()
                            // remove cable highlight
                            this.drawer.clearSelectedCable()
                            // update ports and cables
                            this.update(this.displayArea.table, this.displayArea.shelf)
                        }
                        offset.highlight.removeEventListener('click', clickHandler)
                        offset.highlight.addEventListener('click', clickHandler)
                    }    
                })
            }
        })
    }

    detachmentListener() {
        if(!this.currentGroupPage) return

        // listen to every cable that is already attached
        this.currentGroupPage.ports.forEach(port => {
            if(port.offsets) {
                port.offsets.forEach((offset, index) => {
 
                    // check for attached cable
                    if(offset.cableAttached) {
                        // ATTACHED CABLE REFERENCE
                        let cableAttached = offset.cableAttached
                        
                        // cableAttached onMouseHover
                        const hoverHandler = () => {
                            // make sure the image is rendered
                            cableAttached.imgElement.onload = () => {
                                const cableToPortDimensions = cableAttached.imgElement.getBoundingClientRect()
                                const cableStyle = cableAttached.images[port.style].find(style => style.attachedTo == this.currentGroupPage.component)

                                // create highlight
                                cableAttached.cableHighlight = this.createHighlight({
                                    left: cableStyle.offsets[index].left - 3, 
                                    top: cableStyle.offsets[index].top - 3,
                                    width: cableToPortDimensions.width + 6, 
                                    height: cableToPortDimensions.height + 6
                                }, 'cable-highlight')
                                port.div.appendChild(cableAttached.cableHighlight)

                                // ADD HIGHLIGHT LISTENERS
                                if(cableAttached.cableHighlight) {
                                    // onMouseLeave
                                    cableAttached.cableHighlight.removeEventListener('mouseleave', mouseLeaveHandler)
                                    cableAttached.cableHighlight.addEventListener('mouseleave', mouseLeaveHandler)

                                    // onClick
                                    cableAttached.cableHighlight.removeEventListener('click', clickHandler)
                                    cableAttached.cableHighlight.addEventListener('click', clickHandler)
                                }
                            }

                            if (cableAttached.imgElement.complete) {
                                cableAttached.imgElement.onload()
                            }
                        }
                        
                        // Highlight onClick 
                        const clickHandler = () => {
                            // Check system power state
                            if (this.isSystemPoweredOn()) {
                                return
                            }
                            // detach cable
                            cableAttached.ends[this.currentGroupPage.component].connected = false
                            offset.cableAttached = null
                            // remove port highlight
                            this.removeHighlights()
                            // remove cable highlight
                            this.drawer.clearSelectedCable()
                            // update ports and cables
                            this.update(this.displayArea.table, this.displayArea.shelf)
                            // this.drawer.update(this.displayArea.table, this.displayArea.shelf)
                        }

                        // Highlight onMouseLeave
                        const mouseLeaveHandler = () => {
                            // Remove the highlight when the mouse leaves
                            if (cableAttached.cableHighlight) {
                                port.div.removeChild(cableAttached.cableHighlight)
                                cableAttached.cableHighlight = null; // Clear reference
                            } else {
                                console.warn('Highlight not found or not a child of port.div', cableAttached.cableHighlight);
                            }
                        }

                        // Set event listeners for cable
                        cableAttached.imgElement.removeEventListener('mouseenter', hoverHandler)  
                        cableAttached.imgElement.addEventListener('mouseenter', hoverHandler)
                        
                   }    
                })
            }
        })
    }

    emitDivType(cable) {
        switch(cable.div.dataset.type) {
            case '24-pin-power':
                this.eventBus.emit('24pinSelected')
                break
            case '8-pin-power':
                this.eventBus.emit('epsSelected')
                break
            
        }
    }

    // Main Update Function
    update(table, shelf) {
        // Get drawer scroll position BEFORE update
        const drawerElement = this.drawer.cableContainer || document.querySelector('.drawer-container') // adjust selector as needed
        const scrollTop = drawerElement ? drawerElement.scrollTop : 0
        const scrollLeft = drawerElement ? drawerElement.scrollLeft : 0

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
        }

        // update drawer
        this.drawer.update(table, shelf)

        // Listen for Cable detachment
        // this.detachmentListener()

        // listen if one of the cable cells are clicked
        this.drawer.cables.forEach(cable => {
            cable.div.addEventListener('click', () => { 
                // Check system power state
                if (this.isSystemPoweredOn()) {
                    return
                }
                if(this.portsMonitoring) {
                    // Share if a cable element is being selected
                    this.emitDivType(cable)
                }

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

        // Restore scroll AFTER drawer update
        if (drawerElement) {
            drawerElement.scrollTop = scrollTop
            drawerElement.scrollLeft = scrollLeft
        }

        // at the end of update()
        setTimeout(() => {
        this.detachmentListener();
        }, 0);
    }
}
export default PortsTab
