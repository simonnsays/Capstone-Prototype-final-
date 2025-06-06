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
import bios from "./scripts/Data/bios.js"
import EventBus from "./scripts/Utility/eventBus.js"
import TutorialManager from "./scripts/tutorialManager.js"
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

        // Wires Tab
        this.portsTab = new PortsTab(
            this.elementHandler, 
            this.utilityTool, 
            this.eventBus,
            this.pcUnit)

        // Boot Up Tab
        this.bootUpTab = new BootUpTab(
            this.elementHandler, 
            this.utilityTool, 
            this.pcUnit,
            this.bios, 
            this.portsTab, 
            this.drawer)
      
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
            this.pcUnit,
            this.portsTab,
            this.bootUpTab,
            this.drawer,
            this.inventory,
            this.shop,
            this
        )

        // setup wizard
        this.setupWizard = document.getElementById('setupWizard');
        this.setupWizardState = {
            buildType: null,
            //budget: null, // optional if pricing of components is added
            preferences: {}
        };
  
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
        this.displayArea.init()
        this.canvas.animate()
        // this.showSetupWizard()

        this.assistant.init()
        this.tutorialManager.init()

        // console.log(this.eventBus.listeners)
        //this.assistant.endTutorial()   
        
        // TEST: BOOT UP
        //this.hideGameContainer()
        // this.testBootUp()
        //this.testFanSpeed()
        //this.testTemperature()
        //this.testBootOrder()
        // TEST: MISSING COMPONENTS
        // this.testMissingComponents()

        // TEST: TRASH BIN
        // this.testTrashBin()
        
        // TEST: ASSISTANT
        // this.assistant.openModal()

        // TEST: ADD BASIC COMPONENT
        //this.addBasicComponents()
    }
    
    hideGameContainer() {
        const gameContainer = document.querySelector('.game-container')
        gameContainer.style.visibility = "hidden"
        const labelWrapper = document.querySelector('.rotate-wrapper')
        labelWrapper.style.visibility = "hidden"
    }

    showSetupWizard() {
        if (!this.setupWizard) return;

        const stepBuild = this.setupWizard.querySelector('.step-build-type');
        const stepPrice = this.setupWizard.querySelector('.step-price-range');

        const minPriceInput = document.getElementById('minPriceInput');
        const maxPriceInput = document.getElementById('maxPriceInput');
        const minRange = document.getElementById('minRange');
        const maxRange = document.getElementById('maxRange');
        const track = document.querySelector('.range-track');
        // Collect inputs
        const updateFromSliders = () => {
            const min = parseInt(minRange.value);
            const max = parseInt(maxRange.value);
            minPriceInput.value = min;
            maxPriceInput.value = max;
            updateTrack(min, max);
            this.shop.setPriceRange(min, max);
        };

        // Update inputs and update range
        const updateFromInputs = () => {
            let min = parseInt(minPriceInput.value);
            let max = parseInt(maxPriceInput.value);
            if (min > max) [min, max] = [max, min];
            minRange.value = min;
            maxRange.value = max;
            updateTrack(min, max);
            this.shop.setPriceRange(min, max);
        };

        // Update track UI
        const updateTrack = (min, max) => {
            const maxRange = 100000
            const minPercent = (min / maxRange) * 100;
            const maxPercent = (max / maxRange) * 100;
            track.style.background = `
                    linear-gradient(
                        to right,
                        #ccc ${minPercent}%,
                        var(--light-lime) ${minPercent}%,
                        var(--light-lime) ${maxPercent}%,
                        #ccc ${maxPercent}%
                    )
                `;        
            };

        // Bind input listeners once
        minRange.addEventListener('input', updateFromSliders);
        maxRange.addEventListener('input', updateFromSliders);
        minPriceInput.addEventListener('input', updateFromInputs);
        maxPriceInput.addEventListener('input', updateFromInputs);

        // Initialize track and values
        updateFromSliders();

        // Wizard logic
        const buildOptions = this.setupWizard.querySelectorAll('.build-option');
        const nextBtn = document.getElementById('nextStep');
        const prevBtn = document.getElementById('prevStep');

        this.setupWizard.showModal();

        // Build type selection
        buildOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                buildOptions.forEach(opt => opt.classList.remove('selected'));
                e.currentTarget.classList.add('selected');
                this.setupWizardState.buildType = e.currentTarget.dataset.type;
                nextBtn.disabled = false;
            });
        });

        // Next / Finish
        nextBtn.addEventListener('click', () => {
            if (stepBuild.style.display !== 'none') {
                if (!this.setupWizardState.buildType) return;

                stepBuild.style.display = 'none';
                stepPrice.style.display = 'block';
                prevBtn.style.display = 'inline-block';
                nextBtn.textContent = 'Finish';
            } else {
                this.setupWizard.close();
                this.shop.setCompatibilityFilters(this.setupWizardState.buildType);
                this.assistant.init();
            }
        });

        // Previous
        prevBtn.addEventListener('click', () => {
            stepPrice.style.display = 'none';
            stepBuild.style.display = 'block';
            prevBtn.style.display = 'none';
            nextBtn.textContent = 'Next';
        });

        // Initial UI state
        stepBuild.style.display = 'block';
        stepPrice.style.display = 'none';
        prevBtn.style.display = 'none';
        nextBtn.disabled = true;
    }

    testBootOrder(){
        this.bootUpTab.pcUnit.componentsStatus.storage.osInstalled === false
    }

    testTemperature(){
        //this.bootUpTab.pcUnit.biosSettings.temperatures.cpu = 86
        this.bootUpTab.pcUnit.bios.biosSettings.gpuSettings.temperatures.current = 95
        //this.bootUpTab.pcUnit.biosSettings.temperatures.system = 76
    }
    testFanSpeed(){
        this.bootUpTab.pcUnit.bios.fanSpeed = 10
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

    /////////////////// TEST: BOOT UP
    testBootUp() {
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
       
        this.connectCables()
        this.testOS()
        this.inventory.update()
        this.displayArea.update()

        this.bootUpTab.powerOff()
        //this.bootUpTab.togglePower(this.displayArea.table.component)
        this.bootUpTab.openTab()
    }
    // ^^^
    connectCables() {
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
    /////////////////// TEST: OS INSTALLED
    testOS(){
        const primaryStorage = this.bootUpTab.pcUnit.componentsStatus.storage[0]
        if (primaryStorage && primaryStorage.component) {
            // check device
            primaryStorage.isPowered = true
            primaryStorage.component.specs.bootable = true
            primaryStorage.component.osInstalled = true
            primaryStorage.component.bootPriority = 0

            // check bios
            if (!this.bootUpTab.pcUnit.biosSettings) {
                this.bootUpTab.pcUnit.biosSettings = {}
            }
            
            // set boot order
            this.bootUpTab.pcUnit.biosSettings.bootOrder = [{
                device: primaryStorage.component.name,
                deviceType: primaryStorage.component.type,
                isBootable: true,
                osInstalled: true,
                isPrimary: true
            }]

            // see if second storage is active
            const secondaryStorage = this.bootUpTab.pcUnit.componentsStatus.storage[1]
            if (secondaryStorage && secondaryStorage.component) {
                secondaryStorage.isPowered = true
                secondaryStorage.component.specs.bootable = true
                secondaryStorage.component.bootPriority = 1
                
                this.bootUpTab.pcUnit.biosSettings.bootOrder.push({
                    device: secondaryStorage.component.name,
                    deviceType: secondaryStorage.component.type,
                    isBootable: true,
                    osInstalled: false,
                    isPrimary: false
                })
            }
        }
    }

    /////////////////// TEST: BOOT UP
    testMissingComponents() {
        this.testBootUp()
        this.displayArea.table.component.slots.find(slot => slot.type === 'psu').component = null
        this.displayArea.update()
    }

    /////////////////// TEST: TRASH BIN
    testTrashBin() {
        this.shop.buyComponent(this.shop.items[3])
        this.shop.buyComponent(this.shop.items[1])
        this.inventory.items.forEach(item => {
            this.inventory.placeComponent(item)
        })
        this.inventory.items = []
        
        this.inventory.update()
        this.displayArea.update()
    }
}

const game = new Main()
window.main = game // make game accessible globally
game.start()
