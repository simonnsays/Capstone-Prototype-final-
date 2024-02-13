// GET CURRENT SIDE (experimental)
function getSide(component, currentSide) {
    return component.sides.find(side => side.name === currentSide);
}

// ATTACH COMPONENT
function attachComponent(component, base) {
   
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

// CREATION OF BOUNDING BOX FOR SHELF SPOT COMPONENTS
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

// DETERMINE THE SCALE OF OBJECTS PUT IN SHELF
function determineScale(componentHeight, baseHeight) {
    // start with 1 as scale and lower if it still doesnt fit
    let scale = 1
    while (componentHeight * scale > baseHeight) {
        scale -= .1
    }
    return scale
}

// CHECK IF THE POINTER IS INSIDE AN AREA
function insideBox(point, areaBox) {
    return point.x > areaBox.x &&
        point.x < areaBox.x + areaBox.width &&
        point.y > areaBox.y &&
        point.y < areaBox.y + areaBox.height    
    
}

// ITERATE THROUGH THE SHELF AND CHECKS IF THE POINT IS ON ANY COMPONENT
function selectComponent(point) {
    // return the component found or remain null
    let componentFound = shelf.find(spot => spot.component && insideBox(point, spot.component.box))
    if (componentFound) return componentFound.component
    else return null
}
