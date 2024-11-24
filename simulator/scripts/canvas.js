class Canvas {
    constructor(elementHandler, utilityTool, displayArea, user, pcUnit, bootUpTab, inventory) {
        // Utility
        this.elementHandler = elementHandler;
        this.utilityTool = utilityTool;
        this.pcUnit = pcUnit;
        this.bootUpTab = bootUpTab;
        this.inventory = inventory;

        // Canvas Area
        this.element = elementHandler.getSimCanvas();
        if (!this.element) {
            throw new Error('no canvas element found');
        }
        this.element.width = 1300;
        this.element.height = 680;
        this.c = this.element.getContext('2d');
        this.isActive = true;

        // Display Area
        this.displayArea = displayArea;
        this.table = displayArea.table;
        this.shelf = displayArea.shelf;

        // Custom Alert Elements
        this.alertBox = document.getElementById('customAlert');
        this.alertMessage = document.getElementById('alertMessage');
        this.alertOkButton = document.querySelector('#alertOKButton');

        // User
        this.user = user;

        // Trash Icon 
        this.trashBox = { x: 570, y: 20, width: 80, height: 80 };

        // Dialog elements
        this.confirmationDialog = document.getElementById('confirmationDialog');
        this.confirmBtn = document.getElementById('confirmBtn');
        this.cancelBtn = document.getElementById('cancelBtn');
        this.componentToRemove = null;  // Placeholder for the component to remove

        // Mouse Events
        window.addEventListener('mousedown', (e) => this.handleMouseDown(e));
        window.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        window.addEventListener('mouseup', () => this.handleMouseUp());

        // Dialog Events
        this.confirmBtn.addEventListener('click', () => this.confirmRemoval());
        this.cancelBtn.addEventListener('click', () => this.cancelRemoval());
        this.alertOkButton.addEventListener('click', () => this.closeAlert());
    }

      // Custom Alert Handling
    showAlert(message) {
        this.alertMessage.textContent = message;
        this.alertBox.classList.remove('hidden');
    }

    closeAlert() {
        this.alertBox.classList.add('hidden');
    }
    highlight(box) {
        this.c.fillStyle = 'rgba(0, 255, 0, 0.4)'
        this.c.fillRect(
            box.x,
            box.y,
            box.width,
            box.height
        )
    }
    // Check if the component and slot are compatible
    checkCompatibility(component, slot) {
        if (!component || !slot) {
            console.error("Error: Invalid component or slot");
            return false;
        }

        const componentType = component.type;
        const slotType = slot.type;

        // Allow GPU to be placed in any GPU slot (forward/backward compatibility for different PCIe generations i.e. pcie 3.0/4.0/5.0/6.0)
        if (componentType === 'gpu' && slotType === 'gpu') {
            console.log('GPU detected, allowing compatibility for PCIe generations.');
            return true; 
        }
         // Allow CPU cooler to be placed in any cooling mount (forward/backward compatibility for different cooling mount(amd or intel))
         if (componentType === 'cooling' && slotType === 'cooling') {
            console.log('CPU cooler detected, allowing compatibility for mount compatibility can be used anywhere.');
            return true; 
        }

        if (!componentType) {
            console.error("Error: Component type is undefined or null");
            return false;
        }
        if (componentType !== slotType) {
            this.showAlert(`This slot is not for a ${componentType} component. Please choose the correct slot.`);
            return false;
        }

        const componentSize = component.size;
        const slotSupports = slot.supports;

        if (!componentSize) {
            this.showAlert('Component size is missing. Please choose a valid component.');
            return false;
        }

        if (!slotSupports.includes(componentSize)) {
            this.showAlert(`This slot doesn't support a ${componentSize} component. Please choose a compatible component.`);
            return false;
        }

        return true;
    }

    // Confirmation Dialog Handling
    showConfirmationDialog(component) {
        this.componentToRemove = component;
        this.confirmationDialog.style.display = 'block';
    }

    confirmRemoval() {
        if (this.componentToRemove) this.removeComponentFromCanvas(this.componentToRemove);
        this.confirmationDialog.style.display = 'none';
        this.componentToRemove = null;
    }

    cancelRemoval() {
        this.user.returnComponentToShelf();
        this.user.resetTempProperties();
        this.confirmationDialog.style.display = 'none';
        this.componentToRemove = null;
    }
    
    // Function to cancel the removal process
    cancelRemoval() {
        this.user.returnComponentToShelf(); 
        this.user.resetTempProperties();
        this.confirmationDialog.style.display = 'none'; 
        this.componentToRemove = null; 
    }

    // Mouse Down Event
    handleMouseDown(e) {
        // only accept left click
        if (e.button !== 0 || !this.isActive) return;

        // Unmount mode    
        if(!this.displayArea.isInMountMode) {
            if(!this.user.componentToDetach) return

            // check if okay to return to shelf or return to inventory 
            let componentIsAdded = this.displayArea.fillShelf(this.user.componentToDetach.attached, this.displayArea.shelf)

            if(!componentIsAdded) {
                this.inventory.returnToInv(this.user.componentToDetach.attached)
                this.inventory.update()
            }

            this.user.componentToDetach.base.slots.find(slot => 
                slot.component === this.user.componentToDetach.attached).component = null
            
            return
        }
        // try to select one of the components in shelf
        this.user.componentSelected = this.user.selectComponent(this.shelf);

        // do nothing if no selected components
        if (!this.user.componentSelected) return;

        // if a componnet is selected
        this.user.createTempProperties();
        
        // match slots
        this.displaySlots(this.table.component, this.user.componentSelected);
    }

    // Mouse Move Event
    handleMouseMove(e) {
        // adjust mouse point relative to the canvas
        const canvasRect = this.element.getBoundingClientRect();
        const rawMouse = { x: e.clientX, y: e.clientY };

        this.user.mousePoint = {
            x: rawMouse.x - canvasRect.left,
            y: rawMouse.y - canvasRect.top
        };

         // Unmount Mode
         if(!this.displayArea.isInMountMode && this.user.detachableComponents.length !== 0 && this.displayArea.table.component) {
            /*  check if mousepoint is hovering on 
                one of the components that can be detached
            */
            let componentCheck = false
            this.user.detachableComponents = []
            this.user.takeDetachableComponents(this.displayArea.table.component)
        
            this.user.detachableComponents.forEach(pair => {
                if(this.utilityTool.isInsideBox(this.user.mousePoint, pair.attached.box)) {
                    this.user.componentToDetach = pair
                    componentCheck = true
                }             
            })
        
            if(!componentCheck) {
                this.user.componentToDetach = null
            }
            return
        }

        // dragging event
        if(this.user.componentSelected && this.user.isDragging) {
            this.user.dragComponent()

            // return component if out of bounds
            if(!this.utilityTool.isInsideBox(rawMouse, canvasRect)) {
                this.user.returnComponentToShelf()
                this.user.resetTempProperties()
            }
        }
    }

    // Mouse Up Event - Handle dropping on trash
    handleMouseUp() {
        // return if no selected component
        if (!this.user.componentSelected) return;

        const adjustedMousePoint = {
            x: this.user.mousePoint.x,
            y: this.user.mousePoint.y
        };

        // Check if component is dropped on the trash icon
        if (this.utilityTool.isInsideBox(adjustedMousePoint, this.trashBox)) {
            this.showConfirmationDialog(this.user.componentSelected); // Show confirmation dialog
            this.user.returnComponentToShelf();
            this.user.resetTempProperties();
            return;
        }
        // check for interaction
        let isInteracting = false;

        this.user.availableSlots.forEach(slot => {
            if (!slot.box) throw new Error('Slot has no Box property');
            
            if (this.utilityTool.isInsideBox(this.user.mousePoint, slot.box)
                && slot.sides[this.displayArea.currentSide].accessible) {

                if (this.checkCompatibility(this.user.componentSelected, slot)) {
                    isInteracting = true;
                    this.displayArea.attachComponent(this.user.componentSelected, slot);
                } else {
                    isInteracting = true;
                    this.user.returnComponentToShelf();
                }
            }
        });

        if (!isInteracting && this.utilityTool.isInsideBox(this.user.mousePoint, this.table.area)) {
            isInteracting = true;
            this.displayArea.curr = 0;
            this.displayArea.currentSide = this.displayArea.displaySides[this.displayArea.curr];
            this.displayArea.swapComponents(this.user.componentSelected);
        }

        if (!isInteracting) {
            this.user.returnComponentToShelf();
        }

        this.user.resetTempProperties();
    }

    // Function to remove the component from the canvas
    removeComponentFromCanvas(component) {
        this.displayArea.removeComponent(component);
        console.log(`${component.name} has been removed.`);
    }

    // Redraw the entire canvas to reflect changes
    redrawCanvas() {
        this.c.clearRect(0, 0, this.element.width, this.element.height);
        this.animate();  // Re-draw components
    }

    // Display Slots
    displaySlots(baseComponent, componentSelected) {
        // match slot type to selected component type
        baseComponent.slots.forEach((slot) => {
            if (slot.type === componentSelected.type && !slot.component) {
                this.user.availableSlots.push(slot);
            }
            // get available slots from attached components
            if (slot.component) {
                this.displaySlots(slot.component, componentSelected);
            }
        });
    }

    // Rects With Border Radius(bent corners)
    fillRoundRect(left, top, width, height, radius, color) {
        this.c.beginPath();
        this.c.moveTo(left + radius, top);
        this.c.lineTo(left + width - radius, top);
        this.c.arcTo(left + width, top, left + width, top + radius, radius);
        this.c.lineTo(left + width, top + height - radius);
        this.c.arcTo(left + width, top + height, left + width - radius, top + height, radius);
        this.c.lineTo(left + radius, top + height);
        this.c.arcTo(left, top + height, left, top + height - radius, radius);
        this.c.lineTo(left, top + radius);
        this.c.arcTo(left, top, left + radius, top, radius);

        this.c.fillStyle = color;
        this.c.fill();
    }

    // Draw Component Image
    drawComponent(box, image) {
        this.c.drawImage(
            image,
            box.x,
            box.y,
            box.width,
            box.height
        );
    }

    // Trash box
    drawtrashBox() {
        this.c.fillRect(
            this.trashBox.x, 
            this.trashBox.y, 
            this.trashBox.width, 
            this.trashBox.height
        );
    }

    // Draw Component in Table Area
    drawTableComponent(component, currentSide) {
        let componentSide = component.isRotatable
            ? this.utilityTool.getSide(component, currentSide)
            : this.utilityTool.getSide(component, component.defaultSource);
        this.drawComponent(component.box, componentSide.image);
    }

    // Draw Available Slots
    drawAvailableSlots() {
        // do nothing if no available slots
        if (this.user.availableSlots.length === 0) return;
        // highlight default slot box (not necessarily compatible yet)
        this.user.availableSlots.forEach(slot => {
            // draw slot if a boudning box for slot is created
            if (slot.box) {
               this.highlight(slot.box)
            }
        });
    }

    // Recursively Draw Attached Components
    drawAttachedComponents(slots, currentSide) {
        // do nothing if component has no slots
        if (slots.length < 1) return;
        slots.forEach(slot => {
            if (slot.component) {
                const side = this.utilityTool.getSide(slot.component, currentSide);
                // draw slots according to the current side
                if (side) {
                    this.drawComponent(slot.component.box, side.image);
                }
                // draw attached components for components attached to the slot components
                this.drawAttachedComponents(slot.component.slots, currentSide);
            }
        });
    }

    // Main Animate Function
    animate() {
        const table = this.table;
        const shelf = this.shelf;
        // clear
        this.c.clearRect(0, 0, this.element.width, this.element.height);
        this.c.imageSmoothEnabed = true;
        // fill Background
        this.c.fillStyle = '#fef9db';
        this.c.fillRect(0, 0, this.element.width, this.element.height);
        // fill display area
        this.fillRoundRect(table.area.x, table.area.y, table.area.width, table.area.height, 30, '#c7ddcc');
        // fill shelf areas
        shelf.forEach(spot => {
            this.fillRoundRect(spot.area.x, spot.area.y, spot.area.width, spot.area.height, 20, '#c7ddcc');
        });

        // Trashbox
        this.drawtrashBox();
         // draw Display area component
        if (table.component) {
            // draw component
            this.drawTableComponent(table.component, this.displayArea.currentSide);
            // draw attached components
            this.drawAttachedComponents(table.component.slots, this.displayArea.currentSide);
            // draw available slots
            this.drawAvailableSlots();
        }
        // draw shelf components
        shelf.forEach(spot => {
            if (spot.component) {
                // check if component as attached components
                const occupiedSlots = spot.component.slots.filter(slot => slot.component);
                //  highlight a bit for indication that the component is attached
                if (occupiedSlots.length !== 0) {
                    const scale = 0.7;
                    const highlight = {
                        left: spot.area.x + (spot.area.width - (spot.area.width * scale)) / 2,
                        top: spot.area.y + ((spot.area.height - (spot.area.height * scale)) / 2) - 20,
                        width: spot.area.width * scale,
                        height: spot.area.height * scale + 40,
                        radius: 20,
                        color: 'rgba(255,170,0, 0.3)'
                    };
                    this.fillRoundRect(highlight.left, highlight.top, highlight.width, highlight.height, highlight.radius, highlight.color);
                }
                // all shelf components will use default source
                const component = spot.component;
                const componentSide = this.utilityTool.getSide(component, component.defaultSource);
                this.drawComponent(component.box, componentSide.image);
            }
        });

        if(this.user.componentToDetach) {
            this.highlight(this.user.componentToDetach.attached.box) 
        }   
        // Loop Canvas
        requestAnimationFrame(() => this.animate());
    }
}

export default Canvas;
