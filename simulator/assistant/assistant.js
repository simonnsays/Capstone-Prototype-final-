class Assistant {
    constructor(elementHandler) {
        // DOM ELEMENTS
        const elements = elementHandler.getAssistantElements();
        this.container = elements.container;
        this.imageContainer = elements.imageContainer;
        this.pulse = elements.pulse;
        this.image = elements.image;
        this.infoContainer = elements.infoContainer;
        this.modal = elements.modal;

        // TUTORIAL STEP BY STEPS
        this.tasks = [{ title: '', description: '' }];

        this.notifCount = 1;
    }

    isInArea(area, mouse) {
        if (!area) return false; // Guard clause for undefined area
        let point = { x: mouse.clientX, y: mouse.clientY };
        let rect = area.getBoundingClientRect();

        return (
            point.x > rect.x &&
            point.x < rect.x + rect.width &&
            point.y > rect.y &&
            point.y < rect.y + rect.height
        );
    }

    handlePulseEvent() {
        if (this.notifCount > 0) {
            this.pulse?.classList.add('pulse');
            this.image?.classList.add('img-rltv');
        } else {
            this.pulse?.classList.remove('pulse');
            this.image?.classList.remove('img-rltv');
        }
    }

    handleMouseHover(e) {
        if (this.isInArea(this.container, e)) {
            this.notifCount = 0;
            this.container?.classList.add('extended');
            this.container?.addEventListener('transitionend', () => {
                setTimeout(() => {
                    this.infoContainer?.classList.remove('hidden');
                }, 0);
            });
        } else {
            this.notifCount = 1;
            this.container?.classList.remove('extended');
            this.infoContainer?.classList.add('hidden');
        }
    }

    asstInit() {
        window.addEventListener('mousemove', (e) => {
            this.handlePulseEvent();
            this.handleMouseHover(e);
        });

        this.container?.addEventListener('click', () => {
            if (this.modal) {
                this.modal.showModal ? this.modal.showModal() : this.modal.style.display = 'block';
            }
        });

        window.addEventListener('click', (e) => {
            if (!this.isInArea(this.modal, e)) {
                if (this.modal && this.modal.close) {
                    this.modal.close();
                } else if (this.modal) {
                    this.modal.style.display = 'none';
                }
            }
        });
    }
}

export default Assistant;
