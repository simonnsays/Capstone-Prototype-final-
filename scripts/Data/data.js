import Component from "./component.js"

const components = [
    new Component ({        // CASE
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
            {side: 'left', imageSrc: './assets/chassis/NZXT-H5-Flow-left.png'}, 
            {side: 'front', imageSrc: './assets/chassis/NZXT-H5-Flow-front.png'}, 
            {side: 'right', imageSrc: './assets/chassis/NZXT-H5-Flow-right.png'}, 
            {side: 'rear', imageSrc: './assets/chassis/NZXT-H5-Flow-rear.png'}, 
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
                            microATX: {x: 50, y: 63, width:204, height: 204},
                            miniATX: {x: 50, y: 63, width:150, height: 150}
                        },
                        accessible: true // if able to attach to this side
                    },
                    rear: {
                        offsets: {
                            default: {x: 38, y: 35, width: 44, height: 165} 
                        },
                        accessible: false 
                    }
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
                supports: ['HDD', '2.5', 'U.2'],
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
                supports: ['HDD', '2.5', 'U.2'],
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
        cables: []
    }),
    new Component ({        // MOBO
        name: 'MSI MPG Z790 Carbon Max WiFi',
        type: 'motherboard',
        size: 'ATX',
        dimensions: {
            depth: 244,
            width: 244,
            height: 305
        },
        isRotatable: false,
        isAttached: false,
        defaultSource: 'left',
        images: [
            {side: 'left', imageSrc: './assets/motherboard/msi-mobo.png'}, 
            {side: 'rear', imageSrc: './assets/motherboard/msi-IO.png'} 
        ],
        slots: [
            {
                type: 'cpu', 
                supports: ['LGA 1700'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 113, y: 73, width: 45, height: 45},
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
                            default: {x: 10, y: 173, width: 150, height: 50},
                        },
                        accessible: true // if able to attach to this side
                    }
                }
            },
            {       // NEW ADDITION
                type: 'cooling', 
                supports: ['amd', 'intel'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 90, y: 52, width: 90, height: 90},
                        },
                        accessible: true // if able to attach to this side
                    }
                }
            },
        ],
        ports: [
            {type: '24-pin-power'},
            {type: '8-pin-power'},
            {type: 'sata-data'},
            {type: 'cooling'},
        ],
        cables: []
    }),
    new Component ({        // CPU
        name: 'Intel Core i7-13700K',
        type: 'cpu',
        size: 'LGA 1700',
        dimensions: {
            depth: 125,
            width: 125,
            height: 125,
        },
        isRotatable: false,
        isAttached: false,
        defaultSource: 'left',
        images: [
            {side: 'left', imageSrc: './assets/cpu/Intel Core i7-13700K.png'},  
        ],
        slots: [],
        ports: []
    }),
    new Component ({        // PSU
        name: 'EVGA Supernova 1300 P+, 80+ Platinum 1300W',
        type: 'psu',
        size: 'ATX',
        dimensions: {
            depth: 200,
            width: 150,
            height: 86,
        },
        isRotatable: true,
        isAttached: false,
        defaultSource: 'left',
        images: [
            {side: 'left', imageSrc: './assets/psu/EVGA SuperNOVA 1300 P+ - left.png'}, 
            {side: 'front', imageSrc: './assets/psu/EVGA SuperNOVA 1300 P+ - front.png'}, 
            {side: 'right', imageSrc: './assets/psu/EVGA SuperNOVA 1300 P+ - right.png'}, 
            {side: 'rear', imageSrc: './assets/psu/EVGA SuperNOVA 1300 P+ - rear.png'}
        ],
        slots: [],
        ports: [
            {type: '24-pin-power',},
            {type: '8-pin-power'},
            {type: '8-pin-power'},
            {type: '8-pin-pcie'},
            {type: '8-pin-pcie'},
            {type: 'sata-power'},
        ],
        cables: [
            {type: '24-pin-power'},
            {type: '8-pin-power' },
            {type: '8-pin-power'},
            {type: '8-pin-pcie'},
            {type: '8-pin-pcie'}
        ]
    }),
    new Component ({        // GPU
        name: 'EVGA Supernova 1300 P+, 80+ Platinum 1300W',
        type: 'gpu',
        size: 'ATX',
        dimensions: {
            depth: 304,
            width: 61,
            height: 137,
        },
        isRotatable: false,
        isAttached: false,
        defaultSource: 'left',
        images: [
            {side: 'left', imageSrc: './assets/gpu/geforce-rtx-4090-attached.png'}, 
            
        ],
        slots: [],
        ports: [
            {type: '8-pin-pcie'}
        ],
        cables: []
    }),
    new Component ({        // SATA
        name: 'EVGA Supernova 1300 P+, 80+ Platinum 1300W',
        type: 'storage',
        size: '2.5',
        dimensions: {
            depth: 100,
            width: 100,
            height: 100
        },
        isRotatable: false,
        isAttached: false,
        defaultSource: 'left',
        images: [
            {side: 'left', imageSrc: './assets/storage/seagate-barracuda-default.png'}, 
            {side: 'right', imageSrc: './assets/storage/seagate-barracuda-attached.png'},       
        ],
        slots: [],
        ports: [
            {type: 'sata'}
        ],
        cables: [
            {type: 'sata-power'},
            {type: 'sata-data'}
        ]
    }),
    new Component ({        // CPU FAN ====== new addition
        name: 'AMD Wraith Spire',
        type: 'cooling',
        size: 'default',
        dimensions: {
            depth: 140,
            width: 140,
            height: 140
        },
        isRotatable: false,
        isAttached: false,
        defaultSource: 'left',
        images: [
            {side: 'left', imageSrc: './assets/cooling/amd wraith spire.png'},     
        ],
        slots: [],
        ports: [],
        cables: [
            {type: '3-pin-cooling'}
        ]
    })
]

components.forEach(component => {
    Component.handleComponent(component)
})

export default components