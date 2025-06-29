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
import wattageCalculator from "./scripts/Data/wattageCalculator.js"
import chatbot from "./scripts/Data/chatbot.js"
import EventBus from "./scripts/Utility/eventBus.js"
import TutorialManager from "./scripts/tutorialManager.js"
import SetupWizard from "./scripts/Tabs/setUpWizard.js"
class Main {
    constructor() {
        // Utility Modules
        this.elementHandler = new ElementHandler()
        this.utilityTool = new UtilityTool()
        // User
        this.user = new User(this.utilityTool)
        // Item Info Modal
        this.itemInfo = this.elementHandler.getItemInfoElements()
        // Event Bus
        this.eventBus = new EventBus()

        // Boot Up Tab
        this.bootUpTab = new BootUpTab(
            this.elementHandler, 
            this.utilityTool, 
            this.eventBus,
            this)

       // Wires Tab
        this.portsTab = new PortsTab(
            this.elementHandler, 
            this.utilityTool, 
            this.eventBus,
            this.bootUpTab)
            
        // Display Area
        this.displayArea = new DisplayArea(
            this.elementHandler, 
            this.utilityTool,
            this.eventBus, 
            this.portsTab, 
            this.bootUpTab,
            this.user
        )
        
        // Inventory
        this.inventory = new Inventory(
            this.elementHandler, 
            this.utilityTool,
            this.eventBus, 
            this.displayArea
            )

        // Shop
        this.shop = new Shop(
            this.elementHandler, 
            this.utilityTool, 
            this.eventBus,
            this.inventory, 
            this.itemInfo)

        //Assistant
        this.assistant = new Assistant(this,this.elementHandler, this.utilityTool, this.eventBus)

        // Tutorial Manager
        this.tutorialManager = new TutorialManager(this.eventBus, this.assistant)

        // Wattage Calculator
        this.wattageCalculator = new wattageCalculator(this.displayArea, this.canvas)

        // Canvas
        this.canvas = new Canvas(
            this.elementHandler, 
            this.utilityTool, 
            this.eventBus,
            this.displayArea, 
            this.user, 
            this.inventory,
            this.wattageCalculator
        )
        
        // Chatbot
        this.chatbot = new chatbot(
            this.eventBus,
            this.pcUnit,
            this.portsTab,
            this.bootUpTab,
            this.drawer,
            this.inventory,
            this.shop,
            this
        )

        // setup wizard
        this.setupWizard = new SetupWizard(this.eventBus);
        
  
        // Prevent Canvas Interaction when tabs are open
        window.addEventListener('mousedown', () => this.handleMouseDown())
    }

    handleMouseDown() {
        // prevent use of canvas when tabs are open
        if( this.displayArea.trashBin.isActive ||
            this.assistant.fullElement.isActive ||
            this.portsTab.drawer.isActive ||
            this.bootUpTab.isActive ||
            this.inventory.isActive || 
            this.portsTab.isActive || 
            this.shop.isActive ||
            this.chatbot.isActive 
        ) {
                this.canvas.isActive = false
            } else {
                this.canvas.isActive = true
            }
    }

    start() { 
        // main code here
        this.shop.init() 
        this.inventory.init()
        this.portsTab.init()
        this.bootUpTab.init()
        this.displayArea.init()
        this.canvas.animate()
        this.assistant.init()
        this.chatbot.init()
        
        document.addEventListener("DOMContentLoaded", () => {
            this.tutorialManager.init()
        });
    }

