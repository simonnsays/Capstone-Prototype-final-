import tasks from "./tasks.js"
class Assistant {
    constructor(main, elementHandler, utilityTool) {
        // DOM ELEMENTS
        this.main = main
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
        this.tasks = tasks
        this.currentStep = 0

        // Tutorial tracking
        this.tutorialInterval = null
        this.errorTimeout = null
        this.errorVisible = false
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

       // Start tutorial logic
       this.startTutorial()
    }

    toggleTaskCellStates() {
        if (!this.tasksContainer.children.length > 0) {
            return
        }
    
        Object.values(this.tasksContainer.children).forEach(taskCell => {
            if (!taskCell.dataset.listenerAttached) {
                taskCell.addEventListener('click', (event) => {
                    event.stopPropagation() // Prevent unintended bubbling
    
                    // Check if the clicked task cell is already open
                    const isAlreadyOpened = taskCell.classList.contains('opened')
    
                    // Close any other open task cells
                    document.querySelectorAll('.task-cell.opened').forEach(openedCell => {
                        if (openedCell !== taskCell) {
                            openedCell.classList.remove('opened')
                        }
                    })
    
                    // If the task cell was not already open, open it
                    if (!isAlreadyOpened) {
                        taskCell.classList.add('opened')
                    }
                })
    
                taskCell.dataset.listenerAttached = true // Mark as handled
            }
        })
    }

    // toggleTaskCellStates() {
    //     if (!this.tasksContainer.children.length > 0) {
    //         return
    //     }
    
    //     Object.values(this.tasksContainer.children).forEach(taskCell => {
    //         // Ensure only one event listener is attached
    //         if (!taskCell.dataset.listenerAttached) {
    //             taskCell.addEventListener('click', () => {
    //                 // Close any previously opened task cell
    //                 document.querySelectorAll('.task-cell.opened').forEach(openedCell => {
    //                     if (openedCell !== taskCell) {
    //                         openedCell.classList.remove('opened')
    //                     }
    //                 })
    
    //                 // Toggle the clicked task cell
    //                 taskCell.classList.toggle('opened')
    //             })
    //             taskCell.dataset.listenerAttached = true  // Mark as handled
    //         }
    //     })
    // }   
       

