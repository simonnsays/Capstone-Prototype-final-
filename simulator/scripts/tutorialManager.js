import tasks from "../assistant/tasks.js"
class TutorialManager {
    constructor(eventBus) {
        this.eventBus = eventBus
        this.tasks = tasks  
        this.taskIndex = 0
        // this.taskIndex = 11
    }
    
    init() {
        this.subscribeToEvents()
        this.eventBus.emit('tutManagerInit', this.tasks[this.taskIndex])
        this.tryToAdvance('init')
        
        // TEST STEP FAST FORWARD
        // this.tryToAdvance('quickBuyChecked')
    }

    subscribeToEvents() {

        ['tabsMenuOpened', 'shopOpened', 'chassisExpanded', 'chassisBought',
            'motherboardExpanded', 'motherboardBought', 'cpuExpanded', 'cpuBought',
            'psuExpanded', 'psuBought', 'quickBuyChecked', 'romBought', 
            'coolingDeviceBought', 'gpuBought', 'invOpened', 'motherboardPlaced',
            'workAreaIntroduced', 'motherboardPlaced', 'set1Placed', 'set1Attached',
            'set2Placed', 'chassisPlacedInMain', 'rightSideAccessed', 'storageError',
            'storageRemoved', 'ssdBought', 'assemblyCompleted', 'portsTabOpened', 
            'portGroupsNavigated', 'cellHovered', 'drawerPulled', '24pinSelected',
            '24pinMoboAttached', 'psuNavigated', '24pinPsuAttached'
        ].forEach(event => {
            this.eventBus.on(event, () =>{
                this.tryToAdvance(event)
            } )  
        })

        this.eventBus.on('ramBought', () => {
            // This is saying that we are currently in step[buyRama]
            const ramTask = tasks.find(task => task.condition)
            ramTask.condition.amount++
            if(ramTask.condition.amount == ramTask.condition.amountRequired) {
                this.tryToAdvance('ramBought')
            }
        })
    }

    tryToAdvance(triggerName = null) {
        const currentTask = this.tasks[this.taskIndex]
        console.log('step: ', this.taskIndex + 1)
        
        // if(triggerName === 'workAreaIntroduced') {
        //     console.log('step' + this.taskIndex)
        //     console.log(currentTask)
        // }

        if (!currentTask) return
        if (currentTask.trigger && currentTask.trigger !== triggerName) return

        // Succeed to advance
        this.emitTaskId(currentTask.id)
        this.eventBus.emit('taskAdvanced', currentTask)
        
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
        }
    }
}

export default TutorialManager