class Assistant {
  constructor() {
    this.sequenceStarted = false
    // pages
    this.page1 = document.querySelector('#page1 .assistant-container');
    this.page2 = {
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
        some cool stuff!`,
      `I'll be here if you need me, Click on me to view your tasks and progress.`
    ]
        
    // Start Button
    this.startButton = document.querySelector("#startBtn");
    this.bar = document.querySelector(".progress-bar");
    this.progress = 0

    this.phase = 0
  }

  init() {
    window.scrollTo({top: 0, behavior: 'smooth'});
    this.startButton.addEventListener('click', () => {if(!this.sequenceStarted) this.startSequence()})
    window.addEventListener('wheel', (e) => this.handleWheel(e), {passive: false})
    window.addEventListener('keydown', (e) => { if(e) e.preventDefault() })
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
      // Scroll to dialogue area
      const winHeight = window.innerHeight * 2;
      window.scrollTo({
        top: winHeight, 
        behavior: 'smooth'
      });
      // Start displaying shadow
      this.page2.asst.style.visibility = "visible"
    }, dur + 2100);
    // Assistant falls down
    setTimeout(() => {
      this.page2.asst.firstElementChild.style.visibility = "visible"
      this.page2.asst.firstElementChild.style.bottom = "0"
    }, dur + 3000);
    // Dialogue box pop up
    setTimeout(() => {      
      this.dialogueBox.style.opacity = 1
      this.type(this.introDialogues[this.dialogueIndex]);
      this.dialogueBox.addEventListener("click", () => this.next(this.introDialogues));      
    }, dur + 4300);
  }

  handleWheel(e) {
    e.preventDefault();
    this.phase === 0 ? this.handleProgress(e) : this.handleCarousel(e)
  }

  handleProgress(e) {
    if(this.sequenceStarted) return

    if(e.deltaY > 0) this.progress += 5

    if(e.deltaY < 0) this.progress -= 5

    if(this.progress < 0) this.progress = 0

    this.bar.style.transform = `translateX(${this.progress}%)`

    if(this.progress >= 95 && !this.sequenceStarted) {
      this.progress = 100
      this.startButton.click()
    }
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
      setTimeout(() => {
        this.dialogueBox.style.opacity = 0;
        this.page2.asst.firstElementChild.classList.add('ver2')
        this.page2.asst.firstElementChild.classList.remove('float')
        this.page2.asst.classList.add('no-shadow')
      }, 500);
      setTimeout(() => {
        window.location.href = "./simulator/tutorial_mode.html"
      }, 2300)
    }
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
}

const assistant = new Assistant();
assistant.init();  