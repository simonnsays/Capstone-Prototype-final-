class Assistant {
  constructor() {
    this.sequenceStarted = false
    // pages
    this.page1 = document.querySelector('#page1 .assistant-container');
    this.page2 = document.querySelector('#page2 .assistant-container');
    this.page3 = {
      asst: document.querySelector('#page3 .assistant-container'),
      gridWrapper: document.querySelector('.grid-wrapper'),
      scene: document.querySelector('#page3 .scene'),
    }
    
    // dialogue box
    this.dialogueBox = document.querySelector(".dialogue-box");
    this.dialogueText = document.querySelector(".dialogue-text");
    this.dialogueDownElement = document.querySelector("dialogue-down")
    this.dialogueIndex = 0;
    this.typingTimer = null;
    this.isTyping = false;
    this.introDialogues = [
      `Hey there! Welcome to the PC Assembly & Troubleshooting Simulation! This is your space 
        to mess around with building and fixing computers, no real-world risks involved ng computers, 
        no real-world risks involved.`,
      `In this simulation, you'll get to assemble a PC, pick the right parts, hook them up, and
        power it on. But here's the fun part — you'll also run into some real-life troubleshooting 
        problems, helping you learn how to spot and fix issues like a pro`,
      `Whether you’re new to PCs or just brushing up, this is a chill way to learn, make mistakes, 
        and level up your skills — no stress, no pressure. Ready to get started? Let’s build and fix 
        some cool stuff!`
    ]
    this.componentDialogues = [
      [
        `This is the Chassis, or Computer Case. The Chassis is the enclosure that houses and protects all internal components
          of a PC, including the motherboard, power supply, storage devices, and cooling systems. It ensures
          proper airflow, cable management, and structural support for safe and efficient system operation.`
      ]
    ]
        
    // Start Button
    this.startButton = document.querySelector("#startBtn");
    this.bar = document.querySelector(".progress-bar");
    this.progress = 0

    this.phase = 0

    // Carousel
    this.carousel = document.querySelector('.carousel')
    this.angle = 45
    this.currentRotation = 0
    this.carouselImages = document.querySelectorAll('.carousel .face img')
    this.frontFace = 0

    this.boundIntroNext = () => this.next(this.introDialogues);
    this.boundComponentNext = () => this.next(this.componentDialogues[this.dialogueIndex]);
  }

  init() {
    window.scrollTo({top: 0, behavior: 'smooth'});
    this.startButton.addEventListener('click', () => {if(!this.sequenceStarted) this.startSequence()})
    window.addEventListener('wheel', (e) => this.handleWheel(e), {passive: false})
    this.adjustCarousel()
  }

  startSequence() {
    this.sequenceStarted = true
    const dur = 4300
    
    // Start animation on page1
    this.flash('page1');
    this.page1.style.animation = "shake 4s forwards"
    setTimeout(() => {
      this.page1.style.animation = "popout 2s ease-in forwards";
    }, dur);

    // After animation ends, hide page1 and show page2
    setTimeout(() => {
      this.page1.style.display = "none";  
      this.page2.style.display = "block"; 
      this.page2.style.top = "59px";

      // Scroll to dialogue area
      const winHeight = window.innerHeight * 2;
      window.scrollTo({
        top: winHeight, 
        behavior: 'smooth'
        
      });

      // Start displaying shadow
      this.page3.asst.style.visibility = "visible"
    }, dur + 2100);

    // Swap Elements from page2 to page3
    setTimeout(() => {
      this.page3.asst.firstElementChild.style.visibility = "visible"
      this.dialogueBox.style.opacity = 1
    }, dur + 4000);

    setTimeout(() => {
      this.page2.style.display = "none"

      this.updateDialogueBox(this.introDialogues)
      this.type(this.introDialogues[this.dialogueIndex]);
      this.dialogueBox.addEventListener("click", this.boundIntroNext);

      this.dialogueBox.addEventListener("click", () => this.next(this.introDialogues));      
    }, dur + 4300);
  }

  updateDialogueBox(dialogueSet) {
    if(dialogueSet.length > 1) {

    }
  }

  adjustCarousel() {
    this.carouselImages.forEach((img, i) => {
      const faceRotation = this.angle * i;
      const counterRotation = this.currentRotation + faceRotation;

      img.style.transform = `rotateY(${-1 * counterRotation}deg)`
      if (i !== this.frontFace) {
        img.style.opacity = 0.1
      }
    })  
  }

  handleWheel(e) {
    e.preventDefault();
    this.phase === 0 ? this.handleProgress(e) : this.handleCarousel(e)
  }

  handleProgress(e) {
    if(this.sequenceStarted) return
    if(e.deltaY > 0) {
      this.progress += 5
    }
    if(e.deltaY < 0) {
      this.progress -= 5
    }
    if(this.progress < 0) {
      this.progress = 0
    }
    this.bar.style.transform = `translateX(${this.progress}%)`

    if(this.progress >= 95 && !this.sequenceStarted) {
      this.progress = 100
      console.log('hit')
      this.startButton.click()
    }
  }

  handleCarousel(e) {
    const totalFaces = this.carouselImages.length;
    const direction = e.deltaY > 0 ? 1 : -1;
  
    this.frontFace = (this.frontFace + direction + totalFaces) % totalFaces;
    this.currentRotation += -direction * this.angle;
  
    this.carousel.style.transform = `rotateY(${this.currentRotation}deg)`;
  
    this.carouselImages.forEach((img, i) => {
      const faceRotation = this.angle * i;
      const counterRotation = this.currentRotation + faceRotation;
      img.style.transform = `rotateY(${-1 * counterRotation}deg)`;
  
      const isFront = i === this.frontFace;
      img.style.opacity = isFront ? 1 : 0.1;
  
      // 3D effect: adjust z-index and scale to simulate depth
      img.style.zIndex = isFront ? 2 : 1;
      img.style.transform += isFront ? " scale(1.1)" : " scale(0.9)";
    });
  
    const labels = document.querySelectorAll('.carousel .face p');
    labels.forEach((label, j) => {
      label.style.visibility = j === this.frontFace ? 'visible' : 'hidden';
    });
  }
  

  type(text, i = 0) {
    this.isTyping = true;
    this.dialogueText.textContent = text.slice(0, i);
    if (i < text.length) {
      this.typingTimer = setTimeout(() => this.type(text, i + 1), 10);
    }
    else {
      this.isTyping = false;
    }
  }

  flash(element, duration = 4) {
    const flash = document.querySelector(`#${element} .flash`);
    flash.style.animation = "none";
    flash.style.animation = `flash ${duration}s forwards`;
  }  

  next = (dialogueSet) => {
    console.log(dialogueSet)
    if (this.isTyping) {
      // If typing, stop typing and show the full text immediately
      clearTimeout(this.typingTimer);
      this.dialogueText.textContent = dialogueSet[this.dialogueIndex];
      this.isTyping = false;
    } else if (this.dialogueIndex < dialogueSet.length - 1) {
      // If not typing, move to the next dialogue
      this.dialogueIndex++;
      this.type(dialogueSet[this.dialogueIndex]);
    } else if (this.phase !== 1 && dialogueSet === this.introDialogues) {
      // If at the end of the intro dialogues, repurpose the event listener
      this.dialogueText.innerHTML = ""
      this.dialogueBox.removeEventListener("click", this.next);
      this.dialogueIndex = 0;
      this.phase = 1
      this.page3.asst.style.animation = "slide-left 2s forwards"
      
      setTimeout(() => {
        this.page3.asst.style.animation = "none"
        this.page3.asst.style.transform = "none"
        this.page3.gridWrapper.classList.add("grid-phase1")
      }, 2000);
      setTimeout(() => {  
        this.page3.scene.style.display = "block"
        this.page3.scene.style.animation = "carousel-appear .4s forwards ease-in"

        this.type(this.componentDialogues[this.dialogueIndex][0]);
        
        console.log(this.componentDialogues[this.dialogueIndex])
        this.dialogueBox.addEventListener('click', () => this.next(this.componentDialogues[this.dialogueIndex]));
      }, 2100)
    }
      
      
  //    else {
  //     // If at the end of the dialogueSet, hide the dialogue box and remove the event listener
  //     this.dialogueBox.removeEventListener("click", this.next);
  //   }
  }
  debug() {
    this.adjustCarousel()

    this.page3.gridWrapper.classList.add("grid-phase1")
    // assistant styles
    this.page3.asst.style.animation = "none"
    this.page3.asst.style.transform = "none"
    this.page3.asst.style.visibility = "visible"
    this.page3.asst.firstElementChild.style.visibility = "visible"
    // assistant scene
    this.page3.scene.style.display = "block"    
    this.page3.scene.style.animation = ""  

    // mouse wheel
    this.phase = 1      // PHASE HANDLE
    window.addEventListener('wheel', (e) => this.handleWheel(e), {passive: false})
  }
}

const assistant = new Assistant();
// assistant.debug()
assistant.init();  