    resetBuild() {
        // Clear table and shelf
        if (this.displayArea) {
            this.displayArea.table.component = null;
            this.displayArea.shelf.forEach(spot => spot.component = null);
            this.displayArea.update();
        }

        // Clear inventory
        if (this.inventory) {
            this.inventory.items = [];
            this.inventory.update();
        }

        // Reset boot tab state
        if (this.bootUpTab && this.bootUpTab.pcUnit) {
            // Reset PCUnit state
            this.bootUpTab.pcUnit.power = 'off';
            this.bootUpTab.pcUnit.reports = [];
            // Reset component status
            for (let key in this.bootUpTab.pcUnit.componentsStatus) {
                if (Array.isArray(this.bootUpTab.pcUnit.componentsStatus[key])) {
                    this.bootUpTab.pcUnit.componentsStatus[key] = [];
                } else {
                    this.bootUpTab.pcUnit.componentsStatus[key] = null;
                }
            }
            // Remove any error overlays or modals
            this.bootUpTab.clearReportsArea?.();
            this.bootUpTab.closeTab?.();
            this.bootUpTab.pcUnit.powerOffMonitor()
        }

        // Reset ports/wires
        if (this.portsTab && typeof this.portsTab.reset === 'function') {
            this.portsTab.reset();
        } 

        // Reset wattage calculator
        if (this.wattageCalculator && typeof this.wattageCalculator.reset === 'function') {
            this.wattageCalculator.reset();
        }

        // Reset chatbot
        if (this.chatbot) {
            this.chatbot.clearMessages();
        }

        // Reset canvas 
        if( this.canvas && typeof this.canvas.reset === 'function') {
            this.canvas.reset();
        }

        this.shop.compatibilityFilters = {
            buildType: null,
            motherboard: null,
            cpu: null,
            ram: null,
            gpu: null,
            psu: null,
            storage: null,
            chassis: null,
            cooling: null,
        };

        // Hide power notification banner
        const powerBanner = document.getElementById('powerNotification');
        if (powerBanner) powerBanner.classList.add('hidden');

        // Update UI
        if (this.displayArea) this.displayArea.update();
        if (this.inventory) this.inventory.update();
    }

    

    addBasicComponents() {
        const itemsToBuy = []
        //console.log(this.shop.items)
        itemsToBuy.push(this.shop.items.find(item => item.name == 'NZXT H5 Flow'))
        itemsToBuy.push(this.shop.items.find(item => item.name == 'B550 Aorus Elite v2'))
        itemsToBuy.push(this.shop.items.find(item => item.name == 'AMD Ryzen 7 5700G'))
        itemsToBuy.push(this.shop.items.find(item => item.name == 'EVGA Supernova 1300 P+'))
        itemsToBuy.push(this.shop.items.find(item => item.name == 'Kingston HyperX Beast RGB DDR4'))
        //itemsToBuy.push(this.shop.items.find(item => item.name == 'Kingston HyperX Beast RGB DDR4'))
        itemsToBuy.push(this.shop.items.find(item => item.name == 'Seagate Barracuda SSD'))
        //itemsToBuy.push(this.shop.items.find(item => item.name == 'Samsung 970 EVO Plus'))
        itemsToBuy.push(this.shop.items.find(item => item.name == 'AMD wraith Prism'))
        itemsToBuy.push(this.shop.items.find(item => item.name == 'Gigabyte Radeon RX 7900 XTX'))

        itemsToBuy.forEach(item => {
            let shopItem = this.shop.items.find(shopItem => shopItem.name === item.name)
            this.shop.buyComponent(shopItem)
        })
        //this.shop.buyComponent(this.shop.items[0    ])
        
        //console.log(this.inventory.items)
        for(let i=0; i <= 6 && this.inventory.items.length >0; i++) {
            const item = this.inventory.items[0]
            this.inventory.placeComponent(item)
            this.inventory.items.splice(0, 1) // at position 0, remove 1 item
        }
        this.inventory.update()
        this.displayArea.update()
        // this.inventory.placeComponent(this.inventory.items[0])
        // this.inventory.placeComponent(this.inventory.items[1])
        // this.inventory.placeComponent(this.inventory.items[3])
        // this.inventory.placeComponent(this.inventory.items[4])
        // this.inventory.placeComponent(this.inventory.items[5])
        // this.inventory.update()
        // this.displayArea.update()
        
        // this.inventory.placeComponent(this.inventory.items.splice(this.inventory.items.findIndex(component => component.type === 'motherboard'),1)[0])
        // this.inventory.placeComponent(this.inventory.items.splice(this.inventory.items.findIndex(component => component.type === 'ram'),1)[0])
        // this.inventory.placeComponent(this.inventory.items.splice(this.inventory.items.findIndex(component => component.type === 'ram'),1)[0])
        // this.inventory.placeComponent(this.inventory.items.splice(this.inventory.items.findIndex(component => component.type === 'cpu'),1)[0])
        // this.inventory.placeComponent(this.inventory.items.splice(this.inventory.items.findIndex(component => component.type === 'cooling'),1)[0])
        // this.inventory.placeComponent(this.inventory.items.splice(this.inventory.items.findIndex(component => component.type === 'gpu'),1)[0])
    }

}

const game = new Main()
window.main = game // make game accessible globally
game.start()
