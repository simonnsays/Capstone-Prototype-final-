import tasks from "../assistant/tasks.js"
class TutorialManager {
    constructor(eventBus) {
        this.eventBus = eventBus
        this.tasks = tasks  
        this.taskIndex = 0
        // this.taskIndex = 11
        this.currentTask = tasks[this.taskIndex]

        this.currentUnit = {}
    }
    
    init() {
        this.subscribeToEvents()

        this.startTutorial()
        
        // TEST STEP FAST FORWARD
        // this.tryToAdvance('sPowerPsuAttached')
    }
    
    startTutorial() {
        this.eventBus.emit('tutManagerInit', this.tasks[this.taskIndex])
        this.tryToAdvance('init')
        this.eventBus.emit('gameResume')
    }
    
    subscribeToEvents() {
        this.eventBus.on('mainUnitUpdated', (data) => {this.currentUnit = data})
        
        const events = ['tabsMenuOpened', 'shopOpened', 'chassisExpanded', 'chassisBought',
            'motherboardExpanded', 'motherboardBought', 'cpuExpanded', 'cpuBought',
            'psuExpanded', 'psuBought', 'quickBuyChecked', 'romBought', 
            'coolingDeviceBought', 'gpuBought', 'invOpened', 'motherboardPlaced',
            'set1Placed', 'set1Attached','set2Placed', 'chassisPlacedInMain', 
            'rightSideAccessed', 'storageError','storageRemoved', 'ssdBought', 
            'assemblyCompleted', 'portsTabOpened', 'portMoboNavigated', 'cellHovered', 
            'drawerPulled', '24pinSelected','24pinMoboAttached', 'portPsuNavigated', 
            '24pinPsuAttached', 'epsSelected', 'cpuCoolingAttached', 'frontPanelAttached', 
            'sDataMoboAttached', 'portRomNavigated', 'sDataRomAttached', 'sPowerRomAttached', 
            'sPowerPsuAttached', 'portGpuNavigated', 'bootUpTabOpened', 'attemptedPower',
            'chatOpened', 'biosOpened', 'poweredOn' , 'showBuild', 'reportSuccessClicked', 'showBuildSummary', 'resetBuild', 'exitTutorial',
            'setupWizard', 'ramBought'
        ]
        events.forEach(event => {
            this.eventBus.on(event, () =>{
                this.tryToAdvance(event)
            } )  
        })

        // RAM Condition
        // this.eventBus.on('ramBought', () => {
        //     if (!this.currentTask.condition) return
        //     this.currentTask.condition.amount++
        //     if(this.currentTask.condition.amount == this.currentTask.condition.amountRequired) {
        //         this.tryToAdvance('ramBought')
        //     }
        // })

        // EPS PSU  port condition
        this.eventBus.on('epsPsuAttached', () => {
            const psu = this.findComponent(this.currentUnit, 'psu')
            let allCablesAttached = false
            if(!psu) return 

            const psuPorts = psu.ports.filter(port => port.type === '8-pin-power')
            allCablesAttached = psuPorts.every(port => {
                const offsets = port.offsets
                if(!offsets) return false                         
                return offsets.every(offset => offset.cableAttached)
            })

            if(allCablesAttached) this.tryToAdvance('epsPsuAttached')
        })

        // EPS Motherboard port condition
        this.eventBus.on('epsMoboAttached', () => {
            const motherboard = this.findComponent(this.currentUnit, 'motherboard')
            let allCablesAttached = false
            if(!motherboard) return 

            const moboPorts = motherboard.ports.filter(port => port.type === '8-pin-power')
            allCablesAttached = moboPorts.every(port => {
                const offsets = port.offsets
                if(!offsets) return false                         
                return offsets.every(offset => offset.cableAttached)
            })
            
            if(allCablesAttached) this.tryToAdvance('epsMoboAttached')
        })

        // PCIe PSU port condition
        this.eventBus.on('pciePsuAttached', () => {
            const psu = this.findComponent(this.currentUnit, 'psu')
            let cablesAttachedCount = 0
            if(!psu) return 

            const psuPorts = psu.ports.filter(port => port.type === '8-pin-pcie')
            psuPorts.forEach(port => {
                const offsets = port.offsets
                offsets.forEach(offset => {
                    if(offset.cableAttached) {
                        cablesAttachedCount++
                    }
                })
            })

            if(cablesAttachedCount === 2) {
                this.tryToAdvance('pciePsuAttached')
            } 
        })

        // PCIe GPU port condition
        this.eventBus.on('pcieGpuAttached', () => {
            const gpu = this.findComponent(this.currentUnit, 'gpu')
            const psu = this.findComponent(this.currentUnit, 'psu')

            if (!psu || !gpu) return

            const gpuFoundCables = []
            const psuFoundCables = []

            gpu.ports.forEach(port => {
                port.offsets.forEach(offset => {
                    if (port.type === '16-pin-pcie' && offset.cableAttached) {
                        gpuFoundCables.push(offset.cableAttached)
                    }
                })
            })

            psu.ports.forEach(port => {
                port.offsets.forEach(offset => {
                    if (port.type === '8-pin-pcie' && offset.cableAttached) {
                        psuFoundCables.push(offset.cableAttached)
                    }
                })
            })

            // Check that we have exactly 2 cables on each side
            const correctCableCount = gpuFoundCables.length === 2 && psuFoundCables.length === 2

            // Check that all GPU cables are found in the PSU cables by object reference
            const allGpuCablesMatch = gpuFoundCables.every(cable => psuFoundCables.includes(cable))

            if (correctCableCount && allGpuCablesMatch) {
                this.tryToAdvance('pcieGpuAttached')
            }
        })
        
        this.eventBus.on('reportSuccessClicked', () => this.tryToAdvance('reportSuccessClicked'));
        this.eventBus.on('showBuildSummary', () => this.tryToAdvance('showBuildSummary'));
        this.eventBus.on('exitTutorial', () => this.tryToAdvance('exitTutorial'));
    }

