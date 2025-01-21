class PCUnit {
    constructor(bootUpElements,) {
        // utilityTool, displayArea, Canvas, portsTab, drawer, assistant
        this.bootUpElements = bootUpElements

        this.power = 'off'
        this.availableUnit = null
        this.screen = bootUpElements.screen || null
        this.isErrorDisplayed = false; 
        this.timeoutIds = []
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

        this.motherboardBrand = {
            aorus:{},
            msi:{},
            evga:{},
            rog:{},
            gigabyte:{},
            asrock:{},
            biostar:{},
        }

        this.bootUpRequirements = ['motherboard', 'cpu', 'ram', 'psu', 'cpuCooling', 'gpu']

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
        // this.troubleshootBtn?.addEventListener('click', () => this.startTroubleshooting());
        // this.closeErrorDialogBtn?.addEventListener('click', () => this.closeErrorDialog());\

        this.errorTypes = []
    }

    attemptPowerOn(unit) {
        // reInitiate Components and their Status
        this.fillComponentStatus(unit)

        // Power Supply Activation
        this.psuActivation()

        // Motherboard and CPU Power Up
        this.moboPowerUp()
        this.cpuInit()

        // Monitor display poweron
        this.powerOnMonitor()

        // Star proces for Power-On-Self-Test
        this.processPOST(this.componentsStatus.psu.component)

        const state = this.checkPCState()
        // if check attempts are good, power on
        if(state)return true
        else return false
    }

    powerOnMonitor(){ // takes everything from displaying the splashscreen to displayingos and shows it inside the div monitorScreen
        this.displaySplashScreen();
    }

    powerOffMonitor(){
        const splashScreen = document.getElementById('monitorScreen');
        if (splashScreen){
          splashScreen.innerHTML = '';
        }

        // Clear all pending timeouts
        this.timeoutIds.forEach(timeoutId => clearTimeout(timeoutId));
        this.timeoutIds = []; // Reset the timeout IDs array
        this.isErrorDisplayed = false; // Reset the error display flag
    }

    getMotherboardName(){ // logic to get motherboard name from component and check for the brandImages for a match
        const motherboardComponent = this.componentsStatus.motherboard;
        if (motherboardComponent && motherboardComponent.component && motherboardComponent.component.name) {
            return motherboardComponent.component.name;
        }
        return '';
    }

    displaySplashScreen(){ // get the component.type.monitor name and check the brand if it hits a brandImages then display the corresponding brand image and after 5 secs remove the img from the div
        if (this.isErrorDisplayed) return;// Skip if error screen is displayed
        const splashScreen = document.getElementById('monitorScreen');
        const brandImages = {
            evga: 'evga.png',
            aorus: 'aorus.png',
            asrock: 'asrock.png',
            rog: 'rog.png',
            biostar: 'biostar.png',
            gigabyte: 'gigabyte.png',
            msi: 'msi.png',
        };

    const motherboardName = this.getMotherboardName(); // Call out function getMotherboardName
    const brand = Object.keys(brandImages).find(brand => motherboardName.toLowerCase().includes(brand)); // Check brandImages const and include lowercases

    if (brand) {
        const imgSrc = `./assets/boot/boot_logo/${brandImages[brand]}`; // get image from filepath
        splashScreen.innerHTML = `<img src="${imgSrc}" alt="${brand} logo">`; // add as html inside div monitorScreen
        const timeoutId = setTimeout(() => {
            if (this.isErrorDisplayed) return; // Skip if error screen is displayed
            splashScreen.innerHTML = ''; // Clear the splash screen after 5 seconds
            this.displayOS(); // Proceed to display the OS
        }, 5000);
        this.timeoutIds.push(timeoutId); // Store the timeout ID
    } else {
         splashScreen.innerHTML = ''; // Clear the splash screen if no matching brand is found
    }
 }
    
    displayOS(){ // display the operating system booting gif from ./assets/boot/os/windows_boot.gif and then show then after another 5 secs display the windows desktop img from ./assets/boot/os/desktop.png
        if (this.isErrorDisplayed) return; //  Skip if error screen is displayed
        const splashScreen = document.getElementById('monitorScreen');
        const osBootGif = './assets/boot/os/windows_boot.gif';
        const osDesktopImg = './assets/boot/os/desktop.png';

        splashScreen.innerHTML = `<img src="${osBootGif}" alt="OS Booting">`;
        const timeoutId = setTimeout(() => {
            if (this.isErrorDisplayed) return; // Skip if error screen is displayed
            splashScreen.innerHTML = `<img src="${osDesktopImg}" alt="OS Desktop">`;
        }, 5000);
        this.timeoutIds.push(timeoutId); // Store the timeout ID
    }

    displayErrorScreen(){
        this.isErrorDisplayed = true; // Indicate that error screen is displayed
        const splashScreen = document.getElementById('monitorScreen');
        splashScreen.innerHTML = ''; // Clear the div before displaying the error screen

        //const errorMessage = `Missing components: ${Array.isArray(missingComponents) ? missingComponents.join(', ') : 'Unknown'}`;        
        const imgSrc = './assets/boot/error_screen/warning3.png';
        splashScreen.innerHTML = `<img src = "${imgSrc}" alt="WARNING">` //add for showing error message<p>${errorMessage}</p>
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
                    isPowered = this.checkChassisPower(this.componentsStatus.motherboard)
            }

            

            if(isPowered) {
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
            // return false
            return this.createError(compStatus.component, 'power')
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
    checkChassisPower(motherboard) {
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
            // console.log("components are powered up, Booting Up")
            return true
        } else {
            console.log('Err...')
            return false
        }
    }

    checkIfAvailableUnit(component) {
        return component && component.type === 'chassis' ? component : null
    }

   // Collect all attached cables from PortsTab
   getAttachedCables() {
 //       // Refresh attached cables from PortsTab's updated status
 //       const attachedCablesStatus = this.portsTab.getAttachedCablesStatus();
 //       this.attachedCables.clear();
 //       
 //       for (const cableType in attachedCablesStatus) {
 //           if (attachedCablesStatus[cableType].fullyConnected) {
 //               this.attachedCables.add(cableType);  // Only add fully connected cables
 //           }
 //       }
 //   
 //       console.log("Attached cables:", Array.from(this.attachedCables));
 //   }
//
//
 //   addAttachedComponent(component) {
 //       this.attachedComponents.add(component.type);
 //   }
//
 //   getMissingComponents() {
 //       this.getAttachedCables();
//
 //       const missingComponents = this.requiredComponents.filter((comp) => !this.attachedComponents.has(comp));
 //       const missingCables = this.requiredCables.filter((cable) => !this.attachedCables.has(cable));
//
 //       return { missingComponents, missingCables };
   }
}

export default PCUnit;