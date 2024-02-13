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
const compLabel = document.querySelector('#compLabel')

// Display Area
const displayArea = {
    area: {x: 10, y: 10, width: 650, height: 660},
    component: chassis
}

// Shelf
const shelf = [
    {area: {x: 670, y: 10, width: 300, height: 210}, component: motherboard},
    {area: {x: 980, y: 10, width: 310, height: 210}, component: psu},

    {area: {x: 670, y: 230, width: 300, height: 220}, component: null},
    {area: {x: 980, y: 230, width: 310, height: 220}, component: null},

    {area: {x: 670, y: 460, width: 300, height: 210}, component: null},
    {area: {x: 980, y: 460, width: 310, height: 210}, component: null},
]

// USER 
let isDragging = false
let dragOffset = {x: 0, y: 0}
let mousePoint = {x: 0, y: 0}
// Selected Component
let componentSelected = null

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

    requestAnimationFrame(animate)
}
animate()

// rotate right
rightBtn.addEventListener('click', () => {
    if(curr == 0) {
        curr = 3
        return
    }
    curr--
})

// rotate left
leftBtn.addEventListener('click', () => {
    if(curr == 3) {
        curr = 0
        return
    }
    curr++
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