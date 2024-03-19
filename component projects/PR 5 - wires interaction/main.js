import UtilityTool from "./scripts/Utility/utilityTool.js"
import ElementHandler from "./scripts/Utility/elementHandler.js"
import User from "./scripts/user.js"
import Canvas from "./scripts/canvas.js"
import Shop from "./scripts/Tabs/shop.js"
import Inventory from "./scripts/Tabs/inventory.js"
import WiresTab from "./scripts/Tabs/wiresTab.js"

class Main {
    constructor() {
        // Utility Modules
        this.elementHandler = new ElementHandler()
        this.utilityTool = new UtilityTool()

        // Table
        this.table = {
            // Display Area
            displayArea :{area: {x: 10, y: 10, width: 650, height: 660}, component: null},
            shelf: [
                {area: {x: 670, y: 10, width: 300, height: 210}, component: null},
                {area: {x: 980, y: 10, width: 310, height: 210}, component: null},
            
                {area: {x: 670, y: 230, width: 300, height: 220}, component: null},
                {area: {x: 980, y: 230, width: 310, height: 220}, component: null},
            
                {area: {x: 670, y: 460, width: 300, height: 210}, component: null},
                {area: {x: 980, y: 460, width: 310, height: 210}, component: null},
            ]
        }

        // User
        this.user = new User()

        // Inventory
        this.inventory = new Inventory(this.elementHandler, this.utilityTool, this.table)

        // Shop
        this.shop = new Shop(this.elementHandler, this.utilityTool, this.inventory)

        // Wires Tab
        this.wiresTab = new WiresTab(this.elementHandler, this.utilityTool)

         // Canvas
         this.canvas = new Canvas(this.elementHandler, this.utilityTool)

        //  Drag and Drop Manager
    }

    start() {
        // main code here
        this.canvas.animate(this.table)
        this.shop.init()
    }

}

const game = new Main()
game.start()
