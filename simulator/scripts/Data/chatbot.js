class chatbot{
    constructor( pcUnit, portsTab, bootUpTab, drawer, inventory, shop, main) {
        this.pcUnit = pcUnit
        this.portsTab = portsTab
        this.bootUpTab = bootUpTab
        this.drawer = drawer
        this.inventory = inventory
        this.shop = shop
        this.main = main
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
            "how do i start": "To start, buy components from the shop, place them on the canvas, and try booting up your system!",
            "how to start": "To start, buy components from the shop, place them on the canvas, and try booting up your system!",
            "what do i do first": "To start, buy components from the shop, place them on the canvas, and try booting up your system!",
            "what is the shop?": "You can access the shop to purchase components. Simply click on the shop tab and browse through the available components.",
            "what do i need to build a pc?": "A complete PC build requires a motherboard, CPU, RAM, storage, GPU, PSU, and a case. Make sure to check your wattage!",
            "what is a gpu": "A GPU (Graphics Processing Unit) or graphics card is responsible for rendering images, videos, and animations on your computer. It's especially important for gaming and graphics-intensive tasks.",
            "what is gpu": "A GPU (Graphics Processing Unit) or graphics card is responsible for rendering images, videos, and animations on your computer. It's especially important for gaming and graphics-intensive tasks.",
            "what is a cpu": "A CPU (Central Processing Unit) is the main processor of your computer. It performs most of the calculations and instructions that make your computer work.",
            "what is cpu": "A CPU (Central Processing Unit) is the main processor of your computer. It performs most of the calculations and instructions that make your computer work.",
            "what is ram": "RAM (Random Access Memory) is your computer's short-term memory, used to temporarily store data that active programs need quick access to.",
            "what is a psu": "A PSU (Power Supply Unit) converts power from your wall outlet into usable power for your computer components. It's crucial for providing stable, reliable power to all parts.",
            "what is motherboard": "A motherboard is the main circuit board of your computer. It connects all components together and allows them to communicate with each other.",
            "what is storage": "Storage devices (like SSDs or HDDs) are used to permanently store your operating system, programs, and files even when the computer is turned off.",
            "what is cooling": "Cooling components (like fans or heatsinks) help keep your computer's parts from overheating during operation. They're essential for maintaining stable performance.",
            "what is a cpu cooler": "A CPU cooler is a device that dissipates heat from the CPU to keep it within safe operating temperatures. It can be air-cooling or liquid-cooling.",
            "what are your features": "I can help you with: <br>1. Understanding PC components<br>2. Installation guides<br>3. Opening tabs(/help to know the different commands)<br>4. Recommendations for builds<br>5. General questions about PC building",
            // ... add more static responses       
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

        // Command definitions
        this.commands = {
            createPc:{
                intent:['/create pc', 'build', 'assemble', 'put together'],
                action: () => {
                    this.createPc();
                    return "Added basic components to the canvas. You can now start building your PC!";
                }
            },
            openShop: {
                intent: ['/open shop', 'shop', 'buy', 'purchase', 'store'],
                action: () => {
                    this.openShop();
                    return "Opening the shop for you...";
                }
            },
            openInventory: {
                intent: ['/open inventory', 'inventory', 'items', 'components', 'parts'],
                action: () => {
                    this.openInventory();
                    return "Opening the inventory for you...";
                }
            },
            openBoot: {
                intent: ['/open boot'],
                action: () => {
                    this.openBoot();
                    return "Opening the bootUp Tab for you...";
                }
            },
            openPorts: {
                intent: ['/open port'],
                action: () => {
                    this.openPorts();
                    return "Opening the portsTab for you...";
                }
            },
            openBIOS: {
                intent: ['/open bios', 'bios', 'settings'],
                action: () => {
                    if (this.bootUpTab.pcUnit.power === 'off') {
                        return "Please power on the system first!";
                    }
                    this.openBIOS();
                    return "Opening the BIOS for you...";
                }
            },
            clearChat: {
                intent: ['/clear'],
                action: () => {
                    this.clearMessages();
                    return "Messages have been cleared, let's start fresh!";
                }
            },
            help: {
                intent: ['/help'],
                action: () => {
                    return `Below are the available commands: <br>/open shop<br>/open inventory <br>/open boot <br>/open port <br>/open bios<br>/create pc<br>/clear<br>/help<br>`;
                }
            }
        };

        // Installation guides
        this.installationGuides = {
            psu: {
                text: "To install PSU or power supply, place it into the canvas from your inventory then drag it into the chassis' designated slot.",
                image: "./assets/tbshoot/err/100/100-2.png"
            },
            cpu: {
                text: "To install CPU, place it into the canvas from your inventory then drag it into the motherboard's designated slot.",
                image: "./assets/tbshoot/err/300/300-2.png"
            },
            motherboard: {
                text: "To install motherboard, place it into the canvas from your inventory then drag it into the chassis' designated slot.",
                image: "./assets/tbshoot/err/200/200-2.png"
            },
            ram: {
                text: "To install RAM, place it into the canvas from your inventory then drag it into the motherboard's RAM slots.",
                image: "./assets/tbshoot/err/400/400-2.png"
            },
            gpu: {
                text: "To install GPU, place it into the canvas from your inventory then drag it into the designated motherboard's PCIe slots.",
                image: "./assets/tbshoot/err/600/600-2.png"
            },
            cooling: {
                text: "To install cpu cooling, place it into the canvas from your inventory then drag it into the motherboard's designated slot.",
                image: "./assets/tbshoot/err/700/700-2.png"
            },
            storage: {
                text: "To install storage(SSD,HDD, or M.2), place it into the canvas from your inventory then drag it into the chassis or motherboard designated slots.",
                image: "./assets/tbshoot/err/500/500-2.png"
            }
        };
        
        this.intentCategories = {
            educational: {
                components: ['what is', 'explain', 'describe'],
                building: ['how to', 'steps for', 'guide me'],
                concepts: ['what means', 'why need', 'purpose of']
            },
            recommendations: {
                specific: ['recommend gpu', 'suggest cpu', 'good ram'],
                builds: ['gaming build', 'office setup', 'casual system'],
                budget: ['cheap', 'expensive', 'best value']
            },
            installation: {
                preparation: ['before install', 'get ready', 'need to'],
                process: ['install', 'put in', 'connect'],
                verification: ['check if', 'verify', 'test']
            },
            troubleshooting: {
                errors: ['error', 'problem', 'not working'],
                compatibility: ['compatible', 'work with', 'fit'],
                performance: ['slow', 'fast', 'better']
            }
        };
        
        // Add build-related intents
        this.buildIntents = {
            gaming: ['gaming build', 'gaming pc', 'good gaming', 'for gaming'],
            office: ['office build', 'work pc', 'office pc', 'for work'],
            casual: ['casual build', 'casual pc', 'good casual', 'for casual']
        };

        // Setup memory system to remember conversation context
        this.memory = {
            lastIntents: [], // Store last few user intents
            selectedParts: {},// Keep track of selected components
            preferences: {}, // Store user preferences
            buildType: null,  // Remember if user wants gaming/office/casual build
            MAX_MEMORY: 5 // Maximum number of intents to remember
        };

        // Initialize Fuse.js for fuzzy matching
        this.initializeFuzzyMatcher();


        this.chatSend.disabled = true
        this.chatSend.style.opacity = '0.5'
    }

    createPc() {
        // Check if the Main instance and the method exist
        if (this.main.addBasicComponents) {
            window.main.addBasicComponents();
        } else {
            // Fallback if the method is not available
            return "Sorry, I couldn't create a PC automatically. Please try again or contact support.";
        }
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

    // Start fuzzy matching
    initializeFuzzyMatcher() {
        // Combine all possible intents for fuzzy matching
        const intents = [
            ...Object.keys(this.autoResponses), // Auto-responses
            ...Object.keys(this.installationGuides), // Installation guides
            ...Object.keys(this.commands).flatMap(cmd => this.commands[cmd].intent) // Flatten the command intents (flat map to get all intents)
        ];
        // Initialize Fuse.js with the intents
        this.fuzzyMatcher = new Fuse(intents, { 
            includeScore: true, // Include score in results
            threshold: 0.6, // Set threshold for fuzzy matching     
            keys: ['text'] // Specify the key to search in
        });
    }

    clearMessages() {
        this.chatMessages.innerHTML = ""; // Clear chat messages
    }
    
    // Add fuzzy matching helper
    normalizeText(text) {
        return text.toLowerCase()
            .replace(/[^\w\s]/g, '') // Remove punctuation
            .trim(); // Trim whitespace
    }

    // Match intent using fuzzy matching
    async matchIntent(input) {
        try {
            const normalized = this.normalizeText(input);
            
            // Try exact matches first
            const exactMatch = this.findExactMatch(normalized);
            if (exactMatch) return exactMatch;

            // Check for installation queries
            const componentTypes = ['cpu', 'gpu', 'ram', 'storage', 'psu', 'motherboard', 'cooling'];
            const mentionedComponent = componentTypes.find(type => normalized.includes(type));
            if (normalized.includes('install') && mentionedComponent) {
                return { type: 'guide', name: mentionedComponent };
            }

            // Try fuzzy matching
            const fuzzyMatches = this.fuzzyMatcher.search(normalized);
            if (fuzzyMatches.length > 0 && fuzzyMatches[0].score < 0.4) { // Check if the score is below threshold
                return this.categorizeIntent(fuzzyMatches[0].item); 
            }

             // Check for build recommendations first
            if (this.matchBuildType(normalized)) {  
                return {
                    type: 'recommendation',
                    buildType: this.matchBuildType(normalized)
                };
            }

            // Try contextual matching based on memory
            const contextMatch = this.matchFromContext(normalized);
            if (contextMatch) return contextMatch;

            return null;
        } catch (error) {
            console.error('Error in matchIntent:', error);
            return null;
        }
    }

    // findExactMatch method to check for exact matches
    findExactMatch(input) {
        // Check auto-responses
        if (this.autoResponses[input]) {
            return { type: 'auto', response: this.autoResponses[input] };
        }

        // Check commands
        for (const [cmd, def] of Object.entries(this.commands)) {
            if (def.intent.some(i => input.includes(i))) {
                return { type: 'command', name: cmd };
            }
        }

        return null;
    }

     // match the build type based on user input
    matchBuildType(input) {
        // Check for gaming build
        if (this.buildIntents.gaming.some(term => input.includes(term))) {
            return 'gaming';
        }
        // Check for office build
        if (this.buildIntents.office.some(term => input.includes(term))) {
            return 'office';
        }
        // Check for casual build
        if (this.buildIntents.casual.some(term => input.includes(term))) {
            return 'casual';
        }
        return null;
    }

    // match from context and check users last question
    matchFromContext(input) {
        const lastIntent = this.memory.lastIntents[0];
        
        if (!lastIntent) return null;

        // Handle follow-up questions
        if (input.includes('what about') || input.includes('how about')) {
            return {
                type: 'followup',
                context: lastIntent,
                query: input
            };
        }

        // Handle educational questions
        else if (input.includes('what is') || input.includes('how does')) {
            return {
                type: 'educational',
                context: lastIntent,
                query: input
            };
        }

        // Handle installation questions
        else if (input.includes('install') || input.includes('put in')) {
            return {
                type: 'installation',
                context: lastIntent,
                query: input
            };
        }

        // Handle build-specific questions
        else if (this.memory.buildType && input.includes('recommend')) {
            return {
                type: 'recommendation',
                buildType: this.memory.buildType
            };
        }

        return null;
    }

    // update the memory with the last intents and selected parts
    updateMemory(intent, response) {
        // Store intent
        this.memory.lastIntents.unshift(intent);
        if (this.memory.lastIntents.length > this.memory.MAX_MEMORY) {
            this.memory.lastIntents.pop();
        }

        // Update build type if detected
        if (response.toLowerCase().includes('gaming')) {
            this.memory.buildType = 'gaming';
        } else if (response.toLowerCase().includes('office')) {
            this.memory.buildType = 'office';
        } else if (response.toLowerCase().includes('casual')) {
            this.memory.buildType = 'casual';
        }

        // Store selected parts if mentioned
        const partMatches = response.match(/installed? ([a-zA-Z0-9\s]+)/i); 
        if (partMatches) {
            this.memory.selectedParts[partMatches[1]] = true;
        }
    }

    // create a typing effect for the bot
    async simulateTyping() {
        // Calculate typing delay based on response length
        const minDelay = 500;  // Minimum delay of 500ms
        const maxDelay = 2000; // Maximum delay of 2000ms
        
        // Random delay between min and max
        const delay = Math.random() * (maxDelay - minDelay) + minDelay;
        
        // Return a promise that resolves after the delay
        return new Promise(resolve => setTimeout(resolve, delay));
    }

    // generate a response based on the user input and the matched intent    
    async generateResponse(query) {
             try {
            // Track conversation state
            this.conversationState = {
                currentTopic: null,
                lastIntent: null,
                stepInProcess: null,
                needsClarification: false
            };

            const intent = await this.matchIntent(query);
            let response;

            if (intent) {
                // Update conversation state
                this.conversationState.currentTopic = intent.type;
                this.conversationState.lastIntent = intent;

                response = await this.handleIntent(intent, query);
                this.updateMemory(intent, response);
            } else if (this.memory.lastIntents.length > 0) {
                // This was missing - handle follow-up questions
                response = await this.handleFollowUp(query, this.memory.lastIntents[0]);
            } else {
                response = this.getDefaultResponse(query);
            }

            // Make sure we have a valid response
            if (!response) {
                response = this.getDefaultResponse(query);
            }

            await this.simulateTyping();
            return response;

        } catch (error) {
            console.error('Error generating response:', error);
            return "I encountered an error. Please try again.";
        } finally {
            this.hideTypingIndicator();
        }
    }

    // Add typing indicators
    showTypingIndicator() {
        const indicator = document.createElement('div');
        indicator.className = 'typing-indicator';
        indicator.innerHTML = '<span>.</span><span>.</span><span>.</span>';
        this.chatMessages.appendChild(indicator);
    }

    // hide the typing indicator
    hideTypingIndicator() {
        const indicator = this.chatMessages.querySelector('.typing-indicator');
        if (indicator) indicator.remove();
    }
    
    // handle the diferent intents and return their respective responses
    async handleIntent(intent, query) {
        switch (intent.type) {
            case 'auto':
                return intent.response;

            case 'command':
                return this.commands[intent.name].action();

            case 'guide':
                const guide = this.installationGuides[intent.name];
                if (guide) {
                    return `${guide.text}<br><img src="${guide.image}" alt="${intent.name} Installation" class="tutorial-image">`;
                }
                return `I don't have an installation guide for ${intent.name}.`;

            case 'followup':
                return this.handleFollowUp(query, intent.context);

            case 'recommendation':
                return this.getRecommendation(intent.buildType);

            default:
                return this.getDefaultResponse(query);
        }
    }

    // handle the followup questions and provide the respective responses
    handleFollowUp(query, lastIntent) {
        if (!lastIntent) return "Could you be more specific?";
        
        const componentTypes = ['cpu', 'gpu', 'ram', 'storage', 'psu', 'motherboard', 'cooling'];
        const mentionedComponent = componentTypes.find(type => 
            query.toLowerCase().includes(type)
        );

        switch (lastIntent.type) {
            case 'guide':
                if (mentionedComponent) {
                    const guide = this.installationGuides[mentionedComponent];
                    return `${guide.text}<br><img src="${guide.image}" alt="${mentionedComponent} Installation" class="tutorial-image">`;
                }
                return `Similar to the ${lastIntent.name}, ${this.installationGuides[lastIntent.name].text}`;

            case 'recommendation':
                if (mentionedComponent) {
                    return this.getComponentRecommendation(mentionedComponent, this.memory.buildType);
                }
                return `What specific component would you like to know about for your ${this.memory.buildType} build?`;
            
            case 'educational':
                if (mentionedComponent) {
                    return this.autoResponses[mentionedComponent];
                }
            return "Could you specify which component you'd like to know about?";

            case 'installation':
                if (mentionedComponent) {
                    const guide = this.installationGuides[mentionedComponent];
                    return `${guide.text}<br><img src="${guide.image}" alt="${mentionedComponent} Installation" class="tutorial-image">`;
                }
            return `I don't have an installation guide for ${mentionedComponent}. Please specify a component.`;

            default:
                return "Could you rephrase your question?";
        }
    }

    // categorize the intent based on the matched text
    categorizeIntent(matchedText) {
        // Check if it matches a command intent
        for (const [cmd, def] of Object.entries(this.commands)) {
            if (def.intent.includes(matchedText)) {
                return { type: 'command', name: cmd };
            }
        }

        // Check if it matches an installation guide
        if (this.installationGuides[matchedText]) {
            return { type: 'guide', name: matchedText };
        }

        // Check if it matches an auto-response
        if (this.autoResponses[matchedText]) {
            return { type: 'auto', response: this.autoResponses[matchedText] };
        }

        return null;
    }

    // get the related components based on the selected component
    getRelatedComponents(componentType) {
        const relationMap = {
            'cpu': ['cooling', 'motherboard'],
            'motherboard': ['cpu', 'ram', 'gpu'],
            'gpu': ['psu', 'motherboard'],
            'ram': ['motherboard'],
            'storage': ['motherboard', 'psu'],
            'psu': ['gpu', 'storage'],
            'cooling': ['cpu', 'case']
        };

        return relationMap[componentType] || [];
    }

    // get the recommendation based on the build type
    getRecommendation(buildType) {
        switch (buildType) {
            case 'gaming':
                return "For gaming, I recommend: \n" +
                       "- High-performance CPU (i7/i9 or Ryzen 7/9)\n" +
                       "- Gaming GPU (RTX 3060 or better)\n" +
                       "- 16GB+ DDR4/DDR5 RAM\n" +
                       "- NVMe SSD for storage\n" +
                       "- 750W+ Gold rated PSU";

            case 'office':
                return "For office use, I recommend: \n" +
                       "- Mid-range CPU (i5 or Ryzen 5)\n" +
                       "- Integrated graphics or basic GPU\n" +
                       "- 8-16GB DDR4 RAM\n" +
                       "- SATA SSD\n" +
                       "- 500W Bronze rated PSU";

            case 'casual':
                return "For casual use, I recommend: \n" +
                        "- Entry-level CPU (i3 or Ryzen 3)\n" +
                        "- Integrated graphics\n" +
                        "- 8GB DDR4 RAM\n" +
                        "- SATA SSD or HDD\n" +
                        "- 450W PSU";

            default:
                return "Please specify a build type (gaming/office) for recommendations.";
        }
    }

    // get the component recommendation based on the build type
    getComponentRecommendation(component, buildType) {
        const recommendations = {
            gaming: {
                cpu: "For gaming, I recommend an i7/i9 or Ryzen 7/9 CPU for best performance",
                gpu: "For gaming, an RTX 3060 or better would be ideal",
                ram: "16GB or more of DDR4/DDR5 RAM is recommended for gaming",
                storage: "An NVMe SSD would give you the best loading times for games",
                psu: "A 750W+ Gold rated PSU is recommended for gaming builds",
                motherboard: "Look for a gaming motherboard with good VRMs and PCIe 4.0 support",
                cooling: "Good cooling is essential for gaming - consider a quality AIO or air cooler"
            },
            office: {
                cpu: "An i5 or Ryzen 5 is perfect for office work",
                gpu: "Integrated graphics or a basic GPU is sufficient",
                ram: "8-16GB of DDR4 RAM works well for office tasks",
                storage: "A SATA SSD provides good performance for office use",
                psu: "A 500W Bronze rated PSU is enough for office builds",
                motherboard: "Any standard B-series motherboard will work fine",
                cooling: "Stock cooling or basic air     cooling is sufficient"
            },
            casual: {
                cpu: "An i3 or Ryzen 3 is good for casual use",
                gpu: "Integrated graphics are sufficient for basic tasks",
                ram: "8GB of DDR4 RAM is enough for casual use",
                storage: "A basic SATA SSD or HDD will work fine",
                psu: "A 450W PSU is sufficient for casual builds",
                motherboard: "Any entry-level motherboard will do the job",
                cooling: "Stock cooling is fine for casual builds"
            }
        };

        const specificRecommendation = recommendations[buildType]?.[component];
    
        return specificRecommendation;
    }
    
    // if there are no matches, provide a default response
    getDefaultResponse(query) {
        const normalized = this.normalizeText(query);
        const componentTypes = ['cpu', 'gpu', 'ram', 'storage', 'psu', 'motherboard', 'cooling'];
        const mentionedComponent = componentTypes.find(type => normalized.includes(type));

        // Build type detection
        let buildType = null;
        if (normalized.includes('office') || normalized.includes('work')) {
            buildType = 'office';
        } else if (normalized.includes('casual') || normalized.includes('basic')) {
            buildType = 'casual';
        } else if (normalized.includes('gaming') || normalized.includes('game')) {
            buildType = 'gaming';
        }

        // Check for recommendation/suggestion
        if (/\b(recommend|suggest|good)\b/.test(normalized)) {
            if (mentionedComponent && buildType) {
                return this.getComponentRecommendation(mentionedComponent, buildType);
            }
            if (buildType) {
                return this.getRecommendation(buildType);
            }
            if (mentionedComponent) {
                // No build type, default to gaming
                return this.getComponentRecommendation(mentionedComponent, 'gaming');
            }
        }

        // “What is...” educational question
        if (normalized.includes('what is')) {
            const definitions = {
                'gpu': 'A GPU (Graphics Processing Unit) processes and renders graphics for your display.',
                'cpu': 'A CPU (Central Processing Unit) is the brain of your computer.',
                'ram': 'RAM (Random Access Memory) is short-term working memory for active tasks.',
                'psu': 'A PSU (Power Supply Unit) delivers power to your components.',
                'motherboard': 'The motherboard connects and communicates between all your PC parts.',
                'storage': 'Storage devices like SSDs or HDDs hold your OS and files.',
                'cooling': 'Cooling keeps your system from overheating via fans or liquid systems.'
            };
            if (mentionedComponent) return definitions[mentionedComponent];
        }

        // Installation guide
        if (normalized.includes('install') && mentionedComponent) {
            const guide = this.installationGuides[mentionedComponent];
            if (guide) {
                return `${guide.text}<br><img src="${guide.image}" alt="${mentionedComponent} installation guide" class="tutorial-image">`;
            }
            return `I don't have an installation guide for ${mentionedComponent}.`;
        }

        // Help command
        if (normalized.includes('help')) {
            return this.commands.help.action();
        }

        return "I'm not sure how to help with that. Try asking about a specific component or use /help.";
    }


    // Show/hide chatbot
    toggleChat() {
        this.chatbot.classList.toggle("collapsed")
        this.toggleButton.classList.toggle("online")
    }

    // Send message
    async sendMessage() {
         const userMessage = this.chatInput.value.trim();
        
         // Check if message is empty
         if (!userMessage) {
             return;
         }

         // Add user message to chat
         this.chatMessages.innerHTML += `<p class="chat-bubble user-message"><strong>You:</strong> ${userMessage}</p>`;

         // Show typing indicator while waiting for response
         this.showTypingIndicator();

         // Generate bot response
         const botResponse = await this.generateResponse(userMessage);

         // Add bot response to chat
         this.chatMessages.innerHTML += `
             <p class="chat-bubble bot-message">
                 <strong>Bot:</strong> ${botResponse}
             </p>
         `;

         // Scroll to bottom and reset input
         this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
         this.chatInput.value = "";
         this.chatSend.disabled = true;
         this.chatSend.style.opacity = '0.5';
     }   
}
export default chatbot