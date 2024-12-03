class wattageCalculator {
    constructor(displayArea, calculatorElementId = "wattsCalculator", canvas) {
        this.canvas = canvas
        this.displayArea = displayArea;
        this.calculatorElement = document.getElementById(calculatorElementId);
    }
    // Calculate total wattage of all components
    calculateWattage() {
        const components = this.getAllAttachedComponents();
        const totalWatts = components.reduce((total, component) => {
            const watts = parseInt(component.watts, 10) || 0; // Default to 0 if watts is undefined 
            return total + watts;
        }, 0);
        this.updateWattageDisplay(totalWatts);
    }
    // Helper: Get all attached components from the display area
    getAllAttachedComponents() {
        const components = [];
        const collectComponents = (component) => {
            if (component) {
                components.push(component);
                // Recursively collect attached components
                (component.slots || []).forEach(slot => {
                    if (slot.component) collectComponents(slot.component);
                });
            }
        };
        if (this.displayArea.table.component) {
            collectComponents(this.displayArea.table.component);
        }
        return components;
    }
    // Update the wattage display in the target div
    updateWattageDisplay(totalWatts) {
        if (this.calculatorElement) {
            this.calculatorElement.textContent = `Total Wattage: ${totalWatts}W`;
        }
    }
}
export default wattageCalculator