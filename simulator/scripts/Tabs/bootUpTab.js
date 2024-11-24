class BootUpTab {
    constructor(elementHandler, utilityTool, pcUnit, portsTab, drawer) {
        // Utility
        this.elementHandler = elementHandler;
        this.utilityTool = utilityTool;
        this.elements = this.elementHandler.getBootUpTabElements();
        this.portsTab = portsTab;
        this.drawer = drawer;
        
        // Elements
        this.isActive = false;
        this.modal = this.elements.modal;
        this.openBtn = this.elements.openBtn;
        this.closeBtn = this.elements.closeBtn;
        this.pcPlaceHolder = this.elements.pcPlaceHolder;
        this.powerBtn = this.elements.powerBtn;
        this.powerBtn.disabled = true;
        this.reportArea = this.elements.reportArea;
        
        // PC Unit
        this.pcUnit = pcUnit;
        this.pcUnit.reportArea = this.elements.reportArea;

        // Events
        this.openBtn.addEventListener('click', () => this.openTab());
        this.closeBtn.addEventListener('click', () => this.closeTab());
    }

    openTab() {
        this.modal.style.display = 'block';
        this.isActive = true;
    }

    closeTab() {
        this.modal.style.display = 'none';
        this.isActive = false;
    }

    togglePowerButtonState(state) {
        switch (state) {
            case 'locked':
                this.powerBtn.style.opacity = '40%';
                this.powerBtn.firstElementChild.style.width = '100%';
                this.powerBtn.firstElementChild.style.height = '100%';
                this.powerBtn.disabled = true;
                break;
            case 'unlocked':
                this.powerBtn.style.opacity = '100%';
                this.powerBtn.firstElementChild.style.width = '';
                this.powerBtn.firstElementChild.style.height = '';
                this.powerBtn.disabled = false;
                break;
        }
    }

    clearCurrentUnitElement() {
        while (this.pcPlaceHolder.firstChild) {
            this.pcPlaceHolder.removeChild(this.pcPlaceHolder.firstChild);
        }
    }

    createUnitElement(component) {
        const componentSrc = component.images.find(image => image.side === 'front').imageSrc;
        const newUnitImage = document.createElement('img');
        newUnitImage.src = componentSrc;
        this.pcPlaceHolder.appendChild(newUnitImage);
    }

    powerBtnClick = () => {
        if (!this.powerBtn.disabled) this.simulateBootProcess();
    };

    // Simulate the boot process
    simulateBootProcess() {
        // Clear reports area
        this.pcUnit.clearReportsArea();

         // Check for missing ports,cables,components and for semiused cables
         const { missingComponents, missingCables } = this.pcUnit.getMissingComponents();

        // Check for missing components and cables
        if (missingComponents.length || missingCables.length) {
            if (missingComponents.length) {
                this.showMissingError(missingComponents, 'component');
            }
            if (missingCables.length) {
                this.showMissingError(missingCables, 'cable');
            }
            return;
        }

        // Proceed with boot
        const bootSuccess = Math.random() >= 0.7;
        bootSuccess ? this.showSuccessfulBoot() : this.showBootError();
    }
    
    // Show missing components or cables error
    showMissingError(missingItems, type) {
        missingItems.forEach(item => {
            const errorMessage = { 
                tag: "Error", 
                def: ` ${item} is missing or not connected.` 
            };
            this.pcUnit.createReportCell(errorMessage);
        });

        const troubleshootingDiv = document.createElement('div');
        troubleshootingDiv.classList = 'troubleshootingSteps';
        troubleshootingDiv.innerHTML = `Please attach the missing ${type}(s) and try booting again.`;
        this.reportArea.appendChild(troubleshootingDiv);
    }

    // Boot error messages
    showBootError() {
        // Categorized boot errors
    const errorCategories = {
        BIOS: [],
        Storage: [],
        Overheat: [],
        Power: [],
        Memory: [],
        "Diagnostic LEDs": [],
        GPU: [],

    };

    // Randomly select a category and an error message within it
    const categoryKeys = Object.keys(errorCategories);
    const selectedCategory = categoryKeys[Math.floor(Math.random() * categoryKeys.length)];
    const selectedError = errorCategories[selectedCategory][Math.floor(Math.random() * errorCategories[selectedCategory].length)];
    
    // Show boot error dialog
    this.pcUnit.showBootErrorDialog(selectedError);
    }

    // Boot Successful 
    showSuccessfulBoot() {
        this.pcUnit.powerOn();
    }

    update(component) {
        this.pcUnit.availableUnit = this.pcUnit.checkIfAvailableUnit(component) || null;
        this.clearCurrentUnitElement();

        if (!this.pcUnit.availableUnit) {
            this.togglePowerButtonState('locked');
            this.pcUnit.availableUnit = null;
            return;
        }

        this.togglePowerButtonState('unlocked');
        this.createUnitElement(this.pcUnit.availableUnit);

        if (!this.powerBtn.hasListener) {
            this.powerBtn.addEventListener('mouseup', this.powerBtnClick);
            this.powerBtn.hasListener = true;
        }
    }
}

export default BootUpTab;
