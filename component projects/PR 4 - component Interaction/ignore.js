// Essential PC Components for Building a Gaming PC

// 1. Central Processing Unit (CPU)
const cpu = {
    brand: "Intel" || "AMD",
    model: "Core i5" || "Ryzen 5",
    generation: 6, // Intel 6th Gen or AMD equivalent
  };
  
  // 2. Graphics Processing Unit (GPU)
  const gpu = {
    brand: "NVIDIA" || "AMD",
    model: "GTX 970" || "RX 480",
    videoMemory: 4, // GB
  };
  
  // 3. Random Access Memory (RAM)
  const ram = 8; // GB
  
  // 4. Storage (SSD or HDD)
  const storage = {
    type: "SSD" || "HDD",
    capacity: 256, // GB
  };
  
  // 5. Motherboard
  const motherboard = "ATX" || "Micro ATX";
  
  // 6. Power Supply Unit (PSU)
  const psu = {
    wattage: 500, // watts
    efficiency: "80 PLUS Bronze",
  };
  
  // 7. PC Case
  const pcCase = "Mid Tower" || "Full Tower";
  
  // 8. Operating System
  const os = "Windows 10" || "macOS" || "Linux";
  
  // 9. Input Devices
  const inputDevices = ["Keyboard", "Mouse", "Gamepad"];
  
  // 10. Monitor
  const monitor = {
    size: 24, // inches
    resolution: "1920x1080", // Full HD
    refreshRate: 60, // Hz
  };
  
  // 11. Additional Cooling (Optional)
  const additionalCooling = "Air" || "Liquid";
  
  // Combine all components into a system object
  const gamingPC = {
    cpu,
    gpu,
    ram,
    storage,
    motherboard,
    psu,
    pcCase,
    os,
    inputDevices,
    monitor,
    additionalCooling,
  };
  
  // Print the gaming PC configuration
  console.log(gamingPC);


// COMPONENT DIMENSIONS

const MOTHERBOARD = {
  ATX: {width: 244, height: 305}, // -40 to case in left panel due to perspective change
  microATX: {width: 244, height: 244},
  miniATX: {width: 150, height: 150}
}

// 
const PSU = {
  ATX: {width: 150, height: 86, depth: 140}
}

// Attachment of motherboard
chassis.sides.forEach(side => {
    // get Available Motherboard side
    availableSide = motherboard.sides.find(childSide => childSide.name === side.name)
    if(availableSide) {
        // get Available slot from that side
        availableSlot = side.slots.find(slot => slot.type === motherboard.type)
        
        availableSlot.occupied = true
        availableSlot.component = availableSide
    }
})

// // Attachment of psu
// chassis.sides.forEach(side => {
//     // get Available Motherboard side
//     availableSide = psu.sides.find(childSide => childSide.name === side.name)
//     if(availableSide) {
//         // get Available slot from that side
//         availableSlot = side.slots.find(slot => slot.type === psu.type)
        
//         if(availableSlot) {
//             availableSlot.occupied = true
//             availableSlot.component = availableSide
//         }
//     }
// })
  