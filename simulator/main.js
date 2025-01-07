import UtilityTool from "./scripts/Utility/utilityTool.js"
import ElementHandler from "./scripts/Utility/elementHandler.js"
import User from "./scripts/user.js"
import Canvas from "./scripts/canvas.js"
import Shop from "./scripts/Tabs/shop.js"
import Inventory from "./scripts/Tabs/inventory.js"
import PortsTab from "./scripts/Tabs/portsTab.js"
import DisplayArea from "./scripts/displayArea.js"
import BootUpTab from "./scripts/Tabs/bootUpTab.js"
import Assistant from "./assistant/assistant.js"
import PCUnit from "./scripts/Data/pcUnit.js"
import wattageCalculator from "./scripts/Data/wattageCalculator.js"
import components from "./scripts/Data/data.js"
class Main {
    constructor() {
        // Utility Modules
        this.elementHandler = new ElementHandler()
        this.utilityTool = new UtilityTool()

        // User
        this.user = new User(this.utilityTool)

        // Item Info Modal
        this.itemInfo = this.elementHandler.getItemInfoElements()

        // Wires Tab
        this.portsTab = new PortsTab(
            this.elementHandler, 
            this.utilityTool, 
            this.pcUnit)

        // PC Unit
        // this.pcUnit = new PCUnit(
        //     this.utilityTool, 
        //     this.displayArea, 
        //     this.canvas, 
        //     this.portsTab, 
        //     this.drawer)

        // Boot Up Tab
        this.bootUpTab = new BootUpTab(
            this.elementHandler, 
            this.utilityTool, 
            this.pcUnit, 
            this.portsTab, 
            this.drawer)

        // Display Area
        this.displayArea = new DisplayArea(
            this.elementHandler, 
            this.utilityTool, 
            this.portsTab, 
            this.bootUpTab,
            this.user
        )
        
        // Inventory
        this.inventory = new Inventory(
            this.elementHandler, 
            this.utilityTool, 
            this.displayArea
            )

        // Shop
        this.shop = new Shop(
            this.elementHandler, 
            this.utilityTool, 
            this.inventory, 
            this.itemInfo)

        //Assistant
        this.assistant = new Assistant(this.elementHandler)

        // Prevent Canvas Interaction when tabs are open
        window.addEventListener('mousedown', () => this.handleMouseDown())

        // Wattage Calculator
        this.wattageCalculator = new wattageCalculator(this.displayArea, this.canvas)
        // Prevent Canvas Interaction when tabs are open
        window.addEventListener('mousedown', () => this.handleMouseDown())

        // Canvas
        this.canvas = new Canvas(
            this.elementHandler, 
            this.utilityTool, 
            this.displayArea, 
            this.user, 
            this.inventory,
            this.wattageCalculator
        )
    }

    handleMouseDown() {
        // prevent use of canvas when tabs are open
        if(this.shop.isActive || 
            this.inventory.isActive || 
            this.portsTab.isActive || 
            this.portsTab.drawer.isActive ||
            this.bootUpTab.isActive) {
                this.canvas.isActive = false
            } else {
                this.canvas.isActive = true
            }
    }

    start() {
        // main code here
        this.shop.init() 
        this.displayArea.init()
        this.canvas.animate()   
        this.assistant.asstInit() 

        // buy the full set sample
        this.buyFullSetSample()
        // this.bootUpTab.openTab()
    }

