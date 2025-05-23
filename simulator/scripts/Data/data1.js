import Component from "./component.js"

const components = [
    // CASE
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
    {        // Corsair AF Render
        name: 'Corsair 3000D AF',
        type: 'chassis',
        size: 'mid-tower',
        specs:{
            price: 4850,
            color: 'Black',
            size: 'Mid-Tower',
            dimensions:'462 mm (D) x 230 mm (W) x 466 mm (H)',          
        },
        dimensions: {
            depth: 466,
            width: 230,
            height: 466,
        },
        isRotatable: true,
        isAttached: false,
        defaultSource: 'left',
        images: [
            {side: 'left', imageSrc: './assets/chassis/Corsair/3000D RENDER 04.png'}, 
            {side: 'front', imageSrc: './assets/chassis/Corsair/3000D RENDER 09.png'}, 
            {side: 'right', imageSrc: './assets/chassis/Corsair/3000D RENDER 05.png'}, 
            {side: 'rear', imageSrc: './assets/chassis/Corsair/3000D RENDER 07.png'}, 
        ],
        slots: [
            {
                type: 'motherboard', 
                supports: ['ATX', 'microATX', 'miniATX'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 50, y: 55, width:204, height: 265},
                            ATX: {x: 50, y: 61, width:204, height: 265},
                            microATX: {x: 50, y: 63, width:165, height: 165},
                            miniATX: {x: 50, y: 63, width:150, height: 150}
                        },
                        accessible: true // if able to attach to this side
                    },
                    rear: {
                        offsets: {
                            default: {x: 32, y: 25, width: 48, height: 165} 
                        },
                        accessible: false 
                    },
                    right:{
                        offsets: {
                        default: {x: 230, y: 62, width: 200, height: 129}
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
                            default: {x: 40, y: 348, width: 145, height: 88}
                        },
                        accessible: true
                    },
                    right: {
                        offsets: {
                            default: {x: 270, y: 342, width: 180, height: 86}
                        },
                        accessible: true
                    }
                    
                }
            },           
            {
                type: 'storage',
                supports: ['hdd', '2.5', 'U.2'],
                component: null,
                sides: {
       //           left: {
       //                offsets: {
       //                    default: {x: 42, y: 363, width: 140, height: 86}
       //                },
       //                accessible: true
       //            },
                    right: {
                        offsets: {
                            default: {x: 131, y: 358, width: 100, height: 27}
                        },
                        accessible: true
                    }
                    
                }
            },
            {   // new sata
                type: 'storage', 
                supports: ['hdd', '2.5', 'U.2'],
                component: null,
                sides: {
                    right: {
                        offsets: {
                            default: {x: 131, y: 390, width: 100, height: 27}
                        },
                        accessible: true
                    }
                }
            }
        ],
        
        ports: [],
        cables: []
    },
    {        // Fractal Designs Pop Air
        name: 'Fractal Designs Pop Air',
        type: 'chassis',
        size: 'mid-tower',
        specs:{
            price: 5795,
            color: 'Black and Orange',
            size: 'Mid-Tower',
            dimensions: '473.5 mm (D) x 215 mm (W) x 454 mm(H)', 
        },
        dimensions: {
            depth: 436,
            width: 215,
            height: 454,
        },
        isRotatable: true,
        isAttached: false,
        defaultSource: 'left',
        
        images: [
            {side: 'left', imageSrc: './assets/chassis/Fractal Design/pop_air_left.png'}, 
            {side: 'front', imageSrc: './assets/chassis/Fractal Design/pop_air_front.png'}, 
            {side: 'right', imageSrc: './assets/chassis/Fractal Design/pop_air_right.png'}, 
            {side: 'rear', imageSrc: './assets/chassis/Fractal Design/pop_air_rear.png'}, 
        ],
        slots: [
            {
                type: 'motherboard', 
                supports: ['ATX', 'microATX', 'miniATX'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 44, y: 50, width:204, height: 265},
                            ATX: {x: 50, y: 61, width:204, height: 265},
                            microATX: {x: 50, y: 63, width:165, height: 165},
                            miniATX: {x: 50, y: 63, width:150, height: 150}
                        },
                        accessible: true // if able to attach to this side
                    },
                    rear: {
                        offsets: {
                            default: {x: 28, y: 26, width: 46, height: 166} 
                        },
                        accessible: false 
                    },
                    right:{
                        offsets: {
                        default: {x: 235, y: 53, width: 160, height: 138}
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
                            default: {x: 40, y: 348, width: 145, height: 88}
                        },
                        accessible: true
                    },
                    right: {
                        offsets: {
                            default: {x: 237.7, y: 342, width: 180, height: 86}
                        },
                        accessible: true
                    }
                    
                }
            },           
            {
                type: 'storage',
                supports: ['hdd','2.5', 'U.2', 'ssd'],
                component: null,
                sides: {
        //            left: {
        //                offsets: {
        //                    default: {x: 42, y: 363, width: 140, height: 86}
        //                },
        //                accessible: true
        //            },
                    right: {
                        offsets: {
                            default: {x: 106, y: 390, width: 95, height: 27},
                        },
                        accessible: true
                    }
                    
                }
            },
            {   
                type: 'storage', 
                supports: ['hdd','2.5', 'U.2', 'ssd'],
                component: null,
                sides: {
                    right: {
                        offsets: {
                            default: {x: 106, y: 337, width: 95, height: 27}
                        },
                        accessible: true
                    }
                }
            },
            {   
                type: 'storage', 
                supports: ['2.5', 'U.2', 'ssd'],
                component: null,
                sides: {
                    right: {
                        offsets: {
                            default: {x: 221, y: 216, width: 63, height: 80}
                        },
                        accessible: true
                    }
                }
            },
            {   
                type: 'storage', 
                supports: ['2.5', 'U.2', 'ssd'],
                component: null,
                sides: {
                    right: {
                        offsets: {
                            default: {x: 297, y: 216, width: 63, height: 80}
                        },
                        accessible: true
                    }
                }
            }
            
        ],
        
        ports: [],
        cables: []
    },
    {        // Lian Li LanCool
        name: 'Lian Li LanCool',
        type: 'chassis',
        size: 'mid-tower',
        specs:{
            price: 5295,
            color: 'Black',
            size: 'Mid-Tower',
            dimensions: '462 mm (D) x 215 mm (W) x 482 mm (H)',
        },
        dimensions: {
            depth: 462,
            width: 215,
            height: 482,
        },
        isRotatable: true,
        isAttached: false,
        defaultSource: 'left',
        images: [
            {side: 'left', imageSrc: './assets/chassis/Lian Li/Lian Li Lancool 260.png'}, 
            {side: 'front', imageSrc: './assets/chassis/Lian Li/Lian Li Lancool 260 front.png'}, 
            {side: 'right', imageSrc: './assets/chassis/Lian Li/Lian Li Lancool 260 right.png'}, 
            {side: 'rear', imageSrc: './assets/chassis/Lian Li/Lian Li Lancool 260 rear.png'}, 
        ],
        slots: [
            {
                type: 'motherboard', 
                supports: ['ATX', 'microATX', 'miniATX'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 30, y: 80, width:204, height: 265},
                            ATX: {x: 50, y: 61, width:204, height: 265},
                            microATX: {x: 50, y: 63, width:165, height: 165},
                            miniATX: {x: 50, y: 63, width:150, height: 150}
                        },
                        accessible: true // if able to attach to this side
                    },
                    rear: {
                        offsets: {
                            default: {x: 32, y: 29, width: 43, height: 158} 
                        },
                        accessible: false 
                    },
                    right:{
                        offsets: {
                        default: {x: 245, y: 73, width: 180, height: 147}
                    },
                    accessible: false
                    }
                },
            },
            {
                type: 'psu',
                supports: ['ATX', 'microATX', 'miniATX'],
                component: null,
                sides: {
                    rear: {
                        offsets: {
                            default: {x: 37, y: 363, width: 135, height: 88}
                        },
                        accessible: false
                    },
                    right: {
                        offsets: {
                            default: {x: 265, y: 365, width: 180, height: 86}
                        },
                        accessible: true
                    }
                    
                }
            },           
            {
                type: 'storage',
                supports: ['hdd'],
                component: null,
                sides: {
        //            left: {
        //                offsets: {
        //                    default: {x: 42, y: 363, width: 140, height: 86}
        //                },
        //                accessible: true
        //            },
                    right: {
                        offsets: {
                            default: {x: 130, y: 420, width: 95, height: 27},
                        },
                        accessible: true
                    }
                    
                }
            },
            {   
                type: 'storage', 
                supports: [ '2.5', 'U.2', 'ssd'],
                component: null,
                sides: {
                    right: {
                        offsets: {
                            default: {x: 225, y: 247, width: 80, height: 90}
                        },
                        accessible: true
                    }
                }
            },
            {   
                type: 'storage', 
                supports: [ '2.5', 'U.2', 'ssd'],
                component: null,
                sides: {
                    right: {
                        offsets: {
                            default: {x: 335, y: 247, width: 80, height: 90}
                        },
                        accessible: true
                    }
                }
            }

        ],
        
        ports: [],
        cables: []
    },
    {        // Phanteks Enthoo Pro M [different storage orientation]
        name: 'Phanteks Enthoo Pro M',
        type: 'chassis',
        size: 'mid-tower',
        specs:{
            price: 6800,
            color: 'Black',
            size: 'Mid-Tower',
            dimensions: '500 mm (D) x 235 mm(W) x 480 mm(H)', 
        },
        dimensions: {
            depth: 462,
            width: 235,
            height: 480,
        },
        isRotatable: true,
        isAttached: false,
        defaultSource: 'left',
        images: [
            {side: 'left', imageSrc: './assets/chassis/Phanteks/Pro-M-1z.png'}, 
            {side: 'front', imageSrc: './assets/chassis/Phanteks/Pro-M-2z.png'}, 
            {side: 'right', imageSrc: './assets/chassis/Phanteks/Pro-M-4z.png'}, 
            {side: 'rear', imageSrc: './assets/chassis/Phanteks/Pro-M-3z.png'}, 
        ],
        slots: [
            {
                type: 'motherboard', 
                supports: ['ATX', 'microATX', 'miniATX'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 40, y: 70, width:204, height: 265},
                            ATX: {x: 50, y: 61, width:204, height: 265},
                            microATX: {x: 50, y: 63, width:165, height: 165},
                            miniATX: {x: 50, y: 63, width:150, height: 150}
                        },
                        accessible: true // if able to attach to this side
                    },
                    rear: {
                        offsets: {
                            default: {x: 22, y: 43, width: 47, height: 160} 
                        },
                        accessible: false 
                    },
                    right:{
                        offsets: {
                        default: {x: 245, y: 50, width: 180, height: 147}
                    },
                    accessible: false
                    }
                },
            },
            {
                type: 'psu',
                supports: ['ATX', 'microATX', 'miniATX'],
                component: null,
                sides: {
                    rear: {
                        offsets: {
                            default: {x: 37, y: 363, width: 154, height: 88}
                        },
                        accessible: false
                    },
                    right: {
                        offsets: {
                            default: {x: 265, y: 365, width: 180, height: 86}
                        },
                        accessible: true
                    },
                    left: {
                        offsets: {
                            default: {x: 15, y: 365, width: 180, height: 86}
                        },
                        accessible: false
                    },
                    
                }
            },           
            {
                type: 'storage',
                supports: ['hdd', '2.5', 'U.2'],
                component: null,
                sides: {
        //            left: {
        //                offsets: {
        //                    default: {x: 42, y: 363, width: 140, height: 86}
        //                },
        //                accessible: true
        //            },
                    right: {
                        offsets: {
                            default: {x: 65, y: 400, width: 100, height: 27},
                        },
                        accessible: true
                    }
                    
                }
            },
            {   
                type: 'storage', 
                supports: ['hdd', '2.5', 'U.2'],
                component: null,
                sides: {
                    right: {
                        offsets: {
                            default: {x: 65, y: 360, width: 100, height: 27}
                        },
                        accessible: true
                    }
                }
            },
            {   
                type: 'storage', 
                supports: ['2.5', 'U.2', 'ssd'],
                component: null,
                sides: {
                    right: {
                        offsets: {
                            default: {x: 300, y: 205, width: 50, height: 80}
                        },
                        accessible: true
                    }
                }
            },
            {   
                type: 'storage', 
                supports: ['2.5', 'U.2', 'ssd'],
                component: null,
                sides: {
                    right: {
                        offsets: {
                            default: {x: 374, y: 205, width: 50, height: 80}
                        },
                        accessible: true
                    }
                }
            }

        ],
        
        ports: [],
        cables: []
    },

    // MOTHERBOARD AM4
    {        // B550 Aorus Elite v2 
        name: 'B550 Aorus Elite v2',
        type: 'motherboard',
        size: 'ATX',
        watts: '100',
        specs:{
            price: 10150,
            chipset: 'AMD B550',
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
            {
                type: 'storage',
                supports: ['m.2'],
                component: null,
                hidden: true,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 69, y: 158, width: 75, height: 20}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'storage',
                supports: ['m.2'],
                component: null,
                hidden: false,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 69, y: 216, width: 75, height: 20}
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
    {        // X570 Taichi
        name: 'ASRock X570 Taichi',
        type: 'motherboard',
        size: 'ATX',        
        watts: '100',
        specs:{
            price: 15950,
            chipset: 'AMD X570',
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
            {side: 'PACK', imageSrc: './assets/motherboard/ASRock/AM4/X570 Taichi(M1).png'}, 
            {side: 'left', imageSrc: './assets/motherboard/ASRock/AM4/X570 Taichi(M2).png'},             
            {side: 'right', imageSrc: './assets/motherboard/backside.png'},
            {side: 'rear', imageSrc: './assets/motherboard/ASRock/AM4/X570 Taichi(M5).png'} 
        ],
        slots: [
            {
                type: 'cpu', 
                supports: ['AM4'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 115, y: 76, width: 45, height: 45},
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
                           default: {x: 87, y: 46, width: 95, height: 105}
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
                            default: {x: 220, y: 32, width: 8, height: 140}
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
                            default: {x: 210, y: 32, width: 8, height: 140}
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
                            default: {x: 200, y: 32, width: 8, height: 140}
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
                            default: {x: 190, y: 32, width: 8, height: 140}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'storage',
                supports: ['m.2'],
                component: null,
                hidden: true,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 65, y: 158, width: 80, height: 20}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'storage',
                supports: ['m.2'],
                component: null,
                hidden: true,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 72, y: 218, width: 80, height: 20}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'storage',
                supports: ['m.2'],
                component: null,
                hidden: true,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 90, y: 258, width: 80, height: 20}
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
    {        // ROG Strix B550-F Gaming
        name: 'ROG Strix B550-F Gaming',
        type: 'motherboard',
        size: 'ATX',        
        watts: '100',
        specs:{
            price: 11950,
            chipset: 'AMD B550',
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
            {side: 'PACK', imageSrc: './assets/motherboard/ASUS ROG/AM4/ROG STRIX B550-F GAMING WIFI.png'}, 
            {side: 'left', imageSrc: './assets/motherboard/ASUS ROG/AM4/ROG STRIX B550-F GAMING WIFI II.png'}, 
            {side: 'right', imageSrc: './assets/motherboard/backside.png'},
            {side: 'rear', imageSrc: './assets/motherboard/ASUS ROG/AM4/ROG STRIX B550-F GAMING WIFI II REAR.png'} 
        ],
        slots: [
            {
                type: 'cpu', 
                supports: ['AM4'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 115, y: 79, width: 45, height: 45},
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
                           default: {x: 93, y: 46, width: 95, height: 105}
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
                            default: {x: 215, y: 33, width: 8, height: 140}
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
                            default: {x: 205, y: 33, width: 8, height: 140}
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
                            default: {x: 195, y: 33, width: 8, height: 140}
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
                            default: {x: 185, y: 33, width: 8, height: 140}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'storage',
                supports: ['m.2'],
                component: null,
                hidden: true,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 65, y: 158, width: 80, height: 20}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'storage',
                supports: ['m.2'],
                component: null,
                hidden: true,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 120, y: 263, width: 80, height: 20}
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
    {        // ROG Strix B550-XE Gaming
        name: 'ROG Strix B550-XE Gaming',
        type: 'motherboard',
        size: 'ATX',        
        watts: '100',
        specs:{
            price: 13599,
            chipset: 'AMD B550',
            cpuslot: 'ADM AM4',
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
            {side: 'PACK', imageSrc: './assets/motherboard/ASUS ROG/AM4/ROG STRIX B550-XE GAMING WIFI Pack.png'}, 
            {side: 'left', imageSrc: './assets/motherboard/ASUS ROG/AM4/ROG STRIX B550-XE GAMING WIFI.png'}, 
            {side: 'right', imageSrc: './assets/motherboard/backside.png'},
            {side: 'rear', imageSrc: './assets/motherboard/ASUS ROG/AM4/ROG STRIX B550-XE GAMING WIFI REAR.png'} 
        ],
        slots: [
            {
                type: 'cpu', 
                supports: ['AM4'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 115, y: 80, width: 45, height: 45},
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
                           default: {x: 90, y: 49, width: 95, height: 105}
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
                            default: {x: 216, y: 39, width: 8, height: 140}
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
                            default: {x: 206, y: 39, width: 8, height: 140}
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
                            default: {x: 196, y: 39, width: 8, height: 140}
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
                            default: {x: 186, y: 39, width: 8, height: 140}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'storage',
                supports: ['m.2'],
                component: null,
                hidden: true,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 65, y: 158, width: 80, height: 20}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'storage',
                supports: ['m.2'],
                component: null,
                hidden: true,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 120, y: 257, width: 80, height: 20}
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
    {        // Biostar B550GTA
        name: 'Biostar Racing B550GTA',
        type: 'motherboard',
        size: 'ATX',        
        watts: '100',
        specs:{
            price: 6950,
            chipset: 'AMD B550',
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
            {side: 'PACK', imageSrc: './assets/motherboard/Biostar/AM4/B550GTA PACK.png'}, 
            {side: 'left', imageSrc: './assets/motherboard/Biostar/AM4/B550GTA.png'}, 
            {side: 'right', imageSrc: './assets/motherboard/backside.png'},
            {side: 'rear', imageSrc: './assets/motherboard/Biostar/AM4/B550GTA REAR.png'} 
        ],
        slots: [
            {
                type: 'cpu', 
                supports: ['AM4'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 105, y: 73, width: 45, height: 45},
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
                            default: {x: 204, y: 25, width: 8, height: 140}
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
                            default: {x: 194, y: 25, width: 8, height: 140}
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
                            default: {x: 184, y: 25, width: 8, height: 140}
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
                            default: {x: 174, y: 25, width: 8, height: 140}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'storage',
                supports: ['m.2'],
                component: null,
                hidden: true,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 56.8, y: 158, width: 80, height: 20}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'storage',
                supports: ['m.2'],
                component: null,
                hidden: true,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 78, y: 257, width: 80, height: 20}
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
    {        // Biostar X570GTA
        name: 'Biostar Racing X570GTA',
        type: 'motherboard',
        size: 'ATX',        
        watts: '100',
        specs:{
            price: 8924,
            chipset: 'AMD X570',
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
            {side: 'PACK', imageSrc: './assets/motherboard/Biostar/AM4/X570GTA PACK.png'}, 
            {side: 'left', imageSrc: './assets/motherboard/Biostar/AM4/X570GTA.png'}, 
            {side: 'right', imageSrc: './assets/motherboard/backside.png'},
            {side: 'rear', imageSrc: './assets/motherboard/Biostar/AM4/X570GTA REAR.png'} 
        ],
        slots: [
            {
                type: 'cpu', 
                supports: ['AM4'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 105, y: 70, width: 45, height: 45},
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
                           default: {x: 80, y: 43, width: 95, height: 105}
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
                            default: {x: 204, y: 23, width: 8, height: 140}
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
                            default: {x: 194, y: 23, width: 8, height: 140}
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
                            default: {x: 184, y: 23, width: 8, height: 140}
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
                            default: {x: 174, y: 23, width: 8, height: 140}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'storage',
                supports: ['m.2'],
                component: null,
                hidden: true,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 53, y: 159, width: 80, height: 20}
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
    {        // EVGA X570 FTW
        name: 'EVGA X570 FTW',
        type: 'motherboard',
        size: 'ATX',        
        watts: '100',
        specs:{
            price: 27892,
            chipset: 'AMD X570',
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
            {side: 'PACK', imageSrc: './assets/motherboard/EVGA/AM4/EVGA X570 FTW PACK.png'}, 
            {side: 'left', imageSrc: './assets/motherboard/EVGA/AM4/EVGA X570 FTW.png'},
            {side: 'right', imageSrc: './assets/motherboard/backside.png'}, 
            {side: 'rear', imageSrc: './assets/motherboard/EVGA/AM4/EVGA X570 FTW REAR.png'} 
        ],
        slots: [
            {
                type: 'cpu', 
                supports: ['AM4'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 101.5, y: 70, width: 45, height: 45},
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
                           default: {x: 74, y: 42, width: 95, height: 105}
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
                            default: {x: 204, y: 17, width: 8, height: 140}
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
                            default: {x: 194, y: 17, width: 8, height: 140}
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
                            default: {x: 184, y: 17, width: 8, height: 140}
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
                            default: {x: 174, y: 17, width: 8, height: 140}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'storage',
                supports: ['m.2'],
                component: null,
                hidden: true,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 60, y: 155, width: 80, height: 20}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'storage',
                supports: ['m.2'],
                component: null,
                hidden: true,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 60, y: 240, width: 80, height: 20}
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
    {        // Gigabyte B550 GAMING X V2
        name: 'Gigabyte B550 GAMING X V2',
        type: 'motherboard',
        size: 'ATX',        
        watts: '100',
        specs:{
            price: 7754,
            chipset: 'AMD B550',
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
            {side: 'PACK', imageSrc: './assets/motherboard/Gigabyte/AM4/B550 GAMING X V2/B550 GAMING X V2-04.png'}, 
            {side: 'left', imageSrc: './assets/motherboard/Gigabyte/AM4/B550 GAMING X V2/B550 GAMING X V2-02.png'}, 
            {side: 'right', imageSrc: './assets/motherboard/backside.png'},
            {side: 'rear', imageSrc: './assets/motherboard/Gigabyte/AM4/B550 GAMING X V2/B550 GAMING X V2-03.png'} 
        ],
        slots: [
            {
                type: 'cpu', 
                supports: ['AM4'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 104.5, y: 74, width: 45, height: 45},
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
                            default: {x: 207, y: 28, width: 8, height: 140}
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
                            default: {x: 197, y: 28, width: 8, height: 140}
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
                            default: {x: 187, y: 28, width: 8, height: 140}
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
                            default: {x: 177, y: 28, width: 8, height: 140}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'storage',
                supports: ['m.2'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 63, y: 158, width: 80, height: 20}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'storage',
                supports: ['m.2'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 63, y: 257, width: 80, height: 20}
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
    {        // Gigabyte B550 VISION D
        name: 'Gigabyte B550 VISION D',
        type: 'motherboard',
        size: 'ATX',        
        watts: '100',
        specs:{
            price: 13895,
            chipset: 'AMD B550',
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
            {side: 'PACK', imageSrc: './assets/motherboard/Gigabyte/AM4/B550 VISION D/B550 VISION D PACK.png'}, 
            {side: 'left', imageSrc: './assets/motherboard/Gigabyte/AM4/B550 VISION D/B550 VISION D.png'},
            {side: 'right', imageSrc: './assets/motherboard/backside.png'}, 
            {side: 'rear', imageSrc: './assets/motherboard/Gigabyte/AM4/B550 VISION D/B550 VISION D REAR.png'} 
        ],
        slots: [
            {
                type: 'cpu', 
                supports: ['AM4'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 106, y: 77, width: 45, height: 45},
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
                           default: {x: 84, y: 46, width: 95, height: 105}
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
                            default: {x: 207.2, y: 31, width: 8, height: 137.5}
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
                            default: {x: 198.2, y: 31, width: 8, height: 137.5}
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
                            default: {x: 188.7, y: 31, width: 8, height: 137.5}
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
                            default: {x: 178.7, y: 31, width: 8, height: 137.5}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'storage',
                supports: ['m.2'],
                component: null,
                hidden: true,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 65, y: 157, width: 80, height: 20}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'storage',
                supports: ['m.2'],
                component: null,
                hidden: true,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 65, y: 215, width: 80, height: 20}
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

    // MOTHERBOARD AM5
    {        // B650E Aorus Elite X AX Ice
        name: 'B650E Aorus Elite X AX Ice',
        type: 'motherboard',
        size: 'ATX',        
        watts: '100',
        specs:{
            price: 15450,
            chipset: 'AMD B650E',
            cpuslot: 'AMD AM5',
            slots: 'Dual channel DDR5 DIMM slots, PCIe x16',
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
            {side: 'PACK', imageSrc: './assets/motherboard/Aorus/AM5/B650E AORUS ELITE X AX ICE-01.png'}, 
            {side: 'left', imageSrc: './assets/motherboard/Aorus/AM5/B650E AORUS ELITE X AX ICE-02.png'}, 
            {side: 'right', imageSrc: './assets/motherboard/backside1.png'},
            {side: 'rear', imageSrc: './assets/motherboard/Aorus/AM5/B650E AORUS ELITE X AX ICE-06.png'} 
        ],
        slots: [
            {
                type: 'cpu', 
                supports: ['AM5'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 107, y: 76, width: 45, height: 45},
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
                           default: {x: 84, y: 48, width: 95, height: 105}
                       },
                       accessible: true
                   }
               }
           },
            {
                type: 'ram',
                supports: ['ddr5'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 207, y: 32, width: 8, height: 140}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'ram',
                supports: ['ddr5'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 197, y: 32, width: 8, height: 140}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'ram',
                supports: ['ddr5'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 188.5, y: 32, width: 8, height: 140}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'ram',
                supports: ['ddr5'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 180, y: 32, width: 8, height: 140}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'storage',
                supports: ['m.2'],
                component: null,
                hidden: true,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 60, y: 157, width: 80, height: 20}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'storage',
                supports: ['m.2'],
                component: null,
                hidden: true,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 60, y: 209, width: 80, height: 20}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'storage',
                supports: ['m.2'],
                component: null,
                hidden: true,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 60, y: 233, width: 80, height: 20}
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
    {        // B650M Livemixer
        name: 'ASRock B650 Livemixer',
        type: 'motherboard',
        size: 'ATX',        
        watts: '100',
        specs:{
            price: 12830,
            chipset: 'AMD B650',
            cpuslot: 'AMD AM5',
            slots: 'Dual channel DDR5 DIMM slots, PCIe x16',
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
            {side: 'PACK', imageSrc: './assets/motherboard/ASRock/AM5/B650 LiveMixer(M1).png'}, 
            {side: 'left', imageSrc: './assets/motherboard/ASRock/AM5/b650 Livemixer.png'},
            {side: 'right', imageSrc: './assets/motherboard/backside.png'}, 
            {side: 'rear', imageSrc: './assets/motherboard/ASRock/AM5/b650 Livemixer rear.png'} 
        ],
        slots: [
            {
                type: 'cpu', 
                supports: ['AM5'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 113, y: 78, width: 45, height: 45},
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
                           default: {x: 84, y: 46, width: 95, height: 105}
                       },
                       accessible: true
                   }
               }
           },
            {
                type: 'ram',
                supports: ['ddr5'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 215, y: 32, width: 8, height: 140}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'ram',
                supports: ['ddr5'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 205, y: 32, width: 8, height: 140}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'ram',
                supports: ['ddr5'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 195, y: 32, width: 8, height: 140}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'ram',
                supports: ['ddr5'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 185, y: 32, width: 8, height: 140}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'storage',
                supports: ['m.2'],
                component: null,
                hidden: true,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 58, y: 157, width: 80, height: 20}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'storage',
                supports: ['m.2'],
                component: null,
                hidden: true,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 48, y: 255, width: 80, height: 20}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'storage',
                supports: ['m.2'],
                component: null,
                hidden: true,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 131, y: 255, width: 80, height: 20}
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
    {        // X670E PG Lightning
        name: 'ASRock X670E PG Lightning',
        type: 'motherboard',
        size: 'ATX',        
        watts: '100',
        specs:{
            price: 14448,
            chipset: 'AMD X670E',
            cpuslot: 'AMD AM5',
            slots: 'Dual channel DDR5 DIMM slots, PCIe x16',
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
            {side: 'PACK', imageSrc: './assets/motherboard/ASRock/AM5/X670E PG Lightning(L1).png'}, 
            {side: 'left', imageSrc: './assets/motherboard/ASRock/AM5/X670E PG Lightning(L3).png'}, 
            {side: 'right', imageSrc: './assets/motherboard/backside.png'},
            {side: 'rear', imageSrc: './assets/motherboard/ASRock/AM5/X670E PG Lightning(L6).png'} 
        ],
        slots: [
            {
                type: 'cpu', 
                supports: ['AM5'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 113, y: 78, width: 45, height: 45},
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
                           default: {x: 84, y: 46, width: 95, height: 105}
                       },
                       accessible: true
                   }
               }
           },
            {
                type: 'ram',
                supports: ['ddr5'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 210, y: 32, width: 8, height: 140}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'ram',
                supports: ['ddr5'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 200, y: 32, width: 8, height: 140}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'ram',
                supports: ['ddr5'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 190, y: 32, width: 8, height: 140}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'ram',
                supports: ['ddr5'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 180, y: 32, width: 8, height: 140}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'storage',
                supports: ['m.2'],
                component: null,
                hidden: true,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 67, y: 159, width: 80, height: 20}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'storage',
                supports: ['m.2'],
                component: null,
                hidden: true,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 80, y: 257, width: 80, height: 20}
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
    {        // ROG Strix B650E-E Gaming Wifi
        name: 'ROG Strix B650E-E Gaming',
        type: 'motherboard',
        size: 'ATX',        
        watts: '100',
        specs:{
            price: 21650,
            chipset: 'AMD B650E',
            cpuslot: 'AMD AM5',
            slots: 'Dual channel DDR5 DIMM slots, PCIe x16',
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
            {side: 'PACK', imageSrc: './assets/motherboard/ASUS ROG/AM5/ROG STRIX B650E-E GAMING WIFI pack.png'}, 
            {side: 'left', imageSrc: './assets/motherboard/ASUS ROG/AM5/ROG STRIX B650E-E GAMING WIFI.png'}, 
            {side: 'right', imageSrc: './assets/motherboard/backside.png'},
            {side: 'rear', imageSrc: './assets/motherboard/ASUS ROG/AM5/ROG STRIX B650E-E GAMING WIFI 1.png'} 
        ],
        slots: [
            {
                type: 'cpu', 
                supports: ['AM5'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 110, y: 79, width: 45, height: 45},
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
                           default: {x: 84, y: 46, width: 95, height: 105}
                       },
                       accessible: true
                   }
               }
           },
            {
                type: 'ram',
                supports: ['ddr5'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 209, y: 28, width: 8, height: 140}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'ram',
                supports: ['ddr5'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 199, y: 28, width: 8, height: 140}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'ram',
                supports: ['ddr5'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 189, y: 28, width: 8, height: 140}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'ram',
                supports: ['ddr5'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 179, y: 28, width: 8, height: 140}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'storage',
                supports: ['m.2'],
                component: null,
                hidden: true,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 77, y: 159, width: 80, height: 20}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'storage',
                supports: ['m.2'],
                component: null,
                hidden: true,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 157, y: 235, width: 80, height: 20}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'storage',
                supports: ['m.2'],
                component: null,
                hidden: true,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 50, y: 257, width: 80, height: 20}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'storage',
                supports: ['m.2'],
                component: null,
                hidden: true,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 138, y: 257, width: 80, height: 20}
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
    {        // Biostar X670E VALKYRIE
        name: 'Biostar X670E VALKYRIE',
        type: 'motherboard',
        size: 'ATX',        
        watts: '100',
        specs:{
            price: 21477,
            chipset: 'AMD X670E',
            cpuslot: 'AMD AM5',
            slots: 'Dual channel DDR5 DIMM slots, PCIe x16',
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
            {side: 'PACK', imageSrc: './assets/motherboard/Biostar/AM5/X670E VALKYRIE pack.png'}, 
            {side: 'left', imageSrc: './assets/motherboard/Biostar/AM5/X670E VALKYRIE.png'}, 
            {side: 'right', imageSrc: './assets/motherboard/backside.png'},
            {side: 'rear', imageSrc: './assets/motherboard/Biostar/AM5/X670E VALKYRIE 1.png'} 
        ],
        slots: [
            {
                type: 'cpu', 
                supports: ['AM5'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 117.6, y: 81.5, width: 45, height: 45},
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
                           default: {x: 89, y: 46, width: 95, height: 105}
                       },
                       accessible: true
                   }
               }
           },
            {
                type: 'ram',
                supports: ['ddr5'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 213, y: 32, width: 6, height: 140}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'ram',
                supports: ['ddr5'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 203, y: 32, width: 6, height: 140}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'ram',
                supports: ['ddr5'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 195, y: 32, width: 6, height: 140}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'ram',
                supports: ['ddr5'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 186, y: 32, width: 6, height: 140}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'storage',
                supports: ['m.2'],
                component: null,
                hidden: true,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 60, y: 195, width: 80, height: 20}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'storage',
                supports: ['m.2'],
                component: null,
                hidden: true,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 60, y: 222, width: 80, height: 20}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'storage',
                supports: ['m.2'],
                component: null,
                hidden: true,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 60, y: 257, width: 80, height: 20}
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
    {        // Biostar X870E VALKYRIE
        name: 'Biostar X870E VALKYRIE',
        type: 'motherboard',
        size: 'ATX',        
        watts: '100',
        specs:{
            price: 22314,   
            chipset: 'AMD X870E',
            cpuslot: 'AMD AM5',
            slots: 'Dual channel DDR5 DIMM slots, PCIe x16',
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
            {side: 'PACK', imageSrc: './assets/motherboard/Biostar/AM5/X870E VALKYRIE pack.png'}, 
            {side: 'left', imageSrc: './assets/motherboard/Biostar/AM5/X870E VALKYRIE.png'}, 
            {side: 'right', imageSrc: './assets/motherboard/backside.png'},
            {side: 'rear', imageSrc: './assets/motherboard/Biostar/AM5/X870E VALKYRIE REAR.png'} 
        ],
        slots: [
            {
                type: 'cpu', 
                supports: ['AM5'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 117, y: 80.5, width: 45, height: 45},
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
                           default: {x: 89, y: 46, width: 95, height: 105}
                       },
                       accessible: true
                   }
               }
           },
            {
                type: 'ram',
                supports: ['ddr5'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 211, y: 29, width: 7, height: 140}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'ram',
                supports: ['ddr5'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 201, y: 29, width: 7, height: 140}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'ram',
                supports: ['ddr5'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 191, y: 29, width: 7, height: 140}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'ram',
                supports: ['ddr5'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 181, y: 29, width: 7, height: 140}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'storage',
                supports: ['m.2'],
                component: null,
                hidden: true,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 60, y: 195, width: 80, height: 20}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'storage',
                supports: ['m.2'],
                component: null,
                hidden: true,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 60, y: 222, width: 80, height: 20}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'storage',
                supports: ['m.2'],
                component: null,
                hidden: true,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 57, y: 257, width: 80, height: 20}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'storage',
                supports: ['m.2'],
                component: null,
                hidden: true,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 140, y: 257, width: 80, height: 20}
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
    {        // Gigabyte B650 GAMING X
        name: 'Gigabyte B650 GAMING X',
        type: 'motherboard',
        size: 'ATX',        
        watts: '100',
        specs:{
            price: 12850,
            chipset: 'AMD B650',
            cpuslot: 'AMD AM5',
            slots: 'Dual channel DDR5 DIMM slots, PCIe x16',
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
            {side: 'PACK', imageSrc: './assets/motherboard/Gigabyte/AM5/B650 GAMING X/B650 GAMING X-01.png'}, 
            {side: 'left', imageSrc: './assets/motherboard/Gigabyte/AM5/B650 GAMING X/B650 GAMING X-02.png'}, 
            {side: 'right', imageSrc: './assets/motherboard/backside.png'},
            {side: 'rear', imageSrc: './assets/motherboard/Gigabyte/AM5/B650 GAMING X/B650 GAMING X-05.png'} 
        ],
        slots: [
            {
                type: 'cpu', 
                supports: ['AM5'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 108, y: 77, width: 45, height: 45},
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
                           default: {x: 80, y: 46, width: 95, height: 105}
                       },
                       accessible: true
                   }
               }
           },
            {
                type: 'ram',
                supports: ['ddr5'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 207, y: 32, width: 8, height: 140}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'ram',
                supports: ['ddr5'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 197, y: 32, width: 8, height: 140}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'ram',
                supports: ['ddr5'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 187, y: 32, width: 8, height: 140}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'ram',
                supports: ['ddr5'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 177, y: 32, width: 8, height: 140}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'storage',
                supports: ['m.2'],
                component: null,
                hidden: true,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 60, y: 155, width: 80, height: 20}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'storage',
                supports: ['m.2'],
                component: null,
                hidden: true,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 60, y: 213, width: 80, height: 20}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'storage',
                supports: ['m.2'],
                component: null,
                hidden: true,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 60, y: 235, width: 80, height: 20}
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
    {        // Gigabyte B650 UD AX
        name: 'Gigabyte B650 UD AX',
        type: 'motherboard',
        size: 'ATX',        
        watts: '100',
        specs:{
            price: 9423,
            chipset: 'AMD B650',
            cpuslot: 'AMD AM5',
            slots: 'Dual channel DDR5 DIMM slots, PCIe x16',
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
            {side: 'PACK', imageSrc: './assets/motherboard/Gigabyte/AM5/B650 UD AX/B650 UD AX-01.png'}, 
            {side: 'left', imageSrc: './assets/motherboard/Gigabyte/AM5/B650 UD AX/B650 UD AX-02.png'}, 
            {side: 'right', imageSrc: './assets/motherboard/backside.png'},
            {side: 'rear', imageSrc: './assets/motherboard/Gigabyte/AM5/B650 UD AX/B650 UD AX-04.png'} 
        ],
        slots: [
            {
                type: 'cpu', 
                supports: ['AM5'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 108, y: 75, width: 45, height: 45},
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
                           default: {x: 81, y: 46, width: 95, height: 105}
                       },
                       accessible: true
                   }
               }
           },
            {
                type: 'ram',
                supports: ['ddr5'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 207, y: 31, width: 8, height: 140}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'ram',
                supports: ['ddr5'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 197, y: 31, width: 8, height: 140}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'ram',
                supports: ['ddr5'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 187, y: 31, width: 8, height: 140}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'ram',
                supports: ['ddr5'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 177, y: 31, width: 8, height: 140}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'storage',
                supports: ['m.2'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 65, y: 155, width: 80, height: 20}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'storage',
                supports: ['m.2'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 65, y: 193, width: 80, height: 20}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'storage',
                supports: ['m.2'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 65, y: 213, width: 80, height: 20}
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
    {        // MSI MPG B650 CARBON WIFI
        name: 'MSI MPG B650 CARBON WIFI',
        type: 'motherboard',
        size: 'ATX',        
        watts: '100',
        specs:{
            price: 18401,
            chipset: 'AMD B650',
            cpuslot: 'AMD AM5',
            slots: 'Dual channel DDR5 DIMM slots, PCIe x16',
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
            {side: 'PACK', imageSrc: './assets/motherboard/MSI/AM5/MPG B650 CARBON WIFI PACK.png'}, 
            {side: 'left', imageSrc: './assets/motherboard/MSI/AM5/MPG B650 CARBON WIFI.png'}, 
            {side: 'right', imageSrc: './assets/motherboard/backside.png'},
            {side: 'rear', imageSrc: './assets/motherboard/MSI/AM5/MPG B650 CARBON WIFI REAR.png'} 
        ],
        slots: [
            {
                type: 'cpu', 
                supports: ['AM5'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 108, y: 80, width: 45, height: 45},
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
                           default: {x: 84, y: 46, width: 95, height: 105}
                       },
                       accessible: true
                   }
               }
           },
            {
                type: 'ram',
                supports: ['ddr5'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 207, y: 32, width: 8, height: 140}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'ram',
                supports: ['ddr5'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 197, y: 32, width: 8, height: 140}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'ram',
                supports: ['ddr5'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 187, y: 32, width: 8, height: 140}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'ram',
                supports: ['ddr5'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 177, y: 32, width: 8, height: 140}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'storage',
                supports: ['m.2'],
                component: null,
                hidden: true,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 67, y: 155, width: 80, height: 20}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'storage',
                supports: ['m.2'],
                component: null,
                hidden: true,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 76, y: 212, width: 80, height: 20}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'storage',
                supports: ['m.2'],
                component: null,
                hidden: true,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 120, y: 260, width: 80, height: 20}
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
    {        // MSI MPG X670E CARBON WIFI
        name: 'MSI MPG X670E CARBON WIFI',
        type: 'motherboard',
        size: 'ATX',        
        watts: '100',
        specs:{
            price: 26709,   
            chipset: 'AMD X670E',
            cpuslot: 'AMD AM5',
            slots: 'Dual channel DDR5 DIMM slots, PCIe x16',
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
            {side: 'PACK', imageSrc: './assets/motherboard/MSI/AM5/MPG X670E CARBON WIFI PACK.png'}, 
            {side: 'left', imageSrc: './assets/motherboard/MSI/AM5/MPG X670E CARBON WIFI.png'}, 
            {side: 'right', imageSrc: './assets/motherboard/backside.png'},
            {side: 'rear', imageSrc: './assets/motherboard/MSI/AM5/MPG X670E CARBON WIFI REAR.png'} 
        ],
        slots: [
            {
                type: 'cpu', 
                supports: ['AM5'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 106, y: 76, width: 45, height: 45},
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
                            default: {x: 1, y: 190, width: 200, height: 40},
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
                           default: {x: 84, y: 46, width: 95, height: 105}
                       },
                       accessible: true
                   }
               }
           },
            {
                type: 'ram',
                supports: ['ddr5'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 207, y: 32, width: 8, height: 140}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'ram',
                supports: ['ddr5'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 197, y: 32, width: 8, height: 140}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'ram',
                supports: ['ddr5'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 187, y: 32, width: 8, height: 140}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'ram',
                supports: ['ddr5'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 177, y: 32, width: 8, height: 140}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'storage',
                supports: ['m.2'],
                component: null,
                hidden: true,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 65, y: 155, width: 80, height: 20}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'storage',
                supports: ['m.2'],
                component: null,
                hidden: true,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 50, y: 175, width: 80, height: 20}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'storage',
                supports: ['m.2'],
                component: null,
                hidden: true,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 60, y: 215, width: 80, height: 20}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'storage',
                supports: ['m.2'],
                component: null,
                hidden: true,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 50, y: 235, width: 80, height: 20}
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
    
    // MOTHERBOARD LGA1200
    {        // Z590 Aorus Master
        name: 'Z590 Aorus Master',
        type: 'motherboard',
        size: 'ATX',        
        watts: '100',
        specs:{
            price: 22248,
            chipset: 'Intel Z590',
            cpuslot: 'LGA 1200',
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
            {side: 'PACK', imageSrc: './assets/motherboard/Aorus/LGA 1200/Z590 AORUS MASTER (rev. 1.0)/1.png'}, 
            {side: 'left', imageSrc: './assets/motherboard/Aorus/LGA 1200/Z590 AORUS MASTER (rev. 1.0)/2.png'}, 
            {side: 'right', imageSrc: './assets/motherboard/backside.png'},
            {side: 'rear', imageSrc: './assets/motherboard/Aorus/LGA 1200//Z590 AORUS MASTER (rev. 1.0)/5.png'} 
        ],
        slots: [
            {
                type: 'cpu', 
                supports: ['LGA 1200'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 106, y: 76, width: 45, height: 45},
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
                           default: {x: 84, y: 48, width: 95, height: 105}
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
                            default: {x: 207, y: 32, width: 8, height: 140}
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
                            default: {x: 197, y: 32, width: 8, height: 140}
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
                            default: {x: 187, y: 32, width: 8, height: 140}
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
                            default: {x: 177, y: 32, width: 8, height: 140}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'storage',
                supports: ['m.2'],
                component: null,
                hidden: true,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 67, y: 155, width: 80, height: 20}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'storage',
                supports: ['m.2'],
                component: null,
                hidden: true,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 67, y: 213, width: 80, height: 20}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'storage',
                supports: ['m.2'],
                component: null,
                hidden: true,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 67, y: 259, width: 80, height: 20}
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
    {        // Z590 Aorus Xtreme
        name: 'Z590 Aorus Xtreme',
        type: 'motherboard',
        size: 'ATX',        
        watts: '100',
        specs:{
            price: 47397,
            chipset: 'Intel Z590',
            cpuslot: 'LGA 1200',
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
            {side: 'PACK', imageSrc: './assets/motherboard/Aorus/LGA 1200/Z590 AORUS XTREME (rev. 1.0)/1.png'}, 
            {side: 'left', imageSrc: './assets/motherboard/Aorus/LGA 1200/Z590 AORUS XTREME (rev. 1.0)/2.png'},
            {side: 'right', imageSrc: './assets/motherboard/backside.png'}, 
            {side: 'rear', imageSrc: './assets/motherboard/Aorus/LGA 1200//Z590 AORUS XTREME (rev. 1.0)/5.png'} 
        ],
        slots: [
            {
                type: 'cpu', 
                supports: ['LGA 1200'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 113, y: 82, width: 45, height: 45},
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
                           default: {x: 84, y: 48, width: 95, height: 105}
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
                            default: {x: 203, y: 38, width: 5, height: 130}
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
                            default: {x: 195, y: 38, width: 5, height: 130}
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
                            default: {x: 186, y: 38, width: 5, height: 130}
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
                            default: {x: 178, y: 38, width: 5, height: 130}
                        },
                        accessible: true
                    }
                }
            }, 
            {
                type: 'storage',
                supports: ['m.2'],
                component: null,
                hidden: true,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 64, y: 155, width: 80, height: 20}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'storage',
                supports: ['m.2'],
                component: null,
                hidden: true,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 64, y: 214, width: 80, height: 20}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'storage',
                supports: ['m.2'],
                component: null,
                hidden: true,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 64, y: 258, width: 80, height: 20}
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
    {        // W480 Creator
        name: 'ASRock W480 Creator',
        type: 'motherboard',
        size: 'ATX',        
        watts: '100',
        specs:{
            price: 25092,
            chipset: 'Intel W480',
            cpuslot: 'LGA 1200',
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
            {side: 'PACK', imageSrc: './assets/motherboard/ASRock/LGA 1200/W480 Creator(M1).png'}, 
            {side: 'left', imageSrc: './assets/motherboard/ASRock/LGA 1200/W480 Creator(M2).png'}, 
            {side: 'right', imageSrc: './assets/motherboard/backside.png'},
            {side: 'rear', imageSrc: './assets/motherboard/ASRock/LGA 1200//W480 Creator REAR.png'} 
        ],
        slots: [
            {
                type: 'cpu', 
                supports: ['LGA 1200'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 113, y: 68, width: 45, height: 45},
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
                            default: {x: -1, y: 170, width: 200, height: 40},
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
                           default: {x: 86, y: 42, width: 95, height: 105}
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
                            default: {x: 212, y: 22, width: 7, height: 140}
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
                            default: {x: 202, y: 22, width: 7, height: 140}
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
                            default: {x: 192, y: 22, width: 7, height: 140}
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
                            default: {x: 182, y: 22, width: 7, height: 140}
                        },
                        accessible: true
                    }
                }
            },   
            {
                type: 'storage',
                supports: ['m.2'],
                component: null,
                hidden: true,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 67, y: 154.5, width: 80, height: 20}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'storage',
                supports: ['m.2'],
                component: null,
                hidden: true,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 81, y: 213.5, width: 80, height: 20}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'storage',
                supports: ['m.2'],
                component: null,
                hidden: true,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 67, y: 254, width: 80, height: 20}
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
    {        // ASRock Z590 PG Velocita
        name: 'ASRock Z590 PG Velocita',
        type: 'motherboard',
        size: 'ATX',        
        watts: '100',
        specs:{
            price: 16115,
            chipset: 'Intel Z590',
            cpuslot: 'LGA 1200',
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
            {side: 'PACK', imageSrc: './assets/motherboard/ASRock/LGA 1200/Z590 PG Velocita(L3).png'}, 
            {side: 'left', imageSrc: './assets/motherboard/ASRock/LGA 1200/Z590 PG Velocita(L5).png'},
            {side: 'right', imageSrc: './assets/motherboard/backside.png'}, 
            {side: 'rear', imageSrc: './assets/motherboard/ASRock/LGA 1200//Z590 PG Velocita REAR.png'} 
        ],
        slots: [
            {
                type: 'cpu', 
                supports: ['LGA 1200'],
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
                           default: {x: 84, y: 48, width: 95, height: 105}
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
                            default: {x: 212, y: 27, width: 7, height: 140}
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
                            default: {x: 202, y: 27, width: 7, height: 140}
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
                            default: {x: 192, y: 27, width: 7, height: 140}
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
                            default: {x: 182, y: 27, width: 7, height: 140}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'storage',
                supports: ['m.2'],
                component: null,
                hidden: true,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 65, y: 155, width: 80, height: 20}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'storage',
                supports: ['m.2'],
                component: null,
                hidden: true,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 75, y: 213, width: 80, height: 20}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'storage',
                supports: ['m.2'],
                component: null,
                hidden: true,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 120, y: 253, width: 80, height: 20}
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
    {        // ROG Strix B560-E Gaming
        name: 'ROG Strix B560-E Gaming',
        type: 'motherboard',
        size: 'ATX',        
        watts: '100',
        specs:{
            price: 13940,
            chipset: 'Intel B560-E',
            cpuslot: 'LGA 1200',
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
            {side: 'PACK', imageSrc: './assets/motherboard/ASUS ROG/LGA1200/ROG STRIX B560-E GAMING WIFI PACK.png'}, 
            {side: 'left', imageSrc: './assets/motherboard/ASUS ROG/LGA1200/ROG STRIX B560-E GAMING WIFI.png'}, 
            {side: 'right', imageSrc: './assets/motherboard/backside.png'},
            {side: 'rear', imageSrc: './assets/motherboard/ASUS ROG/LGA1200/ROG STRIX B560-E GAMING WIFI REAR.png'} 
        ],
        slots: [
            {
                type: 'cpu', 
                supports: ['LGA 1200'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 115, y: 74, width: 45, height: 45},
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
                           default: {x: 89, y: 48, width: 95, height: 105}
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
                            default: {x: 212, y: 27, width: 7, height: 140}
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
                            default: {x: 202, y: 27, width: 7, height: 140}
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
                            default: {x: 192, y: 27, width: 7, height: 140}
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
                            default: {x: 182, y: 27, width: 7, height: 140}
                        },
                        accessible: true
                    }
                }
            }, 
            {
                type: 'storage',
                supports: ['m.2'],
                component: null,
                hidden: true,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 65, y: 155, width: 80, height: 20}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'storage',
                supports: ['m.2'],
                component: null,
                hidden: true,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 60, y: 206, width: 80, height: 20}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'storage',
                supports: ['m.2'],
                component: null,
                hidden: true,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 125, y: 257, width: 80, height: 20}
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
    {        // ROG Strix Z490-A GAMING
        name: 'ROG STRIX Z490-A GAMING',
        type: 'motherboard',
        size: 'ATX',        
        watts: '100',
        specs:{
            price: 11709,
            chipset: 'Intel Z490-A',
            cpuslot: 'LGA 1200',
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
            {side: 'PACK', imageSrc: './assets/motherboard/ASUS ROG/LGA1200/ROG STRIX Z490-A GAMING PACK.png'}, 
            {side: 'left', imageSrc: './assets/motherboard/ASUS ROG/LGA1200/ROG STRIX Z490-A GAMING.png'}, 
            {side: 'right', imageSrc: './assets/motherboard/backside.png'},
            {side: 'rear', imageSrc: './assets/motherboard/ASUS ROG/LGA1200/ROG STRIX Z490-A GAMING REAR.png'} 
        ],
        slots: [
            {
                type: 'cpu', 
                supports: ['LGA 1200'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 112, y: 76.5, width: 45, height: 45},
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
                           default: {x: 84, y: 48, width: 95, height: 105}
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
                            default: {x: 208, y: 29, width: 8, height: 140}
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
                            default: {x: 198, y: 29, width: 8, height: 140}
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
                            default: {x: 188, y: 29, width: 8, height: 140}
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
                            default: {x: 178, y: 29, width: 8, height: 140}
                        },
                        accessible: true
                    }
                }
            }, 
            {
                type: 'storage',
                supports: ['m.2'],
                component: null,
                hidden: true,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 67, y: 198, width: 80, height: 20}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'storage',
                supports: ['m.2'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 134, y: 257, width: 80, height: 20}
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
    {        // Biostar Z590 VALKYRIE
        name: 'Biostar Z590 VALKYRIE',
        type: 'motherboard',
        size: 'ATX',        
        watts: '100',
        specs:{
            price: 20074,
            chipset: 'Intel Z590',
            cpuslot: 'LGA 1200',
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
            {side: 'PACK', imageSrc: './assets/motherboard/Biostar/LGA 1200/Z590 VALKYRIE PACK.png'}, 
            {side: 'left', imageSrc: './assets/motherboard/Biostar/LGA 1200/Z590 VALKYRIE.png'}, 
            {side: 'right', imageSrc: './assets/motherboard/backside.png'},
            {side: 'rear', imageSrc: './assets/motherboard/Biostar/LGA 1200/Z590 VALKYRIE REAR.png'} 
        ],
        slots: [
            {
                type: 'cpu', 
                supports: ['LGA 1200'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 112, y: 73, width: 45, height: 45},
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
                           default: {x: 86, y: 46, width: 95, height: 105}
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
                            default: {x: 208, y: 29, width: 7, height: 140}
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
                            default: {x: 198, y: 29, width: 7, height: 140}
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
                            default: {x: 188, y: 29, width: 7, height: 140}
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
                            default: {x: 178, y: 29, width: 7, height: 140}
                        },
                        accessible: true
                    }
                }
            }, 
            {
                type: 'storage',
                supports: ['m.2'],
                component: null,
                hidden: true,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 67, y: 156.5, width: 80, height: 20}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'storage',
                supports: ['m.2'],
                component: null,
                hidden: true,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 67, y: 218, width: 80, height: 20}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'storage',
                supports: ['m.2'],
                component: null,
                hidden: true,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 67, y: 259, width: 80, height: 20}
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
    {        // Biostar Z590GTA
        name: 'Biostar Z590GTA',
        type: 'motherboard',
        size: 'ATX',        
        watts: '100',
        specs:{
            price: 18598,
            chipset: 'Intel Z590',
            cpuslot: 'LGA 1200',
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
            {side: 'PACK', imageSrc: './assets/motherboard/Biostar/LGA 1200/Z590GTA PACK.png'}, 
            {side: 'left', imageSrc: './assets/motherboard/Biostar/LGA 1200/Z590GTA.png'}, 
            {side: 'right', imageSrc: './assets/motherboard/backside.png'},
            {side: 'rear', imageSrc: './assets/motherboard/Biostar/LGA 1200/Z590GTA REAR.png'} 
        ],
        slots: [
            {
                type: 'cpu', 
                supports: ['LGA 1200'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 111, y: 73, width: 45, height: 45},
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
                           default: {x: 84, y: 48, width: 95, height: 105}
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
                            default: {x: 208, y: 32, width: 7, height: 140}
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
                            default: {x: 198, y: 32, width: 7, height: 140}
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
                            default: {x: 188, y: 32, width: 7, height: 140}
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
                            default: {x: 178, y: 32, width: 7, height: 140}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'storage',
                supports: ['m.2'],
                component: null,
                hidden: true,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 67, y: 159, width: 80, height: 20}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'storage',
                supports: ['m.2'],
                component: null,
                hidden: true,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 67, y: 203, width: 80, height: 20}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'storage',
                supports: ['m.2'],
                component: null,
                hidden: true,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 67, y: 259, width: 80, height: 20}
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
            {type: 'cooling'},
            {type: 'frontPanel'},
        ],
        cables: []
    },
    {        // Gigabyte Z590 GAMING X
        name: 'Gigabyte Z590 GAMING X',
        type: 'motherboard',
        size: 'ATX',        
        watts: '100',
        specs:{
            price: 9480,
            chipset: 'Intel Z590',
            cpuslot: 'LGA 1200',
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
            {side: 'PACK', imageSrc: './assets/motherboard/Gigabyte/LGA 1200/Z590 GAMING X/Z590 GAMING X PACK.png'}, 
            {side: 'left', imageSrc: './assets/motherboard/Gigabyte/LGA 1200/Z590 GAMING X/Z590 GAMING X.png'}, 
            {side: 'right', imageSrc: './assets/motherboard/backside.png'},
            {side: 'rear', imageSrc: './assets/motherboard/Gigabyte/LGA 1200/Z590 GAMING X/Z590 GAMING X REAR.png'} 
        ],
        slots: [
            {
                type: 'cpu', 
                supports: ['LGA 1200'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 108, y: 78, width: 45, height: 45},
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
                           default: {x: 84, y: 48, width: 95, height: 105}
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
                            default: {x: 207, y: 32, width: 8, height: 140}
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
                            default: {x: 197, y: 32, width: 8, height: 140}
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
                            default: {x: 187, y: 32, width: 8, height: 140}
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
                            default: {x: 177, y: 32, width: 8, height: 140}
                        },
                        accessible: true
                    }
                }
            }, 
            {
                type: 'storage',
                supports: ['m.2'],
                component: null,
                hidden: true,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 67, y: 155, width: 80, height: 20}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'storage',
                supports: ['m.2'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 70, y: 215, width: 80, height: 20}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'storage',
                supports: ['m.2'],
                component: null,
                hidden: true,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 67, y: 256, width: 80, height: 20}
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
    {        // Gigabyte Z590 VISION D
        name: 'Gigabyte Z590 VISION D',
        type: 'motherboard',
        size: 'ATX',        
        watts: '100',
        specs:{
            price: 21693,
            chipset: 'Intel Z590',
            cpuslot: 'LGA 1200',
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
            {side: 'PACK', imageSrc: './assets/motherboard/Gigabyte/LGA 1200/Z590 VISION D/6.png'}, 
            {side: 'left', imageSrc: './assets/motherboard/Gigabyte/LGA 1200/Z590 VISION D/2.png'}, 
            {side: 'right', imageSrc: './assets/motherboard/backside.png'},
            {side: 'rear', imageSrc: './assets/motherboard/Gigabyte/LGA 1200/Z590 VISION D/5.png'} 
        ],
        slots: [
            {
                type: 'cpu', 
                supports: ['LGA 1200'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 104, y: 70, width: 45, height: 45},
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
                            default: {x: 1, y: 200, width: 230, height: 60},
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
                           default: {x: 80, y: 42, width: 95, height: 105}
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
                            default: {x: 206, y: 24, width: 8, height: 130}
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
                            default: {x: 196, y: 24, width: 8, height: 130}
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
                            default: {x: 186, y: 24, width: 8, height: 130}
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
                            default: {x: 176, y: 24, width: 8, height: 130}
                        },
                        accessible: true
                    }
                }
            }, 
            {
                type: 'storage',
                supports: ['m.2'],
                component: null,
                hidden: true,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 67, y: 175, width: 80, height: 20}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'storage',
                supports: ['m.2'],
                component: null,
                hidden: true,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 67, y: 195, width: 80, height: 20}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'storage',
                supports: ['m.2'],
                component: null,
                hidden: true,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 67, y: 231, width: 80, height: 20}
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
    {        // MSI MAG Z590 TORPEDO
        name: 'MSI MAG Z590 TORPEDO',
        type: 'motherboard',
        size: 'ATX',        
        watts: '100',
        specs:{
            price: 11655,
            chipset: 'Intel Z590',
            cpuslot: 'LGA 1200',
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
            {side: 'PACK', imageSrc: './assets/motherboard/MSI/LGA 1200/MAG Z590 TORPEDO PACK.png'}, 
            {side: 'left', imageSrc: './assets/motherboard/MSI/LGA 1200/MAG Z590 TORPEDO.png'}, 
            {side: 'right', imageSrc: './assets/motherboard/backside.png'},
            {side: 'rear', imageSrc: './assets/motherboard/MSI/LGA 1200/MAG Z590 TORPEDO REAR.png'} 
        ],
        slots: [
            {
                type: 'cpu', 
                supports: ['LGA 1200'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 106, y: 74, width: 45, height: 45},
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
                           default: {x: 84, y: 48, width: 95, height: 105}
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
                            default: {x: 207, y: 28, width: 8, height: 140}
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
                            default: {x: 197, y: 28, width: 8, height: 140}
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
                            default: {x: 187, y: 28, width: 8, height: 140}
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
                            default: {x: 177, y: 28, width: 8, height: 140}
                        },
                        accessible: true
                    }
                }
            }, 
            {
                type: 'storage',
                supports: ['m.2'],
                component: null,
                hidden: true,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 67, y: 155, width: 80, height: 20}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'storage',
                supports: ['m.2'],
                component: null,
                hidden: true,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 75, y: 213, width: 80, height: 20}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'storage',
                supports: ['m.2'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 80, y: 259, width: 80, height: 20}
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
    {        // MSI Z590 PRO WIFI (CEC)
        name: 'MSI Z590 PRO WIFI (CEC)',
        type: 'motherboard',
        size: 'ATX',        
        watts: '100',
        specs:{
            price: 9995,
            chipset: 'Intel Z590',
            cpuslot: 'LGA 1200',
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
            {side: 'PACK', imageSrc: './assets/motherboard/MSI/LGA 1200/Z590 PRO WIFI (CEC) PACK.png'}, 
            {side: 'left', imageSrc: './assets/motherboard/MSI/LGA 1200/Z590 PRO WIFI (CEC).png'}, 
            {side: 'right', imageSrc: './assets/motherboard/backside.png'},
            {side: 'rear', imageSrc: './assets/motherboard/MSI/LGA 1200/Z590 PRO WIFI (CEC) REAR.png'} 
        ],
        slots: [
            {
                type: 'cpu', 
                supports: ['LGA 1200'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 109, y: 70, width: 45, height: 45},
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
                           default: {x: 84, y: 43, width: 95, height: 105}
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
                            default: {x: 208, y: 24, width: 8, height: 140}
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
                            default: {x: 198, y: 24, width: 8, height: 140}
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
                            default: {x: 188, y: 24, width: 8, height: 140}
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
                            default: {x: 178, y: 24, width: 8, height: 140}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'storage',
                supports: ['m.2'],
                component: null,
                hidden: true,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 67, y: 147, width: 80, height: 20}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'storage',
                supports: ['m.2'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 72, y: 255, width: 80, height: 20}
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

    // MOTHERBOARD LGA 1700
    {        // MSI MPG Z790 Carbon Max WiFi
        name: 'MSI MPG Z790 Carbon Max WiFi',
        type: 'motherboard',
        size: 'ATX',        
        watts: '100',
        specs:{
            price: 26210,
            chipset: 'Intel Z790',
            cpuslot: 'LGA 1700',
            slots: 'Dual channel DDR5 DIMM slots, PCIe x16',
            ports: 'FrontPanel, 24-pin power, 8-pin power, SATA, CPU cooling',
            storage: 'SATA',
            dimensions:'244 mm (D) x 244 mm (W) x 305 mm (H)',
        },
        dimensions: {
            depth: 244,
            width: 300,
            height: 305
        },
        isRotatable: false,
        isAttached: false,
        defaultSource: 'PACK',
        tableDisplay: 'left',
        images: [
            {side: 'PACK', imageSrc: './assets/motherboard/MSI/LGA 1700/MPG Z790 CARBON MAX WIFI II PACK.png'}, 
            {side: 'left', imageSrc: './assets/motherboard/MSI/LGA 1700/MPG Z790 CARBON MAX WIFI II.png'}, 
            {side: 'right', imageSrc: './assets/motherboard/backside.png'},
            {side: 'rear', imageSrc: './assets/motherboard/MSI/LGA 1700/MPG Z790 CARBON MAX WIFI II REAR.png'} 
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
                            default: {x: 1, y: 190, width: 200, height: 40},
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
                           default: {x: 84, y: 43, width: 95, height: 105}
                       },
                       accessible: true
                   }
               }
           },
            {
                type: 'ram',
                supports: ['ddr5'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 208, y: 33, width: 8, height: 140}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'ram',
                supports: ['ddr5'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 198, y: 33, width: 8, height: 140}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'ram',
                supports: ['ddr5'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 188, y: 33, width: 8, height: 140}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'ram',
                supports: ['ddr5'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 178, y: 33, width: 8, height: 140}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'storage',
                supports: ['m.2'],
                component: null,
                hidden: true,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 74, y: 155, width: 80, height: 20}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'storage',
                supports: ['m.2'],
                component: null,
                hidden: true,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 67, y: 176, width: 80, height: 20}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'storage',
                supports: ['m.2'],
                component: null,
                hidden: true,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 67, y: 220, width: 80, height: 20}
                        },
                        accessible: true
                    }
                }
            },   
            {
                type: 'storage',
                supports: ['m.2'],
                component: null,
                hidden: true,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 40, y: 259, width: 80, height: 20}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'storage',
                supports: ['m.2'],
                component: null,
                hidden: true,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 122, y: 259, width: 80, height: 20}
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
    {        // MSI MPG Z790 EDGE WIFI
        name: 'MSI MPG Z790 EDGE WIFI',
        type: 'motherboard',
        size: 'ATX',        
        watts: '100',
        specs:{
            price: 18403,
            chipset: 'Intel Z790',
            cpuslot: 'LGA 1700',
            slots: 'Dual channel DDR5 DIMM slots, PCIe x16',
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
            {side: 'PACK', imageSrc: './assets/motherboard/MSI/LGA 1700/MPG Z790 EDGE WIFI PACK.png'}, 
            {side: 'left', imageSrc: './assets/motherboard/MSI/LGA 1700/MPG Z790 EDGE WIFI.png'}, 
            {side: 'right', imageSrc: './assets/motherboard/backside.png'},
            {side: 'rear', imageSrc: './assets/motherboard/MSI/LGA 1700/MPG Z790 EDGE WIFI REAR.png'} 
        ],
        slots: [
            {
                type: 'cpu', 
                supports: ['LGA 1700'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 110, y: 73, width: 45, height: 45},
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
                           default: {x: 84, y: 43, width: 95, height: 105}
                       },
                       accessible: true
                   }
               }
           },
            {
                type: 'ram',
                supports: ['ddr5'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 207, y: 33, width: 8, height: 140}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'ram',
                supports: ['ddr5'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 197, y: 33, width: 8, height: 140}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'ram',
                supports: ['ddr5'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 187, y: 33, width: 8, height: 140}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'ram',
                supports: ['ddr5'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 177, y: 33, width: 8, height: 140}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'storage',
                supports: ['m.2'],
                component: null,
                hidden: true,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 74, y: 155, width: 80, height: 20}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'storage',
                supports: ['m.2'],
                component: null,
                hidden: true,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 77, y: 200, width: 80, height: 20}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'storage',
                supports: ['m.2'],
                component: null,
                hidden: true,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 87, y: 225, width: 80, height: 20}
                        },
                        accessible: true
                    }
                }
            },   
            {
                type: 'storage',
                supports: ['m.2'],
                component: null,
                hidden: true,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 48, y: 258, width: 80, height: 20}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'storage',
                supports: ['m.2'],
                component: null,
                hidden: true,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 130, y: 258, width: 80, height: 20}
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
    {        // B760 Aorus Master DDR4
        name: 'B760 Aorus Master DDR4',
        type: 'motherboard',
        size: 'ATX',        
        watts: '100',
        specs:{
            price: 25654,
            chipset: 'Intel B760',
            cpuslot: 'LGA 1700',
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
            {side: 'PACK', imageSrc: './assets/motherboard/Aorus/LGA 1700/B760 AORUS MASTER DDR4-01.png'}, 
            {side: 'left', imageSrc: './assets/motherboard/Aorus/LGA 1700/B760 AORUS MASTER DDR4-02.png'}, 
            {side: 'right', imageSrc: './assets/motherboard/backside.png'},
            {side: 'rear', imageSrc: './assets/motherboard/Aorus/LGA 1700/B760 AORUS MASTER DDR4-06.png'} 
        ],
        slots: [
            {
                type: 'cpu', 
                supports: ['LGA 1700'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 108, y: 73, width: 45, height: 45},
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
                           default: {x: 84, y: 43, width: 95, height: 105}
                       },
                       accessible: true
                   }
               }
           },
            {
                type: 'ram',
                supports: ['ddr5'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 208, y: 31, width: 8, height: 140}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'ram',
                supports: ['ddr5'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 198, y: 31, width: 8, height: 140}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'ram',
                supports: ['ddr5'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 188, y: 31, width: 8, height: 140}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'ram',
                supports: ['ddr5'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 178, y: 31, width: 8, height: 140}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'storage',
                supports: ['m.2'],
                component: null,
                hidden: true,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 65, y: 155, width: 80, height: 20}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'storage',
                supports: ['m.2'],
                component: null,
                hidden: true,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 60, y: 206, width: 80, height: 20}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'storage',
                supports: ['m.2'],
                component: null,
                hidden: true,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 60, y: 230, width: 80, height: 20}
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
    {        // Z790 Aorus Pro X
        name: 'Z790 Aorus Pro X',
        type: 'motherboard',
        size: 'ATX',        
        watts: '100',
        specs:{
            price: 24995,
            chipset: 'Intel Z790',
            cpuslot: 'LGA 1700',
            slots: 'Dual channel DDR5 DIMM slots, PCIe x16',
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
            {side: 'PACK', imageSrc: './assets/motherboard/Aorus/LGA 1700/Z790 AORUS PRO X-01.png'}, 
            {side: 'left', imageSrc: './assets/motherboard/Aorus/LGA 1700/Z790 AORUS PRO X-02.png'}, 
            {side: 'right', imageSrc: './assets/motherboard/backside1.png'},
            {side: 'rear', imageSrc: './assets/motherboard/Aorus/LGA 1700/Z790 AORUS PRO X-03.png'} 
        ],
        slots: [
            {
                type: 'cpu', 
                supports: ['LGA 1700'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 106, y: 77, width: 45, height: 45},
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
                           default: {x: 84, y: 43, width: 95, height: 105}
                       },
                       accessible: true
                   }
               }
           },
            {
                type: 'ram',
                supports: ['ddr5'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 204, y: 33, width: 8, height: 135}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'ram',
                supports: ['ddr5'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 194, y: 33, width: 8, height: 135}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'ram',
                supports: ['ddr5'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 184, y: 33, width: 8, height: 135}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'ram',
                supports: ['ddr5'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 174, y: 33, width: 8, height: 135}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'storage',
                supports: ['m.2'],
                component: null,
                hidden: true,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 60, y: 157, width: 80, height: 20}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'storage',
                supports: ['m.2'],
                component: null,
                hidden: true,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 60, y: 200, width: 80, height: 20}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'storage',
                supports: ['m.2'],
                component: null,
                hidden: true,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 60, y: 225, width: 80, height: 20}
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
    {        // Z790 Livemixer
        name: 'ASRock Z790 Livemixer',
        type: 'motherboard',
        size: 'ATX',        
        watts: '100',
        specs:{
            price: 16995,
            chipset: 'Intel Z790',
            cpuslot: 'LGA 1700',
            slots: 'Dual channel DDR5 DIMM slots, PCIe x16',
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
            {side: 'PACK', imageSrc: './assets/motherboard/ASRock/LGA 1700/Z790 LiveMixer(M1).png'}, 
            {side: 'left', imageSrc: './assets/motherboard/ASRock/LGA 1700/z790 Livemixer.png'},
            {side: 'right', imageSrc: './assets/motherboard/backside.png'}, 
            {side: 'rear', imageSrc: './assets/motherboard/ASRock/LGA 1700/z790 Livemixer Rear.png'} 
        ],
        slots: [
            {
                type: 'cpu', 
                supports: ['LGA 1700'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 112, y: 74, width: 45, height: 45},
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
                           default: {x: 84, y: 43, width: 95, height: 105}
                       },
                       accessible: true
                   }
               }
           },
            {
                type: 'ram',
                supports: ['ddr5'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 211, y: 33, width: 8, height: 138}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'ram',
                supports: ['ddr5'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 201, y: 33, width: 8, height: 138}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'ram',
                supports: ['ddr5'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 191, y: 33, width: 8, height: 138}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'ram',
                supports: ['ddr5'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 181, y: 33, width: 8, height: 138}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'storage',
                supports: ['m.2'],
                component: null,
                hidden: true,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 58, y: 157, width: 80, height: 20}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'storage',
                supports: ['m.2'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 74, y: 215, width: 80, height: 20}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'storage',
                supports: ['m.2'],
                component: null,
                hidden: true,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 48, y: 255, width: 80, height: 20}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'storage',
                supports: ['m.2'],
                component: null,
                hidden: true,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 131, y: 255, width: 80, height: 20}
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
    {        // Z790 PG Riptide
        name: 'ASRock Z790 PG Riptide',
        type: 'motherboard',
        size: 'ATX',        
        watts: '100',
        specs:{
            price:  13942,
            chipset: 'Intel Z790',
            cpuslot: 'LGA 1700',
            slots: 'Dual channel DDR5 DIMM slots, PCIe x16',
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
            {side: 'PACK', imageSrc: './assets/motherboard/ASRock/LGA 1700/Z790 PG Riptide(L1).png'}, 
            {side: 'left', imageSrc: './assets/motherboard/ASRock/LGA 1700/Z790 PG Riptide(L3).png'}, 
            {side: 'right', imageSrc: './assets/motherboard/backside.png'},
            {side: 'rear', imageSrc: './assets/motherboard/ASRock/LGA 1700/Z790 PG Riptide(L6).png'} 
        ],
        slots: [
            {
                type: 'cpu', 
                supports: ['LGA 1700'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 105, y: 71, width: 45, height: 45},
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
                           default: {x: 84, y: 43, width: 95, height: 105}
                       },
                       accessible: true
                   }
               }
           },
            {
                type: 'ram',
                supports: ['ddr5'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 206.5, y: 24, width: 8, height: 140}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'ram',
                supports: ['ddr5'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 196.5, y: 24, width: 8, height: 140}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'ram',
                supports: ['ddr5'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 186.5, y: 24, width: 8, height: 140}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'ram',
                supports: ['ddr5'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 176.5, y: 24, width: 8, height: 140}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'storage',
                supports: ['m.2'],
                component: null,
                hidden: true,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 60, y: 157, width: 80, height: 20}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'storage',
                supports: ['m.2'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 48, y: 220, width: 80, height: 20}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'storage',
                supports: ['m.2'],
                component: null,
                hidden: true,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 45, y: 255, width: 80, height: 20}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'storage',
                supports: ['m.2'],
                component: null,
                hidden: true,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 130, y: 255, width: 80, height: 20}
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
    {        // ROG STRIX Z790-A GAMING WIFI II
        name: 'ROG STRIX Z790-A GAMING WIFI II',
        type: 'motherboard',
        size: 'ATX',        
        watts: '100',
        specs:{
            price: 20021,
            chipset: 'Intel Z790-A',
            cpuslot: 'LGA 1700',
            slots: 'Dual channel DDR5 DIMM slots, PCIe x16',
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
            {side: 'PACK', imageSrc: './assets/motherboard/ASUS ROG/LGA1700/ROG STRIX Z790-A GAMING WIFI II pack.png'}, 
            {side: 'left', imageSrc: './assets/motherboard/ASUS ROG/LGA1700/ROG STRIX Z790-A GAMING WIFI II.png'}, 
            {side: 'right', imageSrc: './assets/motherboard/backside.png'},
            {side: 'rear', imageSrc: './assets/motherboard/ASUS ROG/LGA1700/ROG STRIX Z790-A GAMING WIFI II 1.png'} 
        ],
        slots: [
            {
                type: 'cpu', 
                supports: ['LGA 1700'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 115, y: 75, width: 45, height: 45},
                        },
                        accessible: true // if able to attach to this side
                    }
                }
            },
            {
                type: 'gpu', 
                supports: ['pcie5'],
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
                           default: {x: 87, y: 43, width: 95, height: 105}
                       },
                       accessible: true
                   }
               }
           },
            {
                type: 'ram',
                supports: ['ddr5'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 212, y: 27, width: 7, height: 140}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'ram',
                supports: ['ddr5'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 203, y: 27, width: 7, height: 140}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'ram',
                supports: ['ddr5'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 193, y: 27, width: 7, height: 140}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'ram',
                supports: ['ddr5'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 183, y: 27, width: 7, height: 140}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'storage',
                supports: ['m.2'],
                component: null,
                hidden: true,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 60, y: 157, width: 80, height: 20}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'storage',
                supports: ['m.2'],
                component: null,
                hidden: true,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 74, y: 233, width: 80, height: 20}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'storage',
                supports: ['m.2'],
                component: null,
                hidden: true,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 154, y: 233, width: 80, height: 20}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'storage',
                supports: ['m.2'],
                component: null,
                hidden: true,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 50, y: 257.6, width: 80, height: 20}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'storage',
                supports: ['m.2'],
                component: null,
                hidden: true,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 135, y: 257.6, width: 80, height: 20}
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
    {        // ROG MAXIMUS Z790 DARK HERO
        name: 'ROG MAXIMUS Z790 DARK HERO',
        type: 'motherboard',
        size: 'ATX',        
        watts: '100',
        specs:{
            price: 35693,
            chipset: 'Intel Z790',
            cpuslot: 'LGA 1700',
            slots: 'Dual channel DDR5 DIMM slots, PCIe x16',
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
            {side: 'PACK', imageSrc: './assets/motherboard/ASUS ROG/LGA1700/ROG MAXIMUS Z790 DARK HERO PACK.png'}, 
            {side: 'left', imageSrc: './assets/motherboard/ASUS ROG/LGA1700/ROG MAXIMUS Z790 DARK HERO.png'}, 
            {side: 'right', imageSrc: './assets/motherboard/backside.png'},
            {side: 'rear', imageSrc: './assets/motherboard/ASUS ROG/LGA1700/ROG MAXIMUS Z790 DARK HERO REAR.png'} 
        ],
        slots: [
            {
                type: 'cpu', 
                supports: ['LGA 1700'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 115, y: 83, width: 45, height: 45},
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
                           default: {x: 87, y: 45, width: 95, height: 105}
                       },
                       accessible: true
                   }
               }
           },
            {
                type: 'ram',
                supports: ['ddr5'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 210, y: 37, width: 7, height: 140}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'ram',
                supports: ['ddr5'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 200, y: 37, width: 7, height: 140}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'ram',
                supports: ['ddr5'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 190, y: 37, width: 7, height: 140}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'ram',
                supports: ['ddr5'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 180, y: 37, width: 7, height: 140}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'storage',
                supports: ['m.2'],
                component: null,
                hidden: true,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 60, y: 158, width: 80, height: 20}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'storage',
                supports: ['m.2'],
                component: null,
                hidden: true,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 60, y: 195, width: 80, height: 20}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'storage',
                supports: ['m.2'],
                component: null,
                hidden: true,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 60, y: 215, width: 80, height: 20}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'storage',
                supports: ['m.2'],
                component: null,
                hidden: true,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 60, y: 235, width: 80, height: 20}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'storage',
                supports: ['m.2'],
                component: null,
                hidden: true,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 150, y: 258, width: 80, height: 20}
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
    {        // Biostar Z690A VALKYRIE
        name: 'Biostar Z690A VALKYRIE',
        type: 'motherboard',
        size: 'ATX',        
        watts: '100',
        specs:{
            price: 32291,
            chipset: 'Intel Z690-A',
            cpuslot: 'LGA 1700',
            slots: 'Dual channel DDR5 DIMM slots, PCIe x16',
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
            {side: 'PACK', imageSrc: './assets/motherboard/Biostar/LGA 1700/Z690A VALKYRIE pack.png'}, 
            {side: 'left', imageSrc: './assets/motherboard/Biostar/LGA 1700/Z690A VALKYRIE.png'}, 
            {side: 'right', imageSrc: './assets/motherboard/backside.png'},
            {side: 'rear', imageSrc: './assets/motherboard/Biostar/LGA 1700/Z690A VALKYRIE 1.png'} 
        ],
        slots: [
            {
                type: 'cpu', 
                supports: ['LGA 1700'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 115, y: 67, width: 45, height: 45},
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
                           default: {x: 86, y: 43, width: 95, height: 105}
                       },
                       accessible: true
                   }
               }
           },
            {
                type: 'ram',
                supports: ['ddr5'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 207, y: 24, width: 8, height: 140}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'ram',
                supports: ['ddr5'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 199, y: 24, width: 8, height: 140}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'ram',
                supports: ['ddr5'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 191, y: 24, width: 8, height: 140}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'ram',
                supports: ['ddr5'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 183, y: 24, width: 8, height: 140}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'storage',
                supports: ['m.2'],
                component: null,
                hidden: true,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 60, y: 158, width: 80, height: 20}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'storage',
                supports: ['m.2'],
                component: null,
                hidden: true,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 60, y: 195, width: 80, height: 20}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'storage',
                supports: ['m.2'],
                component: null,
                hidden: true,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 60, y: 222, width: 80, height: 20}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'storage',
                supports: ['m.2'],
                component: null,
                hidden: true,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 60, y: 257, width: 80, height: 20}
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
    {        // Biostar Z790 VALKYRIE
        name: 'Biostar Z790 VALKYRIE',
        type: 'motherboard',
        size: 'ATX',        
        watts: '100',
        specs:{
            price: 27829,
            chipset: 'Intel Z790',
            cpuslot: 'LGA 1700',
            slots: 'Dual channel DDR5 DIMM slots, PCIe x16',
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
            {side: 'PACK', imageSrc: './assets/motherboard/Biostar/LGA 1700/Z790 VALKYRIE pack.png'}, 
            {side: 'left', imageSrc: './assets/motherboard/Biostar/LGA 1700/Z790 VALKYRIE.png'}, 
            {side: 'right', imageSrc: './assets/motherboard/backside.png'},
            {side: 'rear', imageSrc: './assets/motherboard/Biostar/LGA 1700/Z790 VALKYRIE 1.png'} 
        ],
        slots: [
            {
                type: 'cpu', 
                supports: ['LGA 1700'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 113, y: 62, width: 45, height: 45},
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
                           default: {x: 84, y: 40, width: 95, height: 105}
                       },
                       accessible: true
                   }
               }
           },
            {
                type: 'ram',
                supports: ['ddr5'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 207, y: 21, width: 8, height: 140}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'ram',
                supports: ['ddr5'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 199, y: 21, width: 8, height: 140}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'ram',
                supports: ['ddr5'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 191, y: 21, width: 8, height: 140}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'ram',
                supports: ['ddr5'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 183, y: 21, width: 8, height: 140}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'storage',
                supports: ['m.2'],
                component: null,
                hidden: true,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 60, y: 158, width: 80, height: 20}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'storage',
                supports: ['m.2'],
                component: null,
                hidden: true,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 60, y: 195, width: 80, height: 20}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'storage',
                supports: ['m.2'],
                component: null,
                hidden: true,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 60, y: 222, width: 80, height: 20}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'storage',
                supports: ['m.2'],
                component: null,
                hidden: true,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 60, y: 257, width: 80, height: 20}
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
    {        // Gigabyte B760 DS3H AX V2
        name: 'Gigabyte B760 DS3H AX V2',
        type: 'motherboard',
        size: 'ATX',        
        watts: '100',
        specs:{
            price: 8923,
            chipset: 'Intel Z760',
            cpuslot: 'LGA 1700',
            slots: 'Dual channel DDR5 DIMM slots, PCIe x16',
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
            {side: 'PACK', imageSrc: './assets/motherboard/Gigabyte/LGA 1700/B760 DS3H AX V2/B760 DS3H AX V2-01.png'}, 
            {side: 'left', imageSrc: './assets/motherboard/Gigabyte/LGA 1700/B760 DS3H AX V2/B760 DS3H AX V2-02.png'}, 
            {side: 'right', imageSrc: './assets/motherboard/backside.png'},
            {side: 'rear', imageSrc: './assets/motherboard/Gigabyte/LGA 1700/B760 DS3H AX V2/B760 DS3H AX V2-04.png'} 
        ],
        slots: [
            {
                type: 'cpu', 
                supports: ['LGA 1700'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 105, y: 70, width: 45, height: 45},
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
                            default: {x: 1, y: 180, width: 200, height: 40},
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
                           default: {x: 82, y: 43, width: 95, height: 105}
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
                            default: {x: 204, y: 24, width: 8, height: 140}
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
                            default: {x: 196, y: 24, width: 8, height: 140}
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
                            default: {x: 188, y: 24, width: 8, height: 140}
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
                            default: {x: 180, y: 24, width: 8, height: 140}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'storage',
                supports: ['m.2'],
                component: null,
                hidden: true,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 60, y: 154, width: 80, height: 20}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'storage',
                supports: ['m.2'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 67, y: 213, width: 80, height: 20}
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
    {        // Gigabyte Z790 GAMING PLUS AX
        name: 'Gigabyte Z790 GAMING PLUS AX',
        type: 'motherboard',
        size: 'ATX',        
        watts: '100',
        specs:{
            price: 11154,
            chipset: 'Intel Z790',
            cpuslot: 'LGA 1700',
            slots: 'Dual channel DDR5 DIMM slots, PCIe x16',
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
            {side: 'PACK', imageSrc: './assets/motherboard/Gigabyte/LGA 1700/Z790 GAMING PLUS AX/Z790 GAMING PLUS AX-01.png'}, 
            {side: 'left', imageSrc: './assets/motherboard/Gigabyte/LGA 1700/Z790 GAMING PLUS AX/Z790 GAMING PLUS AX-02.png'}, 
            {side: 'right', imageSrc: './assets/motherboard/backside.png'},
            {side: 'rear', imageSrc: './assets/motherboard/Gigabyte/LGA 1700/Z790 GAMING PLUS AX/Z790 GAMING PLUS AX-04.png'} 
        ],
        slots: [
            {
                type: 'cpu', 
                supports: ['LGA 1700'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 105, y: 76, width: 45, height: 45},
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
                           default: {x: 84, y: 43, width: 95, height: 105}
                       },
                       accessible: true
                   }
               }
           },
            {
                type: 'ram',
                supports: ['ddr5'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 203, y: 27, width: 8, height: 140}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'ram',
                supports: ['ddr5'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 195, y: 27, width: 8, height: 140}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'ram',
                supports: ['ddr5'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 187, y: 27, width: 8, height: 140}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'ram',
                supports: ['ddr5'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 179, y: 27, width: 8, height: 140}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'storage',
                supports: ['m.2'],
                component: null,
                hidden: true,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 60, y: 158, width: 80, height: 20}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'storage',
                supports: ['m.2'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 66, y: 213, width: 80, height: 20}
                        },
                        accessible: true
                    }
                }
            },
            {
                type: 'storage',
                supports: ['m.2'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 66, y: 233, width: 80, height: 20}
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
    
    // CPU INTEL [use general photos for attached component and use pack for differentiation of cpus amd intel 1700.png(lga1700 cpus) and 1200 am5.png(lga1200 cpus)]
    {        // Intel Core i9 14900K
        name: 'Intel Core i9-14900K',
        type: 'cpu',
        size: 'LGA 1700',
        watts: '275',
        specs:{
            price: 32849,
            generation: 'Core i9 (Raptor Lake)',
            socket: 'LGA 1700',
            cores: '24',
            baseclock: '3.2 GHz',
            boostclock: '6 GHz',
            TDP: '275W',
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
            {side: 'PACK', imageSrc: './assets/cpu/intel/lga1700/i9 14900K.png'},  
            {side: 'left', imageSrc: './assets/cpu/intel/gen photos/intel 1700.png'},  

        ],
        slots: [],
        ports: []
    },
    {        // Intel Core i9 11900K
        name: 'Intel Core i9-11900K',
        type: 'cpu',
        size: 'LGA 1200',
        watts: '275',
        specs:{
            price: 30060,
            generation: 'Core i9 (Rocket Lake)',
            socket: 'LGA 1200',
            cores: '8',
            baseclock: '3.5 GHz',
            boostclock: '5.3 GHz',
            TDP: '275W',
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
            {side: 'PACK', imageSrc: './assets/cpu/intel/lga1200/i9 11900K.png'},  
            {side: 'left', imageSrc: './assets/cpu/intel/gen photos/intel 1200.png'},  
        ],
        slots: [],
        ports: []
    },    
    {        // Intel Core i7 14700K
        name: 'Intel Core i7-14700K',
        type: 'cpu',
        size: 'LGA 1700',
        watts: '275',
        specs:{
            price: 22810,
            generation: 'Core i7 (Raptor Lake-R)',
            socket: 'LGA 1700',
            cores: '20',
            baseclock: '3.4 GHz',
            boostclock: '5.6 GHz',
            TDP: '275W',
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
            {side: 'PACK', imageSrc: './assets/cpu/intel/lga1700/i7-14700K.png'},  
            {side: 'left', imageSrc: './assets/cpu/intel/gen photos/intel 1700.png'},  

        ],
        slots: [],
        ports: []
    },
    {        // Intel Core i7 11700K
        name: 'Intel Core i7-11700K',
        type: 'cpu',
        size: 'LGA 1200',
        watts: '275',
        specs:{
            price: 25999,
            generation: 'Core i7 (Rocket Lake)',
            socket: 'LGA 1700',
            cores: '8',
            baseclock: '3.6 GHz',
            boostclock: '5 GHz',
            TDP: '275W',
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
            {side: 'PACK', imageSrc: './assets/cpu/intel/lga1200/i7 11700K.png'},  
            {side: 'left', imageSrc: './assets/cpu/intel/gen photos/intel 1200.png'},  

        ],
        slots: [],
        ports: []
    },
    {        // Intel Core i5 14400
        name: 'Intel Core i5-14400',
        type: 'cpu',
        size: 'LGA 1700',
        watts: '215',
        specs:{
            price: 12617,
            generation: 'Core i5 (Raptor Lake-R)',
            socket: 'LGA 1700',
            cores: '16',
            baseclock: '2.5 GHz',
            boostclock: '4.7 GHz',
            TDP: '215W',
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
            {side: 'PACK', imageSrc: './assets/cpu/intel/lga1700/i5 14400.png'},  
            {side: 'left', imageSrc: './assets/cpu/intel/gen photos/intel 1700.png'},  

        ],
        slots: [],
        ports: []
    },
    {        // Intel Core i5 11600K
        name: 'Intel Core i5-11600K',
        type: 'cpu',
        size: 'LGA 1200',      
        watts: '275',
        specs:{
            price: 13159,
            generation: 'Core i5 (Rocket Lake)',
            socket: 'LGA 1200',
            cores: '6',
            baseclock: '3.9 GHz',
            boostclock: '4.9 GHz',
            TDP: '275W',
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
            {side: 'PACK', imageSrc: './assets/cpu/intel/lga1200/i5 11600k.png'},  
            {side: 'left', imageSrc: './assets/cpu/intel/gen photos/intel 1700.png'},  

        ],
        slots: [],
        ports: []
    },
    {        // Intel Core i3 14100
        name: 'Intel Core i3-14100',
        type: 'cpu',
        size: 'LGA 1700',
        watts: '208',
        specs:{
            price: 8849,
            generation: 'Core i3 (Raptor Lake-R)',
            socket: 'LGA 1700',
            cores: '4',
            baseclock: '3.5 GHz',
            boostclock: '4.7 GHz',
            TDP: '208W',
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
            {side: 'PACK', imageSrc: './assets/cpu/intel/lga1700/i3 14100.png'},  
            {side: 'left', imageSrc: './assets/cpu/intel/gen photos/intel 1700.png'},  

        ],
        slots: [],
        ports: []
    },
    {        // Intel Core i3 10350K
        name: 'Intel Core i3-10350K',
        type: 'cpu',
        size: 'LGA 1200',
        watts: '208',
        specs:{
            price: 5450,
            generation: 'Core i3 (Comet Lake)',
            socket: 'LGA 1200',
            cores: '4',
            baseclock: '4.1 GHz',
            boostclock: '4.8 GHz',
            TDP: '208W',
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
            {side: 'PACK', imageSrc: './assets/cpu/intel/lga1200/i3 10350k.png'},  
            {side: 'left', imageSrc: './assets/cpu/intel/gen photos/intel 1200.png'},  

        ],
        slots: [],
        ports: []
    },

    // CPU AMD [use general photos for attached component and use pack for differentiation of cpus amd am4.png(am4 cpus) and amd am5.png(am5 cpus)]
    {        // Ryzen 9 7900X3D
        name: 'AMD Ryzen 9 7900X3D',
        type: 'cpu',
        size: 'AM5',
        watts: '270',
        specs:{
            price: 30690,
            generation: 'Ryzen 9 Zen 4 (Raphael)',
            socket: 'AMD AM5',
            cores: '12',
            baseclock: '4.4 GHz',
            boostclock: '5.6 GHz',
            TDP: '270W',
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
            {side: 'PACK', imageSrc: './assets/cpu/amd/am5/Ryzen 9 7900X3D.png'},  
            {side: 'left', imageSrc: './assets/cpu/amd/gen photos/amd am5.png'},  
        ],
        slots: [],
        ports: []
    },
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
    {        // Ryzen 7 7800X3D
        name: 'AMD Ryzen 7 7800X3D',
        type: 'cpu',
        size: 'AM5',
        watts: '270',
        specs:{
            price: 29995,
            generation: 'Ryzen 7 Zen 4 (Raphael)',
            socket: 'AMD AM5',
            cores: '8',
            baseclock: '4.2 GHz',
            boostclock: '5 GHz',
            TDP: '270W',
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
            {side: 'PACK', imageSrc: './assets/cpu/amd/am5/7 7800X3D.png'},  
            {side: 'left', imageSrc: './assets/cpu/amd/gen photos/amd am5.png'},  
        ],
        slots: [],
        ports: []
    },
    {        // Ryzen 7 5700G
        name: 'AMD Ryzen 7 5700G',
        type: 'cpu',
        size: 'AM4',
        watts: '215',
        specs:{
            price: 11580,
            generation: 'Ryzen 7 Zen 3 (Cezanne)',
            socket: 'AMD AM4',
            cores: '8',
            baseclock: '3.8 GHz',
            boostclock: '4.6 GHz',
            TDP: '215W',
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
            {side: 'PACK', imageSrc: './assets/cpu/amd/am4/Ryzen 7 5700G.png'},  
            {side: 'left', imageSrc: './assets/cpu/amd/gen photos/amd am4.png'},  
        ],
        slots: [],
        ports: []
    },
    {        // Ryzen 5 7600X
        name: 'AMD Ryzen 5 7600X',
        type: 'cpu',
        size: 'AM5',
        watts: '255',
        specs:{
            price: 13895,
            generation: 'Ryzen 5 Zen 4 (Raphael)',
            socket: 'AMD AM5',
            cores: '6',
            baseclock: '4.7 GHz',
            boostclock: '5.3 GHz',
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
            {side: 'PACK', imageSrc: './assets/cpu/amd/am5/Ryzen 5 7600X.png'},  
            {side: 'left', imageSrc: './assets/cpu/amd/gen photos/amd am5.png'},  
        ],
        slots: [],
        ports: []
    },
    {        // Ryzen 5 5600GT
        name: 'AMD Ryzen 5 5600GT',
        type: 'cpu',
        size: 'AM4',
        watts: '215',
        specs:{
            price: 8750,
            generation: 'Ryzen 5 Zen 3 (Cezanne)',
            socket: 'AMD AM4',
            cores: '6',
            baseclock: '3.6 GHz',
            boostclock: '4.6 GHz',
            TDP: '215W',
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
            {side: 'PACK', imageSrc: './assets/cpu/amd/am4/Ryzen 5 5600GT.png'},  
            {side: 'left', imageSrc: './assets/cpu/amd/gen photos/amd am4.png'},  
        ],
        slots: [],
        ports: []
    },
    {        // Ryzen 3 8300G
        name: 'AMD Ryzen 3 8300G',
        type: 'cpu',
        size: 'AM5',
        watts: '250',
        specs:{
            price: 9815,
            generation: 'Ryzen 3 Zen 4 (Phoenix2)',
            socket: 'AMD AM5',
            cores: '4',
            baseclock: '3.4 GHz',
            boostclock: '4.9 GHz',
            TDP: '250W',
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
            {side: 'PACK', imageSrc: './assets/cpu/amd/am5/Ryzen 3 8300G.png'},  
            {side: 'left', imageSrc: './assets/cpu/amd/gen photos/amd am5.png'},  
        ],
        slots: [],
        ports: []
    },
    {        // Ryzen 3 5300G
        name: 'AMD Ryzen 3 5300G',
        type: 'cpu',
        size: 'AM4',
        watts: '215',
        specs:{
            price: 9050,
            generation: 'Ryzen 3 Zen 3 (Cezanne)',
            socket: 'AMD AM4',
            cores: '4',
            baseclock: '4 GHz',
            boostclock: '4.2 GHz',
            TDP: '215W',
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
            {side: 'PACK', imageSrc: './assets/cpu/amd/am4/Ryzen 3 5300G.png'},  
            {side: 'left', imageSrc: './assets/cpu/amd/gen photos/amd am4.png'},  
        ],
        slots: [],
        ports: []
    },

    // PSU [Fully modular]
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
    {        // Silverstone EX1200r-pl
        name: 'Silverstone EX1200r-pl',
        type: 'psu',
        size: 'ATX',
        specs:{
            price: 21349,
            wattage: 1200,
            cableModularity: 'modular',
            cables: '24-pin-power,8-pin-power, 8-pin-pcie, 6-pin-pcie, sata-power',
            ports: '24-pin-power,8-pin-power, 8-pin-pcie, 6-pin-pcie, sata-power'
        },
        dimensions: {
            width: 150,
            depth: 200,
            height: 150,
        },
        watts: '1200',
        isRotatable: true,
        isAttached: false,
        defaultSource: 'PACK',
        tableDisplay: 'left',
        images: [
            {side: 'PACK', imageSrc: './assets/psu/Silverstone technology co. Ltd/EX1200r-pl/ex1200r-pm-21.png'}, 
            {side: 'left', imageSrc: './assets/psu/Silverstone technology co. Ltd/EX1200r-pl/ex1200r-pl-9.png'}, 
            {side: 'front', imageSrc: './assets/psu/Silverstone technology co. Ltd/EX1200r-pl/ex1200r-pl-7.png'}, 
            {side: 'right', imageSrc: './assets/psu/Silverstone technology co. Ltd/EX1200r-pl/ex1200r-pl-10.png'}, 
            {side: 'rear', imageSrc: './assets/psu/Silverstone technology co. Ltd/EX1200r-pl/ex1200r-pl-8.png'}
        ],
        slots: [],
        ports: [
            {type: '24-pin-power',},
            {type: '8-pin-power'},
            {type: '8-pin-power'},
            {type: '8-pin-pcie'},
            {type: '8-pin-pcie'},
            {type: '6-pin-pcie'},
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
            {type: '6-pin-pcie'},
        ]
    },
    {        // Corsair AX1600i Digital
        name: 'Corsair AX1600i Digital',
        type: 'psu',
        size: 'ATX',
        specs:{
            price: 33462,
            wattage: 1600,
            cableModularity: 'modular',
            cables: '24-pin-power,8-pin-power, 8-pin-pcie, 6-pin-pcie, sata-power',
            ports: '24-pin-power,8-pin-power, 8-pin-pcie, 6-pin-pcie, sata-power'
        },
        dimensions: {
            width: 150,
            depth: 200,
            height: 150,
        },        
        watts: '1600',
        isRotatable: true,
        isAttached: false,
        defaultSource: 'PACK',
        tableDisplay: 'left',
        images: [
            {side: 'PACK', imageSrc: './assets/psu/Corsair/Corsair ax1600i digital atx fully modular/Corsair ax1600i digital atx fully modular pack.png'}, 
            {side: 'left', imageSrc: './assets/psu/Corsair/Corsair ax1600i digital atx fully modular/Corsair ax1600i digital atx fully modular.png'}, 
            {side: 'front', imageSrc: './assets/psu/Corsair/Corsair ax1600i digital atx fully modular/Corsair ax1600i digital atx fully modular front.png'}, 
            {side: 'right', imageSrc: './assets/psu/Corsair/Corsair ax1600i digital atx fully modular/Corsair ax1600i digital atx fully modular.png'}, 
            {side: 'rear', imageSrc: './assets/psu/Corsair/Corsair ax1600i digital atx fully modular/Corsair ax1600i digital atx fully modular rear.png'}
        ],
        slots: [],
        ports: [
            {type: '24-pin-power',},
            {type: '8-pin-power'},
            {type: '8-pin-power'},
            {type: '8-pin-pcie'},
            {type: '8-pin-pcie'},
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
            {type: '6-pin-pcie'},
        ]
    },
    {        // Cooler Master X Silent 1300w MAX Platinum
        name: 'Cooler Master X Silent 1300w MAX Platinum',
        type: 'psu',
        size: 'ATX',
        specs:{
            price: 22308,
            wattage: 1300,
            cableModularity: 'modular',
            cables: '24-pin-power,8-pin-power, 8-pin-pcie, 6-pin-pcie, sata-power',
            ports: '24-pin-power,8-pin-power, 8-pin-pcie, 6-pin-pcie, sata-power'
        },
        dimensions: {
            width: 150,
            depth: 200,
            height: 150,
        },
        watts: '1300',
        isRotatable: true,
        isAttached: false,
        defaultSource: 'PACK',
        tableDisplay: 'left',
        images: [
            {side: 'PACK', imageSrc: './assets/psu/Cooler master technology inc/cm x silent max 1300/pack.png'}, 
            {side: 'left', imageSrc: './assets/psu/Cooler master technology inc/cm x silent max 1300/left.png'}, 
            {side: 'front', imageSrc: './assets/psu/Cooler master technology inc/cm x silent max 1300/front.png'}, 
            {side: 'right', imageSrc: './assets/psu/Cooler master technology inc/cm x silent max 1300/right.png'}, 
            {side: 'rear', imageSrc: './assets/psu/Cooler master technology inc/cm x silent max 1300/rear.png'}
        ],
        slots: [],
        ports: [
            {type: '24-pin-power',},
            {type: '8-pin-power'},
            {type: '8-pin-power'},
            {type: '8-pin-pcie'},
            {type: '8-pin-pcie'},
            {type: '6-pin-pcie'},
            {type: 'sata-power'},
            {type: 'sata-power'},
            {type: 'sata-power'},
            {type: 'sata-power'},
            {type: '12vhpwr'},
        ],
        cables: [
            {type: '24-pin-power',},
            {type: '8-pin-power'},
            {type: '8-pin-power'},
            {type: '8-pin-pcie'},
            {type: '8-pin-pcie'},
            {type: '6-pin-pcie'},
            {type: '12vhpwr'},
        ]
    },
    {        // Cooler Master V 1600 Platinum v2
        name: 'Cooler Master V 1600 Platinum v2',
        type: 'psu',
        size: 'ATX',
        specs:{
            price: 17233,
            wattage: 1600,
            cableModularity: 'modular',
            cables: '24-pin-power,8-pin-power, 8-pin-pcie, 6-pin-pcie, sata-power',
            ports: '24-pin-power,8-pin-power, 8-pin-pcie, 6-pin-pcie, sata-power'
        },
        dimensions: {
            width: 150,
            depth: 200,
            height: 150,
        },
        watts: '1600',
        isRotatable: true,
        isAttached: false,
        defaultSource: 'PACK',
        tableDisplay: 'left',
        images: [
            {side: 'PACK', imageSrc: './assets/psu/Cooler master technology inc/cm v p 1600/pack.png'}, 
            {side: 'left', imageSrc: './assets/psu/Cooler master technology inc/cm v p 1600/left.png'}, 
            {side: 'front', imageSrc: './assets/psu/Cooler master technology inc/cm v p 1600/front.png'}, 
            {side: 'right', imageSrc: './assets/psu/Cooler master technology inc/cm v p 1600/right.png'}, 
            {side: 'rear', imageSrc: './assets/psu/Cooler master technology inc/cm v p 1600/rear.png'}
        ],
        slots: [],
        ports: [
            {type: '24-pin-power',},
            {type: '8-pin-power'},
            {type: '8-pin-power'},
            {type: '8-pin-pcie'},
            {type: '8-pin-pcie'},
            {type: '6-pin-pcie'},
            {type: 'sata-power'},
            {type: 'sata-power'},
            {type: 'sata-power'},
            {type: 'sata-power'},
            {type: '12vhpwr'}
        ],
        cables: [
            {type: '24-pin-power',},
            {type: '8-pin-power'},
            {type: '8-pin-power'},
            {type: '8-pin-pcie'},
            {type: '8-pin-pcie'},
            {type: '6-pin-pcie'},
            {type: '12vhpwr'}
        ]
    },
    {        // Thermaltake Toughpower GF3 1000W Gold
        name: 'Thermaltake Toughpower GF3 1000W Gold',
        type: 'psu',
        size: 'ATX',
        specs:{
            price: 11540,
            wattage: 1000,
            cableModularity: 'modular',
            cables: '24-pin-power,8-pin-power, 8-pin-pcie, 6-pin-pcie, sata-power',
            ports: '24-pin-power,8-pin-power, 8-pin-pcie, 6-pin-pcie, sata-power'
        },
        dimensions: {
            width: 150,
            depth: 200,
            height: 150,
        },
        watts: '1000',
        isRotatable: true,
        isAttached: false,
        defaultSource: 'PACK',
        tableDisplay: 'left',
        images: [
            {side: 'PACK', imageSrc: './assets/psu/Thermaltake/thermaltake toughpower gf3 1000w/toughpower gf3 pack.png'}, 
            {side: 'left', imageSrc: './assets/psu/Thermaltake/thermaltake toughpower gf3 1000w/toughpower gf3 left.png'}, 
            {side: 'front', imageSrc: './assets/psu/Thermaltake/thermaltake toughpower gf3 1000w/toughpower gf3 front.png'}, 
            {side: 'right', imageSrc: './assets/psu/Thermaltake/thermaltake toughpower gf3 1000w/toughpower gf3 right.png'}, 
            {side: 'rear', imageSrc: './assets/psu/Thermaltake/thermaltake toughpower gf3 1000w/toughpower gf3 rear.png'}
        ],
        slots: [],
        ports: [
            {type: '24-pin-power'},
            {type: '8-pin-power'},
            {type: '8-pin-power'},
            {type: '8-pin-pcie'},
            {type: '8-pin-pcie'},
            {type: '6-pin-pcie'},
            {type: 'sata-power'},
            {type: 'sata-power'},
            {type: 'sata-power'},
            {type: 'sata-power'},
        ],
        cables: [
            {type: '24-pin-power'},
            {type: '8-pin-power' },
            {type: '8-pin-power'},
            {type: '8-pin-pcie'},
            {type: '8-pin-pcie'},
            {type: '6-pin-pcie'},
        ]
    },

    // PSU [semi modular]
    {        // Corsair CX750M   
        name: 'Corsair CX750M',
        type: 'psu',
        size: 'ATX',
        specs:{
            price: 5250,
            wattage: 750,
            cableModularity: 'semi-modular',
            cables: '24-pin-power,8-pin-power, 8-pin-pcie, 6-pin-pcie, sata-power',
            ports: '8-pin-pcie, 6-pin-pcie, sata-power'
        },
        dimensions: {
            width: 150,
            depth: 200,
            height: 150,
        },
        watts: '750',
        isRotatable: true,
        isAttached: false,
        defaultSource: 'PACK',
        tableDisplay: 'left',
        images: [
            {side: 'PACK', imageSrc: './assets/psu/Corsair/Corsair CX750/Corsair CX750 pack.png'}, 
            {side: 'left', imageSrc: './assets/psu/Corsair/Corsair CX750/Corsair CX750.png'}, 
            {side: 'front', imageSrc: './assets/psu/Corsair/Corsair CX750/Corsair CX750 front.png'}, 
            {side: 'right', imageSrc: './assets/psu/Corsair/Corsair CX750/Corsair CX750.png'}, 
            {side: 'rear', imageSrc: './assets/psu/Corsair/Corsair CX750/Corsair CX750 rear.png'}
        ],
        slots: [],
        ports: [
            {type: '24-pin-power'},
            {type: '8-pin-power'},
            {type: '8-pin-power'},
            {type: '8-pin-pcie'},
            {type: '8-pin-pcie'},
            {type: '6-pin-pcie'},
            {type: 'sata-power'},
            {type: 'sata-power'},
            {type: 'sata-power'},
        ],
        cables: [
            {type: '24-pin-power'},
            {type: '8-pin-power'},
            {type: '8-pin-power'},
            {type: '8-pin-pcie'},
            {type: '8-pin-pcie'},
            {type: '6-pin-pcie'},
        ]
    },

    {        // EVGA 850 Bq, 80+ Bronze 850W, Semi Modular
        name: 'EVGA 850 Bq 80+ Bronze',
        type: 'psu',
        size: 'ATX',
        specs:{
            price: 6692,
            wattage: 850,
            cableModularity: 'semi-modular',
            cables: '24-pin-power,8-pin-power, 8-pin-pcie, 6-pin-pcie, sata-power',
            ports: '8-pin-pcie, 6-pin-pcie, sata-power'
        },
        dimensions: {
            width: 150,
            depth: 200,
            height: 150,
        },
        watts: '850',
        isRotatable: true,
        isAttached: false,
        defaultSource: 'PACK',
        tableDisplay: 'left',
        images: [
            {side: 'PACK', imageSrc: './assets/psu/EVGA/EVGA 850 Bq, 80+ Bronze 850W, Semi Modular/EVGA 850 Bq, 80+ Bronze 850W, Semi Modular pack.png'}, 
            {side: 'left', imageSrc: './assets/psu/EVGA/EVGA 850 Bq, 80+ Bronze 850W, Semi Modular/EVGA 850 Bq, 80+ Bronze 850W, Semi Modular left.png'}, 
            {side: 'front', imageSrc: './assets/psu/EVGA/EVGA 850 Bq, 80+ Bronze 850W, Semi Modular/EVGA 850 Bq, 80+ Bronze 850W, Semi Modular front.png'}, 
            {side: 'right', imageSrc: './assets/psu/EVGA/EVGA 850 Bq, 80+ Bronze 850W, Semi Modular/EVGA 850 Bq, 80+ Bronze 850W, Semi Modular right.png'}, 
            {side: 'rear', imageSrc: './assets/psu/EVGA/EVGA 850 Bq, 80+ Bronze 850W, Semi Modular/EVGA 850 Bq, 80+ Bronze 850W, Semi Modular rear.png'}
        ],
        slots: [],
        ports: [
            {type: '24-pin-power'},
            {type: '8-pin-power'},
            {type: '8-pin-power'},
            {type: '8-pin-pcie'},
            {type: '8-pin-pcie'},
            {type: '8-pin-pcie'},
            {type: '6-pin-pcie'},
            {type: '6-pin-pcie'},
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
        ]
    },
    
    {        // Silverstone et750-hg
        name: 'Silverstone et750-hg',
        type: 'psu',
        size: 'ATX', 
        specs:{
            price: 5776,
            wattage: 750,
            cableModularity: 'semi-modular',
            cables: '24-pin-power,8-pin-power, 8-pin-pcie, 6-pin-pcie, sata-power',
            ports: '8-pin-pcie, 6-pin-pcie, sata-power'
        },
        dimensions: {
            width: 150,
            depth: 200,
            height: 150,
        },
        watts: '750',
        isRotatable: true,
        isAttached: false,
        defaultSource: 'PACK',
        tableDisplay: 'left',
        images: [
            {side: 'PACK', imageSrc: './assets/psu/Silverstone technology co. Ltd/et750-hg/et750-hg-package-2.png'}, 
            {side: 'left', imageSrc: './assets/psu/Silverstone technology co. Ltd/et750-hg/et750-hg-side-left.jpg'}, 
            {side: 'front', imageSrc: './assets/psu/Silverstone technology co. Ltd/et750-hg/et750-hg-front.jpg'}, 
            {side: 'right', imageSrc: './assets/psu/Silverstone technology co. Ltd/et750-hg/et750-hg-side-right.jpg'}, 
            {side: 'rear', imageSrc: './assets/psu/Silverstone technology co. Ltd/et750-hg/et750-hg-back.jpg'}
        ],
        slots: [],
        ports: [
            {type: '24-pin-power'},
            {type: '8-pin-power'},
            {type: '8-pin-power'},
            {type: '8-pin-pcie'},
            {type: '8-pin-pcie'},
            {type: '6-pin-pcie'},
            {type: '6-pin-pcie'},
            {type: 'sata-power'},
            {type: 'sata-power'},
        ],
        cables: [
            {type: '24-pin-power'},
            {type: '8-pin-power' },
            {type: '8-pin-power'},
            {type: '8-pin-pcie'},
            {type: '8-pin-pcie'},
            {type: '6-pin-pcie'},
        ]
    },
    
    {        // thermaltake smart BM3 Bronze 650W
        name: 'Thermaltake smart BM3 Bronze 650W',
        type: 'psu',
        size: 'ATX', 
        specs:{
            price: 4460,
            wattage: 850,
            cableModularity: 'semi-modular',
            cables: '24-pin-power,8-pin-power, 8-pin-pcie, 6-pin-pcie, sata-power',
            ports: '8-pin-pcie, 6-pin-pcie, sata-power'
        },
        dimensions: {
            width: 150,
            depth: 200,
            height: 150,
        },
        watts: '650',
        isRotatable: true,
        isAttached: true,
        defaultSource: 'PACK',
        tableDisplay: 'left',
        images: [
            {side: 'PACK', imageSrc: './assets/psu/Thermaltake/thermaltake smart BM3 Bronze 650W/pack.png'}, 
            {side: 'left', imageSrc: './assets/psu/Thermaltake/thermaltake smart BM3 Bronze 650W/side.jpg'}, 
            {side: 'front', imageSrc: './assets/psu/Thermaltake/thermaltake smart BM3 Bronze 650W/front.png'}, 
            {side: 'right', imageSrc: './assets/psu/Thermaltake/thermaltake smart BM3 Bronze 650W/side.jpg'}, 
            {side: 'rear', imageSrc: './assets/psu/Thermaltake/thermaltake smart BM3 Bronze 650W/rear.jpg'}
        ],
        slots: [],
        ports: [    
            {type: '24-pin-power'},
            {type: '8-pin-power'},
            {type: '8-pin-power'},        
            {type: '8-pin-pcie'},
            {type: '8-pin-pcie'},
            {type: '6-pin-pcie'},
            {type: 'sata-power'},
            {type: 'sata-power'},
            {type: 'sata-power'},
            {type: 'sata-power'},
        ],
        cables: [
            {type: '24-pin-power'},
            {type: '8-pin-power' },
            {type: '8-pin-power'},
            {type: '8-pin-pcie'},
            {type: '8-pin-pcie'},
            {type: '6-pin-pcie'},
        ]
    },
    
    {        // Silverstone da1000-gh
        name: 'Silverstone DA1000-gh',
        type: 'psu',
        size: 'ATX', 
        specs:{
            price: 8980,
            wattage: 1000,
            cableModularity: 'semi-modular',
            cables: '24-pin-power,8-pin-power, 8-pin-pcie, 6-pin-pcie, sata-power',
            ports: '8-pin-pcie, 6-pin-pcie, sata-power'
        },
        dimensions: {
            width: 150,
            depth: 200,
            height: 150,
        },
        watts: '1000',
        isRotatable: true,
        isAttached: false,
        defaultSource: 'PACK',
        tableDisplay: 'left',
        images: [
            {side: 'PACK', imageSrc: './assets/psu/Silverstone technology co. Ltd/da1000-gh/da1000-gh-18.png'}, 
            {side: 'left', imageSrc: './assets/psu/Silverstone technology co. Ltd/da1000-gh/da1000-gh-9.jpg'}, 
            {side: 'front', imageSrc: './assets/psu/Silverstone technology co. Ltd/da1000-gh/da1000-gh-7.png'}, 
            {side: 'right', imageSrc: './assets/psu/Silverstone technology co. Ltd/da1000-gh/da1000-gh-9.jpg'}, 
            {side: 'rear', imageSrc: './assets/psu/Silverstone technology co. Ltd/da1000-gh/da1000-gh-8.jpg'}
        ],
        slots: [],
        ports: [
            {type: '24-pin-power'},
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
            {type: '24-pin-power'},
            {type: '8-pin-power' },
            {type: '8-pin-power'},
            {type: '8-pin-pcie'},
            {type: '8-pin-pcie'},
            {type: '6-pin-pcie'},
        ]
    },

    // PSU[non-modular]
    {        // Thermaltake Smart 500w
        name: 'Thermaltake Smart 500w',
        type: 'psu',
        size: 'ATX', 
        specs:{
            price: 2180,
            wattage: 500,
            cableModularity: 'non-modular',
            cables: '24-pin-power,8-pin-power, 8-pin-pcie, 6-pin-pcie, sata-power',
        },
        dimensions: {
            width: 150,
            depth: 200,
            height: 150,
        },
        watts: '500',
        isRotatable: true,
        isAttached: false,
        defaultSource: 'PACK',
        tableDisplay: 'left',
        images: [
            {side: 'PACK', imageSrc: './assets/psu/Thermaltake/thermaltake smart 500w/thermaltake smart 500w pack.png'}, 
            {side: 'left', imageSrc: './assets/psu/Thermaltake/thermaltake smart 500w/thermaltake smart 500w left.png'}, 
            {side: 'front', imageSrc: './assets/psu/Thermaltake/thermaltake smart 500w/thermaltake smart 500w front.png'}, 
            {side: 'right', imageSrc: './assets/psu/Thermaltake/thermaltake smart 500w/thermaltake smart 500w right.png'}, 
            {side: 'rear', imageSrc: './assets/psu/Thermaltake/thermaltake smart 500w/thermaltake smart 500w rear.png'}
        ],
        slots: [],
        ports: [
            {type: '24-pin-power'},
            {type: '8-pin-power'},
            {type: '8-pin-power'},
            {type: '8-pin-pcie'},
            {type: '8-pin-pcie'},
            {type: '6-pin-pcie'},
            {type: 'sata-power'},
            {type: 'sata-power'},
        ],
        cables: [
            {type: '24-pin-power'},
            {type: '8-pin-power' },
            {type: '8-pin-power'},
            {type: '8-pin-pcie'},
            {type: '8-pin-pcie'},
            {type: '6-pin-pcie'},
        ]
    },

    {        // Thermaltake Toughpower gx2 600w
        name: 'Thermaltake Toughpower GX2 600w',
        type: 'psu',
        size: 'ATX', 
        specs:{
            price: 4180,
            wattage: 600,
            cableModularity: 'non-modular',
            cables: '24-pin-power,8-pin-power, 8-pin-pcie, 6-pin-pcie, sata-power',
        },
        dimensions: {
            width: 150,
            depth: 200,
            height: 150,
        },
        watts: '600',
        isRotatable: true,
        isAttached: false,
        defaultSource: 'PACK',
        tableDisplay: 'left',
        images: [
            {side: 'PACK', imageSrc: './assets/psu/Thermaltake/Thermaltake Toughpower gx2 600w/thermaltake toughpower pack.png'}, 
            {side: 'left', imageSrc: './assets/psu/Thermaltake/Thermaltake Toughpower gx2 600w/thermaltake toughpower left.png'}, 
            {side: 'front', imageSrc: './assets/psu/Thermaltake/Thermaltake Toughpower gx2 600w/thermaltake toughpower front.png'}, 
            {side: 'right', imageSrc: './assets/psu/Thermaltake/Thermaltake Toughpower gx2 600w/thermaltake toughpower right.png'}, 
            {side: 'rear', imageSrc: './assets/psu/Thermaltake/Thermaltake Toughpower gx2 600w/thermaltake toughpower rear.png'}
        ],
        slots: [],
        ports: [
            {type: '24-pin-power'},
            {type: '8-pin-power'},
            {type: '8-pin-power'},
            {type: '8-pin-pcie'},
            {type: '8-pin-pcie'},
            {type: '6-pin-pcie'},
            {type: 'sata-power'},
            {type: 'sata-power'},
        ],
        cables: [
            {type: '24-pin-power'},
            {type: '8-pin-power' },
            {type: '8-pin-power'},
            {type: '8-pin-pcie'},
            {type: '8-pin-pcie'},
            {type: '6-pin-pcie'},
        ]
    },

    {        // Cooler Master MWE Bronze 650 V3 230V non modular
        name: 'Cooler master MWE Bronze 650 V3 230V',
        type: 'psu',
        size: 'ATX', 
        specs:{
            price: 3550,
            wattage: 850,
            cableModularity: 'non-modular',
            cables: '24-pin-power,8-pin-power, 8-pin-pcie, 6-pin-pcie, sata-power',
        },
        dimensions: {
            width: 150,
            depth: 200,
            height: 150,
        },
        watts: '650',
        isRotatable: true,
        isAttached: false,
        defaultSource: 'PACK',
        tableDisplay: 'left',
        images: [
            {side: 'PACK', imageSrc: './assets/psu/Cooler master technology inc/mwe bronze 650 v3 230v/pack.png'}, 
            {side: 'left', imageSrc: './assets/psu/Cooler master technology inc/mwe bronze 650 v3 230v/left.png'}, 
            {side: 'front', imageSrc: './assets/psu/Cooler master technology inc/mwe bronze 650 v3 230v/front.png'}, 
            {side: 'right', imageSrc: './assets/psu/Cooler master technology inc/mwe bronze 650 v3 230v/right.png'}, 
            {side: 'rear', imageSrc: './assets/psu/Cooler master technology inc/mwe bronze 650 v3 230v/rear.png'}
        ],
        slots: [],
        ports: [
            {type: '24-pin-power'},
            {type: '8-pin-power'},
            {type: '8-pin-power'},
            {type: '8-pin-pcie'},
            {type: '8-pin-pcie'},
            {type: '6-pin-pcie'},
            {type: 'sata-power'},
            {type: 'sata-power'},
        ],
        cables: [
            {type: '24-pin-power'},
            {type: '8-pin-power' },
            {type: '8-pin-power'},
            {type: '8-pin-pcie'},
            {type: '8-pin-pcie'},
            {type: '6-pin-pcie'},
        ]
    },

    {        // EVGA 500 GE, 80 Plus Gold 500W non modular
        name: 'EVGA 500 GE, 80 Plus Gold 500W',
        type: 'psu',
        size: 'ATX', 
        specs:{
            price: 3520,
            wattage: 500,
            cableModularity: 'non-modular',
            cables: '24-pin-power,8-pin-power, 8-pin-pcie, 6-pin-pcie, sata-power',
        },
        dimensions: {
            width: 150,
            height: 150,
            depth: 200,
        },
        watts: '500',
        isRotatable: true,
        isAttached: false,
        defaultSource: 'PACK',
        tableDisplay: 'left',
        images: [
            {side: 'PACK', imageSrc: './assets/psu/EVGA/EVGA 500 GE, 80 Plus Gold 500W/EVGA 500 GE, 80 Plus Gold 500W pack.png'}, 
            {side: 'left', imageSrc: './assets/psu/EVGA/EVGA 500 GE, 80 Plus Gold 500W/EVGA 500 GE, 80 Plus Gold 500W left.png'}, 
            {side: 'front', imageSrc: './assets/psu/EVGA/EVGA 500 GE, 80 Plus Gold 500W/EVGA 500 GE, 80 Plus Gold 500W front.png'}, 
            {side: 'right', imageSrc: './assets/psu/EVGA/EVGA 500 GE, 80 Plus Gold 500W/EVGA 500 GE, 80 Plus Gold 500W right.png'}, 
            {side: 'rear', imageSrc: './assets/psu/EVGA/EVGA 500 GE, 80 Plus Gold 500W/EVGA 500 GE, 80 Plus Gold 500W rear.png'}
        ],
        slots: [],
        ports: [
            {type: '24-pin-power'},
            {type: '8-pin-power'},
            {type: '8-pin-power'},
            {type: '8-pin-pcie'},
            {type: '8-pin-pcie'},
            {type: '6-pin-pcie'},
            {type: 'sata-power'},
            {type: 'sata-power'},
        ],
        cables: [
            {type: '24-pin-power'},
            {type: '8-pin-power' },
            {type: '8-pin-power'},
            {type: '8-pin-pcie'},
            {type: '8-pin-pcie'},
            {type: '6-pin-pcie'},
        ]
    },

    {        // Corsair CX750 80 bronze non modular
        name: 'Corsair CX750 80 Plus',
        type: 'psu',
        size: 'ATX', 
        specs:{
            price: 3695,
            wattage: 750,
            cableModularity: 'non-modular',
            cables: '24-pin-power,8-pin-power, 8-pin-pcie, 6-pin-pcie, sata-power',
        },
        dimensions: {
            width: 150,
            depth: 200,
            height: 150,
        },
        watts: '750',
        isRotatable: true,
        isAttached: false,
        defaultSource: 'PACK',
        tableDisplay: 'left',
        images: [
            {side: 'PACK', imageSrc: './assets/psu/Corsair/CORSAIR CX750 80 Plus Bronze Non Modular Low-Noise ATX 750 Watt Power Supply/CORSAIR CX750 pack.png'}, 
            {side: 'left', imageSrc: './assets/psu/Corsair/CORSAIR CX750 80 Plus Bronze Non Modular Low-Noise ATX 750 Watt Power Supply/CORSAIR CX750 left.png'}, 
            {side: 'front', imageSrc: './assets/psu/Corsair/CORSAIR CX750 80 Plus Bronze Non Modular Low-Noise ATX 750 Watt Power Supply/st60f-es230-34-1.png'}, 
            {side: 'right', imageSrc: './assets/psu/Corsair/CORSAIR CX750 80 Plus Bronze Non Modular Low-Noise ATX 750 Watt Power Supply/CORSAIR CX750 right.png'}, 
            {side: 'rear', imageSrc: './assets/psu/Corsair/CORSAIR CX750 80 Plus Bronze Non Modular Low-Noise ATX 750 Watt Power Supply/Corsair CX750 rear.png'}
        ],
        slots: [],
        ports: [
            {type: '24-pin-power'},
            {type: '8-pin-power'},
            {type: '8-pin-power'},
            {type: '8-pin-pcie'},
            {type: '8-pin-pcie'},
            {type: '6-pin-pcie'},
            {type: 'sata-power'},
            {type: 'sata-power'},
        ],
        cables: [
            {type: '24-pin-power'},
            {type: '8-pin-power' },
            {type: '8-pin-power'},
            {type: '8-pin-pcie'},
            {type: '8-pin-pcie'},
            {type: '6-pin-pcie'},
        ]
    },

    {        // Silverstone ST60F-ES230
        name: 'Silverstone 600w ST60F-ES230',
        type: 'psu',
        size: 'ATX', 
        specs:{
            price: 2550,
            wattage: 600,
            cableModularity: 'non-modular',
            cables: '24-pin-power,8-pin-power, 8-pin-pcie, 6-pin-pcie, sata-power',
        },
        dimensions: {
            width: 150,
            depth: 200,
            height: 150,
        },
        watts: '600',
        isRotatable: true,
        isAttached: false,
        defaultSource: 'PACK',
        tableDisplay: 'left',
        images: [
            {side: 'PACK', imageSrc: './assets/psu/Silverstone technology co. Ltd/st60f-es230/st60f-es230-package-2.png'}, 
            {side: 'left', imageSrc: './assets/psu/Silverstone technology co. Ltd/st60f-es230/st60f-es230-side.jpg'}, 
            {side: 'front', imageSrc: './assets/psu/Silverstone technology co. Ltd/st60f-es230/st60f-es230-34-1.png'}, 
            {side: 'right', imageSrc: './assets/psu/Silverstone technology co. Ltd/st60f-es230/st60f-es230-side-1.jpg'}, 
            {side: 'rear', imageSrc: './assets/psu/Silverstone technology co. Ltd/st60f-es230/st60f-es230-back.jpg'}
        ],
        slots: [],
        ports: [
            {type: '24-pin-power'},
            {type: '8-pin-power'},
            {type: '8-pin-power'},
            {type: '8-pin-pcie'},
            {type: '8-pin-pcie'},
            {type: '6-pin-pcie'},
            {type: 'sata-power'},
            {type: 'sata-power'},
        ],
        cables: [
            {type: '24-pin-power'},
            {type: '8-pin-power' },
            {type: '8-pin-power'},
            {type: '8-pin-pcie'},
            {type: '8-pin-pcie'},
            {type: '6-pin-pcie'},
        ]
    },

    //Storage hdd
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
    { //Toshiba X300
        name: 'Toshiba X300',
        type: 'storage',
        size: 'hdd',
        watts: '10',
        specs:{ 
            price: 3500,
            bootable: true,
            rpm: '7200',
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
            {side: 'PACK', imageSrc: './assets/storage/hdd/Toshiba p300.png'},  
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
    { //Toshiba X300 PRO
        name: 'Toshiba X300 PRO',
        type: 'storage',
        size: 'hdd',
        watts: '10',
        specs:{ 
            price: 8254,
            bootable: true,
            rpm: '7200',
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
            {side: 'PACK', imageSrc: './assets/storage/hdd/toshiba x300 pro.png'},  
            {side: 'left', imageSrc: './assets/storage/defaulthdd.png'},  
            {side: 'right', imageSrc: './assets/storage/defaulthdd.png'},   
        ],
        slots: [],
        ports: [
            {type: 'sata-power'},
            {type: 'sata'}
        ],
        cables: [
            {type: 'sata-data'}
        ]
    },
    { //Toshiba P300
        name: 'Toshiba P300',
        type: 'storage',
        size: 'hdd',
        watts: '10',
        specs:{ 
            price: 5900,
            bootable: true,
            rpm: '7200',
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
            {side: 'PACK', imageSrc: './assets/storage/hdd/toshiba x300.png'},  
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
    { //Western Digital Gaming Black
        name: 'Western Digital Gaming Black',
        type: 'storage',
        size: 'hdd',
        watts: '10',
        specs:{ 
            price: 4650,
            bootable: true,
            rpm: '7200',
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
            {side: 'PACK', imageSrc: './assets/storage/hdd/wdc black.png'},  
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
    //Storage SSD SATA
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
    { //Samsung EVO SSD
    name: 'Samsung EVO SSD',
    type: 'storage',
    size: 'ssd',
    watts: '4',
    specs:{ 
        price: 5750,
        bootable: true,
        formFactor: '2.5"',
        interface: 'SATA',
        read: '560MB/s',
        write: '530MB/s',
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
        {side: 'PACK', imageSrc: './assets/storage/ssd/samsung ssd - Copy.png'},  
        {side: 'left', imageSrc: './assets/storage/ssd/samsung ssd.png'},  
        {side: 'right', imageSrc: './assets/storage/ssd/samsung ssd.png'},  
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
    { //Sandisk Plus SSD
    name: 'Sandisk Plus SSD',
    type: 'storage',
    size: 'ssd',
    watts: '4',
    specs:{ 
        price: 2950,
        bootable: true,
        formFactor: '2.5"',
        interface: 'SATA',
        read: '530MB/s',
        write: '400MB/s',
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
        {side: 'PACK', imageSrc: './assets/storage/ssd/sandisk ssd plus - Copy.png'},  
        {side: 'left', imageSrc: './assets/storage/ssd/sandisk ssd plus.png'},  
        {side: 'right', imageSrc: './assets/storage/ssd/sandisk ssd plus.png'},  
    ],
    slots: [],
    ports: [
        {type: 'sata'}
    ],
    cables: [
        {type: 'sata-data'}
    ]
    },     
    { //Sandisk Ultra SSD
    name: 'Sandisk Ultra SSD',
    type: 'storage',
    size: 'ssd',
    watts: '4',
    specs:{ 
        price: 3898,
        bootable: true,
        formFactor: '2.5"',
        interface: 'SATA',
        read: '555MB/s',
        write: '440MB/s',
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
        {side: 'PACK', imageSrc: './assets/storage/ssd/sandisk - Copy.png'},  
        {side: 'left', imageSrc: './assets/storage/ssd/sandisk.png'},  
        {side: 'right', imageSrc: './assets/storage/ssd/sandisk.png'},  
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
    // Storage m.2 
    { // Samsung 970 EVO Plus 
        name: 'Samsung 970 EVO Plus',
        type: 'storage',
        size: 'm.2',
        compatibility: ['m-key'],
        dimensions: {
            width: 150,
            height: 150,
        },
        osInstalled: false,
        isRotatable: false,
        isAttached: false,
        defaultSource: 'pack',
        tableDisplay: 'pack',
        specs: { 
            price: 5815,
            bootable: true,
            readSpeed: '3500MB/s',
            writeSpeed: '3300MB/s',
            nandType: 'V-NAND',
            controller: 'Samsung Phoenix',        
            formFactor: '2280',
            interface: 'PCIe 3.0 x4',
            keyType: 'M',
        },
        images: [
            { side: 'pack', imageSrc: './assets/storage/m.2/Samsung_970_EVO_Plus_NVMe_SSD.png' },
            { side: 'left', imageSrc: './assets/storage/m.2/Samsung 970 EVO Plus NVMe SSD attached.png' },
        ],
        cables: [],
        ports: [],
    },
    { // Western Digital Black SN850X 
        name: 'Western Digital Black SN850X',
        type: 'storage',
        size: 'm.2',
        compatibility: ['b-key'],
        dimensions: {
            width: 150,
            height: 150,
        },
        osInstalled: false,
        isRotatable: false,
        isAttached: false,
        defaultSource: 'pack',
        tableDisplay: 'pack',
        specs: { 
            price: 8363,
            bootable: true,
            readSpeed: '7300MB/s',
            writeSpeed: '6300MB/s',
            nandType: '3D NAND',
            controller: 'WD Black G2',
            formFactor: '2280',
            interface: 'PCIe 4.0 x4',
            keyType: 'M',
        },
        images: [
            { side: 'pack', imageSrc: './assets/storage/m.2/Western_Digital_Black_SN850X_M.2_SSD.png' },
            { side: 'left', imageSrc: './assets/storage/m.2/Western Digital Black SN850X M.2 SSD attached.png' },
        ],
        cables: [],
        ports: [],
    },
    { // Kingston KC3000 
        name: 'Kingston KC3000',
        type: 'storage',
        size: 'm.2',
        compatibility: ['m-key'],
        dimensions: {
            width: 150,
            height: 150,
        },
        osInstalled: false,
        isRotatable: false,
        isAttached: false,
        defaultSource: 'pack',
        tableDisplay: 'pack',
        specs: { 
            price: 5295,
            bootable: true,
            readSpeed: '7000MB/s',
            writeSpeed: '7000MB/s',
            nandType: '3D TLC NAND',
            controller: 'Phison E18',
            formFactor: '2280',
            interface: 'PCIe 4.0 x4',
            keyType: 'M',
        },
        images: [
            { side: 'pack', imageSrc: './assets/storage/m.2/Kingston KC3000.png' },
            { side: 'left', imageSrc: './assets/storage/m.2/Kingston KC3000 attached.png' },
        ],
        cables: [],
        ports: [],
    },
    { // Crucial P3
        name: 'Crucial P3',
        type: 'storage',
        size: 'm.2',
        compatibility: ['b-key'],
        dimensions: {
            width: 150,
            height: 150,
        },
        osInstalled: false,
        isRotatable: false,
        isAttached: false,
        defaultSource: 'pack',
        tableDisplay: 'pack',
        specs: { 
            price: 3791,
            bootable: true,
            readSpeed: '3500MB/s',
            writeSpeed: '3000MB/s',
            nandType: 'Micron Advanced 3D NAND',
            controller: 'Phison E21T',
            formFactor: '2280',
            interface: 'PCIe 4.0 x4',
            keyType: 'M',
        },
        images: [
            { side: 'pack', imageSrc: './assets/storage/m.2/Crucial P3.png' },
            { side: 'left', imageSrc: './assets/storage/m.2/Crucial P3 attached.png' },
        ],
        cables: [],
        ports: [],
    },
    { // Seagate FireCuda 520
        name: 'Seagate FireCuda 520',
        type: 'storage',
        size: 'm.2',
        compatibility: ['m-key'], 
        dimensions: {
            width: 150,
            height: 150,
        },
        osInstalled: false,
        isRotatable: false,
        isAttached: false,
        defaultSource: 'pack',
        tableDisplay: 'pack',
        specs: { 
            price: 5575,
            bootable: true,
            readSpeed: '5000MB/s',
            writeSpeed: '4400MB/s',
            nandType: '3D TLC NAND',
            controller: 'Phison PS5016-E16',
            formFactor: '2280',
            interface: 'PCIe 4.0 x4',
            keyType: 'M',
        },
        images: [
            { side: 'pack', imageSrc: './assets/storage/m.2/Seagate FireCuda 520.png' },
            { side: 'left', imageSrc: './assets/storage/m.2/Seagate FireCuda 520 attached.png' },
        ],
        cables: [],
        ports: [],
    },
    // Cooling
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
    { //AMD wraith Spire
    name: 'AMD wraith Spire',
    type: 'cooling',
    size: 'amd',
    specs:{
        price: 1200,
        category: 'cpu',
        design: 'Tower Style with a copper base',
        fan: '120mm',
        rpm: '800-1900',
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
        {side: 'pack', imageSrc: './assets/cooling/amd wraith spire pack.png'},  
        {side: 'left', imageSrc: './assets/cooling/amd wraith spire.png'}
    ],
    slots: [],
    ports: [
        {type: 'cooling'}
    ],
    cables: [
        {type: '3-pin-cooling'}
    ]
    },  
    { //Arctic Freezer 36
    name: 'Arctic Freezer 36',
    type: 'cooling',
    size: 'amd',
    specs:{
        price: 2500,
        category: 'cpu',
        design: 'Dual-Tower design with a direct-touch copper base',
        fan: '120mm',
        rpm: '200-2000',
        TDP: '150W',
        mount: 'Compatible with Intel and AMD sockets',
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
        {side: 'pack', imageSrc: './assets/cooling/arctic freezer 36 pack.png'},  
        {side: 'left', imageSrc: './assets/cooling/arctic freezer 36.png'}
    ],
    slots: [],
    ports: [
        {type: 'cooling'}
    ],
    cables: [
        {type: '3-pin-cooling'}
    ]
    },  
    { //be quiet pure rock 2
    name: 'Be Quiet Pure Rock 2',
    type: 'cooling',
    size: ['amd','intel'],
    specs:{
        price: 2200, 
        category: 'cpu',
        design: 'Compact Tower Style with a copper base',
        fan: '120mm',
        rpm: '650-1500',
        TDP: '150W',
        mount: 'Compatible with Intel and AMD sockets',
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
        {side: 'pack', imageSrc: './assets/cooling/be quiet pure rock.png'},  
        {side: 'left', imageSrc: './assets/cooling/be quiet pure rock fan.png'}
    ],
    slots: [],
    ports: [
        {type: 'cooling'}
    ],
    cables: [
            {type: '3-pin-cooling'}
        ]
    },  
    { //be quiet dark rock 4    
    name: 'be quiet dark rock 4',
    type: 'cooling',
    size: 'amd',
    specs:{
        price: 3300,
        category: 'cpu',
        design: 'Dual-Tower Style with 7 copper heat pipes',
        fan: '135mm',
        rpm: '600-1400',
        TDP: '150W',
        mount: 'Compatible with Intel and AMD sockets',
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
        {side: 'pack', imageSrc: './assets/cooling/be quiet dark rock 4.png'},  
        {side: 'left', imageSrc: './assets/cooling/be quiet pure rock fan.png'}
    ],
    slots: [],
    ports: [
        {type: 'cooling'}
    ],
    cables: [
            {type: '3-pin-cooling'}
        ]
    },  
    { //cooler master 212 hyper
    name: 'Cooler Master 212 Hyper',
    type: 'cooling',
    size: 'amd',
    specs:{
        price: 1300,
        category: 'cpu',
        design: 'Tower Style with 4 copper heat pipes',
        fan: '120mm',
        rpm: '650-2050',
        TDP: '150W',
        mount: 'Compatible with Intel and AMD sockets',
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
        {side: 'pack', imageSrc: './assets/cooling/cooler master 212 hyper pack.png'},  
        {side: 'left', imageSrc: './assets/cooling/cooler master 212 hyper.png'}
    ],
    slots: [],
    ports: [
        {type: 'cooling'}
    ],
    cables: [
            {type: '3-pin-cooling'}
        ]
    },  
    { //DeepCool AK500 Digital
    name: 'DeepCool AK500 Digital',
    type: 'cooling',    
    size: 'amd',
    specs:{
        price: 3750,
        category: 'cpu',
        design: 'Tower Style with digital temperature display',
        fan: '120mm',
        rpm: '500-1850',
        TDP: '150W',
        mount: 'Compatible with Intel and AMD sockets',
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
        {side: 'pack', imageSrc: './assets/cooling/deepcool ak500 digital pack.png'},  
        {side: 'left', imageSrc: './assets/cooling/deepcool ak500 digital fan.png'}
    ],
    slots: [],
    ports: [
        {type: 'cooling'}
    ],
    cables: [
            {type: '3-pin-cooling'}
        ]
    },  
        
     { //Intel Laminar RH1 cooling fan
     name: 'Intel Laminar RH1 cooling fan',
     type: 'cooling',
     size: 'intel',
     specs:{
        price: 2200,
        category: 'cpu',
        design: 'Tower Style with a copper base',
        size: '103x103mm',
        rpm: '1000-3000',
        TDP: '150W',
        mount: 'Intel',
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
         {side: 'pack', imageSrc: './assets/cooling/intel laminar pack.png'},  
         {side: 'left', imageSrc: './assets/cooling/intel laminar rh1.png'},  
     ],
     slots: [],
     ports: [
        {type: 'cooling'}
    ],
    cables: [
            {type: '3-pin-cooling'}
        ]
    },
     { //Intel Laminar RM1 cooling fan
    name: 'Intel Laminar RM1 cooling fan',
    type: 'cooling',
    size: 'intel',
    specs:{
        price: 1300,
        category: 'cpu',
        design: 'Tower Style with a copper base',
        size: '100x100mm',
        rpm: '600-3150',
        TDP: '150W',
        mount: 'Intel',
    },
    watts: '150',
    dimensions: {
        width: 200,
        height: 200,
        depth: 200,    },
    isRotatable: false,
    isAttached: false,
    defaultSource: 'PACK',
    tableDisplay: 'PACK',
    images: [
        {side: 'PACK', imageSrc: './assets/cooling/intel laminar pack.png'},  
        {side: 'left', imageSrc: './assets/cooling/intel laminar rm1.png'},  
    ],
    slots: [],
    ports: [
        {type: 'cooling'}
    ],
    cables: [
            {type: '3-pin-cooling'}
        ]
    },
        // RAM DDR4
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
     { //Corsair Dominator Platinum
    name: 'Corsair Dominator Platinum DDR4',
    type: 'ram',
    size: 'ddr4',
    watts: '3',
    specs:{
        price: 9150,
        color: 'RGB',
        type: 'DDR4',
        size: 'DIMM',
        watts: '3',
    },
    dimensions: {
        width: 133,
        height: 133,
        depth: 200,
    },
    isRotatable: false,
    isAttached: false,
    defaultSource: 'PACK',
    tableDisplay: 'PACK',
    images: [
        {side: 'PACK', imageSrc: './assets/memory/corsair dominator platinum pc4.png'},  
        {side: 'left', imageSrc: './assets/memory/corsair dominator platinum pc4 attached.png'},  
    ],
    },
    { //G.Skill Ripjaws V
    name: 'G.Skill Ripjaws V DDR4',
    type: 'ram',
    size: 'ddr4',
    watts: '3',
    specs:{
        price: 2200,
        heatsink: 'Aluminum',
        color: 'RGB',
        type: 'DDR4',
        size: 'DIMM',
        watts: '3',
    },
    dimensions: {
        width: 133,
        height: 133,
        depth: 200,
    },
    isRotatable: false,
    isAttached: false,
    defaultSource: 'PACK',
    tableDisplay: 'PACK',
    images: [
        {side: 'PACK', imageSrc: './assets/memory/gskill ripjaws v pc4.png'},
        {side: 'left', imageSrc: './assets/memory/gskill ripjaws v pc4 attached.png'},  
    ],
    },
    { //Teamgroup Tforce Vulcan Z
    name: 'Teamgroup Tforce Vulcan Z DDR4',
    type: 'ram',
    size: 'ddr4',
    watts: '3',
    specs:{
        price: 2150,
        heatsink: 'Aluminum',
        type: 'DDR4',
        size: 'DIMM',
        watts: '3',
    },
    dimensions: {
        width: 133,
        height: 133,
        depth: 200,
    },
    isRotatable: false,
    isAttached: false,
    defaultSource: 'PACK',
    tableDisplay: 'PACK',
    images: [
        {side: 'PACK', imageSrc: './assets/memory/Teamgroup Tforce Vulcan Z ddr4.png'},
        {side: 'left', imageSrc: './assets/memory/Teamgroup Tforce Vulcan Z ddr4 attached.png'},  
    ],
    },
    { //Teamgroup Tforce TUF
    name: 'Teamgroup Tforce TUF DDR4',
    type: 'ram',
    size: 'ddr4',
    watts: '3',
    specs:{
        price: 3230,
        color: 'RGB',
        type: 'DDR4',
        size: 'DIMM',
        watts: '3',
    },
    dimensions: {
        width: 133,
        height: 133,
        depth: 200,
    },
    isRotatable: false,
    isAttached: false,
    defaultSource: 'PACK',
    tableDisplay: 'PACK',
    images: [
        {side: 'PACK', imageSrc: './assets/memory/tforce delta tuf pc4.png'},  
        {side: 'left', imageSrc: './assets/memory/Teamgroup T force pc5 attached.png'},  
    ],
    },
    { //Crucial Pro DDR4
    name: 'Crucial Pro DDR4',
    type: 'ram',
    size: 'ddr4',
    watts: '3',
    specs:{
        price: 2050,
        heatsink: 'Aluminum',        
        type: 'DDR4',
        size: 'DIMM',
        watts: '3',
    },
    dimensions: {
        width: 133,
        height: 133,
        depth: 200,
    },
    isRotatable: false,
    isAttached: false,
    defaultSource: 'PACK',
    tableDisplay: 'PACK',
    images: [
        {side: 'PACK', imageSrc: './assets/memory/crucial pro ddr4.png'},
        {side: 'left', imageSrc: './assets/memory/crucial pro ddr4 attached.png'},  
    ],
    },
    { //Corsair Vengeance Pro DDR4
    name: 'Corsair Vengeance Pro DDR4',
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
        depth: 200,
    },
    isRotatable: false,
    isAttached: false,
    defaultSource: 'PACK',
    tableDisplay: 'PACK',
    images: [
        {side: 'PACK', imageSrc: './assets/memory/corsair vengeance pro ddr4.png'},
        {side: 'left', imageSrc: './assets/memory/corsair vengeance pro attached.png'},  
    ],
    },
    { //Teamgroup Tforce DDR4
    name: 'Teamgroup Tforce DDR4',
    type: 'ram',
    size: 'ddr4',
    watts: '3',
    specs:{
        price: 2695,
        color: 'RGB',
        type: 'DDR4',
        size: 'DIMM',
        watts: '3',
    },
    dimensions: {
        width: 133,
        height: 133,
        depth: 200,
    },
    isRotatable: false,
    isAttached: false,
    defaultSource: 'pack',
    tableDisplay: 'pack',
    images: [
        {side: 'pack', imageSrc: './assets/memory/Teamgroup Tforce pc5 pack.png'},
        {side: 'left', imageSrc: './assets/memory/Teamgroup T force pc5 attached.png'},  
    ],
    },
 
    //  RAM DDR5
    { //Dominator Titanium
      name: 'Dominator Titanium DDR5',
      type: 'ram',
      size: 'ddr5',
      watts: '3',
      specs:{
        price: 10195,
        color: 'RGB',
        type: 'DDR5',
        size: 'DIMM',
        watts: '3',
      },
      dimensions: {
        width: 133,
        height: 133,
        depth: 200,
      },
      isRotatable: false,
      isAttached: false,
      defaultSource: 'pack',
      tableDisplay: 'pack',
      images: [
        {side: 'pack', imageSrc: './assets/memory/Dominator Tianium DDR5.png'},
        {side: 'left', imageSrc: './assets/memory/Dominator Tianium DDR5 - attached.png'},  
      ],
    },
    { //G.Skill Trident z5
    name: 'G.Skill Trident z5 DDR5',
    type: 'ram',
    size: 'ddr5',
    watts: '3',
    specs:{
        price: 7595,
        color: 'RGB',
        type: 'DDR5',
        size: 'DIMM',
        watts: '3',
    },
    dimensions: {
        width: 133,
        height: 133,
        depth: 200,
    },
    isRotatable: false,
    isAttached: false,
    defaultSource: 'pack',
    tableDisplay: 'pack',
    images: [
        {side: 'pack', imageSrc: './assets/memory/gskill trident z5 pc5.png'},  
        {side: 'left', imageSrc: './assets/memory/gskill trident z5 pc5 attached.png'},  
    ],
    },
    { //Kingston Fury Renegade
    name: 'Kingston Fury Renegade DDR5',
    type: 'ram',
    size: 'ddr5',
    watts: '3',
    specs:{
        price: 5750,
        heatsink: 'Aluminum',
        type: 'DDR5',
        size: 'DIMM',
        watts: '3',
    },
    dimensions: {
        width: 133,
        height: 133,
        depth: 200,
    },
    isRotatable: false,
    isAttached: false,
    defaultSource: 'pack',
    tableDisplay: 'pack',
    images: [
        {side: 'pack', imageSrc: './assets/memory/kingston fury renegade pc5.png'},  
        {side: 'left', imageSrc: './assets/memory/kingston fury beast pc5 attached.png'},  
    ],
    },
    { //Teamgroup Tforce 
    name: 'Teamgroup Tforce DDR5',
    type: 'ram',
    size: 'ddr5',
    watts: '3',
    specs:{
        price: 3290,
        color: 'RGB',
        type: 'DDR5',
        size: 'DIMM',
        watts: '3',
    },
    dimensions: {
        width: 133,
        height: 133,
        depth: 200,
    },
    isRotatable: false,
    isAttached: false,
    defaultSource: 'pack',
    tableDisplay: 'pack',
    images: [
        {side: 'pack', imageSrc: './assets/memory/Teamgroup Tforce pc5 pack.png'},  
        {side: 'left', imageSrc: './assets/memory/Teamgroup T force pc5 attached.png'},  
    ],
    },
    { //Crucial Ballistix
    name: 'Crucial Ballistix DDR5',
    type: 'ram',
    size: 'ddr5',
    watts: '3',
    specs:{
        price: 2500,
        heatsink: 'Aluminum',
        type: 'DDR5',
        size: 'DIMM',
        watts: '3',
    },
    dimensions: {
        width: 133,
        height: 133,
        depth: 200,
    },
    isRotatable: false,
    isAttached: false,
    defaultSource: 'pack',
    tableDisplay: 'pack',
    images: [
        {side: 'pack', imageSrc: './assets/memory/crucial ballistix.png'},  
        {side: 'left', imageSrc: './assets/memory/crucial ballistix attached.png'},  
    ],
    },
    { //Crucial Ballistix RGB 
    name: 'Crucial Ballistix RGB DDR5',
    type: 'ram',
    size: 'ddr5',
    watts: '3',
    specs:{
        price: 3950,
        color: 'RGB',
        type: 'DDR5',
        size: 'DIMM',
        watts: '3',
    },
    dimensions: {
        width: 133,
        height: 133,
        depth: 200,
    },
    isRotatable: false,
    isAttached: false,
    defaultSource: 'pack',
    tableDisplay: 'pack',
    images: [
        {side: 'pack', imageSrc: './assets/memory/crucial ballistix rgb.png'},  
        {side: 'left', imageSrc: './assets/memory/crucial ballistix rgb attached.png'},  
    ],
    },
    { //G.Skill Trident Z5 Silver 
    name: 'G.Skill Trident Z5 Silver DDR5',
    type: 'ram',
    size: 'ddr5',
    watts: '3',
    specs:{
        price: 7950,
        color: 'RGB',
        type: 'DDR5',
        size: 'DIMM',
        watts: '3',
    },
    dimensions: {
        width: 133,
        height: 133,
        depth: 200,
    },
    isRotatable: false,
    isAttached: false,
    defaultSource: 'pack',
    tableDisplay: 'pack',
    images: [
        {side: 'pack', imageSrc: './assets/memory/gskill trident z5 silver.png'},  
        {side: 'left', imageSrc: './assets/memory/gskill trident z5 silver attached.png'},  
    ],
    },
    { //Corsair Vengeance
    name: 'Corsair Vengeance DDR5',
    type: 'ram',
    size: 'ddr5',
    watts: '3',
    specs:{
        price: 3995,
        heatsink: 'Aluminum',
        type: 'DDR5',
        size: 'DIMM',
        watts: '3',
    },
    dimensions: {
        width: 133,
        height: 133,
        depth: 200,
    },
    isRotatable: false,
    isAttached: false,
    defaultSource: 'pack',
    tableDisplay: 'pack',
    images: [
        {side: 'pack', imageSrc: './assets/memory/corsair vengeance.png'},  
        {side: 'left', imageSrc: './assets/memory/corsair vengeance attached.png'},  
    ],
    },
 
     //GPU [gpu file is for general left side img assets] [gpu.1 is for pack side img assets]
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

    {        // gigabyte nvidia geforce rtx 4060 windforce 8gb OC
    name: 'Gigabyte NVIDIA GeForce rtx 4060 Windforce 8gb OC',
    type: 'gpu',
    size: 'ATX',
    specs: {
        price: 18950,
        portCount: 1,
        portType: '8-pin-pcie',
        architecture: 'NVIDIA Ada Lovelace',
        baseClock: '1.83 GHz',
        boostClock: '2.4 GHz',
        memory: '8GB GDDR6',
    },
    watts: '110',
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
        {side: 'pack', imageSrc: './assets/gpu.1/gigabyte nvidia geforce rtx 4060 windforce 8gb OC.png'},
        {side: 'left', imageSrc: './assets/gpu/gigabyte nvidia geforce rtx 4060 windforce 8gb OC.png'}, 
        {side: 'rear', imageSrc: './assets/gpu/rear.png'}, 
    ],
    slots: [],
    ports: [
        {
            type: '8-pin-pcie',
            style: 'single'
        }
    ]  
    },

    {        // Gigabyte Nvidia GeForce RTX 3060
    name: 'Gigabyte Nvidia GeForce RTX 3060',
    type: 'gpu',
    size: 'ATX', 
    specs: {
        price: 18895,
        portCount: 1,
        portType: '8-pin-pcie',
        architecture: 'NVIDIA Ampere',
        baseClock: '1.32 GHz',
        boostClock: '1.78 GHz',
        memory: '12GB GDDR6',
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
        {side: 'pack', imageSrc: './assets/gpu.1/nvidia geforce rtx 3060.png'},
        {side: 'rear', imageSrc: './assets/gpu/rear1.png'}, 
        {side: 'left', imageSrc: './assets/gpu/nvidia geforce rtx 3060.png'}, 
    ],
    slots: [],
    ports: [
        {
            type: '8-pin-pcie',
            style: 'single'
        }
    ]  
    },

    {        // Gigabyte Nvidia GeForce RTX 4070 WindForce OC
    name: 'Gigabyte Nvidia GeForce RTX 4070 WindForce OC',
    type: 'gpu',
    size: 'ATX',
    specs: {
        price: 36950,
        portCount: 1,
        portType: '8-pin-pcie',
        architecture: 'NVIDIA Ada Lovelace',
        baseClock: '1.92 GHz',
        boostClock: '2.5 GHz',
        memory: '12GB GDDR6',
    },
    watts: '200',
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
        {side: 'pack', imageSrc: './assets/gpu.1/nvidia geforce rtx 4070 windforce oc.png'},
        {side: 'rear', imageSrc: './assets/gpu/rear1.png'}, 
        {side: 'left', imageSrc: './assets/gpu/nvidia geforce rtx 4070 windforce oc.png'}, 
    ],
    slots: [],
    ports: [
        {
            type: '8-pin-pcie',
            style: 'single'
        }
    ]  
    },

    {        // PNY Nvidia GeForce RTX 4090 12vhpwr
    name: 'PNY Nvidia GeForce RTX 4090',
    type: 'gpu',
    size: 'ATX',
    specs: {
        price: 89178,
        portCount: 1,
        portType: '12vhpwr',
        architecture: 'NVIDIA Ada Lovelace',
        baseClock: '2.23 GHz',
        boostClock: '2.52 GHz',
        memory: '24GB GDDR6X',
    },
    watts: '450',
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
        {side: 'pack', imageSrc: './assets/gpu.1/nvidia geforce rtx 4090.png'},
        {side: 'rear', imageSrc: './assets/gpu/rear1.png'}, 
        {side: 'left', imageSrc: './assets/gpu/nvidia geforce rtx 4090.png'}, 
    ],
    slots: [],
    ports: [
        {
            type: '12vhpwr',
            style: 'single'
        }
    ]  
    },

    {        // Gigabyte Nvidia GeForce RTX Eagle 3060
    name: 'Gigabyte Nvidia GeForce RTX Eagle 3060',
    type: 'gpu',
    size: 'ATX',
    specs: {
        price: 18950,
        portCount: 1,
        portType: '8-pin-pcie',
        architecture: 'NVIDIA Ampere',
        baseClock: '1.32 GHz',
        boostClock: '1.78 GHz',
        memory: '12GB GDDR6',
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
        {side: 'pack', imageSrc: './assets/gpu.1/nvidia geforce rtx eagle 3060.png'},
        {side: 'rear', imageSrc: './assets/gpu/rear1.png'}, 
        {side: 'left', imageSrc: './assets/gpu/nvidia geforce rtx eagle 3060.png'}, 
    ],
    slots: [],
    ports: [
        {
            type: '8-pin-pcie',
            style: 'single'
        }
    ]  
    },

    {        // Gigabyte Nvidia GeForce GTX 1650
    name: 'Gigabyte Nvidia GeForce GTX 1650',
    type: 'gpu',
    size: 'ATX',
    specs: {
        price: 8800,
        portCount: 1,
        portType: '8-pin-pcie',
        architecture: 'NVIDIA Turing',
        baseClock: '1.48 GHz',
        boostClock: '1.67 GHz',
        memory: '4GB GDDR6',
    },
    watts: '75',
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
        {side: 'pack', imageSrc: './assets/gpu.1/nvidia geforce gtx 1650.png'},
        {side: 'rear', imageSrc: './assets/gpu/rear1.png'}, 
        {side: 'left', imageSrc: './assets/gpu/nvidia geforce gtx 1650.png'}, 
    ],
    slots: [],
    ports: [
        {
            type: '8-pin-pcie',
            style: 'single'
        }
    ]  
    },

    {        // Gigabyte Radeon RX7600
    name: 'Gigabyte Radeon RX 7600',
    type: 'gpu',
    size: 'ATX',
    specs: {
        price: 18495,
        portCount: 1,
        portType: '8-pin-pcie',
        architecture: 'AMD RDNA 3',
        baseClock: '2.2 GHz',
        boostClock: '2.5 GHz',
        memory: '8GB GDDR6',
    },
    watts: '165',
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
        {side: 'pack', imageSrc: './assets/gpu.1/radeon rx7600.png'},
        {side: 'rear', imageSrc: './assets/gpu/rear1.png'}, 
        {side: 'left', imageSrc: './assets/gpu/radeon rx7600.png'}, 
    ],
    slots: [],
    ports: [
        {
            type: '8-pin-pcie',
            style: 'single'
        }
    ]  
    },

    {        // Gigabyte Nvidia GeForce RTX 4090 Gaming OC
    name: 'Gigabyte Nvidia GeForce RTX 4090 Gaming OC',
    type: 'gpu',
    size: 'ATX',
    specs: {
        price: 95313,
        portCount: 1,
        portType: '8-pin-pcie',
        architecture: 'NVIDIA Ada Lovelace',
        baseClock: '2.23 GHz',
        boostClock: '2.52 GHz',
        memory: '24GB GDDR6X',
    },
    watts: '450',
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
        {side: 'pack', imageSrc: './assets/gpu.1/nvidia geforce rtx 4090 gaming oc.png'},
        {side: 'rear', imageSrc: './assets/gpu/rear1.png'}, 
        {side: 'left', imageSrc: './assets/gpu/nvidia geforce rtx 4090 gaming oc.png'}, 
    ],
    slots: [],
    ports: [
        {
            type: '8-pin-pcie',
            style: 'single'
        }
    ]  
    },

    {        // Aero Nvidia GeForce RTX 4060 OC
    name: 'Aero Nvidia GeForce RTX 4060 OC',
    type: 'gpu',
    size: 'ATX',
    specs: {
        price: 20650,
        portCount: 1,
        portType: '8-pin-pcie',
        architecture: 'NVIDIA Ada Lovelace',
        baseClock: '1.83 GHz',
        boostClock: '2.4 GHz',
        memory: '8GB GDDR6',
    },
    watts: '125',
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
        {side: 'pack', imageSrc: './assets/gpu.1/aero nvidia geforce rtx 4060 oc.png'},
        {side: 'rear', imageSrc: './assets/gpu/rear1.png'}, 
        {side: 'left', imageSrc: './assets/gpu/aero nvidia geforce rtx 4060 oc.png'}, 
    ],
    slots: [],
    ports: [
        {
            type: '8-pin-pcie',
            style: 'single'
        }
    ]  
    },

    {        // Zotac Nvidia GeForce GTX 1660 Super
    name: 'Zotac Nvidia GeForce GTX 1660 Super',
    type: 'gpu',
    size: 'ATX',
    specs: {
        price: 14500,
        portCount: 1,
        portType: '8-pin-pcie',
        architecture: 'NVIDIA Turing',
        baseClock: '1.53 GHz',
        boostClock: '1.79 GHz',
        memory: '6GB GDDR6',
    },
    watts: '125',
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
        {side: 'pack', imageSrc: './assets/gpu.1/nvidia geforce gtx 1660 super.png'},
        {side: 'rear', imageSrc: './assets/gpu/rear1.png'}, 
        {side: 'left', imageSrc: './assets/gpu/nvidia geforce gtx 1660 super.png'}, 
    ],
    slots: [],
    ports: [
        {
            type: '8-pin-pcie',
            style: 'single'
        }
    ]  
    },

    {        // MAXSUN Nvidia GeForce RTX 4060
    name: 'MAXSUN Nvidia GeForce RTX 4060',
    type: 'gpu',
    size: 'ATX',
    specs: {
        price: 32291,
        portCount: 1,
        portType: '8-pin-pcie',
        architecture: 'NVIDIA Ada Lovelace',
        baseClock: '1.83 GHz',
        boostClock: '2.4 GHz',
        memory: '8GB GDDR6',
    },
    watts: '115',
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
        {side: 'pack', imageSrc: './assets/gpu.1/nvidia geforce rtx 4060.png'},
        {side: 'rear', imageSrc: './assets/gpu/rear1.png'}, 
        {side: 'left', imageSrc: './assets/gpu/nvidia geforce rtx 4060.png'}, 
    ],
    slots: [],
    ports: [
        {
            type: '8-pin-pcie',
            style: 'single'
        }
    ]  
    },

    {        // Asus Nvidia GeForce RTX 4070 Super 12vhpwr
    name: 'Asus Nvidia GeForce RTX 4070 Super',
    type: 'gpu',
    size: 'ATX',
    specs: {
        price: 58504,
        portCount: 1,
        portType: '12vhpwr',
        architecture: 'NVIDIA Ada Lovelace',
        baseClock: '1.92 GHz',
        boostClock: '2.5 GHz',
        memory: '12GB GDDR6',
    },
    watts: '220',
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
        {side: 'pack', imageSrc: './assets/gpu.1/nvidia geforce rtx 4070 super.png'},
        {side: 'rear', imageSrc: './assets/gpu/rear1.png'}, 
        {side: 'left', imageSrc: './assets/gpu/nvidia geforce rtx 4070 super.png'}, 
    ],
    slots: [],
    ports: [
        {
            type: '12vhpwr',
            style: 'single'
        }
    ]  
    },

    {        // Asus Nvidia GeForce 3050
    name: 'Asus Nvidia GeForce 3050',
    type: 'gpu',
    size: 'ATX',
    watts: '130',
    specs: {
        price: 9966,       
        architecture: 'NVIDIA Ampere',
        baseClock: '1.50 GHz',
        boostClock: '1.78 GHz',
        memory: '8GB GDDR6',
        powerConnector: 'N/A' 
    },
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
        {side: 'pack', imageSrc: './assets/gpu.1/nvidia geforce 3050.png'},
        {side: 'rear', imageSrc: './assets/gpu/rear1.png'}, 
        {side: 'left', imageSrc: './assets/gpu/nvidia geforce 3050.png'}, 
    ],
    slots: [],
    ports: []  
    },

    {        // Asus Radeon RX6500 XT
    name: 'Asus Radeon RX 6500 XT',
    type: 'gpu',
    size: 'ATX',
    specs: {
        price: 8695,
        portCount: 1,
        portType: '6-pin-pcie',
        architecture: 'AMD RDNA 2',
        baseClock: '2.3 GHz',
        boostClock: '2.8 GHz',
        memory: '4GB GDDR6',
    },
    watts: '120',
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
        {side: 'pack', imageSrc: './assets/gpu.1/radeon rx6500 xt.png'},
        {side: 'rear', imageSrc: './assets/gpu/rear1.png'}, 
        {side: 'left', imageSrc: './assets/gpu/radeon rx6500 xt.png'}, 
    ],
    slots: [],
    ports: [
        {
            type: '6-pin-pcie',
            style: 'single'
        }
    ]  
    },

    {        // Nvidia GeForce RTX 2080 Super
    name: 'Nvidia GeForce RTX 2080 Super',
    type: 'gpu',
    size: 'ATX',
    specs: {
        price: 54432,
        portCount: 1,
        portType: '6-pin-pcie',
        architecture: 'NVIDIA Turing',
        baseClock: '1.65 GHz',
        boostClock: '1.82 GHz',
        memory: '8GB GDDR6',
    },
    watts: '250',
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
        {side: 'pack', imageSrc: './assets/gpu.1/nvidia geforce rtx 2080 super.png'},
        {side: 'rear', imageSrc: './assets/gpu/rear.png'}, 
        {side: 'left', imageSrc: './assets/gpu/nvidia geforce rtx 2080 super.png'}, 
    ],
    slots: [],
    ports: [
        {
            type: '6-pin-pcie',
            style: 'single'
        }
    ]  
    },

    {        // Gigabyte Radeon RX6750 XT
    name: 'Gigabyte Radeon RX 6750 XT',
    type: 'gpu',
    size: 'ATX',
    specs: {
        price: 30490,
        portCount: 1,
        portType: '6-pin-pcie',
        architecture: 'AMD RDNA 2',
        baseClock: '2.3 GHz',
        boostClock: '2.6 GHz',
        memory: '12GB GDDR6',
    },
    watts: '250',
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
        {side: 'pack', imageSrc: './assets/gpu.1/radeon rx6750 xt.png'},
        {side: 'rear', imageSrc: './assets/gpu/rear1.png'}, 
        {side: 'left', imageSrc: './assets/gpu/radeon rx6750 xt.png'}, 
    ],
    slots: [],
    ports: [
        {            
            type: '6-pin-pcie',
            style: 'single'
        }
    ]  
    },

    {        // AMD Radeon RX5300 OEM
    name: 'AMD Radeon RX 5300 OEM',
    type: 'gpu',
    size: 'ATX',
    specs: {
        price: 7194,
        portCount: 1,
        portType: '6-pin-pcie',
        architecture: 'AMD RDNA 2',
        baseClock: '1.7 GHz',
        boostClock: '1.9 GHz',
        memory: '4GB GDDR6',
    },
    watts: '100',
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
        {side: 'pack', imageSrc: './assets/gpu.1/radeon rx5300 OEM.png'},
        {side: 'rear', imageSrc: './assets/gpu/rear1.png'}, 
        {side: 'left', imageSrc: './assets/gpu/radeon rx5300 OEM.png'}, 
    ],
    slots: [],
    ports: [
        {            
            type: '6-pin-pcie',
            style: 'single'
        }
    ]  
    },

    {        // Nvidia Tesla T40
    name: 'Nvidia Tesla T40',
    type: 'gpu',
    size: 'ATX',
    specs: {
        price: 46290,
        portCount: 1,
        portType: '6-pin-pcie',
        architecture: 'NVIDIA Turing',
        baseClock: '1.3 GHz', 
        boostClock: '1.6 GHz',
        memory: '8GB GDDR6',
    },
    watts: '245',
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
        {side: 'pack', imageSrc: './assets/gpu.1/nvidia Tesla T40.png'},
        {side: 'rear', imageSrc: './assets/gpu/rear1.png'}, 
        {side: 'left', imageSrc: './assets/gpu/nvidia Tesla T40.png'}, 
    ],
    slots: [],
    ports: [
        {            
            type: '6-pin-pcie',
            style: 'single'
        }
    ]  
    },

    {        // Nvidia Geforce 1080 Ti
    name: 'Nvidia Geforce 1080 Ti',
    type: 'gpu',
    size: 'ATX',
    specs: {
        price: 21695,
        portCount: 1,
        portType: '6-pin-pcie',
        architecture: 'NVIDIA Pascal',
        baseClock: '1.48 GHz',
        boostClock: '1.58 GHz',
        memory: '11GB GDDR5X',
    },
    watts: '250',
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
        {side: 'pack', imageSrc: './assets/gpu.1/nvidia geforce 1080 ti.png'},
        {side: 'rear', imageSrc: './assets/gpu/rear1.png'}, 
        {side: 'left', imageSrc: './assets/gpu/nvidia geforce 1080 ti.png'}, 
    ],
    slots: [],
    ports: [
        {            
            type: '6-pin-pcie',
            style: 'single'
        }
    ]  
    },
]


export default components