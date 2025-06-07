/*
* INFO: DIFFERENT SUPPORTED TYPES => [text, break, list(specify style and items), imageGroup(specify index and image array)]
* PROCEED TO Assistant.createTaskDescription FOR MORE REFERENCE AND IF YOU WANT TO UPDATE THE SUPPORTED TYPES
*/
const tasks = [
    // STEP 1 - open tabs
    {
        id: 'openTabs',
        trigger: 'init',
        title: {
            imageSrc: './assets/Assistant/shop.png',
            text: 'Greetings!'
        },
        description: [
            {type: 'text', content: 'Welcome! this will be your work area where you will be building your Personal Computer.'},
            {type: 'break'},
            {type: 'break'},
            {type: 'text', content: 'To Start, let me show you around.'},
            {type: 'text', content: 'Click on the button over there to expand to your tab buttons.'},
        ],
        highlight: ['#menuBtn'],
        status: 'incomplete'
    },
    // STEP 2 - Open shop
    {
        id: 'openShop',
        trigger: 'tabsMenuOpened',
        title: {
            imageSrc: './assets/Assistant/shop.png',
            text: 'Open Shop'
        },
        description: [
            {type: 'text', content: 'open the shop'},
        ],
        highlight: ['#openShop'],
        status: 'incomplete'
    },  
    // STEP 3 - Expand Chassis [SHOW CHASSIS COMPONENT FUNCTIONALITY]
    {
        id: 'expandChassis',
        trigger: 'shopOpened',
        title: {
            imageSrc: './assets/Assistant/shop.png',
            text: 'Choose Chassis'
        },
        description: [
            {type: 'text', content: 'click on the glowing Icon to get your very first component'},
        ],
        highlight: ['[data-name="NZXT H5 Flow"]'],
        status: 'incomplete'
    },
    // STEP 4  - Buy Chassis
    {
        id: 'buyChassis',
        trigger: 'chassisExpanded',
        title: {
            imageSrc: './assets/Assistant/shop.png',
            text: 'Buy Chassis'
        },
        description: [
            {type: 'text', content: 'These are the Specs, Click the Buy button.'},
        ],
        highlight: ['#button1'],
        status: 'incomplete'
    },  
    // STEP 5 - Expand Motherboard
    {
        id: 'expandMotherboard',
        trigger: 'chassisBought',
        title: {
            imageSrc: './assets/Assistant/shop.png',
            text: 'Choose Motherboard'
        },
        description: [
            {type: 'text', content: 'use the category filters above to filter components then choose the highlighted item.'},
        ],
        highlight: ['[data-id="motherboard"]','[data-name="ASRock X570 PG Velocita"]'],
        status: 'incomplete'
    },  
    // STEP 6 - Buy Motherboard
    {
        id: 'buyMotherboard',
        trigger: 'motherboardExpanded',
        title: {
            imageSrc: './assets/Assistant/shop.png',
            text: 'Buy MotherBoard'
        },
        description: [
            {type: 'text', content: 'click on the buy button once again to buy'},
        ],
        highlight: ['#button1'],
        status: 'incomplete'
    }, 
    // STEP 7 - Expand Cpu
    {
        id: 'expandCpu',
        trigger: 'motherboardBought',
        title: {
            imageSrc: './assets/Assistant/shop.png',
            text: 'Choose CPU '
        },
        description: [
            {type: 'text', content: 'using the filters, got to CPU and choose the highlighted item'},
        ],
        highlight: ['[data-id="cpu"]','[data-name="AMD Ryzen 9 5900X"]'],
        status: 'incomplete'
    },  
    // STEP 8 - Buy Cpu
    {
        id: 'buyCpu',
        trigger: 'cpuExpanded',
        title: {
            imageSrc: './assets/Assistant/shop.png',
            text: 'Buy CPU '
        },
        description: [
            {type: 'text', content: 'press the Buy button to buy the cpu'},
        ],
        highlight: ['#button1'],
        status: 'incomplete'
    },  
    // STEP 9 - expand PSU
    {
        id: 'expandPsu',
        trigger: 'cpuBought',
        title: {
            imageSrc: './assets/Assistant/shop.png',
            text: 'Choose Power Supply '
        },
        description: [
            {type: 'text', content: 'on the category filter, select Power Supply and then select the highlighted item'},
        ],
        highlight: ['[data-id="psu"]','[data-name="EVGA Supernova 1300 P+"]'],
        status: 'incomplete'
    },  
    // STEP 10 - buy PSU
    {
        id: 'buyPsu',
        trigger: 'psuExpanded',
        title: {
            imageSrc: './assets/Assistant/shop.png',
            text: 'Buy Power Supply '
        },
        description: [
            {type: 'text', content: 'Click buy'},
        ],
        highlight: ['#button1'],
        status: 'incomplete'
    },  
    // STEP 11 - activate quickbuy
    {
        id: 'checkQuickBuy',
        trigger: 'psuBought',
        title: {
            imageSrc: './assets/Assistant/shop.png',
            text: 'Quick Buy Feature '
        },
        description: [
            {type: 'text', content: 'Quick Buy is a feature that allows you to buy components quickly'},
            {type: 'text', content: 'this is because you dont check for specs anymore'},
            {type: 'text', content: 'to perform this, look for the checkbox on the lower left, make sure that is is checked to activate Quick Buy'},
        ],
        highlight: ['label[for="quickBuy"]'],
        status: 'incomplete'
    },  
    // STEP 12- Buy Ram
    {
        id: 'buyRam',
        trigger: 'quickBuyChecked',
        title: {
            imageSrc: './assets/Assistant/shop.png',
            text: 'Buy Ram'
        },
        description: [
            {type: 'text', content: 'on the category filter, select Memory and then select the highlighted item'},
            {type: 'text', content: 'Memory is usually preffered to be be used across multiple ram sticks so for this one, buy at least two'},
        ],
        condition: {
            amountRequired: 2,
            amount:0
        },
        highlight: ['[data-id="ram"]','[data-name="Kingston HyperX Beast RGB DDR4"]'],
        status: 'incomplete'
    },  
    // STEP 13- Buy Storage Devices
    {
        id: 'buyRom',
        trigger: 'ramBought',
        title: {
            imageSrc: './assets/Assistant/shop.png',
            text: 'Buy Storage Devices'
        },
        description: [
            {type: 'text', content: 'on the category filter, select Storage and then select the highlighted item'},
        ],
        highlight: ['[data-id="storage"]','[data-name="Seagate Barracuda SSD"]'],
        status: 'incomplete'
    },  
    // STEP 14- Buy Cooling Devices
    {
        id: 'buyCoolingDevice',
        trigger: 'romBought',
        title: {
            imageSrc: './assets/Assistant/shop.png',
            text: 'Buy Cooling Devices'
        },
        description: [
            {type: 'text', content: 'On the category filter, select Cooling. Use the scrollbar to see the other category filters'},
            {type: 'text', content: 'Then select the highlighted item'},
        ],
        highlight: ['[data-id="cooling"]','[data-name="AMD wraith Prism"]'],
        status: 'incomplete'
    },  
    // STEP 15- Buy GPU
    {
        id: 'buyGpu',
        trigger: 'coolingDeviceBought',
        title: {
            imageSrc: './assets/Assistant/shop.png',
            text: 'Buy GPU'
        },
        description: [
            {type: 'text', content: 'On the category filter, select GPU then select the highlighted item'}
        ],
        highlight: ['[data-id="gpu"]','[data-name="Gigabyte Radeon RX 7900 XTX"]'],
        status: 'incomplete'
    },  
    // STEP 16- Open Inventory
    {
        id: 'openInv',
        trigger: 'gpuBought',
        title: {
            imageSrc: './assets/Assistant/shop.png',
            text: 'Open Inventory'
        },
        description: [
            {type: 'text', content: 'Great Job! You now have a complete set to build your first functional PC.'},
            {type: 'text', content: 'You can now close the Shop and look once again in your tabs buttons and click on Inventory'}
        ],
        highlight: ['#openInv'],
        status: 'incomplete'
    },  
    // STEP 17- Place Item
    {
        id: 'placeMotherboard',
        trigger: 'invOpened',
        title: {
            imageSrc: './assets/Assistant/inventory.png',
            text: 'Place Inventory'
        },
        description: [
            {type: 'text', content: "This is your inventory, in here you can choose to place the items you bought to the work area, or return them if you don't need them anymore"},
            {type: 'text', content: 'To place an item, simply click on the items themselves. to return items, click on the return button at the corner of the item you want to return'},
            {type: 'text', content: 'To Continue, try placing the motherboard first.'}
        ],
        highlight: [
            '#invItemsContainer [data-name="ASRock X570 PG Velocita"]',
        ],
        status: 'incomplete'
    },  
    // STEP 18- Display Introduction
    {
        id: 'workAreaIntroduction',
        trigger: 'motherboardPlaced',
        title: {
            imageSrc: './assets/Assistant/inventory.png',
            text: 'Introduction of the Work Area Area'
        },
        description: [
            {type: 'text', content: "Great, you placed the Motherboard. This is a great time to learn about your display area."},
            {type: 'text', content: "First, This is your main area. You can drag items from the shelf area on the right towards here"},
            {type: 'text', content: "Whatever you place here is what will be used in the boot up part of the process"},
            {type: 'text', content: "Now, let's add some more items to be attached to your motherboard, go back to your inventory and select the highlighted items."},
        ],
        highlight: [
            '#openInv',
            '#invItemsContainer [data-name="ASRock X570 PG Velocita"]',
            '#invItemsContainer [data-name="AMD Ryzen 9 5900X"]',
            '#invItemsContainer [data-name="Kingston HyperX Beast RGB DDR4"]',
            '#invItemsContainer [data-name="Kingston HyperX Beast RGB DDR4"]',
            '#invItemsContainer [data-name="AMD wraith Prism"]',
            '#invItemsContainer [data-name="Gigabyte Radeon RX 7900 XTX"]',
        ],
        status: 'incomplete'
    },  
    // STEP 19- Show Shelf
    {
        id: 'shelfIntroduction',
        trigger: 'set1Placed',
        title: {
            imageSrc: './assets/Assistant/inventory.png',
            text: 'Introduction of the Shelf Area'
        },
        description: [
            {type: 'text', content: "Alright, this will be your shelf area. It can only hold up to 6 components at a time. Any component placed after the shelf is full will come back to the inventory"},
            {type: 'text', content: "Now that you've placed the items in your work area, yiou can now start attaching components. On usual cases, you usually attach the cpu, gpu, ram, and the cpu cooling components on the motherboard"},
            {type: 'text', content: "Trying pressing on a component on the shelf and you will see a highlight on the mother board as to where you can attach them. Proceed to drag the item towards the highlighted place to attach them"},
            {type: 'text', content: "Attach all the components currently on your shelf"},
        ],
        highlight: [],
        status: 'incomplete'
    },
    // STEP 20- Place the rest of the items
    {
        id: 'placeSet2',
        trigger: 'set1Attached',
        title: {
            imageSrc: './assets/Assistant/inventory.png',
            text: 'Place the rest'
        },
        description: [
            {type: 'text', content: "Good job, it's coming together quite well, don't you think?"},
            {type: 'text', content: "Now, let's complete the build, place the rest of the items from the inventory into the shelf"},
        ],
        highlight: [
            '#openInv',
            '#invItemsContainer [data-name="NZXT H5 Flow"]',
            '#invItemsContainer [data-name="EVGA Supernova 1300 P+"]',
            '#invItemsContainer [data-name="Seagate Barracuda"]'
        ],
        status: 'incomplete'
    },
    // STEP 21- Place the Chassis to the main area
    {
        id: 'placeChassisMain',
        trigger: 'set2Placed',
        title: {
            imageSrc: './assets/Assistant/inventory.png',
            text: 'Place Chassis in Main Area'
        },
        description: [
            {type: 'text', content: "You can also swap components from the shelf to the main area by dragging the shelf component anywhere on the main area."},
            {type: 'text', content: "Try dragging the chassis towards the main area to swap its position with the motherboard"}
        ],
        highlight: [],
        status: 'incomplete'
    },
    // STEP 22- Labels Introduction
    {
        id: 'labelsIntroduction',
        trigger: 'chassisPlacedInMain',
        title: {
            imageSrc: './assets/Assistant/inventory.png',
            text: 'Labels Introduction'
        },
        description: [
            {type: 'text', content: "You can find the labels of your current component here such as the name and the type."},
            {type: 'text', content: "The arrow buttons are used if you want to rotate the component, it is usually used to access location where components are needed to be attached."},
            {type: 'text', content: "Try rotating the chassis until you're on the 'Right Side' to access the slots for your remaining components."}
        ],
        highlight: [
            '#right',
            '#left'
        ],
        status: 'incomplete'
    },
    // STEP 23- Attach Remaining
    {
        id: 'attachSet2',
        trigger: 'rightSideAccessed',
        title: {
            imageSrc: './assets/Assistant/inventory.png',
            text: 'Attach the remaining Components'
        },
        description: [
            {type: 'text', content: "Nice! The right side of the chassis is usually where you find the slots to attach the PSU as well as some storage device compartments."},
            {type: 'text', content: "Try to drag and attach the remaining components on the shelf, remember to attach the motherboard as well."}
        ],
        highlight: [],
        status: 'incomplete'
    },
    // STEP 24- Trash Bin Introduction
    {
        id: 'trashbinIntroduction',
        trigger: 'storageError',
        title: {
            imageSrc: './assets/Assistant/inventory.png',
            text: 'Trash Bin Introduction'
        },
        description: [
            {type: 'text', content: "Oh no... You just got a storage incompatibility error. This happens when storage slots isn't able to cater to your storage device."},
            {type: 'text', content: "In this case, your Hard Disk Device(HDD) is too large for the slot, lets buy a smaller Solid State Drive(SSD) instead."},
            {type: 'text', content: "First drag the current HDD towards the trash bin to remove it from the work area. You can choose to remove it permanently or just return it to the inventory"},
        ],
        highlight: ['#trashBin', '#trashConfirm'],
        status: 'incomplete'
    },
    // STEP 25- Complete Assembly
    {
        id: 'completeAssembly',
        trigger: 'storageRemoved',
        title: {
            imageSrc: './assets/Assistant/inventory.png',
            text: 'Complete Assembly'
        },
        description: [
            {type: 'text', content: "Alright, now go buy an SSD from the shop, place it in the work area and continue attaching the components that were left"},
        ],
        highlight: ['Seagate Barracuda SSD'],
        status: 'incomplete'
    },
    // STEP 26- Ports Introduction
    {
        id: 'openPortsTab',
        trigger: 'assemblyCompleted',
        title: {
            imageSrc: './assets/Assistant/inventory.png',
            text: 'Open Ports Tab'
        },
        description: [
            {type: 'text', content: "Good Job! You successfully attached every required component. Let's now go to the Ports tab and start connecting them"},
            {type: 'text', content: "On the tabs menu button, click on Ports"},
        ],
        highlight: ['#openWires'],
        status: 'incomplete'
    },
    // STEP 27- Ports Introduction
    {
        id: 'portCategories',
        trigger: 'portsTabOpened',
        title: {
            imageSrc: './assets/Assistant/Wires.png',
            text: 'Port Groups'
        },
        description: [
            {type: 'text', content: "This is where all ports of the component from the main area is handled. It is categorized by component."},
            {type: 'text', content: "Use the arrows to navigate through each component page. Try navigating until you reach the motherboard once more"}
        ],
        highlight: ['#portLeft', '#portRight'],
        status: 'incomplete'
    },
    // STEP 28- Port Items
    {
        id: 'portItems',
        trigger: 'portGroupsNavigated',
        title: {
            imageSrc: './assets/Assistant/Wires.png',
            text: 'Ports'
        },
        description: [
            {type: 'text', content: "Now, these are all the ports that are found per component. To proeced, try hovering on one of the ports to reveal what kind of port it is."},
        ],
        highlight: [],
        status: 'incomplete'
    },
    // STEP 29- Drawer
    {
        id: 'drawer',
        trigger: 'cellHovered',
        title: {
            imageSrc: './assets/Assistant/Wires.png',
            text: 'Drawer'
        },
        description: [
            {type: 'text', content: "Catch that name? take note of it because you'll need the proper to connect to that port. Open the drawer to find the connectors that we are going to use."},
        ],
        highlight: ['#pulley'],
        status: 'incomplete'
    },
    // STEP 30- Connectors
    {
        id: 'connectorsIntroduction',
        trigger: 'drawerPulled',
        title: {
            imageSrc: './assets/Assistant/Wires.png',
            text: 'Connector cables'
        },
        description: [
            {type: 'text', content: "Alright, here are your connectors. These usually came with the box along with the component you bought"},
            {type: 'text', content: "To attach a connector, simply click one and it will get highlighted. Corresponding ports will then light up."},
            {type: 'text', content: "Hover over the connectors to find its name, then try clicking on the 24-pin-power cable"},
        ],
        highlight: ['[data-type="24-pin-power"]'],
        status: 'incomplete'
    },
    // STEP 31- 24-pin-power mobo attachment
    {
        id: '24pinMobo',
        trigger: '24pinSelected',
        title: {
            imageSrc: './assets/Assistant/Wires.png',
            text: 'Connecting to motherboard'
        },
        description: [
            {type: 'text', content: "Click on the Highlight to attach the connector"}
        ],
        highlight: [],
        status: 'incomplete'
    },
    // STEP 32- 24-pin-power psu attachment
    {
        id: 'navigatePsu',
        trigger: '24pinMoboAttached',
        title: {
            imageSrc: './assets/Assistant/Wires.png',
            text: 'Navigate to PSU page'
        },
        description: [
            {type: 'text', content: "Great, it's now attached to the motherboard. The 24-pin connector is the main source of power of the motherboard."},
            {type: 'text', content: "But it can only draw power if it is also connected to the PSU. Try navigating towards the PSU ports page"}
        ],
        highlight: ['#portLeft', '#portRight'],
        status: 'incomplete'
    },
    // STEP 33- 24-pin psu attachment
    {
        id: '24pinPsu',
        trigger: 'psuNavigated',
        title: {
            imageSrc: './assets/Assistant/Wires.png',
            text: 'Connecting to PSU'
        },
        description: [
            {type: 'text', content: "Most components connect to the psu to draw power from it. Try connecting the 24-pin cable towards the PSU port"}
        ],
        highlight: [],
        status: 'incomplete'
    },
    // STEP 34- attach every component
    {
        id: 'attachOtherConnectors',
        trigger: '24pinPsuAttached',
        title: {
            imageSrc: './assets/Assistant/Wires.png',
            text: 'aa'
        },
        description: [
            {type: 'text', content: "aa"}
        ],
        highlight: [],
        status: 'incomplete'
    }
]

export default tasks;