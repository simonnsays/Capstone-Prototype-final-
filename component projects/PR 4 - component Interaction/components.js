// CHASIS
const chassis = {
    id: 'ch001',
    name: 'NZXT H5 Flow',
    type: 'chassis',
    dimensions: {
        depth: 446,
        width: 227,
        height: 464
    },
    rotatable: true,
    defaultSide: 'left',
    slot: [
        {type: 'motherboard', supports: ['ATX', 'micro-ATX', 'mini-ATX'], occupied: false, component: null}
    ],
    sides: [
        // Left Side
        {
            name: 'left',
            imageSrc: './assets/chassis/NZXT-H5-Flow-left.png',
            slotBoxes: [
                {
                    type: 'motherboard', 
                    supports: [
                        {formFactor: 'ATX', offset: {x: 50, y: 61, width:204, height: 265}}, 
                        {formFactor: 'micro-ATX', offset: {x: 50, y: 63, width:204, height: 204}},
                        {formFactor: 'mini-ATX', offset: {x: 50, y: 63, width:150, height: 150}}, 
                    ],
                    accessible: true
                }
            ],
        },
        // Front Side
        {
            name: 'front', 
            imageSrc: './assets/chassis/NZXT-H5-Flow-front.png', 
            slotBoxes: []
        },
        // Right Side
        {
            name: 'right', 
            imageSrc: './assets/chassis/NZXT-H5-Flow-right.png', 
            slotBoxes: [
                {
                    type: 'psu',
                    supports: [
                        {formFactor: 'ATX', offset: {x: 293, y: 345, width: 140, height: 86}}
                    ],
                    accessible: true
                }
            ]
        },
        // Rear Side
        {
            name: 'rear', 
            imageSrc: './assets/chassis/NZXT-H5-Flow-rear.png', 
            slotBoxes: [
                {
                    type: 'psu',
                    supports: [
                        {formFactor: 'ATX', offset: {x: 42, y: 363, width: 140, height: 86}}
                    ],
                    accessible: true
                },
                {
                    type: 'motherboard',
                    supports: [
                        {formFactor: 'any', offset: {x: 38, y: 35, width: 44, height: 165}}
                    ],
                    accessible: false
                }

            ]
        },
    ],
}

// MOTHERBOARD
const motherboard = {
    id: 'mo001',
    name: 'MPG Z790 CARBON MAX WIFI',
    type:'motherboard',
    dimensions: {
        width: 305, // 305 - 40
        height: 244, // 244 - 40
        depth: 64
    },
    rotatable: false,
    defaultSide: 'left',
    sides: [
        // Left Side
        {
            name: 'left',
            imageSrc: './assets/motherboard/msi-mobo.png',
            slotBoxes: []
        },
        // Rear Side
        {
            name: 'rear',
            imageSrc: './assets/motherboard/msi-IO.png',
            slotBoxes: []
        }
    ]
}

// PSU
const psu = {
    id: 'ps001',
    name: 'EVGA SuperNOVA 1300 P+, 80+ PLATINUM 1300W',
    type: 'psu',
    dimensions: {
        width: 150,
        height: 86,
        depth: 200
    },
    rotatable: true, 
    defaultSide: 'left',   
    sides: [
        // Left Side
        {
            name: 'left',
            imageSrc: './assets/psu/EVGA SuperNOVA 1300 P+ - left.png',
            slotBoxes: []
        },
        // Front Side
        {
            name: 'front',
            imageSrc: './assets/psu/EVGA SuperNOVA 1300 P+ - front.png',
            slotBoxes: []
        },
        // Right Side
        {
            name: 'right',
            imageSrc: './assets/psu/EVGA SuperNOVA 1300 P+ - right.png',
            slotBoxes: []
        },
        // Rear Side
        {
            name: 'rear',
            imageSrc: './assets/psu/EVGA SuperNOVA 1300 P+ - rear.png',
            slotBoxes: []
        }
    ]
}