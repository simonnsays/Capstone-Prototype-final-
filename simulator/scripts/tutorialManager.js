import tasks from "../assistant/tasks.js"
class TutorialManager {
    constructor(eventBus) {
        this.eventBus = eventBus
        this.tasks = tasks
        this.taskIndex = 0
    }
    
    init() {
        this.subscribeToEvents()

        this.eventBus.emit('tutManagerInit', this.tasks[this.taskIndex])
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
            // This is saying that we are currently in step[buyRama]
            const ramTask = tasks.find(task => task.condition)
            ramTask.condition.amount++
            if(ramTask.condition.amount == ramTask.condition.amountRequired) {
                this.tryToAdvance('ramBought')
            }
        })
    }

    tryToAdvance(triggerName = null) {
        if(triggerName === 'cpuExpanded') {
            console.log('step' + this.taskIndex)
        }
        const currentTask = this.tasks[this.taskIndex]

        if (!currentTask) return
        if (currentTask.trigger && currentTask.trigger !== triggerName) return

        // Succeed to advance
        this.emitTaskId(currentTask.id)
        this.eventBus.emit('taskAdvanced', currentTask)
        
        // Automatically prep next task for the next trigger
        this.taskIndex++
    }

    emitTaskId(id) {
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