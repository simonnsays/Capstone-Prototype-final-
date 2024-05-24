const portRef = {
    motherboard: [
        {
            type: '24-pin',
            image: {
                // port image will be used in the div with the class of 'port('.port')'
                imageSrc: './assets/motherboard/ports/mobo-24pin-power.png',
            },
            
            // will be used in highlights
            offset: {
                top: 26, // will also be used in attached cable offset
                left: 145,
                width: 34, // used in highlight sizes
                height: 180
            }
            
        }
    ],
    psu: [
        {
            type: '24-pin',
            image: {
                // port image will be used in the div with the class of 'port('.port')'
                imageSrc: './assets/psu/ports/psu-port-10+18.png',
            },
            
            // will be used in highlights
            offset: {
                top: 84, // will also be used in attached cable offset
                left: 23,
                width: 235,
                height: 58
            }
            
        }
    ]
}



export default portRef