class PCUnit {
    constructor(bootUpElements) {
        this.bootUpElements = bootUpElements 
        this.power = 'off'
        this.availableUnit = null
        this.reportArea = bootUpElements.reportArea
        this.screen = bootUpElements.screen
        // this.reportArea already Initialized in bootUpTab


        // CHECKLIST:
        // - if components are complete (status)
        // - if components are compatible (compatibility)
        // - if components are working fine (defect)
        this.componentsStatus = {
            motherboard: null,
            cpu: null,
            ram: [],
            gpu: null,
            psu: null,
            storage: [],
            cpuCooling: null,
            caseCooling: []
        }

        this.bootUpRequirements = ['motherboard', 'cpu', 'ram', 'psu', 'cpuCooling', 'gpu']

        this.unitStatus = {
            PSU_TO_MOTHERBOARD: {
                compatibility: null,
                error: null
            },
            PSU_TO_CPU: {
                compatibility: null,
                error: null
            }
            // more status
        }

        this.state = ['off','on']
        this.currentState = this.state[0]

        this.reports = [
            {
                tag: 'Temperature',
                def: '71 degrees'
            },
            {
                tag: 'Wattage',
                def: '600W / 1200W'
            }
        ]
        this.reportCount = 0
    }

    checkPCState(unit) {
        // check defects and compatibility here
        this.fillComponentStatus(unit)

        let allowBoot = false
        // check for minimum boot up requirement
        const requiredComponentsArePresent = this.bootUpRequirements.every((req) => this.componentsStatus[req])

        if(requiredComponentsArePresent) {
            // proceed to check if everything is wired
        }
        
    }

    fillComponentStatus(unit) {
        switch(unit.type) {
            case 'ram':
                this.componentsStatus.ram.push(unit);
                break
            case 'storage':
                this.componentsStatus.storage.push(unit)
                break
            case 'cooling':
                if(unit.specs.category === 'cpu') this.componentsStatus.cpuCooling = unit
                if(unit.specs.category === 'chassis') this.componentsStatus.caseCooling = unit
                break
            default:
                this.componentsStatus[unit.type] = unit
        }
    
        // Recursively check slots for attached components
        unit.slots.forEach(slot => {
            if (slot.component) {
                this.fillComponentStatus(slot.component)
            }
        })    
    }

    powerOff() {
        this.power = 'off'
        this.screen.classList.remove('screen-on')
        this.clearReportsArea()
    }

    powerOn() {
        this.power = 'on'

        this.screen.classList.add('screen-on')
        
        setTimeout(() => this.report(), 500);
        
    }

    report() {
        const initialDelay = 1200
        const decreaseFactor = .75

        this.reports.forEach((report, i) => {
            const delay = initialDelay * Math.pow(decreaseFactor, i)
            setTimeout(() => this.createReportCell(report), delay)
        })
    }

    createReportCell(report) {
        const cell = document.createElement('div')
        cell.classList = 'reportCell'

        const tag = document.createElement('div')
        tag.classList = 'reportCellTag'
        tag.innerHTML = report.tag
        cell.appendChild(tag)

        const def = document.createElement('div')
        def.classList = 'reportCellDef'
        def.innerHTML = report.def
        cell.appendChild(def)

        this.reportArea.appendChild(cell)
    }

    clearReportsArea() {
        while(this.reportArea.firstChild) {
            this.reportArea.removeChild(this.reportArea.firstChild)
        }
    }

    checkIfAvailableUnit(component) {
        if(component && component.type === 'chassis') return component
        return null    
    }
}

export default PCUnit