    createTasks() {
        tasks.forEach(task => {
            // task cell element
            const taskCell = document.createElement('div')
            taskCell.classList.add('task-cell')

            // title element
            const cellTitle = this.createTaskTtitle(task)
            taskCell.appendChild(cellTitle)

            const divider = document.createElement('div')
            divider.classList.add('vert-br')
            taskCell.appendChild(divider)

            // description element
            const cellDescription = this.createTaskDescription(task)
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
        if(task.status === 'complete') {
            const taskNameStatus = document.createElement('p')
            taskNameStatus.textContent = 'Completed'
            taskNameStatus.classList.add('task-status')
            taskNameStatus.visibility = 'hidden'
            taskName.appendChild(taskNameStatus)
        }

        cellTitle.appendChild(taskIcon)
        cellTitle.appendChild(taskName)

        return cellTitle
    }

    createTaskDescription(task) {
        // main description element
        const cellDescription = document.createElement('div')
        cellDescription.classList.add('task-description')

        task.description.forEach(desc => {
            let descElement = null
            switch(desc.type) {
                case 'text':
                    descElement = document.createElement('p')
                    descElement.textContent = desc.content
                    break
                case 'br':
                    descElement = document.createElement('br')
                    break
                case 'list':
                    descElement = desc.style == 'unordered' 
                    ?document.createElement('ul') 
                    :document.createElement('ol');
                    
                    desc.items.forEach(item => {
                        const listItem = document.createElement('li')
                        listItem.textContent = item
                        descElement.appendChild(listItem)
                    })
                    break
                case 'imageGroup':
                    // Main image carousel container
                    descElement = document.createElement('div')
                    descElement.classList.add('desc-image-carousel')
    
                    // State: Track currently visible image
                    let activeIndex = desc.index || 0
    
                    // Left Arrow button
                    const arrowLeft = document.createElement('img')
                    arrowLeft.src = './assets/svg/leftArr.svg'
                    arrowLeft.classList.add('desc-left')
                    arrowLeft.addEventListener('click', () => {     // Left arrow event listener
                        if (activeIndex > 0) {
                            activeIndex--
                            updateCarousel()
                        }
                    })
                    descElement.appendChild(arrowLeft)
                    
                    // Right Arrow button
                    const arrowRight = document.createElement('img')
                    arrowRight.src = './assets/svg/rightArr.svg'
                    arrowRight.classList.add('desc-right')
                    arrowRight.addEventListener('click', () => {    // Right arrow event listener
                        if (activeIndex < images.length - 1) {
                            activeIndex++
                            updateCarousel()
                        }
                    })
                    
                    descElement.appendChild(arrowRight)
                    
                    const images = desc.images.map((imgSrc, index) => {
                        const img = document.createElement('img')
                        img.src = imgSrc
                        img.classList.add('desc-image')
                        img.style.display = index === activeIndex ? 'block' : 'none'
                        descElement.appendChild(img)
                        return img // Store reference
                    })
    
                    // Function to update image visibility and arrow states
                    const updateCarousel = () => {

                        images.forEach((img, index) => {
                            img.style.display = index === activeIndex ? 'block' : 'none'
                        })
    
                        // Disable left arrow if at the first image
                        arrowLeft.style.opacity = activeIndex === 0 ? '0.5' : '1'
                        arrowLeft.style.pointerEvents = activeIndex === 0 ? 'none' : 'auto'
    
                        // Disable right arrow if at the last image
                        arrowRight.style.opacity = activeIndex === images.length - 1 ? '0.5' : '1'
                        arrowRight.style.pointerEvents = activeIndex === images.length - 1 ? 'none' : 'auto'
                    }
    
                    // Initial update for correct arrow states
                    updateCarousel()
                    break
            }

            if(descElement) {
                cellDescription.appendChild(descElement)
            }
        })

        return cellDescription
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
        this.infoSec.classList.remove('hidden');
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



    // Toggle the visibility of task descriptions
    toggleTaskDescription(taskIndex) {
        const taskDescriptions = document.querySelectorAll('.task-description');
        taskDescriptions.forEach((description, index) => {
            description.style.display = index === taskIndex ? 'block' : 'none';
        });

        this.updateTaskStatus(taskIndex);
    }

    // Update the task status in the task-status element
    updateTaskStatus(taskIndex) {
        const taskTitles = document.querySelectorAll('.tasktitle');
        const taskStatus = document.querySelector('#task-status');
        if (taskIndex >= 0 && taskIndex < taskTitles.length) {
            const currentTaskTitle = taskTitles[taskIndex].textContent;
            taskStatus.textContent = `Current Task: ${taskIndex + 1} - ${currentTaskTitle}`;
        } else {
            taskStatus.textContent = 'No task selected';
        }
    }
    
    // Perform the corresponding task action (open modal or do something)
    performTaskAction(action) {
        this.closeAssistantTab();
        switch (action) {
            case 'openShop': this.openShopModal(); break;
            case 'openInventory': this.openInventoryModal(); break;
            case 'connectWires': this.openWiresModal(); break;
            case 'powerOnPC': this.powerOnPC(); break;
            default: console.log("Unknown task action");
        }
    }

    // Toggle between the task and error views
    toggleErrorView() {
        if (this.taskContainer && this.errorContainer) {
            this.errorContainer.style.display = "none";
            document.getElementById("switch").addEventListener("change", () => {
                if (document.getElementById("switch").checked) {
                    this.taskContainer.style.display = "none";
                    this.errorContainer.style.display = "flex";
                } else {
                    this.taskContainer.style.display = "flex";
                    this.errorContainer.style.display = "none";
                }
            });
        }
    }
    // ---- tutorial logic ----
    // initiate the tutorial
    startTutorial() {
        // Start at the first task
        this.currentStep = 0
        this.highlightCurrentTask()
        this.openCurrentTaskCell()
        this.setupTaskTrigger() // set up the trigger for the current task
        this.setupTutorialTracking()
        this.openModal() // open the modal to start the tutorial
    }

    // setup task triggers 
    setupTaskTrigger() {
        // Remove previous trigger if any
        this.removeTaskTrigger();
    
        const currentTask = this.tasks[this.currentStep];
        if (!currentTask || !currentTask.trigger) return;
    
        const { selector, event } = currentTask.trigger;
        const el = document.querySelector(selector);
        if (!el) return;
    
        // Save for removal later
        this.currentTriggerElement = el;
        this.currentTriggerHandler = () => this.tryStepCompletion();
    
        el.addEventListener(event, this.currentTriggerHandler);
    }
    
    // removal of task triggers
    removeTaskTrigger() {
        if (this.currentTriggerElement && this.currentTriggerHandler && this.tasks[this.currentStep]?.trigger) {
            const { event } = this.tasks[this.currentStep].trigger;
            this.currentTriggerElement.removeEventListener(event, this.currentTriggerHandler);
        }
        this.currentTriggerElement = null;
        this.currentTriggerHandler = null;
    }

    // setup tracking for tutorial completion
    setupTutorialTracking() {
        // Listen for user actions to check for step completion
        document.addEventListener('click', this.tryStepCompletion.bind(this))
        // Polling for completion (for actions not directly tied to clicks)
        if (this.tutorialInterval) clearInterval(this.tutorialInterval)
        this.tutorialInterval = setInterval(() => {
            this.checkCompletionSilently()
        }, 500)
    }

    // check if the current step is completed
    tryStepCompletion() {
        if (this.isStepCompleted(this.currentStep)) {
            this.handleStepCompletion()
        }
    }

    // check task completion automatically without user interaction from task triggers
    checkCompletionSilently() {
        // Only check the current step for tutorial progression
        if (this.tasks[this.currentStep].status !== 'complete' && this.isStepCompleted(this.currentStep)) {
            this.handleStepCompletion()
        }
    }
    
    // completion checker for each task from task.js 
    isStepCompleted(stepIndex) {
        const task = this.tasks[stepIndex]
        if (task && typeof task.completionCheck === 'function') {
            return task.completionCheck(this.main)
        }
        return false
    }

    // user task completion handler 
    handleStepCompletion() {
        this.completeTaskByStep(this.currentStep)
        // Move to next step if available
        if (this.currentStep < this.tasks.length - 1) {
            this.currentStep++
            this.highlightCurrentTask()
            this.setupTaskTrigger()
            this.showTaskCompletionMessage()
        } else {
            this.endTutorial()
        }
    }

    // creation of task completion message
    showTaskCompletionMessage(message = `Check the Assistant for your next step.`) {
        const reassureDialog = document.querySelector('.asst-reassure');
        if (!reassureDialog) return;
    
        reassureDialog.innerHTML = `
            <div class="reassure-content">
                <div class="reassure-icon-wrapper">
                    <span class="reassure-icon" aria-label="Success">🎯</span>
                </div>
                <div class="reassure-text">
                    <div class="reassure-title">Task Complete!</div>
                    <div class="reassure-message">${message}</div>
                </div>
                <button class="reassure-close" aria-label="Close">&times;</button>
            </div>
        `;
        reassureDialog.showModal();
    
        // Allow manual close
        reassureDialog.querySelector('.reassure-close').onclick = () => reassureDialog.close();

        // Auto-close after 3s
        setTimeout(() => {
            if (reassureDialog.open) reassureDialog.close();
            this.openModal()
            this.openCurrentTaskCell()
        }, 3000);
    }

    // end tutorial and remove listeners, intervals, and highlights
    endTutorial() {
        // Remove event listeners and intervals
        if (this.tutorialInterval) clearInterval(this.tutorialInterval)

        // remove click event listeners
        this.removeTaskTrigger()

        // clear any remaining task highlights
        document.querySelectorAll('.highlight-element').forEach(el => {
            el.classList.remove('highlight-element')
        })

        // add any finalization logic here, like showing a completion message or ending simulation
    }

    // automatically open the current task cell in the task list
    openCurrentTaskCell() {
        // Close any previously opened task cells
        document.querySelectorAll('.task-cell.opened').forEach(cell => {
            cell.classList.remove('opened');
        });
    
        // Open the current task cell
        const taskCell = this.tasksContainer.children[this.currentStep];
        if (taskCell) {
            taskCell.classList.add('opened');
            // scroll into view
            taskCell.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    // marker for displaying completed tasks
    completeTaskByStep(stepIndex) {
        const taskCell = this.tasksContainer.children[stepIndex]
        if (!taskCell) return
        this.tasks[stepIndex].status = 'complete'
        taskCell.classList.add('completed')
        const statusElem = taskCell.querySelector('.task-status')
        if (statusElem) {
            statusElem.textContent = 'Completed'
            statusElem.style.visibility = 'visible'
        }
        this.highlightCurrentTask()
    }

    // hihglight handler for the current task (marks the element for easier navigation in the UI)
    highlightCurrentTask() {
        // Remove all highlights
        document.querySelectorAll('.highlight-element').forEach(el => {
            el.classList.remove('highlight-element')
        })
        // Highlight the current task's target
        const currentTask = this.tasks[this.currentStep]
        if (currentTask && currentTask.highlight) {
            const elementToHighlight = document.querySelector(currentTask.highlight)
            if (elementToHighlight) {
                elementToHighlight.classList.add('highlight-element')
            }
        }
    }

}
export default Assistant
