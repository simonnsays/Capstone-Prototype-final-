const tutComponents = [
    {        // NZXT H5 Flow [different storage orientation]
        name: 'NZXT H5 Flow',
        type: 'chassis',
        size: 'mid-tower',
        specs:{
            price: 4350,
            color: 'White',
            size: 'Mid-Tower',
            dimensions:'430 mm (D) x 225 mm (W) x 465 mm (H)',      
        },
        dimensions: {
            depth: 446,
            width: 227,
            height: 464,
        },
        isRotatable: true,
        isAttached: false,
        defaultSource: 'left',
        images: [
            {side: 'left', imageSrc: './assets/chassis/NZXT/NZXT-H5-Flow-left.png'}, 
            {side: 'front', imageSrc: './assets/chassis/NZXT/NZXT-H5-Flow-front.png'}, 
            {side: 'right', imageSrc: './assets/chassis/NZXT/NZXT-H5-Flow-right.png'}, 
            {side: 'rear', imageSrc: './assets/chassis/NZXT/NZXT-H5-Flow-rear.png'}, 
        ],
        slots: [
            {
                type: 'motherboard', 
                supports: ['ATX', 'microATX', 'miniATX'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 50, y: 61, width:204, height: 265},
                            ATX: {x: 50, y: 61, width:204, height: 265},
                            microATX: {x: 50, y: 63, width:165, height: 165},
                            miniATX: {x: 50, y: 63, width:150, height: 150}
                        },
                        accessible: true // if able to attach to this side
                    },
                    rear: {
                        offsets: {
                            default: {x: 38, y: 35, width: 44, height: 165} 
                        },
                        accessible: false 
                    },
                    right:{
                        offsets: {
                        default: {x: 221, y: 62, width: 180, height: 129}
                    },
                    accessible: false
                    } // for cases with back view of motherboards
                }
            },
            {
                type: 'psu',
                supports: ['ATX', 'microATX', 'miniATX'],
                component: null,
                sides: {
                    rear: {
                        offsets: {
                            default: {x: 42, y: 363, width: 140, height: 86}
                        },
                        accessible: true
                    },
                    right: {
                        offsets: {
                            default: {x: 253, y: 345, width: 180, height: 86}
                        },
                        accessible: true
                    }
                    
                }
            },           
            {   // new sata
                type: 'storage', 
                supports: ['2.5', 'U.2', 'ssd'],
                component: null,
                sides: {
                    right: {
                        offsets: {
                            default: {x: 233, y: 215, width: 70, height: 90}
                        },
                        accessible: true
                    }
                }
            },
            {   // new sata
                type: 'storage', 
                supports: ['2.5', 'U.2', 'ssd'],
                component: null,
                sides: {
                    right: {
                        offsets: {
                            default: {x:323, y: 215, width: 70, height: 90}
                        },
                        accessible: true
                    }
                }
            }
        ],
        ports: [],
        cables: [
            {type: 'frontPanel'}
        ]
    },

    // MOtherboard
    {        // X570 PG Velocita
        name: 'ASRock X570 PG Velocita',
        type: 'motherboard',
        size: 'ATX',        
        watts: '100',
        specs:{
            price: 8995,
            chipset: 'AMD X550',
            cpuslot: 'AMD AM4',
            slots: 'Dual channel DDR4 DIMM slots, PCIe x16',
            ports: 'FrontPanel, 24-pin power, 8-pin power, SATA, CPU cooling',
            storage: 'SATA',
            dimensions:'244 mm (D) x 244 mm (W) x 305 mm (H)',
        },
        dimensions: {
            depth: 244,
            width: 244,
            height: 305
        },
        isRotatable: false,
        isAttached: false,
        defaultSource: 'PACK',
        tableDisplay: 'left',
        images: [
            {side: 'PACK', imageSrc: './assets/motherboard/ASRock/AM4/X570 PG Velocita(L1).png'}, 
            {side: 'left', imageSrc: './assets/motherboard/ASRock/AM4/X570 PG Velocita(L2).png'}, 
            {side: 'right', imageSrc: './assets/motherboard/backside.png'},
            {side: 'rear', imageSrc: './assets/motherboard/ASRock/AM4/X570 PG Velocita(L5).png'} 
        ],
        slots: [
            {
                type: 'cpu', 
                supports: ['AM4'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 108, y: 71, width: 45, height: 45},
                        },
                        accessible: true // if able to attach to this side
                    }
                }
            },
            {
                type: 'gpu', 
                supports: ['pcie4'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 1, y: 170, width: 200, height: 40},
                        },
                        accessible: true // if able to attach to this side
                    }, 
                    rear: {
                        offsets: {
                            default: {x: 10, y: 350, width: 560, height: 164},
                        },
                        accessible: false
                    }
                }
            },
         {
               type: 'cooling',
               supports: ['AMD'],
               component: null,
               sides: {    
                   left: {
                       offsets: {
                           default: {x: 85, y: 40, width: 95, height: 105}
                       },
                       accessible: true
                   }
               }
           },
            {
                type: 'ram',
                supports: ['ddr4'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 214, y: 28, width: 8, height: 140}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'ram',
                supports: ['ddr4'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 204, y: 28, width: 8, height: 140}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'ram',
                supports: ['ddr4'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 194, y: 28, width: 8, height: 140}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'ram',
                supports: ['ddr4'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 184, y: 28, width: 8, height: 140}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'storage',
                supports: ['m.2'],
                hidden: true,
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 63, y: 153, width: 80, height: 20}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'storage',
                supports: ['m.2'],
                hidden: true,
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 67, y: 256, width: 80, height: 20}
                        },
                        accessible: true
                    }
                }
            }

        ],
        ports: [
            {type: '24-pin-power'},
            {type: '8-pin-power'},
            {type: 'sata-data'},
            {type: 'sata-data'},
            {type: 'sata-data'},
            {type: 'sata-data'},
            {type: 'cooling'},
            {type: 'frontPanel'},
        ],
        cables: []
    },

    // CPU
        {        // Ryzen 9 5900X
        name: 'AMD Ryzen 9 5900X',
        type: 'cpu',
        size: 'AM4',
        watts: '255',
        specs:{
            price: 18550,
            generation: 'Ryzen 9 Zen 3 (Vermeer)',
            socket: 'AMD AM4',
            cores: '12',
            baseclock: '3.7 GHz',
            boostclock: '4.8 GHz',
            TDP: '255W',
        },
        dimensions: {
            depth: 125,
            width: 125,
            height: 125,
        },
        isRotatable: false,
        isAttached: false,
        defaultSource: 'PACK',
        tableDisplay: 'PACK',
        images: [
            {side: 'PACK', imageSrc: './assets/cpu/amd/am4/Ryzen 9 5900X.png'},  
            {side: 'left', imageSrc: './assets/cpu/amd/gen photos/amd am4.png'},  
        ],
        slots: [],
        ports: []
    },
        {        // EVGA Supernova 1300 P+
        name: 'EVGA Supernova 1300 P+',
        type: 'psu',
        size: 'ATX',
        specs:{
            price: 12269,
            wattage: 1300,
            cableModularity: 'modular',
            cables: '24-pin-power,8-pin-power, 8-pin-pcie, 6-pin-pcie, sata-power',
            ports: '24-pin-power,8-pin-power, 8-pin-pcie, 6-pin-pcie, sata-power'
        },
        dimensions: {
            width: 150,
            height: 150,
            depth: 200,
        },
        watts: '1300',
        isRotatable: true,
        isAttached: false,
        defaultSource: 'PACK',
        tableDisplay: 'left',
        images: [
            {side: 'PACK', imageSrc: './assets/psu/EVGA/EVGA SuperNOVA/EVGA SuperNOVA 1300 P+ - pack.png'}, 
            {side: 'left', imageSrc: './assets/psu/EVGA/EVGA SuperNOVA/EVGA SuperNOVA 1300 P+ - left.png'}, 
            {side: 'front', imageSrc: './assets/psu/EVGA/EVGA SuperNOVA/EVGA SuperNOVA 1300 P+ - front.png'}, 
            {side: 'right', imageSrc: './assets/psu/EVGA/EVGA SuperNOVA/EVGA SuperNOVA 1300 P+ - right.png'}, 
            {side: 'rear', imageSrc: './assets/psu/EVGA/EVGA SuperNOVA/EVGA SuperNOVA 1300 P+ - rear.png'}
        ],
        slots: [],
        ports: [
            {type: '24-pin-power',},
            {type: '8-pin-power'},
            {type: '8-pin-power'},
            {type: '8-pin-pcie'},
            {type: '8-pin-pcie'},
            {type: '8-pin-pcie'},
            {type: '8-pin-pcie'},
            {type: '6-pin-pcie'},
            {type: '6-pin-pcie'},
            {type: 'sata-power'},
            {type: 'sata-power'},
            {type: 'sata-power'},
            {type: 'sata-power'},
        ],
        cables: [
            {type: '24-pin-power',},
            {type: '8-pin-power'},
            {type: '8-pin-power'},
            {type: '8-pin-pcie'},
            {type: '8-pin-pcie'},
            {type: '8-pin-pcie'},
            {type: '8-pin-pcie'},
            {type: '6-pin-pcie'},
            {type: '6-pin-pcie'},
        ]
    },

    // Storage
        { //Seagate Barracuda
        name: 'Seagate Barracuda',
        type: 'storage',
        size: 'hdd',
        watts: '10',
        specs:{ 
            price: 2900,
            bootable: true,
            rpm: '5400',
            interface: 'SATA',
            formFactor: 'HDD 3.5"',
        },
        dimensions: {
            depth: 125,
            width: 125,
            height: 125,
        },
        osInstalled: false, 
        isRotatable: false,
        isAttached: false,
        defaultSource: 'PACK',
        tableDisplay: 'PACK',
        images: [
            {side: 'PACK', imageSrc: './assets/storage/hdd/Seagate Barracuda 8tb.png'},  
            {side: 'left', imageSrc: './assets/storage/defaulthdd.png'},  
            {side: 'right', imageSrc: './assets/storage/defaulthdd.png'},   
        ],
        slots: [],
        ports: [
            {type: 'sata'}
        ],
        cables: [
            {type: 'sata-power'},
            {type: 'sata-data'}
        ]
    },
    { //Seagate Barracuda Q1 SSD
    name: 'Seagate Barracuda SSD',
    type: 'storage',
    size: 'ssd',
    watts: '4',
    specs:{ 
        price: 3950,
        bootable: true,
        formFactor: '2.5"',
        interface: 'SATA',
        read: '550MB/s',
        write: '500MB/s',
    },
    dimensions: {
        depth: 125,
        width: 125,
        height: 125,
    },
    osInstalled: false,
    isRotatable: false,
    isAttached: false,
    defaultSource: 'PACK',
    tableDisplay: 'PACK',
    images: [
        {side: 'PACK', imageSrc: './assets/storage/ssd/seagate-barracuda-q1-ssd-front-lo-res - Copy.png'},  
        {side: 'left', imageSrc: './assets/storage/ssd/seagate-barracuda-q1-ssd-front-lo-res.png'},  
        {side: 'right', imageSrc: './assets/storage/ssd/seagate-barracuda-q1-ssd-front-lo-res.png'},  
    ],
    slots: [],
    ports: [
        {type: 'sata'}
    ],
    cables: [
        {type: 'sata-power'},
        {type: 'sata-data'}
    ]
    }, 
    //cooling
        { //AMD wraith Prism
    name: 'AMD wraith Prism',
    type: 'cooling',
    size: 'amd',
    specs:{
        price: 3122,
        category: 'cpu',
        design: 'Tower Style with a copper base',
        fan: '120mm',
        rpm: '800-2000',
        TDP: '150W',
        mount: 'AM4/AM5',
    },
    watts: '150',
    dimensions: {
        width: 200,
        height: 200,
        depth: 200,
    },
    isRotatable: false,
    isAttached: false,
    defaultSource: 'pack',
    tableDisplay: 'pack',
    images: [
        {side: 'pack', imageSrc: './assets/cooling/amd wraith prism pack.png'},  
        {side: 'left', imageSrc: './assets/cooling/amd wraith prism fan.png'}
    ],
    slots: [],
    ports: [
        {type: 'cooling'}
    ],
    cables: [
        {type: '3-pin-cooling'}
    ]
    }, 
    // ram
        { //Kingston HyperX Beast RGB
    name: 'Kingston HyperX Beast RGB DDR4',
    type: 'ram',
    size: 'ddr4',
    watts: '3',
    specs:{
        price: 3995,
        color: 'RGB',
        type: 'DDR4',
        size: 'DIMM',
        watts: '3',
    },
    dimensions: {
      width: 133,
      height: 133,
      depth: 100,
    },
    isRotatable: false,
    isAttached: false,
    defaultSource: 'PACK',
    tableDisplay: 'PACK',
    images: [
        {side: 'PACK', imageSrc: './assets/memory/HyperX Beast RGB DDR4 pack.png'},  
        {side: 'left', imageSrc: './assets/memory/HyperX Beast RGB DDR4 attached.png'},  
    ],
    },
    // GPU
        {        // Gigabyte Radeon RX 7900 XTX 16pin
    name: 'Gigabyte Radeon RX 7900 XTX',
    type: 'gpu',
    size: 'ATX',
    specs: {
        price: 66950,
        portCount: 2,
        portType: '16-pin-pcie',
        architecture: 'AMD RDNA 3',
        baseClock: '2.3 GHz',
        boostClock: '2.5 GHz',
        memory: '24GB GDDR6',
    },
    watts: '170',
    dimensions: {
        width: 200,
        height: 200,
        depth: 200,
    },
    isRotatable: false,
    isAttached: false,
    defaultSource: 'pack',
    tableDisplay: 'pack',
    images: [
        {side: 'pack', imageSrc: './assets/gpu.1/gigabyte radeon rx 7900 xtx.png'},  
        {side: 'left', imageSrc: './assets/gpu/Gigabyte Radeon RX 7900 XTX.png'},
        {side: 'rear', imageSrc: './assets/gpu/rear.png'}, 
    ],
    slots: [],
    ports: [
        {
            type: '16-pin-pcie',
            style: 'split'
        }
    ]  
    },
]

export default tutComponents
