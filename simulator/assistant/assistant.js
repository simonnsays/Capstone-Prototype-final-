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
            this.toggleErrorView();
            this.setupTaskEventListeners();
            this.populateTasks();
        });
    }

    populateTasks() {
        const shopCell = document.getElementById('shopTask');
        const invCell = document.getElementById('invTask');
        const wireCell = document.getElementById('wiresTask');
        const bootCell = document.getElementById('bootTask');
        shopCell.innerHTML = `
                    <div class="task-icon">
                        <img src="assets/Assistant/shop.png" alt="shop icon">
                    </div>
                <h1 class="tasktitle">Enter The Shop</h1>  
                <img class="arrow" src="./assets/svg/rightArr.svg" alt="right arrow">
                <img class="checkmark" src="assets/svg/check.svg" alt="Completed" style="display: none;"> <!-- Hidden by default -->
                <div class="task-description">
                <p>Look for your PC components and buy them.</p>
                <br>
                <p>Ensure to check prices and specifications before making a purchase.</p>
                <p>The components that you will need are the following:</p>
                <p>1.Case</p>
                <p>2.motherboard</p>
                <p>3.processor</p>
                <p>4.Power Supply Unit</p>
                <p>5.RAM</p>
                <p>6.Storage Device - HDD or SSD</p>
                <p>7.Cooling</p>
                <p>8.GPU or Graphics card</p>
                <br>
                <p style="padding-top: 3px;padding-bottom: 3px;">Check the images below for your reference:</p>
                <p><img src="assets/Assistant/shop1.png" class="timg" alt="shop1" style="height: 300px; width: 400px;padding: 10px;"></p>
                <p><img src="assets/Assistant/shop2.png" class="timg" alt="shop2" style="height: 300px; width: 400px;padding: 10px;"></p>
                <p><img src="assets/Assistant/shop3.png" class="timg" alt="shop3" style="height: 300px; width: 400px;padding: 10px;"></p>
                <!--New Task Button-->
                <button class="start-task-btn" data-task="openShop">Start Task</button>
                </div>
        `;
        invCell.innerHTML = `
                    <div class="task-icon">
                        <img src="assets/Assistant/inventory.png" alt="shop icon">
                    </div>
                <h1 class="tasktitle">Check your Inventory</h1>
                <img class="arrow" src="./assets/svg/rightArr.svg" alt="right arrow">
                <img class="checkmark" src="assets/svg/check.svg" alt="Completed" style="display: none;"> <!-- Hidden by default -->
                <div class="task-description">
                <p>Place the components you've chosen to the components shelf by clicking the components in your inventory</p>
                <br>
                <p>Place each component in regards to their order:</p>
                <p>1.Case</p>
                <p>2.motherboard</p>
                <p>3.processor</p>
                <p>4.Cooling</p>
                <p>5.RAM</p>
                <p>6.Storage Device - HDD or SSD</p>
                <p>7.Power Supply Unit</p>
                <p>8.GPU or Graphics card</p>
                <br>
                <p style="padding-top: 3px;padding-bottom: 3px;">Check the images below for your reference:</p>
                <p><img src="assets/Assistant/inv1.png" class="timg" alt="inv1" style="height: 300px; width: 400px;padding: 10px;"></p>
                <p><img src="assets/Assistant/inv2.png" class="timg" alt="inv2" style="height: 300px; width: 400px;padding: 10px;"></p>
                <p><img src="assets/Assistant/inv3.png" class="timg" alt="inv3" style="height: 300px; width: 400px;padding: 10px;"></p>
                <button class="start-task-btn" data-task="openInventory">Start Task</button>
                </div>
        `;
        wireCell.innerHTML = `
                    <div class="task-icon">
                        <img src="assets/Assistant/wires.png" alt="shop icon">
                    </div>
                <h1 class="tasktitle">Connecting Components With Wires</h1>
                <img class="arrow" src="./assets/svg/rightArr.svg" alt="right arrow">
                <img class="checkmark" src="assets/svg/check.svg" alt="Completed" style="display: none;"> <!-- Hidden by default -->
                <div class="task-description">
                <p>Now we dive in to plugging each wire for each component either for power or data connection.</p>
                <br>
                <p>There are two types of wires in the computer: one for data connection to the ROM, and the other for power supply to essential components like the GPU, ROM, CPU, and Motherboard. 
                Additionally, there's a connection for the front panel, encompassing the power button, USB ports, and occasionally including a LED light indicator, reset button, and 3.5mm audio jack ports. </p>                    
                <p>To connect the wires simply open the wires drawer and click the wires to their respective highlighted slots</p>
                <br>
                <p style="padding-top: 3px;padding-bottom: 3px;">Check the images below for your reference:</p>
                <p><img src="assets/Assistant/wires1.png" class="timg" alt="wre1" style="height: 300px; width: 400px;padding: 10px;"></p>
                <p><img src="assets/Assistant/wires2.png" class="timg" alt="wre2" style="height: 300px; width: 400px;padding: 10px;"></p>
                <p><img src="assets/Assistant/wires3.png" class="timg" alt="wre3" style="height: 300px; width: 400px;padding: 10px;"></p>
                <p><img src="assets/Assistant/wires4.png" class="timg" alt="wre4" style="height: 300px; width: 400px;padding: 10px;"></p>
                <p><img src="assets/Assistant/wires4.1.png" class="timg" alt="wre5" style="height: 300px; width: 400px;padding: 10px;"></p>
                <p style="padding: 5px;">Also please note that the wire will be colored green when they are connected on both components however it will be colored red if it is only connected on one end.</p>
                <p><img src="assets/Assistant/wires4.2.png"  alt="wre6" style="height: 200px; width: 380px;padding: 10px; left: 30px;"></p>
                <p><img src="assets/Assistant/wires5.png" class="timg" alt="wre67" style="height: 300px; width: 400px;padding: 10px;"></p>
                <p><img src="assets/Assistant/wires6.png" class="timg" alt="wre8" style="height: 300px; width: 400px;padding: 10px;"></p>
                <button class="start-task-btn" data-task="connectWires">Start Task</button>
                </div>
        `;
        bootCell.innerHTML = `
                    <div class="task-icon">
                        <img src="assets/Assistant/power-button.png" alt="shop icon">
                    </div>
                <h1 class="tasktitle">Power On</h1>
                <img class="arrow" src="./assets/svg/rightArr.svg" alt="right arrow">
                <img class="checkmark" src="assets/svg/check.svg" alt="Completed" style="display: none;"> <!-- Hidden by default -->
                <div class="task-description">
                <p>Power on your pc by pressing the power on button</p>
                <br>
                <p>Important note:</p>
                <ul>Check if you have compatible components before turning on your PC</ul>
                <ul>Check if you have all the necessary components before turning on your PC</ul>
                <ul>Check if you have all the necessary wires connected to each components</ul>
                <br>
                <p>After checking all the necessary components and wires you can now power on your PC by pressing the power button</p>
                <p>After pressing the power button you will see the boot up screen and the computer will start to boot up</p>
                <p>After booting up you will see the desktop screen and you have successfully assembled your PC</p>
                <br>
                <p>Also notice that when the reports on the left side has different colors it means that:</p>
                <ul>Green - All components are connected and working properly</ul>
                <ul>Red - There are components that are not connected or not working properly</ul>
                <ul>Red with ! - The components are critical meaning it does not work and could affect the other components as well</ul>
                <ul>Yellow - All components are connected and working but needs optimization</ul>
                <p style="padding-top: 3px;padding-bottom: 3px;">Check the images below for your reference:</p>
                <p><img src="/simulator/assets/Assistant/power.png" class="timg" alt="green" style="height: 100px; width: 300px;padding: 10px;"></p>
                <p><img src="/simulator/assets/Assistant/power1.png" class="timg" alt="green" style="height: 100px; width: 300px;padding: 10px;"></p>
                <p><img src="/simulator/assets/Assistant/power2.png" class="timg" alt="red" style="height: 100px; width: 300px;padding: 10px;"></p>
                <p><img src="/simulator/assets/Assistant/power3.png" class="timg" alt="yellow" style="height: 100px; width: 300px;padding: 10px;"></p>
                <button class="start-task-btn" data-task="powerOnPC">Start Task</button>
                </div>

        `;
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

        // Directly add the event listener to the task container and filter the target element to start-task-btn
        this.taskContainer.addEventListener('click', (e) => {
            // Check if the clicked element has the class 'start-task-btn'
            if (e.target.classList.contains('start-task-btn')) {
                const action = e.target.getAttribute('data-task');
                if (action) {
                    this.performTaskAction(action); 
                    this.moveAssistantContainerBack();
                }
            }
        });
    }

    // Mark tasks as completed and gray them out
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

    // Toggle between the task and error views
    toggleErrorView() {
        const taskContainer = document.querySelector(".task-container");
        const errorContainer = document.querySelector(".error-container");
        const taskHeader = document.querySelector(".theader");
        const errorHeader = document.querySelector(".eheader");

        // Default state: show tasks, hide errors
        taskContainer.style.display = "flex";
        errorContainer.style.display = "none";
        taskHeader.classList.add("live");
        errorHeader.classList.remove("live");

        // Event listeners for toggling views
        taskHeader.addEventListener("click", () => {
            taskContainer.style.display = "flex";
            errorContainer.style.display = "none";
            taskHeader.classList.add("live");
            errorHeader.classList.remove("live");
        });

        errorHeader.addEventListener("click", () => {
            taskContainer.style.display = "none";
            errorContainer.style.display = "flex";
            errorHeader.classList.add("live");
            taskHeader.classList.remove("live");
        });
    }
}

export default Assistant;
