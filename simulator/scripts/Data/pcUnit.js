import errorCodes from "../Data/errorCodes.js"
import BootUpTab from "../Tabs/bootUpTab.js"
import Bios from "../Data/bios.js"
class PCUnit {
    constructor(bootUpElements,assistant) {
        // utilityTool, displayArea, Canvas, portsTab, drawer, assistant
        this.bootUpElements = bootUpElements
        this.assistant = assistant
        this.power = 'off'
        this.availableUnit = null
        this.screen = bootUpElements.screen || null
        this.isErrorDisplayed = false; 
        this.timeoutIds = []
        this.bios = null
        // CHECKLIST:
        // - if components are complete (status)
        // - if components are compatible (compatibility)
        // - if components are working fine (defect)

        /////////////////////////// dan code ///////////////////////////
        this.reports = []
        this.currentErrorCode = null
        /////////////////////////// dan code ///////////////////////////

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
        this.bootStatus = false
        
        this.reportCount = 0;
        this.bootSequence = [
            () => this.psuTest(),
            () => this.powerComponents(), 
            () => this.motherboardTest(),
            () => this.cpuTest(),
            () => this.memoryTest(),
            () => this.storageDeviceTest(),
            () => this.graphicsCardTest(),
            () => this.fanAndCoolingTest(),
            () => this.bootDeviceSelection(),
            () => this.osBootUp()
        ]

        // Event Listeners
        // this.troubleshootBtn?.addEventListener('click', () => this.startTroubleshooting());
        // this.closeErrorDialogBtn?.addEventListener('click', () => this.closeErrorDialog());

        this.errorTypes = []

    }
    setBios(bios) {
        this.bios = bios
    }
    attemptPowerOn(unit) {
        let bootStatus = true
        let errorQueue = [] // now store errors inside an array to show inside reports area
        
        // Inittiate / Reinitiate Components and their Status
        this.fillComponentStatus(unit)

        // POST Process
        for (let i = 0; i < this.bootSequence.length; i++) {
            let sequence = this.bootSequence[i] // Get function reference
            
            // Call the function: will only return either true if successful, else an error code 
            let result = sequence()
    
            // immediately return if an error is found
            if (result != true) { 
                errorQueue.push(result)
            }
        }

        // Makes the error have a queue making reports show more errors. Errors prioritise missing components then not powered next in priority.
        if (errorQueue.length > 0) {
            errorQueue.forEach(errorCode => { // Take all error codes and display each inside create error function as error cells which then populate errors will take and show inside assistant
                this.createError(errorCode)
                this.populateErrors()
                bootStatus = false
            });
            this.bootStatus = false
            return false; 
        }

        // if all checks are successful
        this.reports.push({
            tag: 'Success',
            def: 'System Booted Successfully',
        })

        // Monitor display poweron
        this.powerOnMonitor()
        this.bootStatus = true
        return true
    }
   
    // Add error-cells into assistant tab errors view
    populateErrors() {
        const errorContainer = document.querySelector('#errorsContainer')
        //console.log(errorContainer)
        // Remove first test error 1 before populating error-container with errors 
        const defaultError = errorContainer?.querySelector('.error-cell[data-error-action="error1"]')
        if (defaultError) {
            defaultError.remove()
        }

        // Get the current error code from pcUnit
        const errorCode = this.currentErrorCode
        if (errorCode) {
        const errorData = errorCodes[errorCode]
        
        // Prevent duplicate errorcode showing inside error-container
        let existingErrorCell = errorContainer.querySelector(`.error-cell[data-error-action="${errorCode}"]`)
        if (existingErrorCell) {
            return 
        }

            const errorCell = document.createElement('div')
            errorCell.classList.add('error-cell')
            errorCell.setAttribute('data-error-action', errorCode)
            errorCell.innerHTML = ` 
                <div class="error-icon-row">
                    <span class="error-icon">${this.getSeverityIcon(errorData.severity)}</span>
                    <div class="error-details">
                      <span class="error-title">${errorData.description}</span>
                      <span class="error-code">${errorCode}</span>
                      <span class="error-severity">${errorData.severity}</span>
                    </div>
                </div>
            `;

            // Add click event listener to the error cell
            errorCell.addEventListener('click', () => {            
                // Expand the clicked error to show troubleshooting
                this.expandErrorCell(errorCell, errorData)
            })
            
            // Append the new errorCell to the assistant container
            errorContainer.appendChild(errorCell)
        }
    } 