    buyFullSetSample() {
        // Sample boot up reqs
        const fullSet = this.bootUpTab.pcUnit.bootUpRequirements
        fullSet.push('ram')
        fullSet.push('storage')
        fullSet.push('storage')
        fullSet.unshift('chassis')

        
        // buy the full set
        fullSet.forEach(reqItem => {      
            const itemToBuy = this.shop.items.find(shopItem => {
                
                if(reqItem === 'cpuCooling' && shopItem.specs?.category == 'cpu' || reqItem === shopItem.type) {
                    return shopItem
                }
                return null
            } )
            this.shop.buyComponent(itemToBuy)
        })

        // place everything in motherboard first
        this.inventory.placeComponent(this.inventory.items.splice(this.inventory.items.findIndex(component => component.type === 'motherboard'),1)[0])
        this.inventory.placeComponent(this.inventory.items.splice(this.inventory.items.findIndex(component => component.type === 'ram'),1)[0])
        this.inventory.placeComponent(this.inventory.items.splice(this.inventory.items.findIndex(component => component.type === 'ram'),1)[0])
        this.inventory.placeComponent(this.inventory.items.splice(this.inventory.items.findIndex(component => component.type === 'cpu'),1)[0])
        this.inventory.placeComponent(this.inventory.items.splice(this.inventory.items.findIndex(component => component.type === 'cooling'),1)[0])
        this.inventory.placeComponent(this.inventory.items.splice(this.inventory.items.findIndex(component => component.type === 'gpu'),1)[0])

        // attach components to motherboard
        this.displayArea.table.component.slots.forEach(slot => {
            if(slot.type == 'ram' && this.displayArea.shelf.some(spot => spot.component && spot.component.type == 'ram')) {
                this.displayArea.attachComponent(this.displayArea.shelf.find(spot => spot.component && spot.component.type == 'ram').component, slot)
            }
            if(slot.type == 'cpu' && this.displayArea.shelf.some(spot => spot.component && spot.component.type == 'cpu')) {
                this.displayArea.attachComponent(this.displayArea.shelf.find(spot => spot.component && spot.component.type == 'cpu').component, slot)
            }
            if(slot.type == 'cooling' && this.displayArea.shelf.some(spot => spot.component && spot.component.type == 'cooling')) {
                this.displayArea.attachComponent(this.displayArea.shelf.find(spot => spot.component && spot.component.type == 'cooling').component, slot)
            }
            if(slot.type == 'gpu' && this.displayArea.shelf.some(spot => spot.component && spot.component.type == 'gpu')) {
                this.displayArea.attachComponent(this.displayArea.shelf.find(spot => spot.component && spot.component.type == 'gpu').component, slot)
            }
        })

        // place other components
        this.inventory.items.forEach(item => {
            this.inventory.placeComponent(item)
        })
        this.inventory.items = []
        
        // swap chassis to table
        this.displayArea.swapComponents(this.displayArea.shelf.find(spot => spot.component && spot.component.type === 'chassis').component)

        this.displayArea.table.component.slots.forEach(slot =>  {
            if(slot.type == 'motherboard' && this.displayArea.shelf.some(spot => spot.component && spot.component.type == 'motherboard')) {
                this.displayArea.attachComponent(this.displayArea.shelf.find(spot => spot.component && spot.component.type == 'motherboard').component, slot)
            }
            if(slot.type == 'storage' && this.displayArea.shelf.some(spot => spot.component && spot.component.type == 'storage')) {
                this.displayArea.attachComponent(this.displayArea.shelf.find(spot => spot.component && spot.component.type == 'storage').component, slot)
            }
            if(slot.type == 'psu' && this.displayArea.shelf.some(spot => spot.component && spot.component.type == 'psu')) {
                this.displayArea.attachComponent(this.displayArea.shelf.find(spot => spot.component && spot.component.type == 'psu').component, slot)
            }
        }) 

        this.connectedCables()
        
        this.inventory.update()
        this.displayArea.update()
        // this.bootUpTab.pcUnit.powerOff()
        // this.bootUpTab.pcUnit.attemptPowerOn(this.displayArea.table.component)
    }

