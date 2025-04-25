class Assistant {
  constructor() {
    this.sequenceStarted = false
    // pages
    this.page1 = document.querySelector('#page1 .assistant-container');
    this.page2 = document.querySelector('#page2 .assistant-container');
    this.page3 = document.querySelector('#page3 .assistant-container');
    
    // dialogue box
    this.dialogueBox = document.querySelector(".dialogue-box");
    this.dialogueText = document.querySelector(".dialogue-text");
    this.dialogueIndex = 0;
    this.dialogues = [
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
    this.typingTimer = null;
    this.isTyping = false;
        
    // Start Button
    this.startButton = document.querySelector("#startBtn");
    this.bar = document.querySelector(".progress-bar");
    this.progress = 0
  }

  init() {
    window.scrollTo({top: 0, behavior: 'smooth'});
    this.startButton.addEventListener('click', () => {if(!this.sequenceStarted) this.startSequence()})
    window.addEventListener('wheel', (e) => this.handleWheel(e), {passive: false})
  }

  handleWheel(e) {
    // e.preventDefault();
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
      this.page2.style.top = "83px";

      // Scroll to dialogue area
      const winHeight = window.innerHeight * 2;
      window.scrollTo({
        top: winHeight, 
        behavior: 'smooth'
        
      });

      // Start displaying shadow
      this.page3.style.visibility = "visible"
    }, dur + 2100);

    // Swap Elements from page2 to page3
    setTimeout(() => {
      this.page3.firstElementChild.style.visibility = "visible"
      this.dialogueBox.style.opacity = 1
    }, dur + 4600);

    setTimeout(() => {
      this.page2.style.display = "none"
      this.type(this.dialogues[this.dialogueIndex]);
      this.dialogueBox.addEventListener("click", () => this.next());      
    }, dur + 5100);
    
  }

  next() {
    if (this.isTyping) {
      // If typing, stop typing and show the full text immediately
      clearTimeout(this.typingTimer);
      this.dialogueText.textContent = this.dialogues[this.dialogueIndex];
      this.isTyping = false;
    } else if (this.dialogueIndex < this.dialogues.length - 1) {
      // If not typing, move to the next dialogue
      this.dialogueIndex++;
      this.type(this.dialogues[this.dialogueIndex]);
    } else {
      // If at the end of the dialogues, hide the dialogue box and remove the event listener
      this.dialogueBox.removeEventListener("click", this.next);
    }
  }
}

const assistant = new Assistant();
assistant.init();