    // Helper methods
    getSeverityIcon(severity) {
       const icons = {
           Critical: '❗', // Hard Drive Failure, CPU Overheating, BIOS Corruption, Power Failure
           Hazard: '⚠️', // High Temperatures, Power Surge, Fan Speed Abnormal
           Error: '❌', // GPU Failure, No Boot Device Found, Memory Error, Missing Component
       };
       return icons[severity] || "❓"
    }

    expandErrorCell(errorCell, errorData) {
        const existingguide= errorCell.querySelector('.troubleshooting-guide')
        if (existingguide) {
           return
        }

        // Toggle the expanded class
        errorCell.classList.toggle('expanded');

        // Add in-depth troubleshooting guide
        if (errorCell.classList.contains('expanded')) {
            const troubleshootingGuide = document.createElement('div')
            troubleshootingGuide.classList.add('troubleshooting-guide')
    
            // Carousel container
            const carouselContainer = document.createElement('div')
            carouselContainer.classList.add('troubleshooting-carousel')
    
            // State: Track currently active image
            let activeIndex = 0
    
            // Image container (holds all images)
            const imageContainer = document.createElement('div')
            imageContainer.classList.add('troubleshooting-images')
    
            // Create images dynamically
            errorData.troubleshooting.forEach((item, index) => {
                const img = document.createElement('img')
                img.src = item.imageSrc
                img.alt = "Troubleshooting Step"
                img.classList.add('troubleshooting-img')
                if (index !== 0) img.style.display = "none" // Hide all except first
                imageContainer.appendChild(img)
            })
    
            // Left Arrow
            const arrowLeft = document.createElement('img')
            arrowLeft.src = './assets/svg/leftArr.svg'
            arrowLeft.classList.add('desc-left')
            arrowLeft.addEventListener('click', () => {
                if (activeIndex > 0) {
                    activeIndex--
                    updateCarousel()
                }
            })
    
            // Right Arrow
            const arrowRight = document.createElement('img')
            arrowRight.src = './assets/svg/rightArr.svg'
            arrowRight.classList.add('desc-right')
            arrowRight.addEventListener('click', () => {
                if (activeIndex < errorData.troubleshooting.length - 1) {
                    activeIndex++
                    updateCarousel()
                }
            })
    
            // Update Carousel View
            function updateCarousel() {
                const images = imageContainer.querySelectorAll('.troubleshooting-img')
                images.forEach((img, index) => {
                    img.style.display = index === activeIndex ? "block" : "none"
                })
            }
    
            // Add elements to carousel
            carouselContainer.appendChild(arrowLeft)
            carouselContainer.appendChild(imageContainer)
            carouselContainer.appendChild(arrowRight)
    
            // Add to troubleshooting guide
            troubleshootingGuide.innerHTML =
                `<div class="vert-br"></div>
                <h3>Troubleshooting Guide</h3>
                <h4>Please refer to the images for reference</h4>
                `
            troubleshootingGuide.appendChild(carouselContainer)
            
            // Status message
            const statusMsg = document.createElement('div')
            statusMsg.classList.add('troubleshoot-status')
            statusMsg.style.fontWeight = "500"
            troubleshootingGuide.appendChild(statusMsg)
                        
            // Finish button
            const etComplete = document.createElement('button')
            etComplete.classList.add('etComplete')
            etComplete.textContent = "Finish Troubleshooting"
            troubleshootingGuide.appendChild(etComplete);
            errorCell.appendChild(troubleshootingGuide);

            // Initial carousel update
            updateCarousel();
    
            // Map error codes to test functions
            const errorTest = {
                'ERR-100': () => this.psuTest(),
                'ERR-200': () => this.motherboardTest(),
                'ERR-201': () => this.motherboardTest(),
                'ERR-202': () => this.motherboardTest(),
                'ERR-300': () => this.cpuTest(),
                'ERR-301': () => this.cpuTest(),
                'ERR-400': () => this.memoryTest(),
                'ERR-500': () => this.storageDeviceTest(),
                'ERR-501': () => this.storageDeviceTest(),
                'ERR-502': () => this.osBootUp(),
                'ERR-503': () => this.osBootUp(),
                'ERR-600': () => this.graphicsCardTest(),
                'ERR-601': () => this.graphicsCardTest(),
                'ERR-700': () => this.fanAndCoolingTest(),
                'ERR-701': () => this.fanAndCoolingTest(),
                'HZD-100': () => this.fanAndCoolingTest(),
                'HZD-200': () => this.fanAndCoolingTest(),
                'HZD-201': () => this.fanAndCoolingTest(),
                'HZD-300': () => this.graphicsCardTest(),
                'CRT-01': () => this.psuTest(),
                'CRT-02': () => this.motherboardTest(),
                'CRT-03': () => this.cpuTest(),
                'CRT-04': () => this.memoryTest(),
                'CRT-05': () => this.storageDeviceTest(),
                'CRT-06': () => this.graphicsCardTest(),
                'CRT-07': () => this.osBootUp(),
            };

           // On finish, check if error is resolved
           etComplete.addEventListener('click', () => {
            const testFn = errorTest[errorData.code];
            if (!testFn) {
                statusMsg.textContent = "Cannot verify fix for this error.";
                return;
            }
            const result = testFn.call(this);
            if (result === true) {
                errorCell.classList.add('etask-complete');
                statusMsg.textContent = "Issue resolved!";
            } else {
                statusMsg.textContent = "The issue is not yet fixed. Please check your hardware and try again.";
            }
        });
        }
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
       
        splashScreen.innerHTML = `<p id="warning"><img src = "${imgSrc}" alt="WARNING"></p>` //add for showing error message<p>${errorMessage}</p> 
    }

