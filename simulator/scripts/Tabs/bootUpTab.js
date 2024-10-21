class BootUpTab {
    constructor(elementHandler, utilityTool, pcUnit) {
        // Utility
        this.elementHandler = elementHandler;
        this.utilityTool = utilityTool;
        this.elements = this.elementHandler.getBootUpTabElements();

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
        this.pcUnit.clearReportsArea(); // Clear previous boot reports

        const missingComponents = this.pcUnit.getMissingComponents(); // Check for missing components

        if (missingComponents.length > 0) {
            this.showMissingComponentsError(missingComponents);
        } else {
            const randomErrorChance = Math.random() < 0.7; // 70% chance of boot failure 

            if (randomErrorChance) {
                this.showBootError();
            } else {
                this.showSuccessfulBoot();
            }
        }
    }

    // If component is missing message will be shown
    showMissingComponentsError(missingComponents) {
        missingComponents.forEach(component => {
            const errorMessage = { tag: "Error", def: `${component.toUpperCase()} is not attached.` };
            this.pcUnit.createReportCell(errorMessage);
        });

        const troubleshootingDiv = document.createElement('div');
        troubleshootingDiv.classList = 'troubleshootingSteps';
        troubleshootingDiv.innerHTML = "Please attach the missing components and try booting again.";
        this.reportArea.appendChild(troubleshootingDiv);
    }

    // Boot error messages
    showBootError() {
        const errorMessages = [
            "Error: Missing Boot Device",
            "Error: CMOS Battery Failure",
            "Error: GPU not detected",
            "Error: No RAM detected",
            "Error: Overheating detected",
            "Error: Power supply issue detected"
        ];

        const randomError = errorMessages[Math.floor(Math.random() * errorMessages.length)];
        this.pcUnit.createReportCell({ tag: 'Error', def: randomError });

        const troubleshootingSteps = `
            - Check all power cables and connections.<br>
            - Make sure the boot device (HDD/SSD) is properly connected.<br>
            - Reseat the RAM and GPU.<br>
            - Replace the CMOS battery if necessary.<br>
            - Ensure the power supply unit is functioning correctly.
        `;
        const troubleshootingDiv = document.createElement('div');
        troubleshootingDiv.classList = 'troubleshootingSteps';
        troubleshootingDiv.innerHTML = troubleshootingSteps;
        this.reportArea.appendChild(troubleshootingDiv);
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
