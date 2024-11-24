class PCUnit {
    constructor(utilityTool, displayArea, Canvas, portsTab, drawer, assistant) { 
        this.displayArea = displayArea;
        this.Canvas = Canvas;
        this.utilityTool = utilityTool;
        this.portsTab = portsTab;
        this.drawer = drawer;
        this.assistant = assistant;

        // Track attached components and cables
        this.attachedComponents = new Set();
        this.attachedCables = new Set();
        this.cableConnectionStatus = {}; // Stores each cable’s connection status
    
        // Required components and cables
        this.requiredComponents = ['motherboard', 'cpu', 'storage', 'psu', 'ram'];
        this.requiredCables = ['24-pin-power', '8-pin-power'];
        this.availableUnit = null;

        // Boot error dialog elements
        this.bootErrorDialog = document.getElementById('bootErrorDialog');
        this.errorMessageElement = document.getElementById('errorMessage');
        this.troubleshootBtn = document.getElementById('troubleshootBtn');
        this.closeErrorDialogBtn = document.getElementById('closeErrorDialogBtn');

        // Boot reports
        this.reports = [
            { tag: 'Temperature', def: '71 degrees' },
            { tag: 'Wattage', def: '600W / 1200W' }
        ];
        this.reportCount = 0;

        // Event Listeners
        this.troubleshootBtn.addEventListener('click', () => this.startTroubleshooting());
        this.closeErrorDialogBtn.addEventListener('click', () => this.closeErrorDialog());
    }

    // Generate a random boot error message
    getRandomBootError() {
        const errors = [
            "No bootable device found.",
            "BIOS checksum error.",
            "Memory not detected.",
            "Overheating detected, system halted.",
            "CPU fan not detected."
        ];
        return errors[Math.floor(Math.random() * errors.length)];
    }

    // Display a boot error in the dialog
    showBootErrorDialog() {
        const errorCategories = {
            BIOS: [
                "BIOS checksum error.",
                "Unsupported CPU detected in BIOS.",
                "Invalid BIOS configuration detected."
            ],
            Storage: [
                "No bootable device found.",
                "Storage device error: Unable to access data.",
                "Drive not detected."
            ],
            Overheat: [
                "Overheating detected, system halted.",
                "Fan speed too low.",
                "Thermal paste not applied properly."
            ],
            Power: [
                "CPU fan not detected.",
                "Power supply voltage instability.",
                "PSU insufficient wattage."
            ],
            Memory: [
                "Memory not detected.",
                "RAM compatibility issue.",
                "Memory modules seated incorrectly."
            ],
            "Diagnostic LEDs": [
                "Motherboard LED error detected.",
                "Debug LED indicates CPU fault.",
                "Debug LED indicates RAM issue."
            ],
            GPU: [
                "Graphics card not detected.",
                "Insufficient power to GPU.",
                "GPU overheating."
            ]
        };

        let selectedCategory = "Unknown";
        let errorMessage = this.getRandomBootError(); // generate random error message

        for (const [category, errors] of Object.entries(errorCategories)) {
            if (errors.includes(errorMessage)) {
                selectedCategory = category;
                break;
            }
        }

        this.errorMessageElement.innerText = errorMessage;
        this.errorMessageElement.dataset.errorCategory = selectedCategory; // Assign category
        this.bootErrorDialog.showModal(); // Show the dialog
    }

    // Start the troubleshooting process
    startTroubleshooting() {
        const selectedCategory = this.errorMessageElement.dataset.errorCategory; // Retrieve error category
        const troubleshootingDiv = document.createElement('div');
        troubleshootingDiv.classList.add('troubleshootingDiv');
    
        // Clear previous visualizations, if any
        this.bootErrorDialog.querySelector('.troubleshootingDiv')?.remove();
    
        switch (selectedCategory) {
            case "BIOS":
                this.visualizeBIOSFix(troubleshootingDiv);
                break;
            case "Storage":
                this.visualizeStorageFix(troubleshootingDiv);
                break;
            case "Overheat":
                this.visualizeOverheatFix(troubleshootingDiv);
                break;
            case "Power":
                this.visualizePowerFix(troubleshootingDiv);
                break;
            case "Memory":
                this.visualizeMemoryFix(troubleshootingDiv);
                break;
            case "Diagnostic LEDs":
                this.visualizeLEDIndicators(troubleshootingDiv);
                break;
            case "GPU":
                this.visualizeGPUFix(troubleshootingDiv); 
                break;
            default:
                troubleshootingDiv.innerHTML = `<p>Unknown troubleshooting category. Please check manually.</p>`;
        }
    
        // Add troubleshooting visualization to the dialog
        this.bootErrorDialog.appendChild(troubleshootingDiv);
    }

     // Visualization: BIOS Troubleshooting
     visualizeBIOSFix(container) {
        container.innerHTML = `
            <h3>BIOS Troubleshooting</h3>
            <p>Simulating reset of BIOS settings...</p>
             <div id="storageDiagram" style="position: relative;">
                <img src="./assets/troubleshooting/bios.png" alt="Bios" style="width: 100%;">
                <div style="position: absolute; top: 20%; left: 40%; color: red; font-weight: bold;">Boot Drive</div>
            </div>
            <progress id="biosProgress" value="0" max="100"></progress>
            <p id="biosStatus"></p>
        `;

        const progressBar = container.querySelector('#biosProgress');
        const statusText = container.querySelector('#biosStatus');
        let progress = 0;

        const interval = setInterval(() => {
            progress += 20;
            progressBar.value = progress;

            if (progress === 40) statusText.textContent = "Checking BIOS compatibility...";
            if (progress === 80) statusText.textContent = "Updating BIOS...";

            if (progress >= 100) {
                clearInterval(interval);
                statusText.textContent = "BIOS reset completed successfully.";
            }
        }, 500);
    }

    // Visualization: Storage Troubleshooting
    visualizeStorageFix(container) {
        container.innerHTML = `
            <h3>Storage Troubleshooting</h3>
            <p>Checking boot drive connections...</p>
            <div id="storageDiagram" style="position: relative;">
                <img src="./assets/troubleshooting/storage.png" alt="Storage Diagram" style="width: 100%;">
                <div style="position: absolute; top: 20%; left: 40%; color: red; font-weight: bold;">Boot Drive</div>
            </div>
            <progress id="storageProgress" value="0" max="100"></progress>
            <p id="storageStatus"></p>
        `;

        const progressBar = container.querySelector('#storageProgress');
        const statusText = container.querySelector('#storageStatus');
        let progress = 0;

        const interval = setInterval(() => {
            progress += 25;
            progressBar.value = progress;

            if (progress === 50) statusText.textContent = "Verifying boot order in BIOS...";
            if (progress === 100) {
                clearInterval(interval);
                statusText.textContent = "Storage troubleshooting completed. Boot drive reconnected and verified.";
            }
        }, 400);
    }

    // Visualization: Overheating Troubleshooting
    visualizeOverheatFix(container) {
        container.innerHTML = `
            <h3>Overheating Troubleshooting</h3>
            <p>Simulating cooling system checks...</p>
            <div style="background: red; color: white; padding: 10px;">
                <strong>Heat levels detected!</strong>
                <img src="./assets/troubleshooting/cooling.png" alt="Cooling Diagram" style="width: 70%; border: 1px solid #ddd; height: 30%;">
                <p>Reducing system temperature...</p>
            </div>
            <progress id="overheatProgress" value="0" max="100"></progress>
            <p id="overheatStatus"></p>
        `;

        const progressBar = container.querySelector('#overheatProgress');
        const statusText = container.querySelector('#overheatStatus');
        let progress = 0;

        const interval = setInterval(() => {
            progress += 20;
            progressBar.value = progress;

            if (progress === 60) statusText.textContent = "Fans spinning at max speed...";
            if (progress >= 100) {
                clearInterval(interval);
                statusText.textContent = "Cooling complete. Overheat issue resolved.";
            }
        }, 600);
    }

    // Visualization: Power Troubleshooting
    visualizePowerFix(container) {
        container.innerHTML = `
            <h3>Power Troubleshooting</h3>
            <p>Simulating power supply checks...</p>
            <div style="display: flex; justify-content: center; align-items: center;">
                <img src="./assets/troubleshooting/24-Pin-Power.png" alt="Power Supply Diagram" style="width: 70%; border: 1px solid #ddd; height: 30%;">
                <img src="./assets/troubleshooting/CPU-Power-connectors.png" alt="Power Supply Diagram" style="width: 70%; border: 1px solid #ddd; height: 30%;">

            </div>
            <progress id="powerProgress" value="0" max="100"></progress>
            <p id="powerStatus"></p>
        `;
    
        const progressBar = container.querySelector('#powerProgress');
        const statusText = container.querySelector('#powerStatus');
        let progress = 0;
    
        const interval = setInterval(() => {
            progress += 20;
            progressBar.value = progress;
    
            if (progress === 40) statusText.textContent = "Checking PSU cables and connections...";
            if (progress === 80) statusText.textContent = "Testing PSU stability...";
            if (progress >= 100) {
                clearInterval(interval);
                statusText.textContent = "Power supply checks completed. All connections are stable.";
            }
        }, 500);
    }
    // Visualization: Memory Troubleshooting
    visualizeMemoryFix(container) {
        container.innerHTML = `
            <h3>Memory Troubleshooting</h3>
            <p>Simulating memory module checks...</p>
            <div style="position: relative; text-align: center;">
                <img src="./assets/troubleshooting/memory.png" alt="Memory Slot Diagram" style="width: 70%; border: 1px solid #ddd;">
                <div style="position: absolute; top: 20%; left: 45%; color: red; font-weight: bold;">RAM Slot</div>
            </div>
            <progress id="memoryProgress" value="0" max="100"></progress>
            <p id="memoryStatus"></p>
        `;
    
        const progressBar = container.querySelector('#memoryProgress');
        const statusText = container.querySelector('#memoryStatus');
        let progress = 0;
    
        const interval = setInterval(() => {
            progress += 25;
            progressBar.value = progress;
    
            if (progress === 50) statusText.textContent = "Checking RAM seating and compatibility...";
            if (progress === 100) {
                clearInterval(interval);
                statusText.textContent = "Memory module checks completed. No issues detected.";
            }
        }, 400);
    }
    // Visualization: GPU Troubleshooting
    visualizeGPUFix(container) {
        container.innerHTML = `
            <h3>GPU Troubleshooting</h3>
            <p>Simulating GPU diagnostics...</p>
            <div style="position: relative; text-align: center;">
                <img src="./assets/troubleshooting/gpu.png" alt="GPU Troubleshooting Diagram" style="width: 70%; border: 1px solid #ddd;">
                <div style="position: absolute; top: 20%; left: 45%; color: red; font-weight: bold;">GPU Slot</div>
            </div>
            <progress id="gpuProgress" value="0" max="100"></progress>
            <p id="gpuStatus"></p>
        `;

        const progressBar = container.querySelector('#gpuProgress');
        const statusText = container.querySelector('#gpuStatus');
        let progress = 0;

        const interval = setInterval(() => {
            progress += 25;
            progressBar.value = progress;

            if (progress === 50) statusText.textContent = "Checking power cables and connections...";
            if (progress === 100) {
                clearInterval(interval);
                statusText.textContent = "GPU diagnostics completed. No issues detected.";
            }
        }, 400);
    }

    // Add more visualization of troubleshooting

    // Close the boot error dialog
    closeErrorDialog() {
        this.bootErrorDialog.close();
    }

    // Create troubleshooting step cell
    createTroubleshootingStep(step) {
        const cell = document.createElement('div');
        cell.classList = 'troubleshootingStepCell';
        cell.innerHTML = step;
        this.reportArea.appendChild(cell);
    }

    // Collect all attached cables from PortsTab
    getAttachedCables() {
        if (!this.portsTab || typeof this.portsTab.getAttachedCablesStatus !== 'function') {
            console.error('PortsTab or getAttachedCablesStatus method not found');
            return;
        }
    
        // Refresh attached cables from PortsTab's updated status
        const attachedCablesStatus = this.portsTab.getAttachedCablesStatus();
        this.attachedCables.clear();
        
        for (const cableType in attachedCablesStatus) {
            if (attachedCablesStatus[cableType].fullyConnected) {
                this.attachedCables.add(cableType);  // Only add fully connected cables
            }
        }
    
        console.log("Attached cables:", Array.from(this.attachedCables));
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
