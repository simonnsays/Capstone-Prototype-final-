class User {
    constructor(utilityTool) {
        // Utility
        this.utilityTool = utilityTool;

        this.isDragging = false;
        this.dragOffset = { x: 0, y: 0 };
        this.mousePoint = { x: 0, y: 0 };
        this.componentSelected = null;
        this.availableSlots = [];
    }

    returnComponentToShelf() {
        if (this.componentSelected) {
            this.componentSelected.box.x = this.componentSelected.origin.x;
            this.componentSelected.box.y = this.componentSelected.origin.y;
        }
    }

    dragComponent() {
        if (this.componentSelected) {
            this.componentSelected.box.x = this.mousePoint.x - this.dragOffset.x;
            this.componentSelected.box.y = this.mousePoint.y - this.dragOffset.y;
        }
    }

    // Reset Temporary Properties
    resetTempProperties() {
        // Reset dragging status
        this.isDragging = false;
        this.availableSlots = [];

        // Reset selected component and its origin
        if (this.componentSelected) {
            delete this.componentSelected.origin;
        }
        this.componentSelected = null;
    }

    // Create Temporary Properties for Selected Component
    createTempProperties() {
        if (this.componentSelected) {
            this.isDragging = true;
            this.dragOffset = {
                x: this.mousePoint.x - this.componentSelected.box.x,
                y: this.mousePoint.y - this.componentSelected.box.y
            };

            // Store origin to return to shelf if necessary
            this.componentSelected.origin = {
                x: this.componentSelected.box.x,
                y: this.componentSelected.box.y
            };
        }
    }

    // Select Component from Shelf
    selectComponent(shelf) {
        const componentFound = shelf.find((spot) =>
            spot.component && this.utilityTool.isInsideBox(this.mousePoint, spot.component.box)
        );

        return componentFound ? componentFound.component : null;
    }
}

export default User;
