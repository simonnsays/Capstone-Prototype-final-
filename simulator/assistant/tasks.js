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
        id: 'openShopTab',
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
            {type: 'text', content: 'to perform this, look for the checkbox on the lower left, make sure that is checked to activate Quick Buy'},
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
        ],
        // condition: {
        //     amountRequired: 1,
        //     amount:0
        // },
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
        highlight: ['[data-id="storage"]','[data-name="Seagate Barracuda"]'],
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
        id: 'openInvTab',
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
        highlight: ['Seagate Barracuda SSD', '[data-id="storage"]'],
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
        trigger: 'portMoboNavigated',
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
            {type: 'text', content: "Catch that name? take note of it because you'll need the proper cable to connect to that port. Open the drawer to find the connectors that we are going to use."},
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
        id: 'atxPinMobo',
        trigger: '24pinSelected',
        title: {
            imageSrc: './assets/Assistant/Wires.png',
            text: 'Connecting to motherboard'
        },
        description: [
            {type: 'text', content: "This is the 24-pin Cable, Also known as the ATX power cable. It usually will be the connector with the highest pin count and looks the biggest among other connectors."},
            {type: 'text', content: "Click on the Highlight to attach the connector"}
        ],
        highlight: [],
        status: 'incomplete'
    },
    // STEP 32- 24-pin-power psu attachment
    {
        id: 'atxNavigatePsu',
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
        id: 'atxPinPsu',
        trigger: 'portPsuNavigated',
        title: {
            imageSrc: './assets/Assistant/Wires.png',
            text: 'Connecting to PSU'
        },
        description: [
            {type: 'text', content: "Most components connect to the psu to draw power from it.Connect the 24-pin cable towards the PSU port"}
        ],
        highlight: ['[data-type="24-pin-power"'],
        status: 'incomplete'
    },
    // STEP 34- EPS Connector 
    {
        id: 'attachEpsConnectors',
        trigger: '24pinPsuAttached',
        title: {
            imageSrc: './assets/Assistant/Wires.png',
            text: 'Connect other connectors'
        },
        description: [
            {type: 'text', content: "The green indicator on the connector's background means that BOTH ends are connected to components while the orange indicator means only one end of the cable is connected"},
            {type: 'break'},
            {type: 'imageGroup',  index: 0, images: [
                './assets/Assistant/wires4.2.png',
            ]},
            {type: 'break'},
            {type: 'text', content: "now, let's connect the CPU connectors. Click on the 8-pin-power cable"},

        ],
        highlight: ['[data-type="8-pin-power"]'],
        status: 'incomplete'
    },
    // STEP 35- EPS PSU attachment
    {
        id: 'epsPinPsu',
        trigger: 'epsSelected',
        title: {
            imageSrc: './assets/Assistant/Wires.png',
            text: 'Connect 8-pin-power connectors'
        },
        description: [
            {type: 'text', content: "This is the 8-pin-power cable, also known as the Entry-Level Power Supply(EPS) connector."},
            {type: 'break'},
            {type: 'text', content: "Unlike the ATX connector, the EPS connector has less number of pins. It contains of 4 square pins and 4 rounded D-shaped pins. It is used to power the CPU through the motherboard and from the PSU."},
            {type: 'break'},
            {type: 'text', content: "Some builds run with only one EPS cable connected, but for this case, connect the [ TWO ] 8-pin-power cables avalable for use to the highlighted PSU ports"},
            
        ],
        highlight: [],
        status: 'incomplete'
    },
    // STEP 36- EPS Mobo navigate
    {
        id: 'epsNavigateMobo',
        trigger: 'epsPsuAttached',
        title: {
            imageSrc: './assets/Assistant/Wires.png',
            text: 'Navigate to motherboard page'
        },
        description: [
            {type: 'text', content: "Again, this connector powers the CPU and the port where it handles that is located at the motherboard, Navigate to to the motherboard page."},
            
        ],
        highlight: ['#portLeft', '#portRight'],
        status: 'incomplete'
    },
    // STEP 37- EPS Motherboard attachment
    {
        id: 'epsPinMobo',
        trigger: 'portMoboNavigated',
        title: {
            imageSrc: './assets/Assistant/Wires.png',
            text: 'EPS to Motherboard ports'
        },
        description: [
            {type: 'text', content: "CPU connector ports from the motherboard are usually close together rather than having two separate individual ports"},           
            {type: 'text', content: "Connect the same cables you use to connect to the psu"},           
        ],
        highlight: [],
        status: 'incomplete'
    },
    // STEP 38- CPU Cooling connection
    {
        id: 'cpuCoolingPinMobo',
        trigger: 'epsMoboAttached',
        title: {
            imageSrc: './assets/Assistant/Wires.png',
            text: 'Connect the cooling fan'
        },
        description: [
            {type: 'text', content: "Now that we've connected the cpu connector, let's go on ahead and connect the cooling fan."},                     
            {type: 'text', content: "The CPU cooling fan usually comes in 3-pins or 4-pins and goes on a motherboard port, scroll down the ports page to find the cooling port and attach the 3-pin cooling cable"},                     
        ],
        highlight: ['[data-type="3-pin-cooling"]'],
        status: 'incomplete'
    },
    // STEP 39- Front Panel connection
    {
        id: 'frontPanelPinMobo',
        trigger: 'cpuCoolingAttached',
        title: {
            imageSrc: './assets/Assistant/Wires.png',
            text: 'Connect the Front Panel'
        },
        description: [
            {type: 'text', content: "Okay, while we're at it, why don't you go ahead and connect the front panel connector"},                   
            {type: 'break',},                   
            {type: 'text', content: "The Front Panel connector connects the motherboard and the chassis. It is because of this connection that we can use the buttons of a computer case and access its jacks."},                   
        ],
        highlight: ['[data-type="frontPanel"]'],
        status: 'incomplete'
    },
    // STEP 40- sata data mobo connection
    {
        id: 'sataDataPinMobo',
        trigger: 'frontPanelAttached',
        title: {
            imageSrc: './assets/Assistant/Wires.png',
            text: 'Connect the SSD'
        },
        description: [
            {type: 'text', content: "Now to connect the SSD. Storage devices uses the SATA type of connectors and use two kinds of sata connectors: "},                   
            {type: 'text', content: "Sata-data is used to connect to the motherboard so that it can transfer files. Sata-power is used to connect to the PSU to power the device itself."},                   
            {type: 'break',},                   
            {type: 'text', content: "Use the scroll bar to navigate through the cables until you find the Sata-data cable, connect it to one of the available Sata-data ports"},                   
        ],
        highlight: ['#pulley','[data-type="sata-data"]'],
        status: 'incomplete'
    },
    // STEP 41- navigate Storage
    {
        id: 'sDataNavigateStorage',
        trigger: 'sDataMoboAttached',
        title: {
            imageSrc: './assets/Assistant/Wires.png',
            text: 'Connect the SSD'
        },
        description: [
            {type: 'text', content: "Navigate to the storage page"},                   
        ],
        highlight: ['#portLeft', '#portRight'],
        status: 'incomplete'
    },
    // STEP 42- sata data storage connection
    {
        id: 'sataDataPinRom',
        trigger: 'portRomNavigated',
        title: {
            imageSrc: './assets/Assistant/Wires.png',
            text: 'Connect the SSD'
        },
        description: [
            {type: 'text', content: "Use the Sata-data cable to connect to the storage(SSD) device"},                   
        ],
        highlight: ['[data-type="sata-data"]'],
        status: 'incomplete'
    },
    // STEP 43- sata power storage connection
    {
        id: 'sataPowerPinRom',
        trigger: 'sDataRomAttached',
        title: {
            imageSrc: './assets/Assistant/Wires.png',
            text: 'Connect the SSD'
        },
        description: [
            {type: 'text', content: "Now to power the SSD, select the Sata-power cable and attach it to the port in the storage page."},                   
        ],
        highlight: ['[data-type="sata-power"]'],
        status: 'incomplete'
    },
    // STEP 44- sata navigate psu
    {
        id: 'sPowerNavigatePsu',
        trigger: 'sPowerRomAttached',
        title: {
            imageSrc: './assets/Assistant/Wires.png',
            text: 'Connect the SSD'
        },
        description: [
            {type: 'text', content: "Navigate to the PSU page."},                   
        ],
        highlight: ['#portLeft', '#portRight'],
        status: 'incomplete'
    },
    // STEP 45- sata navigate psu
    {
        id: 'sPowerNavigatePsu',
        trigger: 'portPsuNavigated',
        title: {
            imageSrc: './assets/Assistant/Wires.png',
            text: 'Connect the SSD'
        },
        description: [
            {type: 'text', content: "Finally, connect the Sata-power cable to its corresponding port. Scroll down on the page to see the rest of the ports"},                   
        ],
        highlight: ['[data-type="sata-power"]'],
        status: 'incomplete'
    },
    // STEP 46- GPU Connector
    {
        id: 'pciePinPsu',
        trigger: 'sPowerPsuAttached',
        title: {
            imageSrc: './assets/Assistant/Wires.png',
            text: 'Connect the GPU'
        },
        description: [
            {type: 'text', content: "Alright, we're almost done connecting everything. All that's left is connecting the GPU."},                   
            {type: 'break'},                   
            {type: 'text', content: "GPU connectors use different connectors depending on the GPU installed. On usual cases, it use an 8-pin-PCIe cable which looks similar the the CPU connector"},                   
            {type: 'text', content: "with the only difference being that CPU connectors have 4 square and 4 rounded pins while GPU connectors have 5 rounded and 3 squared pins or vice versa."},                   
            {type: 'break'},                   
            {type: 'text', content: "To continue, attach two among the 8-pin-pcie cables available in the drawer to their ports."},                   
            {type: 'break'},                   
            {type: 'text', content: "NOTE: PCIe ports may not have the same label visually, look for their labels instead or inspect their pins"}                   
        ],
        highlight: ['[data-type="8-pin-pcie"]', '[data-type="8-pin-pcie"]'],
        status: 'incomplete'
    },
    // STEP 47- PCIe Navigate to GPU
    {
        id: 'pcieNavigatePsu',
        trigger: 'pciePsuAttached',
        title: {
            imageSrc: './assets/Assistant/Wires.png',
            text: 'Connect the GPU'
        },
        description: [
            {type: 'text', content: "Now go to the GPU port page"}                   
        ],
        highlight: ['#portLeft', '#portRight'],
        status: 'incomplete'
    },
    // STEP 48- GPU connection
    {
        id: 'pciePinGpu',
        trigger: 'portGpuNavigated',
        title: {
            imageSrc: './assets/Assistant/Wires.png',
            text: 'Connect the GPU'
        },
        description: [
            {type: 'text', content: "Connect the 2 cables you used in the PSU in the GPU ports"},                                                   
        ],
        highlight: ['[data-type="8-pin-pcie"]', '[data-type="8-pin-pcie"]'],
        status: 'incomplete'
    },
    // STEP 49- Boot Up Tab
    {
        id: 'openBootUpTab',
        trigger: 'pcieGpuAttached',
        title: {
            imageSrc: './assets/Assistant/Wires.png',
            text: 'Boot Up Tab'
        },
        description: [
            {type: 'text', content: "Alright, You got everyything connected and powered. Let's now try to power it on and see if you got it all correct."},                                                   
            {type: 'text', content: "Open the Boot Up Tab from the menu buttons"},                                                   
        ],
        highlight: ['#openBootTab'],
        status: 'incomplete'
    },
    // STEP 50- Boot Up Tab
    {
        id: 'bootTabIntroduction',
        trigger: 'bootUpTabOpened',
        title: {
            imageSrc: './assets/Assistant/Wires.png',
            text: 'Boot Up Tab'
        },
        description: [
            {type: 'text', content: "This is the boot up interface. The area on the left serves as your reports area, and on the right are the peripherals display"},                                                   
            {type: 'break'},                                                   
            {type: 'text', content: "The reports area will report if the unit the you have built operates perfectly or it may have errors and you have to adjust some more things."},                                                   
            {type: 'text', content: "To continue, click on the Power button seen on the corner of the peripherals display area."},                                                   
        ],
        highlight: ['#powerButton'],
        status: 'incomplete'
    },
    // STEP 51- Chat Bot
    {
        id: 'openChatBot',
        trigger: 'attemptedPower',
        title: {
            imageSrc: './assets/Assistant/Wires.png',
            text: 'Operating System'
        },
        description: [
            {type: 'text', content: "The reports area just reported an error. It says you don't have an OS installed. "},                                                   
            {type: 'break'},                                                   
            {type: 'text', content: "Operating System, or OS, is like the middle man between you and the PC's hardware. It allows you to do everything else aside from just turning it on."},                                                   
            {type: 'text', content: "Let's install one for our use, open the chat bubble by the lower right of the screen"},                                                   
        ],
        highlight: [],
        status: 'incomplete'
    },
    // STEP 52- Open Bios
    {
        id: 'openChatBios',
        trigger: 'chatOpened',
        title: {
            imageSrc: './assets/Assistant/Wires.png',
            text: 'Operating System'
        },
        description: [
            {type: 'text', content: "This is the chat bubble, if you have any queries or need help on something, don't hesitate to ask here."},                                                   
            {type: 'break'},                                                   
            {type: 'text', content: "to install the OS, type '/open bios' on the chat box. You can also use '/help' to find more useful tools"},                                                   
        ],
        highlight: [],
        status: 'incomplete'
    },
    // STEP 52- Open Bios
    {
        id: 'installOS',
        trigger: 'biosOpened',
        title: {
            imageSrc: './assets/Assistant/Wires.png',
            text: 'Operating System'
        },
        description: [
            {type: 'text', content: "This is the BIOS, this is where you can access what your hardware can do on the very basic level."},                                                   
            {type: 'break'},                                                   
            {type: 'text', content: "In real life building, you install the OS on a different device and then place it inside your SSD or other storage device."},                                                   
            {type: 'text', content: "but in this case, we will be installing it in the BIOS interface itself, locate the boot category and then click on Install OS. BIOS stands for Basic Input Output System."},                                                   
        ],
        highlight: ['#biosBoot','#installOS'],
        status: 'incomplete'
    },
    // STEP 53- SHOW BUILD
    {
        id: 'showBuild',
        trigger: 'poweredOn',
        title: {
            imageSrc: './assets/Assistant/Wires.png',
            text: 'CONGRATS!'
        },
        description: [
            {type: 'text', content: "Alright! that's it, you've completely and successfully built a PC with proper connections and all"},                                                   
            {type: 'break'},                                                   
            {type: 'text', content: "Click on the success report cell to finally show get the summarry of your build"}                                                   
        ],
        highlight: ['#reportSuccess'],
        status: 'incomplete'
    },
    // STEP 54- SHOW BUILD SUMMARY
    {
        id: 'showBuildSummary',
        trigger: 'reportSuccessClicked',
        title: {
            imageSrc: './assets/Assistant/Wires.png',
            text: 'Enter Build Summary'
        },
        description: [
            {type: 'text', content: "Great Job! You can now see the summary of your build. It will show you the components you used, the connections you made, and the overall status of your build."},
            {type: 'break'},
            {type: 'text', content: "You can now exit the tutorial by clicking on the reset build or continue building button located below."},   
            {type: 'break'},
            {type: 'text', content: "Simply scroll down the summary build and click on the Reset Build or continue button to exit the tutorial and start building your own PC."},
            {type: 'break'},
            {type: 'text', content: "If you want to reset the tutorial, you can click on the Restart button below. This will reset the tutorial and allow you to start over."},
            {type: 'break'},
            {type: 'text', content: "If you want to reset the entire build, you can click on the Reset Build button below. This will only reset the entire build not the whole tutorial."},                                                      
        ],  
        highlight: ['.summary-btn', '.summary-btn', '.summary-btn'], 
        status: 'incomplete'
    },
    // STEP 55- EXIT TUTORIAL
    {
        id: 'exitTutorial',
        trigger: 'resetBuild',
        title: {
            imageSrc: './assets/Assistant/Wires.png',
            text: 'Exit Tutorial'
        },
        description: [           
            {type: 'text', content: "Congratulations! You have successfully completed the tutorial. Finish up the set-up for your components."},
            {type: 'break'},
            {type: 'text', content: "You can also access this tutorial again by clicking on the Assistant button on the lower left corner of the screen."},                                                   
        ],
        highlight: ['.summary-btn'],
        status: 'incomplete'
    },
    // STEP 56- SETUP WIZARD
    {
        id: 'setupWizard',
        trigger: 'setupWizard',
        title: {
            imageSrc: './assets/Assistant/Wires.png',
            text: 'Setup Wizard'
        },
        description: [
            {type: 'text', content: "Now try building your own PC! You can start by selecting the categories and price range of your selected components in the Setup Wizard."},                                                   
            {type: 'break'},
            {type: 'text', content: "After you finished selecting the category and price range, you can now start building your own PC"},
            {type: 'break'},
            {type: 'text', content: "If you are having trouble, you can always come back to this tutorial by clicking on the Assistant button on the lower left corner of the screen."},  
            {type: 'break'},
            {type: 'text', content: "You can also try to get help from the chatbot located on the right corner of the screen that will be all and enjoy building your Personal Computer."},                                                                                     
        ],
        highlight: ['.nextStep'],
        status: 'incomplete'
    }
]

export default tasks;