    findComponent(component, type) {
        if(component.type === type) return component

        for(let slot of component.slots || []) {
            if (slot.component) {
                const found = this.findComponent(slot.component, type)
                if(found) return found
            }
        }
        return null
    }

    tryToAdvance(triggerName = null) {
        // mark complete
        if(this.taskIndex > 0) {
            this.eventBus.emit('taskCompleted', tasks[this.taskIndex-1])
            tasks[this.taskIndex-1].status = 'complete'
        }

        this.currentTask = this.tasks[this.taskIndex]
            
        if (!this.currentTask) return
        if (this.currentTask.trigger && this.currentTask.trigger !== triggerName) return
        
        // Succeed to advance
        this.emitTaskId(this.currentTask.id)
        this.eventBus.emit('taskAdvanced', this.currentTask)

        console.log('Step: ', this.taskIndex)
                
        // Automatically prep next task for the next trigger
        this.taskIndex++
    }

    emitTaskId(id) {
        // component highlight
        switch(id) {
            case 'expandChassis':
                this.eventBus.emit('addChassisHighlight', "NZXT H5 Flow")
                break
            case 'expandMotherboard':
                this.eventBus.emit('addMotherboardHighlight', "ASRock X570 PG Velocita")
                break
            case 'expandCpu':
                this.eventBus.emit('addCpuHighlight', "AMD Ryzen 9 5900X")
                break
            case 'expandPsu':
                this.eventBus.emit('addPsuHighlight', "EVGA Supernova 1300 P+")
                break
            case 'buyRam':
                this.eventBus.emit('addRamHighlight', "Kingston HyperX Beast RGB DDR4")
                break
            case 'buyRom':
                this.eventBus.emit('addRomHighlight', "Seagate Barracuda")
                break
            case 'buyCoolingDevice':
                this.eventBus.emit('addCoolingDeviceHighlight', "AMD wraith Prism")
                break
            case 'buyGpu':
                this.eventBus.emit('addGpuHighlight', "Gigabyte Radeon RX 7900 XTX")
                break
            case 'placeSet2':
                this.eventBus.emit('addInvSetHighlights', [
                        'NZXT H5 Flow',
                        'EVGA Supernova 1300 P+',
                        'Seagate Barracuda'
                    ])
                break
            case 'completeAssembly':
                this.eventBus.emit('addSsdHighlight', "Seagate Barracuda SSD")
                break   
            case 'epsPinPsu':
                this.eventBus.emit('addEpsPinHighlight', "8-pin-power")
                break
            // display area conditionals
            case 'openPortsTab':
                this.eventBus.emit('findNoSet')
                break
            case 'attachSet2':
                this.eventBus.emit('findSet2')
                break
            case 'workAreaIntroduction':
                this.eventBus.emit('addInvSetHighlights', [
                    'ASRock X570 PG Velocita',
                    'AMD Ryzen 9 5900X',
                    'Kingston HyperX Beast RGB DDR4',
                    'AMD wraith Prism',
                    'Gigabyte Radeon RX 7900 XTX'
                ])
                this.eventBus.emit('findSet1')
                break
        }
    }
}

export default TutorialManager