import PCUnit from "../Data/pcUnit.js"
import errorCodes from "../Data/errorCodes.js"
import Bios from "../Data/bios.js"
class BootUpTab {
    constructor(elementHandler, utilityTool, eventBus, main) {
        // Utility
        this.elementHandler = elementHandler
        this.utilityTool = utilityTool
        this.eventBus = eventBus
        this.elements = this.elementHandler.getBootUpTabElements()
        this.main = main
        // Elements
        this.isActive = false
        this.modal =  this.elements.modal
        this.openBtn = this.elements.openBtn
        this.closeBtn = this.elements.closeBtn
        this.pcPlaceHolder = this.elements.pcPlaceHolder
        this.powerBtn = this.elements.powerBtn
        this.powerBtn.disabled = true
        this.reportArea = this.elements.reportArea
        // PC Unit
        this.pcUnit = new PCUnit(this.elements, eventBus)
        this.bios = new Bios(this.eventBus,this.pcUnit, this)
        this.pcUnit.setBios(this.bios)       
        // Power notification
        this.powerBanner = document.getElementById('powerNotification')
        this.updatePowerStatus();
        // Events
        this.openBtn.addEventListener('click', () => {
            this.openTab()
            this.eventBus.emit('bootUpTabOpened')
        })
        this.boundHandleOutofBounds = (e) => this.handleOfBounds(e, this.modal)
        window.addEventListener('mousedown', this.boundHandleOutofBounds)
        this.closeBtn.addEventListener('click', () => this.closeTab())
    }

    init() {
        this.subscribeToEventBus()
    }

    subscribeToEventBus() {
        this.eventBus.on('gamePause', () => this.pause())
        this.eventBus.on('gameResume', () => this.resume())
    }

    pause() {
        window.removeEventListener('mousedown', this.boundHandleOutofBounds)
    }

    resume() {
        window.addEventListener('mousedown', this.boundHandleOutofBounds)
    }
    
    // show power notification
    updatePowerStatus() {
          if (this.pcUnit.power === 'on') {
            this.powerBanner.classList.remove('hidden');
        } else {
            this.powerBanner.classList.add('hidden');
        }
    }   

    openTab() {
        this.modal.style.display = 'block'
        this.isActive = true
    }

    closeTab() {
        this.modal.style.display = 'none'
        this.isActive = false
    }

    handleOfBounds(e, modal) {
        const rawPoint = {x: e.clientX, y: e.clientY}
        const rect = modal.getBoundingClientRect()
        if(!this.utilityTool.isInsideBox(rawPoint, rect)) {
            this.closeTab()
        }
    }

    togglePowerButtonState(state) {
        switch(state) {
            case 'locked':
                this.powerBtn.style.opacity = '40%'
                this.powerBtn.firstElementChild.style.width = '100%'
                this.powerBtn.firstElementChild.style.height = '100%'
                this.powerBtn.disabled = true
                break
            case 'unlocked':
                this.powerBtn.style.opacity = '100%'
                this.powerBtn.firstElementChild.style.width = ''
                this.powerBtn.firstElementChild.style.height = ''
                this.powerBtn.disabled = false
                break
        }
        
    }

    clearCurrentUnitElement() {
        while(this.pcPlaceHolder.firstChild) {
            this.pcPlaceHolder.removeChild(this.pcPlaceHolder.firstChild)
        }
    }

    createUnitElement(component) {
        // find front panel image source
        const componentSrc = component.images.find(image => image.side === 'front').imageSrc
        // create image element and set source 
        const newUnitImage = document.createElement('img')
        newUnitImage.src = componentSrc 
        this.pcPlaceHolder.appendChild(newUnitImage)
    }

