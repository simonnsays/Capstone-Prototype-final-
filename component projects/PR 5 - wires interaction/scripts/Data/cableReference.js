const cableRef = {
    psu: [
        {
            type: '24-pin',
            connectsTo: 'motherboard',
            images: [
                {
                    state: 'attached1', 
                    imageSrc: './assets/wires/24pin-attached(mobo).png' 
                },
                {
                    state: 'attached2', 
                    imageSrc: './assets/wires/(10+18)24pin-attached(psu).png' 
                },
                {
                    state: 'default', 
                    imageSrc: './assets/wires/24pin-mobo-power.png' 
                },
            ],
            scale: {width: 1, height: 1.47}, // will be used in matching cable to port
            
        }
    ]
}

export default cableRef