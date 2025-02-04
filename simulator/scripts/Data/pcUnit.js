import errorCodes from "../Data/errorCodes.js"

class PCUnit {
    constructor(bootUpElements,) {
        // utilityTool, displayArea, Canvas, portsTab, drawer, assistant
        this.bootUpElements = bootUpElements

        this.power = 'off'
        this.availableUnit = null
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

        this.errorCodes = [
            { code: 'CRT001', description: 'PSU not powered' },
        ]

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
    }

    attemptPowerOn(unit) {
        let bootStatus = true
        // Inittiate / Reinitiate Components and their Status
        this.fillComponentStatus(unit)

        // POST Process
        for (let i = 0; i < this.bootSequence.length; i++) {
            let sequence = this.bootSequence[i] // Get function reference
            
            // Call the function: will only return either true if successful, else an error code 
            let result = sequence()
    
            // immediately return if an error is found
            if (result !== true) { 
                this.createError(result)
                bootStatus = false
                return false
            }
        }

        // if all checks are successful
        this.reports.push({
            tag: 'Success',
            def: 'System Booted Successfully',
        })

        return true
    }

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
        if(this.componentsStatus.motherboard.isPowered) {
            const moboPortsToGivePower = this.componentsStatus.motherboard.component.ports.filter(port => port.type === 'cooling' || port.type === 'frontPanel')

            // Follow  the cables to find the remaining components to power
            const moboCablesToFollow = []
            moboPortsToGivePower.forEach(port => {
                port.offsets.forEach(offset => {
                    moboCablesToFollow.push(offset.cableAttached)
                })
            })

            // ! ! ! ! ! !  unsure code
            moboCablesToFollow.forEach(cable => {
                if(cable.type === 'frontPanel') {
                    this.componentsStatus.chassis.isPowered = true
                }

                if(cable.name === 'Heatsink') {
                    this.componentsStatus.cpuCooling.isPowered = true
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
        const chassisCable = motherboard.component.ports.find(port => port.type === 'frontPanel').offsets[0].cableAttached
        if(!chassisCable.ends.chassis.connected) {
            return 'ERR-201' // Missing Front Panel Connection
        } 
       
        // Power / Cable connection Check
        if(!this.componentsStatus.motherboard.isPowered){
            return 'ERR-202' // Motherboard not powered
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

        // add reports if no errors are found
        //..

        return true
    }

    memoryTest() {
        // check if hardware is available (seated)
        if(!this.componentsStatus.ram || !this.componentsStatus.ram.length) {
            return 'ERR-400' // Missing RAM Component
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

        // add reports if no errors are found
        //..
        // make hazard report for low amount of cooling devices
        return true
    }

    /*************************************************************************************************************************/

    createReport(tag, description) {
            
    }

    createError(code) {
        const codeDetails = errorCodes[code]
        if(!codeDetails) {
            this.reports.push({
                type: 'error',
                tag: 'Error',
                def: `UNDEFINED ERROR: <br> <u> ${code} </u>`,
            })
            return
        }
        const err = {
            type: 'error',
            tag: codeDetails.severity,
            def: codeDetails.description,
        }
        this.reports.push(err) 
    }

    checkIfAvailableUnit(component) {
        return component && component.type === 'chassis' ? component : null
    }  
}

export default PCUnit;