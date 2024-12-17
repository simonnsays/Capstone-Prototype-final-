const portRef = {
    motherboard: [
        {   // ATX - Power
            name: 'Motherboard Main Power',
            type: '24-pin-power',
            style: 'single',
            image: {
                // port image will be used in the div with the class of 'port('.port')'
                imageSrc: './assets/motherboard/ports/mobo-24pin-power.png',
            },
            
            // will be used in highlights
            offset: {
                first: {
                    top: 26,
                    left: 145,
                    width: 34, // used in highlight sizes
                    height: 180,
                    cableAttached: null,
                    takes: '24-pin-power',
                }
            },
        },
        {   // 8pin - power
            name: 'CPU Power',
            type: '8-pin-power',
            style:'split',
            image: {
                imageSrc: './assets/motherboard/ports/mobo_port-cpu.png',
            },
            offset: {  // for ports that share the same image
                first: {
                    top: 87, 
                    left: 43,
                    width: 100, 
                    height: 58,
                    
                    takes: '8-pin-power',
                    cableAttached: null
                },
                
                second: {
                    top: 87, 
                    left: 143,
                    width: 100, 
                    height: 58,

                    takes: '8-pin-power',
                    cableAttached: null
                }
            }    
        },
        {   // sata - data
            name: 'CPU EPS Connector',
            type: 'sata-data',
            style: 'single',
            image: {
                imageSrc: './assets/motherboard/ports/mobo_port-sata.png',
            },
            offset: {  // for ports that share the same image
                first: {
                    top: 97, 
                    left: 65,
                    width: 140, 
                    height: 57,
                    cableAttached: null,
                    takes: 'sata-data',
                }  
            },
        },
        {   // cooling
            type: 'cooling',
            style: 'single',
            image: {
                imageSrc: './assets/motherboard/ports/mobo_port-fan.png',
            },
            offset: {
                first: {
                    top: 85,
                    left: 110,
                    width: 69,
                    height: 40,
                    cableAttached: null,
                    takes: '3-pin-cooling',
                }
            },
        },
        {   // front panel
            type: 'frontPanel',
            style: 'single',
            image: {
                imageSrc: './assets/motherboard/ports/mobo_port-fpanel.png',
            },
            offset: {
                first: {
                    top: 97,
                    left: 33,
                    width: 110,
                    height: 45,
                    cableAttached: null,
                    takes: 'frontPanel',
                }
            },
        },
    ],
    psu: [
        {   // ATX - power
            type: '24-pin-power',
            style: 'single',
            image: {
                imageSrc: './assets/psu/ports/ATX.png',
            },
            offset: {
                first: {
                    top: 84,
                    left: 23,
                    width: 235,
                    height: 58,
                    cableAttached: null,
                    takes: '24-pin-power',
                }
            },
        },
        {   // 8pin - power
            type: '8-pin-power',
            style: 'single',
            image: {
                imageSrc: './assets/psu/ports/cpu.png',
            },
            offset: { 
                first: {
                    top: 77,
                    left: 69,
                    width: 147,
                    height: 116,
                    cableAttached: null,
                    takes: '8-pin-power',
                }
            },
        },
        {   // 8pin - pcie
            type: '8-pin-pcie',
            style: 'single',
            image: {
                imageSrc: './assets/psu/ports/vga(pcie)-power.png',
            },
            offset: {
                first: {
                    top: 83,
                    left: 79,
                    width: 121,
                    height: 97,
                    cableAttached: null,
                    takes: '8-pin-pcie',
                }
            },
        },
        {   // 6pin - pcie
            type: '6-pin-pcie',
            style: 'single',
            image: {
                imageSrc: './assets/psu/ports/perif.png',
            },
            offset: {
                first: {
                    top: 110,
                    left: 79,
                    width: 121,
                    height: 90,
                    cableAttached: null,
                    takes: '6-pin-pcie',
                }
            },
        },
        {   // sata - power
            type: 'sata-power',
            style: 'single',
            image: {
                imageSrc: './assets/psu/ports/sata.png',
            },
            offset: {
                first: {
                    top: 31,
                    left: 71,
                    width: 147,
                    height: 147,
                    cableAttached: null,
                    takes: 'sata-power',
                }
            },
        },
        {   //12vhpwr
            type: '12vhpwr',
            style: 'single',
            image: {
                imageSrc: './assets/psu/ports/12vhpwr.png',
            },
            offset: {
                first: {
                    top: 83,
                    left: 76,
                    width: 140,
                    height: 91,
                    cableAttached: null,
                    takes: '12vhpwr',
                }
            },
        },
        {   //non-modular
            type: 'non-modular',
            // style: 'single',
            image: {
                imageSrc: './assets/psu/ports/nonmod.png',
            },
        }
       
    ],
    gpu: [
        {   // 8+8 pin - pcie for data.js add to port 16-pin-pcie
            type: '16-pin-pcie',
            style: 'split',
            image: {
                imageSrc: './assets/gpu/ports/8+8pin_power.png',
            },
            
            offset: { 
                first: {
                    top: 107,
                    left: 61,
                    width: 88,
                    height: 57,
                    
                    takes: '8-pin-pcie',
                    cableAttached: null
                },
                
                second: {
                    top: 107,
                    left: 149, 
                    width: 88,
                    height: 57, 

                    takes: '8-pin-pcie',
                    cableAttached: null
                }
            } , 
        },
        {   // 8+6 pin - pcie for data.js add to port 14-pin-pcie
            type: '14-pin-pcie',
            style: 'split',
            image: {
                imageSrc: './assets/gpu/ports/8+6pin_power.png',
            },
            offset: { 
                first: {
                    top: 53,
                    left: 31,
                    width: 90,
                    height: 90,
                    
                    takes: '8-pin-pcie',
                    cableAttached: null
                },
                
                second: {
                    top: 107,
                    left: 149, 
                    width: 88,
                    height: 57, 

                    takes: '6-pin-pcie',
                    cableAttached: null
                }
            } , 
        },
        {   // 12vhpwr for data.js add to port 14-pin-pcie
            type: '12vhpwr',
            style: 'single',
            image: {
                imageSrc: './assets/gpu/ports/12vhpwr.png',
            },
            
            offset: { 
                first: {
                    top: 87,
                    left: 94,
                    width: 120,
                    height: 60,
                    cableAttached: null,
                    takes: '12vhpwr',
                }
            },
        },
        {   // 8pin - pcie
            type: '8-pin-pcie',
            style: 'single',
            image: {
                imageSrc: './assets/gpu/ports/8pin_power.png',
            },
            
            offset: { 
                first:{
                    top: 70,
                    left: 80,
                    width: 130,
                    height: 80,
                    takes: '8-pin-pcie',
                    cableAttached: null,
                }
            } ,
        },
        {   // 6pin - pcie
            type: '6-pin-pcie',
            style: 'single',
            image: {
                imageSrc: './assets/gpu/ports/6pin_power.png',
            },
            
            offset: { 
                first: {
                    top: 60,
                    left: 50,
                    width: 170,
                    height: 110,
                    takes: '6-pin-pcie',
                    cableAttached: null
                }
            }, 
        },
    ],
    storage: [
        {   // sata (data + power)
            type: 'sata',
            style: 'split',
            image: {
                imageSrc: './assets/storage/ports/sata-power+data.png',
            },
            
            offset: { 
                first: {
                    top: 114,
                    left: 52,
                    width: 112,
                    height: 23,
                    
                    takes: 'sata-power',
                    cableAttached: null
                },
                
                second: {
                    top: 114,
                    left: 167, 
                    width: 69,
                    height: 23, 

                    takes: 'sata-data',
                    cableAttached: null
                }
            }
        },
    ]
}

export default portRef