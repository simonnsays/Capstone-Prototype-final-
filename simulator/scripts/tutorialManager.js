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

        ['tabsMenuOpened', 'shopOpened'].forEach(event => {
            this.eventBus.on(event, () => this.tryToAdvance(event))  
        })

        // this.eventBus.on('tabsMenuOpened', () => {
        //     console.log('hit')
        //     this.tryToAdvance('tabsMenuOpened')
        // })
    }

    tryToAdvance(triggerName = null) {
        const currentTask = this.tasks[this.taskIndex]
        console.log(currentTask)

        if (!currentTask) return

        if (currentTask.trigger && currentTask.trigger !== triggerName) {
            return // Wait for correct trigger
        }

        // Proceed with showing the task
        if (currentTask.highlight) {
            this.assistant.highlightCurrentTask(currentTask.highlight)
        }

        this.assistant.showCurrentTask(currentTask)
        // this.assistant.updateMiniDsiplay(currentTask)

        // Automatically prep next task for the next trigger
        this.taskIndex++
    }

    
}

export default TutorialManager