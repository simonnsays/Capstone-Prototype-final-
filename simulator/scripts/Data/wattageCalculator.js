class wattageCalculator {
    constructor(displayArea, calculatorElementId = "wattsCalculator", canvas) {
        this.canvas = canvas
        this.displayArea = displayArea;
        this.calculatorElement = document.getElementById(calculatorElementId);
    }
    // Calculate total wattage of all components
    calculateWattage() {
        const components = this.getAllAttachedComponents();

        // Calculate total wattage excluding the PSU
        const totalWatts = components.reduce((total, component) => {
            if (component.type !== 'psu') {  // Remove psu wattage value in total wattages
                const watts = parseInt(component.watts, 10) || 0; // Changes string type into int to calculate value, default to 0 if watts is undefined 
                return total + watts; 
            }
            return total;
        }, 0);

        // Find PSU wattage
        const psu = components.find(component => component.type === 'psu');
        const psuWattage = psu ? parseInt(psu.watts, 10) : null;

        // Update the display with PSU wattage limit
        const displayText = psuWattage
            ? `Total Watts: ${totalWatts}W / ${psuWattage}W`
            : `Total Watts: ${totalWatts}W`;

        // Update the display, but also return the total wattage
         this.updateWattageDisplay(displayText); // Pass the display text to the method
        return totalWatts;

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
    updateWattageDisplay(displayText) {
        const wattageElement = document.getElementById('wattageDisplay');
        if (wattageElement) {
            wattageElement.textContent = displayText; // Update with formatted text
        }
    }
}
export default wattageCalculator