const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1300
canvas.height = 680

// BUTTONS
const rightBtn = document.querySelector('#right')
const leftBtn = document.querySelector('#left')

// Current Side
const globalSides = ['left', 'front', 'right', 'rear']
let curr = 0

// Display Label Indicator
const indicator = document.querySelector('#panelIndicator')

// Display Area
const displayArea = {
    area: {x: 10, y: 10, width: 650, height: 660},
    component: psu
}

// Shelf
const shelf = [
    {area: {x: 670, y: 10, width: 300, height: 210}, component: motherboard},
    {area: {x: 980, y: 10, width: 310, height: 210}, component: psu},

    {area: {x: 670, y: 230, width: 300, height: 220}, component: chassis},
    {area: {x: 980, y: 230, width: 310, height: 220}, component: null},

    {area: {x: 670, y: 460, width: 300, height: 210}, component: null},
    {area: {x: 980, y: 460, width: 310, height: 210}, component: null},
]

// USER 
let isDragging = false
let dragOffset = {x: 0, y: 0}
// Selected Component
let selectedComponent = null

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

// Creation of bounding box for shelf spots
shelf.forEach(spot => {
    // createBoundingBox()
    if(spot.component) {
        createBoundingBox(spot)
    }
})
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

    // Draw Component in display area
    if(displayArea.component) {
        let component = displayArea.component
        let side = null
        // al non-rotatables
        if(!component.rotatable) {
            side = getSide(component, component.defaultSide)
            // No rotate buttons for non-rotatables
            indicator.innerHTML = displayArea.component.type
            leftBtn.style.visibility = 'hidden'
            rightBtn.style.visibility = 'hidden'
        } else {
            side = getSide(component, globalSides[curr])
            indicator.innerHTML = side.name + ' side'
        }
        c.drawImage(side.image, 
            (displayArea.area.width / 2) - (side.width / 2), // center of the area x
            (displayArea.area.height / 2) - (side.height / 2), // center  of the area y
            side.width,
            side.height
        )

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
    }

    // Draw Slots
    // part.slots.forEach(slot => {
    //     slot.supports.forEach(form => {
    //         // c.fillStyle = 'rgba(0,255,0,.2)'
    //         // c.fillRect( (300 - (part.width / 2)) + form.offset.x, (300 - (part.height /2)) + form.offset.y, form.offset.width, form.offset.height)
    //     })
    //     // Draw components occupying the slot
    //     if(slot.occupied) {
    //         component = slot.component
    //         // .support[0] means that it is accepting all formFactors as of now
    //         offset = slot.supports[0].offset
    //         // for psu
    //         if(slot.type === 'psu') {
    //             c.drawImage(component.image,
    //                 (300 - (part.width / 2)) + ((offset.x + offset.width) - component.width ),
    //                 300 - (part.height /2) + offset.y,
    //                 component.width,
    //                 offset.height)
    //         } else {
    //             c.drawImage(component.image,
    //                 (300 - (part.width / 2)) + offset.x,
    //                 300 - (part.height /2) + offset.y,
    //                 offset.width,
    //                 offset.height)
    //         }
    //     }     
    // })


    requestAnimationFrame(animate)
}
animate()
function determineScale(componentHeight, baseHeight) {
    // start with 1 as scale and lower if it still doesnt fit
    let scale = 1
    while (componentHeight * scale > baseHeight) {
        scale -= .1
    }
    return scale
}
function insideBox(point, areaBox) {
    return point.x > areaBox.x &&
        point.x < areaBox.x + areaBox.width &&
        point.y > areaBox.y &&
        point.y < areaBox.y + areaBox.height    
    
}
function selectComponent(point) {
    // return the component found or remain null
    let componentFound = shelf.find(spot => spot.component && insideBox(point, spot.component.box)).component
    return componentFound ?? null
}

// rotate right
rightBtn.addEventListener('click', () => {
    if(curr == 3) {
        curr = 0
        return
    }
    curr++
})

// rotate left
leftBtn.addEventListener('click', () => {
    if(curr == 0) {
        curr = 3
        return
    }
    curr--
})

// MOUSE DOWN
canvas.addEventListener('mousedown', (e) => {
    // declare mouse point and selected component
    canvasRect = canvas.getBoundingClientRect()
    mousePoint = {x: e.clientX - canvasRect.left, y: e.clientY - canvasRect.top}
    selectedComponent = selectComponent(mousePoint)
    console.log(selectedComponent)
    if(!selectedComponent) return   

    // if there is a selected Component
    dragOffset = {
        x: mousePoint.x - selectedComponent.box.x,
        y: mousePoint.y - selectedComponent.box.y
    }

    isDragging = true
})

// MOUSE MOVE
canvas.addEventListener('mousemove', (e) => {
    if(isDragging && selectedComponent) {
        // Update the component's position based on the mouse position and offset
        selectedComponent.box.x = e.clientX - canvasRect.left - dragOffset.x
        selectedComponent.box.y = e.clientY - canvasRect.top - dragOffset.y
    }
})

// MOUSE UP
canvas.addEventListener('mouseup', () => {
    selectedComponent = null
})