class chatbot{
    constructor( pcUnit, portsTab, bootUpTab, drawer, inventory, shop,) {
        this.pcUnit = pcUnit
        this.portsTab = portsTab
        this.bootUpTab = bootUpTab
        this.drawer = drawer
        this.inventory = inventory
        this.shop = shop
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
        this.chatInput.addEventListener('input', () => {
            const isEmpty = !this.chatInput.value.trim()
            this.chatSend.disabled = isEmpty
            this.chatSend.style.opacity = isEmpty ? '0.5' : '1'
        })
        this.chatInput.addEventListener("keypress", (event) => {
            if (event.key === "Enter") {
                this.sendMessage()
            }
        })

        this.chatSend.disabled = true
        this.chatSend.style.opacity = '0.5'
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
    openBIOS() {
        let biosModal = document.getElementById("biosModal");
         if (biosModal) {
            setTimeout(() => {
                biosModal.showModal();
                this.bootUpTab.pcUnit.bios.updateBiosDisplay()
            }, 1800);
        } else {
            console.error("BIOS modal not found!"); 
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
        if (query.includes('/open bios')) {   
            if(this.bootUpTab.pcUnit.power === 'off'){
                return "Please power on the system first!"
            } else if(this.bootUpTab.pcUnit.power === 'on') {  
                this.openBIOS(); 
                return "Opening the BIOS for you...";
            }
        }
        if (query.includes('/clear')) {
            this.clearMessages(); 
            return "Messages have been cleared, let's start fresh!";
        }
        if (query.includes('/help')) {
            return `Below are the available commands: <br>/open shop<br>/open inventory <br>/open boot <br>/open port <br>/open bios<br>/clear<br>/help<br>`
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

        //if (query.includes('place') || query.includes('placing') || query.includes('install') || query.includes('installing')){
        //    return "To place components place them first into the canvas by simply clicking them in the inventory tab then drag and drop them into their appropriate slots. A green outline will appear where the component will be placed."
        //}

        // Component & Assembly Questions
        if (query.includes('what are ports') || query.includes('what are wires')) {
            return "The ports and wires are essential for connecting components so make sure to connect them properly! To check the ports and wires in the simulator simply click on the ports tab and wires drawer."
        }

        if (query.includes('cpu compatible') || query.includes('motherboard compatible')) {
            return "CPU and motherboard compatibility depends on the socket type. Make sure your CPU socket matches your motherboard socket (e.g., AM4, LGA1200). You can check compatibility in the component details."
        }
        
        if (query.includes('ram compatible') || query.includes('memory compatible')) {
            return "RAM compatibility depends on the motherboard's supported memory type (DDR4, DDR5, etc.). Check your motherboard specifications for supported RAM configurations."
        }

        if (query.includes('where does the power supply go') || query.includes('how to install psu')) {
            return `To install PSU or power supply, place it into the canvas from your inventory then drag it into the chassis' designated slot. 
            <br><img src="./assets/tbshoot/err/100/100-2.png" alt="PSU Installation" class="tutorial-image">`
        }

        if (query.includes('where does the motherboard go') || query.includes('how to install motherboard')) {
            return `To install motherboard, place it into the canvas from your inventory then drag it into the chassis' designated slot. 
            <br><img src="./assets/tbshoot/err/200/200-2.png" alt="motherboard Installation" class="tutorial-image">`
        }

        if (query.includes('where does the cpu go') || query.includes('how to install cpu')) {
            return `To install CPU or central processing unit, place it into the canvas from your inventory then drag it into the motherboard's designated slot. 
            <br><img src="./assets/tbshoot/err/300/300-2.png" alt="PSU Installation" class="tutorial-image">`
        }

        if (query.includes('how to install ram') || query.includes('where to place ram')) {
            return `To install RAM, place it into the canvas from your inventory then drag it into the motherboard's RAM slots. 
            <br><img src="./assets/tbshoot/err/400/400-2.png" alt="RAM Installation" class="tutorial-image">`
        }
        
        if (query.includes('how to install storage') || query.includes('where to place storage')) {
            return "To install storage(SSD,HDD, or M.2), place it into the canvas from your inventory then drag it into the chassis or motherboard designated slots."
        }

        if (query.includes('where to place m.2')||query.includes('how to install m.2')){
            return `To install m.2 ssd, place it into the canvas from your inventory then drag it into the designated motherboard slots. 
            <br><img src="./assets/tbshoot/err/500/500-3.png" alt="M.2 Installation" class="tutorial-image">`
        }

        if (query.includes('where to place hdd')||query.includes('how to install hdd')||query.includes('where to place ssd')||query.includes('how to install ssd')){
            return `To install storage(SSD or HDD), place it into the canvas from your inventory then drag it into the chassis' slots. 
            <br><img src="./assets/tbshoot/err/500/500-2.png" alt="HDDorSSD Installation" class="tutorial-image">`
        }

        if (query.includes('how to install gpu') || query.includes('where to put graphics card')) {
            return `To install GPU, place it into the canvas from your inventory then drag it into the designated motherboard's PCIe slots. 
            <br><img src="./assets/tbshoot/err/600/600-2.png" alt="GPU Installation" class="tutorial-image">`
        }

        if (query.includes('where does the cooling go') || query.includes('how to install cooling') || query.includes('how to install fan')) {
            return `To install cpu cooling, place it into the canvas from your inventory then drag it into the motherboard's designated slot. 
            <br><img src="./assets/tbshoot/err/700/700-2.png" alt="Cooling Installation" class="tutorial-image">`
        }

        if (query.includes('how to connect cables') || query.includes('how to use wires')) {
            return "Use the 'Ports' tab to connect power cables and data cables between components."
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

        if (query.includes('boot loop') || query.includes('keeps restarting')) {
            return "Boot loops can be caused by RAM issues, overheating, or power problems. Try reseating your RAM, checking all power connections, and ensuring your CPU cooler is properly installed."
        }

        if (query.includes('blue screen') || query.includes('bsod')) {
            return "Blue screens are often caused by hardware issues, driver problems, or overheating. Check your system temperatures, update drivers, and run memory diagnostics to troubleshoot."
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
        // System Navigation Questions
        if (query.includes('how to rotate') || query.includes('can i rotate')) {
            return "You can rotate the view by clicking the rotation arrows in the display area. This helps you see different sides of your build."
        }

        // Build Type Questions
        if (query.includes('gaming build') || query.includes('gaming pc')) {
            return "For a gaming build, focus on high-performance components: a gaming-grade GPU (like RTX 30/40 series), modern CPU (i7/i9 or Ryzen 7/9), and at least 16GB DDR4/DDR5 RAM. Don't forget adequate cooling!"
        }

        if (query.includes('office build') || query.includes('work pc')) {
            return "For an office build, you can use mid-range components: an i5/Ryzen 5 CPU, integrated graphics or basic GPU, and 8-16GB RAM. These provide good performance for productivity tasks."
        }

        if (query.includes('budget build') || query.includes('casual pc')) {
            return "For a budget/casual build, consider: i3/Ryzen 3 CPU, integrated graphics or entry-level GPU, and 8GB RAM. This setup works well for basic computing needs."
        }

        // Component Management
        if (query.includes('remove component') || query.includes('how to uninstall')) {
            return "To remove an installed component, click and drag it from its slot back to your inventory. For components inside the case, make sure to open the appropriate side panel first."
        }

        if (query.includes('check temperature') || query.includes('monitor temps')) {
            return "You can monitor temperatures in the BIOS menu. Access it by powering on the system and using '/open bios' command. Look for CPU and system temperatures in the monitoring section."
        }

        // BIOS-related Questions
        if (query.includes('change fan speed') || query.includes('adjust cooling')) {
            return "To adjust fan speeds: 1. Power on the system 2. Enter BIOS (/open bios) 3. Go to Fan Control section 4. Adjust the fan curve or select a preset profile (Silent/Standard/Turbo)"
        }

        if (query.includes('boot order') || query.includes('change boot device')) {
            return "To change boot order: 1. Enter BIOS 2. Go to Boot section 3. Use the up/down arrows to arrange your boot devices in order of priority."
        }

        // Error Handling
        if (query.includes('error code') || query.includes('what does error')) {
            return "Error codes in the boot process indicate specific issues:\nERR-100: PSU issues\nERR-200: Motherboard issues\nERR-300: CPU issues\nERR-400: RAM issues\nERR-500: Storage issues\nERR-600: GPU issues\nERR-700: Cooling issues"
        }

        // Power Management
        if (query.includes('check power') || query.includes('power usage')) {
            return "The system automatically calculates power usage based on your components. Check the wattage indicator when selecting a PSU - it should be at least 100W above your total system power draw."
        }

        // Performance Optimization
        if (query.includes('optimize') || query.includes('improve performance')) {
            return "To optimize your build: 1. Ensure proper cooling (check fan speeds in BIOS) 2. Verify all power connections 3. Use compatible RAM in dual-channel configuration 4. Install OS on SSD/NVMe drive for better performance"
        }

        // System Testing
        if (query.includes('test system') || query.includes('how to verify')) {
            return "To test your build: 1. Check all components are properly seated 2. Verify all power connections 3. Power on the system 4. Monitor temperatures in BIOS 5. Check for any error codes in the boot process"
        }

        // Storage Management
        if (query.includes('install os') || query.includes('operating system')) {
            return "To install an operating system: 1. Ensure you have a bootable storage device 2. Enter BIOS 3. Go to Boot section 4. Select 'Install OS' on your target drive 5. Save and restart"
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
        const userMessage = this.chatInput.value.trim() || this.chatInput.value.toLowerCase() 
        
        // Check if message is empty
        if (!userMessage) {
            return; // Exit the function if message is empty
        }
        this.chatMessages.innerHTML += `<p><strong>You:</strong> ${userMessage}</p>`
        let botResponse = this.generateResponse(userMessage) // Generate bot response based on user input
        setTimeout(() => {
            this.chatMessages.innerHTML += `<p><strong>Bot:</strong> ${botResponse}</p>` // Response of chatbot
            this.chatMessages.scrollTop = this.chatMessages.scrollHeight // Move to the bottom part of chat 
        }, 1000);
        this.chatSend.disabled = true
        this.chatSend.style.opacity = '0.5'
        this.chatInput.value = "" // Clear input
    }
}


export default chatbot
