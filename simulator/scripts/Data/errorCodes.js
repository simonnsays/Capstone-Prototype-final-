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
    'HZD-101': {
        code: 'HZD-101',
        severity: 'Hazard',
        description: 'Insufficient cooling detected',
        troubleshooting: [
            "Check if the case fans are spinning properly.",
            "Ensure that the case fans are connected to the correct headers on the motherboard.",
            "Ensure that the thermal paste is applied correctly and evenly.",
            "Check the CPU and GPU temperatures in the BIOS/UEFI."
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
            "Verify that a PSU is physically installed in the chassis.",
            "Confirm that all power cables (both to the motherboard and other components) are properly connected.",
            "If PSU is still missing try changing into another one from the shop."
        ],    
    },
    'ERR-200': {
        code: 'ERR-200',
        severity: 'Error',
        description: 'Missing Motherboard component',
        troubleshooting: [
            "Ensure that the motherboard is correctly seated in the case.",
            "Verify that the motherboard’s power connectors (e.g., the 24-pin ATX connector) are connected.",
            "If motherboard is still missing please replace the component into another one from the shop"
        ],
    },
    'ERR-201': {
        code: 'ERR-201',
        severity: 'Error',
        description: 'Missing Front Panel connection',
        troubleshooting: [
            "Refer to the motherboard manual to locate the front panel header.",
            "Confirm that the cables for the power button, reset button, and LEDs are firmly attached.",
            "Ensure there are no bent pins or misaligned connectors."
        ],
    },
    'ERR-202': {
        code: 'ERR-202',
        severity: 'Error',
        description: 'Motherboard not powered',
        troubleshooting: [
            "Double-check that the PSU is fully functional and working",
            "Inspect the power switch on the case or PSU for proper operation.",
            "Check if every cable ports on motherboard has a cable properly attached."
        ],
    },
    'ERR-300': {
        code: 'ERR-301',
        severity: 'Error',
        description: 'Missing CPU component',
        troubleshooting: [
            "Confirm that the CPU is installed in the correct socket with the proper orientation.",
            "Look for any bent pins (if using a pin grid array) or debris in the socket.",
            "Reseat the CPU carefully and apply thermal paste if necessary."
        ],
    },
    'ERR-301': {
        code: 'ERR-301',
        severity: 'Error',
        description: 'CPU not powered',
        troubleshooting: [
            "Verify that the dedicated CPU power connector (often an 8-pin or 4-pin connector) is securely attached.",
            "Ensure that the PSU cable supplying power to the CPU is in good condition. If the PSU is a fully modular PSU check the cable on the PSU and attach the cable firmly into the port",
        ],
    },
    'ERR-400': {
        code: 'ERR-400',
        severity: 'Error',
        description: 'Missing RAM component',
        troubleshooting: [
            "Ensure that the RAM modules are firmly inserted into the correct slots.",
            "Remove and reseat the RAM to clear any possible connection issues.",
            "Test with one module at a time to isolate potential faulty sticks."
        ],
    },
    'ERR-500': {
        code: 'ERR-500',
        severity: 'Error',
        description: 'Missing storage device',
        troubleshooting: [
            "Check that the storage device is physically installed in its drive bay.",
            "Verify that the SATA connections (and power cables) are secure.",
            "Confirm that the storage device is recognized in the BIOS/UEFI."
        ],
    },
    'ERR-501': {
        code: 'ERR-501',
        severity: 'Error',
        description: 'Storage device is not powered',
        troubleshooting: [
            "Ensure that the power connector from the PSU is properly attached to the storage device.",
            "Look for any signs of cable damage or loose connections.",
            "Test with another power cable or PSU connector if available."
        ],
    },
    'ERR-600': {
        code: 'ERR-600',
        severity: 'Error',
        description: 'Missing Graphics Card Unit',
        troubleshooting: [
            "Verify that the graphics card is installed in the proper PCIe slot.",
            "Check that any auxiliary power connectors on the graphics card are connected.",
            "Reseat the graphics card to ensure it is firmly in place."
        ],
    },
    'ERR-601': {
        code: 'ERR-601',
        severity: 'Error',
        description: 'Graphics Card Unit is not powered',
        troubleshooting: [
            "Inspect the power cables from the PSU to the graphics card.",
            "Ensure that the PCIe slot is functioning correctly.",
            "Ensure that the GPU is firmly attached to the PCIe slot. Test the graphics card in another slot (if available) or on another system to rule out hardware failure."
        ],
    },
    'ERR-700': {
        code: 'ERR-700',
        severity: 'Error',
        description: 'Missing CPU cooler',
        troubleshooting: [
            "Confirm that a compatible CPU cooler is installed.",
            "If missing, install an appropriate cooler immediately to prevent overheating.",
            "Check that the cooler is compatible with your CPU socket type if not install a different mounting mechanism for your CPU cooler."
        ],
    },
    'ERR-701': {
        code: 'ERR-701',
        severity: 'Error',
        description: 'CPU cooler not powered',
        troubleshooting: [
            "Ensure that the fan’s power cable is connected to the correct CPU fan header on the motherboard.",
            "Check that the fan spins freely and is not obstructed.",
        ],
    },

    // Critical errors
    'CRT-01': {
        code: 'CRT-01',
        severity: 'Critical',
        description: 'BIOS/UEFI corruption',
        troubleshooting: [
            "Attempt to reset the BIOS/UEFI to default settings.",
            "Flash the BIOS/UEFI with the latest firmware version.",
            "If the issue persists, consider replacing the motherboard."
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
        code: 'CRT-05',
        severity: 'Critical',
        description: 'GPU failure',
        troubleshooting: [
            "Test the GPU on another system to confirm hardware failure.",
            "Check for any physical damage or loose connections on the GPU.",
            "If the issue persists, consider replacing the GPU."
        ],
    },
    'CRT-06': {
        code: 'CRT-06',
        severity: 'Critical',
        description: 'PSU failure',
        troubleshooting: [
            "Test the PSU with a multimeter to check for proper voltage output.",
            "Inspect the PSU for any visible damage or signs of overheating.",
            "If the issue persists, consider replacing the PSU."
        ],
    },
    'CRT-07': {
        code: 'CRT-07',
        severity: 'Critical',
        description: 'Overheating issue',
        troubleshooting: [
            "Check for proper airflow and ventilation in the case.",
            "Ensure that all fans are functioning correctly.",
            "Consider upgrading the cooling system if necessary."
        ],
    },
    'CRT-08': {
        code: 'CRT-08',
        severity: 'Critical',
        description: 'Boot device failure',
        troubleshooting: [
            "Check the boot device (e.g., HDD, SSD) for any physical damage.",
            "Test the boot device on another system to confirm hardware failure.",
            "If the issue persists, consider replacing the boot device."
        ],
    },
    'CRT-09': {
        code: 'CRT-09',
        severity: 'Critical',
        description: 'Operating System corruption',
        troubleshooting: [
            "Attempt to repair the OS using the installation media.",
            "Reinstall the OS if repair is not possible.",
            "Consider backing up important data before reinstalling the OS."
        ],
    },

    // Error undefined
    'ERR-404': {
        code: 'ERR-100',
        severity: 'Error',
        description: 'UNDEFINED ERROR ',
    },

// -------------------------------------------------old error codes------------------------------------------------------------------------
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