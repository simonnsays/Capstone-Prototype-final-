const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d', { willReadFrequently: true });
let length = 0
let rectStart = 0
let counter = 0

document.getElementById('imgInput').addEventListener('change', handleImage);

function handleImage(event) {
    const file = event.target.files[0];

    const reader = new FileReader();
    reader.onload = function (e) {
        const img = new Image();
        img.onload = function () {
            canvas.width = img.width;
            canvas.height = img.height;
            // ctx.fillRect(0,0,img.width, img.height)
            ctx.drawImage(img, 0, 0, img.width, img.height); 
            // processImage();
            // ctx.drawImage(img, 0, 0, img.width, img.height);
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}


function processImage(length) {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    counter = 0

    // for (let i = 2268*4; i < 9900; i+=4) {
    //     // console.log(data[i])
    //     data[i] = 255
    // }
    for(let i = 0; i < data.length; i+=4) {
        //  
        // if (data[i] == 255) {
        //     if (rectStart == 0) {
        //         rectStart = i
        //         console.log(rectStart)
        //     }
        // } 
        
        
        const red = data[i]
        const green = data[i + 1]
        const blue = data[i + 2]
        data[i] = 0
        data[i+1] = 0
        data[i+2] = 0

        if (red >= 255) {
            counter++
        }
        
    }
    console.log(data.length)
    console.log(counter)
    ctx.putImageData(imageData, 0, 0);
}

const slider = document.getElementById("slider");
const output = document.getElementById("sliderValue");

slider.addEventListener("input", () => {
    output.value = slider.value;
    length = slider.value
    processImage(length)
});

// const processBtn = document.querySelector('#process')
// processBtn.addEventListener('click', () => {
    
// })


