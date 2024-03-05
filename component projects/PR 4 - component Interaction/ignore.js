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




///////////////////////////////////

// Creation of bounding box for diplay area component
function createDisplayAreaComponentBox(component, side) {
  component.box = {
      x: (displayArea.area.width / 2) - (side.width / 2), // center of the area x
      y: (displayArea.area.height / 2) - (side.height / 2), // center of the area y
      width: side.width,
      height: side.height
  }
}
if(displayArea.component) {
  let component = displayArea.component
  let side = getSide(component, component.defaultSide)

  createDisplayAreaComponentBox(component, side)
}
// Creation of bounding box for shelf spots
shelf.forEach(spot => {
  // createBoundingBox()
  if(spot.component) {
      createBoundingBox(spot)
  }
})

// Component Handlers
chassis.sides.forEach(side => {
  // create image
  side.image = new Image()
  side.image.src = side.imageSrc

  // create dimension per side
  switch(side.name) {
      case 'left':
      case 'right':
          side.width = chassis.dimensions.depth
          side.height = chassis.dimensions.height
          break
      case 'front':
      case 'rear':
          side.width = chassis.dimensions.width
          side.height = chassis.dimensions.height
          break
  }
})

motherboard.sides.forEach(side => {
  // create image
  side.image = new Image()
  side.image.src = side.imageSrc

  // create dimension per side
  switch(side.name) {
      case 'left':
      case 'right':
          side.width = motherboard.dimensions.height
          side.height = motherboard.dimensions.width
          break
      case 'front':
      case 'rear':
          side.width = motherboard.dimensions.height
          side.height = motherboard.dimensions.depth 
          break
  }
})

psu.sides.forEach(side => {
  // create image
  side.image = new Image()
  side.image.src = side.imageSrc

  // create dimension per side
  switch(side.name) {
      case 'left':
      case 'right':
          side.width = psu.dimensions.depth
          side.height = psu.dimensions.height
          break
      case 'front':
      case 'rear':
          side.width = psu.dimensions.width
          side.height = psu.dimensions.height
          break
  }
})
  

// Draw Component in display area
if(displayArea.component) {
  let component = displayArea.component
  let side = null
  // separate non-rotatables
  if(!component.rotatable) {
      side = getSide(component, component.defaultSide)
      // No rotate buttons for non-rotatables
      leftBtn.style.visibility = 'hidden'
      rightBtn.style.visibility = 'hidden'
      indicator.style.visibility = 'hidden'
  } else {
      leftBtn.style.visibility = 'visible'
      rightBtn.style.visibility = 'visible'
      indicator.style.visibility = 'visible'
      
      side = getSide(component, globalSides[curr])
      indicator.innerHTML = globalSides[curr] + ' side' // display current side name
  }
  compLabel.innerHTML = displayArea.component.type // component label

  // reinitialize component box to match the actual size(width and height)
  createDisplayAreaComponentBox(component, side) 
  // Draw the component
  c.drawImage(side.image, 
      component.box.x, 
      component.box.y,
      component.box.width,
      component.box.height
  )  
  // Draw available slots (component.sides > slotBoxes > supports)
  side.slotBoxes.forEach(slotBox => { 
      slotBox.supports.forEach(slot => {  
          c.fillStyle = 'rgba(0,255,0,0.2)'
          c.fillRect( 
              component.box.x + slot.offset.x,
              component.box.y + slot.offset.y,
              slot.offset.width,
              slot.offset.height    
          )
      })
  })
}
// Draw Components in Shelf Area
shelf.forEach(spot => {
  if(spot.component) {
      let image = getSide(spot.component, spot.component.defaultSide).image
      c.drawImage(image,
          spot.component.box.x,
          spot.component.box.y,
          spot.component.box.width,
          spot.component.box.height,
      )
  }
})  

