class PCUnit {
    constructor() { 
        this.availableUnit = null
        // this.reportArea = null

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

    powerOn() {
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