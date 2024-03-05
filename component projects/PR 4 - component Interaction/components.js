const chassis = {
    id: 'ch001',
    name: 'NZXT H5 Flow',
    type: 'chassis',
    size: 'mid-tower',
    dimensions: {
        depth: 446,
        width: 227,
        height: 464,
    },
    rotatable: true,
    isAttached: false,
    defaultSource: 'left',
    images: [
        {side: 'left', imageSrc: './assets/chassis/NZXT-H5-Flow-left.png'}, 
        {side: 'front', imageSrc: './assets/chassis/NZXT-H5-Flow-front.png'}, 
        {side: 'right', imageSrc: './assets/chassis/NZXT-H5-Flow-right.png'}, 
        {side: 'rear', imageSrc: './assets/chassis/NZXT-H5-Flow-rear.png'}, 
    ],
    slots: [
        {
            type: 'motherboard', 
            supports: ['ATX', 'microATX', 'miniATX'],
            component: null,
            sides: {
                left: {
                    offsets: {
                        ATX: {x: 50, y: 61, width:204, height: 265},
                        microATX: {x: 50, y: 63, width:204, height: 204},
                        miniATX: {x: 50, y: 63, width:150, height: 150}
                    },
                    accessible: true // if able to attach to this side
                },
                rear: {
                    offsets: {
                        default: {x: 38, y: 35, width: 44, height: 165} 
                    },
                    accessible: false 
                }
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
            
            /*
            // PSU SUPPORT SLOT
            */
        }
    ]
}

const motherboard = {
    id: 'mo001',
    name: 'MPG Z790 CARBON MAX WIFI',
    type: 'motherboard',
    size: 'ATX',
    dimensions: {
        depth: 244,
        width: 244,
        height: 305,
    },
    rotatable: false,
    isAttached: false,
    defaultSource: 'left',
    images: [
        {side: 'left', imageSrc: './assets/motherboard/msi-mobo.png'}, 
        {side: 'rear', imageSrc: './assets/motherboard/msi-IO.png'}, 
    ],
    slots: [
        {
            type: 'cpu', 
            supports: ['LGA 1700'],
            component: null,
            sides: {
                left: {
                    offsets: {
                        dafault: {x: 50, y: 30, width: 45, height: 45},
                    },
                    accessible: true // if able to attach to this side
                }
            }
        }
    ]
}

const psu = {
    id: 'ps001',
    name: 'EVGA SuperNOVA 1300 P+, 80+ PLATINUM 1300W',
    type: 'psu',
    size: 'ATX',
    dimensions: {
        depth: 200,
        width: 150,
        height: 86,
    },
    rotatable: true,
    isAttached: false,
    defaultSource: 'left',
    images: [
        {side: 'left', imageSrc: './assets/psu/EVGA SuperNOVA 1300 P+ - left.png'}, 
        {side: 'front', imageSrc: './assets/psu/EVGA SuperNOVA 1300 P+ - front.png'}, 
        {side: 'right', imageSrc: './assets/psu/EVGA SuperNOVA 1300 P+ - right.png'}, 
        {side: 'rear', imageSrc: './assets/psu/EVGA SuperNOVA 1300 P+ - rear.png'} 
    ],
    slots: []
}

const cpu = {
    id: 'cp001',
    name: 'Intel Core i7-13700K',
    type: 'cpu',
    size: 'LGA 1700',
    dimensions: {
        depth: 125,
        width: 125,
        height: 125,
    },
    rotatable: false,
    isAttached: false,
    defaultSource: 'left',
    images: [
        {side: 'left', imageSrc: './assets/cpu/Intel Core i7-13700K.png'},  
    ],
    slots: []
}