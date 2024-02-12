// CHASIS
const chassis = {
    id: 'ch001',
    name: 'NZXT H5 Flow',
    type: 'chasis',
    dimensions: {
        depth: 446,
        width: 227,
        height: 464
    },
    rotatable: true,
    defaultSide: 'left',
    // slots: [
    //     {type: 'motherboard', supports: ['ATX', 'micro-ATX', 'mini-ATX'], occupied: false, component: null}
    // ],
    sides: [
        // Left Side
        {
            name: 'left',
            imageSrc: './assets/chasis/NZXT-H5-Flow-left.png',
            slots: [
                {
                    type: 'motherboard', 
                    supports: [
                        {formFactor: 'ATX', offset: {x: 50, y: 61, width:204, height: 265}}, 
                        {formFactor: 'micro-ATX', offset: {x: 50, y: 63, width:204, height: 204}}, // to be adjusted
                        {formFactor: 'mini-ATX', offset: {x: 50, y: 63, width:150, height: 150}}, // to be adjusted
                    ],
                    occupied: false,
                    component: null
                }
            ]
        },
        // Front Side
        {
            name: 'front', 
            imageSrc: './assets/chasis/NZXT-H5-Flow-front.png', 
            slots: []
        },
        // Right Side
        {
            name: 'right', 
            imageSrc: './assets/chasis/NZXT-H5-Flow-right.png', 
            slots: [
                //{type: 'motherboard', supports: ['ATX', 'micro-ATX', 'mini-ATX'], offset: {x: 190, y: 33, width:244, height: 305}}
                {
                    type: 'psu',
                    supports: [
                        {formFactor: 'ATX', offset: {x: 293, y: 345, width: 140, height: 86}}
                    ]
                }
            ]
        },
        // Rear Side
        {
            name: 'rear', 
            imageSrc: './assets/chasis/NZXT-H5-Flow-rear.png', 
            slots: [
                {
                    type: 'psu',
                    supports: [
                        {formFactor: 'ATX', offset: {x: 42, y: 363, width: 140, height: 86}}
                    ],
                    occupied: false,
                    component: null
                },
                {
                    type: 'motherboard',
                    supports: [
                        {formFactor: 'any', offset: {x: 38, y: 35, width: 44, height: 165}}
                    ],
                    occupied: false,
                    component: null
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
            slots: []
        },
        // Rear Side
        {
            name: 'rear',
            imageSrc: './assets/motherboard/msi-IO.png',
            slots: []
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
            slots: []
        },
        // Front Side
        {
            name: 'front',
            imageSrc: './assets/psu/EVGA SuperNOVA 1300 P+ - front.png',
            slots: []
        },
        // Right Side
        {
            name: 'right',
            imageSrc: './assets/psu/EVGA SuperNOVA 1300 P+ - right.png',
            slots: []
        },
        // Rear Side
        {
            name: 'rear',
            imageSrc: './assets/psu/EVGA SuperNOVA 1300 P+ - rear.png',
            slots: []
        }
    ]
}