class User {
    constructor() {
        this.isDragging = false
        this.dragOffset = {x: 0, y: 0}
        this.mousePoint = {x: 0, y: 0}
        this.componentSelected = null
        this.availableSlots = []
    }
}

export default User