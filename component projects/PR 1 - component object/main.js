const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

const CANVAS_WIDTH = canvas.width = 1200
const CANVAS_HEIGHT = canvas.height = 600

// buttons
const leftBtn = document.querySelector('#left')
const rightBtn = document.querySelector('#right')

const componentArea = {
    x: 20,
    y: 10,
    width: 500,
    height: 580
}
let facingDir = 0

const OCFormula = {
    facing: [ 
        {imgSrc: "./assets/Z590 OC Formula(L2).png"},
        {imgSrc: "./assets/Z590 OC Formula_IO.png"},
        {imgSrc: "./assets/Z590 OC Formula_back.png"}
        
    ]
}

for(let face in OCFormula.facing) {
    OCFormula.facing[face].image = new Image()
    OCFormula.facing[face].image.src = OCFormula.facing[face].imgSrc
}

function animate() {
    c.clearRect(0,0, canvas.width, canvas.height) //clear
    c.imageSmoothingEnabled = true; //remove blur

    c.fillStyle = '#c7ddcc'
    let box = componentArea
    c.fillRect(box.x, box.y, box.width, box.height)

    let currComponent = OCFormula.facing[facingDir]

    c.drawImage( currComponent.image,
        componentArea.x, 
        componentArea.y, 
        currComponent.image.width, 
        currComponent.image.height)

        requestAnimationFrame(animate)
}
animate()

leftBtn.addEventListener('click', () => {
    if(facingDir == 0) {
        facingDir = OCFormula.facing.length - 1
        return
    }

    facingDir--
})

console.log(OCFormula.facing.length)
rightBtn.addEventListener('click', () => {
    if(facingDir >=   OCFormula.facing.length - 1) {
        
        facingDir = 0
        console.log(facingDir)
        return
    }

    facingDir++
    console.log(facingDir)
})



