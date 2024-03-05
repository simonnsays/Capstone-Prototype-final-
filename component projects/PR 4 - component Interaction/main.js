const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1300
canvas.height = 680

// BUTTONS
// const mount = document.querySelector('#mount')
// const unmount = document.querySelector('#unmount')
const rightBtn = document.querySelector('#right')
const leftBtn = document.querySelector('#left')

// (TEMP) COMPONENT BUTTONS
const componentButtons = document.querySelectorAll('[data-type="component"]')

// console.log(mount.active)

// Current Side
const globalSides = ['left', 'front', 'right', 'rear']
let curr = 0
let currentSide = globalSides[curr]

// Display Label Indicator
const indicator = document.querySelector('#panelIndicator')
const compLabel = document.querySelector('#compLabel')
const compName = document.querySelector('#compName')

// Display Area
const displayArea = {
    area: {x: 10, y: 10, width: 650, height: 660},
    component: null
}

// Shelf
const shelf = [
    {area: {x: 670, y: 10, width: 300, height: 210}, component: null},
    {area: {x: 980, y: 10, width: 310, height: 210}, component: null},

    {area: {x: 670, y: 230, width: 300, height: 220}, component: null},
    {area: {x: 980, y: 230, width: 310, height: 220}, component: null},

    {area: {x: 670, y: 460, width: 300, height: 210}, component: null},
    {area: {x: 980, y: 460, width: 310, height: 210}, component: null},
]

// USER 
const user = {
    isDragging : false,
    dragOffset : {x: 0, y: 0},
    mousePoint : {x: 0, y: 0},
    componentSelected : null, // Selected Component
    availableSlots : []
}

/*
/
/       CONSIDER AS METHOD FUNCTIONS
/
*/

// Start Simulation
start()

// MAIN START FUNCTION
function start() {
    initialize()
    animate()
}

// MAIN ANIMATE FUNCTION
function animate() {
    c.clearRect(0, 0, canvas.width, canvas.height) // clear
    c.imageSmoothingEnabled = true;
    
    // Fill Background
    // c.fillStyle = '#455b54' // dark
    c.fillStyle = '#fef9db' // light
    c.fillRect(0, 0, canvas.width, canvas.height)

    // fill display area
    fillRoundRect(displayArea.area.x, displayArea.area.y, displayArea.area.width, displayArea.area.height, 30)

    // fill shelf areas
    shelf.forEach(spot => {
        fillRoundRect(spot.area.x, spot.area.y, spot.area.width, spot.area.height, 20)
    })

    // draw Display area component
    if(displayArea.component) {
        // draw component
        drawDisplayComponent(displayArea.component)

        // draw attached components
        
        drawAttachedComponents(displayArea.component.slots, currentSide)

        // draw available slots
        user.availableSlots.forEach(slot => {
            if(slot.box) {
                drawSlot(slot.box)
            }
        })
    }

    // draw shelf components
    shelf.forEach(spot => {
        if(spot.component) {
            drawShelfComponent(spot.component)
        }
    })

    requestAnimationFrame(animate)
}

/*
/
/           BUTTON CLICKS
/
*/

// COMPONENT BUTTON CLICK FUNCTIONS
componentButtons.forEach(button => {
    button.addEventListener('click', () => {
        switch(button.id) {
            case 'chassis':
                placeComponent(chassis)
                break
            case 'mobo':
                placeComponent(motherboard)
                break
            case 'psu':
                placeComponent(psu)
                break
            case 'cpu':
                placeComponent(cpu)
        }
    })
})

// DISPLAY ROTATE RIGHT
rightBtn.addEventListener('click', () => {
    curr = (curr + 1) % globalSides.length
    currentSide = globalSides[curr]

    // update box of display component
    if(displayArea.component) {
        updateBoxInDisplay(displayArea.component, displayArea, currentSide)

        // update box of attached components(recursive)
        displayArea.component.slots.forEach(slot => {
            updateAttachedComponentBox(displayArea.component, slot, currentSide)
        }) 
    }
})

// DISPLAY ROTATE LEFT
leftBtn.addEventListener('click', () => {
    curr = (curr - 1 + globalSides.length) % globalSides.length;
    currentSide = globalSides[curr]

    // update box
    if(displayArea.component) {
        updateBoxInDisplay(displayArea.component, displayArea, currentSide)
    }

    // update box of attached components(recursive)
    displayArea.component.slots.forEach(slot => {
        updateAttachedComponentBox(displayArea.component, slot, currentSide)
    })
})


/*
/
/   MOUSE INTERACTIONS
/
*/

// MOUSE DOWN FUNCTION
window.addEventListener('mousedown', (e) => {
    if(e.button !== 0) return

    // check if one of the shelf components is picked
    user.componentSelected = selectComponent(user.mousePoint, shelf)
    
    
    if(!user.componentSelected) return
    console.log(user.componentSelected)

    // if there is a selected component
    user.isDragging = true
    user.dragOffset = {
        x: user.mousePoint.x - user.componentSelected.box.x,
        y: user.mousePoint.y - user.componentSelected.box.y
    }

    // Create Origin For return cases
    user.componentSelected.origin = {x: user.componentSelected.box.x, y: user.componentSelected.box.y}

    // create slots that match the selected component
    if(displayArea.component.slots.length > 0) {
        createSlotsAvailable(displayArea.component, currentSide, user)
    }
    console.log(user.availableSlots)
   
})

// MOUSE MOVE FUNCTION
window.addEventListener('mousemove', (e) => {
    // adjust user.mousePoint to be in canvas
    const canvasRect = canvas.getBoundingClientRect()
    const rawMouse = {x: e.clientX, y: e.clientY}

    // calculate user.mousePoint to be inside canvas
    user.mousePoint = {
        x: rawMouse.x - canvasRect.left,
        y: rawMouse.y - canvasRect.top
    }

    if(user.componentSelected && user.isDragging) {
        user.componentSelected.box.x = user.mousePoint.x - user.dragOffset.x
        user.componentSelected.box.y = user.mousePoint.y - user.dragOffset.y

        // return component if out of bounds    
        if(!isInsideBox(rawMouse, canvasRect)) {
            returnToShelf(user.componentSelected)

            resetTempProperties(user)
        }
    }
})


// MOUSE UP FUNCTION
window.addEventListener('mouseup', () => {
    if(!user.componentSelected) return
    let isInteracting = false

    user.availableSlots.forEach(slot => {
        if(slot.box && isInsideBox(user.mousePoint, slot.box) && slot.box.accessible    ) {
            isInteracting = true

            // attach component
            attachComponent(user.componentSelected, slot)
            
            // remove attached component from shelf
            const i = shelf.findIndex(spot => spot.component && spot.component.id === user.componentSelected.id)
            shelf[i].component = null
        }
    })

    // to place selected component to display
    if(!isInteracting && isInsideBox(user.mousePoint, displayArea.area)) {
        isInteracting = true

        // reset display orientation
        curr = 0
        currentSide = globalSides[curr] 

        // swap components
        swapComponents(displayArea, shelf, user.componentSelected)
    }

    // return to shelf if no interaction
    if(!isInteracting) {
        returnToShelf(user.componentSelected)
    } 

    // clear created properties
    resetTempProperties(user)
})