    togglePower(unit) {
        this.pcUnit.reports = []
        // turn on
        if(this.pcUnit.power === 'off') {
            // attempt power on
            this.pcUnit.power = 'on'
            this.updatePowerStatus();
            const pcState = this.pcUnit.attemptPowerOn(unit)
            if(pcState) {
                // this.powerOn()
                setTimeout(() => this.eventBus.emit('poweredOn'), 1900)
            } else {
                this.pcUnit.displayErrorScreen() // display error screen if no power is detected
            }

            setTimeout(() => this.report(), 500)
            return
        }

        // turn off
        this.power = 'off' 
        this.powerOff()
    }

    powerOff() {
        this.pcUnit.power = 'off'
        this.screen?.classList.remove('screen-on')
        this.clearReportsArea()
        this.pcUnit.powerOffMonitor()
        this.updatePowerStatus();
        for(let key in this.pcUnit.componentsStatus) {
            if(Array.isArray(this.pcUnit.componentsStatus[key])) {
                this.pcUnit.componentsStatus[key] = []
            } else {
                this.pcUnit.componentsStatus[key] = null
            }
        }
    }

    powerBtnClick = (unit) => {
        if(!this.powerBtn.disabled) {
            this.togglePower(unit)
        }
    }

    report() {
        const initialDelay = 1200
        const decreaseFactor = 0.75
        this.clearReportsArea()
        this.pcUnit.reports.forEach((report, i) => {
            const delay = initialDelay * Math.pow(decreaseFactor, i)
            setTimeout(() => this.createReportCell(report), delay)
        });
    }

    // function to create an error overview div
    openErrorView(errorCode) {
         // Get error details from errorCodes
        const errorData = errorCodes[errorCode];
        if (!errorData) {
            console.error(`Error code ${errorCode} not found in errorCodes.`);
            return;
        }
        // Create container div
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-overview';
        errorDiv.id = 'error-overview';
        const assistantInfo = document.querySelector(".info-section");
        const assistantContainer = document.getElementById("assistantMini");      
        errorDiv.innerHTML = `
            <div class="error-header">
                <button class="close-btn">&times;</button>
            </div>
            <div class="error-body">
                <div class="error-meta">
                    <span class="error-code">Code: ${errorData.code}</span>
                    <span class="error-severity ${errorData.severity}">${errorData.severity} ${this.getSeverityIcon(errorData.severity)}</span>
                </div>
                <p class="error-description">${errorData.description}</p>
                <div class="troubleshooting">
                    <h3>Recommended Solutions:</h3>
                    <p>Open up Assistant Tab to see troubleshooting guide</p>
                </div>
            </div>
        `;  

        // Update the assistant message based on error
        assistantInfo.classList.remove ('hidden');
        assistantInfo.innerHTML = `
            <p><strong> Oops it looks like you're facing an issue in your bootup</strong>.</p>
            <p style="font-weight: normal;">Please click me to open the errors view & let me assist you regarding the issue of "${errorData.description}"</p>
            <p style="font-weight: normal; cursor: pointer;">...</p>    
        `;

        // Make sure the assistant container is visible
        assistantContainer.classList.add ('extended');
        assistantContainer.classList.remove('hidden');

        // Add close button event listener
        const closeBtn = errorDiv.querySelector('.close-btn');
        closeBtn.addEventListener('click', () => {
            assistantContainer.classList.remove('extended');
            assistantInfo.classList.add ('hidden');
            assistantInfo.innerHTML = `             
            <p class="tip-title">Hello I'm your Assistant and you have new tasks.</p>
            <p class="tip-desc">Welcome to the simulation for PC building please click me to view tasks and for more Information</p>
`;
            document.body.removeChild(overlay);
            errorDiv.remove();
        });

        // Create overlay in which it closes the error div when the user clicks outside
        const overlay = document.createElement('div');
        overlay.className = 'error-overlay';
        overlay.id = 'error-overlay';
        overlay.addEventListener('click', () => {
            document.body.removeChild(overlay);
            errorDiv.remove();
            assistantContainer.classList.remove('extended'); 
            assistantInfo.classList.add ('hidden');
            assistantInfo.innerHTML = `             
            <p class="tip-title">Hello I'm your Assistant and you have new tasks.</p>
            <p class="tip-desc">Welcome to the simulation for PC building please click me to view tasks and for more Information</p>
`;
        });

        // Add to DOM
        document.body.appendChild(overlay);
        document.body.appendChild(errorDiv);

        // Add event listener to close error overview when assistant tab is opened
        assistantContainer.addEventListener('click', () => {
            errorDiv.remove();
            overlay.remove();
            const assistant = document.querySelector('.info-section');
            assistant.innerHTML = `
            <p class="tip-title">Hello I'm your Assistant and you have new tasks.</p>
            <p class="tip-desc">Welcome to the simulation for PC building please click me to view tasks and for more Information</p>

            `;
        });
        

    } 

