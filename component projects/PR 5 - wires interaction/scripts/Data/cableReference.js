const cableRef = {
    psu: [
        {
            type: '24-pin',
            connectsTo: 'motherboard',
            images: [
                {
                    attachedTo: 'motherboard', 
                    imageSrc: './assets/wires/24pin-attached(mobo).png',
                    scale: {width: 1, height: 1.47}, // will be used in matching cable to port
                },
                {
                    attachedTo: 'psu', 
                    imageSrc: './assets/wires/(10+18)24pin-attached(psu).png',
                    scale: {width: .45, height: .45}, // will be used in matching cable to port 
                },
                {
                    attachedTo: 'none', 
                    imageSrc: './assets/wires/24pin-mobo-power.png' 
                },
            ],
            
            
        }
    ]
}

export default cableRef