    connectedCables() {
        this.bootUpTab.pcUnit.fillComponentStatus(this.displayArea.table.component)
        // connect cables
        let motherboardPortsGroup = this.portsTab.portGroups.find(group => group.component === 'motherboard')
        let psuPortsGroup = this.bootUpTab.pcUnit.componentsStatus.psu.component
        let storageTwoPorts = this.portsTab.portGroups.find(group => group.component === 'storage')
        let storageOnePorts = this.portsTab.portGroups.find(group => group.component === 'storage' && group.id !== storageTwoPorts.id)
        let gpuPortsGroup = this.portsTab.portGroups.find(group => group.component === 'gpu')

        /////////////// MOTHERBOARD to PSU
        // connect ATX cables
        // to mobo
        const atxCable = this.portsTab.drawer.cables.find(cable => cable.type === '24-pin-power')
        let motherboardAtxPort = motherboardPortsGroup.ports.find(port => port.type === '24-pin-power')
        this.portsTab.attachCable(motherboardAtxPort.offsets[0], atxCable)
        // to  psu
        const psuATXPort = psuPortsGroup.ports.find(port => port.type === '24-pin-power')
        this.portsTab.attachCable(psuATXPort.offsets[0], atxCable)

        // connect cpu power cables
        const motherboardCPUPort = motherboardPortsGroup.ports.find(port => port.type === '8-pin-power')
        motherboardCPUPort.offsets.forEach(offset => {
            const cpuCable = this.portsTab.drawer.cables.find(cable => cable.type === '8-pin-power' && !cable.ends['motherboard'].connected)
            this.portsTab.attachCable(offset, cpuCable)
        })
        const psuCPUPort = psuPortsGroup.ports.find(port => port.type === '8-pin-power')
        psuCPUPort.offsets.forEach(offset => {
            const cpuCable = this.portsTab.drawer.cables.find(cable => cable.type === '8-pin-power' && cable.ends['psu'].connected)
            this.portsTab.attachCable(offset, cpuCable)
        })


        /////////////// MOTHERBOARD TO STORAGE
        // connect sata data
        motherboardPortsGroup.ports.forEach(port => {
            if(port.type === 'sata-data') {
                const sataDataCable = this.portsTab.drawer.cables.find(cable => cable.type === 'sata-data' && !cable.ends['motherboard'].connected) 
                if(sataDataCable) {
                    this.portsTab.attachCable(port.offsets[0], sataDataCable)
                }
            }
        })
        storageOnePorts.ports.forEach(port => {
            const sataDataCable = this.portsTab.drawer.cables.find(cable => cable.type === 'sata-data' && !cable.ends['storage'].connected)
            this.portsTab.currentGroupPage = this.portsTab.portGroups.find(group => group.id === storageOnePorts.id)
            this.portsTab.attachCable(port.offsets[0], sataDataCable)
        })
        storageTwoPorts.ports.forEach(port => {
            const sataDataCable = this.portsTab.drawer.cables.find(cable => cable.type === 'sata-data' && !cable.ends['storage'].connected) 
            this.portsTab.currentGroupPage = this.portsTab.portGroups.find(group => group.id === storageOnePorts.id)
            this.portsTab.attachCable(port.offsets[0], sataDataCable)
        })

        // connect sata power
        this.portsTab.currentGroupPage = this.portsTab.portGroups.find(group => group.id === psuPortsGroup.id)
        psuPortsGroup.ports.forEach(port => {
            if(port.type === 'sata-power') {
                const sataPowerCable = this.portsTab.drawer.cables.find(cable => cable.type === 'sata-power' && !cable.ends['psu'].connected) 
                if(sataPowerCable) {
                    this.portsTab.attachCable(port.offsets[0], sataPowerCable)
                }
            }
        })
        storageOnePorts.ports.forEach(port => {
            const sataPowerCable = this.portsTab.drawer.cables.find(cable => cable.type === 'sata-power' && !cable.ends['storage'].connected)
            this.portsTab.currentGroupPage = this.portsTab.portGroups.find(group => group.id === storageOnePorts.id)
            this.portsTab.attachCable(port.offsets[1], sataPowerCable)
        })
        storageTwoPorts.ports.forEach(port => {
            const sataPowerCable = this.portsTab.drawer.cables.find(cable => cable.type === 'sata-power' && !cable.ends['storage'].connected) 
            this.portsTab.currentGroupPage = this.portsTab.portGroups.find(group => group.id === storageOnePorts.id)
            this.portsTab.attachCable(port.offsets[1], sataPowerCable)
        })

        /////////////// MOTHERBOARD TO FRONT PANEL
        this.portsTab.currentGroupPage = this.portsTab.portGroups.find(group => group.component === 'motherboard')
        const frontPanelPort = motherboardPortsGroup.ports.find(port => port.type === 'frontPanel')
        const panelCable = this.portsTab.drawer.cables.find(cable => cable.type === 'frontPanel')
        this.portsTab.attachCable(frontPanelPort.offsets[0], panelCable)

        /////////////// MOTHERBOARD TO COOLING
        const coolingPort = motherboardPortsGroup.ports.find(port => port.type === 'cooling')
        const coolingCable = this.portsTab.drawer.cables.find(cable => cable.type === '3-pin-cooling')
        this.portsTab.attachCable(coolingPort.offsets[0], coolingCable)

        /////////////// PSU TO GPU
        // connect to psu
        this.portsTab.currentGroupPage = this.portsTab.portGroups.find(group => group.id === psuPortsGroup.id)
        const gpuPortPsu = psuPortsGroup.ports.find(port => port.type === '8-pin-pcie')
        const gpuCablePsu = this.portsTab.drawer.cables.find(cable => cable.type === '8-pin-pcie')
        this.portsTab.attachCable(gpuPortPsu.offsets[0], gpuCablePsu)
        // connect to gpu
        this.portsTab.currentGroupPage = this.portsTab.portGroups.find(group => group.id === gpuPortsGroup.id)
        const gpuPortGpu = gpuPortsGroup.ports.find(port => port.type === '8-pin-pcie')
        const gpuCableGpu = this.portsTab.drawer.cables.find(cable => cable.type === '8-pin-pcie')
        this.portsTab.attachCable(gpuPortGpu.offsets[0], gpuCableGpu)

    }
}

const game = new Main()
game.start()