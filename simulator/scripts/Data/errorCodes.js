const errorCodes = {
    // Hazard errors
    'HZD-100': {
        code: 'HZD-100',
        severity: 'Hazard',
        description: 'CPU fan speed too low',
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
    'ERR-502': {
        code: 'ERR-502',
        severity: 'Error',
        description: 'No OS is installed in the boot device',
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
        code: 'CRT-01',
        severity: 'Critical',
        description: 'PSU failure',
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