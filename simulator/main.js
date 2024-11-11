import UtilityTool from "./scripts/Utility/utilityTool.js"
import ElementHandler from "./scripts/Utility/elementHandler.js"
import User from "./scripts/user.js"
import Canvas from "./scripts/canvas.js"
import Shop from "./scripts/Tabs/shop.js"
import Inventory from "./scripts/Tabs/inventory.js"
import PortsTab from "./scripts/Tabs/portsTab.js"
import DisplayArea from "./scripts/displayArea.js"
import BootUpTab from "./scripts/Tabs/bootUpTab.js"
import PCUnit from "./scripts/Data/pcUnit.js"
import Assistant from "./assistant/assistant.js"

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
            this.utilityTool
        )
        
        // Boot Up Tab
        this.bootUpTab = new BootUpTab(
            this.elementHandler, 
            this.utilityTool, 
        )

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
            this.displayArea)

        // Shop
        this.shop = new Shop(
            this.elementHandler, 
            this.utilityTool, 
            this.inventory, 
            this.itemInfo
        )

        this.assistant = new Assistant(this.elementHandler)

        // Prevent Canvas Interaction when tabs are open
        window.addEventListener('mousedown', () => this.handleMouseDown())

        // Canvas
        this.canvas = new Canvas(
            this.elementHandler, 
            this.utilityTool, 
            this.displayArea, 
            this.user,
            this.inventory
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
    }
}

const game = new Main()
game.start()