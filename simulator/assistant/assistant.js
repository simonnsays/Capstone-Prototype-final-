import tasks from "./tasks.js"
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
        this.tasksContainer = this.elements.tasksContainer
        this.errorsContainer = this.elements.errorsContainer

        this.dialogue = [
            'Hello! I am your assistant. Click on me to get started.',
        ]

        // TUTORIAL STEP BY STEPS

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

        // Task Creations
        this.createTasks()

        window.addEventListener('click', () => this.toggleTaskCellStates())
    }

    // toggleTaskCellStates() {
    //     if (!this.tasksContainer.children.length > 0) {
    //         return;
    //     }
    
    //     Object.values(this.tasksContainer.children).forEach(taskCell => {
    //         if (!taskCell.dataset.listenerAttached) {
    //             taskCell.addEventListener('click', (event) => {
    //                 event.stopPropagation(); // Prevent unintended bubbling
    
    //                 // Check if the clicked task cell is already open
    //                 const isAlreadyOpened = taskCell.classList.contains('opened');
    
    //                 // Close any other open task cells
    //                 document.querySelectorAll('.task-cell.opened').forEach(openedCell => {
    //                     if (openedCell !== taskCell) {
    //                         openedCell.classList.remove('opened');
    //                     }
    //                 });
    
    //                 // If the task cell was not already open, open it
    //                 if (!isAlreadyOpened) {
    //                     taskCell.classList.add('opened');
    //                 }
    //             });
    
    //             taskCell.dataset.listenerAttached = true; // Mark as handled
    //         }
    //     });
    // }

    toggleTaskCellStates() {
        if (!this.tasksContainer.children.length > 0) {
            return
        }
    
        Object.values(this.tasksContainer.children).forEach(taskCell => {
            // Ensure only one event listener is attached
            if (!taskCell.dataset.listenerAttached) {
                taskCell.addEventListener('click', () => {
                    // Close any previously opened task cell
                    document.querySelectorAll('.task-cell.opened').forEach(openedCell => {
                        if (openedCell !== taskCell) {
                            openedCell.classList.remove('opened')
                        }
                    })
    
                    // Toggle the clicked task cell
                    taskCell.classList.toggle('opened')
                })
                taskCell.dataset.listenerAttached = true  // Mark as handled
            }
        })
    }   
       

    createTasks() {
        tasks.forEach(task => {
            const taskCell = document.createElement('div')
            taskCell.classList.add('task-cell')

            const cellTitle = this.createTaskTtitle(task)
            taskCell.appendChild(cellTitle)

            // description element
            const cellDescription = this.createTaskDescription(task)
            taskCell.appendChild(cellDescription)


            // const cellDescription = document.createElement('p')
            cellDescription.classList.add('task-description')
            cellDescription.textContent = task.description
            taskCell.appendChild(cellDescription)

            this.tasksContainer.appendChild(taskCell)
        })
    }

    createTaskTtitle(task) {
        // title element
        const cellTitle = document.createElement('p')
        cellTitle.classList.add('task-title')
        // > task icon
        const taskIcon = document.createElement('div')
        taskIcon.classList.add('task-icon')
        // > > task icon image
        const taskIconImage = document.createElement('img')
        taskIconImage.src = task.title.imageSrc
        taskIcon.appendChild(taskIconImage)

        // > task name
        const taskName = document.createElement('div')
        taskName.classList.add('task-name')
        // > > task name text
        const taskNameText = document.createElement('h3')
        taskNameText.textContent = task.title.text
        taskName.appendChild(taskNameText)
        // > > task name status
        const taskNameStatus = document.createElement('p')
        taskNameStatus.textContent = 'Completed'
        taskNameStatus.classList.add('task-status')
        taskNameStatus.visibility = 'hidden'
        taskName.appendChild(taskNameStatus)

        cellTitle.appendChild(taskIcon)
        cellTitle.appendChild(taskName)

        return cellTitle
    }

    createTaskDescription(task) {
        
    }

    revealTasks() {
        console.log('tasks reavealing')
        // change task button styling
        this.tasksBtn.classList.remove('asst-inactive')
        if(!this.tasksBtn.classList.contains('asst-active')) {
            this.tasksBtn.classList.add('asst-active')
        }

        // change errors button styling
        this.errorsBtn.classList.toggle('asst-active', false)
        this.errorsBtn.classList.toggle('asst-inactive', true)

        // change asst body styling
        this.modalBody.classList.toggle('show-tasks', true)
        this.modalBody.classList.toggle('show-errors', false)

        // body container styling 
        this.tasksContainer.style.display = 'flex'
        if(this.errorsContainer.style.display === 'flex') {
            this.errorsContainer.style.display = 'none'
        }
    }

    revealErrors() {
        console.log('errors reavealing')
        this.errorsBtn.classList.toggle('asst-inactive', false)
        this.errorsBtn.classList.toggle('asst-active', true)

        this.tasksBtn.classList.toggle('asst-active', false)
        this.tasksBtn.classList.toggle('asst-inactive', true)

        this.modalBody.classList.toggle('show-errors', true)
        this.modalBody.classList.toggle('show-tasks', false)

        this.errorsContainer.style.display = 'flex'
        if(this.tasksContainer.style.display === 'flex') {
            this.tasksContainer.style.display = 'none'
        }
    }

    openModal() {
        this.fullElement.modal.showModal()  
        this.fullElement.isActive = true  

        // transfer icon to modal
        this.miniElement.classList.add('in-modal')
        this.miniElement.classList.add('extended')
        this.iconSec.style.animation = 'float 2s ease-in-out infinite'
        this.pulse.classList.add('hidden')
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
        const isHovering = this.utilityTool.isInsideBox(
            {x: e.clientX, y: e.clientY}, 
            this.miniElement.getBoundingClientRect()
        )

        isHovering ? this.notifCount = 0 : this.notifCount = 1
        this.miniElement.classList.toggle('extended', isHovering)
        this.miniElement.style.cursor = isHovering ? 'pointer' : 'default'
        this.pulse.classList.toggle('hidden', isHovering)
        this.infoSec.classList.toggle('hidden', !isHovering)
    }

    ////////////////////////////    TASKS / CODE BELOW DEPRECATED   ////////////////////////////

    // Function to move the assistant container to the bubble
    moveAssistantContainerToBubble() {
        // const assistantContainer = document.getElementById('assistantContainer')
        // const assistantBubble = document.getElementById('assistantBubble')
        // if (assistantContainer && assistantBubble && !assistantBubble.contains(assistantContainer)) { // Ensure the container is not already in the bubble
        //     assistantBubble.appendChild(assistantContainer) // Move assistant container to bubble
        //     assistantContainer.classList.add('in-modal') // Add a class to style the assistant container in the bubble
        //     assistantContainer.classList.remove('in-original') // Remove the original class to prevent conflicts
        //     this.createBubbleMessage() // Create a bubble message below the assistant container
        // }
    }

    // Function to move the assistant container back to its original place
    moveAssistantContainerBack() {
        // const assistantContainer = document.getElementById('assistantContainer')
        // const originalPlace = this.originalParent // Get the original parent of the assistant container
        // if (assistantContainer && originalPlace && originalPlace !== assistantContainer.parentElement) { // Ensure the container is not already in the original place
        //     originalPlace.appendChild(assistantContainer) // Move the assistant container back to its original place
        //     assistantContainer.classList.add('in-original') // Add class for original styles
        //     assistantContainer.classList.remove('in-modal') // Remove class for modal styles
        // }
    }

    // Function to create a bubble message below the assistant container
    createBubbleMessage() {
        // const assistantBubble = document.getElementById('assistantBubble')
        // const existingMessage = assistantBubble.querySelector('.bubble-message')
    
        // // Prevent duplicate messages
        // if (!existingMessage) {
        //     const bubbleMessage = document.createElement('div') // Create a new div element then add text content to it
        //     bubbleMessage.className = 'bubble-message'
        //     bubbleMessage.textContent = 'Here are your tasks. Follow the instructions to complete them.'
        //     assistantBubble.appendChild(bubbleMessage) // Add the message to the bubble
        // }
    }

    // Toggle between the task and error views
    toggleErrorView() {
        // if (this.taskContainer && this.errorContainer) {
        //     this.errorContainer.style.display = "none"
        //     document.getElementById("switch").addEventListener("change", () => {
        //         if (document.getElementById("switch").checked) {
        //             this.taskContainer.style.display = "none"
        //             this.errorContainer.style.display = "flex"
        //         } else {
        //             this.taskContainer.style.display = "flex"
        //             this.errorContainer.style.display = "none"
        //         }
        //     })
        // }
    }
}

export default Assistant
