/**
 * JAB Manual - Story JavaScript Functions
 * Contains functions for story interactions, timelines, and other components
 */

// --- Tab Functionality ---
function openTab(evt, tabName) {
    // Hide all tab content
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(tab => {
        tab.style.display = 'none';
    });
    
    // Remove active class from all tab buttons
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
        button.classList.remove('active');
    });
    
    // Show the selected tab content and mark the button as active
    document.getElementById(tabName).style.display = 'block';
    evt.currentTarget.classList.add('active');
}

// --- Timeline Generation ---
function generateTimeline(timelineData) {
    if (!timelineData || !timelineData.length) return;
    
    const container = document.getElementById('timeline-tab');
    if (!container) return;
    
    // Create the timeline container
    const timelineContainer = document.createElement('div');
    timelineContainer.className = 'timeline-container';
    
    // Iterate through each era in the timeline data
    timelineData.forEach((era, eraIndex) => {
        // Create era title
        const eraDiv = document.createElement('div');
        eraDiv.className = 'timeline-era';
        
        const eraTitle = document.createElement('h2');
        eraTitle.textContent = era.era;
        eraDiv.appendChild(eraTitle);
        
        timelineContainer.appendChild(eraDiv);
        
        // Add era period subtitle
        if (era.period) {
            const eraPeriod = document.createElement('p');
            eraPeriod.className = 'text-center text-gray-600 -mt-4 mb-8';
            eraPeriod.textContent = era.period;
            timelineContainer.appendChild(eraPeriod);
        }
        
        // Add events for this era
        era.events.forEach((event, eventIndex) => {
            const eventDiv = document.createElement('div');
            eventDiv.className = `timeline-event ${eventIndex % 2 === 0 ? 'left' : 'right'}`;
            
            const contentDiv = document.createElement('div');
            contentDiv.className = 'timeline-content';
            
            const title = document.createElement('h3');
            title.className = 'text-xl font-bold mb-2';
            title.style.color = 'var(--primary-blue-dark)';
            title.textContent = event.title;
            contentDiv.appendChild(title);
            
            const description = document.createElement('p');
            description.textContent = event.description;
            contentDiv.appendChild(description);
            
            // Add characters if available
            if (event.characters && event.characters.length) {
                const chars = document.createElement('p');
                chars.className = 'mt-3 text-sm text-gray-600';
                chars.innerHTML = '<strong>Characters:</strong> ' + event.characters.join(', ');
                contentDiv.appendChild(chars);
            }
            
            eventDiv.appendChild(contentDiv);
            timelineContainer.appendChild(eventDiv);
        });
    });
    
    container.appendChild(timelineContainer);
}

// --- Characters Tab Generation ---
function generateCharacters(charactersData) {
    if (!charactersData || !charactersData.length) return;
    
    const container = document.getElementById('characters-tab');
    if (!container) return;
    
    const charactersGrid = document.createElement('div');
    charactersGrid.className = 'grid grid-cols-1 md:grid-cols-2 gap-4';
    
    charactersData.forEach(character => {
        const charCard = document.createElement('div');
        charCard.className = 'bg-white rounded-lg shadow-md overflow-hidden border-l-4';
        charCard.style.borderLeftColor = 'var(--primary-blue)';
        
        const cardBody = document.createElement('div');
        cardBody.className = 'p-5';
        
        const name = document.createElement('h3');
        name.className = 'text-xl font-bold mb-2';
        name.style.color = 'var(--primary-blue-dark)';
        name.textContent = character.name;
        cardBody.appendChild(name);
        
        const description = document.createElement('p');
        description.className = 'text-gray-600';
        description.textContent = character.description;
        cardBody.appendChild(description);
        
        charCard.appendChild(cardBody);
        charactersGrid.appendChild(charCard);
    });
    
    container.appendChild(charactersGrid);
}

// --- Quiz Generation ---
function generateQuiz(quizData) {
    if (!quizData || !quizData.length) return;
    
    const container = document.getElementById('quiz-tab');
    if (!container) return;
    
    const quizContainer = document.createElement('div');
    quizContainer.className = 'quiz-container';
    
    quizData.forEach((item, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'quiz-question';
        
        const questionText = document.createElement('p');
        questionText.innerHTML = `<strong>Q${index + 1}:</strong> ${item.question}`;
        questionDiv.appendChild(questionText);
        
        const button = document.createElement('button');
        button.className = 'show-answer-btn';
        button.textContent = 'Show Answer';
        button.setAttribute('onclick', 'toggleAnswer(this)');
        questionDiv.appendChild(button);
        
        const answer = document.createElement('div');
        answer.className = 'quiz-answer';
        answer.textContent = item.answer;
        answer.style.display = 'none';
        questionDiv.appendChild(answer);
        
        quizContainer.appendChild(questionDiv);
    });
    
    container.appendChild(quizContainer);
}

