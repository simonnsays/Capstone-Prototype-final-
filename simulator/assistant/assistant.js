class Assistant {
    constructor(main, elementHandler, utilityTool, eventBus) {
        // util
        this.utilityTool = utilityTool
        this.eventBus = eventBus
        
        // DOM ELEMENTS
        this.main = main
        this.elements = elementHandler.getAssistantElements()
        this.image = this.elements.image
        this.overlay = this.elements.overlay
        
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
        this.closeBtn = this.elements.closeBtn
        this.closeBtn.addEventListener('click', () => this.closeModal())

        this.tasks = []

        this.dialogues = [
            "Hey there! Need a hand with anything today?",
            "You’ve got this—just take it one step at a time.",
            "Anything I can help you with right now?",
            "Hello! Got anything you want to work on today?",
            "Don’t forget to take a breath—you’re doing great.",
            "Hey, you! You’ve been on my mind—ready to make progress?",
            "I'm here if you need some clarity or a boost.",
            "Hi again! Got a task you want to check from me?",
        ]
        this.prevDialogue

        // TUTORIAL STEP BY STEPS
        this.boundMouseHover = this.handleMouseHover.bind(this)
        this.boundClick = this.handleClick.bind(this)

        this.onTutorial = true
    }

    init() {
        // Mini Element Listeners
        window.addEventListener('mousemove', this.boundMouseHover)

        // subscribe to Event Bus
        this.subscribeToEventBus()
                
        // Full Page Element Listeners
        this.revealTasks()
        
        this.tasksBtn.addEventListener('click', () => this.revealTasks())

        this.errorsBtn.addEventListener('click', () => this.revealErrors())

        window.addEventListener('click', () => this.toggleTaskCellStates())
    }

    subscribeToEventBus() {
        this.eventBus.on('tutManagerInit', (data) => this.updateMiniDsiplay(data))
        this.eventBus.on('taskAdvanced', (data) => {
            this.adjustOverlayElement(data)
            this.showCurrentTask(data)
        } )
        this.eventBus.on('taskCompleted', (data) => {
            if (!data) return
            
            const foundElement = document.querySelector(`#${data.id}`)
            if(!foundElement) return
            if(foundElement.dataset.completed === 'true') return

            foundElement.style.opacity = 0.4
            foundElement.dataset.completed = 'true'
            const taskNameStatus = document.createElement('p')
            taskNameStatus.textContent = 'Completed'
            taskNameStatus.classList.add('task-complete')
            foundElement.querySelector(`.task-name`)?.appendChild(taskNameStatus)
        })
    }

    adjustOverlayElement(data) {
        // this.overlay.className = 'overlay'
        // switch(data.id) {
        //     case 'workAreaIntroduction':
        //         this.overlay.classList.add('table-mask')
        //         break
        //     case 'shelfIntroduction':
        //     case 'attachSet2':
        //         this.overlay.classList.add('shelf-mask')
        //         break
        //     case 'labelsIntroduction':
        //         this.overlay.classList.add('labels-mask')
        //         break
        //     case 'portCategories':
        //     case 'atxNavigatePsu':
        //     case 'epsNavigateMobo':
        //         this.overlay.classList.add('port-label-mask')
        //         break
        //     case 'portItems':
        //     case 'drawer':
        //     case 'attachEpsConnectors':
        //         this.overlay.classList.add('ports-mask')
        //         break
        //     case 'connectorsIntroduction':
        //         this.overlay.classList.add('drawer-mask')
        //         break
        //     case 'atxPinMobo':
        //     case 'atxPinPsu':
        //         this.overlay.classList.add('port-atx-mask')
        //         break
        //     case 'epsPinPsu':
        //         this.overlay.classList.add('port-eps-psu-mask')
        //         break
        //     case 'epsPinMobo':
        //         this.overlay.classList.add('port-eps-mobo-mask')
        //         break
        // }   

        const overlayClassMap = {
            workAreaIntroduction: 'table-mask',

            shelfIntroduction: 'shelf-mask',
            attachSet2: 'shelf-mask',

            labelsIntroduction: 'labels-mask',

            portCategories: 'port-label-mask',
            atxNavigatePsu: 'port-label-mask',
            epsNavigateMobo: 'port-label-mask',
            
            portItems: 'ports-mask',
            drawer: 'ports-mask',
            attachEpsConnectors: 'ports-mask',

            connectorsIntroduction: 'drawer-mask',

            atxPinMobo: 'port-atx-mask',
            atxPinPsu: 'port-atx-mask',
            
            epsPinPsu: 'port-eps-psu-mask',
            epsPinMobo: 'port-eps-mobo-mask'
        }

        this.overlay.className = 'overlay'

        const newClass = overlayClassMap[data.id]
        if (newClass) {
            this.overlay.classList.add(newClass)
        }
    }

    handleClick(e) {   
        const mouse = {x: e.clientX, y: e.clientY}
        const miniElementBox = this.miniElement.getBoundingClientRect()
        const fullElementBox = this.fullElement.modal.getBoundingClientRect()
        
        if(this.utilityTool.isInsideBox(mouse, miniElementBox) && !this.fullElement.isActive) {
            this.openModal() // open page                
        } else if(!this.utilityTool.isInsideBox(mouse, fullElementBox) && this.fullElement.isActive) {
            this.closeModal() // close page
        }
    }

    handleClickWithTask(task) {
        this.updateMiniDsiplay(task)
    }

    updateMiniDsiplay(task) {
        if (!task.descIndex) task.descIndex = 0

        if (this.onTutorial) {
            // Skip non-'text' steps
            while (
                task.descIndex < task.description.length &&
                task.description[task.descIndex].type !== 'text'
            ) {
                task.descIndex++
            }

            // If no more steps, you might want to end tutorial here
            if (task.descIndex >= task.description.length) {
                if(task.highlight) this.highlightCurrentTask(task.highlight, false)
                this.resume()
                return
            } 

            const step = task.description[task.descIndex]

            this.infoSec.innerHTML = task.descIndex == 0
            ? `<p class="tip-title">${task.title.text}</p>
                <p class="tip-desc">${step.content}</p>`
            : `<p class="tip-desc">${step.content}</p>`

            task.descIndex++ // Move to the next step for next click

        }
    }

    resume() {
        this.toggleOverlay(false)
        this.toggleMiniDisplay(false)
        this.eventBus.emit('gameResume')
        setTimeout(() => {
            window.removeEventListener('click', this.boundClickWithTask)
            window.addEventListener('click', this.boundClick)
            window.addEventListener('mousemove', this.boundMouseHover)
        }, 100)
    }

    
    showCurrentTask(task) {
        this.createTask(task)
        this.eventBus.emit('gamePause')

        this.toggleOverlay(true)
        this.toggleMiniDisplay(true)

        // Proceed with showing the task
        if(task.highlight) this.highlightCurrentTask(task.highlight, true)
            
        window.removeEventListener('mousemove', this.boundMouseHover)
        window.removeEventListener('click', this.boundClick)
            
        this.boundClickWithTask = this.handleClickWithTask.bind(this, task)
        window.addEventListener('click', this.boundClickWithTask)
    }

    toggleOverlay(bool) {
        bool
        ? this.overlay.classList.remove('invisible')
        : this.overlay.classList.add('invisible')
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

    createTask(task) {
        const taskCell = document.createElement('div')
        taskCell.classList.add('task-cell')
        taskCell.id = task.id

        // title element
        const cellTitle = this.createTaskTtitle(task)
        taskCell.appendChild(cellTitle)

        const divider = document.createElement('div')
        divider.classList.add('vert-br')
        taskCell.appendChild(divider)

        // description element
        const cellDescription = this.createTaskDescription(task)
        taskCell.appendChild(cellDescription)

        this.tasksContainer.insertBefore(taskCell, this.tasksContainer.firstChild)
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
                case 'break':
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

        // Putrandom Greet from assistant
        const randomGreet = this.dialogues[[Math.floor(Math.random() * this.dialogues.length)]]
        this.prevDialogue = this.infoSec.innerHTML
        this.infoSec.innerHTML = `<p class="tip-desc">${randomGreet}</p>`
    }

    closeModal() {
        const windowBody = document.querySelector('body')
        this.fullElement.modal.close()
        this.fullElement.isActive = false

        // transfer back to web page
        this.miniElement.classList.remove('in-modal')
        this.miniElement.classList.remove('extended')
        this.infoSec.innerHTML = this.prevDialogue
        this.prevDialogue = null
        this.iconSec.style.animation = 'none'
        windowBody.appendChild(this.miniElement)

        window.addEventListener('mousemove', this.boundMouseHover)
    }

    handleMouseHover(e) {
        const isHovering = this.utilityTool.isInsideBox(
            {x: e.clientX, y: e.clientY}, 
            this.miniElement.getBoundingClientRect()
        )

        this.toggleMiniDisplay(isHovering)

        isHovering ? this.notifCount = 0 : this.notifCount = 1
        this.miniElement.classList.toggle('extended', isHovering)
        this.miniElement.style.cursor = isHovering ? 'pointer' : 'default'
        this.pulse.classList.toggle('hidden', isHovering)
        this.infoSec.classList.toggle('hidden', !isHovering)
    }

    toggleMiniDisplay(bool) {
        bool ? this.notifCount = 0 : this.notifCount = 1
        this.miniElement.classList.toggle('extended', bool)
        this.miniElement.style.cursor = bool ? 'pointer' : 'default'
        this.pulse.classList.toggle('hidden', bool)
        this.infoSec.classList.toggle('hidden', !bool)
    }

    // hihglight handler for the current task (marks the element for easier navigation in the UI)
    highlightCurrentTask(taskHighlights, isBlocked) {
        // Remove all highlights
        document.querySelectorAll('.highlight-element').forEach(el => {
            el.classList.remove('highlight-element')
        })

        const {singles, multiples} = this.splitSinglesAndMultiples(taskHighlights)

        singles.forEach(taskHighlight => {
            const elementToHighlight = document.querySelector(taskHighlight)
            if (elementToHighlight) {
                elementToHighlight.classList.add('highlight-element')
                elementToHighlight.classList.toggle('blocked', isBlocked)
            }
        })

        multiples.forEach(taskHighlights => {
            const elementsToHighlight = document.querySelectorAll(taskHighlights)
            for(let el of elementsToHighlight) {
                el.classList.add('highlight-element')
                el.classList.toggle('blocked', isBlocked)
            }

        }) 

          

    }

    splitSinglesAndMultiples(arr) {
        const countMap = {};
        const singles = [];
        const multiples = [];

        // Count occurrences
        for (const item of arr) {
            countMap[item] = (countMap[item] || 0) + 1;
        }

        // Separate based on count
        for (const [item, count] of Object.entries(countMap)) {
            if (count === 1) {
            singles.push(item);
            } else {
            multiples.push(item);
            }
        }

        return { singles, multiples };
    }
    
    showFinalBuildSummary() {
        const modal = document.createElement('div');
        modal.className = 'tutorial-summary-modal';

        // Get components status
        const components = this.main.bootUpTab.pcUnit.componentsStatus;
        const summaryHTML = Object.entries(components).map(([key, info]) => {
            if (Array.isArray(info)) {
                // Handle array components like RAM or storage
                return info.map((slot, i) => {
                    const component = slot?.component;
                    const imageSrc = component?.images?.[0]?.imageSrc
                    const specs = component?.specs || {};
                    return `
                        <div class="component-card ${component ? 'installed' : 'empty'}">
                            <div class="card-header">
                                <h3>${key.toUpperCase()} SLOT ${i + 1}</h3>
                                <span class="status-badge">${component ? '🟢' : '🔴'}</span>
                            </div>
                            <div class="card-content">
                                <div class="component-image">
                                    <img src="${imageSrc}" alt="${component?.name || 'Not Installed'}">
                                </div>
                                <div class="component-details">
                                    <h4>${component?.name || 'Not Installed'}</h4>
                                    ${component ? `
                                        <div class="specs-list">
                                            ${Object.entries(specs)
                                                .filter(([key]) => !key.includes('image'))
                                                .map(([key, value]) => `
                                                    <div class="spec-item">
                                                        <span class="spec-label">${key}:</span>
                                                        <span class="spec-value">${value}</span>
                                                    </div>
                                                `).join('')}
                                        </div>
                                    ` : ''}
                                </div>
                            </div>
                        </div>
                    `;
                }).join('');
            } else {
                // Handle regular component objects
                const component = info?.component;
                const imageSrc = component?.images?.[0]?.imageSrc;
                const specs = component?.specs || {};
                return `
                    <div class="component-card ${component ? 'installed' : 'empty'}">
                        <div class="card-header">
                            <h3>${key.toUpperCase()}</h3>
                            <span class="status-badge">${component ? '🟢' : '🔴'}</span>
                        </div>
                        <div class="card-content">
                            <div class="component-image">
                                <img src="${imageSrc}" alt="${component?.name || 'Not Installed'}">
                            </div>
                            <div class="component-details">
                                <h4>${component?.name || 'Not Installed'}</h4>
                                ${component ? `
                                    <div class="specs-list">
                                        ${Object.entries(specs)
                                            .filter(([key]) => !key.includes('image'))
                                            .map(([key, value]) => `
                                                <div class="spec-item">
                                                    <span class="spec-label">${key}:</span>
                                                    <span class="spec-value">${value}</span>
                                                </div>
                                            `).join('')}
                                    </div>
                                ` : ''}
                            </div>
                        </div>
                    </div>
                `;
            }
        }).join('');

        // Calculate total power and get warnings
        const totalPower = this.main.wattageCalculator.calculateWattage() || 0;
        const psuWattage = components.psu?.component?.specs?.wattage || 0;
        const powerWarning = totalPower > psuWattage ? 
            `<div class="build-warning">⚠️ PSU may be underpowered (${psuWattage}W PSU, ${totalPower}W required)</div>` : 
            `<div class="build-success">⚡ Power requirements met (${totalPower}W of ${psuWattage}W)</div>`;

        modal.innerHTML = `
            <div class="summary-content">
                <div class="summary-header">
                    <h2>PC Build Summary</h2>
                    <div class="power-status">
                        ${powerWarning}
                    </div>
                </div>
                <div class="components-grid">
                    ${summaryHTML}
                </div>
                <div class="summary-footer">
                    <div class="summary-buttons">
                        <button class="summary-btn restart-btn">Restart Tutorial</button>
                        <button class="summary-btn reset-btn">Reset Build</button>
                        <button class="summary-btn continue-btn">Continue Building</button>
                    </div>
                </div>
            </div>
        `;
    
        document.body.appendChild(modal);
    
        // Add event listeners to all buttons 

        //restart
        modal.querySelector('.restart-btn').addEventListener('click', () => {
            modal.remove();
            window.location.href = '../index.html';
            //this.main.start();
        });
        //reset
        modal.querySelector('.reset-btn').addEventListener('click', () => {
            modal.remove();
            this.closeModal();
            this.main.resetBuild();
            this.main.refreshSimulator?.();
        });
        //continue
        modal.querySelector('.continue-btn').addEventListener('click', () => {
            modal.remove();
            this.closeModal();
        });
    
        
    }

}
export default Assistant
