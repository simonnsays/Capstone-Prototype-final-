class User {
    constructor(utilityTool) {
        // Utility
        this.utilityTool = utilityTool

        this.isDragging = false
        this.dragOffset = {x: 0, y: 0}
        this.mousePoint = {x: 0, y: 0}
        this.componentSelected = null
        this.availableSlots = []

        this.detachableComponents = []
        this.componentToDetach = null

        this.componentToTrash = null
    }

    returnComponentToShelf() {
        this.componentSelected.box.x = this.componentSelected.origin.x
        this.componentSelected.box.y = this.componentSelected.origin.y
    }

    dragComponent() {
        this.componentSelected.box.x = this.mousePoint.x - this.dragOffset.x
        this.componentSelected.box.y = this.mousePoint.y - this.dragOffset.y
    }

    // Reset Temporary Properties
    resetTempProperties() {
        // Reset dragging status
        this.isDragging = false;

        // ...slots
        this.availableSlots = [];

        // component selected
        delete this.componentSelected?.origin
        this.componentSelected = null

        // detachables
        // this.detachableComponents = []
        // this.componentToDetach = null

    }

    // Create Temporary Properties
    createTempProperties() {
        this.isDragging = true
        this.dragOffset = {
            x: this.mousePoint.x - this.componentSelected.box.x,
            y: this.mousePoint.y - this.componentSelected.box.y
        }

        // create origin point for action undo 
        this.componentSelected.origin = {x: this.componentSelected.box.x, 
            y: this.componentSelected.box.y}
    }

    // Select Component from Shelf
    selectComponent(shelf) {
       // check if mouse is clicking on a certain component
       const componentFound = shelf.find(spot => spot.component && this.utilityTool.isInsideBox(this.mousePoint, spot.component.box))
            
       // place component found to this.componentSelected
       return componentFound 
       ? componentFound.component
       : null
    }

    takeDetachableComponents(baseComponent) {
        baseComponent.slots.forEach(slot => {
            if(slot.component) {
                this.detachableComponents.push({
                    // reference both the base and attached component
                    base: baseComponent,
                    attached: slot.component 
                })

                this.takeDetachableComponents(slot.component)
            }
        })
    }

}

export default User;
