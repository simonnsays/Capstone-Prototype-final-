import  errorCodes from '../scripts/Data/errorCodes.js';

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
        this.bubble = document.getElementById('assistantBubble');
        this.originalParent = this.container.parentElement;
        this.taskContainer = document.querySelector('.task-container');
        this.errorContainer = document.querySelector('.error-container');
        this.notifCount = 1;

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
                this.modal.showModal ? this.modal.showModal() : (this.modal.style.display = 'block');
                this.moveAssistantContainerToBubble(); // Move assistant container to bubble
            }
        });

        window.addEventListener('click', (e) => {
            if (!this.isInArea(this.modal, e)) {
                if (this.modal && this.modal.close) {
                    this.modal.close();
                } else if (this.modal) {
                    this.modal.style.display = 'none';
                }
                this.moveAssistantContainerBack(); // Move assistant container back to its original place
            }
        });
        document.addEventListener('DOMContentLoaded', () => {
            this.populateErrors();
            this.toggleErrorView();
            this.setupTaskEventListeners();
        });
    }

    // Function to move the assistant container to the bubble
    moveAssistantContainerToBubble() {
        const assistantContainer = document.getElementById('assistantContainer');
        const assistantBubble = document.getElementById('assistantBubble');
        if (assistantContainer && assistantBubble && !assistantBubble.contains(assistantContainer)) { // Ensure the container is not already in the bubble
            assistantBubble.appendChild(assistantContainer); // Move assistant container to bubble
            assistantContainer.classList.add('in-modal'); // Add a class to style the assistant container in the bubble
            assistantContainer.classList.remove('in-original'); // Remove the original class to prevent conflicts
            this.createBubbleMessage(); // Create a bubble message below the assistant container
        }
    }

    // Function to move the assistant container back to its original place
    moveAssistantContainerBack() {
        const assistantContainer = document.getElementById('assistantContainer');
        const originalPlace = this.originalParent; // Get the original parent of the assistant container
        if (assistantContainer && originalPlace && originalPlace !== assistantContainer.parentElement) { // Ensure the container is not already in the original place
            originalPlace.appendChild(assistantContainer); // Move the assistant container back to its original place
            assistantContainer.classList.add('in-original'); // Add class for original styles
            assistantContainer.classList.remove('in-modal'); // Remove class for modal styles
        }
    }

    // Function to create a bubble message below the assistant container
    createBubbleMessage() {
        const assistantBubble = document.getElementById('assistantBubble');
        const existingMessage = assistantBubble.querySelector('.bubble-message');
    
        // Prevent duplicate messages
        if (!existingMessage) {
            const bubbleMessage = document.createElement('div'); // Create a new div element then add text content to it
            bubbleMessage.className = 'bubble-message';
            bubbleMessage.textContent = 'Here are your tasks. Follow the instructions to complete them.';
            assistantBubble.appendChild(bubbleMessage); // Add the message to the bubble
        }
    }

    // Attach Event Listeners to Task Cells
    setupTaskEventListeners() {
        const taskCells = document.querySelectorAll('.task-cell');
        taskCells.forEach((cell, index) => { // Loop through each task cell and add an event listener click
            cell.addEventListener('click', () => {
                this.toggleTaskDescription(index);  
                this.markTaskCompleted(index);      
            });
        });

        const startTaskButtons = document.querySelectorAll('.start-task-btn');
        startTaskButtons.forEach(button => {
            button.addEventListener('click', (e) => { // Add event listener click to each "Start Task" button
                const action = button.getAttribute('data-task');
                if (action) {
                    this.performTaskAction(action); 
                    this.moveAssistantContainerBack();
                }
                e.stopPropagation();  
            });
        });
    }

    markTaskCompleted(taskIndex) {
        const taskCells = document.querySelectorAll('.task-cell');
        taskCells.forEach((cell, index) => {
            if (index <= taskIndex) {
                cell.classList.add('completed-task');
                const checkmark = cell.querySelector('.checkmark');
                if (checkmark) checkmark.style.display = 'block';
            } else {
                cell.classList.remove('completed-task');
                const checkmark = cell.querySelector('.checkmark');
                if (checkmark) checkmark.style.display = 'none';
            }
        });
    }

    toggleTaskDescription(taskIndex) {
        const taskDescriptions = document.querySelectorAll('.task-description');
        taskDescriptions.forEach((description, index) => {
            description.style.display = index === taskIndex ? 'block' : 'none';
        });

        this.updateTaskStatus(taskIndex);
    }

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

    closeAssistantTab() {
        const assistantTab = document.querySelector('.assistant-modal');
        if (assistantTab) assistantTab.close();
    }

    openShopModal() {
        const shopModal = document.querySelector('#shopModal');
        if (shopModal) shopModal.showModal();
    }

    openInventoryModal() {
        const invModal = document.querySelector('#invModal');
        if (invModal) invModal.showModal();
    }

    openWiresModal() {
        const wiresModal = document.querySelector('#wiresModal');
        if (wiresModal) wiresModal.style.display = 'block';
    }

    powerOnPC() {
        const bootUpTab = document.querySelector('#bootUpTab');
        if (bootUpTab) bootUpTab.style.display = 'block';
    }

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

    // Helper methods
    getSeverityIcon(severity) {
        const icons = {
            Critical: '❗', // Hard Drive Failure, CPU Overheating, BIOS Corruption, Power Failure
            Hazard: '⚠️', // High Temperatures, Power Surge, Fan Speed Abnormal
            Error: '❌', // GPU Failure, No Boot Device Found, Memory Error, Missing Component
        };
        return icons[severity] || "❓";
    }

    populateErrors() {
        if (!this.errorContainer) return;
        const self = this;

        this.errorContainer.innerHTML = `
            <h1 class="header" style="margin-left: 50%;">ERRORS</h1>
            <div class="hr-line"></div>
        `;
       Object.values(errorCodes).forEach((error) => { // Loop through each error code and create an error element
           const errorElement = document.createElement('div');
           errorElement.classList.add('error-cell');
           errorElement.innerHTML = `  
              <div class="error-icon">
                <img src="./assets/boot/error_screen/warning.png" alt="error icon">
              </div>
              <div class="error-details">
              <h2>${error.name} (${error.code})</h2> 
              <p><strong>Severity:</strong> ${error.severity} ${this.getSeverityIcon(error.severity)}</p>
              <p>${error.description}</p>
              </div>
          `;
           this.errorContainer.appendChild(errorElement);
       });
    } 
}

 //   // Assistant task function
 //   document.addEventListener('DOMContentLoaded', function () {
 //       const taskCells = document.querySelectorAll('.task-cell');
 //       
 //       // Event listener for each task cell click
 //       taskCells.forEach((button, index) => {
 //           button.addEventListener('click', () => {
 //               toggleTaskDescription(index);   // Show description
 //               markTaskCompleted(index);       // Mark task as completed
 //           });
 //       });
 //   
 //       // Event listener for "Start Task" button clicks inside descriptions
 //       const startTaskButtons = document.querySelectorAll('.start-task-btn');
 //       startTaskButtons.forEach(button => {
 //           button.addEventListener('click', (e) => {
 //               const action = button.getAttribute('data-task');
 //               if (action) {
 //                   performTaskAction(action);  // Perform the task action (open shop, inventory, etc.)
 //                   moveAssistantContainerBack();  // Move the assistant container back to its original place
 //               }
 //               e.stopPropagation();  // Prevent toggling the description when button is clicked
 //           });
 //       });
 //   });

 //   // Mark tasks as completed and gray them out
 //   function markTaskCompleted(taskIndex) {
 //       const taskCells = document.querySelectorAll('.task-cell');
 //       taskCells.forEach((cell, index) => {
 //           if (index <= taskIndex) {
 //               cell.classList.add('completed-task');  // Add gray-out effect and completed style
 //               const checkmark = cell.querySelector('.checkmark');
 //               if (checkmark) {
 //                   checkmark.style.display = 'block';  // Show the checkmark icon
 //               }
 //           } else {
 //               cell.classList.remove('completed-task');
 //               const checkmark = cell.querySelector('.checkmark');
 //               if (checkmark) {
 //                   checkmark.style.display = 'none';  // Hide the checkmark icon for incomplete tasks
 //               }
 //           }
 //       });
 //   }

 //   // Toggle the visibility of task descriptions
 //   function toggleTaskDescription(taskIndex) {
 //       const taskDescriptions = document.querySelectorAll('.task-description');
 //   
 //       // Loop through all descriptions and hide the others
 //       taskDescriptions.forEach((description, index) => {
 //           if (index === taskIndex) {
 //               description.style.display = 'block';  // Show the current task description
 //           } else {
 //               description.style.display = 'none';   // Hide other task descriptions
 //           }
 //       });
 //   
 //       // Update the task status display
 //       updateTaskStatus(taskIndex);
 //   }

 //   // Update the task status in the task-status element
 //   function updateTaskStatus(taskIndex) {
 //       const taskTitles = document.querySelectorAll('.tasktitle');
 //       const taskStatus = document.querySelector('#task-status');
 //   
 //       // Update status based on the current task
 //       if (taskIndex >= 0 && taskIndex < taskTitles.length) {
 //           const currentTaskTitle = taskTitles[taskIndex].textContent;
 //           taskStatus.textContent = `Current Task: ${taskIndex + 1} - ${currentTaskTitle}`;
 //       } else {
 //           taskStatus.textContent = 'No task selected';
 //       }
 //   }

 //   // Perform the corresponding task action (open modal or do something)
 //   function performTaskAction(action) {
 //       closeAssistantTab();  // Close the assistant tab after a task is started
 //       switch(action) {
 //           case 'openShop':
 //               openShopModal();
 //               break;
 //           case 'openInventory':
 //               openInventoryModal();
 //               break;
 //           case 'connectWires':
 //               openWiresModal();
 //               break;
 //           case 'powerOnPC':
 //               powerOnPC();
 //               break;
 //           default:
 //               console.log("Unknown task action");
 //       }
 //   }

 //  // Function to close the assistant tab
 //  function closeAssistantTab() {
 //      const assistantTab = document.querySelector('.assistant-modal');
 //      if (assistantTab) assistantTab.close();
 //  }
 //  // Modal opening functions
 //  function openShopModal() {
 //      const shopModal = document.querySelector('#shopModal');
 //      if (shopModal) shopModal.showModal();
 //  }
 //  
 //  function openInventoryModal() {
 //      const invModal = document.querySelector('#invModal');
 //      if (invModal) invModal.showModal();
 //  }
 //  
 //  function openWiresModal() {
 //      const wiresModal = document.querySelector('#wiresModal');
 //      if (wiresModal) wiresModal.style.display = 'block';  // or use .showModal() if it's a dialog
 //  }
 //  
 //  function powerOnPC() {
 //      const bootUpTab = document.querySelector('#bootUpTab');
 //      if (bootUpTab) bootUpTab.style.display = 'block';  
 //  }

 //  // Ensure no task is initially marked as completed
 //   markTaskCompleted(-1);  // Reset task completion at the start

 //  
 //    // Initialize the assistant tab and get the toggle switch element
 //   document.addEventListener("DOMContentLoaded", function () {
 //       const toggleSwitch = document.getElementById("switch");
 //       const taskContainer = document.querySelector(".task-container");
 //       const errorContainer = document.querySelector(".error-container");
 //   
 //       // Ensure error container is hidden by default
 //       errorContainer.style.display = "none";
 //   
 //       toggleSwitch.addEventListener("change", function () {
 //           if (toggleSwitch.checked) {
 //               // Show Errors View
 //               taskContainer.style.display = "none";
 //               errorContainer.style.display = "flex";
 //           } else {
 //               // Show Tasks View
 //               taskContainer.style.display = "flex";
 //               errorContainer.style.display = "none";
 //           }
 //       });
 //   });

 //   // Initialize the assistant tab and get the error-container element then populate it with the bootup errors
 //   document.addEventListener("DOMContentLoaded", function () {
 //       const errorContainer = document.querySelector('.error-container');

 //       errorContainer.innerHTML = `
 //           <h1 class="header" style="margin-left: 50%;">ERRORS</h1>
 //           <div class="hr-line"></div>
 //       `;

 //       Object.values(errorCodes).forEach(error => { // Loop through each error code and create an error element
 //           const errorElement = document.createElement('div');
 //           //const errorData = errorCodes[error.code];
 //           
 //           errorElement.classList.add('error-cell');
 //             // Get error details from errorCodes
 //           const errorData = errorCodes[errorCodes] || {
 //           //sample error data
 //           code: 'ERR-01',
 //           name: 'No Boot Device Found',
 //           severity: 'error',
 //           description: 'The system did not detect a boot device.',
 //           troubleshooting: 'Check if the boot device is properly connected and configured in BIOS.'
 //       };

 //           // Add error details to the error element
 //          errorElement.innerHTML = `  
 //              <div class="error-icon">
 //              <img src="./assets/boot/error_screen/warning.png" alt="error icon">
 //          </div>
 //          <div class="error-details">
 //              <h2>${error.name} (${error.code})</h2> 
 //              <p><strong>Severity:</strong> ${error.severity}</p>
 //              <p>${error.description}</p>
 //          </div>
 //          `;
 //           errorContainer.appendChild(errorElement); // Add the error element to the error container
 //       });
 //   });


export default Assistant;
