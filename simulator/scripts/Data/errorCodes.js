const errorCodes = {
    'HZD-00': {
        severity: 'Hazard',
        description: 'low memory',
        // HAZARD DETAILS
    },
    'ERR-100': {
        severity: 'Error',
        description: 'Missing PSU Component',
    },
    'ERR-200': {
        severity: 'Error',
        description: 'Missing Motherboard Component',
    },
    'ERR-300': {
        severity: 'Error',
        description: 'Missing CPU Component',
    },
    'CRT-02': {
        // CRITICAL DETAILS
    },
    'ERR-404': {
        severity: 'Error',
        description: 'UNDEFINED ERROR',
    }
}

export default errorCodes;