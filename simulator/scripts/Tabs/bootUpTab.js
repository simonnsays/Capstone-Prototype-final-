import PCUnit from "../Data/pcUnit.js"

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
        const state = this.pcUnit.checkPCState(unit)
        // turn on
        if(this.pcUnit.power === 'off') {
            /*
            *   Main Power on Sequence
            */

            // check for pc parts
            
            this.pcUnit.power = 'on'
            this.pcUnit.powerOn()
            return
        }

        // turn off
        this.pcUnit.power = 'off' 
        this.pcUnit.powerOff()
    }

    powerBtnClick = (unit) => {
        if(!this.powerBtn.disabled) {
            this.togglePower(unit)
        }
    }

    update(component) {
        // throw new Error('error test')
        // Set New PC Unit(Only accepting chassis)
        this.pcUnit.availableUnit = this.pcUnit.checkIfAvailableUnit(component) || null
        this.clearCurrentUnitElement()

        if(!this.pcUnit.availableUnit) {
            this.togglePowerButtonState('locked')
            this.pcUnit.availableUnit = null
            // this.powerBtn.removeEventListener('click', () => this.pcUnit.powerOn)    
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