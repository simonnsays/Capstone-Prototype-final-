import PCUnit from "../Data/pcUnit.js"
import errorCodes from "../Data/errorCodes.js"

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
                console.log('All components are good, Booting up')
                // this.powerOn()
            } else {
                //////////// AREA OF REPORT ERRORS 
                console.log("An Error has occured")
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
        console.log(this.pcUnit.reports)

        this.pcUnit.reports.forEach((report, i) => {
            const delay = initialDelay * Math.pow(decreaseFactor, i)
            setTimeout(() => this.createReportCell(report), delay)
        });
    }

    createReportCell(report) {
        const cell = document.createElement('div')
        cell.classList = 'reportCell'
        console.log(report)
        switch(report.tag) {
            case 'Hazard': 
                cell.classList.add('reportHazard')
                break
            case 'Error':
                cell.classList.add('reportError')
                break
            case 'Critical':
                cell.classList.add('reportCritical')
                const exlaimElement = document.createElement('div')
                exlaimElement.classList = 'exclamationPoint'
                exlaimElement.innerHTML = '!'
                cell.appendChild(exlaimElement)
                break
        }
        
        console.log(cell)

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