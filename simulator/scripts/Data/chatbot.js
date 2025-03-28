class chatbot{
    constructor() {
        this.chatInput = document.getElementById("chat-input");
        this.chatSend = document.getElementById("chat-send");
        this.chatMessages = document.getElementById("chat-messages");
         // Add toggle functionality
         this.chatbot = document.getElementById("chatbot");
         this.toggleButton = document.querySelector(".chat-toggle");
         
         // Initially hide the chatbot
         this.chatbot.classList.add("collapsed");
         
         // Bind toggle method
         this.toggleChat = this.toggleChat.bind(this);
         
         // Add click listener to toggle button
         this.toggleButton.addEventListener("click", this.toggleChat);
        
        this.autoResponses = {
            "hello": "Hello! How can I help you today?",
            "hi": "Hello! How can I help you today?",
            "what is this": "Welcome to Build It Yourself! This simulator lets you learn PC building through interactive experiences.",
            "what is this?": "Welcome to Build It Yourself! This simulator lets you learn PC building through interactive experiences.",
            "how does this work": "Welcome to Build It Yourself! This simulator lets you learn PC building through interactive experiences.",
        };

        // Bind the method to preserve 'this' context
        this.sendMessage = this.sendMessage.bind(this);
        
        // Add event listener in constructor
        this.chatSend.addEventListener("click", this.sendMessage);
    }
    toggleChat() {
        this.chatbot.classList.toggle("collapsed");
        this.toggleButton.classList.toggle("active");
    }
    sendMessage() {
        const userMessage = this.chatInput.value.toLowerCase();
        this.chatMessages.innerHTML += `<p><strong>You:</strong> ${userMessage}</p>`;
        
        let botResponse = this.autoResponses[userMessage] || "I'm not sure, but I'm learning!";
        
        setTimeout(() => {
            this.chatMessages.innerHTML += `<p><strong>Bot:</strong> ${botResponse}</p>`;
        }, 500);
        
        this.chatInput.value = ""; // Clear input
    }
}


export default chatbot
