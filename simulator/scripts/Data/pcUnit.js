import errorCodes from "../Data/errorCodes.js"
import BootUpTab from "../Tabs/bootUpTab.js"

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
            // () => this.bootDeviceSelection(),
            // () => this.osBootUp()
        ]

        // Boot error dialog elements
        this.bootErrorDialog = document.getElementById('bootErrorDialog');
        this.errorMessageElement = document.getElementById('errorMessage');
        this.troubleshootBtn = document.getElementById('troubleshootBtn');
        this.closeErrorDialogBtn = document.getElementById('closeErrorDialogBtn');

        // Event Listeners
        // this.troubleshootBtn?.addEventListener('click', () => this.startTroubleshooting());
        // this.closeErrorDialogBtn?.addEventListener('click', () => this.closeErrorDialog());

        this.errorTypes = []

        //BIOS properties
        this.isBiosOpen = false
        this.minRpm = 800
        this.maxRpm = 2400
        this.currentRpm = this.minRpm
        this.fanSpeed = this.fanSpeed || 50 // Default fan speed
        this.biosSettings = {
            fanProfile: 'standard',
            fanSpeed: 50,
            lastSaved: null,
            systemTime: new Date(),
            temperatures: {
                cpu: 45,
                system: 38
            },
            gpuSettings:{
                fanSpeed: 50,
                currentRpm: 1200,
                fanProfile: 'standard',
                minRpm: 800,
                maxRpm: 3000,
                temperatures: {
                    current: 45,
                    target: 70,
                    critical: 85
                }
            }
        }

        this.fanProfiles = {
            silent: {
                speed: 30,
                minTemp: 35,
                maxTemp: 75
            },
            standard: {
                speed: 50,
                minTemp: 40,
                maxTemp: 80
            },
            turbo: {
                speed: 80,
                minTemp: 45,
                maxTemp: 85
            }
        }
        this.initializeBIOS()
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
                <div class="error-icon">
                    <img src="./assets/boot/error_screen/warning.png" alt="error icon">
                    <div class="error-details">
                        <h2>${errorData.description} (${errorCode})</h2> 
                        <p><strong>Severity:</strong> ${errorData.severity} ${this.getSeverityIcon(errorData.severity)}</p>
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
            `<h3>Troubleshooting Guide</h3>
            <h4 style="font-size:.7rem">Please refer to the images for reference</h4>
            `
            troubleshootingGuide.appendChild(carouselContainer)
            
            // Finish button
            const etComplete = document.createElement('button')
            etComplete.classList.add('etComplete')
            etComplete.textContent = "Finish Troubleshooting"
            etComplete.addEventListener('click', () => {
                errorCell.classList.add('etask-complete')
            });
            troubleshootingGuide.appendChild(etComplete);
            errorCell.appendChild(troubleshootingGuide);
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
            return 'CRT-06'; 
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
            return 'CRT-01'; // Motherboard Failure
        }

        if (Math.random() < 0.01 + Math.random * 0.04) { // 1% to 5% chance of error showing
            return 'CRT-03'; // Motherboard Failure
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

        // Hazard Error: High CPU Temperature
        if (Math.random() < 0.1 + Math.random * 0.1) { // 10% to 20% chance of error showing
            return 'HZD-200'; 
        }

        // Critical Error: CPU Failure
        if (Math.random() < 0.01 + Math.random * 0.04) { // 1% to 5% chance of error showing
            return 'CRT-02'; // CPU Failure
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
            return 'CRT-08'; 
        }
        // OS corruption
        if (Math.random() < 0.01 + Math.random * 0.04) { // 1% to 5% chance of error showing
            return 'CRT-09'; 
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
            return 'CRT-05'; 
        }

        if(this.biosSettings.gpuSettings.temperatures.current >= 
            this.biosSettings.gpuSettings.temperatures.critical){
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
        if (this.fanSpeed < 30) {
            return 'HZD-100' // Fan speed too low
        }

        if (this.biosSettings.temperatures.cpu > 80) {
            return 'HZD-200' // High CPU temperature
        }
        
        if (this.biosSettings.temperatures.system > 70) {
            return 'HZD-201' // High System temperature
        }

        // Critical Error: Overheating issue
        if (Math.random() < 0.01 + Math.random * 0.04) { // 1% to 5% chance of error showing
            return 'CRT-07'; 
        }

        return true
    }

    // --------------------------------------------BIOS HANDLERS--------------------------------------------
    openBIOS() {
        let biosModal = document.getElementById("biosModal");
         if (biosModal) {
            setTimeout(() => {
                biosModal.toggleBios();
                this.updateBiosDisplay(); // Update BIOS display when opened
            }, 1800);
        } else {
            console.error("BIOS modal not found!");
        }
    }

    initializeBIOS() {
    // Get all BIOS UI elements with single object
    const biosEl = this.biosElements = {
        modal: document.getElementById('biosModal'),
        fanSpeed: document.getElementById('fanSpeed'),
        fanProfile: document.getElementById('fanProfile'),
        saveBtn: document.getElementById('saveBiosSettings'),
        timeDisplay: document.getElementById('biosTime'),
        fanSpeedValue: document.getElementById('fanSpeedValue'),
        currentRpm: document.getElementById('currentRpm'),
        motherboard: document.getElementById('biosMobo'),
        processor: document.getElementById('biosProcessor'),
        memory: document.getElementById('biosMemory'),
        gpu: document.getElementById('biosGpu'),
        gpuFanSpeed: document.getElementById('gpuFanSpeed'),
        gpuFanProfile: document.getElementById('gpuFanProfile'),
        gpuFanSpeedValue: document.getElementById('gpuFanSpeedValue'),
        gpuCurrentRpm: document.getElementById('gpuCurrentRpm'),
        gpuTemp: document.getElementById('gpuTemp'),
        storage: document.getElementById('biosStorage'),
        enterBtn: document.getElementById('biosButton'),
    }
    // CPU fan settings
    biosEl.fanProfile?.addEventListener('change', (e) => {
        const profile = e.target.value;
        this.setFanProfile(profile);
    });

    biosEl.fanSpeed?.addEventListener('input', (e) => {
        const speed = parseInt(e.target.value);
        this.setFanSpeed(speed);
        biosEl.fanProfile.value = 'custom';
    });
    // GPU fan settings
    biosEl.gpuFanSpeed?.addEventListener('input', (e) => {
        const speed = parseInt(e.target.value);
        this.setGPUFanSpeed(speed);
        gpuFanProfile.value = 'custom';
    });
    
    biosEl.gpuFanProfile?.addEventListener('change', (e) => {
        const profile = e.target.value;
        if (this.fanProfiles[profile]) {
            this.biosSettings.gpuSettings.fanProfile = profile;
            this.setGPUFanSpeed(this.fanProfiles[profile].speed);
        }
    });
    biosEl.saveBtn?.addEventListener('click', () => this.saveBiosSettings());

    // Start BIOS clock
    this.startBiosClock();
    }

    startBiosClock() {
        const updateClock = () => {
            if (this.biosElements.timeDisplay) {
                this.biosElements.timeDisplay.textContent = new Date().toLocaleTimeString()
            }
        };
        updateClock()
        setInterval(updateClock, 1000)
    }

    updateBiosDisplay() {
        const status = this.getBiosStatus();
        const biosEl = this.biosElements;

        // Early return if biosElements not found
        if (!biosEl) return;

        // Update all BIOS bios elements with single-line assignments
        biosEl.fanSpeed && (biosEl.fanSpeed.value = status.fanSpeed);
        biosEl.fanSpeedValue && (biosEl.fanSpeedValue.textContent = `${status.fanSpeed}%`);
        biosEl.currentRpm && (biosEl.currentRpm.textContent = status.currentRpm);
        biosEl.fanProfile && (biosEl.fanProfile.value = status.fanProfile);
        biosEl.motherboard && (biosEl.motherboard.textContent = status.motherboard);
        biosEl.processor && (biosEl.processor.textContent = status.processor);
        biosEl.memory && (biosEl.memory.textContent = status.memory);
        biosEl.gpu && (biosEl.gpu.textContent = status.gpu);
        biosEl.gpuFanSpeed && (biosEl.gpuFanSpeed.value = this.biosSettings.gpuSettings.fanSpeed);
        biosEl.gpuFanSpeedValue && (biosEl.gpuFanSpeedValue.textContent = `${this.biosSettings.gpuSettings.fanSpeed}%`);
        biosEl.gpuCurrentRpm && (biosEl.gpuCurrentRpm.textContent = this.biosSettings.gpuSettings.currentRpm);
        biosEl.gpuTemp && (biosEl.gpuTemp.textContent = `${this.biosSettings.gpuSettings.temperatures.current}°C`);
        biosEl.storage && (biosEl.storage.textContent = status.storage);
    }
    
    getBiosStatus() {
        const memoryPerStick = 8; // Each stick is 8GB
        const totalMemory = this.componentsStatus.ram?.length 
            ? `${this.componentsStatus.ram.length * memoryPerStick}GB` 
            : 'Not Detected';
        return {
            fanProfile: this.biosSettings.fanProfile,
            fanSpeed: this.biosSettings.fanSpeed,
            currentRpm: this.currentRpm,
            temperatures: this.biosSettings.temperatures,
            lastSaved: this.biosSettings.lastSaved,
            motherboard: this.componentsStatus.motherboard?.component?.name || 'Not Detected',
            processor: this.componentsStatus.cpu?.component?.name || 'Not Detected',
            memory: totalMemory,
            gpu: this.componentsStatus.gpu?.component?.name || 'Not Detected',
            gpuTemp: this.biosSettings.gpuSettings.temperatures.current || 'Not Detected',
            gpuCurrentRpm: this.biosSettings.gpuSettings.temperatures.current,
            gpuFanSpeed: this.biosSettings.gpuSettings.fanSpeed,
            storage: this.componentsStatus.storage?.length 
                ? `${this.componentsStatus.storage.length} Devices Detected` 
                : 'Not Detected',
        }
    }

    // Fan Controls
    setFanSpeed(percentage) {
        if (percentage < 0 || percentage > 100) return;
        
        this.fanSpeed = percentage;
        this.currentRpm = Math.round(this.minRpm + ((this.maxRpm - this.minRpm) * (percentage / 100)));
        this.biosSettings.fanSpeed = percentage;
        
        this.updateTemperatures();
        this.updateBiosDisplay();
    }

    setGPUFanSpeed(percentage) {
        if (percentage < 0 || percentage > 100) return;
        
        this.biosSettings.gpuSettings.fanSpeed = percentage;
        this.biosSettings.gpuSettings.currentRpm = Math.round(this.biosSettings.gpuSettings.minRpm + 
            ((this.biosSettings.gpuSettings.maxRpm - this.biosSettings.gpuSettings.minRpm) * (percentage / 100)))        
        
        // Temperature calculation
        const fanSpeedFactor = percentage / 100;
        this.biosSettings.gpuSettings.temperatures.current = Math.max(
            45, // Minimum temperature
            this.biosSettings.gpuSettings.temperatures.critical - 
            ((this.biosSettings.gpuSettings.temperatures.critical - this.biosSettings.gpuSettings.temperatures.target) 
            * fanSpeedFactor)
        )
        this.updateBiosDisplay();
    }

    setFanProfile(profile) {
           if (this.fanProfiles[profile]) {
            this.biosSettings.fanProfile = profile;
            this.setFanSpeed(this.fanProfiles[profile].speed);
            this.updateTemperatures();

            
            return this.result
        }
    }

    updateTemperatures() {
        const currentProfile = this.fanProfiles[this.biosSettings.fanProfile]
        const fanSpeedFactor = this.fanSpeed / 100

        // Calculate temperatures based on fan speed
        this.biosSettings.temperatures.cpu = Math.round(
            currentProfile.minTemp + 
            (currentProfile.maxTemp - currentProfile.minTemp) * (1 - fanSpeedFactor)
        )

        this.biosSettings.temperatures.system = Math.round(
            this.biosSettings.temperatures.cpu * 0.85
        )

        // Check for temperature warnings
        this.fanAndCoolingTest()
        this.graphicsCardTest()
    }

    toggleBios(show) {
        const biosEl = this.biosElements;
        if (!biosEl?.modal) return;
    
        if (!this.bootStatus && show) {
            console.warn('Cannot access BIOS: System not booted');
            return;
        }
    
        if (show) {
            biosEl.modal.showModal();
            this.updateBiosDisplay();
        } else {
            biosEl.modal.close();
        }
        this.isBiosOpen = show;
    }

    saveBiosSettings() {
        this.biosSettings.lastSaved = new Date().toLocaleString();

        // Store current settings
        const settings = {
            cpu: {
                fanSpeed: this.fanSpeed,
                fanProfile: this.biosSettings.fanProfile,
                currentRpm: this.currentRpm
            },
            gpu: {
                fanSpeed: this.biosSettings.gpuSettings.fanSpeed,
                fanProfile: this.biosSettings.gpuSettings.fanProfile,
                currentRpm: this.biosSettings.gpuSettings.currentRpm
            },
            lastSaved: this.biosSettings.lastSaved
        };

        // Apply settings
        if (this.biosSettings.fanProfile === 'custom') {
            this.setFanSpeed(this.fanSpeed);
        } else {
            this.setFanProfile(this.biosSettings.fanProfile);
        }

        // Apply GPU settings
        const gpuProfile = this.biosSettings.gpuSettings.fanProfile;
        if (gpuProfile === 'custom') {
            const gpuSpeed = this.biosSettings.gpuSettings.fanSpeed;
            this.setGPUFanSpeed(gpuSpeed)
            // Update temperatures after setting fan speed
            this.biosSettings.gpuSettings.temperatures.current = Math.max(
                45, // Minimum temperature
                this.biosSettings.gpuSettings.temperatures.critical - 
                ((this.biosSettings.gpuSettings.temperatures.critical - this.biosSettings.gpuSettings.temperatures.target) 
                * (gpuSpeed / 100))
            )
        } else {
            if (this.fanProfiles[this.biosSettings.gpuSettings.fanProfile]) {
                const profileSpeed = this.fanProfiles[gpuProfile].speed;
                this.setGPUFanSpeed(profileSpeed);
            }
        }

        // Option to restart system after BIOS changes
        const shouldRestart = document.getElementById('saveBiosSettings')
        const reportsarea= document.getElementById('bootTabReport')
        this.toggleBios(false);

        if (shouldRestart) {
            // Power cycle sequence
            reportsarea.innerHTML = ''
            this.powerOffMonitor()
            setTimeout(() => {
                // Clear any existing errors
                this.isErrorDisplayed = false;
                this.reports = [];
                this.power = 'off'
                // Attempt power on with current unit
                if (this.unit) {
                    this.attemptPowerOn(unit);
                }
            }, 2000);
        }

        return settings;
    }

    
    openBiosSettings() {
        const biosModal = document.getElementById('biosModal')
        if (!biosModal) return false

        biosModal.showModal()
        this.isBiosOpen = true

        // Update BIOS display
        const status = this.getBiosStatus()
        document.getElementById('fanSpeed').value = status.fanSpeed
        document.getElementById('fanSpeedValue').textContent = `${status.fanSpeed}%`
        document.getElementById('currentRpm').textContent = status.currentRpm
        document.getElementById('fanProfile').value = status.fanProfile
        document.getElementById('biosMobo').textContent = status.motherboard
        document.getElementById('biosProcessor').textContent = status.processor
        document.getElementById('biosMemory').textContent = status.memory
        document.getElementById('biosGpu').textContent = status.gpu
        document.getElementById('biosStorage').textContent = status.storage

        return true
    }

    updateFanRPM(speedPercentage) {
        const baseRPM = 800
        const maxRPM = 2400
        const rpm = baseRPM + ((maxRPM - baseRPM) * (speedPercentage / 100))
        document.getElementById('currentRpm').textContent = Math.round(rpm)
        this.currentRpm = Math.round(rpm)
    }

    /*************************************************************************************************************************/

    checkIfAvailableUnit(component) {
        return component && component.type === 'chassis' ? component : null
    }  
}

export default PCUnit;