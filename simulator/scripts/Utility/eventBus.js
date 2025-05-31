class EventBus {
    constructor() {
        this.listeners = {}
    }

    on(event, callback) {
        if(!this.listeners[event]) this.listeners[event] = []
        this.listeners[event].push(callback)
    }

    emit(event, data) {
        // console.log(event)
        // if(data)console.log(data)
        if(!this.listeners[event]) return
        (this.listeners[event] || []).forEach(callback => callback(data))
    }
}

export default EventBus