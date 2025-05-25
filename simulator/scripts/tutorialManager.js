import tasks from "../assistant/tasks.js"
class TutorialManager {
    constructor(eventBus, assistant) {
        this.eventBus = eventBus
        this.assistant = assistant
        this.tasks = tasks
        this.taskIndex = 0
    }
    
    init() {
        this.subscribeToEvents()
        this.assistant.updateMiniDsiplay(this.tasks[this.taskIndex])
        this.tryToAdvance('init')
    }

    subscribeToEvents() {

        ['tabsMenuOpened', 'shopOpened', 'chassisExpanded', 'chassisBought',
            'motherboardExpanded', 'motherboardBought', 'cpuExpanded', 'cpuBought',
            'psuExpanded', 'psuBought', 'quickBuyChecked'
        ].forEach(event => {
            this.eventBus.on(event, () =>{
                this.tryToAdvance(event)
            } )  
        })

        this.eventBus.on('ramBought', () => {
            const ramTask = tasks.find(task => task.condition)
            ramTask.condition.amount++
            if(ramTask.condition.amount >= ramTask.condition.amountRequired) {
                this.tryToAdvance('ramBought')
            }
        })

        // this.eventBus.on('tabsMenuOpened', () => {
        //     console.log('hit')
        //     this.tryToAdvance('tabsMenuOpened')
        // })
    }

    tryToAdvance(triggerName = null) {
        if(triggerName === 'cpuExpanded') {
            console.log('step' + this.taskIndex)
        }
        const currentTask = this.tasks[this.taskIndex]

        if (!currentTask) return

        if (currentTask.trigger && currentTask.trigger !== triggerName) return

        this.checkEmitListeners(currentTask.id)
        
        if(this.taskIndex == 6) console.log(currentTask)
        this.assistant.showCurrentTask(currentTask)

        // Automatically prep next task for the next trigger
        this.taskIndex++
    }

    checkEmitListeners(id) {
        switch(id) {
            case 'expandMotherboard':
                this.eventBus.emit('addMotherboardHighlight', "ASRock X570 PG Velocita")
            case 'expandCpu':
                this.eventBus.emit('addCpuHighlight', "AMD Ryzen 9 5900X")
            case 'expandPsu':
                this.eventBus.emit('addPsuHighlight', "EVGA Supernova 1300 P+")
            case 'buyRam':
                this.eventBus.emit('addRamHighlight', "Kingston HyperX Beast RGB DDR4")
        }
    }

    
}

export default TutorialManager