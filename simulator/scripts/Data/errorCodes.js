const errorCodes = {
    'HZD-00': {
        code: 'ERR-100',
        severity: 'Hazard',
        description: 'low memory',
        // HAZARD DETAILS
    },
    'ERR-100': {
        code: 'ERR-100',
        severity: 'Error',
        name: 'Missing Component',
        description: 'Missing PSU Component',
        troubleshooting: 'Check if all components are properly installed and connected.'
    },
    'ERR-200': {
        code: 'ERR-100',
        severity: 'Error',
        description: 'Missing Motherboard Component',
    },
    'ERR-300': {
        code: 'ERR-100',
        severity: 'Error',
        description: 'Missing CPU Component',
    },
    'CRT-02': {
        // CRITICAL DETAILS
    },
    'ERR-404': {
        code: 'ERR-100',
        severity: 'Error',
        description: 'UNDEFINED ERROR ',
    },


    // old error codes
    'ERR-00': {
        code: 'ERR-00',
        severity: 'Error',
        name: 'Missing Component',
        description: 'A critical component is missing from the system.',
        troubleshooting: 'Check if all components are properly installed and connected.'
    },
    'ERR-01': {
        code: 'ERR-01',
        severity: 'Error',
        name: 'No Boot Device Found',
        description: 'The system did not detect a boot device.',
        troubleshooting: 'Check if the boot device is properly connected and configured in BIOS.'
    },
    'ERR-02': {
        code: 'ERR-02',
        severity: 'Error',
        name: 'Memory Error',
        description: 'The system detected a memory error.',
        troubleshooting: 'Reseat the memory modules and run a memory diagnostic tool.'
    },
    'ERR-03': {
        code: 'ERR-03',
        severity: 'Hazard',
        name: 'High Temperatures',
        description: 'The system is experiencing high temperatures.',
        troubleshooting: 'Ensure proper ventilation and check if the cooling system is functioning.'
    },
    'ERR-04': {
        code: 'ERR-04',
        severity: 'Critical',
        name: 'Hard Drive Failure',
        description: 'The system detected a hard drive failure.',
        troubleshooting: 'Run a hard drive diagnostic tool and consider replacing the hard drive.'
    },
    'ERR-05': {
        code: 'ERR-05',
        severity: 'Critical',
        name: 'BIOS Corruption',
        description: 'The BIOS is corrupted.',
        troubleshooting: 'Reset the BIOS to default settings or reflash the BIOS firmware.'
    },
    'ERR-06': {
        code: 'ERR-06',
        severity: 'Error',
        name: 'CPU Overheating',
        description: 'The CPU is overheating.',
        troubleshooting: 'Check if the CPU cooler is properly installed and consider replacing the thermal paste.'
    },
    'ERR-07': {
        code: 'ERR-07',
        severity: 'Error',
        name: 'Power Supply Failure',
        description: 'The system detected a power supply failure.',
        troubleshooting: 'Check if the power supply is properly connected and consider replacing it.'
    },
    'ERR-08': {
        code: 'ERR-08',
        severity: 'Error',
        name: 'GPU Failure',
        description: 'The system has not detected a GPU, resulting in no display.',
        troubleshooting: 'Check if the GPU is properly connected and consider replacing it.'
    },
    'ERR-09': {
        code: 'ERR-09',
        severity: 'Hazard',
        name: 'Power Surge',
        description: 'The system has detected a power hazard.',
        troubleshooting: 'Check if the power supply is still working properly by inspecting for possible visible damage then individually test major components like the motherboard, RAM, GPU, and hard drive to identify the damaged part on a known working system; if damage is confirmed, replace the affected components.'
    },
    'ERR-10': {
        code: 'ERR-10',
        severity: 'Hazard',
        name: 'Fan Speed Abnormal',
        description: 'The system detected abnormal fan speeds.',
        troubleshooting: 'Change the fan speed settings in BIOS or replace the fan if the fan speed is still the same after changing the fan settings in BIOS.'
    },
    'ERR-11': {
        code: 'ERR-11',
        severity: 'Critical',
        name: 'Power Failure',
        description: 'System did not boot due to power failure.',
        troubleshooting: 'Try to boot the system again and check if the system boots up. If the system does not boot up, check if the power supply is properly connected to an outlet; If the issue persists, check for loose cables inside the computer, examine the power supply unit (PSU) for potential damage, and consider testing the computer to another known working PSU if possible; if the problem is still present, you may need to look into potential hardware failures like a faulty motherboard or failing components within the computer.'
    },
}

export default errorCodes;