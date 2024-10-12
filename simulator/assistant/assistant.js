class Assistant {
    constructor(elementHandler) {
        // DOM ELEMENTS
        const elements = elementHandler.getAssistantElements();
        this.container = elements.container;
        this.imageContainer = elements.imageContainer;
        this.pulse = elements.pulse;
        this.image = elements.image;
        this.infoContainer = elements.infoContainer;
        this.modal = elements.modal;


        // TUTORIAL STEP BY STEPS
        this.tasks = [{ title: '', description: '' }];

        this.notifCount = 1;
    }

    isInArea(area, mouse) {
        if (!area) return false; // Guard clause for undefined area
        let point = { x: mouse.clientX, y: mouse.clientY };
        let rect = area.getBoundingClientRect();

        return (
            point.x > rect.x &&
            point.x < rect.x + rect.width &&
            point.y > rect.y &&
            point.y < rect.y + rect.height
        );
    }

    handlePulseEvent() {
        if (this.notifCount > 0) {
            this.pulse?.classList.add('pulse');
            this.image?.classList.add('img-rltv');
        } else {
            this.pulse?.classList.remove('pulse');
            this.image?.classList.remove('img-rltv');
        }
    }

    handleMouseHover(e) {
        if (this.isInArea(this.container, e)) {
            this.notifCount = 0;
            this.container?.classList.add('extended');
            this.container?.addEventListener('transitionend', () => {
                setTimeout(() => {
                    this.infoContainer?.classList.remove('hidden');
                }, 0);
            });
        } else {
            this.notifCount = 1;
            this.container?.classList.remove('extended');
            this.infoContainer?.classList.add('hidden');
        }
    }

    asstInit() {
        window.addEventListener('mousemove', (e) => {
            this.handlePulseEvent();
            this.handleMouseHover(e);
        });

        this.container?.addEventListener('click', () => {
            if (this.modal) {
                this.modal.showModal ? this.modal.showModal() : this.modal.style.display = 'block';
            }
        });

        window.addEventListener('click', (e) => {
            if (!this.isInArea(this.modal, e)) {
                if (this.modal && this.modal.close) {
                    this.modal.close();
                } else if (this.modal) {
                    this.modal.style.display = 'none';
                }
            }
        });
    }
}

    // Assistant task function
    document.addEventListener('DOMContentLoaded', function () {
        const taskCells = document.querySelectorAll('.task-cell');
        
        // Event listener for each task cell click
        taskCells.forEach((button, index) => {
            button.addEventListener('click', () => {
                toggleTaskDescription(index);   // Show description
                markTaskCompleted(index);       // Mark task as completed
            });
        });
    
        // Event listener for "Start Task" button clicks inside descriptions
        const startTaskButtons = document.querySelectorAll('.start-task-btn');
        startTaskButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const action = button.getAttribute('data-task');
                if (action) {
                    performTaskAction(action);  // Perform the task action (open shop, inventory, etc.)
                }
                e.stopPropagation();  // Prevent toggling the description when button is clicked
            });
        });
    });
    
    // Mark tasks as completed and gray them out
    function markTaskCompleted(taskIndex) {
        const taskCells = document.querySelectorAll('.task-cell');
        taskCells.forEach((cell, index) => {
            if (index <= taskIndex) {
                cell.classList.add('completed-task');  // Add gray-out effect and completed style
                const checkmark = cell.querySelector('.checkmark');
                if (checkmark) {
                    checkmark.style.display = 'block';  // Show the checkmark icon
                }
            } else {
                cell.classList.remove('completed-task');
                const checkmark = cell.querySelector('.checkmark');
                if (checkmark) {
                    checkmark.style.display = 'none';  // Hide the checkmark icon for incomplete tasks
                }
            }
        });
    }
    
    // Toggle the visibility of task descriptions
    function toggleTaskDescription(taskIndex) {
        const taskDescriptions = document.querySelectorAll('.task-description');
    
        // Loop through all descriptions and hide the others
        taskDescriptions.forEach((description, index) => {
            if (index === taskIndex) {
                description.style.display = 'block';  // Show the current task description
            } else {
                description.style.display = 'none';   // Hide other task descriptions
            }
        });
    
        // Update the task status display
        updateTaskStatus(taskIndex);
    }
    
    // Update the task status in the task-status element
    function updateTaskStatus(taskIndex) {
        const taskTitles = document.querySelectorAll('.tasktitle');
        const taskStatus = document.querySelector('#task-status');
    
        // Update status based on the current task
        if (taskIndex >= 0 && taskIndex < taskTitles.length) {
            const currentTaskTitle = taskTitles[taskIndex].textContent;
            taskStatus.textContent = `Current Task: ${taskIndex + 1} - ${currentTaskTitle}`;
        } else {
            taskStatus.textContent = 'No task selected';
        }
    }
    
    // Perform the corresponding task action (open modal or do something)
    function performTaskAction(action) {
        switch(action) {
            case 'openShop':
                openShopModal();
                break;
            case 'openInventory':
                openInventoryModal();
                break;
            case 'connectWires':
                openWiresModal();
                break;
            case 'powerOnPC':
                powerOnPC();
                break;
            default:
                console.log("Unknown task action");
        }
    }
    
    // Modal opening functions
    function openShopModal() {
        const shopModal = document.querySelector('#shopModal');
        if (shopModal) shopModal.showModal();
    }
    
    function openInventoryModal() {
        const invModal = document.querySelector('#invModal');
        if (invModal) invModal.showModal();
    }
    
    function openWiresModal() {
        const wiresModal = document.querySelector('#wiresModal');
        if (wiresModal) wiresModal.style.display = 'block';  // or use .showModal() if it's a dialog
    }
    
    function powerOnPC() {
        const bootUpTab = document.querySelector('#bootUpTab');
        if (bootUpTab) bootUpTab.style.display = 'block';  
    }
    
    // Ensure no task is initially marked as completed
    markTaskCompleted(-1);  // Reset task completion at the start

export default Assistant;
