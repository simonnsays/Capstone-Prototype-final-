// GET CURRENT SIDE (experimental)
function getSide(component, currentSide) {
    return component.sides.find(side => side.name === currentSide);
}

// ATTACH COMPONENT
function attachComponent(component, base) {
    base.sides.forEach(bside => {    
        let componentSide = component.sides.find(cSide => cSide.name === bside.name)
        if(componentSide) {
            let a = bside.slots.filter(slot => {
                return slot.type === component.type
            })
            console.log(a)

        } 
    })
    
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