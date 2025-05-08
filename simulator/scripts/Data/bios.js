class Bios{
    constructor(pcUnit,bootUpTab){
        this.bootUpTab = bootUpTab
        this.pcUnit = pcUnit
        this.isBiosOpen = false
        this.biosElements = null
        
        // BIOS settings
        this.minRpm = 800
        this.maxRpm = 2400
        this.currentRpm = this.minRpm
        this.fanSpeed = 50 // Default fan speed
        
        this.biosSettings = {
            fanProfile: 'standard',
            fanSpeed: 50,
            lastSaved: null,
            systemTime: new Date(),
            bootOrder: [],
            temperatures: {
                cpu: Math.floor(Math.random() * 9) + 36,
                system: Math.floor(Math.random() * 9) + 38
            },
            gpuSettings: {
                fanSpeed: 50,
                currentRpm: 1200,
                fanProfile: 'standard',
                minRpm: 800,
                maxRpm: 3000,
                temperatures: {
                    current: Math.floor(Math.random() * 9) + 45,
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
    // --------------------------------------------BIOS HANDLERS--------------------------------------------
    initializeBIOS() {
    // Get all BIOS UI elements with single object
    const biosEl = this.biosElements = {
        modal: document.getElementById('biosModal'),
        menuItems: document.querySelectorAll('.bios-menu li'),
        sections: document.querySelectorAll('.bios-section'),
        fanSpeed: document.getElementById('fanSpeed'),
        fanProfile: document.getElementById('fanProfile'),
        cpuTemp: document.getElementById('cpuTemp'),
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
        bootOrder: document.getElementById('bootOrder'),
        osStatus: document.getElementById('osStatus'),
        installOS: document.getElementById('installOS'),
        installTarget: document.getElementById('installTarget'),
        deleteOS: document.getElementById('deleteOS')
    }
    // Menu moving function for bios
    biosEl.sections[0].classList.add('show');

    biosEl.menuItems.forEach((item) => {
        item.addEventListener('click', () => {
            // Remove active class from all menu items and sections
            biosEl.menuItems.forEach(i => i.classList.remove('show'));
            biosEl.sections.forEach(s => s.classList.remove('show'));

            // Add show class to clicked item and corresponding section
            item.classList.add('show');
            
            // Show corresponding section based on menu item
            switch(item.textContent) {
                case 'Main':
                    document.querySelector('.bios-section:nth-child(1)').classList.add('show');
                    break;
                case 'Fan Control':
                    document.querySelector('.bios-section:nth-child(2)').classList.add('show');
                    break;
                case 'Boot':
                    document.querySelector('.bios-section:nth-child(3)').classList.add('show');
                    break;
            }
        });
    });

    // CPU fan settings
    biosEl.fanProfile?.addEventListener('change', (e) => {
        const profile = e.target.value;
        this.setFanProfile(profile);
    });

    biosEl.fanSpeed?.addEventListener('input', (e) => {
        const speed = parseInt(e.target.value);
        this.setFanSpeed(speed);
        biosEl.fanProfile.value = 'custom';
        this.biosSettings.fanProfile = 'custom';
    });

    // GPU fan settings
    biosEl.gpuFanSpeed?.addEventListener('input', (e) => {
        const speed = parseInt(e.target.value);
        this.setGPUFanSpeed(speed);
        gpuFanProfile.value = 'custom';
        this.biosSettings.gpuSettings.fanProfile = 'custom';
    });
    
    biosEl.gpuFanProfile?.addEventListener('change', (e) => {
        const profile = e.target.value;
        if (this.fanProfiles[profile]) {
            this.biosSettings.gpuSettings.fanProfile = profile;
            this.setGPUFanSpeed(this.fanProfiles[profile].speed);
        }
    });

    // OS installation handler
    biosEl.installOS?.addEventListener('click', () => {
        if (!this.handleOSInstallation()) {
            return; // Exit if pre-checks fail
        }

        const result = this.pcUnit.installOS();
        if (result.success) {
            biosEl.osStatus.textContent = `OS Installed on ${result.device} (${result.deviceType})`;
            biosEl.osStatus.classList.remove('not-installed', 'error');
            biosEl.osStatus.classList.add('installed');
            
            // Show success message
            const messageDialog = document.createElement('div');
            messageDialog.classList.add('os-message-dialog');
            messageDialog.id = 'osInstallDialog'
            messageDialog.innerHTML = `
                <div class="os-message-content">
                    <div class="os-message-header">
                        <span class="success-icon">✓</span>
                        <h3>Installation Complete</h3>
                    </div>
                    <p>Successfully installed OS on ${result.device}</p>
                    <p class="restart-note">System will restart to complete installation.</p>
                    <button class="restart-button">Restart Now</button>
                </div>
            `;
            biosModal.appendChild(messageDialog);
            const restartButton = messageDialog.querySelector('.restart-button')
            // event listener for restart button 
            restartButton.addEventListener('click', () => {
                messageDialog.remove();
                this.restartSystem(); // Use the same restart method
                });
            } else {
                biosEl.osStatus.textContent = `Installation Failed: ${result.error}`;
                biosEl.osStatus.classList.remove('installed')
                biosEl.osStatus.classList.add('not-installed')
            }
        })


    biosEl.saveBtn?.addEventListener('click', () => this.saveBiosSettings());

    // Deletion of OS handler
    biosEl.deleteOS?.addEventListener('click', () => {
        const selectedDevice = this.biosSettings.bootOrder[0]?.device;
        if (!selectedDevice) {
            return;
        }

        const result = this.deleteOS(selectedDevice);
        if (result.success) {
            biosEl.osStatus.textContent = 'OS Deleted - System requires reinstallation';
            biosEl.osStatus.classList.remove('installed');
            biosEl.osStatus.classList.add('not-installed');

            // Show deletion message
            const messageDialog = document.createElement('div');
            messageDialog.classList.add('os-message-dialog');
            messageDialog.id = 'osDeleteDialog';
            messageDialog.innerHTML = `
                <div class="os-message-content">
                    <div class="os-message-header">
                        <span class="warning-icon">⚠️</span>
                        <h3>OS Deleted</h3>
                    </div>
                    <p>Operating System has been removed from ${result.device}</p>
                    <p class="restart-note">System requires reinstallation</p>
                    <button class="restart-button">Restart Now</button>
                </div>
            `;
            biosModal.appendChild(messageDialog);
            
            const restartButton = messageDialog.querySelector('.restart-button');
            restartButton.addEventListener('click', () => {
                messageDialog.remove();
                this.restartSystem();
            });
        }
    });

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
        biosEl.cpuTemp && (biosEl.cpuTemp.textContent = `${this.biosSettings.temperatures.cpu}°C`)
        biosEl.motherboard && (biosEl.motherboard.textContent = status.motherboard);
        biosEl.processor && (biosEl.processor.textContent = status.processor);
        biosEl.memory && (biosEl.memory.textContent = status.memory);
        biosEl.gpu && (biosEl.gpu.textContent = status.gpu);
        biosEl.gpuFanSpeed && (biosEl.gpuFanSpeed.value = this.biosSettings.gpuSettings.fanSpeed);
        biosEl.gpuFanSpeedValue && (biosEl.gpuFanSpeedValue.textContent = `${this.biosSettings.gpuSettings.fanSpeed}%`);
        biosEl.gpuCurrentRpm && (biosEl.gpuCurrentRpm.textContent = this.biosSettings.gpuSettings.currentRpm);
        biosEl.gpuTemp && (biosEl.gpuTemp.textContent = `${this.biosSettings.gpuSettings.temperatures.current}°C`);
        biosEl.storage && (biosEl.storage.textContent = status.storage);
        if (biosEl.bootOrder) {
            // Use this.biosSettings.bootOrder directly instead of status.bootOrder
            biosEl.bootOrder.innerHTML = this.biosSettings.bootOrder.map((device, index) => `
                <li class="boot-device ${index === 0 ? 'primary' : ''}"
                    data-index="${index}"
                    tabindex="0">
                    <div class="device-info">
                        <span class="device-name">${device.device}</span>
                        <span class="device-type">${device.deviceType}</span>
                    </div>
                    ${device.osInstalled ? '<span class="os-badge">OS</span>' : ''}
                    <div class="order-controls">
                        <button class="move-up" ${index === 0 ? 'disabled' : ''}>↑</button>
                        <button class="move-down" ${index === this.biosSettings.bootOrder.length - 1 ? 'disabled' : ''}>↓</button>
                    </div>
                </li>
            `).join('');  
        }
         // boot devices movement 
        const items = biosEl.bootOrder.querySelectorAll('li');
        items.forEach(item => {
            const upBtn = item.querySelector('.move-up');
            const downBtn = item.querySelector('.move-down');
            const index = parseInt(item.dataset.index);

            upBtn?.addEventListener('click', (e) => {
                e.preventDefault()
                e.stopPropagation()
                this.moveBootDevice(index, 'up');
                this.updateBiosDisplay()
            });

            downBtn?.addEventListener('click', (e) => {
                e.preventDefault()
                e.stopPropagation()
                this.moveBootDevice(index, 'down');
                this.updateBiosDisplay()
            });
        });
    }       
    
    getBiosStatus() {
        const memoryPerStick = 8; // Each stick is 8GB
        const totalMemory = this.pcUnit.componentsStatus.ram?.length  
            ? `${this.pcUnit.componentsStatus.ram.length * memoryPerStick}GB` 
            : 'Not Detected';
        return {
            fanProfile: this.biosSettings.fanProfile,
            fanSpeed: this.biosSettings.fanSpeed,
            currentRpm: this.currentRpm,
            cpuTemp: this.biosSettings.temperatures.cpu || 'Not Detected',
            temperatures: this.biosSettings.temperatures,
            lastSaved: this.biosSettings.lastSaved,
            motherboard: this.pcUnit.componentsStatus.motherboard?.component?.name || 'Not Detected',
            processor: this.pcUnit.componentsStatus.cpu?.component?.name || 'Not Detected',
            memory: totalMemory,
            gpu: this.pcUnit.componentsStatus.gpu?.component?.name || 'Not Detected',
            gpuTemp: this.biosSettings.gpuSettings.temperatures.current || 'Not Detected',
            gpuCurrentRpm: this.biosSettings.gpuSettings.temperatures.current,
            gpuFanSpeed: this.biosSettings.gpuSettings.fanSpeed,
            storage: this.pcUnit.componentsStatus.storage?.length 
                ? `${this.pcUnit.componentsStatus.storage.length} Devices Detected` 
                : 'Not Detected',
            bootOrder: this.pcUnit.componentsStatus.storage?.filter(device => 
                    device.isPowered).map(device => ({
                    device: device.component.name,
                    osInstalled: device.component.osInstalled
                }))        
        }
    }

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
        const cpuProfile = this.biosSettings.fanProfile;
        if (cpuProfile === 'custom') {
            const cpuSpeed = this.biosSettings.fanSpeed;
            this.setFanSpeed(cpuSpeed);
        } else {
            const profileSpeed = this.fanProfiles[cpuProfile]?.speed;
            if (typeof profileSpeed === 'number') {
                this.setFanSpeed(profileSpeed);
            }
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

        // Add boot order to settings
        const bootOrderSettings = this.biosSettings.bootOrder.map(device => ({
            device: device.device,
            isBootable: device.isBootable,
            osInstalled: device.osInstalled,
            deviceType: device.deviceType,
            isPrimary: device.isPrimary
        }));


        // Option to restart system after BIOS changes
        const shouldRestart = document.getElementById('saveBiosSettings')

        if (shouldRestart) {
            this.restartSystem();
        }
        this.biosSettings.bootOrder = bootOrderSettings;
        this.biosSettings.lastSaved = new Date().toLocaleString();
        return {
            ...settings,
            bootOrder: bootOrderSettings
        };
    }

    restartSystem() {
        // Close BIOS first
        this.toggleBios(false);
        
        // Use bootUpTab's power functions
        this.bootUpTab.powerOff();
        
        // Power on with delay
        setTimeout(() => {
            this.bootUpTab.powerBtnClick(this.pcUnit.availableUnit);
        }, 2000);
    }
    
    // -------------------------------Fan Speed Handler------------------
    setFanSpeed(percentage) {
        if (percentage < 0 || percentage > 100) return;
        
        this.fanSpeed = percentage;
        this.currentRpm = Math.round(this.minRpm + ((this.maxRpm - this.minRpm) * (percentage / 100)));
        this.biosSettings.fanSpeed = percentage;
        
        this.pcUnit.updateTemperatures();
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
             this.pcUnit.updateTemperatures();

            
             return this.result
         }
    }
        
    updateFanRPM(speedPercentage) {
        const baseRPM = 800
        const maxRPM = 2400
        const rpm = baseRPM + ((maxRPM - baseRPM) * (speedPercentage / 100))
        document.getElementById('currentRpm').textContent = Math.round(rpm)
        this.currentRpm = Math.round(rpm)
    }
    
    //-------------------------------------OS Handler-----------------------------------
    moveBootDevice(index, direction) {
        if (!this.biosSettings.bootOrder || index < 0 || index >= this.biosSettings.bootOrder.length) return;

       const newIndex = direction === 'up' ? index - 1 : index + 1;
       if (newIndex < 0 || newIndex >= this.biosSettings.bootOrder.length) return;
    
       // Swap devices
       const deviceA = this.biosSettings.bootOrder[index];
       const deviceB = this.biosSettings.bootOrder[newIndex]; 
    
       // Perform the swap
       this.biosSettings.bootOrder[index] = deviceB;
       this.biosSettings.bootOrder[newIndex] = deviceA;

       // Update primary status and storage devices
       this.biosSettings.bootOrder.forEach((device, i) => {
           device.isPrimary = i === 0;

           // Find and update corresponding storage device
           const storageDevice = this.pcUnit.componentsStatus.storage.find(
               storage => storage.component.name === device.device
           );
           if (storageDevice) {
               storageDevice.component.bootPriority = i;
           }
       });

       // Update display with new order
       if (this.isBiosOpen) {
           this.updateBiosDisplay();
       }
    }

    // os installation handler
    handleOSInstallation() {
        const status = this.getBiosStatus();
        const biosEl = this.biosElements;
    
        // Check storage devices
        if (!status.bootOrder || status.bootOrder.length === 0) {
            biosEl.osStatus.textContent = 'No bootable devices detected';
            biosEl.osStatus.classList.add('error');
            return false;
        }
    
        // Check for existing OS
        const hasOS = status.bootOrder.some(device => device.osInstalled);
        biosEl.osStatus.textContent = hasOS ? 
            'OS Installed' : 
            'No OS Installed - Select a drive to install';
        biosEl.osStatus.classList.toggle('installed', hasOS);
        biosEl.osStatus.classList.toggle('not-installed', !hasOS);
    
        return true;
    }

    deleteOS(deviceName) {
        // Find the storage device
        const storageDevice = this.pcUnit.componentsStatus.storage.find(
            device => device.component.name === deviceName
        );
    
        if (!storageDevice) {
            return {
                success: false,
                error: 'Device not found'
            };
        }
    
        // Remove OS from device
        storageDevice.component.osInstalled = false;
    
        // Update boot order
        this.biosSettings.bootOrder = this.biosSettings.bootOrder.map(device => {
            if (device.device === deviceName) {
                return {
                    ...device,
                    osInstalled: false,
                    isPrimary: false
                };
            }
            return device;
        });
    
        // Update BIOS display if open
        if (this.isBiosOpen) {
            this.updateBiosDisplay();
        }
    
        return {
            success: true,
            device: deviceName
        };
    }

}

export default Bios