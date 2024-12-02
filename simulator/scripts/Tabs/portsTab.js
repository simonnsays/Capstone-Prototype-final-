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
        this.drawer = new Drawer(elementHandler, utilityTool)
        
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
        window.addEventListener('mousedown', (e) => this.handleOutofBounds(e, this.modal))
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

        // clear selected cable
        // this.drawer.clearSelectedCable()
        

        // create cells based on new information
        this.createPortCells()

        this.removeHighlights()
        // this.highlightPorts(this.drawer.cableSelected)

        this.drawer.cables.forEach(cable => {
            this.portOnClick()
        })
        

        this.displayAttachedCables()
    }

    // Get Port Informations
    getPorts(component) {
        // only create groups for components with ports 
        if(component.ports.length > 0) {
            const currentComponentType = component.type

            // create a new port object to group components
            const portGroup = {}

            portGroup.component = currentComponentType  // name of the component of the group of ports
            portGroup.ports = []                        // the group of ports

            // fill ports attribute
            component.ports.forEach(port => {
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

        // console.log(cable)
        // update cable connection state
        cable.ends[this.currentGroupPage.component].connected = true
    }

    // Remove Matching Port Highlight
    removeHighlights() {
        this.portGroups.forEach(group => {
            group.ports.forEach(port => {
                Object.keys(port.offset).forEach(key => {
                    const currentOffset = port.offset[key]

                    if(currentOffset.highlight) {
                        port.div.removeChild(currentOffset.highlight)
                        delete currentOffset.highlight
                    }
                })
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
        if(this.cableEndsMatchCurrentPage(cable, currentPage) || cable.ends[currentPage.component]?.connected) return

        currentPage.ports.forEach(port => {
            const baseDiv = port.div

            // match the cable type to the port.takes
            Object.keys(port.offset).forEach(key => {
                const currentOffset = port.offset[key]

                // highlight port when matched and no attached cable yet
                if (!currentOffset.cableAttached && cable.type === currentOffset.takes) {
                    // console.log(currentOffset)
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
        if(this.portGroups.length < 1 || !this.currentGroupPage) return

        // iterat through group page
        this.currentGroupPage.ports.forEach(port => {
            const baseDiv = port.div

            Object.keys(port.offset).forEach(key => {
                const currentOffset = port.offset[key]

                if(currentOffset.cableAttached) {
                    console.log(currentOffset.cableAttached)
                    console.log(currentOffset.cableAttached.images[port.style])
                    console.log(port.style)
                    const cableImage = currentOffset.cableAttached.images[port.style].find(image => 
                        image.attachedTo === this.currentGroupPage.component)

                    const attachedCableImageDiv = this.createAttachedCableImage(currentOffset, cableImage)

                    baseDiv.appendChild(attachedCableImageDiv)

                }   
            })
        //     switch(port.style) {
        //         case 'split': {
        //             Object.keys(port.offset).forEach(key => {
        //                 currentOffset = port.offset[key]
        //                 const cableImage = currentOffset.cableAttached.images['split'].find(image => image.attachedTo === this.currentGroupPage.component)
        //             })
        //         }
        //         break
        //         case 'single': {

        //         }
        //         break
        //     }

        //     if(this.currentGroupPage.component === 'gpu' && port.style === 'split') {
        //         Object.keys(port.offset).forEach(key => {
        //             const currentOffset = port.offset[key]
        //             // const cableImage = currentOffset.cableAttached.find
        //             console.log(currentOffset)
        //         })
        //     }

        //     // separate handling for multiple ports (that takes the same type of connector) in same image 
        //     else if(port.offset['first']) {
        //         for(let offset in port.offset) {
        //             const currentOffset = port.offset[offset]
        //             if(currentOffset.cableAttached) {
        //                 const cableImage = currentOffset.cableAttached.images.find(image => 
        //                     image.attachedTo === this.currentGroupPage.component)

        //                 const attachedCableImageDiv = this.createAttachedCableImage(currentOffset, cableImage, offset)

        //                 baseDiv.appendChild(attachedCableImageDiv)
        //             }
        //         }
        //     } else if(port.cableAttached) {
        //         // get image asset based on the current group page component
        //         const cableImage = port.cableAttached.images.find(image => image.attachedTo === this.currentGroupPage.component)

        //         const attachedCableImageDiv = this.createAttachedCableImage(port.offset, cableImage)

        //         baseDiv.appendChild(attachedCableImageDiv)
        //     }
        })
    }

    // Creation of Attached Cable Div
    createAttachedCableImage(offset, cableImage, portNum = '') {
        const imgElement = document.createElement('img')
        imgElement.src = cableImage.imageSrc
        imgElement.className = 'port-attached'

        // style to adjust port offset
        if(portNum.length !== 0 && cableImage.offset['first']) {
            // handling for ports that share the same image
            imgElement.style.top = cableImage.offset[portNum].top
            imgElement.style.left = cableImage.offset[portNum].left
        } else {
            imgElement.style.top = cableImage.offset.top
            imgElement.style.left = cableImage.offset.left
        }
        
        imgElement.style.transform = 'scale('+ cableImage.scale.width + ',' + cableImage.scale.height + ')'
        imgElement.style.transformOrigin = 'top left'

        return imgElement
    }

    // Highlight on click
    highlightOnClick(port, cable) {
        // attempt to attach cable
        this.attachCable(port, cable)

        // remove port highlight
        this.removeHighlights()

        // remove cable highlight
        this.drawer.clearSelectedCable()
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
                // clear previously selected cable
                if(this.drawer.selectCable) {
                    this.drawer.clearSelectedCable()
                }
                // select cable
                this.drawer.selectCable(cable)

                // reset port highlights
                this.removeHighlights()
                this.highlightPorts(cable)

                if(!this.currentGroupPage) return

                // cable attachment
                // this.portOnClick(cable)
                this.currentGroupPage.ports.forEach(port => {
                    Object.keys(port.offset).forEach(key => {
                        const currentOffset = port.offset[key] 
                        if(currentOffset.highlight) {
                            // console.log(port)
                            // console.log(currentOffset)
                            // ! ! ! !  CONTINUE  HERE
                        }
                        
                    })
                })
            })
        })
    }

    portOnClick(cable) {
        this.currentGroupPage.ports.forEach(port => {

            Object.keys(port.offset).forEach(key => {
                const currentOffset = port.offset[key] 
                if(currentOffset.highlight) {
                    console.log(port)
                    console.log(currentOffset)
                }
            })

            // if port.offset have multiple objects in
            // if(port.offset['first']) {
            //     // iterate through the offsets
            //     for (let offset in port.offset) {
            //         if(port.offset[offset].highlight) {
            //             port.offset[offset].highlight.addEventListener('click', () => {
            //                 this.highlightOnClick(port.offset[offset], cable)

            //                 this.update(table, shelf)
            //             })
            //         }
            //     }
            // } else if(port.highlight){
            //     port.highlight.addEventListener('click', () => {
            //         this.highlightOnClick(port, cable)

            //         this.update(table, shelf)
            //     })
            // } 
        })
    }
}
export default PortsTab