class Assistant {
    constructor(elementHandler, utilityTool) {
        // DOM ELEMENTS
        this.elements = elementHandler.getAssistantElements()
        this.utilityTool = utilityTool
        this.image = this.elements.image
        
        // Mini mode
        this.miniElement = this.elements.assistantMini
        this.iconSec = this.elements.iconSec
        this.pulse = this.elements.pulse
        this.infoSec = this.elements.infoSec

        // Full modal mode
        this.fullElement = {
            modal: this.elements.assistantFull,
            isActive: false 
        } 
        this.modalIconArea = this.elements.modalIconArea
        this.modalBody = this.elements.modalBody  
        this.tasksBtn = this.elements.tasksBtn  
        this.errorsBtn = this.elements.errorsBtn  

        this.notifCount = 1

        this.dialogue = [
            'Hello! I am your assistant. Click on me to get started.',
        ]

        // TUTORIAL STEP BY STEPS
        this.tasks = [{ title: '', description: '' }]

        this.notifCount = 1
    }

    init() {
        window.addEventListener('mousemove', (e) => {
            this.handleMouseHover(e)
        })

        window.addEventListener('click', (e) => {
            const mouse = {x: e.clientX, y: e.clientY}
            const miniElementBox = this.miniElement.getBoundingClientRect()
            const fullElementBox = this.fullElement.modal.getBoundingClientRect()

            if(this.utilityTool.isInsideBox(mouse, miniElementBox) && !this.fullElement.isActive) {
                this.openModal() // open page                
            } else if(!this.utilityTool.isInsideBox(mouse, fullElementBox) && this.fullElement.isActive) {
                this.closeModal() // close page
            }
        })

        this.tasksBtn.classList.add('asst-active')
        this.errorsBtn.classList.add('asst-inactive')

        this.tasksBtn.addEventListener('click', () => {
            console.log('tasks reavealing')
            this.tasksBtn.classList.remove('asst-inactive')
            if(!this.tasksBtn.classList.contains('asst-active')) {
                this.tasksBtn.classList.add('asst-active')
            }

            this.errorsBtn.classList.remove('asst-active')
            if(!this.errorsBtn.classList.contains('asst-inactive')) {
                this.errorsBtn.classList.add('asst-inactive')
            }

            this.modalBody.classList.add('show-tasks')
            if(this.modalBody.classList.contains('show-errors')) {
                this.modalBody.classList.remove('show-errors')
            }
        })

        this.errorsBtn.addEventListener('click', () => {
            console.log('errors reavealing')
            this.errorsBtn.classList.remove('asst-inactive')
            if(!this.errorsBtn.classList.contains('asst-active')) {
                this.errorsBtn.classList.add('asst-active')
            }

            this.tasksBtn.classList.remove('asst-active')
            if(!this.tasksBtn.classList.contains('asst-inactive')) {
                this.tasksBtn.classList.add('asst-inactive')
            }

            this.modalBody.classList.add('show-errors')
            if(this.modalBody.classList.contains('show-tasks')) {
                this.modalBody.classList.remove('show-tasks')
            }
        })

        document.addEventListener('DOMContentLoaded', () => {
            this.toggleErrorView()
            // this.setupTaskEventListeners()
        })
    }

    openModal() {
        this.fullElement.modal.showModal()  
        this.fullElement.isActive = true  

        // transfer icon to modal
        this.miniElement.classList.add('in-modal')
        this.modalIconArea.appendChild(this.miniElement)
    }

    closeModal() {
        const windowBody = document.querySelector('body')
        this.fullElement.modal.close()
        this.fullElement.isActive = false

        // transfer back to web page
        this.miniElement.classList.remove('in-modal')
        windowBody.appendChild(this.miniElement)
    }

    handleMouseHover(e) {
        if(this.utilityTool.isInsideBox({x: e.clientX, y: e.clientY}, this.miniElement.getBoundingClientRect())) {
            this.notifCount = 0

            this.miniElement?.classList.add('extended')
            this.miniElement.style.cursor = 'pointer'

            this.pulse?.classList.add('hidden')
            
            this.miniElement?.addEventListener('transitionend', () => {
                setTimeout(() => {
                    this.infoSec?.classList.remove('hidden')
                }, 1)
            })
        } else {
            this.notifCount = 1
            this.miniElement?.classList.remove('extended')
            this.miniElement.style.cursor = 'default'
            this.pulse?.classList.remove('hidden')
            this.infoSec?.classList.add('hidden')

            // this.miniElement?.addEventListener('transitionend', () => {
            //     setTimeout(() => {
            //     }, 10)
            // })  
        }
    }

    isInArea(area, mouse) {
        if (!area) return false // Guard clause for undefined area
        let point = { x: mouse.clientX, y: mouse.clientY }
        let rect = area.getBoundingClientRect()

        return (
            point.x > rect.x &&
            point.x < rect.x + rect.width &&
            point.y > rect.y &&
            point.y < rect.y + rect.height
        )
    }

    ////////////////////////////    TASKS    ////////////////////////////

    // Function to move the assistant container to the bubble
    moveAssistantContainerToBubble() {
        const assistantContainer = document.getElementById('assistantContainer')
        const assistantBubble = document.getElementById('assistantBubble')
        if (assistantContainer && assistantBubble && !assistantBubble.contains(assistantContainer)) { // Ensure the container is not already in the bubble
            assistantBubble.appendChild(assistantContainer) // Move assistant container to bubble
            assistantContainer.classList.add('in-modal') // Add a class to style the assistant container in the bubble
            assistantContainer.classList.remove('in-original') // Remove the original class to prevent conflicts
            this.createBubbleMessage() // Create a bubble message below the assistant container
        }
    }

    // Function to move the assistant container back to its original place
    moveAssistantContainerBack() {
        const assistantContainer = document.getElementById('assistantContainer')
        const originalPlace = this.originalParent // Get the original parent of the assistant container
        if (assistantContainer && originalPlace && originalPlace !== assistantContainer.parentElement) { // Ensure the container is not already in the original place
            originalPlace.appendChild(assistantContainer) // Move the assistant container back to its original place
            assistantContainer.classList.add('in-original') // Add class for original styles
            assistantContainer.classList.remove('in-modal') // Remove class for modal styles
        }
    }

    // Function to create a bubble message below the assistant container
    createBubbleMessage() {
        const assistantBubble = document.getElementById('assistantBubble')
        const existingMessage = assistantBubble.querySelector('.bubble-message')
    
        // Prevent duplicate messages
        if (!existingMessage) {
            const bubbleMessage = document.createElement('div') // Create a new div element then add text content to it
            bubbleMessage.className = 'bubble-message'
            bubbleMessage.textContent = 'Here are your tasks. Follow the instructions to complete them.'
            assistantBubble.appendChild(bubbleMessage) // Add the message to the bubble
        }
    }

    // Toggle between the task and error views
    toggleErrorView() {
        if (this.taskContainer && this.errorContainer) {
            this.errorContainer.style.display = "none"
            document.getElementById("switch").addEventListener("change", () => {
                if (document.getElementById("switch").checked) {
                    this.taskContainer.style.display = "none"
                    this.errorContainer.style.display = "flex"
                } else {
                    this.taskContainer.style.display = "flex"
                    this.errorContainer.style.display = "none"
                }
            })
        }
    }
}

export default Assistant