// MOUSE DOWN
canvas.addEventListener('mousedown', (e) => {
  // declare selected component
  componentSelected = selectComponent(mousePoint)
  
  if(!componentSelected) return   

  // if there is a selected Component
  isDragging = true
  dragOffset = {
      x: mousePoint.x - componentSelected.box.x,
      y: mousePoint.y - componentSelected.box.y
  }
  // Create Origin Coordinate to return to in case
  componentSelected.origin = {x: componentSelected.box.x, y: componentSelected.box.y}
  
})

// MOUSE MOVE
canvas.addEventListener('mousemove', (e) => {
  const canvasRect = canvas.getBoundingClientRect()
  mousePoint.x = e.clientX - canvasRect.left
  mousePoint.y = e.clientY - canvasRect.top
  if(isDragging && componentSelected) {
      // Update the component's position based on the mouse position and offset
      componentSelected.box.x = e.clientX - canvasRect.left - dragOffset.x
      componentSelected.box.y = e.clientY - canvasRect.top - dragOffset.y
  }
})

// MOUSE UP
canvas.addEventListener('mouseup', () => {
  if (!componentSelected) return

  // If Component is in Display area
  if(componentSelected && insideBox(mousePoint, displayArea.area)) {
      // Swap the selected component and the component in the display area
      const tmpComponent = displayArea.component
      displayArea.component = componentSelected

      //find the index of the selected component and replace with temp var
      const i = shelf.findIndex(spot => spot.component && spot.component.id == componentSelected.id)  
      shelf[i].component = tmpComponent //place the temp variable in the index 
      // fix positioning of shelf spot components
      shelf.forEach((spot, i) => {
          if(spot.component) {
              createBoundingBox(spot)
          }
      })
  }

  // return to shelf if no interaction
  componentSelected.box.x = componentSelected.origin.x
  componentSelected.box.y = componentSelected.origin.y

  // reset temp attributes
  delete componentSelected.origin
  componentSelected = null
})

