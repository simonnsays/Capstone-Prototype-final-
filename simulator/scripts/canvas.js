class Canvas {
    constructor(elementHandler, utilityTool, displayArea, user) {
        // Utility
        this.elementHandler = elementHandler;
        this.utilityTool = utilityTool;

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
    }

    // Check if the component and slot are compatible
    checkCompatibility(component, slot) {
        if (!component) {
            console.error("Error: Component is undefined or null");
            return false;
        }
        if (!slot) {
            console.error("Error: Slot is undefined or null");
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
            alert(`This slot is not for a ${componentType} component. Please choose the correct slot.`);
            return false;
        }

        const componentSize = component.size;
        const slotSupports = slot.supports;

        if (!componentSize) {
            alert('Component size is missing. Please choose a valid component.');
            return false;
        }

        if (!slotSupports.includes(componentSize)) {
            alert(`This slot doesn't support a ${componentSize} component. Please choose a compatible component.`);
            return false;
        }

        return true;
    }

    // Function to show the confirmation dialog
    showConfirmationDialog(component) {
        this.componentToRemove = component;  
        this.confirmationDialog.style.display = 'block';  
    }

    // Function to confirm the removal of the component
    confirmRemoval() {
        if (this.componentToRemove) {
            this.removeComponentFromCanvas(this.componentToRemove);
        }
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
        if (e.button !== 0 || !this.isActive) return;

        this.user.componentSelected = this.user.selectComponent(this.shelf);

        if (!this.user.componentSelected) return;

        this.user.createTempProperties();

        this.displaySlots(this.table.component, this.user.componentSelected);
    }

    // Mouse Move Event
    handleMouseMove(e) {
        const canvasRect = this.element.getBoundingClientRect();
        const rawMouse = { x: e.clientX, y: e.clientY };

        this.user.mousePoint = {
            x: rawMouse.x - canvasRect.left,
            y: rawMouse.y - canvasRect.top
        };

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
        baseComponent.slots.forEach((slot) => {
            if (slot.type === componentSelected.type && !slot.component) {
                this.user.availableSlots.push(slot);
            }
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
        this.c.fillRect(this.trashBox.x, this.trashBox.y, this.trashBox.width, this.trashBox.height);
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
        if (this.user.availableSlots.length === 0) return;

        this.user.availableSlots.forEach(slot => {
            if (slot.box) {
                this.c.fillStyle = 'rgba(0, 255, 0, 0.4)';
                this.c.fillRect(slot.box.x, slot.box.y, slot.box.width, slot.box.height);
            }
        });
    }

    // Recursively Draw Attached Components
    drawAttachedComponents(slots, currentSide) {
        if (slots.length < 1) return;
        slots.forEach(slot => {
            if (slot.component) {
                const side = this.utilityTool.getSide(slot.component, currentSide);
                if (side) {
                    this.drawComponent(slot.component.box, side.image);
                }
                this.drawAttachedComponents(slot.component.slots, currentSide);
            }
        });
    }

    // Main Animate Function
    animate() {
        const table = this.table;
        const shelf = this.shelf;

        this.c.clearRect(0, 0, this.element.width, this.element.height);
        this.c.imageSmoothEnabed = true;
        
        this.c.fillStyle = '#fef9db';
        this.c.fillRect(0, 0, this.element.width, this.element.height);

        this.fillRoundRect(table.area.x, table.area.y, table.area.width, table.area.height, 30, '#c7ddcc');
        shelf.forEach(spot => {
            this.fillRoundRect(spot.area.x, spot.area.y, spot.area.width, spot.area.height, 20, '#c7ddcc');
        });

        // Trashbox
        this.drawtrashBox();

        if (table.component) {
            this.drawTableComponent(table.component, this.displayArea.currentSide);
            this.drawAttachedComponents(table.component.slots, this.displayArea.currentSide);
            this.drawAvailableSlots();
        }

        shelf.forEach(spot => {
            if (spot.component) {
                const occupiedSlots = spot.component.slots.filter(slot => slot.component);
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
                const component = spot.component;
                const componentSide = this.utilityTool.getSide(component, component.defaultSource);
                this.drawComponent(component.box, componentSide.image);
            }
        });

        requestAnimationFrame(() => this.animate());
    }
}

export default Canvas;
