const errorCodes ={
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
        severity: 'Error',
        name: 'Overheating',
        description: 'The system is overheating.',
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
    }
}
export default errorCodes;