class DomElements {
    constructor() {
        // ASSISTANT DOM ELEMENTS
        this.asstContainer = document.querySelector('.assistant-container')
        this.asstImageContainer = document.querySelector('.assistant-image-container')
        this.asstPulse = document.querySelector('#pulse')
        this.asstImage = document.querySelector('.assistant-image')
        this.asstInfoContainer = document.querySelector('.assistant-info-container')
        this.asstModal = document.querySelector('.assistant-modal')

    }

    // ASSISTANT METHODS
    getAsstContainer() {
        return this.asstContainer
    }

    getAsstImgContianer() {
        return this.invItemsContainer
    }

    getAsstPulse() {
        return this.asstPulse
    }

    getAsstImage() {
        return this.asstImage
    }

    getAsstInfo() {
        return this.asstInfoContainer
    }

    getAsstModal() {
        return this.asstModal
    }    
}

export default DomElements  