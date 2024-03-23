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

        // Display Area
        this.displayArea = new DisplayArea(this.elementHandler, this.utilityTool)

        // User
        this.user = new User()

        // Inventory
        this.inventory = new Inventory(this.elementHandler, this.utilityTool, this.displayArea, this.canvas)

        // Shop
        this.shop = new Shop(this.elementHandler, this.utilityTool, this.inventory)

        // Wires Tab
        this.wiresTab = new WiresTab(this.elementHandler, this.utilityTool)

        // Canvas
        this.canvas = new Canvas(this.elementHandler, this.utilityTool, this.displayArea)

        // UI 

    }

    start() {
        // main code here
        this.shop.init()
        this.canvas.init()      
    }

}

const game = new Main()
game.start()
