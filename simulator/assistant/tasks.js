const tasks = [
    // STEP 1
    {
        id: 1,
        step: 1,
        title: {
            imageSrc: './assets/Assistant/shop.png',
            text: 'Enter the Shop'
        },
        description: [
            {type: 'text', content: 'Look for your PC components and buy them'},
            {type: 'break'},
            {type: 'text', content: 'Ensure to check prices and specifications before making a purchase'},
            {type: 'text', content: 'The components that you will need are the following:'},
            {type: 'list', style: 'ordered', items: [
                'Case',
                'Motherboard',
                'Processor',
                'Power Supply Unit',
                'RAM',
                'Storage Device - HDD or SSD',
                'Cooling',
                'GPU or Graphics Card'
            ]},
            {type: 'break'},
            {type: 'text', content: 'Check the images below for your reference'},
            {type: 'imageGroup',  index: 0, images: [
                './assets/Assistant/shop1.png',
                './assets/Assistant/shop2.png',
                './assets/Assistant/shop3.png'
            ]},
        ],
        highlight: '#openShop',
        trigger :{selector: '.content', event: 'click'},
        // Completion: Shop is open, case is bought, and all required components are in inventory
        completionCheck: () => {
            try {
                const inventory = main?.inventory?.items || [];
                const requiredCounts = {
                    'chassis': 1,
                    'motherboard': 1,
                    'cpu': 1,
                    'ram': 1, 
                    'psu': 1,
                    'storage': 1,
                    'gpu': 1
                };

                const result = Object.entries(requiredCounts).every(([type, count]) => {
                    const typeCount = inventory.filter(item => 
                        item.type === type && item.placed !== true
                    ).length;
                    return typeCount >= count;
                });
                
                return result;
            } catch (error) {
                return false;
            }
        
        },
        status: 'incomplete'
    },

    // STEP 2
    { 
        id: 2,
        step: 2,
        title: {
            imageSrc: './assets/Assistant/inventory.png',
            text: 'Check Your Inventory'
        },
        description: [
            {type: 'text', content: "Place the components you've chosen to the components shelf by clicking the components in your inventory"},
            {type: 'break'},
            {type: 'text', content: 'Place each component in regards to their order:'},
            {type: 'list', style: 'ordered', items: [
                'Case',
                'Motherboard',
                'Processor',
                'Power Supply Unit',
                'RAM',
                'Storage Device - HDD or SSD',
                'Cooling',
                'GPU or Graphics Card'
            ]},
            {type: 'break'},
            {type: 'text', content: 'Check the images below for your reference'},
            {type: 'imageGroup',  index: 0, images: [
                './assets/Assistant/inv1.png',
                './assets/Assistant/inv2.png',
                './assets/Assistant/inv3.png'
            ]},
        ],
        highlight: '#openInv',
        trigger :{selector: '#openInv', event: 'click'},
        // Completion: All essential components are placed in the correct slots inside the case
        completionCheck: () => {
            const main = window.main;
            const requiredTypes = ['motherboard', 'cpu', 'ram', 'psu','storage','gpu'];
            const displayArea = main?.displayArea;
            const table = displayArea?.table;
            if (!table?.component || table.component.type !== 'chassis') return false;
            function hasComponent(type, slots) {
                return slots.some(slot => 
                    slot.component && (
                        slot.component.type === type ||
                        (slot.component.slots && hasComponent(type, slot.component.slots))
                    )
                );
            }
            const chassis = table.component;
            return requiredTypes.every(type => hasComponent(type, chassis.slots));
        },
        status: 'incomplete'
    },
    { 
        id: 3,
        step: 3,
        title: {
            imageSrc: './assets/Assistant/wires.png',
            text: 'Connecting Components with Wires'
        },
        description: [
            {type: 'text', content: "Now we dive in to plugging each wire for each component either for power or data connection."},
            {type: 'break'},
            {type: 'text', content: "There are two types of wires in the computer: one for data connection to the ROM, and the other for power supply to essential components like the GPU, ROM, CPU, and Motherboard. Additionally, there's a connection for the front panel, encompassing the power button, USB ports, and occasionally including a LED light indicator, reset button, and 3.5mm audio jack ports."},
            {type: 'text', content: "To connect the wires simply open the wires drawer and click the wires to their respective highlighted slots"},
            {type: 'break'},
            {type: 'text', content: 'Check the images below for your reference'},
            {type: 'imageGroup',  index: 0, images: [
                './assets/Assistant/wires1.png',
                './assets/Assistant/wires2.png',
                './assets/Assistant/wires3.png',
                './assets/Assistant/wires4.1.png',
            ]},
            {type: 'text', content: "Also please note that the wire will be colored green when they are connected on both components however it will be colored red if it is only connected on one end."},
            {type: 'imageGroup', index: 0, images: [
                './assets/Assistant/wires4.2.png',
                './assets/Assistant/wires5.png',
                './assets/Assistant/wires6.png',
            ]}
        ],
        highlight: '#openWires',
        trigger:{selector: '#openWires', event: 'click'},
        // Completion: All required cables between components are connected
        completionCheck: () => {
            const main = window.main;
            const ports = main?.portsTab;
            if (!ports?.drawer?.cables) return false;
            const table = main?.displayArea?.table;
            if (!table?.component || table.component.type !== 'chassis') return false;
            const chassis = table.component;
            function hasComponent(type, slots) {
                return slots.some(slot =>
                    slot.component && (
                        slot.component.type === type ||
                        (slot.component.slots && hasComponent(type, slot.component.slots))
                    )
                );
            }
            const requiredCables = [
                { type: '24-pin-power', ends: ['motherboard', 'psu'], needed: hasComponent('motherboard', chassis.slots) },
                { type: '8-pin-power', ends: ['motherboard', 'psu'], needed: hasComponent('motherboard', chassis.slots) },
                { type: 'sata-power', ends: ['storage', 'psu'], needed: hasComponent('storage', chassis.slots) },
                { type: 'sata-data', ends: ['storage', 'motherboard'], needed: hasComponent('storage', chassis.slots) },
                { type: 'frontPanel', ends: ['motherboard'], needed: hasComponent('motherboard', chassis.slots) },
                { type: '3-pin-cooling', ends: ['motherboard'], needed: hasComponent('cooling', chassis.slots) }
            ];
            const gpuPresent = hasComponent('gpu', chassis.slots);
            if (gpuPresent) {
                requiredCables.push({ type: '8-pin-pcie', ends: ['gpu', 'psu'], needed: true });
            }
            return requiredCables
                .filter(req => req.needed)
                .every(req => {
                    const cablesOfType = ports.drawer.cables.filter(cable => cable.type === req.type);
                    return cablesOfType.some(cable =>
                        req.ends.every(end => cable.ends[end]?.connected)
                    );
                });
        },
        status: 'incomplete'
    },
    { 
        id: 4,
        step: 4,
        title: {
            imageSrc: './assets/Assistant/power-button.png',
            text: 'Power On'
        },
        description: [
            {type: 'text', content: "Power on your pc by pressing the power on button"},
            {type: 'break'},
            {type: 'text', content: "Important note:"},
            {type: 'list', style: 'unordered', items: [
                "Check if you have compatible components before turning on your PC",
                "Check if you have all the necessary components before turning on your PC",
                "Check if you have all the necessary wires connected to each components",
            ]},
            {type: 'break'},
            {type: 'text', content: 'After checking all the necessary components and wires you can now power on your PC by pressing the power button'},
            {type: 'text', content: "After pressing the power button you will see the boot up screen and the computer will start to boot up"},
            {type: 'text', content: "After booting up you will see the desktop screen and you have successfully assembled your PC"},
            {type: 'break'},
            {type: 'text', content: "Also notice that when the reports on the left side has different colors it means that:"},
            {type: 'list', style: 'unordered', items: [
                "Green - All components are connected and working properly",
                "Red - There are components that are not connected or not working properly",
                "Red with ! - The components are critical meaning it does not work and could affect the other components as well",
                "Yellow - All components are connected and working but needs optimization"
            ]},
            {type: 'text', content: "Check the images below for your reference:"},
            {type: 'imageGroup',  index: 0, images: [
                './assets/Assistant/power1.png',
                './assets/Assistant/power2.png',
                './assets/Assistant/power3.png',
            ]},
        ],
        highlight: '#openBootTab',
        trigger:{selector: '#openBootTab', event: 'click'},
        // Completion: PC is powered on and booted
        completionCheck: () => {
            const main = window.main;
            const bootTab = main?.bootUpTab;
            return bootTab?.pcUnit?.power === 'on' && bootTab?.pcUnit?.bootStatus === true;
        },
        status: 'incomplete'
    },
    
]

export default tasks;