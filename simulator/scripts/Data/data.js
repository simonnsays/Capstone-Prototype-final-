// import Component from "./component.js"

const components = [
    {        // NZXT H5 Flow [different storage orientation]
        name: 'NZXT H5 Flow',
        type: 'chassis',
        size: 'mid-tower',
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
    {        // B550 Aorus Elite v2 
        name: 'B550 Aorus Elite v2',
        type: 'motherboard',
        size: 'ATX',
        dimensions: {
            depth: 244,
            width: 244,
            height: 305
        },
        isRotatable: false,
        isAttached: false,
        defaultSource: 'pack',
        tableDisplay: 'left',
        images: [
            {side: 'pack', imageSrc: './assets/motherboard/Aorus/AM4/B550 AORUS ELITE V2-01.png'}, 
            {side: 'left', imageSrc: './assets/motherboard/Aorus/AM4/B550 AORUS ELITE V2-02.png'}, 
            {side: 'right', imageSrc: './assets/motherboard/backside.png'},
            {side: 'rear', imageSrc: './assets/motherboard/Aorus/AM4/B550 AORUS ELITE V2-05.png'} 
        ],
        slots: [
            {
                type: 'cpu', 
                supports: ['AM4'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 107, y: 75, width: 45, height: 45},
                        },
                        accessible: true // if able to attach to this side
                    }
                }
            },
            {
                type: 'gpu', 
                supports: ['pcie3'],
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
                           default: {x: 80, y: 46, width: 95, height: 105}
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
                            default: {x: 204, y: 25, width: 8, height: 137}
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
                            default: {x: 194, y: 25, width: 8, height: 137}
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
                            default: {x: 184, y: 25, width: 8, height: 137}
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
                            default: {x: 174, y: 25, width: 8, height: 137}
                        },
                        accessible: true
                    }
                }
            },
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
    {        // Ryzen 9 5900X
        name: 'AMD Ryzen 9 5900X',
        type: 'cpu',
        size: 'AM4',
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
            {side: 'left', imageSrc: './assets/cpu/amd/gen photos/amd am4.png'},  
            {side: 'PACK', imageSrc: './assets/cpu/amd/am4/Ryzen 9 5900X.png'},  
        ],
        slots: [],
        ports: []
    },
    {        // EVGA SuperNOVA 1600 G+
        name: 'EVGA SuperNOVA 1600 G+',
        type: 'psu',
        size: 'ATX',
        dimensions: {
            depth: 200,
            width: 150,
            height: 86,
        },
        specs: {
            wattage: 1600,
            cableModularity: 'semi-modular'
        },
        isRotatable: true,
        isAttached: false,
        defaultSource: 'PACK',
        images: [
            {side: 'PACK', imageSrc: './assets/psu/EVGA/EVGA SuperNOVA 1600 G+, 80+ GOLD 1600W/EVGA SuperNOVA 1600 G+ pack.png'}, 
            {side: 'left', imageSrc: './assets/psu/EVGA/EVGA SuperNOVA 1600 G+, 80+ GOLD 1600W/EVGA SuperNOVA 1600 G+ left.png'}, 
            {side: 'front', imageSrc: './assets/psu/EVGA/EVGA SuperNOVA 1600 G+, 80+ GOLD 1600W/EVGA SuperNOVA 1600 G+ front.png'}, 
            {side: 'right', imageSrc: './assets/psu/EVGA/EVGA SuperNOVA 1600 G+, 80+ GOLD 1600W/EVGA SuperNOVA 1600 G+ right.png'}, 
            {side: 'rear', imageSrc: './assets/psu/EVGA/EVGA SuperNOVA 1600 G+, 80+ GOLD 1600W/EVGA SuperNOVA 1600 G+ rear.png'}
        ],
        slots: [],
        ports: [
            {type: '24-pin-power',},
            {type: '8-pin-power'},
            {type: '8-pin-power'},
            {type: '8-pin-pcie'},
            {type: '8-pin-pcie'},
            {type: '6-pin-pcie'},
            // {type: '8-pin'},
            {type: 'sata-power'},
            {type: 'sata-power'},
            {type: 'sata-power'},
            {type: 'sata-power'},
        ],
        cables: [
            {type: '24-pin-power'},
            {type: '8-pin-power'},
            {type: '8-pin-power'},
            {type: '8-pin-pcie'},
            {type: '6-pin-pcie'},
            {type: '8-pin-pcie'},
            // {type: '8-pin'},
        ]
    },
    {        //Corsair Vengeance Pro DDR4
        name: 'Corsair Vengeance Pro DDR4',
        type: 'ram',
        size: 'ddr4',
        dimensions: {
            width: 100,
            height: 100,
            depth: 100
        },
        isRotatable: false,
        isAttached: false,
        defaultSource: 'PACK',
        tableDisplay: 'left',
        images: [
            {side: 'left', imageSrc: './assets/memory/corsair vengeance pro attached.png'},  
            {side: 'PACK', imageSrc: './assets/memory/corsair vengeance pro ddr4.png'},  
        ],
    },
    {        //Seagate Barracuda Q1 SSD
        name: 'Seagate Barracuda SSD',
        type: 'storage',
        size: 'ssd',
        dimensions: {
            depth: 125,
            width: 125,
            height: 125,
        },
        isRotatable: false,
        isAttached: false,
        defaultSource: 'PACK',
        tableDisplay: 'right',
        images: [
            {side: 'right', imageSrc: './assets/storage/ssd/seagate-barracuda-q1-ssd-front-lo-res.png'},  
            {side: 'PACK', imageSrc: './assets/storage/ssd/seagate-barracuda-q1-ssd-front-lo-res - Copy.png'},  
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
    {        //be quiet pure rock
        name: 'Be Quiet Pure Rock 2',
        type: 'cooling',
        specs: {
            category: 'cpu'
        }, 
        size: 'amd',
        dimensions: {
            width: 125,
            height: 125,
        },
        isRotatable: false,
        isAttached: false,
        defaultSource: 'pack',
        tableDisplay: 'pack',
        images: [
            {side: 'pack', imageSrc: './assets/cooling/be quiet pure rock.png'},  
            {side: 'left', imageSrc: './assets/cooling/be quiet pure rock fan.png'}
        ],
        slots: [],
        cables: [
                    {type: '3-pin-cooling'}
                ]
    },
    {        // Gigabyte Nvidia GeForce RTX 3060
        name: 'Gigabyte Nvidia GeForce RTX 3060',
        type: 'gpu',
        size: 'ATX',
        specs: {
            portCount: 1,
            portType: '8-pin'
        },
        dimensions: {
            width: 200,
            height: 200,
        },
        isRotatable: false,
        isAttached: false,
        defaultSource: 'pack',
        tableDisplay: 'pack',
        images: [
            {side: 'rear', imageSrc: './assets/gpu/rear1.png'}, 
            {side: 'left', imageSrc: './assets/gpu/nvidia geforce rtx 3060.png'}, 
            {side: 'pack', imageSrc: './assets/gpu.1/nvidia geforce rtx 3060.png'}
        ],
        slots: [],
        ports: [
            {type: '8-pin-pcie'}
        ]  
    },
    {        // Gigabyte Radeon RX 7900 XTX 16pin
        name: 'Gigabyte Radeon RX 7900 XTX',
        type: 'gpu',
        size: 'ATX',
        dimensions: {
            width: 200,
            height: 200,
        },
        isRotatable: false,
        isAttached: false,
        defaultSource: 'pack',
        tableDisplay: 'pack',
        images: [
            {side: 'left', imageSrc: './assets/gpu/Gigabyte Radeon RX 7900 XTX.png'}, 
            {side: 'rear', imageSrc: './assets/gpu/rear.png'}, 
            {side: 'pack', imageSrc: './assets/gpu.1/gigabyte radeon rx 7900 xtx.png'}
        ],
        slots: [],
        ports: [
            {
                type: '16-pin-pcie',
                style: 'split'
            }
        ]  
    }
]



export default components