//////////////////////////////////////////////

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
const motherboard1 = {
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
const psu1 = {
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

////////////////////////////////////////////////////////////

function createBoundingBox(display) {
    let component = display.component
    let part = getSide(component, component.defaultSide)
    // checks if the component has the side the global sides has currently
    if (part) {
        let scale = determineScale(part.height, 190)
        let toCenter = {
            x: (display.area.x + (display.area.width / 2)),
            y: (display.area.y + (display.area.height / 2))
        }
        component.box = {
            x: toCenter.x - ((part.width * scale) / 2),
            y: toCenter.y - ((part.height * scale) / 2),
            width: part.width * scale,
            height: part.height * scale

        }
        
    }
}

// CHECK IF THE POINTER IS INSIDE AN AREA


// ITERATE THROUGH THE SHELF AND CHECKS IF THE POINT IS ON ANY COMPONENT
function selectComponent(point) {
    // return the component found or remain null
    let componentFound = shelf.find(spot => spot.component && insideBox(point, spot.component.box))
    if (componentFound) return componentFound.component
    else return null
}





/*
/
/
/
/           FEB 24 CODE SCRAPPED
/
/
*/

// main.js
function start() {
    init()
    animate()
}
start()

function init() {
    // initialize components
    if(displayArea.component) {
        console.log()
        let componentSide = getComponentSide(displayArea.component)
        // create Box
        displayArea.component.box = updateCenteredBox(displayArea, componentSide)
    }

    shelf.forEach(spot => {
        if(spot.component) {
            let componentSide = getComponentSide(spot.component)
            // create box
            spot.component.box = updateCenteredBox(spot, componentSide)
        }
    })
}

// ANIMATE
function animate() {
    c.clearRect(0, 0, canvas.width, canvas.height) // clear
    c.imageSmoothingEnabled = true;
    
    // Fill Background
    c.fillStyle = '#fef9db'
    c.fillRect(0, 0, canvas.width, canvas.height)

    // fill display area
    fillRoundRect(displayArea.area.x, displayArea.area.y, displayArea.area.width, displayArea.area.height, 30)

    // fill shelf areas
    shelf.forEach(spot => {
        fillRoundRect(spot.area.x, spot.area.y, spot.area.width, spot.area.height, 20)
    })

    // Draw DisplayArea Component
    if(displayArea.component) {
        // Separate Rotatables to non ones
        updateRotatableStyles(displayArea.component.rotatable)

        // update Labels
        updateComponentLabels(displayArea.component)
        // Draw Component
        drawDisplayComponent(displayArea.component, displayArea.component.box)

        // Draw Attached Components (recursive)
        drawAttachedComponents(displayArea.component.slots)

        // Draw Slots
        if (availableSlots.length > 0 && componentSelected) {
            availableSlots.forEach(slot => {
                if(slot.box) {
                    drawSlot(slot.box)
                }
            })
        }
    }

    // Draw Shelf Components
    shelf.forEach(spot => {
        if(spot.component) {
            // Draw shelf component
            canvasImageDraw(getSide(spot.component, spot.component.defaultSource).image, spot.component.box)
        }
    })

    requestAnimationFrame(animate)
}

// rotate RIGHT
rightBtn.addEventListener('click', () => {
    curr = (curr + 1) % globalSides.length
    currentSide = globalSides[curr]

    if(displayArea.component) {
        updateDisplayComponentBox(displayArea, displayArea.component)

        updateSlotComponentBoxes(displayArea.component.slots)
    }
})

// rotate LEFT
leftBtn.addEventListener('click', () => {
    curr = (curr - 1 + globalSides.length) % globalSides.length;
    currentSide = globalSides[curr]

    if(displayArea.component) {
        updateDisplayComponentBox(displayArea, displayArea.component)

        updateSlotComponentBoxes(displayArea.component.slots)
    }
})

// MOUSE DOWN
window.addEventListener('mousedown', (e) => {
    // declare selected component
    componentSelected = selectComponent(mousePoint, shelf)

    if(!componentSelected) return   

    // if there is a selected Component
    isDragging = true
    dragOffset = {
        x: mousePoint.x - componentSelected.box.x,
        y: mousePoint.y - componentSelected.box.y
    }
    // Create Origin Coordinate to return to in case
    componentSelected.origin = {x: componentSelected.box.x, y: componentSelected.box.y}
    
    // Show Slot depending on the component type
    if(displayArea.component) {
        availableSlots = findSlots(displayArea.component, componentSelected)

        availableSlots.forEach(slot => {
            // create slotBox()
            if(slot.sides[currentSide]) {
                let offsets = slot.sides[currentSide].offset
                let slotOffset = {}
                if(Object.keys(offsets).length == 1) {
                    slotOffset = offsets['default']
                } 

                for(let availableSides in offsets) {
                    if(availableSides == componentSelected.size) {
                        slotOffset = offsets[componentSelected.size]
                    } 
                }

                slot.box = {
                    x: displayArea.component.box.x + slotOffset.x,
                    y: displayArea.component.box.y + slotOffset.y,
                    width: slotOffset.width,
                    height: slotOffset.height,
                }
            } else {
                slot.box = {
                    x: 0,
                    y: 0,
                    width: 0,
                    height: 0,
                }
            }
            
            // createSlotBox(slot, currentSide, displayArea.component, componentSelected)
        })
    }
})

  // MOUSE MOVE
window.addEventListener('mousemove', (e) => {
    const canvasRect = canvas.getBoundingClientRect()
    const rawMouse = {x: e.clientX, y: e.clientY}
    mousePoint.x = e.clientX - canvasRect.left
    mousePoint.y = e.clientY - canvasRect.top
    if(isDragging && componentSelected) {
        // Update the component's position based on the mouse position and offset
        componentSelected.box.x = e.clientX - canvasRect.left - dragOffset.x
        componentSelected.box.y = e.clientY - canvasRect.top - dragOffset.y

        // Handle Out of Bounds
        if(!insideBox(rawMouse, canvasRect)) {
            returnToShelf(componentSelected)

            resetTempProperties()
        }
    }
})

// MOUSE UP
window.addEventListener('mouseup', () => {
    if (!componentSelected) return

    let isInteracting = false

    if(availableSlots.length > 0) { 
        // create interactable box for each slot with its offset
        availableSlots.forEach(slot => {
            if(insideBox(mousePoint, slot.box) && slot.sides[currentSide].accessible) {
                isInteracting = true

                attachComponent(componentSelected, slot)
                
                // remove shelf Component
                const i = shelf.findIndex(spot => spot.component && spot.component.id == componentSelected.id)
                shelf[i].component =null
            }
        })
    }

    if(insideBox(mousePoint, displayArea.area) && !isInteracting) {
        // Swap the selected component and the component in the display area
        const tmpComponent = displayArea.component
        displayArea.component = componentSelected

        //find the index and replace with temp var
        const i = shelf.findIndex(spot => spot.component && spot.component.id == componentSelected.id)  
        shelf[i].component = tmpComponent //place temp variable in the index 

        // Update Bounding Boxes
        if(displayArea.component) {
            updateDisplayComponentBox(displayArea, displayArea.component)

        }
        shelf.forEach(spot => {
            if(spot.component) {
                spot.component.box = 
                updateDisplayComponentBox(spot, spot.component)
            }
        })

        isInteracting = true
    }

    // return to shelf if no interaction
    if(!isInteracting) {
        returnToShelf(componentSelected)
    }

    // always reset temp attributes
    resetTempProperties()

})

/*
/
/                utility.js
/
/
*/

function getComponentSide(component) {
    // match global sides or use component default
    return component.rotatable ? getSide(component, globalSides[curr]) : getSide(component, component.defaultSource)
}

// GET CURRENT SIDE (experimental)
function getSide(component, currentSide) {
    return component.images.find(image => image.side === currentSide)
}

// Component Handling
function handleComponent(component) {
    component.images.forEach(element => {
        element.image = new Image()
        element.image.src = element.imageSrc
    
        switch(element.side) {
            case 'front':
            case 'rear': 
                element.width = component.dimensions.width
                element.height = component.dimensions.height
                break
            case 'left':
            case 'right':
                element.width = component.dimensions.depth
                element.height = component.dimensions.height
                break
        }
        
    })
}

// DETERMINE THE SCALE OF OBJECTS PUT IN SHELF
function determineScale(componentHeight, baseHeight) {
    // start with 1 as scale and lower if it still doesnt fit
    let scale = 1
    while (componentHeight * scale > baseHeight && scale > 0) {
        scale -= .1
    }
    return scale
}

// CANVAS ROUND RECTANGLE
function fillRoundRect(left, top, width, height, radius) {
    c.beginPath();
    c.moveTo(left + radius, top);
    c.lineTo(left + width - radius, top);
    c.arcTo(left + width, top, left + width, top + radius, radius);
    c.lineTo(left + width, top + height - radius);
    c.arcTo(left + width, top + height, left + width - radius, top + height, radius);
    c.lineTo(left + radius, top + height);
    c.arcTo(left, top + height, left, top + height - radius, radius);
    c.lineTo(left, top + radius);
    c.arcTo(left, top, left + radius, top, radius);

    c.fillStyle = '#c7ddcc'; // or any color you want
    c.fill();
}

// Update display component styles
function updateRotatableStyles(rotatable) {
    if(rotatable) {
        rightBtn.style.visibility = 'visible'
        leftBtn.style.visibility = 'visible'
        indicator.style.visibility = 'visible'
        indicator.innerHTML = globalSides[curr] + ' side'
    } else {
        rightBtn.style.visibility = 'hidden'
        leftBtn.style.visibility = 'hidden'
        indicator.style.visibility = 'hidden'
    }
}

// Update Display component labels
function updateComponentLabels(component) {
    compLabel.innerHTML = component.type
    compName.innerHTML = component.name
}

// Find Component Being dragged
function selectComponent(point, shelf) {
    let componentFound = shelf.find(spot => spot.component && insideBox(point, spot.component.box))
    return componentFound ? componentFound.component : null
}

function insideBox(point, areaBox) {
    return point.x > areaBox.x &&
        point.x < areaBox.x + areaBox.width &&
        point.y > areaBox.y &&
        point.y < areaBox.y + areaBox.height     
}

// CREATION OF BOUNDING BOX FOR SHELF SPOT COMPONENTS
function updateCenteredBox(display, component) {
    let scale = determineScale(component.height, display.area.height - 20)
    let toCenter = {
        x: display.area.x + (display.area.width / 2),
        y: display.area.y + (display.area.height / 2)
    }
    return {
        x: toCenter.x - ((component.width * scale) / 2),
        y: toCenter.y - ((component.height * scale) / 2),
        width: component.width * scale,
        height: component.height * scale 
    }
}

//  Make Display component Centered
function updateDisplayComponentBox(display, component) {
    let componentSide = getComponentSide(component)

    component.box.width = componentSide.width
    component.box.height = componentSide.height
    component.box = updateCenteredBox(display, componentSide)
}

// Draw Component
function drawDisplayComponent(component, box) {
    let componentSide = getComponentSide(component)
    canvasImageDraw(componentSide.image, box)
}

// Draw Shelf Components
function canvasImageDraw (image, box) {
    c.drawImage(
        image, 
        box.x,
        box.y,
        box.width,
        box.height
    )
}

// Draw Attached Components
function drawAttachedComponents(slots) {
    if(!slots) return

    slots.forEach(slot => {
        if(slot.component) {
            // drawComponent(slot.component, slot.component.box)
            let componentSide = getSide(slot.component, currentSide)
            if(componentSide) {
                c.drawImage(
                    componentSide.image,
                    slot.component.box.x,
                    slot.component.box.y,
                    slot.component.box.width,
                    slot.component.box.height,
                )
            }
            drawAttachedComponents(slot.component.slots)
        }
    })
}

// Check for Matching Slots
function findSlots(hostComponent, subComponent) {
    if (!hostComponent || !subComponent) {
        return []
    }

    return hostComponent.slots.filter(slot => slot.type === subComponent.type && 
        slot.supports.includes(subComponent.size))
}

// Draw Slot
function drawSlot(box) {
    c.fillStyle = 'rgba(0, 255, 0, 0.2)'
    c.fillRect(
        box.x,
        box.y,
        box.width,
        box.height,
    )
}

// Return Component to original position
function returnToShelf(component) {
    component.box.x = component.origin.x
    component.box.y = component.origin.y
}

// reset temp properties made 
function resetTempProperties() {
    isDragging = false
    availableSlots = []

    delete componentSelected.origin
    componentSelected = null
}

// attach component
function attachComponent(component, slot) {
    slot.component = component
    slot.component.box = slot.box 
}

function updateSlotComponentBoxes(slots) {
    slots.forEach(slot => {
        if(slot.component) {
            // update the slot box
            let availableSide = slot.sides[currentSide]
            let availableOffset = {}
            if(availableSide) {
                if(Object.keys(availableSide.offset).length == 1) {
                    availableOffset = availableSide.offset['default']
                } else {
                    for(let index in availableSide.offset) {
                        if(index == slot.component.size) { 
                            availableOffset = availableSide.offset[index]
                        }
                    }
                }
                slot.component.box = {
                    x: displayArea.component.box.x + availableOffset.x,
                    y: displayArea.component.box.y + availableOffset.y,
                    width: availableOffset.width,
                    height: availableOffset.height
                }
            } else {
                slot.component.box.width = 0
                slot.component.box.height = 0
            }
        } 
    })
}
