class Drawer {
    constructor(elementHandler, utilityool) {
        // Utility
        this.elementHandler = elementHandler
        this.elements = this.elementHandler.getDrawerElements()
        if(!this.elements) throw new Error('Missing Drawer Elements');
       
        // Elements
        this.modal = this.elements.modal
        this.pullBtn = this.elements.pullBtn
        this.cableContainer = this.elements.cableContainer
        this.isActive = false

        // Events
        this.pullBtn.addEventListener('click', () => this.toggleDrawer())
    }

    // Toggle Drawer State
    toggleDrawer() {
        // get the arrow image to manipulate
        const image = this.pullBtn.querySelector('img')
        
        if(this.isActive) {
            // return drawer
            this.modal.classList.remove('pull')
            this.modal.classList.add('return')  

            image.style.transform = 'rotate(0)'
        } else {
            // pull up drawer
            this.modal.classList.remove('return')
            this.modal.classList.add('pull')

            image.style.transform = 'rotate(180deg)'
        }
        
        // toggle drawer state
        this.isActive = !this.isActive
    }
}

export default Drawer