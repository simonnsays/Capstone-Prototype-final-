class PCUnit {
    constructor(utilityTool, displayArea, Canvas, portsTab, drawer) { 
        this.displayArea = displayArea;
        this.Canvas = Canvas;
        this.utilityTool = utilityTool;
        this.portsTab = portsTab;
        this.drawer = drawer;

        // Track attached components and cables
        this.attachedComponents = new Set();
        this.attachedCables = new Set();
    
        // Required components and cables
        this.requiredComponents = ['motherboard', 'cpu', 'storage', 'psu', 'ram'];
        this.requiredCables = ['24-pin-power', '8-pin-power', 'sata-power'];
        this.availableUnit = null;

        // Boot reports
        this.reports = [
            { tag: 'Temperature', def: '71 degrees' },
            { tag: 'Wattage', def: '600W / 1200W' }
        ];
        this.reportCount = 0;
    }

    // Collect all attached cables
    getAttachedCables() {
     if (!this.portsTab || typeof this.portsTab.getAttachedCablesStatus !== 'function') {
            console.error('PortsTab or getAttachedCablesStatus method not found');
            return;
        }

        // Refresh attached cables from PortsTab's updated status
        const attachedCablesStatus = this.portsTab.getAttachedCablesStatus();
        this.attachedCables.clear();
        
        for (const cableType in attachedCablesStatus) {
            if (attachedCablesStatus[cableType]) {
                this.attachedCables.add(cableType);  // Only add fully connected cables
            }
        }
    }

    // Add component when attached
    addAttachedComponent(component) {
        this.attachedComponents.add(component.type);
    }

    // Get missing components and cables
    getMissingComponents() {
        // Refresh attached cables status from Drawer
        this.getAttachedCables();

        const missingComponents = this.requiredComponents.filter(
            comp => !this.attachedComponents.has(comp)
        );

        const missingCables = this.requiredCables.filter(
            cable => !this.attachedCables.has(cable)
        );

        return { missingComponents, missingCables };
    }

    // Power on the system with delay-based reporting
    powerOn() {
        const initialDelay = 1200;
        const decreaseFactor = 0.75;

        this.reports.forEach((report, i) => {
            const delay = initialDelay * Math.pow(decreaseFactor, i);
            setTimeout(() => this.createReportCell(report), delay);
        });
    }

    // Create report cell
    createReportCell(report) {
        const cell = document.createElement('div');
        cell.classList = 'reportCell';

        const tag = document.createElement('div');
        tag.classList = 'reportCellTag';
        tag.innerHTML = report.tag;
        cell.appendChild(tag);

        const def = document.createElement('div');
        def.classList = 'reportCellDef';
        def.innerHTML = report.def;
        cell.appendChild(def);

        this.reportArea.appendChild(cell);
    }

    // Clear report area
    clearReportsArea() {
        while (this.reportArea.firstChild) {
            this.reportArea.removeChild(this.reportArea.firstChild);
        }
    }

    // Check if a valid chassis is available
    checkIfAvailableUnit(component) {
        return component && component.type === 'chassis' ? component : null;
    }
}

export default PCUnit;