    createError(code) {
        const codeDetails = errorCodes[code];
        const err = {
            type: 'error',
            tag: codeDetails.severity,
            def: codeDetails.description,
            code: code // Store the error code
        };
        this.reports.push(err);
        this.currentErrorCode = code;
    }

    ///////////////////////////////////////////////// dan code ////////////////////////////////////////////////////////
    fillComponentStatus(component) {
        let compStatus  = {
            component: component,
            isPowered: false,
            isSeated: false,

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

    powerComponents() {
        // Check if PSU component is available
        if (!this.componentsStatus.psu?.component) {
            return true; 
        }
        
        // find ports that connects from the PSU
        const portsToGivePower = this.componentsStatus.psu.component.ports.filter(port =>  port.offsets && port.offsets.some(offset => offset.cableAttached))

        // Follow the cables to find the components to power
        const cablesToFollow = []
        portsToGivePower.forEach(port => {
            port.offsets.forEach(offset => {
                cablesToFollow.push(offset.cableAttached)
            })
        })

        // Power the components
        const cableAndComponentMatched = (component, cable) => {
            return component.ports.some(port => 
                port.offsets.some(offset => offset.cableAttached === cable)
            ) 
        }

        cablesToFollow.forEach(cable => {
            const endLabel = Object.keys(cable.ends).find(end => end !== 'psu')
            const componentStatusToPower = this.componentsStatus[endLabel]

            if(!endLabel || !componentStatusToPower) return

            // Array Powering (storage, ram)
            if(Array.isArray(componentStatusToPower)) {  
                componentStatusToPower.forEach(compStat => {
                    if(cableAndComponentMatched(compStat.component, cable)) {
                        compStat.isPowered = true
                    }     
                })
                return
            }   

            // CPU Powering
            if(cableAndComponentMatched(componentStatusToPower.component, cable) 
                && cable.name === 'CPU Connector' 
                && endLabel === 'motherboard' 
                && this.componentsStatus.cpu) {       
                    this.componentsStatus.cpu.isPowered = true
                    return
            } 
            
            // Single Component Powering
            if(cableAndComponentMatched(componentStatusToPower.component, cable)) {
                componentStatusToPower.isPowered = true
            }      
        })


        // Find remaining unpowered components connected from the Motherboard
        if (this.componentsStatus.motherboard?.isPowered) {
            const moboPortsToGivePower = this.componentsStatus.motherboard.component.ports?.filter(port => port.type === 'cooling' || port.type === 'frontPanel') || []; // filter ports for cooling and frontpanel

            // Check if cpu heatsink gets power from motherboard
            moboPortsToGivePower.forEach(port => {
                port.offsets?.forEach(offset => { // Iterate ports 
                    if (offset?.cableAttached?.name === 'Heatsink') { // Iterate ports with cableattached for Heatsink
                        if (this.componentsStatus.cpuCooling) { // If the componenstatus is powered then return true else proceed with testing
                            this.componentsStatus.cpuCooling.isPowered = true;
                        }
                    }
                });
            });
        }

        // M.2 Storage Device Powering
        if (this.componentsStatus.storage) {
            this.componentsStatus.storage.forEach(storage => {
                if (storage.component?.size === 'm.2' && storage.component?.isAttached && this.componentsStatus.motherboard?.isPowered) {
                    storage.isPowered = true
                }
            })
        }

        return true
    }

    /****************************************** COMPONENT TESTS **************************************************************/

    psuTest() {
        // report missing component: PSU (ERR-01)
        if(!this.componentsStatus.psu || !this.componentsStatus.psu.component) {
            return 'ERR-100' // Missing PSU Component
        }

        // Power the powersuplly
        this.componentsStatus.psu.isPowered = true
        
        // Critical Error: PSU Failure
        if (Math.random() < 0.01 + Math.random * 0.04) { // 1% to 5% chance of error showing
            return 'CRT-01'
        }

        // add reports if no errors are found
        //..
        
        return true
    }

    motherboardTest() {
        // check if hardware is available (seated)
        if(!this.componentsStatus.motherboard || !this.componentsStatus.motherboard.component) {
            return 'ERR-200' // Missing Motherboard Component
        }
        const motherboard = this.componentsStatus.motherboard

        // Check if motherboard front panel is connected
        const chassisCable = motherboard.component.ports.find(port => port.type === 'frontPanel')?.offsets[0]?.cableAttached // iterate through every port and theres no cable attached then return errorcode
        if(!chassisCable?.ends?.chassis?.connected) {
            return 'ERR-201' // Missing Front Panel Connection
        } 
       
        // Power / Cable connection Check
        if(!this.componentsStatus.motherboard.isPowered){
            return 'ERR-202' // Motherboard not powered
        } 

        // Critical error
        if (Math.random() < 0.01 + Math.random * 0.04) { // 1% to 5% chance of error showing
            return 'CRT-02'; // Motherboard Failure
        }

        // add reports if no errors are found
        //..

        return true
    }

    cpuTest() {
        // check if hardware is available (seated)
        if(!this.componentsStatus.cpu || !this.componentsStatus.cpu.component) {
            return 'ERR-300' // Missing CPU Component
        }

        // check if cpu is powered 
        if(!this.componentsStatus.cpu.isPowered) {
            return 'ERR-301' // CPU not powered
        }

        // Critical Error: CPU Failure
        if (Math.random() < 0.01 + Math.random * 0.04) { // 1% to 5% chance of error showing
            return 'CRT-03'; // CPU Failure
        }

        // add reports if no errors are found
        //..

        return true
    }

    memoryTest() {
        // check if hardware is available (seated)
        if(!this.componentsStatus.ram || !this.componentsStatus.ram.length) {
            return 'ERR-400' // Missing RAM Component
        }

        // Critical Error: Memory Failure
        if (Math.random() < 0.01 + Math.random * 0.04) { // 1% to 5% chance of error showing
            return 'CRT-04'; 
        }

        // add reports if no errors are found
        //..

        return true
    }

    storageDeviceTest() {
        
        // check if hardware is available (seated)
        if(!this.componentsStatus.storage || !this.componentsStatus.storage.length) {
            return 'ERR-500' // Missing Storage Device
        }

        // check if at least one storage device is powered
        if(!this.componentsStatus.storage.some(storage => storage.isPowered)) {
            return 'ERR-501' // Storage Device not powered
        }

        // Critical Error: BOOT Device Failure
        if (Math.random() < 0.01 + Math.random * 0.04) { // 1% to 5% chance of error showing
            return 'CRT-05'; 
        }
        
        // OS corruption
        if (Math.random() < 0.01 + Math.random * 0.04) { // 1% to 5% chance of error showing
            return 'CRT-07'; 
        }


        // check if at least one storage device can transfer data
        // check if canDataTransfer attribute is true
        // if(type nvme), no need to check for data transfer

        // add reports if no errors are found
        //..

        return true
    }

    graphicsCardTest() {
        // check if hardware is available (seated)
        if(!this.componentsStatus.gpu || !this.componentsStatus.gpu.component) {
            return 'ERR-600' // Missing Graphics Card 
        }

        // check if gpu is powered
        if(!this.componentsStatus.gpu.isPowered) {
            return 'ERR-601' // Graphics Card not Powered
        }

        // Critical Error: GPU Failure
        if (Math.random() < 0.01 + Math.random * 0.04) { // 1% to 5% chance of error showing
            return 'CRT-06'
        }

        if(this.bios.biosSettings.gpuSettings.temperatures.current >= 
            this.bios.biosSettings.gpuSettings.temperatures.critical){
            return 'HZD-300'
        }

        // add reports if no errors are found
        //..

        return true
    }

    fanAndCoolingTest() {
        // check if heatsink (cpu cooling) is seated
        if(!this.componentsStatus.cpuCooling || !this.componentsStatus.cpuCooling.component) {
            return 'ERR-700' // Missing Heatsink (CPU Cooling)
        }
        
        // check if the cpuCooling is powered
        if(!this.componentsStatus.cpuCooling.isPowered) {
            return 'ERR-701'
        }
        // Hazard Error: CPU fan speed low
        if (this.bios.biosSettings.fanSpeed < 30 || this.bios.fanSpeed < 30) {
            return 'HZD-100' // Fan speed too low
        }

        if (this.bios.biosSettings.temperatures.cpu > 80) {
            return 'HZD-200' // High CPU temperature
        }
        
        if (this.bios.biosSettings.temperatures.system > 70) {
            return 'HZD-201' // High System temperature
        }

        return true
    }

    bootDeviceSelection(){
        // Find bootable storage devices
        const bootableDevices = this.componentsStatus.storage?.filter(device => 
            device.isPowered && device.component.specs?.bootable
        );
    
        if (!bootableDevices || bootableDevices.length === 0) {
            return 'ERR-500'; // missing storage device
        }
    
        // Initialize boot order if empty
        if (!this.bios.biosSettings.bootOrder || this.bios.biosSettings.bootOrder.length === 0) {
            this.bios.biosSettings.bootOrder = bootableDevices.map((device, index) => ({
                device: device.component.name,
                isBootable: true,
                osInstalled: device.component.osInstalled || false,
                deviceType: device.component.specs.type || 'unknown',
                isPrimary: index === 0
            }));
        }

        return true;
    }

    installOS(){
        // Find all bootable devices
        const bootableDevices = this.componentsStatus.storage?.filter(device => 
            device.isPowered && device.component.specs?.bootable
        );

        if (!bootableDevices || bootableDevices.length === 0) {
            return { success: false, error: 'ERR-500' };
        }

        // Find suitable device - prefer SSDs/NVMe over HDDs
        const installTarget = bootableDevices.find(device => 
            !device.component.osInstalled && 
            (device.component.specs.type === 'ssd' || device.component.specs.type === 'nvme')
        ) || bootableDevices.find(device => !device.component.osInstalled);

        if (!installTarget) {
            return { success: false, error: 'ERR-504' };
        }

        // Install OS on target device
        installTarget.component.osInstalled = true;

        // Update boot order
        this.bios.biosSettings.bootOrder = [
            {
                device: installTarget.component.name,
                isBootable: true,
                osInstalled: true,
                deviceType: installTarget.component.size,
                isPrimary: true
            },
            ...bootableDevices
                .filter(device => device !== installTarget)
                .map(device => ({
                    device: device.component.name,
                    isBootable: true,
                    osInstalled: device.component.osInstalled,
                    deviceType: device.component.size,
                    isPrimary: false
                }))
        ];

        // Update BIOS display
        if (this.isBiosOpen) {
            this.updateBiosDisplay();
        }

        return { 
            success: true, 
            device: installTarget.component.name,
            deviceType: installTarget.component.size,
            bootOrder: this.bios.biosSettings.bootOrder
        };
    }

    osBootUp(){
        // Check if we have a valid boot device
        if (!this.bios.biosSettings.bootOrder || this.bios.biosSettings.bootOrder.length === 0) {
            return 'ERR-500'; // missing storage devices
        }

        // Simulate OS boot process
        const primaryBootDevice = this.bios.biosSettings.bootOrder[0];
        if (!primaryBootDevice.osInstalled) {
            return 'ERR-503'; // No OS installed on primary boot device
        }

        return true;
    }

    //-------------------------- Fan Controls-------------------------------------
    updateTemperatures() {
        const currentProfile = this.bios.fanProfiles[this.bios.biosSettings.fanProfile]
        const fanSpeedFactor = this.bios.fanSpeed / 100

        // Calculate temperatures based on fan speed
        this.bios.biosSettings.temperatures.cpu = Math.round(
            currentProfile.minTemp + 
            (currentProfile.maxTemp - currentProfile.minTemp) * (1 - fanSpeedFactor)
        )

        this.bios.biosSettings.temperatures.system = Math.round(
            this.bios.biosSettings.temperatures.cpu * 0.85
        )

        // Check for temperature warnings
        this.fanAndCoolingTest()
        this.graphicsCardTest()
    }
    
    /*************************************************************************************************************************/

    checkIfAvailableUnit(component) {
        return component && component.type === 'chassis' ? component : null
    }  
}

export default PCUnit;
