import Component from "./component.js"

const components = [
    // CASE
    new Component ({        // NZXT H5 Flow
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
                    //right:{ } for cases with back view of motherboards
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
            {
                type: 'storage',
                supports: [],
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
                            default: {x: 253, y: 345, width: 180, height: 86}
                        },
                        accessible: true
                    }
                    
                }
            }
        ],
        
        ports: [],
        cables: []
    }),
    new Component ({        // Corsair AF Render
        name: 'Corsair AF Render',
        type: 'chassis',
        size: 'mid-tower',
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
                    //right:{ } for cases with back view of motherboards
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
                supports: [],
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
        ],
        
        ports: [],
        cables: []
    }),
    new Component ({        // Fractal Designs Pop Air
        name: 'Fractal Designs Pop Air',
        type: 'chassis',
        size: 'mid-tower',
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
                    //right:{ } for cases with back view of motherboards
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
                supports: [],
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
                            default: {x: 106, y: 390, width: 95, height: 27}
                        },
                        accessible: true
                    }
                    
                }
            },
        ],
        
        ports: [],
        cables: []
    }),
    new Component ({        // Lian Li LanCool
        name: 'Lian Li LanCool',
        type: 'chassis',
        size: 'mid-tower',
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
                    //right:{ } for cases with back view of motherboards
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
                supports: [],
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
                            default: {x: 130, y: 420, width: 95, height: 27}
                        },
                        accessible: true
                    }
                    
                }
            },

        ],
        
        ports: [],
        cables: []
    }),
    new Component ({        // Lian Li LanCool
        name: 'Phanteks Enthoo Pro M',
        type: 'chassis',
        size: 'mid-tower',
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
                    //right:{ } for cases with back view of motherboards
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
                supports: [],
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
                            default: {x: 65, y: 400, width: 100, height: 27}
                        },
                        accessible: true
                    }
                    
                }
            },

        ],
        
        ports: [],
        cables: []
    }),

    // MOTHERBOARD AM4
    new Component ({        // B550 Aorus Elite v2 
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
        defaultSource: 'PACK',
        images: [
            {side: 'PACK', imageSrc: './assets/motherboard/Aorus/AM4/B550 AORUS ELITE V2-01.png'}, 
            {side: 'left', imageSrc: './assets/motherboard/Aorus/AM4/B550 AORUS ELITE V2-02.png'}, 
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
                            default: {x: 204, y: 28, width: 8, height: 140}
                        },
                        accessible: true
                    }
                }
            }
        ],
        ports: [
            {
                type: '24-pin-power'
            },
            {
                type: '8-pin-power'
            }
        ],
        cables: []
    }),
    new Component ({        // X570 PG Velocita
        name: 'ASRock X570 PG Velocita',
        type: 'motherboard',
        size: 'ATX',
        dimensions: {
            depth: 244,
            width: 244,
            height: 305
        },
        isRotatable: false,
        isAttached: false,
        defaultSource: 'PACK',
        images: [
            {side: 'PACK', imageSrc: './assets/motherboard/ASRock/AM4/X570 PG Velocita(L1).png'}, 
            {side: 'left', imageSrc: './assets/motherboard/ASRock/AM4/X570 PG Velocita(L2).png'}, 
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
                            default: {x: 204, y: 28, width: 8, height: 140}
                        },
                        accessible: true
                    }
                }
            }
        ],
        ports: [
            {
                type: '24-pin-power'
            },
            {
                type: '8-pin-power'
            }
        ],
        cables: []
    }),
    new Component ({        // X570 Taichi
        name: 'ASRock X570 Taichi',
        type: 'motherboard',
        size: 'ATX',
        dimensions: {
            depth: 244,
            width: 244,
            height: 305
        },
        isRotatable: false,
        isAttached: false,
        defaultSource: 'PACK',
        images: [
            {side: 'PACK', imageSrc: './assets/motherboard/ASRock/AM4/X570 Taichi(M1).png'}, 
            {side: 'left', imageSrc: './assets/motherboard/ASRock/AM4/X570 Taichi(M2).png'}, 
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
                            default: {x: 210, y: 32, width: 8, height: 140}
                        },
                        accessible: true
                    }
                }
            }
        ],
        ports: [
            {
                type: '24-pin-power'
            },
            {
                type: '8-pin-power'
            }
        ],
        cables: []
    }),
    new Component ({        // ROG Strix B550-F Gaming
        name: 'ROG Strix B550-F Gaming',
        type: 'motherboard',
        size: 'ATX',
        dimensions: {
            depth: 244,
            width: 244,
            height: 305
        },
        isRotatable: false,
        isAttached: false,
        defaultSource: 'PACK',
        images: [
            {side: 'PACK', imageSrc: './assets/motherboard/ASUS ROG/AM4/ROG STRIX B550-F GAMING WIFI.png'}, 
            {side: 'left', imageSrc: './assets/motherboard/ASUS ROG/AM4/ROG STRIX B550-F GAMING WIFI II.png'}, 
            {side: 'rear', imageSrc: './assets/motherboard/ASUS ROG/AM4/ROG STRIX B550-F GAMING II REAR.png'} 
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
                            default: {x: 209, y: 33, width: 8, height: 140}
                        },
                        accessible: true
                    }
                }
            }
        ],
        ports: [
            {
                type: '24-pin-power'
            },
            {
                type: '8-pin-power'
            }
        ],
        cables: []
    }),
    new Component ({        // ROG Strix B550-XE Gaming
        name: 'ROG Strix B550-XE Gaming',
        type: 'motherboard',
        size: 'ATX',
        dimensions: {
            depth: 244,
            width: 244,
            height: 305
        },
        isRotatable: false,
        isAttached: false,
        defaultSource: 'PACK',
        images: [
            {side: 'PACK', imageSrc: './assets/motherboard/ASUS ROG/AM4/ROG STRIX B550-XE GAMING WIFI Pack.png'}, 
            {side: 'left', imageSrc: './assets/motherboard/ASUS ROG/AM4/ROG STRIX B550-XE GAMING WIFI.png'}, 
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
                            default: {x: 206, y: 39, width: 8, height: 140}
                        },
                        accessible: true
                    }
                }
            }
        ],
        ports: [
            {
                type: '24-pin-power'
            },
            {
                type: '8-pin-power'
            }
        ],
        cables: []
    }),
    new Component ({        // Biostar B550GTA
        name: 'Biostar Racing B550GTA',
        type: 'motherboard',
        size: 'ATX',
        dimensions: {
            depth: 244,
            width: 244,
            height: 305
        },
        isRotatable: false,
        isAttached: false,
        defaultSource: 'PACK',
        images: [
            {side: 'PACK', imageSrc: './assets/motherboard/Biostar/AM4/B550GTA PACK.png'}, 
            {side: 'left', imageSrc: './assets/motherboard/Biostar/AM4/B550GTA.png'}, 
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
                            default: {x: 204, y: 28, width: 8, height: 140}
                        },
                        accessible: true
                    }
                }
            }
        ],
        ports: [
            {
                type: '24-pin-power'
            },
            {
                type: '8-pin-power'
            }
        ],
        cables: []
    }),
    new Component ({        // Biostar X570GTA
        name: 'Biostar Racing X570GTA',
        type: 'motherboard',
        size: 'ATX',
        dimensions: {
            depth: 244,
            width: 244,
            height: 305
        },
        isRotatable: false,
        isAttached: false,
        defaultSource: 'PACK',
        images: [
            {side: 'PACK', imageSrc: './assets/motherboard/Biostar/AM4/X570GTA PACK.png'}, 
            {side: 'left', imageSrc: './assets/motherboard/Biostar/AM4/X570GTA.png'}, 
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
            }
        ],
        ports: [
            {
                type: '24-pin-power'
            },
            {
                type: '8-pin-power'
            }
        ],
        cables: []
    }),
    new Component ({        // EVGA X570 FTW
        name: 'EVGA X570 FTW',
        type: 'motherboard',
        size: 'ATX',
        dimensions: {
            depth: 244,
            width: 244,
            height: 305
        },
        isRotatable: false,
        isAttached: false,
        defaultSource: 'PACK',
        images: [
            {side: 'PACK', imageSrc: './assets/motherboard/EVGA/AM4/EVGA X570 FTW PACK.png'}, 
            {side: 'left', imageSrc: './assets/motherboard/EVGA/AM4/EVGA X570 FTW.png'}, 
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
            }
        ],
        ports: [
            {
                type: '24-pin-power'
            },
            {
                type: '8-pin-power'
            }
        ],
        cables: []
    }),
    new Component ({        // Gigabyte B550 GAMING X V2
        name: 'Gigabyte B550 GAMING X V2',
        type: 'motherboard',
        size: 'ATX',
        dimensions: {
            depth: 244,
            width: 244,
            height: 305
        },
        isRotatable: false,
        isAttached: false,
        defaultSource: 'PACK',
        images: [
            {side: 'PACK', imageSrc: './assets/motherboard/Gigabyte/AM4/B550 GAMING X V2/B550 GAMING X V2-04.png'}, 
            {side: 'left', imageSrc: './assets/motherboard/Gigabyte/AM4/B550 GAMING X V2/B550 GAMING X V2-02.png'}, 
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
                            default: {x: 204, y: 28, width: 8, height: 140}
                        },
                        accessible: true
                    }
                }
            }
        ],
        ports: [
            {
                type: '24-pin-power'
            },
            {
                type: '8-pin-power'
            }
        ],
        cables: []
    }),
    new Component ({        // Gigabyte B550 VISION D
        name: 'Gigabyte B550 VISION D',
        type: 'motherboard',
        size: 'ATX',
        dimensions: {
            depth: 244,
            width: 244,
            height: 305
        },
        isRotatable: false,
        isAttached: false,
        defaultSource: 'PACK',
        images: [
            {side: 'PACK', imageSrc: './assets/motherboard/Gigabyte/AM4/B550 VISION D/B550 VISION D PACK.png'}, 
            {side: 'left', imageSrc: './assets/motherboard/Gigabyte/AM4/B550 VISION D/B550 VISION D.png'}, 
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
                            default: {x: 207, y: 28, width: 8, height: 140}
                        },
                        accessible: true
                    }
                }
            }
        ],
        ports: [
            {
                type: '24-pin-power'
            },
            {
                type: '8-pin-power'
            }
        ],
        cables: []
    }),
    // MOTHERBOARD AM5
    new Component ({        // B650E Aorus Elite X AX Ice
        name: 'B650E Aorus Elite X AX Ice',
        type: 'motherboard',
        size: 'ATX',
        dimensions: {
            depth: 244,
            width: 244,
            height: 305
        },
        isRotatable: false,
        isAttached: false,
        defaultSource: 'PACK',
        images: [
            {side: 'PACK', imageSrc: './assets/motherboard/Aorus/AM5/B650E AORUS ELITE X AX ICE-01.png'}, 
            {side: 'left', imageSrc: './assets/motherboard/Aorus/AM5/B650E AORUS ELITE X AX ICE-02.png'}, 
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
            }
        ],
        ports: [
            {
                type: '24-pin-power'
            },
            {
                type: '8-pin-power'
            }
        ],
        cables: []
    }),
    new Component ({        // B650M Livemixer
        name: 'ASRock B650 Livemixer',
        type: 'motherboard',
        size: 'ATX',
        dimensions: {
            depth: 244,
            width: 244,
            height: 305
        },
        isRotatable: false,
        isAttached: false,
        defaultSource: 'PACK',
        images: [
            {side: 'PACK', imageSrc: './assets/motherboard/ASRock/AM5/B650 LiveMixer(M1).png'}, 
            {side: 'left', imageSrc: './assets/motherboard/ASRock/AM5/b650 Livemixer.png'}, 
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
                supports: ['ddr4'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 205, y: 32, width: 8, height: 140}
                        },
                        accessible: true
                    }
                }
            }
        ],
        ports: [
            {
                type: '24-pin-power'
            },
            {
                type: '8-pin-power'
            }
        ],
        cables: []
    }),
    new Component ({        // X670E PG Lightning
        name: 'ASRock X670E PG Lightning',
        type: 'motherboard',
        size: 'ATX',
        dimensions: {
            depth: 244,
            width: 244,
            height: 305
        },
        isRotatable: false,
        isAttached: false,
        defaultSource: 'PACK',
        images: [
            {side: 'PACK', imageSrc: './assets/motherboard/ASRock/AM5/X670E PG Lightning(L1).png'}, 
            {side: 'left', imageSrc: './assets/motherboard/ASRock/AM5/X670E PG Lightning(L3).png'}, 
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
            }
        ],
        ports: [
            {
                type: '24-pin-power'
            },
            {
                type: '8-pin-power'
            }
        ],
        cables: []
    }),
    new Component ({        // ROG Strix B650E-E Gaming Wifi
        name: 'ROG Strix B650E-E Gaming',
        type: 'motherboard',
        size: 'ATX',
        dimensions: {
            depth: 244,
            width: 244,
            height: 305
        },
        isRotatable: false,
        isAttached: false,
        defaultSource: 'PACK',
        images: [
            {side: 'PACK', imageSrc: './assets/motherboard/ASUS ROG/AM5/ROG STRIX B650E-E GAMING WIFI pack.png'}, 
            {side: 'left', imageSrc: './assets/motherboard/ASUS ROG/AM5/ROG STRIX B650E-E GAMING WIFI.png'}, 
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
            }
        ],
        ports: [
            {
                type: '24-pin-power'
            },
            {
                type: '8-pin-power'
            }
        ],
        cables: []
    }),    
    new Component ({        // Biostar X670E VALKYRIE
        name: 'Biostar X670E VALKYRIE',
        type: 'motherboard',
        size: 'ATX',
        dimensions: {
            depth: 244,
            width: 244,
            height: 305
        },
        isRotatable: false,
        isAttached: false,
        defaultSource: 'PACK',
        images: [
            {side: 'PACK', imageSrc: './assets/motherboard/Biostar/AM5/X670E VALKYRIE pack.png'}, 
            {side: 'left', imageSrc: './assets/motherboard/Biostar/AM5/X670E VALKYRIE.png'}, 
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
                supports: ['ddr4'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 209, y: 32, width: 8, height: 140}
                        },
                        accessible: true
                    }
                }
            }
        ],
        ports: [
            {
                type: '24-pin-power'
            },
            {
                type: '8-pin-power'
            }
        ],
        cables: []
    }),
    new Component ({        // Biostar X870E VALKYRIE
        name: 'Biostar X870E VALKYRIE',
        type: 'motherboard',
        size: 'ATX',
        dimensions: {
            depth: 244,
            width: 244,
            height: 305
        },
        isRotatable: false,
        isAttached: false,
        defaultSource: 'PACK',
        images: [
            {side: 'PACK', imageSrc: './assets/motherboard/Biostar/AM5/X870E VALKYRIE pack.png'}, 
            {side: 'left', imageSrc: './assets/motherboard/Biostar/AM5/X870E VALKYRIE.png'}, 
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
                supports: ['ddr4'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 209, y: 28, width: 8, height: 140}
                        },
                        accessible: true
                    }
                }
            }
        ],
        ports: [
            {
                type: '24-pin-power'
            },
            {
                type: '8-pin-power'
            }
        ],
        cables: []
    }),
    new Component ({        // Gigabyte B650 GAMING X
        name: 'Gigabyte B650 GAMING X',
        type: 'motherboard',
        size: 'ATX',
        dimensions: {
            depth: 244,
            width: 244,
            height: 305
        },
        isRotatable: false,
        isAttached: false,
        defaultSource: 'PACK',
        images: [
            {side: 'PACK', imageSrc: './assets/motherboard/Gigabyte/AM5/B650 GAMING X/B650 GAMING X-01.png'}, 
            {side: 'left', imageSrc: './assets/motherboard/Gigabyte/AM5/B650 GAMING X/B650 GAMING X-02.png'}, 
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
            }
        ],
        ports: [
            {
                type: '24-pin-power'
            },
            {
                type: '8-pin-power'
            }
        ],
        cables: []
    }),
    new Component ({        // Gigabyte B650 UD AX
        name: 'Gigabyte B650 UD AX',
        type: 'motherboard',
        size: 'ATX',
        dimensions: {
            depth: 244,
            width: 244,
            height: 305
        },
        isRotatable: false,
        isAttached: false,
        defaultSource: 'PACK',
        images: [
            {side: 'PACK', imageSrc: './assets/motherboard/Gigabyte/AM5/B650 UD AX/B650 UD AX-01.png'}, 
            {side: 'left', imageSrc: './assets/motherboard/Gigabyte/AM5/B650 UD AX/B650 UD AX-02.png'}, 
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
                supports: ['ddr4'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 207, y: 31, width: 8, height: 140}
                        },
                        accessible: true
                    }
                }
            }
        ],
        ports: [
            {
                type: '24-pin-power'
            },
            {
                type: '8-pin-power'
            }
        ],
        cables: []
    }),
    new Component ({        // MSI MPG B650 CARBON WIFI
        name: 'MSI MPG B650 CARBON WIFI',
        type: 'motherboard',
        size: 'ATX',
        dimensions: {
            depth: 244,
            width: 244,
            height: 305
        },
        isRotatable: false,
        isAttached: false,
        defaultSource: 'PACK',
        images: [
            {side: 'PACK', imageSrc: './assets/motherboard/MSI/AM5/MPG B650 CARBON WIFI PACK.png'}, 
            {side: 'left', imageSrc: './assets/motherboard/MSI/AM5/MPG B650 CARBON WIFI.png'}, 
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
            }
        ],
        ports: [
            {
                type: '24-pin-power'
            },
            {
                type: '8-pin-power'
            }
        ],
        cables: []
    }),
    new Component ({        // MSI MPG X670E CARBON WIFI
        name: 'MSI MPG X670E CARBON WIFI',
        type: 'motherboard',
        size: 'ATX',
        dimensions: {
            depth: 244,
            width: 244,
            height: 305
        },
        isRotatable: false,
        isAttached: false,
        defaultSource: 'PACK',
        images: [
            {side: 'PACK', imageSrc: './assets/motherboard/MSI/AM5/MPG X670E CARBON WIFI PACK.png'}, 
            {side: 'left', imageSrc: './assets/motherboard/MSI/AM5/MPG X670E CARBON WIFI.png'}, 
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
            }
        ],
        ports: [
            {
                type: '24-pin-power'
            },
            {
                type: '8-pin-power'
            }
        ],
        cables: []
    }),
    // MOTHERBOARD LGA1200
    new Component ({        // Z590 Aorus Master
        name: 'Z590 Aorus Master',
        type: 'motherboard',
        size: 'ATX',
        dimensions: {
            depth: 244,
            width: 244,
            height: 305
        },
        isRotatable: false,
        isAttached: false,
        defaultSource: 'PACK',
        images: [
            {side: 'PACK', imageSrc: './assets/motherboard/Aorus/LGA 1200/Z590 AORUS MASTER (rev. 1.0)/1.png'}, 
            {side: 'left', imageSrc: './assets/motherboard/Aorus/LGA 1200/Z590 AORUS MASTER (rev. 1.0)/2.png'}, 
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
            }          
        ],
        ports: [
            {
                type: '24-pin-power'
            },
            {
                type: '8-pin-power'
            }
        ],
        cables: []
    }),
    new Component ({        // Z590 Aorus Xtreme
        name: 'Z590 Aorus Xtreme',
        type: 'motherboard',
        size: 'ATX',
        dimensions: {
            depth: 244,
            width: 244,
            height: 305
        },
        isRotatable: false,
        isAttached: false,
        defaultSource: 'PACK',
        images: [
            {side: 'PACK', imageSrc: './assets/motherboard/Aorus/LGA 1200/Z590 AORUS XTREME (rev. 1.0)/1.png'}, 
            {side: 'left', imageSrc: './assets/motherboard/Aorus/LGA 1200/Z590 AORUS XTREME (rev. 1.0)/2.png'}, 
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
                            default: {x: 201, y: 34, width: 8, height: 140}
                        },
                        accessible: true
                    }
                }
            }  
        ],
        ports: [
            {
                type: '24-pin-power'
            },
            {
                type: '8-pin-power'
            }
        ],
        cables: []
    }),
    new Component ({        // W480 Creator
        name: 'ASRock W480 Creator',
        type: 'motherboard',
        size: 'ATX',
        dimensions: {
            depth: 244,
            width: 244,
            height: 305
        },
        isRotatable: false,
        isAttached: false,
        defaultSource: 'PACK',
        images: [
            {side: 'PACK', imageSrc: './assets/motherboard/ASRock/LGA 1200/W480 Creator(M1).png'}, 
            {side: 'left', imageSrc: './assets/motherboard/ASRock/LGA 1200/W480 Creator(M2).png'}, 
          //{side: 'right', imageSrc: './assets/motherboard/ASRock/LGA 1200/W480 Creator backside.png'}, additional for cases with backside monitor exposure
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
                            default: {x: 211, y: 22, width: 8, height: 140}
                        },
                        accessible: true
                    }
                }
            }  
        ],
        ports: [
            {
                type: '24-pin-power'
            },
            {
                type: '8-pin-power'
            }
        ],
        cables: []
    }),
    new Component ({        // Z590 Aorus Xtreme
        name: 'ASRock Z590 PG Velocita',
        type: 'motherboard',
        size: 'ATX',
        dimensions: {
            depth: 244,
            width: 244,
            height: 305
        },
        isRotatable: false,
        isAttached: false,
        defaultSource: 'PACK',
        images: [
            {side: 'PACK', imageSrc: './assets/motherboard/ASRock/LGA 1200/Z590 PG Velocita(L3).png'}, 
            {side: 'left', imageSrc: './assets/motherboard/ASRock/LGA 1200/Z590 PG Velocita(L5).png'}, 
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
                            default: {x: 211, y: 27, width: 8, height: 140}
                        },
                        accessible: true
                    }
                }
            }  
        ],
        ports: [
            {
                type: '24-pin-power'
            },
            {
                type: '8-pin-power'
            }
        ],
        cables: []
    }),
    new Component ({        // ROG Strix B560-E Gaming
        name: 'ROG Strix B560-E Gaming',
        type: 'motherboard',
        size: 'ATX',
        dimensions: {
            depth: 244,
            width: 244,
            height: 305
        },
        isRotatable: false,
        isAttached: false,
        defaultSource: 'PACK',
        images: [
            {side: 'PACK', imageSrc: './assets/motherboard/ASUS ROG/LGA1200/ROG STRIX B560-E GAMING WIFI PACK.png'}, 
            {side: 'left', imageSrc: './assets/motherboard/ASUS ROG/LGA1200/ROG STRIX B560-E GAMING WIFI.png'}, 
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
                            default: {x: 211, y: 27, width: 8, height: 140}
                        },
                        accessible: true
                    }
                }
            }  
        ],
        ports: [
            {
                type: '24-pin-power'
            },
            {
                type: '8-pin-power'
            }
        ],
        cables: []
    }),
    new Component ({        // ROG Strix Z490-A GAMING
        name: 'ROG STRIX Z490-A GAMING',
        type: 'motherboard',
        size: 'ATX',
        dimensions: {
            depth: 244,
            width: 244,
            height: 305
        },
        isRotatable: false,
        isAttached: false,
        defaultSource: 'PACK',
        images: [
            {side: 'PACK', imageSrc: './assets/motherboard/ASUS ROG/LGA1200/ROG STRIX Z490-A GAMING PACK.png'}, 
            {side: 'left', imageSrc: './assets/motherboard/ASUS ROG/LGA1200/ROG STRIX Z490-A GAMING.png'}, 
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
            }  
        ],
        ports: [
            {
                type: '24-pin-power'
            },
            {
                type: '8-pin-power'
            }
        ],
        cables: []
    }),
    new Component ({        // Biostar Z590 VALKYRIE
        name: 'Biostar Z590 VALKYRIE',
        type: 'motherboard',
        size: 'ATX',
        dimensions: {
            depth: 244,
            width: 244,
            height: 305
        },
        isRotatable: false,
        isAttached: false,
        defaultSource: 'PACK',
        images: [
            {side: 'PACK', imageSrc: './assets/motherboard/Biostar/LGA 1200/Z590 VALKYRIE PACK.png'}, 
            {side: 'left', imageSrc: './assets/motherboard/Biostar/LGA 1200/Z590 VALKYRIE.png'}, 
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
                            default: {x: 207, y: 29, width: 8, height: 140}
                        },
                        accessible: true
                    }
                }
            }  
        ],
        ports: [
            {
                type: '24-pin-power'
            },
            {
                type: '8-pin-power'
            }
        ],
        cables: []
    }),
    new Component ({        // Biostar Z590GTA
        name: 'Biostar Z590GTA',
        type: 'motherboard',
        size: 'ATX',
        dimensions: {
            depth: 244,
            width: 244,
            height: 305
        },
        isRotatable: false,
        isAttached: false,
        defaultSource: 'PACK',
        images: [
            {side: 'PACK', imageSrc: './assets/motherboard/Biostar/LGA 1200/Z590GTA PACK.png'}, 
            {side: 'left', imageSrc: './assets/motherboard/Biostar/LGA 1200/Z590GTA.png'}, 
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
                            default: {x: 207, y: 32, width: 8, height: 140}
                        },
                        accessible: true
                    }
                }
            }  
        ],
        ports: [
            {
                type: '24-pin-power'
            },
            {
                type: '8-pin-power'
            }
        ],
        cables: []
    }),
    new Component ({        // EVGA Z490 DARK [RAM orientation is on horizontal]
        name: 'EVGA Z490 DARK',
        type: 'motherboard',
        size: 'ATX',
        dimensions: {
            depth: 244,
            width: 244,
            height: 305
        },
        isRotatable: false,
        isAttached: false,
        defaultSource: 'PACK',
        images: [
            {side: 'PACK', imageSrc: './assets/motherboard/EVGA/LGA 1200/EVGA Z490 DARK PACK.png'}, 
            {side: 'left', imageSrc: './assets/motherboard/EVGA/LGA 1200/EVGA Z490 DARK.png'}, 
            {side: 'rear', imageSrc: './assets/motherboard/EVGA/LGA 1200/EVGA Z490 DARK REAR.png'} 
        ],
        slots: [
            {
                type: 'cpu', 
                supports: ['LGA 1200'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 109, y: 73, width: 45, height: 45},
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
                            default: {x: 73, y: 28, width: 110, height: 8}
                        },
                        accessible: true
                    }
                }
            }  
        ],
        ports: [
            {
                type: '24-pin-power'
            },
            {
                type: '8-pin-power'
            }
        ],
        cables: []
    }),
    new Component ({        // EVGA Z590 DARK [RAM orientation is on horizontal]
        name: 'EVGA Z490 DARK',
        type: 'motherboard',
        size: 'ATX',
        dimensions: {
            depth: 244,
            width: 244,
            height: 305
        },
        isRotatable: false,
        isAttached: false,
        defaultSource: 'PACK',
        images: [
            {side: 'PACK', imageSrc: './assets/motherboard/EVGA/LGA 1200/EVGA Z590 DARK PACK.png'}, 
            {side: 'left', imageSrc: './assets/motherboard/EVGA/LGA 1200/EVGA Z590 DARK.png'}, 
            {side: 'rear', imageSrc: './assets/motherboard/EVGA/LGA 1200/EVGA Z590 DARK REAR.png'} 
        ],
        slots: [
            {
                type: 'cpu', 
                supports: ['LGA 1200'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 109, y: 67, width: 45, height: 45},
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
            }  
        ],
        ports: [
            {
                type: '24-pin-power'
            },
            {
                type: '8-pin-power'
            }
        ],
        cables: []
    }),
    new Component ({        // Gigabyte Z590 GAMING X
        name: 'Gigabyte Z590 GAMING X',
        type: 'motherboard',
        size: 'ATX',
        dimensions: {
            depth: 244,
            width: 244,
            height: 305
        },
        isRotatable: false,
        isAttached: false,
        defaultSource: 'PACK',
        images: [
            {side: 'PACK', imageSrc: './assets/motherboard/Gigabyte/LGA 1200/Z590 GAMING X/Z590 GAMING X PACK.png'}, 
            {side: 'left', imageSrc: './assets/motherboard/Gigabyte/LGA 1200/Z590 GAMING X/Z590 GAMING X.png'}, 
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
            }  
        ],
        ports: [
            {
                type: '24-pin-power'
            },
            {
                type: '8-pin-power'
            }
        ],
        cables: []
    }),
    new Component ({        // Gigabyte Z590 VISION D
        name: 'Gigabyte Z590 VISION D',
        type: 'motherboard',
        size: 'ATX',
        dimensions: {
            depth: 244,
            width: 244,
            height: 305
        },
        isRotatable: false,
        isAttached: false,
        defaultSource: 'PACK',
        images: [
            {side: 'PACK', imageSrc: './assets/motherboard/Gigabyte/LGA 1200/Z590 VISION D/6.png'}, 
            {side: 'left', imageSrc: './assets/motherboard/Gigabyte/LGA 1200/Z590 VISION D/2.png'}, 
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
                            default: {x: 205, y: 24, width: 8, height: 140}
                        },
                        accessible: true
                    }
                }
            }  
        ],
        ports: [
            {
                type: '24-pin-power'
            },
            {
                type: '8-pin-power'
            }
        ],
        cables: []
    }),
    new Component ({        // MSI MAG Z590 TORPEDO
        name: 'MSI MAG Z590 TORPEDO',
        type: 'motherboard',
        size: 'ATX',
        dimensions: {
            depth: 244,
            width: 244,
            height: 305
        },
        isRotatable: false,
        isAttached: false,
        defaultSource: 'PACK',
        images: [
            {side: 'PACK', imageSrc: './assets/motherboard/MSI/LGA 1200/MAG Z590 TORPEDO PACK.png'}, 
            {side: 'left', imageSrc: './assets/motherboard/MSI/LGA 1200/MAG Z590 TORPEDO.png'}, 
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
            }  
        ],
        ports: [
            {
                type: '24-pin-power'
            },
            {
                type: '8-pin-power'
            }
        ],
        cables: []
    }),
    new Component ({        // MSI Z590 PRO WIFI (CEC)
        name: 'MSI Z590 PRO WIFI (CEC)',
        type: 'motherboard',
        size: 'ATX',
        dimensions: {
            depth: 244,
            width: 244,
            height: 305
        },
        isRotatable: false,
        isAttached: false,
        defaultSource: 'PACK',
        images: [
            {side: 'PACK', imageSrc: './assets/motherboard/MSI/LGA 1200/Z590 PRO WIFI (CEC) PACK.png'}, 
            {side: 'left', imageSrc: './assets/motherboard/MSI/LGA 1200/Z590 PRO WIFI (CEC).png'}, 
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
                            default: {x: 207, y: 24, width: 8, height: 140}
                        },
                        accessible: true
                    }
                }
            }  
        ],
        ports: [
            {
                type: '24-pin-power'
            },
            {
                type: '8-pin-power'
            }
        ],
        cables: []
    }),
    // MOTHERBOARD LGA 1700
    new Component ({        // MSI MPG Z790 Carbon Max WiFi
        name: 'MSI MPG Z790 Carbon Max WiFi',
        type: 'motherboard',
        size: 'ATX',
        dimensions: {
            depth: 244,
            width: 300,
            height: 305
        },
        isRotatable: false,
        isAttached: false,
        defaultSource: 'PACK',
        images: [
            {side: 'PACK', imageSrc: './assets/motherboard/MSI/LGA 1700/MPG Z790 CARBON MAX WIFI II PACK.png'}, 
            {side: 'left', imageSrc: './assets/motherboard/MSI/LGA 1700/MPG Z790 CARBON MAX WIFI II.png'}, 
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
                supports: ['ddr4'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 207, y: 33, width: 8, height: 140}
                        },
                        accessible: true
                    }
                }
            }
        ],
        ports: [
            {
                type: '24-pin-power'
            },
            {
                type: '8-pin-power'
            }
        ],
        cables: []
    }),  
    new Component ({        // MSI MPG Z790 EDGE WIFI
        name: 'MSI MPG Z790 EDGE WIFI',
        type: 'motherboard',
        size: 'ATX',
        dimensions: {
            depth: 244,
            width: 244,
            height: 305
        },
        isRotatable: false,
        isAttached: false,
        defaultSource: 'PACK',
        images: [
            {side: 'PACK', imageSrc: './assets/motherboard/MSI/LGA 1700/MPG Z790 EDGE WIFI PACK.png'}, 
            {side: 'left', imageSrc: './assets/motherboard/MSI/LGA 1700/MPG Z790 EDGE WIFI.png'}, 
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
                supports: ['ddr4'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 207, y: 33, width: 8, height: 140}
                        },
                        accessible: true
                    }
                }
            }
        ],
        ports: [
            {
                type: '24-pin-power'
            },
            {
                type: '8-pin-power'
            }
        ],
        cables: []
    }),  
    new Component ({        // B760 Aorus Master DDR4
        name: 'B760 Aorus Master DDR4',
        type: 'motherboard',
        size: 'ATX',
        dimensions: {
            depth: 244,
            width: 244,
            height: 305
        },
        isRotatable: false,
        isAttached: false,
        defaultSource: 'PACK',
        images: [
            {side: 'PACK', imageSrc: './assets/motherboard/Aorus/LGA 1700/B760 AORUS MASTER DDR4-01.png'}, 
            {side: 'left', imageSrc: './assets/motherboard/Aorus/LGA 1700/B760 AORUS MASTER DDR4-02.png'}, 
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
            }
        ],
        ports: [
            {
                type: '24-pin-power'
            },
            {
                type: '8-pin-power'
            }
        ],
        cables: []
    }),  
    new Component ({        // Z790 Aorus Pro X
        name: 'Z790 Aorus Pro X',
        type: 'motherboard',
        size: 'ATX',
        dimensions: {
            depth: 244,
            width: 244,
            height: 305
        },
        isRotatable: false,
        isAttached: false,
        defaultSource: 'PACK',
        images: [
            {side: 'PACK', imageSrc: './assets/motherboard/Aorus/LGA 1700/Z790 AORUS PRO X-01.png'}, 
            {side: 'left', imageSrc: './assets/motherboard/Aorus/LGA 1700/Z790 AORUS PRO X-02.png'}, 
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
            }
        ],
        ports: [
            {
                type: '24-pin-power'
            },
            {
                type: '8-pin-power'
            }
        ],
        cables: []
    }),  
    new Component ({        // Z790 Livemixer
        name: 'ASRock Z790 Livemixer',
        type: 'motherboard',
        size: 'ATX',
        dimensions: {
            depth: 244,
            width: 244,
            height: 305
        },
        isRotatable: false,
        isAttached: false,
        defaultSource: 'PACK',
        images: [
            {side: 'PACK', imageSrc: './assets/motherboard/ASRock/LGA 1700/Z790 LiveMixer(M1).png'}, 
            {side: 'left', imageSrc: './assets/motherboard/ASRock/LGA 1700/z790 Livemixer.png'}, 
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
                supports: ['ddr4'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 211, y: 33, width: 8, height: 140}
                        },
                        accessible: true
                    }
                }
            }
        ],
        ports: [
            {
                type: '24-pin-power'
            },
            {
                type: '8-pin-power'
            }
        ],
        cables: []
    }),  
    new Component ({        // Z790 PG Riptide
        name: 'ASRock Z790 PG Riptide',
        type: 'motherboard',
        size: 'ATX',
        dimensions: {
            depth: 244,
            width: 244,
            height: 305
        },
        isRotatable: false,
        isAttached: false,
        defaultSource: 'PACK',
        images: [
            {side: 'PACK', imageSrc: './assets/motherboard/ASRock/LGA 1700/Z790 PG Riptide(L1).png'}, 
            {side: 'left', imageSrc: './assets/motherboard/ASRock/LGA 1700/Z790 PG Riptide(L3).png'}, 
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
                supports: ['ddr4'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 206.5, y: 24, width: 8, height: 140}
                        },
                        accessible: true
                    }
                }
            }
        ],
        ports: [
            {
                type: '24-pin-power'
            },
            {
                type: '8-pin-power'
            }
        ],
        cables: []
    }), 
    new Component ({        // ROG STRIX Z790-A GAMING WIFI II
        name: 'ROG STRIX Z790-A GAMING WIFI II',
        type: 'motherboard',
        size: 'ATX',
        dimensions: {
            depth: 244,
            width: 244,
            height: 305
        },
        isRotatable: false,
        isAttached: false,
        defaultSource: 'PACK',
        images: [
            {side: 'PACK', imageSrc: './assets/motherboard/ASUS ROG/LGA1700/ROG STRIX Z790-A GAMING WIFI II pack.png'}, 
            {side: 'left', imageSrc: './assets/motherboard/ASUS ROG/LGA1700/ROG STRIX Z790-A GAMING WIFI II.png'}, 
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
                           default: {x: 87, y: 43, width: 95, height: 105}
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
                            default: {x: 211, y: 27, width: 8, height: 140}
                        },
                        accessible: true
                    }
                }
            }
        ],
        ports: [
            {
                type: '24-pin-power'
            },
            {
                type: '8-pin-power'
            }
        ],
        cables: []
    }), 
    new Component ({        // ROG MAXIMUS Z790 DARK HERO
        name: 'ROG MAXIMUS Z790 DARK HERO',
        type: 'motherboard',
        size: 'ATX',
        dimensions: {
            depth: 244,
            width: 244,
            height: 305
        },
        isRotatable: false,
        isAttached: false,
        defaultSource: 'PACK',
        images: [
            {side: 'PACK', imageSrc: './assets/motherboard/ASUS ROG/LGA1700/ROG MAXIMUS Z790 DARK HERO PACK.png'}, 
            {side: 'left', imageSrc: './assets/motherboard/ASUS ROG/LGA1700/ROG MAXIMUS Z790 DARK HERO.png'}, 
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
                supports: ['ddr4'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 209, y: 37, width: 8, height: 140}
                        },
                        accessible: true
                    }
                }
            }
        ],
        ports: [
            {
                type: '24-pin-power'
            },
            {
                type: '8-pin-power'
            }
        ],
        cables: []
    }), 
    new Component ({        // Biostar Z690A VALKYRIE
        name: 'Biostar Z690A VALKYRIE',
        type: 'motherboard',
        size: 'ATX',
        dimensions: {
            depth: 244,
            width: 244,
            height: 305
        },
        isRotatable: false,
        isAttached: false,
        defaultSource: 'PACK',
        images: [
            {side: 'PACK', imageSrc: './assets/motherboard/Biostar/LGA 1700/Z690A VALKYRIE pack.png'}, 
            {side: 'left', imageSrc: './assets/motherboard/Biostar/LGA 1700/Z690A VALKYRIE.png'}, 
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
                supports: ['ddr4'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 207, y: 24, width: 8, height: 140}
                        },
                        accessible: true
                    }
                }
            }
        ],
        ports: [
            {
                type: '24-pin-power'
            },
            {
                type: '8-pin-power'
            }
        ],
        cables: []
    }), 
    new Component ({        // Biostar Z790 VALKYRIE
        name: 'Biostar Z790 VALKYRIE',
        type: 'motherboard',
        size: 'ATX',
        dimensions: {
            depth: 244,
            width: 244,
            height: 305
        },
        isRotatable: false,
        isAttached: false,
        defaultSource: 'PACK',
        images: [
            {side: 'PACK', imageSrc: './assets/motherboard/Biostar/LGA 1700/Z790 VALKYRIE pack.png'}, 
            {side: 'left', imageSrc: './assets/motherboard/Biostar/LGA 1700/Z790 VALKYRIE.png'}, 
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
                supports: ['ddr4'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 207, y: 21, width: 8, height: 140}
                        },
                        accessible: true
                    }
                }
            }
        ],
        ports: [
            {
                type: '24-pin-power'
            },
            {
                type: '8-pin-power'
            }
        ],
        cables: []
    }), 
    new Component ({        // EVGA Z790 CLASSIFIED [RAM orientation is on horizontal]
        name: 'EVGA Z790 CLASSIFIED',
        type: 'motherboard',
        size: 'ATX',
        dimensions: {
            depth: 244,
            width: 244,
            height: 305
        },
        isRotatable: false,
        isAttached: false,
        defaultSource: 'PACK',
        images: [
            {side: 'PACK', imageSrc: './assets/motherboard/EVGA/LGA 1700/EVGA Z790 CLASSIFIED pack.png'}, 
            {side: 'left', imageSrc: './assets/motherboard/EVGA/LGA 1700/EVGA Z790 CLASSIFIED.png'}, 
            {side: 'rear', imageSrc: './assets/motherboard/EVGA/LGA 1700/EVGA Z790 CLASSIFIED REAR.png'} 
        ],
        slots: [
            {
                type: 'cpu', 
                supports: ['LGA 1700'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 108, y: 81, width: 45, height: 45},
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
                           default: {x: 84, y: 50, width: 95, height: 105}
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
                            default: {x: 207, y: 24, width: 8, height: 140}
                        },
                        accessible: true
                    }
                }
            }
        ],
        ports: [
            {
                type: '24-pin-power'
            },
            {
                type: '8-pin-power'
            }
        ],
        cables: []
    }), 
    new Component ({        // EVGA Z790 DARK KiNGPiN [RAM orientation is on horizontal]
        name: 'EVGA Z790 DARK KiNGPiN',
        type: 'motherboard',
        size: 'ATX',
        dimensions: {
            depth: 244,
            width: 244,
            height: 305
        },
        isRotatable: false,
        isAttached: false,
        defaultSource: 'PACK',
        images: [
            {side: 'PACK', imageSrc: './assets/motherboard/EVGA/LGA 1700/EVGA Z790 DARK KiNGPiN pack.png'}, 
            {side: 'left', imageSrc: './assets/motherboard/EVGA/LGA 1700/EVGA Z790 DARK KiNGPiN.png'}, 
            {side: 'rear', imageSrc: './assets/motherboard/EVGA/LGA 1700/EVGA Z790 DARK KiNGPiN REAR.png'} 
        ],
        slots: [
            {
                type: 'cpu', 
                supports: ['LGA 1700'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 108, y: 72, width: 45, height: 45},
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
                            default: {x: 207, y: 24, width: 8, height: 140}
                        },
                        accessible: true
                    }
                }
            }
        ],
        ports: [
            {
                type: '24-pin-power'
            },
            {
                type: '8-pin-power'
            }
        ],
        cables: []
    }), 
    new Component ({        // Gigabyte B760 DS3H AX V2
        name: 'Gigabyte B760 DS3H AX V2',
        type: 'motherboard',
        size: 'ATX',
        dimensions: {
            depth: 244,
            width: 244,
            height: 305
        },
        isRotatable: false,
        isAttached: false,
        defaultSource: 'PACK',
        images: [
            {side: 'PACK', imageSrc: './assets/motherboard/Gigabyte/LGA 1700/B760 DS3H AX V2/B760 DS3H AX V2-01.png'}, 
            {side: 'left', imageSrc: './assets/motherboard/Gigabyte/LGA 1700/B760 DS3H AX V2/B760 DS3H AX V2-02.png'}, 
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
            }
        ],
        ports: [
            {
                type: '24-pin-power'
            },
            {
                type: '8-pin-power'
            }
        ],
        cables: []
    }),
    new Component ({        // Gigabyte Z790 GAMING PLUS AX
        name: 'Gigabyte Z790 GAMING PLUS AX',
        type: 'motherboard',
        size: 'ATX',
        dimensions: {
            depth: 244,
            width: 244,
            height: 305
        },
        isRotatable: false,
        isAttached: false,
        defaultSource: 'PACK',
        images: [
            {side: 'PACK', imageSrc: './assets/motherboard/Gigabyte/LGA 1700/Z790 GAMING PLUS AX/Z790 GAMING PLUS AX-01.png'}, 
            {side: 'left', imageSrc: './assets/motherboard/Gigabyte/LGA 1700/Z790 GAMING PLUS AX/Z790 GAMING PLUS AX-02.png'}, 
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
                supports: ['ddr4'],
                component: null,
                sides: {
                    left: {
                        offsets: {
                            default: {x: 205, y: 27, width: 8, height: 140}
                        },
                        accessible: true
                    }
                }
            }
        ],
        ports: [
            {
                type: '24-pin-power'
            },
            {
                type: '8-pin-power'
            }
        ],
        cables: []
    }),
    
    // CPU INTEL [use general photos for attached component and use pack for differentiation of cpus amd intel 1700.png(lga1700 cpus) and 1200 am5.png(lga1200 cpus)]
    new Component ({        // Intel Core i9 14900K
        name: 'Intel Core i9-14900K',
        type: 'cpu',
        size: 'LGA 1700',
        dimensions: {
            depth: 125,
            width: 125,
            height: 125,
        },
        isRotatable: false,
        isAttached: false,
        defaultSource: 'PACK',
        images: [
            {side: 'left', imageSrc: './assets/cpu/intel/gen photos/intel 1700.png'},  
            {side: 'PACK', imageSrc: './assets/cpu/intel/lga1700/i9 14900K.png'},  

        ],
        slots: [],
        ports: []
    }),
    new Component ({        // Intel Core i9 11900K
        name: 'Intel Core i9-11900K',
        type: 'cpu',
        size: 'LGA 1200',
        dimensions: {
            depth: 125,
            width: 125,
            height: 125,
        },
        isRotatable: false,
        isAttached: false,
        defaultSource: 'PACK',
        images: [
            {side: 'left', imageSrc: './assets/cpu/intel/gen photos/intel 1200.png'},  
            {side: 'PACK', imageSrc: './assets/cpu/intel/lga1200/i9 11900K.png'},  

        ],
        slots: [],
        ports: []
    }),    
    new Component ({        // Intel Core i7 14700K
        name: 'Intel Core i7 14700K',
        type: 'cpu',
        size: 'LGA 1700',
        dimensions: {
            depth: 125,
            width: 125,
            height: 125,
        },
        isRotatable: false,
        isAttached: false,
        defaultSource: 'PACK',
        images: [
            {side: 'left', imageSrc: './assets/cpu/intel/gen photos/intel 1700.png'},  
            {side: 'PACK', imageSrc: './assets/cpu/intel/lga1700/i7-14700K.png'},  

        ],
        slots: [],
        ports: []
    }),
    new Component ({        // Intel Core i7 11700K
        name: 'Intel Core i7-11700K',
        type: 'cpu',
        size: 'LGA 1200',
        dimensions: {
            depth: 125,
            width: 125,
            height: 125,
        },
        isRotatable: false,
        isAttached: false,
        defaultSource: 'PACK',
        images: [
            {side: 'left', imageSrc: './assets/cpu/intel/gen photos/intel 1200.png'},  
            {side: 'PACK', imageSrc: './assets/cpu/intel/lga1200/i7 11700K.png'},  

        ],
        slots: [],
        ports: []
    }),
    new Component ({        // Intel Core i5 14400
        name: 'Intel Core i5-14400',
        type: 'cpu',
        size: 'LGA 1700',
        dimensions: {
            depth: 125,
            width: 125,
            height: 125,
        },
        isRotatable: false,
        isAttached: false,
        defaultSource: 'PACK',
        images: [
            {side: 'left', imageSrc: './assets/cpu/intel/gen photos/intel 1700.png'},  
            {side: 'PACK', imageSrc: './assets/cpu/intel/lga1700/i5 14400.png'},  

        ],
        slots: [],
        ports: []
    }),
    new Component ({        // Intel Core i5 11600K
        name: 'Intel Core i5-11600K',
        type: 'cpu',
        size: 'LGA 1200',
        dimensions: {
            depth: 125,
            width: 125,
            height: 125,
        },
        isRotatable: false,
        isAttached: false,
        defaultSource: 'PACK',
        images: [
            {side: 'left', imageSrc: './assets/cpu/intel/gen photos/intel 1700.png'},  
            {side: 'PACK', imageSrc: './assets/cpu/intel/lga1200/i5 11600k.png'},  

        ],
        slots: [],
        ports: []
    }),
    new Component ({        // Intel Core i3 14100
        name: 'Intel Core i3-14100',
        type: 'cpu',
        size: 'LGA 1700',
        dimensions: {
            depth: 125,
            width: 125,
            height: 125,
        },
        isRotatable: false,
        isAttached: false,
        defaultSource: 'PACK',
        images: [
            {side: 'left', imageSrc: './assets/cpu/intel/gen photos/intel 1700.png'},  
            {side: 'PACK', imageSrc: './assets/cpu/intel/lga1700/i3 14100.png'},  

        ],
        slots: [],
        ports: []
    }),
    new Component ({        // Intel Core i3 11305F
        name: 'Intel Core i3-11305F',
        type: 'cpu',
        size: 'LGA 1200',
        dimensions: {
            depth: 125,
            width: 125,
            height: 125,
        },
        isRotatable: false,
        isAttached: false,
        defaultSource: 'PACK',
        images: [
            {side: 'left', imageSrc: './assets/cpu/intel/gen photos/intel 1200.png'},  
            {side: 'PACK', imageSrc: './assets/cpu/intel/lga1200/i3 11305f.png'},  

        ],
        slots: [],
        ports: []
    }),
    // CPU AMD [use general photos for attached component and use pack for differentiation of cpus amd am4.png(am4 cpus) and amd am5.png(am5 cpus)]
    new Component ({        // Ryzen 9 7900X3D
        name: 'AMD Ryzen 9 7900X3D',
        type: 'cpu',
        size: 'AM5',
        dimensions: {
            depth: 125,
            width: 125,
            height: 125,
        },
        isRotatable: false,
        isAttached: false,
        defaultSource: 'PACK',
        images: [
            {side: 'left', imageSrc: './assets/cpu/amd/gen photos/amd am5.png'},  
            {side: 'PACK', imageSrc: './assets/cpu/amd/am5/Ryzen 9 7900X3D.png'},  
        ],
        slots: [],
        ports: []
    }),
    new Component ({        // Ryzen 9 5900X
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
        images: [
            {side: 'left', imageSrc: './assets/cpu/amd/gen photos/amd am4.png'},  
            {side: 'PACK', imageSrc: './assets/cpu/amd/am4/Ryzen 9 5900X.png'},  
        ],
        slots: [],
        ports: []
    }),
    new Component ({        // Ryzen 7 7800X3D
        name: 'AMD Ryzen 7 7800X3D',
        type: 'cpu',
        size: 'AM5',
        dimensions: {
            depth: 125,
            width: 125,
            height: 125,
        },
        isRotatable: false,
        isAttached: false,
        defaultSource: 'PACK',
        images: [
            {side: 'left', imageSrc: './assets/cpu/amd/gen photos/amd am5.png'},  
            {side: 'PACK', imageSrc: './assets/cpu/amd/am5/7 7800X3D.png'},  
        ],
        slots: [],
        ports: []
    }),
    new Component ({        // Ryzen 7 5700G
        name: 'AMD Ryzen 7 5700G',
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
        images: [
            {side: 'left', imageSrc: './assets/cpu/amd/gen photos/amd am4.png'},  
            {side: 'PACK', imageSrc: './assets/cpu/amd/am4/Ryzen 7 5700G.png'},  
        ],
        slots: [],
        ports: []
    }),
    new Component ({        // Ryzen 5 7600X
        name: 'AMD Ryzen 5 7600X',
        type: 'cpu',
        size: 'AM5',
        dimensions: {
            depth: 125,
            width: 125,
            height: 125,
        },
        isRotatable: false,
        isAttached: false,
        defaultSource: 'PACK',
        images: [
            {side: 'left', imageSrc: './assets/cpu/amd/gen photos/amd am5.png'},  
            {side: 'PACK', imageSrc: './assets/cpu/amd/am5/Ryzen 5 7600X.png'},  
        ],
        slots: [],
        ports: []
    }),
    new Component ({        // Ryzen 5 5600GT
        name: 'AMD Ryzen 5 5600GT',
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
        images: [
            {side: 'left', imageSrc: './assets/cpu/amd/gen photos/amd am4.png'},  
            {side: 'PACK', imageSrc: './assets/cpu/amd/am4/Ryzen 5 5600GT.png'},  
        ],
        slots: [],
        ports: []
    }),
    new Component ({        // Ryzen 3 8300G
        name: 'AMD Ryzen 3 8300G',
        type: 'cpu',
        size: 'AM5',
        dimensions: {
            depth: 125,
            width: 125,
            height: 125,
        },
        isRotatable: false,
        isAttached: false,
        defaultSource: 'PACK',
        images: [
            {side: 'left', imageSrc: './assets/cpu/amd/gen photos/amd am5.png'},  
            {side: 'PACK', imageSrc: './assets/cpu/amd/am5/Ryzen 3 8300G.png'},  
        ],
        slots: [],
        ports: []
    }),
    new Component ({        // Ryzen 3 5300G
        name: 'AMD Ryzen 3 5300G',
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
        images: [
            {side: 'left', imageSrc: './assets/cpu/amd/gen photos/amd am4.png'},  
            {side: 'PACK', imageSrc: './assets/cpu/amd/am4/Ryzen 3 5300G.png'},  
        ],
        slots: [],
        ports: []
    }),

    // PSU [Fully modular]
    new Component ({        // EVGA Supernova 1300 P+
        name: 'EVGA Supernova 1300 P+',
        type: 'psu',
        size: 'ATX',
        dimensions: {
            width: 200,
            height: 200,
        },
        isRotatable: true,
        isAttached: false,
        defaultSource: 'PACK',
        images: [
            {side: 'PACK', imageSrc: './assets/psu/EVGA/EVGA SuperNOVA/EVGA SuperNOVA 1300 P+ - pack.png'}, 
            {side: 'left', imageSrc: './assets/psu/EVGA/EVGA SuperNOVA/EVGA SuperNOVA 1300 P+ - left.png'}, 
            {side: 'front', imageSrc: './assets/psu/EVGA/EVGA SuperNOVA/EVGA SuperNOVA 1300 P+ - front.png'}, 
            {side: 'right', imageSrc: './assets/psu/EVGA/EVGA SuperNOVA/EVGA SuperNOVA 1300 P+ - right.png'}, 
            {side: 'rear', imageSrc: './assets/psu/EVGA/EVGA SuperNOVA/EVGA SuperNOVA 1300 P+ - rear.png'}
        ],
        slots: [],
        ports: [
            {
                type: '24-pin-power',
            },
            {
                type: '8-pin-power'
            },
            {
                type: '8-pin-power'
            },
            
        ],
        cables: [
            {
                type: '24-pin-power'
            },
            {
                type: '8-pin-power'
            },
            {
                type: '8-pin-power'
            }
        ]
    }),
    new Component ({        // Silverstone DA750r-gm
        name: 'Silverstone DA750r-gm',
        type: 'psu',
        size: 'ATX',
        dimensions: {
            depth: 200,
            width: 150,
            height: 86,
        },
        isRotatable: true,
        isAttached: false,
        defaultSource: 'PACK',
        images: [
            {side: 'PACK', imageSrc: './assets/psu/Silverstone technology co. Ltd/DA750r-gm/da750r-gm-10.png'}, 
            {side: 'left', imageSrc: './assets/psu/Silverstone technology co. Ltd/DA750r-gm/da750r-gm-5.png'}, 
            {side: 'front', imageSrc: './assets/psu/Silverstone technology co. Ltd/DA750r-gm/da750r-gm-2.png'}, 
            {side: 'right', imageSrc: './assets/psu/Silverstone technology co. Ltd/DA750r-gm/da750r-gm-3.png'}, 
            {side: 'rear', imageSrc: './assets/psu/Silverstone technology co. Ltd/DA750r-gm/da750r-gm-4.png'}
        ],
        slots: [],
        ports: [
            {
                type: '24-pin-power',
            },
            {
                type: '8-pin-power'
            },
            {
                type: '8-pin-power'
            },
            
        ],
        cables: [
            {
                type: '24-pin-power'
            },
            {
                type: '8-pin-power'
            },
            {
                type: '8-pin-power'
            }
        ]
    }),
    new Component ({        // Silverstone DA850r-gm
        name: 'Silverstone DA850r-gm',
        type: 'psu',
        size: 'ATX',
        dimensions: {
            depth: 200,
            width: 150,
            height: 86,
        },
        isRotatable: true,
        isAttached: false,
        defaultSource: 'PACK',
        images: [
            {side: 'PACK', imageSrc: './assets/psu/Silverstone technology co. Ltd/DA850r-gm/da850r-gm-10.png'}, 
            {side: 'left', imageSrc: './assets/psu/Silverstone technology co. Ltd/DA850r-gm/da850r-gm-5.png'}, 
            {side: 'front', imageSrc: './assets/psu/Silverstone technology co. Ltd/DA850r-gm/da850r-gm-2.png'}, 
            {side: 'right', imageSrc: './assets/psu/Silverstone technology co. Ltd/DA850r-gm/da850r-gm-3.png'}, 
            {side: 'rear', imageSrc: './assets/psu/Silverstone technology co. Ltd/DA850r-gm/da850r-gm-4.png'}
        ],
        slots: [],
        ports: [
            {
                type: '24-pin-power',
            },
            {
                type: '8-pin-power'
            },
            {
                type: '8-pin-power'
            },
            
        ],
        cables: [
            {
                type: '24-pin-power'
            },
            {
                type: '8-pin-power'
            },
            {
                type: '8-pin-power'
            }
        ]
    }),
    new Component ({        // Silverstone DA1000r-gm
        name: 'Silverstone DA1000r-gm',
        type: 'psu',
        size: 'ATX',
        dimensions: {
            depth: 200,
            width: 150,
            height: 86,
        },
        isRotatable: true,
        isAttached: false,
        defaultSource: 'PACK',
        images: [
            {side: 'PACK', imageSrc: './assets/psu/Silverstone technology co. Ltd/DA1000r-gm/da1000r-gm-23.png'}, 
            {side: 'left', imageSrc: './assets/psu/Silverstone technology co. Ltd/DA1000r-gm/da1000r-gm-10.png'}, 
            {side: 'front', imageSrc: './assets/psu/Silverstone technology co. Ltd/DA1000r-gm/da1000r-gm-7.png'}, 
            {side: 'right', imageSrc: './assets/psu/Silverstone technology co. Ltd/DA1000r-gm/da1000r-gm-9.png'}, 
            {side: 'rear', imageSrc: './assets/psu/Silverstone technology co. Ltd/DA1000r-gm/da1000r-gm-8.png'}
        ],
        slots: [],
        ports: [
            {
                type: '24-pin-power',
            },
            {
                type: '8-pin-power'
            },
            {
                type: '8-pin-power'
            },
            
        ],
        cables: [
            {
                type: '24-pin-power'
            },
            {
                type: '8-pin-power'
            },
            {
                type: '8-pin-power'
            }
        ]
    }),
    new Component ({        // Silvestone EX850r-pm
        name: 'Silverstone EX850r-pm',
        type: 'psu',
        size: 'ATX',
        dimensions: {
            depth: 200,
            width: 150,
            height: 86,
        },
        isRotatable: true,
        isAttached: false,
        defaultSource: 'PACK',
        images: [
            {side: 'PACK', imageSrc: './assets/psu/Silverstone technology co. Ltd/EX850r-pm/ex850r-pm-21.png'}, 
            {side: 'left', imageSrc: './assets/psu/Silverstone technology co. Ltd/EX850r-pm/ex850r-pm-9.png'}, 
            {side: 'front', imageSrc: './assets/psu/Silverstone technology co. Ltd/EX850r-pm/ex850r-pm-7.png'}, 
            {side: 'right', imageSrc: './assets/psu/Silverstone technology co. Ltd/EX850r-pm/ex850r-pm-10.png'}, 
            {side: 'rear', imageSrc: './assets/psu/Silverstone technology co. Ltd/EX850r-pm/ex850r-pm-8.png'}
        ],
        slots: [],
        ports: [
            {
                type: '24-pin-power',
            },
            {
                type: '8-pin-power'
            },
            {
                type: '8-pin-power'
            },
            
        ],
        cables: [
            {
                type: '24-pin-power'
            },
            {
                type: '8-pin-power'
            },
            {
                type: '8-pin-power'
            }
        ]
    }),
    new Component ({        // Silverstone EX1200r-pl
        name: 'Silverstone EX1200r-pl',
        type: 'psu',
        size: 'ATX',
        dimensions: {
            depth: 200,
            width: 150,
            height: 86,
        },
        isRotatable: true,
        isAttached: false,
        defaultSource: 'PACK',
        images: [
            {side: 'PACK', imageSrc: './assets/psu/Silverstone technology co. Ltd/EX1200r-pl/ex1200r-pm-21.png'}, 
            {side: 'left', imageSrc: './assets/psu/Silverstone technology co. Ltd/EX1200r-pl/ex1200r-pl-9.png'}, 
            {side: 'front', imageSrc: './assets/psu/Silverstone technology co. Ltd/EX1200r-pl/ex1200r-pl-7.png'}, 
            {side: 'right', imageSrc: './assets/psu/Silverstone technology co. Ltd/EX1200r-pl/ex1200r-pl-10.png'}, 
            {side: 'rear', imageSrc: './assets/psu/Silverstone technology co. Ltd/EX1200r-pl/ex1200r-pl-8.png'}
        ],
        slots: [],
        ports: [
            {
                type: '24-pin-power',
            },
            {
                type: '8-pin-power'
            },
            {
                type: '8-pin-power'
            },
            
        ],
        cables: [
            {
                type: '24-pin-power'
            },
            {
                type: '8-pin-power'
            },
            {
                type: '8-pin-power'
            }
        ]
    }),
    // PSU [Non modular]

  //  new Component ({        // EVGA Supernova 1300 P+
  //      name: 'EVGA Supernova 1300 P+, 80+ Platinum 1300W',
  //      type: 'psu',
  //      size: 'ATX',
  //      dimensions: {
  //          depth: 200,
  //          width: 150,
  //          height: 86,
  //      },
  //      isRotatable: true,
  //      isAttached: false,
  //      defaultSource: 'left',
  //      images: [
  //          {side: 'left', imageSrc: './assets/psu/EVGA SuperNOVA 1300 P+ - left.png'}, 
  //          {side: 'front', imageSrc: './assets/psu/EVGA SuperNOVA 1300 P+ - front.png'}, 
  //          {side: 'right', imageSrc: './assets/psu/EVGA SuperNOVA 1300 P+ - right.png'}, 
  //          {side: 'rear', imageSrc: './assets/psu/EVGA SuperNOVA 1300 P+ - rear.png'}
  //      ],
  //      slots: [],
  //      ports: [
  //          {
  //              type: '24-pin-power',
  //          },
  //          {
  //              type: '8-pin-power'
  //          },
  //          {
  //              type: '8-pin-power'
  //          },
  //          
  //      ],
  //      cables: [
  //          {
  //              type: '24-pin-power'
  //          },
  //          {
  //              type: '8-pin-power'
  //          },
  //          {
  //              type: '8-pin-power'
  //          }
  //      ]
  //  }),

    // Storage HDD
    new Component ({
        name: 'Seagate Barracuda 8tb',
        type: 'storage',
        size: 'hdd',
        dimensions: {
            depth: 125,
            width: 125,
            height: 125,
        },
        isRotatable: false,
        isAttached: false,
        defaultSource: 'PACK',
        images: [
            {side: 'left', imageSrc: './assets/storage/defaulthdd.png'},  
            {side: 'right', imageSrc: './assets/storage/defaulthdd.png'},   
            {side: 'PACK', imageSrc: './assets/storage/Seagate Barracuda 8tb.png'},  
        ],
        slots: [],
        ports: []
     }),
     // Storage SSD [types of ssd nvme,sata ssd and sata m.2][m.2 is the form factor][2.5" SATA is the hard drive ssd][sata m.2 uses B socket while nvme uses M key socket]
    //  sata ssd
  //  new Component ({
  //      name: '',
  //      type: 'sata',
  //      size: 'ssd',
  //      dimensions: {
  //          depth: 125,
  //          width: 125,
  //          height: 125,
  //      },
  //      isRotatable: false,
  //      isAttached: false,
  //      defaultSource: 'pack',
  //      images: [
  //          {side: 'front', imageSrc: './assets/'},  
  //          {side: 'left', imageSrc: './assets/'},  
  //      ],
  //      slots: [],
  //      ports: []
  //  }),
    //  sata m.2
  //  new Component ({
   //     name: '',
   //     type: 'sata1',
   //     size: 'ssd',
   //     dimensions: {
   //         depth: 125,
   //         width: 125,
   //         height: 125,
   //     },
   //     isRotatable: false,
   //     isAttached: false,
   //     defaultSource: 'pack',
   //     images: [
   //         {side: 'pack', imageSrc: './assets/'},  
   //         {side: 'left', imageSrc: './assets/'},  
   //     ],
   //     slots: [],
   //     ports: []
  //  }),
    //  nvme m.2
 //   new Component ({
  //      name: '',
  //      type: 'nvme',
  //      size: 'ssd',
  //      dimensions: {
  //          depth: 125,
  //          width: 125,
  //          height: 125,
  //      },
  //      isRotatable: false,
  //      isAttached: false,
  //      defaultSource: 'pack',
  //      images: [
  //          {side: 'pack', imageSrc: './assets/'},  
  //          {side: 'left', imageSrc: './assets/'},  
  //      ],
  //      slots: [],
  //      ports: []
 //   }),
 // Cooling AMD