    // Helper methods
    getSeverityIcon(severity) {
        const icons = {
            Critical: '❗', // Hard Drive Failure, CPU Overheating, BIOS Corruption, Power Failure
            Hazard: '⚠️', // High Temperatures, Power Surge, Fan Speed Abnormal
            Error: '❌', // GPU Failure, No Boot Device Found, Memory Error, Missing Component
        };
        return icons[severity];
    }

    createReportCell(report) {
        const cell = document.createElement('div')
        cell.classList = 'reportCell'
       switch(report.tag.toLowerCase()) {
           case 'hazard': 
               cell.classList.add('reportHazard')
               break
           case 'error':
               cell.classList.add('reportError')
               break
           case 'critical':
               cell.classList.add('reportCritical')
               const exlaimElement = document.createElement('div')
               exlaimElement.classList = 'exclamationPoint'
               exlaimElement.innerHTML = '!'
               cell.appendChild(exlaimElement)
               break
            case 'success':
                cell.classList.add('reportSuccess')
                cell.id = 'reportSuccess' 
                cell.addEventListener('click', () => {
                        this.showFinalBuildSummary();
                        this.eventBus.emit('reportSuccessClicked')
                });
            break
        }
        // only attach errorview click if report has a code
        if(report.code){cell.addEventListener('click', () => this.openErrorView(report.code)); // Add event listener to report cells opening error view
        }
        const tag = document.createElement('div')
        tag.classList = 'reportCellTag'
        tag.innerHTML = report.tag
        cell.appendChild(tag)

        const def = document.createElement('div')
        def.classList = 'reportCellDef'
        def.innerHTML = report.def
        cell.appendChild(def)

        this.reportArea?.appendChild(cell)
    }

    showFinalBuildSummary() {
        const modal = document.createElement('div');
        modal.className = 'tutorial-summary-modal';
        
        // Event listener for tutorial summary 
        modal.addEventListener('click', () => {
            this.eventBus.emit('resetBuild');
        })

        // Get components status
        const components = this.pcUnit.componentsStatus;
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
        }}).join('');

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
            this.main.resetBuild();
            this.main.showSetupWizard()
            this.eventBus.emit('setupWizard');
            this.eventBus.emit('tutorialFinished')
        });
    }

    clearReportsArea() {
        while (this.reportArea?.firstChild) {
            this.reportArea.removeChild(this.reportArea.firstChild)
        }
    }

    update(component) {
        // Set New PC Unit(Only accepting chassis)
        this.pcUnit.availableUnit = this.pcUnit.checkIfAvailableUnit(component) || null
        this.clearCurrentUnitElement()
        if(!this.pcUnit.availableUnit) {
            this.togglePowerButtonState('locked')
            this.pcUnit.availableUnit = null
            return
        } 
        this.togglePowerButtonState('unlocked')
        this.createUnitElement(this.pcUnit.availableUnit)
        // only turn on if power button is enabled
        if (!this.powerBtn.hasListener) {
            this.powerBtn.addEventListener('mouseup', () => this.powerBtnClick(this.pcUnit.availableUnit));
            this.powerBtn.hasListener = true;
        }  
    }
}

export default BootUpTab