// --- Mind Map (v1) Generation ---
function generateMindmapV1(mindmapV1Data) {
    if (!mindmapV1Data) return;
    
    const container = document.getElementById('mindmap-v1-tab');
    if (!container) return;
    
    const wrapper = document.createElement('div');
    wrapper.className = 'mind-map-wrapper';
    
    const mapContainer = document.createElement('div');
    mapContainer.className = 'mind-map-container';
    
    // Create main node
    const mainNode = document.createElement('div');
    mainNode.className = 'mind-map-node main';
    mainNode.textContent = mindmapV1Data.name;
    mapContainer.appendChild(mainNode);
    
    // Create branches
    function createBranch(item) {
        const node = document.createElement('div');
        
        if (item.children && item.children.length > 0) {
            node.className = 'mind-map-node toggle-node';
            node.innerHTML = item.name + '<span class="toggle-icon">+</span>';
            
            const subBranches = document.createElement('div');
            subBranches.className = 'mind-map-sub-branches hidden';
            
            item.children.forEach(child => {
                const childElements = createBranch(child);
                childElements.forEach(element => subBranches.appendChild(element));
            });
            
            node.addEventListener('click', function(e) {
                e.stopPropagation();
                const subBranchesElement = this.nextElementSibling;
                subBranchesElement.classList.toggle('hidden');
                const toggleIcon = this.querySelector('.toggle-icon');
                toggleIcon.textContent = subBranchesElement.classList.contains('hidden') ? '+' : '-';
            });
            
            return [node, subBranches];
        } else {
            node.className = 'mind-map-node';
            node.textContent = item.name;
            return [node];
        }
    }
    
    // Build the mind map tree
    if (mindmapV1Data.children && mindmapV1Data.children.length) {
        mindmapV1Data.children.forEach(branch => {
            const elements = createBranch(branch);
            elements.forEach(element => mapContainer.appendChild(element));
        });
    }
    
    wrapper.appendChild(mapContainer);
    container.appendChild(wrapper);
}

// --- Mind Map (v2) Generation ---
function generateMindmapV2(mindmapV2Data) {
    if (!mindmapV2Data) return;
    
    const container = document.getElementById('mindmap-v2-tab');
    if (!container) return;
    
    const wrapper = document.createElement('div');
    wrapper.className = 'mind-map-wrapper-v2';
    
    const mapContainer = document.createElement('div');
    mapContainer.className = 'mind-map-container-v2';
    
    function createNodeV2(item) {
        const branchGroup = document.createElement('div');
        branchGroup.className = 'branch-group';
        
        const nodeWrapper = document.createElement('div');
        nodeWrapper.className = 'node-wrapper';
        
        const node = document.createElement('div');
        node.className = 'mind-map-node-v2';
        node.textContent = item.name;
        nodeWrapper.appendChild(node);
        
        branchGroup.appendChild(nodeWrapper);
        
        if (item.children && item.children.length) {
            const toggleIcon = document.createElement('span');
            toggleIcon.className = 'toggle-icon-v2';
            toggleIcon.textContent = '+';
            nodeWrapper.appendChild(toggleIcon);
            
            const subBranches = document.createElement('div');
            subBranches.className = 'sub-branches-v2 hidden';
            item.children.forEach(child => subBranches.appendChild(createNodeV2(child)));
            branchGroup.appendChild(subBranches);
            
            nodeWrapper.addEventListener('click', () => {
                subBranches.classList.toggle('hidden');
                toggleIcon.textContent = subBranches.classList.contains('hidden') ? '+' : '-';
            });
        }
        return branchGroup;
    }
    
    const mainNode = document.createElement('div');
    mainNode.className = 'mind-map-node-v2 main';
    mainNode.textContent = mindmapV2Data.name;
    mapContainer.appendChild(mainNode);
    
    if (mindmapV2Data.children) {
        const mainBranchesContainer = document.createElement('div');
        mainBranchesContainer.className = 'main-branches-container';
        mindmapV2Data.children.forEach(child => mainBranchesContainer.appendChild(createNodeV2(child)));
        mapContainer.appendChild(mainBranchesContainer);
    }
    wrapper.appendChild(mapContainer);
    container.appendChild(wrapper);
}

