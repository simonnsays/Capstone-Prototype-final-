import UtilityTool from "./scripts/Utility/utilityTool.js"
import ElementHandler from "./scripts/Utility/elementHandler.js"
import User from "./scripts/user.js"
import Canvas from "./scripts/canvas.js"
import Shop from "./scripts/Tabs/shop.js"
import Inventory from "./scripts/Tabs/inventory.js"
import WiresTab from "./scripts/Tabs/wiresTab.js"
import DisplayArea from "./scripts/displayArea.js"

class Main {
    constructor() {
        // Utility Modules
        this.elementHandler = new ElementHandler()
        this.utilityTool = new UtilityTool()

        // User
        this.user = new User(this.utilityTool)

        // Wires Tab
        this.wiresTab = new WiresTab(this.elementHandler, this.utilityTool)

        // Display Area
        this.displayArea = new DisplayArea(this.elementHandler, this.utilityTool, this.wiresTab)
        
        // Inventory
        this.inventory = new Inventory(this.elementHandler, this.utilityTool, this.displayArea)

        // Shop
        this.shop = new Shop(this.elementHandler, this.utilityTool, this.inventory)

        // Prevent Canvas Interaction when tabs are open
        window.addEventListener('mousedown', () => this.handleMouseDown())

        // Canvas
        this.canvas = new Canvas(this.elementHandler, this.utilityTool, this.displayArea, this.user)
    }

    handleMouseDown() {
        // prevent use of canvas when tabs are open
        if(this.shop.isActive || 
            this.inventory.isActive || 
            this.wiresTab.isActive || 
            this.wiresTab.drawer.isActive) {
                this.canvas.isActive = false
            } else {
                this.canvas.isActive = true
            }
    }

    start() {
        // main code here
        this.shop.init()
        this.canvas.animate()    
    }

}

const game = new Main()
game.start()
