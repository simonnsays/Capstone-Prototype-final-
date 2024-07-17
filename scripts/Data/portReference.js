    const portRef = {
        motherboard: [
            {   // ATX - Power
                type: '24-pin-power',
                image: {
                    // port image will be used in the div with the class of 'port('.port')'
                    imageSrc: './assets/motherboard/ports/mobo-24pin-power.png',
                },
                
                // will be used in highlights
                offset: {
                    top: 26,
                    left: 145,
                    width: 34, // used in highlight sizes
                    height: 180
                },
                cableAttached: null,
                takes: '24-pin-power',
            },
            {   // 8pin - power
                name: 'CPU EPS Connector',
                type: '8-pin-power',
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
                image: {
                    imageSrc: './assets/motherboard/ports/mobo_port-sata.png',
                },
                offset: {  // for ports that share the same image
                    top: 97, 
                    left: 65,
                    width: 140, 
                    height: 57,
                },
                cableAttached: null,
                takes: 'sata-data',
            },
        ],
        psu: [
            {   // ATX - power
                type: '24-pin-power',
                image: {
                    imageSrc: './assets/psu/ports/ATX.png',
                },
                
                offset: {
                    top: 84,
                    left: 23,
                    width: 235,
                    height: 58
                },
                cableAttached: null,
                takes: '24-pin-power',
                
            },
            {   // 8pin - power
                type: '8-pin-power',
                image: {
                    imageSrc: './assets/psu/ports/cpu.png',
                },
                
                offset: {
                    top: 77,
                    left: 69,
                    width: 147,
                    height: 116
                },
                cableAttached: null,
                takes: '8-pin-power',
            },
            {   // 8pin - pcie
                type: '8-pin-pcie',
                image: {
                    imageSrc: './assets/psu/ports/vga(pcie)-power.png',
                },
                
                offset: {
                    top: 83,
                    left: 79,
                    width: 121,
                    height: 97
                },
                cableAttached: null,
                takes: '8-pin-pcie',
            },
            {   // sata - power
                type: 'sata-power',
                image: {
                    imageSrc: './assets/psu/ports/sata.png',
                },
                offset: {
                    top: 31,
                    left: 71,
                    width: 147,
                    height: 147
                },
                cableAttached: null,
                takes: 'sata-power',
            },
        ],
        gpu: [
            {   // 8pin - pcie
                type: '8-pin-pcie',
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
                cableAttached: null
            },
        ],
        storage: [
            {   // sata (data + power)
                type: 'sata',
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