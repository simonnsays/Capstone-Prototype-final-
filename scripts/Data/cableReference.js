const cableRef = {
    psu: [
        {       // 24-pin-power
            name: 'ATX power',
            type: '24-pin-power',
            ends: {
                motherboard: {
                    connected: false

                },
                psu: {
                    connected: false
                }
            },
            images: [
                {
                    attachedTo: 'motherboard', 
                    imageSrc: './assets/wires/ATX-power/ATX-power-attached(mobo).png',
                    scale: {width: 1, height: 1.47}, // will be used in matching cable to port
                    offset: {top: 26, left: 145}
                },
                {
                    attachedTo: 'psu', 
                    imageSrc: './assets/wires/ATX-power/ATX-power-attached(psu).png',
                    scale: {width: .45, height: .45}, // will be used in matching cable to port 
                    offset: {top: 84, left: 23}
                },
                {
                    attachedTo: 'none', 
                    imageSrc: './assets/wires/ATX-power/ATX-power-default.png' 
                },
            ],
        },
        {       // 8-pin-power
            name: 'CPU Power',
            type: '8-pin-power',
            ends: {
                motherboard: {
                    connected: false

                },
                psu: {
                    connected: false
                }
            },
            images: [
                {
                    attachedTo: 'motherboard', 
                    imageSrc: './assets/wires/8pin-power/8pin-power-attached(gen).png',
                    scale: {width: .92, height: .9}, // will be used in matching cable to port
                    offset: {       // for cable components that share ports on the same image 
                        first: {top: -25, left: 12},
                        second: {top: -25, left: 112}
                    }
                },
                {
                    attachedTo: 'psu', 
                    imageSrc: './assets/wires/8pin-power/8pin-power-attached(gen).png',
                    scale: {width: 1.27, height: 1.1}, // will be used in matching cable to port 
                    offset: {top: -13, left: 30}
                },
                {
                    attachedTo: 'none', 
                    imageSrc: './assets/wires/8pin-power/8pin-power-default.png' 
                },
            ],
        },
        {       // 8-pin-pcie
            name: 'PCIe power',
            type: '8-pin-pcie',
            ends: {
                gpu: {
                    connected: false

                },
                psu: {
                    connected: false
                }
            },
            images: [
                {
                    attachedTo: 'gpu', 
                    imageSrc: './assets/wires/8pin-pcie/8pin-pcie-attached(gen).png',
                    scale: {width: 1.31, height: 1.1}, 
                    offset: {       
                        first: {top: 113, left: 36},
                        second: {top: 113, left: 125}
                    }
                },
                {
                    attachedTo: 'psu', 
                    imageSrc: './assets/wires/8pin-pcie/8pin-pcie-attached(gen).png',
                    scale: {width: 1.8, height: 2.1},
                    offset: {top: 86, left: 42}
                },
                {
                    attachedTo: 'none', 
                    imageSrc: './assets/wires/8pin-pcie/8pin-pcie-default.png' 
                },
            ],
        },
    ],
    storage: [
        {       // sata - power
            name: 'Sata power',
            type: 'sata-power',
            ends: {
                storage: {
                    connected: false

                },
                psu: {
                    connected: false
                }
            },
            images: [
                {
                    attachedTo: 'storage', 
                    imageSrc: './assets/wires/sata-power/sata-power-attached(sata).png',
                    scale: {width: 1.35, height: .8}, 
                    offset: {top: 115, left: 55}
                },
                {
                    attachedTo: 'psu', 
                    imageSrc: './assets/wires/sata-power/sata-power-attached(psu).png',
                    scale: {width: 1.66, height: 1.2}, 
                    offset: {top: -40, left: 17}
                },
                {
                    attachedTo: 'none', 
                    imageSrc: './assets/wires/sata-power/sata-power-default.png' 
                },
            ],
        },
        {       // sata - data
            name: 'Sata data',
            type: 'sata-data',
            ends: {
                storage: {
                    connected: false

                },
                motherboard: {
                    connected: false
                }
            },
            images: [
                {
                    attachedTo: 'storage', 
                    imageSrc: './assets/wires/sata-data/sata-data-attached(gen).png',
                    scale: {width: .9, height: .8}, 
                    offset: {top: 113, left: 165}
                },
                {
                    attachedTo: 'motherboard', 
                    imageSrc: './assets/wires/sata-data/sata-data-attached(gen).png',
                    scale: {width: 2, height: 1.8}, 
                    offset: {top: 93, left: 67}
                },
                {
                    attachedTo: 'none', 
                    imageSrc: './assets/wires/sata-data/sata-data-default.png' 
                },
            ],
        },
    ],
    cooling: [
        {       // fan
            name: '3-pin-cooling',
            type: '3-pin-cooling',
            ends: {
                cooling: {
                    connected: true

                },
                motherboard: {
                    connected: false
                }
            },
            images: [
                {
                    attachedTo: 'motherboard', 
                    imageSrc: './assets/wires/3pin-cooling/3-pin-cooling-attached(gen).png',
                    scale: {width: .33, height: .4}, 
                    offset: {top: 85, left: -86}
                },
                {
                    attachedTo: 'none', 
                    imageSrc: './assets/wires/3pin-cooling/3-pin-cooling-default.png'
                }
            ],
        }
    ]
}

export default cableRef