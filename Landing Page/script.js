const dialogueBox = document.querySelector(".dialogue-box");
const dialogueText = document.querySelector(".dialogue-text");

let dialogueIndex = 0;
let typingTimer;
let isTyping = false;

const dialogue = [
  `Hey there! Welcome to the PC Assembly & Troubleshooting Simulation! This is your space 
     to mess around with building and fixing computers, no real-world risks involved ng computers, 
     no real-world risks involved.`,
    `In this simulation, you'll get to assemble a PC, pick the right parts, hook them up, and
     power it on. But here's the fun part — you'll also run into some real-life troubleshooting 
     problems, helping you learn how to spot and fix issues like a pro`,
    `Whether you’re new to PCs or just brushing up, this is a chill way to learn, make mistakes, 
     and level up your skills — no stress, no pressure. Ready to get started? Let’s build and fix 
     some cool stuff!`
];

function type(text, i = 0) {
  isTyping = true;
  dialogueText.textContent = text.slice(0, i);
  if (i < text.length) {
    typingTimer = setTimeout(() => type(text, i + 1), 10);
  } else {
    isTyping = false;
  }
}

function nextDialogue() {
  if (isTyping) {
    clearTimeout(typingTimer);
    dialogueText.textContent = dialogue[dialogueIndex];
    isTyping = false;
  } else if (dialogueIndex < dialogue.length - 1) {
    dialogueIndex++;
    type(dialogue[dialogueIndex]);
  } else {
    dialogueBox.removeEventListener("click", nextDialogue);
  }
}

type(dialogue[dialogueIndex]);
dialogueBox.addEventListener("click", nextDialogue);
