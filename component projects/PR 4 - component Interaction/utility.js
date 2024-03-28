// ALL INITIALIZATIONS
function initialize() {
    handleComponent(chassis)
    handleComponent(motherboard)
    handleComponent(psu)
    handleComponent(cpu)
    handleComponent(gpu)
}

// PLACE COMPONENT ON BUTTON CLICK
function placeComponent(component) {
    let objComponent = {...component}

    // if display area is empty
    if(!displayArea.component) {
        displayArea.component = objComponent
        createBox(displayArea.component, displayArea)
        return
    }

    // add new object to shelf
    addToShelf(objComponent)

    // create hitbox for components in shelf
    shelf.forEach(spot => {
        if(spot.component) {
            createBox(spot.component, spot)
        }
    })
}

/*
/
/       ALL HITBOX RELATED FUNCTIONS
/
*/

// CREATION OF INTERACTIVE BOX
function createBox(component, display) {
    let componentSide = getSide(component, component.defaultSource)
    let scale = determineScale(componentSide.height, display.area.height - 20)
    let toCenter = {
        x: display.area.x + (display.area.width / 2),
        y: display.area.y + (display.area.height / 2) 
    }
    
    component.box = {
        x: toCenter.x - ((componentSide.width * scale) / 2),
        y: toCenter.y - ((componentSide.height * scale) / 2),
        width: componentSide.width * scale,
        height: componentSide.height * scale 
    }
}

// UPDATE BOX DEPENING ON CURRNT SIDE
function updateBoxInDisplay(component, display, currentSide) {
    let componentSide = getSide(component, currentSide)
    let toCenter = {
        x: display.area.x + (display.area.width / 2),
        y: display.area.y + (display.area.height / 2)
    }

    component.box = {
        x: toCenter.x - ((componentSide.width) / 2),
        y: toCenter.y - ((componentSide.height) / 2),
        width: componentSide.width,
        height: componentSide.height
    }
}

//  UPDATE ATTACHED COMPONENTS' BOX
function updateAttachedComponentBox(baseComponent, slot, currentSide) {
    if (!slot.component) return

    const imageSide = getSide(slot.component, currentSide)
    const slotSide = getSlotSide(slot, currentSide)
    const slotOffset = getSlotOffset(slotSide, slot.component)

    if(!imageSide) return

    // clear component box if no offset (meaning no dedicated slot on current side)
    if(!slotOffset) {
        slot.component.box = {x: 0, y: 0, width: 0, height: 0}  
        return
    }

    // align offsets to attached compoent box
    if(baseComponent.isAttached) {
        const imageSide = getSide(baseComponent, currentSide)
        diffX = imageSide.width - baseComponent.box.width
        diffY = imageSide.height - baseComponent.box.height - 20

        slot.component.box = {
            x: baseComponent.box.x + slotOffset.x - (diffX / 2),
            y: baseComponent.box.y + slotOffset.y - (diffY /2),
            width: slotOffset.width,
            height: slotOffset.height,
            // accessible: slotSide.accessible
        }  
    } else {
        slot.component.box = {
            x: baseComponent.box.x + slotOffset.x,
            y: baseComponent.box.y + slotOffset.y,
            width: slotOffset.width,
            height: slotOffset.height
        }
    }

    // recursive callback
    slot.component.slots.forEach(childSlot => {
        updateAttachedComponentBox(slot.component, childSlot, currentSide)
    })
}

/*
/
/       SLOT HANDLING
/
*/
// CREATE SLOTS AVAILABLE (create boxes for all possible Slots) 
function createSlotsAvailable (hostComponent, currentSide, user) {
    const componentSelected = user.componentSelected

    hostComponent.slots.forEach(slot => {
        if(slot.type == componentSelected.type && !slot.component) {
              
            createSlotBox(hostComponent, componentSelected, slot, currentSide)
           
            user.availableSlots.push(slot)
        }

        // do the same for attached components
        if(slot.component && slot.component.slots.length > 0) {
            createSlotsAvailable(slot.component, currentSide, user)
        }
    })
}

// CREATE SLOT BOX
function createSlotBox(baseComponent, componentSelected, slot, currentSide) {
    const slotSide = getSlotSide(slot, currentSide)
    const slotOffset = getSlotOffset(slotSide, componentSelected)

    // alter offsets a bit if basecomponent is attached
    if(slotOffset && baseComponent.isAttached) {
        const imageSide = getSide(baseComponent, currentSide)
        diffX = imageSide.width - baseComponent.box.width
        diffY = imageSide.height - baseComponent.box.height - 20

        slot.box = {
            x: baseComponent.box.x + slotOffset.x - (diffX / 2),
            y: baseComponent.box.y + slotOffset.y - (diffY /2),
            width: slotOffset.width,
            height: slotOffset.height,
            accessible: slotSide.accessible
        }  
    } else if(slotOffset) {
        // create box only if offset is available
        slot.box = {
            x: baseComponent.box.x + slotOffset.x,
            y: baseComponent.box.y + slotOffset.y,
            width: slotOffset.width,
            height: slotOffset.height,
            accessible: slotSide.accessible
        }   
    }
}

// GET SLOT SIDE (AVAILABLE SLOT IN CURRENT SIDE)
function getSlotSide(slot, currentSide) {
    return slot.sides[currentSide] || null 
}