// --- Graphics Generation ---
function generateGraphics(graphicsData) {
    if (!graphicsData || !graphicsData.length) return;
    
    const container = document.getElementById('graphics-tab');
    if (!container) return;
    
    // Create the grid container
    const graphicsGrid = document.createElement('div');
    graphicsGrid.className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6';
    
    graphicsData.forEach(panel => {
        const panelDiv = document.createElement('div');
        panelDiv.className = 'graphic-novel-panel';
        
        // Create image
        const img = document.createElement('img');
        img.src = panel.imageSrc;
        img.alt = panel.imageAlt;
        panelDiv.appendChild(img);
        
        // Create caption container
        const captionDiv = document.createElement('div');
        captionDiv.className = 'graphic-novel-caption';
        
        // Add title
        const title = document.createElement('p');
        title.className = 'font-semibold';
        title.textContent = panel.title;
        captionDiv.appendChild(title);
        
        // Add description
        const description = document.createElement('p');
        description.className = 'text-sm';
        description.textContent = panel.description;
        captionDiv.appendChild(description);
        
        // Add dialogue if present
        if (panel.dialogue) {
            const dialogue = document.createElement('p');
            dialogue.className = 'dialogue';
            dialogue.textContent = panel.dialogue;
            captionDiv.appendChild(dialogue);
        }
        
        panelDiv.appendChild(captionDiv);
        graphicsGrid.appendChild(panelDiv);
    });
    
    container.appendChild(graphicsGrid);
}

// --- Quiz Answer Toggle Functionality ---
function toggleAnswer(button) {
    const answerDiv = button.nextElementSibling;
    if (answerDiv && answerDiv.classList.contains('quiz-answer')) {
        const isVisible = answerDiv.style.display === 'block';
        answerDiv.style.display = isVisible ? 'none' : 'block';
        button.textContent = isVisible ? 'Show Answer' : 'Hide Answer';
    }
}

// --- Initialize a Story Page ---
function initializeStoryPage(storyData) {
    // Update title and subtitle dynamically
    if (storyData) {
        const titleElement = document.querySelector('.title');
        const subtitleElement = document.querySelector('.subtitle');
        
        if (titleElement && storyData.title) {
            titleElement.textContent = storyData.title;
        }
        
        if (subtitleElement && storyData.subtitle) {
            subtitleElement.textContent = storyData.subtitle;
        }
    }
    
    // Add tab buttons dynamically
    const tabsContainer = document.querySelector('.tabs-container');
    if (tabsContainer) {
        const tabsData = [
            { id: 'original-story', label: 'Story' },
            { id: 'timeline-tab', label: 'Timeline' },
            { id: 'mindmap-v1-tab', label: 'Mind Map (v1)' },
            { id: 'mindmap-v2-tab', label: 'Mind Map (v2)' },
            { id: 'graphics-tab', label: 'Graphics' },
            { id: 'characters-tab', label: 'Characters' },
            { id: 'quiz-tab', label: 'Quiz' }
        ];
        
        tabsData.forEach(tab => {
            const button = document.createElement('button');
            button.className = 'tab-button';
            button.onclick = function() { openTab(event, tab.id); };
            button.textContent = tab.label;
            tabsContainer.appendChild(button);
        });
    }
    
    // Generate all components
    if (storyData) {
        // Generate the story content
        generateStory(storyData.storyContent);
        
        // Generate timeline
        generateTimeline(storyData.timelineData);
        
        // Generate characters
        generateCharacters(storyData.charactersData);
        
        // Generate quiz
        generateQuiz(storyData.quizData);
        
        // Generate mind maps
        generateMindmapV1(storyData.mindmapV1Data);
        generateMindmapV2(storyData.mindmapV2Data);
        
        // Generate graphics
        generateGraphics(storyData.graphicsData);
        
        // Set the initial active tab
        const firstTabBtn = document.querySelector('.tabs-container .tab-button');
        if (firstTabBtn) {
            firstTabBtn.classList.add('active');
            document.getElementById('original-story').style.display = 'block';
        }
    }
}

// --- Story Content Generation ---
function generateStory(storyContent) {
    if (!storyContent) return;
    
    const container = document.getElementById('original-story');
    if (!container) return;
    
    // Clear existing content except for the class attributes
    container.innerHTML = '';
    container.className = 'tab-content active text-justify';
    
    // Create the prose wrapper
    const proseDiv = document.createElement('div');
    proseDiv.className = 'prose max-w-none';
    
    // Check if storyContent is an array of tag objects or a simple HTML string
    if (Array.isArray(storyContent)) {
        // Handle structured content (array of tag objects)
        storyContent.forEach(item => {
            const element = document.createElement(item.tagType);
            
            // Add specific classes for different element types
            if (item.tagType === 'h3') {
                element.className = 'story-heading';
            } else if (item.tagType === 'p') {
                element.className = 'story-paragraph';
            } else if (item.tagType === 'hr') {
                element.className = 'story-divider'; // Changed from story-section-divider to match CSS
            }
            
            // Set innerHTML for content, but handle hr elements specially
            if (item.tagType === 'hr' && !item.tagHTML) {
                // HR elements don't need innerHTML
            } else {
                element.innerHTML = item.tagHTML;
            }
            
            proseDiv.appendChild(element);
        });
    } else {
        // Handle legacy HTML string format
        proseDiv.innerHTML = storyContent;
    }
    
    container.appendChild(proseDiv);
}
