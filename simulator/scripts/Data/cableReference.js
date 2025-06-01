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
            images: {
                single: [
                    {
                        attachedTo: 'motherboard', 
                        imageSrc: './assets/wires/ATX-power/ATX-power-attached(mobo).png',
                        scale: {width: 1, height: 1.47}, // will be used in matching cable to port
                        offsets: [{top: 26, left: 145}]
                    },
                    {
                        attachedTo: 'psu', 
                        imageSrc: './assets/wires/ATX-power/ATX-power-attached(psu).png',
                        scale: {width: .45, height: .45}, // will be used in matching cable to port 
                        offsets: [{top: 84, left: 23}]
                    },
                ],
                drawer: {
                    attachedTo: 'none', 
                    imageSrc: './assets/wires/ATX-power/ATX-power-default.png' 
                },
            }
        },
        {       // 8-pin-power
            name: 'CPU Connector',
            type: '8-pin-power',
            ends: {
                motherboard: {
                    connected: false

                },
                psu: {
                    connected: false
                }
            },
            images: {
                single: [
                    {
                        attachedTo: 'psu', 
                        imageSrc: './assets/wires/8pin-power/8pin-power-attached(gen).png',
                        scale: {width: 1.27, height: 1.1}, // will be used in matching cable to port 
                        offsets: [{top: -13, left: 30}]
                    },
                ],
                split: [
                    {
                        attachedTo: 'motherboard', 
                        imageSrc: './assets/wires/8pin-power/8pin-power-attached(gen).png',
                        scale: {width: .92, height: .9}, // will be used in matching cable to port
                        offsets: [{top: -25, left: 12}, {top: -25, left: 112}]
                        
                    },
                ],
                drawer: {
                    attachedTo: 'none', 
                    imageSrc: './assets/wires/8pin-power/8pin-power-default.png' 
                },
            } 
        },
        {       // 8-pin-pcie
            name: '8pin PCIe Connector',
            type: '8-pin-pcie',
            ends: {
                gpu: {
                    connected: false

                },
                psu: {
                    connected: false
                }
            },
            images: {
                split: [
                    {
                        attachedTo: 'gpu', 
                        imageSrc: './assets/wires/8pin-pcie/8pin-pcie-attached(gen).png',
                        scale: {width: 1.31, height: 1.1}, 
                        offsets: [{top: 113, left: 36}, {top: 113, left: 125}]
                    },
                    {
                        attachedTo: 'psu', 
                        imageSrc: './assets/wires/8pin-pcie/8pin-pcie-attached(gen).png',
                        scale: {width: 1.8, height: 2.1},
                        offsets: [{top: 86, left: 42}]
                    },
                ],
                single: [
                    {
                        attachedTo: 'gpu', 
                        imageSrc: './assets/wires/8pin-pcie/8pin-pcie-attached(gen).png',
                        scale: {width: 1.9, height: 1.1}, 
                        offsets: [{top: 65, left: 45 }]
                    },
                    {
                        attachedTo: 'psu', 
                        imageSrc: './assets/wires/8pin-pcie/8pin-pcie-attached(gen).png',
                        scale: {width: 1.8, height: 2.1},
                        offsets: [{top: 86, left: 42}]
                    },
                ],
                drawer: {
                    attachedTo: 'none', 
                    imageSrc: './assets/wires/8pin-pcie/8pin-pcie-default.png' 
                },
            },
            
        },
        {       // 14-pin-pcie
            name: '8+6 PCIe power',
            type: '14-pin-pcie',
            ends: {
                gpu: {
                    connected: false

                },
                psu: {
                    connected: false
                }
            },
            images: {
                single: [
                    {
                        attachedTo: 'gpu', 
                        imageSrc: './assets/wires/8pin-pcie/8pin-pcie-attached(gen).png',
                        scale: {width: 1.31, height: 1.1}, 
                        offsets: [{top: 113, left: 36}, {top: 113, left: 125}]
                    },
                    {
                        attachedTo: 'psu', 
                        imageSrc: './assets/wires/8pin-pcie/8pin-pcie-attached(gen).png',
                        scale: {width: 1.8, height: 2.1},
                        offsets: [{top: 86, left: 42}]
                    },
                ],
                drawer: {
                    attachedTo: 'none', 
                    imageSrc: './assets/wires/8pin-pcie/8pin-pcie-default.png' 
                },
            }
        },
        {       // 12vhpwr
            name: '12v HighPower',
            type: '12vhpwr',
            ends: {
                gpu: {
                    connected: false

                },
                psu: {
                    connected: false
                }
            },
            images: {
                single: [
                    {
                        attachedTo: 'gpu', 
                        imageSrc: './assets/wires/12vhpwr/12vhpwr-attached.png',
                        scale: {width: .8, height: .8}, 
                        offsets: [{top: 10, left: 24}]
                    },
                    {
                        attachedTo: 'psu', 
                        imageSrc: './assets/wires/12vhpwr/12vhpwr-attached.png',
                        scale: {width: .9, height: .9},
                        offsets: [{top: 8, left: 1}]
                    },
                ],
                drawer: {
                    attachedTo: 'none', 
                    imageSrc: './assets/wires/12vhpwr/12vhpwr.png' 
                }, 
            }
        },
        // {       // 8-pin-pcie
        //   name: 'Single PCIe power',
        //   type: '8-pin',
        //   ends: {
        //       gpu: {
        //           connected: false

        //       },
        //       psu: {
        //           connected: false
        //       }
        //   },
        //   images: [
        //       {
        //           attachedTo: 'gpu', 
        //           imageSrc: './assets/wires/8pin-pcie/8pin-pcie-attached(gen).png',
        //           scale: {width: 1.9, height: 1.1}, 
        //           offsets: {  
        //             first:{top: 65, left: 45 }, 
        //           }
        //       },
        //       {
        //           attachedTo: 'psu', 
        //           imageSrc: './assets/wires/8pin-pcie/8pin-pcie-attached(gen).png',
        //           scale: {width: 1.8, height: 2.1},
        //           offsets: {top: 86, left: 42}
        //       },
        //       {
        //           attachedTo: 'none', 
        //           imageSrc: './assets/wires/8pin-pcie/8pin-pcie-default.png' 
        //       },
        //   ],
        // },
        {       // 6-pin-pcie
            name: '6 pin pcie',
            type: '6-pin-pcie',
            ends: {
                gpu: {
                    connected: false

                },
                psu: {
                    connected: false
                }
            },
            images: {
                single: [
                    {
                        attachedTo: 'gpu', 
                        imageSrc: './assets/wires/6pin-pcie/6pin-attached.png',
                        scale: {width: 2.6, height: 2}, 
                        offsets: [{top: 60, left: 7}]
                    },
                    {
                        attachedTo: 'psu', 
                        imageSrc: './assets/wires/8pin-pcie/8pin-pcie-attached(gen).png',
                        scale: {width: 1.9, height: 2.1},
                        offsets: [{top: 110, left: 42}]
                    },
                    
                ],
                drawer: {
                    attachedTo: 'none', 
                    imageSrc: './assets/wires/6pin-pcie/6pin-power.png' 
                },
            }
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
            images: {
                split: [
                    {
                        attachedTo: 'storage', 
                        imageSrc: './assets/wires/sata-power/sata-power-attached(sata).png',
                        scale: {width: 1.35, height: .8}, 
                        offsets: [{top: 115, left: 55}, {top: 115, left: 55}]
                    },
                ],
                single: [
                    {
                        attachedTo: 'psu', 
                        imageSrc: './assets/wires/sata-power/sata-power-attached(psu).png',
                        scale: {width: 1.66, height: 1.2}, 
                        offsets: [{top: -40, left: 17}]
                    }, 
                ],
                drawer: {
                    attachedTo: 'none', 
                    imageSrc: './assets/wires/sata-power/sata-power-default.png' 
                },
            } 
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
            images: {
                split: [
                    {
                        attachedTo: 'storage', 
                        imageSrc: './assets/wires/sata-data/sata-data-attached(gen).png',
                        scale: {width: .9, height: .8}, 
                        offsets: [{top: 113, left: 165},{top: 113, left: 165}]
                    },
                ],
                single: [
                    {
                        attachedTo: 'motherboard', 
                        imageSrc: './assets/wires/sata-data/sata-data-attached(gen).png',
                        scale: {width: 2, height: 1.8}, 
                        offsets: [{top: 93, left: 67}]
                    },
                ],
                drawer: {
                    attachedTo: 'none', 
                    imageSrc: './assets/wires/sata-data/sata-data-default.png' 
                },
            }
        }
    ],
    cooling: [
        {       // fan
            name: 'Heatsink',
            type: '3-pin-cooling',
            ends: {
                cooling: {
                    connected: true

                },
                motherboard: {
                    connected: false
                }
            },
            images: {
                single: [
                    {
                        attachedTo: 'motherboard', 
                        imageSrc: './assets/wires/3pin-cooling/3-pin-cooling-attached(gen).png',
                        scale: {width: .33, height: .4}, 
                        offsets: [{top: 85, left: -86}]
                    },
                ],
                drawer: {
                    attachedTo: 'none', 
                    imageSrc: './assets/wires/3pin-cooling/3-pin-cooling-default.png'
                }
            }
        }
    ],
    chassis: [
        {       // front panel
            name: 'Front Panel',
            type: 'frontPanel',
            ends: {
                chassis: {
                    connected: true

                },
                motherboard: {
                    connected: false
                }
            },
            images: {
                single: [
                    {
                        attachedTo: 'motherboard', 
                        imageSrc: './assets/wires/frontPanel/frontPanel-attached(gen).png',
                        scale: {width: .58, height: .58}, 
                        offsets: [{top: 97, left: 33}]
                    },
                    
                ],
                drawer: {
                    attachedTo: 'none', 
                    imageSrc: './assets/wires/frontPanel/frontPanel-default.png'
                }
            } 
        }
    ]
}

export default cableRef