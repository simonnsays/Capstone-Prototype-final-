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
        // this.tryToAdvance('quickBuyChecked')
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
            'sPowerPsuAttached', 'pciePsuAttached', 'portGpuNavigated'
        ]
        events.forEach(event => {
            this.eventBus.on(event, () =>{
                this.tryToAdvance(event)
            } )  
        })

        // RAM Condition
        this.eventBus.on('ramBought', () => {
            // This is saying that we are currently in step[buyRama]
            // const ramTask = tasks.find(task => task.condition)
            // const this.currentTask = this.currentTask
            this.currentTask.condition.amount++
            if(this.currentTask.condition.amount == this.currentTask.condition.amountRequired) {
                this.tryToAdvance('ramBought')
            }
        })

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
            console.log(motherboard)
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

            if(cablesAttachedCount === 2) this.tryToAdvance('pciePsuAttached')
        })

        // PCIe GPU port condition
        this.eventBus.on('pcieGpuAttached', () => {
            const gpu = this.findComponent(this.currentUnit, 'gpu')
            const psu = this.findComponent(this.currentUnit, 'psu')

            if (!psu || !gpu) return

            let gpuFoundCables = gpu.ports.filter(port => port.type === '16-pin-pcie' &&
                port.offsets.every(offset => offset.cableAttached))

            let psuFoundCables = psu.ports.filter(port => port.type === '8-pin-pcie' &&
                port.offsets.every(offset => offset.cableAttached))

            console.log(gpu.ports)
            console.log(gpuFoundCables)
            console.log(psuFoundCables)

            // Extract cable IDs for comparison
            let gpuCableIds = gpuFoundCables.flatMap(port => port.offsets.map(offset => offset.cableId))
            let psuCableIds = psuFoundCables.flatMap(port => port.offsets.map(offset => offset.cableId))

            // Ensure both sets have exactly 2 cables and their IDs match
            if (gpuCableIds.length === 2 && psuCableIds.length === 2 &&
                JSON.stringify(gpuCableIds.sort()) === JSON.stringify(psuCableIds.sort())) {
                this.tryToAdvance('pcieGpuAttached')
            }
        })

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
        
        // if(triggerName === 'workAreaIntroduced') {
            //     console.log('step' + this.taskIndex)
            //     console.log(currentTask)
            // }
            
        if (!this.currentTask) return
        if (this.currentTask.trigger && this.currentTask.trigger !== triggerName) return
        
        console.log('step: ', this.taskIndex + 1)
        // Succeed to advance
        this.emitTaskId(this.currentTask.id)
        this.eventBus.emit('taskAdvanced', this.currentTask)
                
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
            case 'workAreaIntroduction':
                this.eventBus.emit('addInvSetHighlights', [
                    'ASRock X570 PG Velocita',
                    'AMD Ryzen 9 5900X',
                    'Kingston HyperX Beast RGB DDR4',
                    'AMD wraith Prism',
                    'Gigabyte Radeon RX 7900 XTX'
                ])
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
        }
    }
}

export default TutorialManager