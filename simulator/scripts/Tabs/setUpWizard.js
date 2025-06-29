class SetupWizard {
    constructor(eventBus) {
        this.eventBus = eventBus
        this.element = document.getElementById('setupWizard')
        this.openBtn = document.querySelector('#openWizard')
        this.stepPrice = this.element.querySelector('.step-price-range');
        this.stepBuild = this.element.querySelector('.step-build-type');
        this.buildOptions = this.element.querySelectorAll('.build-option');
        this.nextBtn = document.getElementById('nextStep');
        this.prevBtn = document.getElementById('prevStep');
        this.state = {
            buildType: null,
            preferences: {}
        }
        this.openBtn.addEventListener('click', () => {
            this.showSetupWizard()
        })

        this.stepPrice.style.display = 'none';
        this.prevBtn.style.display = 'none';
        this.nextBtn.disabled = true;

        // Build type selection
        this.buildOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                this.buildOptions.forEach(opt => opt.classList.remove('selected'));
                e.currentTarget.classList.add('selected');
                this.state.buildType = e.currentTarget.dataset.type;
                this.nextBtn.disabled = false;
            });
        });

        // Next / Finish
        this.nextBtn.addEventListener('click', () => {
            if (this.stepBuild.style.display !== 'none') {
                // if (!this.state.buildType) return;

                this.stepBuild.style.display = 'none';
                this.stepPrice.style.display = 'block';
                this.prevBtn.style.display = 'inline-block';
                this.nextBtn.textContent = 'Finish';
            } else {
                this.element.close();
                // this.assistant.init();
                this.eventBus.emit('setupWizard')
                this.eventBus.emit('filterSet', this.state.buildType)

                this.stepBuild.style.display = 'block';
                this.stepPrice.style.display = 'none';
                this.prevBtn.style.display = 'none';
                this.nextBtn.textContent = 'Next';

            }
        });

        // Previous
        this.prevBtn.addEventListener('click', () => {
            this.stepPrice.style.display = 'none';
            this.stepBuild.style.display = 'block';
            this.prevBtn.style.display = 'none';
            this.nextBtn.textContent = 'Next';
        });
    }
    
    showSetupWizard() {
        if (!this.element) return;

        const minPriceInput = document.getElementById('minPriceInput');
        const maxPriceInput = document.getElementById('maxPriceInput');
        const minRange = document.getElementById('minRange');
        const maxRange = document.getElementById('maxRange');
        const track = document.querySelector('.range-track');
        // Collect inputs
        const updateFromSliders = () => {
            const min = parseInt(minRange.value);
            const max = parseInt(maxRange.value);
            minPriceInput.value = min;
            maxPriceInput.value = max;
            updateTrack(min, max);
            
            this.eventBus.emit('priceRangeChanged', {min: min , max: max})
            // this.shop.setPriceRange(min, max);
        };

        // Update inputs and update range
        const updateFromInputs = () => {
            let min = parseInt(minPriceInput.value);
            let max = parseInt(maxPriceInput.value);
            if (min > max) [min, max] = [max, min];
            minRange.value = min;
            maxRange.value = max;
            updateTrack(min, max);

            this.eventBus.emit('priceRangeChanged', {min: min , max: max})
            // this.shop.setPriceRange(min, max);
        };

        // Update track UI
        const updateTrack = (min, max) => {
            const maxRange = 100000
            const minPercent = (min / maxRange) * 100;
            const maxPercent = (max / maxRange) * 100;
            track.style.background = `
                    linear-gradient(
                        to right,
                        #ccc ${minPercent}%,
                        var(--light-lime) ${minPercent}%,
                        var(--light-lime) ${maxPercent}%,
                        #ccc ${maxPercent}%
                    )
                `;        
            };

        // Bind input listeners once
        minRange.addEventListener('input', updateFromSliders);
        maxRange.addEventListener('input', updateFromSliders);
        minPriceInput.addEventListener('input', updateFromInputs);
        maxPriceInput.addEventListener('input', updateFromInputs);

        // Initialize track and values
        updateFromSliders();

        this.element.showModal();
    }
}

export default SetupWizard