selectedCable = {
    end1: 'psu',
    end2: 'motherboard',
    type: '24-pin'
}

psu.ports = [
    {
        name: '24-pin ATX Power',  // name of the port
        type: '24-pin',
        connectsTo: 'motherboard'
    }
]

psu.ports.forEach(port => {
    if(port.connectsTo === selectedCable.end1 || port.connectsTo === selectedCable.end2 ) {
        port.highlight()
    }
})

portObject = {
    name: '',           // name of the port
    type: '',           // type of the port(usually determined by number of pins)
    connectsTo: '',     // reference to where this port should connect

}

