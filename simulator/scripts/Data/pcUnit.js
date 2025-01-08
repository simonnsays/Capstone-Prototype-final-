class PCUnit {
    constructor(bootUpElements, ) {
        // utilityTool, displayArea, Canvas, portsTab, drawer, assistant
        this.bootUpElements = bootUpElements

        this.power = 'off'
        this.availableUnit = null
        this.reportArea = bootUpElements.reportArea || null
        this.screen = bootUpElements.screen || null

        // CHECKLIST:
        // - if components are complete (status)
        // - if components are compatible (compatibility)
        // - if components are working fine (defect)


        this.componentsStatus = {
            motherboard: {},
            cpu: {},
            ram: [],
            gpu: {},
            psu: {},
            storage: [],
            cpuCooling: {},
            caseCooling: []
        }

        this.bootUpRequirements = ['motherboard', 'cpu', 'ram', 'psu', 'cpuCooling', 'gpu']

        this.unitStatus = {
            PSU_TO_MOTHERBOARD: {
                compatibility: null,
                error: null
            },
            PSU_TO_CPU: {
                compatibility: null,
                error: null
            }
            // more status
        }

        this.state = ['off','on']
        this.currentState = this.state[0]

        this.reports = [
            {
                tag: 'Temperature',
                def: '71 degrees',
            },
            {
                tag: 'Wattage',
                def: '600W / 1200W',
            },
        ];
        this.reportCount = 0;

        // Boot error dialog elements
        this.bootErrorDialog = document.getElementById('bootErrorDialog');
        this.errorMessageElement = document.getElementById('errorMessage');
        this.troubleshootBtn = document.getElementById('troubleshootBtn');
        this.closeErrorDialogBtn = document.getElementById('closeErrorDialogBtn');

        // Event Listeners
        this.troubleshootBtn?.addEventListener('click', () => this.startTroubleshooting());
        this.closeErrorDialogBtn?.addEventListener('click', () => this.closeErrorDialog());
    }

    attemptPowerOn(unit) {
        // reInitiate Components and their Status
        this.fillComponentStatus(unit)

        // Power Supply Activation
        this.psuActivation()

        // Motherboard and CPU Power Up
        this.moboPowerUp()
        this.cpuInit()

        // Star proces for Power-On-Self-Test
        this.processPOST(this.componentsStatus.psu.component)

        const state = this.checkPCState()
        // if check attempts are good, power on
        this.powerOn()
    }

    fillComponentStatus(component) {
        let compStatus  = {
            component: component,
            isPowered: false

        }
        switch(component.type) {
            case 'ram':
                this.componentsStatus.ram.push(compStatus);
                break
            case 'storage':
                this.componentsStatus.storage.push(compStatus)
                break
            case 'cooling':
                if(component.specs.category === 'cpu') this.componentsStatus.cpuCooling = compStatus
                if(component.specs.category === 'chassis') this.componentsStatus.caseCooling = compStatus
                break
            default:
                this.componentsStatus[component.type] = compStatus
        }
    
        // Recursively check slots for attached components
        component.slots.forEach(slot => {
            if (slot.component) {
                this.fillComponentStatus(slot.component)
            }
        })    
    }

    psuActivation() {
        // Power the powersuplly
        this.componentsStatus.psu.isPowered = true
    }

    moboPowerUp() {
        const moboPort = this.componentsStatus.motherboard.component.ports.find(port => 
            port.offsets && port.offsets.find(offset => offset.takes == '24-pin-power')).offsets[0]
        const psuPort = this.componentsStatus.psu.component.ports.find(port => 
            port.offsets && port.offsets.find(offset => offset.takes == '24-pin-power')).offsets[0]

        if(moboPort.cableAttached === psuPort.cableAttached){
            this.componentsStatus.motherboard.isPowered = true
            // console.log('Motherboard Powered')
        } 
    }
    cpuInit() {
        // power if motherboard is powered and ports attached are of the same cable
        if(!this.componentsStatus.motherboard.isPowered) {
            // log or record some error relating to unpowered motherboard
            return
        }
        const cpuPorts = this.componentsStatus.motherboard.component.ports.filter(port => port.offsets && port.offsets.some(offset => offset.takes == '8-pin-power'))
        const psuPorts = this.componentsStatus.psu.component.ports.filter(port => port.offsets && port.offsets.some(offset => offset.takes == '8-pin-power'))
        let isFullyPowered = true

        psuPorts.forEach(psuPort => {
            psuPort.offsets.forEach(psuOffset => {
                // for each [psuOffset], update power information based on its [.cableAttached] and [cpuPort]'s [.cableAttached]
                cpuPorts.forEach(cpuPort => {
                    if(!cpuPort.offsets.find(cpuOffset => cpuOffset.cableAttached === psuOffset.cableAttached)) {
                        isFullyPowered = false
                    }
                })
            })
        })

        if(!isFullyPowered) {
            // log some error about some cables not powering
            return
        }

        this.componentsStatus.cpu.isPowered = true
        // console.log('CPU powered')
    }

    processPOST(supply) {
        // find ports that has cables
        const portsToPower = supply.ports.filter(port =>  port.offsets && port.offsets.some(offset => offset.cableAttached))
    
        // console.log(this.componentsStatus)
        Object.keys(this.componentsStatus).forEach(csKey => {
            const compStatus = this.componentsStatus[csKey]
            let isPowered = false
            switch(csKey) {
            // MOTHERBOARD and CPU
                case 'motherboard':
                    isPowered = compStatus.isPowered
                case 'cpu':
                    isPowered = compStatus.isPowered
                    break
            // RAM    
                case 'ram':
                    if(this.componentsStatus.motherboard.isPowered && this.componentsStatus.cpu.isPowered) {
                        compStatus.forEach(ram => ram.isPowered = true) 
                        isPowered = true
                    }
                    break
            // GPU  
                case 'gpu':
                    isPowered = this.checkGpuPower(compStatus, portsToPower)
                    break
            // STORAGE
                case 'storage':
                    isPowered = this.checkStoragePower(compStatus, portsToPower)
                    break
            // CPU COOLING
                case 'cpuCooling':
                    isPowered = this.checkCpuCoolingPower(compStatus, this.componentsStatus.motherboard)
                    break
            // CHASSIS
                case 'chassis': 
                    isPowered = this.checkChassisPower(compStatus, this.componentsStatus.motherboard)
            }

            

            if(isPowered ) {
                // console.log(csKey + ' is powered')
                Array.isArray(compStatus) 
                ? compStatus.forEach(comp => comp.isPowered = true)
                : compStatus.isPowered = true
            } 
        })
        // console.log(this.componentsStatus)
    }
    checkGpuPower(compStatus, psuPorts) {
        // Gather PSU and GPU ports
        const gpuPorts = compStatus.component.ports.filter(port => port.offsets && port.offsets.some(offset => offset.takes == '8-pin-pcie'))
        psuPorts = psuPorts.filter(port => port.offsets && port.offsets.some(offset => offset.takes == '8-pin-pcie'))
        let isPowered = true

        psuPorts.forEach(psuPort => {
            psuPort.offsets.forEach(psuOffset => {
                // check if cableAttached is correctly attached to each components
                gpuPorts.forEach(gpuPort => {
                    if(!gpuPort.offsets.find(gpuOffset => gpuOffset.cableAttached === psuOffset.cableAttached)) {
                        isPowered = false
                    }
                })
            })
        })

        if(!isPowered) {
            // log some error about some cables not powering
            return false
        }

        // console.log('GPU powered')
        return true 
    }
    checkStoragePower(compStatus, psuPorts) {
        let storagePorts = []
        // filter out so that it is just the ports
        compStatus.forEach(storage => {
            storage.component.ports.forEach(romPort => {
                storagePorts.push(romPort)
            })
        })
        // iterate through the ports to check
        storagePorts.forEach(romPort => {
            romPort.offsets.forEach(romOffset => {
                psuPorts.forEach(psuPort => {
                    if(!psuPort.offsets.some(offset => offset.cableAttached === romOffset.cableAttached)) {
                        return false
                    }   
                })
            })
        })

        return true
    }
    checkCpuCoolingPower(compStatus, motherboard){
        if(!motherboard.isPowered) return false
        const moboPorts = motherboard.component.ports.filter(port => port.type === 'cooling')

        // console.log(compStatus)
        compStatus.component.ports.forEach(coolPort => {
            coolPort.offsets.forEach(coolOffset => {
                moboPorts.forEach(moboPort => {
                    if(!moboPort.offsets.some(moboOffset => moboOffset.cableAttached === coolOffset.cableAttached)) {
                        return false
                    }
                })
            })
        })
        return true
    }
    checkChassisPower(compStatus, motherboard) {
        const chassisCable = motherboard.component.ports.find(port => port.type === 'frontPanel').offsets[0].cableAttached
        if(chassisCable.ends.chassis.connected) return true
        return false
    }

    // Main check for allowing the PC unit to boot (check defects and compatibility here)
    checkPCState() {
        let allowBoot = false
        let stateIsAllowed = Object.values(this.componentsStatus).every(compStat => {
            // console.log(compStat)
            if(!Array.isArray(compStat)) {

                return compStat.isPowered
                // return compStat.every(comp => comp.isPowered)
            } else {
                return compStat.every(comp => {
                    // console.log(comp.isPowered)
                    return comp.isPowered
                })
            }
        })
        // other checks here
        // ..
        
        if(stateIsAllowed === true) {
            console.log("components are powered up, Booting Up")
        } else {
            console.log('Err...')
        }
    }

    powerOn() {
        this.power = 'on'

        this.screen?.classList.add('screen-on')

        setTimeout(() => this.report(), 500)
        // console.log(this.componentsStatus)
    }

    powerOff() {
        this.power = 'off'
        this.screen?.classList.remove('screen-on')
        this.clearReportsArea()

        for(let key in this.componentsStatus) {
            if(Array.isArray(this.componentsStatus[key])) {
                this.componentsStatus[key] = []
            } else {
                this.componentsStatus[key] = null
            }
        }
    }

    report() {
        const initialDelay = 1200
        const decreaseFactor = 0.75

        this.reports.forEach((report, i) => {
            const delay = initialDelay * Math.pow(decreaseFactor, i)
            setTimeout(() => this.createReportCell(report), delay)
        });
    }

    createReportCell(report) {
        const cell = document.createElement('div')
        cell.classList = 'reportCell'

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

    checkIfAvailableUnit(component) {
        return component && component.type === 'chassis' ? component : null
    }
    
    // Generate a random boot error message
    getRandomBootError() {
        // const errors = [
        //     "No bootable device found.",
        //     "BIOS checksum error.",
        //     "Memory not detected.",
        //     "Overheating detected, system halted.",
        //     "CPU fan not detected."
        // ];
        // return errors[Math.floor(Math.random() * errors.length)];
    }

    // Display a boot error in the dialog
    showBootErrorDialog() {
    //     const errorCategories = {
    //         BIOS: [
    //             "BIOS checksum error.",
    //             "Unsupported CPU detected in BIOS.",
    //             "Invalid BIOS configuration detected."
    //         ],
    //         Storage: [
    //             "No bootable device found.",
    //             "Storage device error: Unable to access data.",
    //             "Drive not detected."
    //         ],
    //         Overheat: [
    //             "Overheating detected, system halted.",
    //             "Fan speed too low.",
    //             "Thermal paste not applied properly."
    //         ],
    //         Power: [
    //             "CPU fan not detected.",
    //             "Power supply voltage instability.",
    //             "PSU insufficient wattage."
    //         ],
    //         Memory: [
    //             "Memory not detected.",
    //             "RAM compatibility issue.",
    //             "Memory modules seated incorrectly."
    //         ],
    //         "Diagnostic LEDs": [
    //             "Motherboard LED error detected.",
    //             "Debug LED indicates CPU fault.",
    //             "Debug LED indicates RAM issue."
    //         ],
    //         GPU: [
    //             "Graphics card not detected.",
    //             "Insufficient power to GPU.",
    //             "GPU overheating."
    //         ]
    //     };

    //     let selectedCategory = "Unknown";
    //     let errorMessage = this.getRandomBootError(); // generate random error message

    //     for (const [category, errors] of Object.entries(errorCategories)) {
    //         if (errors.includes(errorMessage)) {
    //             selectedCategory = category;
    //             break;
    //         }
    //     }

    //     this.errorMessageElement.innerText = errorMessage;
    //     this.errorMessageElement.dataset.errorCategory = selectedCategory; // Assign category
    //     this.bootErrorDialog.showModal(); // Show the dialog
    }

    // Start the troubleshooting process
    startTroubleshooting() {
        // const selectedCategory = this.errorMessageElement.dataset.errorCategory; // Retrieve error category
        // const troubleshootingDiv = document.createElement('div');
        // troubleshootingDiv.classList.add('troubleshootingDiv');
    
        // // Clear previous visualizations, if any
        // this.bootErrorDialog.querySelector('.troubleshootingDiv')?.remove();
    
        // switch (selectedCategory) {
        //     case "BIOS":
        //         this.visualizeBIOSFix(troubleshootingDiv);
        //         break;
        //     case "Storage":
        //         this.visualizeStorageFix(troubleshootingDiv);
        //         break;
        //     case "Overheat":
        //         this.visualizeOverheatFix(troubleshootingDiv);
        //         break;
        //     case "Power":
        //         this.visualizePowerFix(troubleshootingDiv);
        //         break;
        //     case "Memory":
        //         this.visualizeMemoryFix(troubleshootingDiv);
        //         break;
        //     case "Diagnostic LEDs":
        //         this.visualizeLEDIndicators(troubleshootingDiv);
        //         break;
        //     case "GPU":
        //         this.visualizeGPUFix(troubleshootingDiv); 
        //         break;
        //     default:
        //         troubleshootingDiv.innerHTML = `<p>Unknown troubleshooting category. Please check manually.</p>`;
        // }
    
        // // Add troubleshooting visualization to the dialog
        // this.bootErrorDialog.appendChild(troubleshootingDiv);
    }

     // Visualization: BIOS Troubleshooting
     visualizeBIOSFix(container) {
    //     container.innerHTML = `
    //         <h3>BIOS Troubleshooting</h3>
    //         <p>Simulating reset of BIOS settings...</p>
    //          <div id="storageDiagram" style="position: relative;">
    //             <img src="./assets/troubleshooting/bios.png" alt="Bios" style="width: 100%;">
    //             <div style="position: absolute; top: 20%; left: 40%; color: red; font-weight: bold;">Boot Drive</div>
    //         </div>
    //         <progress id="biosProgress" value="0" max="100"></progress>
    //         <p id="biosStatus"></p>
    //     `;

    //     const progressBar = container.querySelector('#biosProgress');
    //     const statusText = container.querySelector('#biosStatus');
    //     let progress = 0;

    //     const interval = setInterval(() => {
    //         progress += 20;
    //         progressBar.value = progress;

    //         if (progress === 40) statusText.textContent = "Checking BIOS compatibility...";
    //         if (progress === 80) statusText.textContent = "Updating BIOS...";

    //         if (progress >= 100) {
    //             clearInterval(interval);
    //             statusText.textContent = "BIOS reset completed successfully.";
    //         }
    //     }, 500);
    // }

    // // Visualization: Storage Troubleshooting
    // visualizeStorageFix(container) {
    //     container.innerHTML = `
    //         <h3>Storage Troubleshooting</h3>
    //         <p>Checking boot drive connections...</p>
    //         <div id="storageDiagram" style="position: relative;">
    //             <img src="./assets/troubleshooting/storage.png" alt="Storage Diagram" style="width: 100%;">
    //             <div style="position: absolute; top: 20%; left: 40%; color: red; font-weight: bold;">Boot Drive</div>
    //         </div>
    //         <progress id="storageProgress" value="0" max="100"></progress>
    //         <p id="storageStatus"></p>
    //     `;

    //     const progressBar = container.querySelector('#storageProgress');
    //     const statusText = container.querySelector('#storageStatus');
    //     let progress = 0;

    //     const interval = setInterval(() => {
    //         progress += 25;
    //         progressBar.value = progress;

    //         if (progress === 50) statusText.textContent = "Verifying boot order in BIOS...";
    //         if (progress === 100) {
    //             clearInterval(interval);
    //             statusText.textContent = "Storage troubleshooting completed. Boot drive reconnected and verified.";
    //         }
    //     }, 400);
    // }

    // // Visualization: Overheating Troubleshooting
    // visualizeOverheatFix(container) {
    //     container.innerHTML = `
    //         <h3>Overheating Troubleshooting</h3>
    //         <p>Simulating cooling system checks...</p>
    //         <div style="background: red; color: white; padding: 10px;">
    //             <strong>Heat levels detected!</strong>
    //             <img src="./assets/troubleshooting/cooling.png" alt="Cooling Diagram" style="width: 70%; border: 1px solid #ddd; height: 30%;">
    //             <p>Reducing system temperature...</p>
    //         </div>
    //         <progress id="overheatProgress" value="0" max="100"></progress>
    //         <p id="overheatStatus"></p>
    //     `;

    //     const progressBar = container.querySelector('#overheatProgress');
    //     const statusText = container.querySelector('#overheatStatus');
    //     let progress = 0;

    //     const interval = setInterval(() => {
    //         progress += 20;
    //         progressBar.value = progress;

    //         if (progress === 60) statusText.textContent = "Fans spinning at max speed...";
    //         if (progress >= 100) {
    //             clearInterval(interval);
    //             statusText.textContent = "Cooling complete. Overheat issue resolved.";
    //         }
    //     }, 600);
    }

    // Visualization: Power Troubleshooting
    visualizePowerFix(container) {
        // container.innerHTML = `
        //     <h3>Power Troubleshooting</h3>
        //     <p>Simulating power supply checks...</p>
        //     <div style="display: flex; justify-content: center; align-items: center;">
        //         <img src="./assets/troubleshooting/24-Pin-Power.png" alt="Power Supply Diagram" style="width: 70%; border: 1px solid #ddd; height: 30%;">
        //         <img src="./assets/troubleshooting/CPU-Power-connectors.png" alt="Power Supply Diagram" style="width: 70%; border: 1px solid #ddd; height: 30%;">

        //     </div>
        //     <progress id="powerProgress" value="0" max="100"></progress>
        //     <p id="powerStatus"></p>
        // `;
    
        // const progressBar = container.querySelector('#powerProgress');
        // const statusText = container.querySelector('#powerStatus');
        // let progress = 0;
    
        // const interval = setInterval(() => {
        //     progress += 20;
        //     progressBar.value = progress;
    
        //     if (progress === 40) statusText.textContent = "Checking PSU cables and connections...";
        //     if (progress === 80) statusText.textContent = "Testing PSU stability...";
        //     if (progress >= 100) {
        //         clearInterval(interval);
        //         statusText.textContent = "Power supply checks completed. All connections are stable.";
        //     }
        // }, 500);
    }

    // Visualization: Memory Troubleshooting
    visualizeMemoryFix(container) {
        // container.innerHTML = `
        //     <h3>Memory Troubleshooting</h3>
        //     <p>Simulating memory module checks...</p>
        //     <div style="position: relative; text-align: center;">
        //         <img src="./assets/troubleshooting/memory.png" alt="Memory Slot Diagram" style="width: 70%; border: 1px solid #ddd;">
        //         <div style="position: absolute; top: 20%; left: 45%; color: red; font-weight: bold;">RAM Slot</div>
        //     </div>
        //     <progress id="memoryProgress" value="0" max="100"></progress>
        //     <p id="memoryStatus"></p>
        // `;
    
        // const progressBar = container.querySelector('#memoryProgress');
        // const statusText = container.querySelector('#memoryStatus');
        // let progress = 0;
    
        // const interval = setInterval(() => {
        //     progress += 25;
        //     progressBar.value = progress;
    
        //     if (progress === 50) statusText.textContent = "Checking RAM seating and compatibility...";
        //     if (progress === 100) {
        //         clearInterval(interval);
        //         statusText.textContent = "Memory module checks completed. No issues detected.";
        //     }
        // }, 400);
    }

    // Visualization: GPU Troubleshooting
    visualizeGPUFix(container) {
        // container.innerHTML = `
        //     <h3>GPU Troubleshooting</h3>
        //     <p>Simulating GPU diagnostics...</p>
        //     <div style="position: relative; text-align: center;">
        //         <img src="./assets/troubleshooting/gpu.png" alt="GPU Troubleshooting Diagram" style="width: 70%; border: 1px solid #ddd;">
        //         <div style="position: absolute; top: 20%; left: 45%; color: red; font-weight: bold;">GPU Slot</div>
        //     </div>
        //     <progress id="gpuProgress" value="0" max="100"></progress>
        //     <p id="gpuStatus"></p>
        // `;

        // const progressBar = container.querySelector('#gpuProgress');
        // const statusText = container.querySelector('#gpuStatus');
        // let progress = 0;

        // const interval = setInterval(() => {
        //     progress += 25;
        //     progressBar.value = progress;

        //     if (progress === 50) statusText.textContent = "Checking power cables and connections...";
        //     if (progress === 100) {
        //         clearInterval(interval);
        //         statusText.textContent = "GPU diagnostics completed. No issues detected.";
        //     }
        // }, 400);
    }// Add more visualization of troubleshooting

    // Close the boot error dialog
    closeErrorDialog() {
        // this.bootErrorDialog.close();
    }

    // Create troubleshooting step cell
    createTroubleshootingStep(step) {
        // const cell = document.createElement('div');
        // cell.classList = 'troubleshootingStepCell';
        // cell.innerHTML = step;
        // this.reportArea.appendChild(cell);
    }

//    // Collect all attached cables from PortsTab
//    getAttachedCables() {
//        // Refresh attached cables from PortsTab's updated status
//        const attachedCablesStatus = this.portsTab.getAttachedCablesStatus();
//        this.attachedCables.clear();
//        
//        for (const cableType in attachedCablesStatus) {
//            if (attachedCablesStatus[cableType].fullyConnected) {
//                this.attachedCables.add(cableType);  // Only add fully connected cables
//            }
//        }
//    
//        console.log("Attached cables:", Array.from(this.attachedCables));
//    }
//
//
//    addAttachedComponent(component) {
//        this.attachedComponents.add(component.type);
//    }
//
//    getMissingComponents() {
//        this.getAttachedCables();
//
//        const missingComponents = this.requiredComponents.filter((comp) => !this.attachedComponents.has(comp));
//        const missingCables = this.requiredCables.filter((cable) => !this.attachedCables.has(cable));
//
//        return { missingComponents, missingCables };
//    }
}

export default PCUnit;