const errorCodes = {
    // Hazard errors
    'HZD-100': {
        code: 'HZD-100',
        severity: 'Hazard',
        description: 'CPU fan speed too low',
        troubleshooting: [
             "Check if the CPU fan is spinning properly.",
             "Ensure that the CPU fan is connected to the correct header on the motherboard.",
             "Check the BIOS settings for fan speed control and adjust if necessary."
        ],
    },
    'HZD-200': {
        code: 'HZD-200',
        severity: 'Hazard',
        description: 'High CPU temperature',
        troubleshooting: [
            "Check if the CPU cooler is properly installed and making good contact with the CPU.",
            "Ensure that the thermal paste is applied correctly and evenly.",
            "Check the CPU fan speed and make adjustments in the BIOS/UEFI if necessary."
        ],
    },
    'HZD-201': {
        code: 'HZD-201',
        severity: 'Hazard',
        description: 'High System temperature',
        troubleshooting: [
            "Check if the CPU cooler is properly installed and making good contact with the CPU.",
            "Ensure that the thermal paste is applied correctly and evenly.",
            "Check the CPU fan speed and make adjustments in the BIOS/UEFI if necessary."
        ],
    },
    'HZD-300': {
        code: 'HZD-300',
        severity: 'Hazard',
        description: 'High GPU temperature',
        troubleshooting: [
            "Check if the GPU cooler is properly installed and making good contact with the GPU.",
            "Ensure that the thermal paste is applied correctly and evenly.",
            "Try closing any background applications that may be causing the GPU to overheat.",
            "Check the GPU fan speed and adjust using dedicated software if necessary."
        ],
    },

    // Missing component/cables errors
    'ERR-100': {
        code: 'ERR-100',
        severity: 'Error',
        description: 'Missing PSU component',
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
        troubleshooting: [
            {imageSrc: './assets/tbshoot/err/200/200-1.png'},
            {imageSrc: './assets/tbshoot/err/200/200-2.png'},
        ],
    },
    'ERR-201': {
        code: 'ERR-201',
        severity: 'Error',
        description: 'Missing Front Panel connection',
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
        troubleshooting: [
            {imageSrc: './assets/tbshoot/err/300/300-1.png'},
            {imageSrc: './assets/tbshoot/err/300/300-2.png'},
        ],
    },
    'ERR-301': {
        code: 'ERR-301',
        severity: 'Error',
        description: 'CPU not powered',
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
        troubleshooting: [
            {imageSrc: './assets/tbshoot/err/400/400-1.png'},
            {imageSrc: './assets/tbshoot/err/400/400-2.png'},
        ],
    },
    'ERR-500': {
        code: 'ERR-500',
        severity: 'Error',
        description: 'Missing storage device',
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
        troubleshooting: [
            {imageSrc: './assets/tbshoot/err/501/501-1.png'},
            {imageSrc: './assets/tbshoot/err/501/501-2.png'},
            {imageSrc: './assets/tbshoot/err/501/501-3.png'},
            {imageSrc: './assets/tbshoot/err/501/501-4.png'},
        ],
    },
    'ERR-600': {
        code: 'ERR-600',
        severity: 'Error',
        description: 'Missing Graphics Card Unit',
        troubleshooting: [
            {imageSrc: './assets/tbshoot/err/600/600-1.png'},
            {imageSrc: './assets/tbshoot/err/600/600-2.png'},
        ],
    },
    'ERR-601': {
        code: 'ERR-601',
        severity: 'Error',
        description: 'Graphics Card Unit is not powered',
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
        troubleshooting: [
            {imageSrc: './assets/tbshoot/err/700/700-1.png'},
            {imageSrc: './assets/tbshoot/err/700/700-2.png'},
        ],
    },
    'ERR-701': {
        code: 'ERR-701',
        severity: 'Error',
        description: 'CPU cooler not powered',
        troubleshooting: [
            {imageSrc: './assets/tbshoot/err/701/701-1.png'},
            {imageSrc: './assets/tbshoot/err/701/701-2.png'},
            {imageSrc: './assets/tbshoot/err/701/701-3.png'},
        ],
    },

    // Critical errors
    'CRT-01': {
        code: 'CRT-06',
        severity: 'Critical',
        description: 'PSU failure',
        troubleshooting: [
            "Test the PSU with a multimeter to check for proper voltage output.",
            "Inspect the PSU for any visible damage or signs of overheating.",
            "If the issue persists, consider replacing the PSU."
        ],
    },
    'CRT-02': {
        code: 'CRT-02',
        severity: 'Critical',
        description: 'CPU failure',
        troubleshooting: [
            "Check for any physical damage to the CPU.",
            "Reseat the CPU and ensure that it is properly installed.",
            "Test the CPU on another system to confirm hardware failure."
        ],
    },
    'CRT-03': {
        code: 'CRT-03',
        severity: 'Critical',
        description: 'Motherboard failure',
        troubleshooting: [
            "Inspect the motherboard for any visible damage or blown capacitors.",
            "Test the motherboard with minimal components to isolate the issue.",
            "If the issue persists, consider replacing the motherboard."
        ],
    },
    'CRT-04': {
        code: 'CRT-04',
        severity: 'Critical',
        description: 'RAM failure',
        troubleshooting: [
            "Test each RAM module individually to identify the faulty module.",
            "Reseat the RAM modules and ensure they are properly installed.",
            "If the issue persists, consider replacing the faulty RAM module."
        ],
    },
    'CRT-05': {
        code: 'CRT-08',
        severity: 'Critical',
        description: 'Boot device failure',
        troubleshooting: [
            "Check the boot device (e.g., HDD, SSD) for any physical damage.",
            "Test the boot device on another system to confirm hardware failure.",
            "If the issue persists, consider replacing the boot device."
        ],
    },
    'CRT-06': {
        code: 'CRT-05',
        severity: 'Critical',
        description: 'GPU failure',
        troubleshooting: [
            "Test the GPU on another system to confirm hardware failure.",
            "Check for any physical damage or loose connections on the GPU.",
            "If the issue persists, consider replacing the GPU."
        ],
    },
    'CRT-07': {
        code: 'CRT-06',
        severity: 'Critical',
        description: 'PSU failure',
        troubleshooting: [
            "Test the PSU with a multimeter to check for proper voltage output.",
            "Inspect the PSU for any visible damage or signs of overheating.",
            "If the issue persists, consider replacing the PSU."
        ],
    },
    'CRT-08': {
        code: 'CRT-08',
        severity: 'Critical',
        description: 'Overheating issue',
        troubleshooting: [
            "Check for proper airflow and ventilation in the case.",
            "Ensure that all fans are functioning correctly.",
            "Consider upgrading the cooling system if necessary."
        ],
    },


    // Software errors
    'CRT-0': {
        code: 'CRT-0',
        severity: 'Critical',
        description: 'Operating System corruption',
        troubleshooting: [
            "Attempt to repair the OS using the installation media.",
            "Reinstall the OS if repair is not possible.",
            "Consider backing up important data before reinstalling the OS."
        ],
    },
    
    'CRT-0': {
        code: 'CRT-0',
        severity: 'Critical',
        description: 'BIOS/UEFI corruption',
        troubleshooting: [
            "Attempt to reset the BIOS/UEFI to default settings.",
            "Flash the BIOS/UEFI with the latest firmware version.",
            "If the issue persists, consider replacing the motherboard."
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