// GET SLOT OFFSET
function getSlotOffset(side, componentSelected) {
    if(!side) return null


    // get offset
    return Object.keys(side.offsets).length > 1 
    ? side.offsets[componentSelected.size] 
    : side.offsets['default'] || null
}

/*
/
/           CANVAS FUNCTIONS
/
*/

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

    // any color you want
    c.fillStyle = '#527e71'; // dark 
    c.fillStyle = '#c7ddcc'; // light 
    c.fill();
}

// DRAW COMPONENT FROM DISPLAY AREA
function drawDisplayComponent(component) {
    let componentSide = getDisplayComponentSide(component, currentSide)
    updateRotatableStyles(component.rotatable)
    updateComponentLabels(component)

    canvasDraw(component.box, componentSide.image)
}

// DRAW COMPONENT FROM SHELF SPOT
function drawShelfComponent(component) {
    let componentSide = getSide(component, component.defaultSource)

    canvasDraw(component.box, componentSide.image)
}

//  DRAW ATTACHED COMPONENTS
function drawAttachedComponents(slots, currentSide) {
     
}

// DRAW IMAGE IN CANVAS
function canvasDraw(box, image) {
    c.drawImage(
        image, 
        box.x,
        box.y,
        box.width,
        box.height,
    )
} 

// DRAW SLOT
function drawSlot(box) {
    c.fillStyle ='rgba(0, 255, 0, 0.3)'
    c.fillRect(
        box.x,
        box.y,
        box.width,
        box.height
    )
}

/*
/
/       COMPONENT HANDLING
/
*/

// HANDLE COMPONENT
function handleComponent(component) {
    component.images.forEach(element => {
        // Create Image  
        element.image = new Image()
        element.image.src = element.imageSrc

        // Adjust width and height depending on side
        switch(element.side) {
            case 'left':
            case 'right':
                element.width = component.dimensions.depth
                element.height = component.dimensions.height
                break
            case 'front':
            case 'rear':
                element.width = component.dimensions.width
                element.height = component.dimensions.height
                break
            default:
                element.width = component.dimensions.width
                element.height = component.dimensions.height
        }
    })
}

// ADD COMPONENTS TO SHELF
function addToShelf(newComponent) {
    let added = false 

    for(let i = 0; i < shelf.length; i++) {
        const element = shelf[i]

        if(element.component === null) {
            // If the component property is null, add the new component
            element.component = newComponent
            added = true
            break;
        }
    }

    // If all component properties are occupied, shift components to the next object
    if(!added) {
        const lastElement = shelf[shelf.length - 1]
        const removedComponent = lastElement.component

        for(let i = shelf.length - 1; i > 0; i--) {
            const prevElement = shelf[i - 1]
            shelf[i].component = prevElement.component
        }

        // Add the new component to the first object
        shelf[0].component = newComponent
        
    }
    
}

/*
/
/       MISC
/
*/ 

// ATTACH COMPONENT
function attachComponent(component, slot) {
    slot.component = component  //placing the component to the slot
    slot.component.isAttached = true
}

// GET DISPLAY SIDE (IF ROTATABLE OR NOT)
function getDisplayComponentSide (component, currentSide) {
    return component.rotatable ? getSide(component, currentSide) : getSide(component, component.defaultSource)
} 

// FIND SELECTED COMPONENT
function selectComponent(point, shelf) {
    const componentFound = shelf.find(spot => spot.component && isInsideBox(point, spot.component.box))
    return componentFound ? componentFound.component : null 
}

// RESET TEMP PROPERTIES
function resetTempProperties(user) {
    user.isDragging = false

    // slots 
    user.availableSlots.forEach(slot => {
        // delete slot.box
    })
    user.availableSlots = []

    // component selected
    delete user.componentSelected.origin
    user.componentSelected = null
}

// RETURN TO SHELF(DISPLAY)
function returnToShelf(component) {
    component.box.x = component.origin.x
    component.box.y = component.origin.y
}

// SWAP COMPONENTS
function swapComponents(displayArea, shelf, selectedComponent) {
    const tempComponent = displayArea.component
    const shelfIndex = shelf.findIndex(spot => spot.component && 
    spot.component.id === selectedComponent.id)

    // swap components
    displayArea.component = selectedComponent
    shelf[shelfIndex].component = tempComponent

    // update component box
    createBox(displayArea.component, displayArea)
    displayArea.component.slots.forEach(slot => {
        updateAttachedComponentBox(displayArea.component, slot, currentSide)
    })

    createBox(shelf[shelfIndex].component, shelf[shelfIndex])
}

// DETRMINE SCALE
function determineScale(componentHeight, baseHeight) {
    // start with 1 as scale and lower if it still doesnt fit
    let scale = 1
    while (componentHeight * scale > baseHeight && scale > 0 ) {
        scale -= .1
    }

    
    return scale
}

// CHECK IF POINT IS INSIDE BOX
function isInsideBox(point, box) {
    return point.x > box.x &&
        point.x < box.x + box.width &&
        point.y > box.y &&
        point.y < box.y + box.height
}

//GET SIDE (MATCH ASSET TO CURRENT SIDE)
function getSide(component, side) {
    return component.images.find(element => element.side == side) || null
}

//UPDATE DISPLAY COMPONENT STYLES
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

//UPDATE DISPLAY COMPONENT LABELS
function updateComponentLabels(component) {
    compLabel.innerHTML = component.type
    compName.innerHTML = component.name
}