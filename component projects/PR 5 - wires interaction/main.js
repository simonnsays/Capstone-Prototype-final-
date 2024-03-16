import UtilityTool from "./scripts/utilityTool.js"
import ElementHandler from "./scripts/elementHandler.js"
import User from "./scripts/user.js"
import Canvas from "./scripts/canvas.js"
import Shop from "./scripts/shop.js"
import Inventory from "./scripts/inventory.js"

class Main {
    constructor() {
        // Utility Modules
        this.elementHandler = new ElementHandler()
        this.utilityTool = new UtilityTool()

        // Canvas
        this.canvas = new Canvas(this.elementHandler, this.utilityTool)

        // User
        this.user = new User()

        // Shop
        this.shop = new Shop(this.elementHandler, this.utilityTool)

        // Inventory
        this.inventory = new Inventory(this.elementHandler, this.utilityTool)

        // Display Area
        this.displayArea = {area: {x: 10, y: 10, width: 650, height: 660}, component: null}

        // Shelf
        this.shelf = [
            {area: {x: 670, y: 10, width: 300, height: 210}, component: null},
            {area: {x: 980, y: 10, width: 310, height: 210}, component: null},
        
            {area: {x: 670, y: 230, width: 300, height: 220}, component: null},
            {area: {x: 980, y: 230, width: 310, height: 220}, component: null},
        
            {area: {x: 670, y: 460, width: 300, height: 210}, component: null},
            {area: {x: 980, y: 460, width: 310, height: 210}, component: null},
        ]

        
    }

    start() {
        // main code here
        this.canvas.animate(this.displayArea, this.shelf)
    }

}

const game = new Main()
game.start()
