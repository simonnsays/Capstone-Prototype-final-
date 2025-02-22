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

        this.dialogue = [
            'Hello! I am your assistant. Click on me to get started.',
        ]

        // TUTORIAL STEP BY STEPS
        this.tasks = [{ title: '', description: '' }]

        this.notifCount = 1
        this.boundMouseHover = this.handleMouseHover.bind(this)
    }

    init() {
        // Mini Element Listeners
        window.addEventListener('mousemove', this.boundMouseHover)
                
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

        // Full Page Element Listeners
        this.revealTasks()
        
        this.tasksBtn.addEventListener('click', () => this.revealTasks())

        this.errorsBtn.addEventListener('click', () => this.revealErrors())
    }

    revealTasks() {
        console.log('tasks reavealing')
        // change task button styling
        this.tasksBtn.classList.remove('asst-inactive')
        if(!this.tasksBtn.classList.contains('asst-active')) {
            this.tasksBtn.classList.add('asst-active')
        }

        // change errors button styling
        this.errorsBtn.classList.remove('asst-active')
        if(!this.errorsBtn.classList.contains('asst-inactive')) {
            this.errorsBtn.classList.add('asst-inactive')
        }

        // change asst body styling
        this.modalBody.classList.add('show-tasks')
        if(this.modalBody.classList.contains('show-errors')) {
            this.modalBody.classList.remove('show-errors')
        }
    }

    revealErrors() {
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
    }

    openModal() {
        this.fullElement.modal.showModal()  
        this.fullElement.isActive = true  

        // transfer icon to modal
        this.miniElement.classList.add('in-modal')
        this.miniElement.classList.add('extended')
        this.iconSec.style.animation = 'float 2s ease-in-out infinite'
        this.modalIconArea.appendChild(this.miniElement)

        window.removeEventListener('mousemove', this.boundMouseHover)
    }

    closeModal() {
        const windowBody = document.querySelector('body')
        this.fullElement.modal.close()
        this.fullElement.isActive = false

        // transfer back to web page
        this.miniElement.classList.remove('in-modal')
        this.miniElement.classList.remove('extended')
        this.iconSec.style.animation = 'none'
        windowBody.appendChild(this.miniElement)

        window.addEventListener('mousemove', this.boundMouseHover)
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
