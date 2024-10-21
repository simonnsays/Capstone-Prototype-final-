class tsimulation {
    constructor(elementhHandler, utilityTool) {
        this.elementhHandler = elementhHandler
        this.utilityTool = utilityTool
        this.errors = [];  // Array to hold current boot errors

        // Cache modal elements
        this.troubleshootingModal = document.querySelector('#troubleshootingModal');
        this.errorList = document.querySelector('#error-list');
        this.fixAllBtn = document.querySelector('#fix-all-btn');
        this.closeBtn = document.querySelector('#close-troubleshooting');

        // Bind event listeners
        this.fixAllBtn.addEventListener('click', () => this.fixAllIssues());
        this.closeBtn.addEventListener('click', () => this.troubleshootingModal.close());
    }

    // Simulate booting with error detection
    bootPC() {
        this.checkForErrors();  // Check for errors
        if (this.errors.length > 0) {
            this.showTroubleshooting();  // If errors exist, show troubleshooting modal
        } else {
            console.log('PC Booted Successfully!');
        }
    }

    // Check for common boot errors
    checkForErrors() {
        this.errors = [];  // Reset the errors array 
        // Simulated conditions for errors
        const isPowerConnected = false;   // Example: power not connected
        const isRAMInstalled = false;     // Example: RAM not installed
        const isCablesConnected = true;   // Example: Cables connected

        // Populate the errors based on checks
        if (!isPowerConnected) this.errors.push('Power cable is not connected.');
        if (!isRAMInstalled) this.errors.push('RAM module is missing.');
        if (!isCablesConnected) this.errors.push('Some cables are disconnected.');
    }

    // Display troubleshooting modal with detected errors
    showTroubleshooting() {
        // Clear the previous error list
        this.errorList.innerHTML = '';

        // Populate the error list dynamically
        this.errors.forEach(error => {
            const listItem = document.createElement('li');
            listItem.textContent = error;
            this.errorList.appendChild(listItem);
        });

        // Show the troubleshooting modal
        this.troubleshootingModal.showModal();
    }

    // Fix handler: Simulate fixing all detected issues
    fixAllIssues() {
        // Simulate applying fixes (just for demo purposes)
        console.log('Attempting to fix all issues...');

        // Reset conditions as if issues were fixed
        const fixedErrors = this.errors.length;
        this.errors = [];  // Clear all errors

        // Update UI and show results
        if (fixedErrors > 0) {
            alert(`${fixedErrors} issues fixed. Rebooting PC...`);
        } else {
            alert('No issues to fix!');
        }

        // Close the troubleshooting modal and reboot PC
        this.troubleshootingModal.close();
        this.bootPC();  // Try booting again
    }
}



export default tsimulation