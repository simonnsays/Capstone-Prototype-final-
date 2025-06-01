import components from "../Data/data.js"
import PCUnit from "../Data/pcUnit.js"
import errorCodes from "../Data/errorCodes.js"
import Bios from "../Data/bios.js"
class BootUpTab {
    constructor(elementHandler, utilityTool) {
        // Utility
        this.elementHandler = elementHandler
        this.utilityTool = utilityTool
        this.elements = this.elementHandler.getBootUpTabElements()
        
        // Elements
        this.isActive = false
        this.modal = this.elements.modal
        this.openBtn = this.elements.openBtn
        this.closeBtn = this.elements.closeBtn
        this.pcPlaceHolder = this.elements.pcPlaceHolder
        this.powerBtn = this.elements.powerBtn
        this.powerBtn.disabled = true
        this.reportArea = this.elements.reportArea

        
        // PC Unit
        this.pcUnit = new PCUnit(this.elements)
        this.bios = new Bios(this.pcUnit, this)
        this.pcUnit.setBios(this.bios)
        
        // Events
        this.openBtn.addEventListener('click', () => this.openTab())
        window.addEventListener('mousedown', (e) => this.handleOfBounds(e, this.modal))
        this.closeBtn.addEventListener('click', () => this.closeTab())
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
            /*  Main Power on Sequence */
            // attempt power on
            this.pcUnit.power = 'on'
            const pcState = this.pcUnit.attemptPowerOn(unit)
            if(pcState) {
                // console.log('All components are good, Booting up')
                // this.powerOn()
            } else {
                //////////// AREA OF REPORT ERRORS 
                this.pcUnit.displayErrorScreen() // display error screen if no power is detected
            }

            setTimeout(() => this.report(), 500)
            return
        }

        // turn off
        this.power = 'off' 
        this.powerOff()
    }

    powerOn() {
        this.pcUnit.power = 'on'

        this.pcUnit.screen?.classList.add('screen-on')
        setTimeout(() => this.report(), 500)
    }

    powerOff() {
        this.pcUnit.power = 'off'
        this.screen?.classList.remove('screen-on')
        this.clearReportsArea()
        this.pcUnit.powerOffMonitor()

        for(let key in this.pcUnit.componentsStatus) {
            if(Array.isArray(this.pcUnit.componentsStatus[key])) {
                this.pcUnit.componentsStatus[key] = []
            } else {
                this.pcUnit.componentsStatus[key] = null
            }
        }
        // console.log(this.pcUnit.componentsStatus)
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
    
    // Get error code data
    //const errorData = errorCodes[report.code] || {
    //    code: 'ERR-00',
    //    severity: 'error',
    //};

    // Add severity class
    //cell.classList.add(`report-${errorData.severity.toLowerCase()}`);

       //console.log(report)
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
       }

       cell.addEventListener('click', () => this.openErrorView(report.code)); // Add event listener to report cells opening error view
    //    console.log(cell)
/////////////////////////////////////////////////// dan code ///////////////////////////////////////////////////
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