new Component ({ //AMD wraith Prism
    name: 'AMD wraith Prism',
    type: 'cooling',
    size: 'amd',
    dimensions: {
        width: 125,
        height: 125,
    },
    isRotatable: false,
    isAttached: false,
    defaultSource: 'pack',
    images: [
        {side: 'pack', imageSrc: './assets/cooling/amd wraith prism pack.png'},  
        {side: 'left', imageSrc: './assets/cooling/amd wraith prism fan.png'}
    ],
    slots: [],
    ports: []
}), 
new Component ({ //AMD wraith Spire
    name: 'AMD wraith Spire',
    type: 'cooling',
    size: 'amd',
    dimensions: {
        width: 125,
        height: 125,
    },
    isRotatable: false,
    isAttached: false,
    defaultSource: 'pack',
    images: [
        {side: 'pack', imageSrc: './assets/cooling/amd wraith spire pack.png'},  
        {side: 'left', imageSrc: './assets/cooling/amd wraith spire.png'}
    ],
    slots: [],
    ports: []
}),  
    // Cooling Intel
 new Component ({
     name: 'Intel Laminar RH1 cooling fan',
     type: 'cooling',
     size: 'intel',
     dimensions: {
         width: 125,
         height: 125,
     },
     isRotatable: false,
     isAttached: false,
     defaultSource: 'pack',
     images: [
         {side: 'pack', imageSrc: './assets/cooling/intel laminar pack.png'},  
         {side: 'left', imageSrc: './assets/cooling/intel laminar rh1.png'},  
     ],
     slots: [],
     ports: []
 }),
 new Component ({
    name: 'Intel Laminar RM1 cooling fan',
    type: 'cooling',
    size: 'intel',
    dimensions: {
        width: 125,
        height: 125,
    },
    isRotatable: false,
    isAttached: false,
    defaultSource: 'pack',
    images: [
        {side: 'pack', imageSrc: './assets/cooling/intel laminar pack.png'},  
        {side: 'left', imageSrc: './assets/cooling/intel laminar rm1.png'},  
    ],
    slots: [],
    ports: []
}),
    // RAM DDR4
  new Component ({
      name: 'Kingston HyperX Beast RGB DDR4',
      type: 'ram',
      size: 'ddr4',
      dimensions: {
          width: 80,
          height: 100,
      },
      isRotatable: false,
      isAttached: false,
      defaultSource: 'PACK',
      images: [
          {side: 'left', imageSrc: './assets/memory/HyperX Beast RGB DDR4 attached.png'},  
          {side: 'PACK', imageSrc: './assets/memory/HyperX Beast RGB DDR4 pack.png'},  
      ],
 }),
 
 //  RAM DDR5
 //   new Component ({
 //      name: '',
 //      type: 'ddr5',
 //      dimensions: {
 //          depth: 125,
 //          width: 125,
 //          height: 125,
 //      },
 //      isRotatable: false,
 //      isAttached: false,
 //      defaultSource: 'pack',
 //      images: [
 //          {side: 'left', imageSrc: './assets/'},  
 //          {side: 'pack', imageSrc: './assets/'},  
 //      ],
 //      slots: [],
 //      ports: []
 //   }),
 
 //GPU [gpu file is for general left side img assets] [gpu.1 is for pack side img assets]
 new Component ({        // Gigabyte Radeon RX 7900 XTX
    name: 'Gigabyte Radeon RX 7900 XTX',
    type: 'gpu',
    size: '',
    dimensions: {
        width: 200,
        height: 200,
    },
    isRotatable: false,
    isAttached: false,
    defaultSource: 'PACK',
    images: [
        {side: 'left', imageSrc: './assets/gpu/Gigabyte Radeon RX 7900 XTX.png'}, 
        {side: 'rear', imageSrc: './assets/gpu/rear.png'}, 
        {side: 'PACK', imageSrc: './assets/gpu.1/gigabyte radeon rx 7900 xtx.png'}
    ],
    slots: [],
    ports: [
        {
            type: '8-pin-power'
        }    
    ]  
}),
new Component ({        // Intel ARC A750
    name: 'Intel ARC A750',
    type: 'gpu',
    size: '',
    dimensions: {
        width: 200,
        height: 200,
    },
    isRotatable: false,
    isAttached: false,
    defaultSource: 'PACK',
    images: [
        {side: 'rear', imageSrc: './assets/gpu/rear1.png'}, 
        {side: 'left', imageSrc: './assets/gpu/Intel.png'}, 
        {side: 'PACK', imageSrc: './assets/gpu.1/intel arc.png'}
    ],
    slots: [],
    ports: [
        {
            type: '8-pin-power'
        }    
    ]  
}),

]

components.forEach(component => {
    Component.handleComponent(component)
})

export default components