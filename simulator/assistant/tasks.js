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
]

export default tasks;