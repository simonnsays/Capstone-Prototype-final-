class chatbot{
    constructor() {
        this.chatInput = document.getElementById("chat-input")
        this.chatSend = document.getElementById("chat-send")
        this.chatMessages = document.getElementById("chat-messages")
        // Add toggle functionality
        this.chatbot = document.getElementById("chatbot")
        this.toggleButton = document.querySelector(".chat-toggle")
        
        // Initially hide the chatbot
        this.chatbot.classList.add("collapsed")
        
        // Bind toggle method
        this.toggleChat = this.toggleChat.bind(this)
        
        // Add click listener to toggle button
        this.toggleButton.addEventListener("click", this.toggleChat)

        this.autoResponses = {
            "hello": "Hello! How can I help you today?",
            "hi": "Hello! How can I help you today?",
            "what is this": "Welcome to Build It Yourself! This simulator lets you learn PC building through interactive experiences.",
            "what is this?": "Welcome to Build It Yourself! This simulator lets you learn PC building through interactive experiences.",
            "how does this work": "Welcome to Build It Yourself! This simulator lets you learn PC building through interactive experiences.",
        }

        // Bind the method to preserve 'this' context
        this.sendMessage = this.sendMessage.bind(this)
        
        // Add event listener in constructor
        this.chatSend.addEventListener("click", this.sendMessage) 
        this.chatInput.addEventListener("keypress", (event) => {
            if (event.key === "Enter") {
                this.sendMessage()
            }
        })
        // Add event listener to the shop button
        this.openShop = this.openShop.bind(this)

    }

    openShop() {
        let shopModal = document.getElementById("shopModal"); 
        if (shopModal) {
            setTimeout(() => {
           shopModal.showModal(); 
            }, 1800);
        } else {
            console.error("Shop modal not found!");
        }
    }
    openInventory() {
        let invModal = document.getElementById("invModal"); 
        if (invModal) {
            setTimeout(() => {
           invModal.showModal(); 
            }, 1800);
        } else {
            console.error("Inventory modal not found!");
        }
    }
    openBoot() {
        let bootModal = document.getElementById("openBootTab"); 
        if(bootModal) {
            setTimeout(() => {
           bootModal.click(); 
            }, 1800);
        } else{
            console.error("BootUp modal not found!");
        }
    }
    openPorts() {
        let portModal = document.getElementById("openWires"); 
        if (portModal) {
            setTimeout(() => {
          portModal.click(); 
            }, 1800);
        } else {
            console.error("Port modal not found!");
        }
    }

    clearMessages() {
        this.chatMessages.innerHTML = ""; // Clear chat messages
    }
    

    generateResponse(query) {
        query = query.toLowerCase()
        
        // Commands
        if (query.includes('/open shop')) {
            this.openShop(); 
            return "Opening the shop for you...";
        }
        if (query.includes('/open inventory')) {
            this.openInventory(); 
            return "Opening the inventory for you...";
        }
        if (query.includes('/open boot')) {
            this.openBoot(); 
            return "Opening the bootUp Tab for you...";
        }
        if (query.includes('/open port')) {
            this.openPorts(); 
            return "Opening the portsTab for you...";
        }
        if (query.includes('/clear')) {
            this.clearMessages(); 
            return "Messages have been cleared, let's start fresh!";
        }
        if (query.includes('/help')) {
            return `Below are the available commands: <br>/open shop<br>/open inventory <br>/open boot <br>/open port <br>/clear`
        }

        // Basic Simulator Questions
        if (query.includes('how do i start') || query.includes('how to start') || query.includes('what do i do first')) {
            return "To start, buy components from the shop, place them on the canvas, and try booting up your system!"
        }

        if (query.includes('what is the shop?')) {
            return "You can access the shop to purchase components. Simply click on the shop tab and browse through the available components."
        }

        if (query.includes('buy') || query.includes('buying') || query.includes('purchase') || query.includes('purchasing') || query.includes('get') || query.includes('getting')){
            return "You can buy components from the shop by simply clicking the component that you want to purchase."
        }

        if (query.includes('what do i need to build a pc?') || query.includes('pc components list')) {
            return "A complete PC build requires a motherboard, CPU, RAM, storage, GPU, PSU, and a case. Make sure to check your wattage!";
        }

        if (query.includes('simulator') || query.includes('game')) {
            return "This simulator allows you to learn PC assembly and troubleshooting through interactive experiences."
        }

        if (query.includes('place' || 'placing') || query.includes('install' || 'installing')) {
            return "To place components place them first into the canvas by simply clicking them in the inventory tab then drag and drop them into their appropriate slots. A green outline will appear where the component will be placed."
        }

        // Component & Assembly Questions
        if (query.includes('ports') || query.includes('wires')) {
            return "The ports and wires are essential for connecting components so make sure to connect them properly! To check the ports and wires in the simulator simply click on the ports tab and wires drawer."
        }

        if (query.includes('how to install ram') || query.includes('where to place ram')) {
            return "To install RAM, place it into the canvas from your inventory then drag it into the motherboard's RAM slots."
        }

        if (query.includes('how to install gpu') || query.includes('where to put graphics card')) {
            return "Insert the GPU into the PCIe slot on the motherboard, ensuring it is properly seated."
        }

        if (query.includes('how to connect cables') || query.includes('how to use wires')) {
            return "Use the 'Ports' tab to connect power cables and data cables between components."
        }

        if (query.includes('where does the power supply go') || query.includes('how to install psu')) {
            return "The power supply (PSU) is placed inside the PC case, and you must connect it to the motherboard and components."

        }

        // Troubleshooting Questions
        if (query.includes('why is my screen black') || query.includes('no display')) {
            return "Check if your PC has all required components then try powerin on the system in the bootUp tab."
        }
        
        if (query.includes('why is my pc not turning on') || query.includes('pc won’t start') || query.includes('pc not booting')) {
            return "Check your power connections, installed components, and ensure all required parts are present."
        }

        if (query.includes('what is wattage') || query.includes('how much power do i need')) {
            return "Your PC's wattage is calculated based on your components. Use the wattage calculator in the simulator to check if your PSU is sufficient."
        }

        if (query.includes('cooling issue')) {
            return "Check if the fan is connected properly and if the power supply is turned on."
        }

        // Gameplay & Assistant Questions
        if (query.includes('play') || query.includes('start') || query.includes('begin')) {
            return "Start the simulation by simply buying components from the shop and placing them in the canvas. Then try to boot up the system!"
        }

        if (query.includes('assistant') || query.includes('help') || query.includes('guide')) {
            return "The assistant will guide you through the process of building your PC. You can ask questions about components, assembly, and troubleshooting by simply chatting your inquiries here."
        }

        if (query.includes('how does the assistant work?') || query.includes('how to use guide?')) {
            return "The assistant provides step-by-step instructions on building your PC. Open the assistant tab to see!"
        }                                

        // check static responses if no dynamic response is found
        return  this.autoResponses[query]  ||"I'm not sure about that. Try asking about specific components or features!" 
    }

    // Show/hide chatbot
    toggleChat() {
        this.chatbot.classList.toggle("collapsed")
        this.toggleButton.classList.toggle("online")
    }

    // Send message
    sendMessage() {
        const userMessage = this.chatInput.value.toLowerCase()
        this.chatMessages.innerHTML += `<p><strong>You:</strong> ${userMessage}</p>`
        
        let botResponse = this.generateResponse(userMessage) // Generate bot response based on user input
        setTimeout(() => {
            this.chatMessages.innerHTML += `<p><strong>Bot:</strong> ${botResponse}</p>` // Response of chatbot
            this.chatMessages.scrollTop = this.chatMessages.scrollHeight // Move to the bottom part of chat 
        }, 1000);
        
        this.chatInput.value = "" // Clear input
    }
}


export default chatbot
