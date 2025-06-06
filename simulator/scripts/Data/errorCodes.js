const errorCodes = {
    // Hazard errors
    'HZD-100': {
        code: 'HZD-100',
        severity: 'Hazard',
        description: 'CPU fan speed too low',
        steps: [
            'Power on the system',
            'Go to the chatbot and type /open bios',
            'In the BIOS menu, go to Fan Control tab',
            'From there you can set the CPU and GPU fan to Turbo mode or set a custom fan speed'
        ],
        troubleshooting: [
            {imageSrc: './assets/tbshoot/hzd/100/100-1.png'},
            {imageSrc: './assets/tbshoot/hzd/100/100-2.png'},
            {imageSrc: './assets/tbshoot/hzd/100/100-3.png'},
            {imageSrc: './assets/tbshoot/hzd/100/100-4.png'},
            {imageSrc: './assets/tbshoot/hzd/100/100-5.png'},
        ],
    },
    'HZD-200': {
        code: 'HZD-200',
        severity: 'Hazard',
        description: 'High CPU temperature',
        steps: [
            'Power on the system',
            'Go to the chatbot and type /open bios',
            'In the BIOS menu, go to Fan Control tab and check the CPU fan speed and temperature',
            'If the CPU temperature is too high, you can set the CPU fan to Turbo mode',
            'If the CPU fan speed is already set to Turbo mode, you can try to set a custom fan speed to a higher value',
        ],
        troubleshooting: [
            {imageSrc: './assets/tbshoot/hzd/200/200-1.png'},
            {imageSrc: './assets/tbshoot/hzd/200/200-2.png'},
            {imageSrc: './assets/tbshoot/hzd/200/200-3.png'},
            {imageSrc: './assets/tbshoot/hzd/200/200-4.png'},
            {imageSrc: './assets/tbshoot/hzd/200/200-5.png'},
        ],
    },
    'HZD-201': {
        code: 'HZD-201',
        severity: 'Hazard',
        description: 'High System temperature',
        steps: [
            'Power on the system',
            'Go to the chatbot and type /open bios',
            'In the BIOS menu, go to Fan Control tab and check the System temperature',
            'If the System temperature is too high, you can set the CPU fan to Turbo mode or drag the fan speed to a higher value',
        ],
        troubleshooting: [
            {imageSrc: './assets/tbshoot/hzd/201/201-1.png'},
            {imageSrc: './assets/tbshoot/hzd/201/201-2.png'},
            {imageSrc: './assets/tbshoot/hzd/201/201-3.png'},
            {imageSrc: './assets/tbshoot/hzd/201/201-4.png'},
            {imageSrc: './assets/tbshoot/hzd/201/201-5.png'},
        ],
    },
    'HZD-300': {
        code: 'HZD-300',
        severity: 'Hazard',
        description: 'High GPU temperature',
        steps: [
            'Power on the system',
            'Go to the chatbot and type /open bios',
            'In the BIOS menu, go to Fan Control tab and check the GPU fan speed and temperature',
            'If the GPU temperature is too high, you can set the GPU fan to Turbo mode',
            'If the GPU fan speed is already set to Turbo mode, you can try to set a custom fan speed to a higher value',
        ],
        troubleshooting: [
            {imageSrc: './assets/tbshoot/hzd/300/300-1.png'},
            {imageSrc: './assets/tbshoot/hzd/300/300-2.png'},
            {imageSrc: './assets/tbshoot/hzd/300/300-3.png'},
            {imageSrc: './assets/tbshoot/hzd/300/300-4.png'},
            {imageSrc: './assets/tbshoot/hzd/300/300-5.png'},        
        ],
    },

    // Missing component/cables errors
    'ERR-100': {
        code: 'ERR-100',
        severity: 'Error',
        description: 'Missing PSU component',
        steps: [
            'Check if you have the PSU component installed',
            'If not go to the inventory and place it in the canvas',
            'If there is no PSU in your inventory go to the shop and buy your preferred PSU then place it in the canvas',
            'If the PSU is already installed, check if the cables drawer have the PSU cables',
        ],
        troubleshooting: [
            {imageSrc: './assets/tbshoot/err/100/100-1.png'},
            {imageSrc: './assets/tbshoot/err/100/100-2.png'},
            {imageSrc: './assets/tbshoot/err/100/100-3.png'}
        ],    
    },
    'ERR-200': {
        code: 'ERR-200',
        severity: 'Error',
        description: 'Missing Motherboard component',
        steps: [
            'Check if you have the Motherboard component installed',
            'If not go to the shop to buy your preferred motherboard and check your inventory then place it in the canvas',
        ],
        troubleshooting: [
            {imageSrc: './assets/tbshoot/err/200/200-1.png'},
            {imageSrc: './assets/tbshoot/err/200/200-2.png'},
        ],
    },
    'ERR-201': {
        code: 'ERR-201',
        severity: 'Error',
        description: 'Missing Front Panel connection',
        steps: [
            'Check if you have the Motherboard component installed',
            'Go to the Ports Tab and check if the Front Panel connection is connected to the motherboard',
            'If the Front Panel connection is not connected, go to the cables drawer and connect it to the motherboard',
        ],
        troubleshooting: [
            {imageSrc: './assets/tbshoot/err/201/201-1.png'},
            {imageSrc: './assets/tbshoot/err/201/201-2.png'},
            {imageSrc: './assets/tbshoot/err/201/201-3.png'},
        ],
    },
    'ERR-202': {
        code: 'ERR-202',
        severity: 'Error',
        description: 'Motherboard not powered',
        steps: [
            'Check if you have the Motherboard 24-pin power cable is connected to the motherboard',
            'If not go to the cables drawer and connect it to the motherboard',
            'Also check if you have a modular PSU installed remember a modular PSU needs to have the 24-pin cable connected to the PSU',
            'If you have a modular PSU browse your ports tab and check if the PSU 24-pin port has the 24-pin cable connected',
            'If not, go to the cables drawer and connect it to the PSU',
        ],
        troubleshooting: [
            {imageSrc: './assets/tbshoot/err/202/202-1.png'},
            {imageSrc: './assets/tbshoot/err/202/202-2.png'},
            {imageSrc: './assets/tbshoot/err/202/202-3.png'},
            {imageSrc: './assets/tbshoot/err/202/202-4.png'},
        ],
    },
    'ERR-300': {
        code: 'ERR-300',
        severity: 'Error',
        description: 'Missing CPU component', 
        steps: [
            'Check if you have the CPU component installed',
            'If not go to the inventory and place it in the canvas if you have it',
            'If there is no CPU in your inventory go to the shop and buy your preferred CPU then place it in the canvas',
        ],
        troubleshooting: [
            {imageSrc: './assets/tbshoot/err/300/300-1.png'},
            {imageSrc: './assets/tbshoot/err/300/300-2.png'},
        ],
    },
    'ERR-301': {
        code: 'ERR-301',
        severity: 'Error',
        description: 'CPU not powered',
        steps: [
            'Check if you have the CPU power cable is connected to the motherboard',
            'If not go to the cables drawer and connect it to the motherboard',
            'Also check if you have a modular PSU installed remember a modular PSU needs to have the cable connected to the PSU',
            'If you have a modular PSU browse your ports tab and check if the PSU CPU port has the cable connected',
            'If not, go to the cables drawer and connect it to the PSU',
        ],
        troubleshooting: [
            {imageSrc: './assets/tbshoot/err/301/301-1.png'},
            {imageSrc: './assets/tbshoot/err/301/301-2.png'},
            {imageSrc: './assets/tbshoot/err/301/301-3.png'},
            {imageSrc: './assets/tbshoot/err/301/301-4.png'},
            {imageSrc: './assets/tbshoot/err/301/301-5.png'},
        ],
    },
    'ERR-400': {
        code: 'ERR-400',
        severity: 'Error',
        description: 'Missing RAM component',
        steps: [
            'Check if you have the RAM component installed',
            'If not go to the inventory and place it in the canvas if you have it',
            'If there is no RAM in your inventory go to the shop and buy your preferred RAM then place it in the canvas',
        ],
        troubleshooting: [
            {imageSrc: './assets/tbshoot/err/400/400-1.png'},
            {imageSrc: './assets/tbshoot/err/400/400-2.png'},
        ],
    },
    'ERR-500': {
        code: 'ERR-500',
        severity: 'Error',
        description: 'Missing storage device',
        steps: [
            'Check if you have the Storage component installed',
            'If not go to the inventory and place it in the canvas if you have it',
            'If there is no Storage in your inventory go to the shop and buy your preferred Storage component then place it in the canvas',
        ],
        troubleshooting: [
            {imageSrc: './assets/tbshoot/err/500/500-1.png'},
            {imageSrc: './assets/tbshoot/err/500/500-2.png'},
            {imageSrc: './assets/tbshoot/err/500/500-3.png'},
        ],
    },
    'ERR-501': {
        code: 'ERR-501',
        severity: 'Error',
        description: 'Storage device is not powered',
        steps: [
            'Check if you have the Storage component installed',
            'If you have the Storage component installed check if the SATA cable is connected to the motherboard',
            'If you have the SATA cable connected to the motherboard check if the SATA power cable is connected to the PSU',
            'If you have a modular PSU installed check if both power cables are connected to the PSU and the storage device',
        ],
        troubleshooting: [
            {imageSrc: './assets/tbshoot/err/501/501-1.png'},
            {imageSrc: './assets/tbshoot/err/501/501-2.png'},
            {imageSrc: './assets/tbshoot/err/501/501-3.png'},
            {imageSrc: './assets/tbshoot/err/501/501-4.png'},
        ],
    },
    'ERR-502': {
        code: 'ERR-502',
        severity: 'Error',
        description: 'No OS is installed in the boot device',
        steps: [
            'Check if you have an Operating System installed in the boot device by going to the BIOS menu',
            'To access the BIOS menu go to the chatbot and type /open bios',
            'In the BIOS menu go to the Boot tab and check if you have an Operating System installed in the boot device',
            'If there is no OS in your storage device simply install an operating system by clicking the Install OS button',
            'Click the Restart Now to see if the operating system is installed',
        ],
        troubleshooting: [
            {imageSrc: './assets/tbshoot/err/502/502-1.png'},
            {imageSrc: './assets/tbshoot/err/502/502-2.png'},
            {imageSrc: './assets/tbshoot/err/502/502-3.png'},
            {imageSrc: './assets/tbshoot/err/502/502-4.png'},
        ],
    },
    'ERR-503':{
        code: 'ERR-503',
        severity: 'Error',
        description: 'Primary boot device has no OS installed',
        steps: [
            'Check if you have an Operating System installed in the boot device by going to the BIOS menu',
            'To access the BIOS menu go to the chatbot and type /open bios',
            'In the BIOS menu go to the Boot tab and check if you have an Operating System installed in the boot device',
            'If there is no OS in your storage device simply install an operating system by clicking the Install OS button',
            'Click the Restart Now to see if the operating system is installed',
        ],
        troubleshooting: [
            {imageSrc: './assets/tbshoot/err/503/503-1.png'},
            {imageSrc: './assets/tbshoot/err/503/503-2.png'},
            {imageSrc: './assets/tbshoot/err/503/503-3.png'},
            {imageSrc: './assets/tbshoot/err/503/503-4.png'},
            {imageSrc: './assets/tbshoot/err/503/503-5.png'},
        ],
    },
    'ERR-600': {
        code: 'ERR-600',
        severity: 'Error',
        description: 'Missing Graphics Card Unit',
        steps: [
            'Check if you have the Graphics Card Unit installed',
            'If not go to the inventory and place it in the canvas if you have it',
            'If there is no Graphics Card Unit in your inventory go to the shop and buy your preferred Graphics Card Unit then place it in the canvas',
        ],
        troubleshooting: [
            {imageSrc: './assets/tbshoot/err/600/600-1.png'},
            {imageSrc: './assets/tbshoot/err/600/600-2.png'},
        ],
    },
    'ERR-601': {
        code: 'ERR-601',
        severity: 'Error',
        description: 'Graphics Card Unit is not powered',
        steps: [
            'Check if you have the Graphics Card Unit installed',
            'If you have the Graphics Card Unit installed check if the power cable is connected to the Graphics Card Unit',
            'If you have a modular PSU installed check if both power cables are connected to the PSU and the Graphics Card Unit',
        ],
        troubleshooting: [
            {imageSrc: './assets/tbshoot/err/601/601-1.png'},
            {imageSrc: './assets/tbshoot/err/601/601-2.png'},
            {imageSrc: './assets/tbshoot/err/601/601-3.png'},
            {imageSrc: './assets/tbshoot/err/601/601-4.png'},
        ],
    },
    'ERR-700': {
        code: 'ERR-700',
        severity: 'Error',
        description: 'Missing CPU cooler',
        steps: [
            'Check if you have the CPU cooler installed',
            'If not go to the inventory and place it in the canvas if you have it',
            'If there is no CPU cooler in your inventory go to the shop and buy your preferred CPU cooler then place it in the canvas',
        ],
        troubleshooting: [
            {imageSrc: './assets/tbshoot/err/700/700-1.png'},
            {imageSrc: './assets/tbshoot/err/700/700-2.png'},
        ],
    },
    'ERR-701': {
        code: 'ERR-701',
        severity: 'Error',
        description: 'CPU cooler not powered',
        steps: [
            'Check if you have the CPU cooler installed',
            'If you have the CPU cooler installed check if the 3-pin cable is connected to the CPU cooler port in the motherboard',
        ],
        troubleshooting: [
            {imageSrc: './assets/tbshoot/err/701/701-1.png'},
            {imageSrc: './assets/tbshoot/err/701/701-2.png'},
            {imageSrc: './assets/tbshoot/err/701/701-3.png'},
        ],
    },

    // Critical errors
    'CRT-01': {
        code: 'CRT-01',
        severity: 'Critical',
        description: 'PSU failure',
        steps: [
            'Go to the menu and toggle the mount button to unmount',
            'Select the PSU to unmount',
            'A dialog will appear asking if you want to remove the component or return it to the inventory', 
            'Select the remove option',
            'Go to the shop again and buy your preferred PSU',
            'Then after placing it in the canvas, go ahead and install it back in the chassis then proceed to reconnect all the cables to each component installed',
        ],
        troubleshooting: [
            {imageSrc: './assets/tbshoot/crt/1/1-1.png'},
            {imageSrc: './assets/tbshoot/crt/1/1-2.png'},
            {imageSrc: './assets/tbshoot/crt/1/1-3.png'},
            {imageSrc: './assets/tbshoot/crt/1/1-4.png'},
            {imageSrc: './assets/tbshoot/crt/1/1-5.png'},
            {imageSrc: './assets/tbshoot/crt/1/1-6.png'},
            {imageSrc: './assets/tbshoot/crt/1/1-7.png'},
            {imageSrc: './assets/tbshoot/crt/1/1-8.png'},
            {imageSrc: './assets/tbshoot/crt/1/1-9.png'},
        ],
    },
    'CRT-02': {
        code: 'CRT-02',
        severity: 'Critical',
        description: 'Motherboard failure',
        steps: [
            'Go to the menu and toggle the mount button to unmount',
            'Select the Motherboard to unmount',
            'A dialog will appear asking if you want to remove the component or return it to the inventory', 
            'Select the remove option',
            'After removing the faulty motherboard go to the shop again and buy your preferred Motherboard',
            'Then place the motherboard back in the chassis and reconnect all the cables',
        ],
        troubleshooting: [
            {imageSrc: './assets/tbshoot/crt/2/2-1.png'},
            {imageSrc: './assets/tbshoot/crt/2/2-2.png'},
            {imageSrc: './assets/tbshoot/crt/2/2-3.png'},
            {imageSrc: './assets/tbshoot/crt/2/2-4.png'},
            {imageSrc: './assets/tbshoot/crt/2/2-5.png'},
            {imageSrc: './assets/tbshoot/crt/2/2-6.png'},
            {imageSrc: './assets/tbshoot/crt/2/2-7.png'},
            {imageSrc: './assets/tbshoot/crt/2/2-8.png'},
            {imageSrc: './assets/tbshoot/crt/2/2-9.png'},
        ],

    },
    'CRT-03': {
        code: 'CRT-03',
        severity: 'Critical',
        description: 'CPU failure',
        steps: [
            'Go to the menu and toggle the mount button to unmount',
            'Select the CPU to unmount',
            'A dialog will appear asking if you want to remove the component or return it to the inventory', 
            'Select the remove option',
            'After removing the faulty CPU go to the shop again and buy your preferred CPU',
            'Then place the CPU back in the motherboard socket',
        ],
        troubleshooting: [
            {imageSrc: './assets/tbshoot/crt/3/3-1.png'},
            {imageSrc: './assets/tbshoot/crt/3/3-2.png'},
            {imageSrc: './assets/tbshoot/crt/3/3-3.png'},
            {imageSrc: './assets/tbshoot/crt/3/3-4.png'},
            {imageSrc: './assets/tbshoot/crt/3/3-5.png'},
            {imageSrc: './assets/tbshoot/crt/3/3-6.png'},
            {imageSrc: './assets/tbshoot/crt/3/3-7.png'},
            {imageSrc: './assets/tbshoot/crt/3/3-8.png'},
        ],

    },
    'CRT-04': {
        code: 'CRT-04',
        severity: 'Critical',
        description: 'RAM failure',
        steps: [
            'Go to the menu and toggle the mount button to unmount',
            'Select the RAM to unmount',
            'A dialog will appear asking if you want to remove the component or return it to the inventory', 
            'Select the remove option',
            'After removing the faulty RAM go to the shop again and buy your preferred RAM',
            'Then place the RAM back in the motherboard ram slot',
        ],
        troubleshooting: [
            {imageSrc: './assets/tbshoot/crt/4/4-1.png'},
            {imageSrc: './assets/tbshoot/crt/4/4-2.png'},
            {imageSrc: './assets/tbshoot/crt/4/4-3.png'},
            {imageSrc: './assets/tbshoot/crt/4/4-4.png'},
            {imageSrc: './assets/tbshoot/crt/4/4-5.png'},
            {imageSrc: './assets/tbshoot/crt/4/4-6.png'},
            {imageSrc: './assets/tbshoot/crt/4/4-7.png'},
            {imageSrc: './assets/tbshoot/crt/4/4-8.png'},
        ],

    },
    'CRT-05': {
        code: 'CRT-05',
        severity: 'Critical',
        description: 'Boot device failure',
        steps: [
            'Go to the menu and toggle the mount button to unmount',
            'Select the Storage device needed to be removed to unmount',
            'A dialog will appear asking if you want to remove the component or return it to the inventory', 
            'Select the remove option',
            'After removing the faulty storage device go to the shop again and buy your preferred storage device',
            'Then place the storage device back in the chassis and reconnect all the cables',
            'If you have an m.2 storage device, make sure to place it in the correct m.2 slot',
            'Proceed to install the operating system after installing the storage device',
            'To install the operating system go to the chatbot and type /open bios',
            'In the BIOS menu go to the Boot tab and check if you have an Operating System installed in the boot device',
            'If there is no OS in your storage device simply install an operating system by clicking the Install OS button',
            'Click the Restart Now to see if the operating system is installed',
        ],
        troubleshooting: [
            {imageSrc: './assets/tbshoot/crt/5/5-1.png'},
            {imageSrc: './assets/tbshoot/crt/5/5-2.png'},
            {imageSrc: './assets/tbshoot/crt/5/5-3.png'},
            {imageSrc: './assets/tbshoot/crt/5/5-4.png'},
            {imageSrc: './assets/tbshoot/crt/5/5-5.png'},
            {imageSrc: './assets/tbshoot/crt/5/5-6.png'},
            {imageSrc: './assets/tbshoot/crt/5/5-7.png'},
            {imageSrc: './assets/tbshoot/crt/5/5-8.png'},
            {imageSrc: './assets/tbshoot/crt/5/5-9.png'},
            {imageSrc: './assets/tbshoot/crt/5/5-10.png'},
            {imageSrc: './assets/tbshoot/crt/5/5-11.png'},
            {imageSrc: './assets/tbshoot/crt/5/5-12.png'},
        ],

    },
    'CRT-06': {
        code: 'CRT-06',
        severity: 'Critical',
        description: 'GPU failure',
        steps: [
            'Go to the menu and toggle the mount button to unmount',
            'Select the GPU to unmount',
            'A dialog will appear asking if you want to remove the component or return it to the inventory', 
            'Select the remove option',
            'After removing the faulty GPU go to the shop again and buy your preferred GPU',
            'Then place the GPU back in the motherboard PCIe slot and reconnect all the cables',
        ],
        troubleshooting: [
            {imageSrc: './assets/tbshoot/crt/6/6-1.png'},
            {imageSrc: './assets/tbshoot/crt/6/6-2.png'},
            {imageSrc: './assets/tbshoot/crt/6/6-3.png'},
            {imageSrc: './assets/tbshoot/crt/6/6-4.png'},
            {imageSrc: './assets/tbshoot/crt/6/6-5.png'},
            {imageSrc: './assets/tbshoot/crt/6/6-6.png'},
            {imageSrc: './assets/tbshoot/crt/6/6-7.png'},
            {imageSrc: './assets/tbshoot/crt/6/6-8.png'},
        ],

    },
    'CRT-07': {
        code: 'CRT-07',
        severity: 'Critical',
        description: 'Operating System corruption',
        steps: [
            'Go to the BIOS menu by typing /open bios in the chatbot',
            'In the BIOS menu go to the Boot tab and click the delete OS button',
            'A dialog will appear confirming the deletion of the OS',
            'Click the restart button to restart the system',
            'After restarting the system go to the BIOS menu again and click the Install OS button',
            'A dialog will confirming the successful installation of the OS',
            'Click the restart button to restart the system',
            'The system will restart and show OS booting screen',
        ],
        troubleshooting: [
            {imageSrc: './assets/tbshoot/crt/7/7-1.png'},
            {imageSrc: './assets/tbshoot/crt/7/7-2.png'},
            {imageSrc: './assets/tbshoot/crt/7/7-3.png'},
            {imageSrc: './assets/tbshoot/crt/7/7-4.png'},
            {imageSrc: './assets/tbshoot/crt/7/7-5.png'},
            {imageSrc: './assets/tbshoot/crt/7/7-6.png'},
            {imageSrc: './assets/tbshoot/crt/7/7-7.png'},
            {imageSrc: './assets/tbshoot/crt/7/7-8.png'},
        ],

    },

    // Error undefined
    'ERR-404': {
        code: 'ERR-100',
        severity: 'Error',
        description: 'UNDEFINED ERROR ',
    },
}

export default errorCodes;