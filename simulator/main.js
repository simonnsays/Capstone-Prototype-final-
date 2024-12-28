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
        this.pcUnit = new PCUnit(
            this.utilityTool, 
            this.displayArea, 
            this.canvas, 
            this.portsTab, 
            this.drawer)

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

        this.inventory.update()
        this.displayArea.update()

        // connect cables
        console.log(this.displayArea.table.component)
    }
}

const game = new Main()
game.start()