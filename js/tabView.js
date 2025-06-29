/**
 * JAB Manual - tabView.js
 * Contains functions to render dynamic content types for tabTemplate.html
 */

/**
 * Renders quiz content with Q&A List and Flashcard formats.
 * @param {object} quizData - The quiz data object from the JSON.
 * @param {HTMLElement} containerElement - The DOM element to render the quiz into.
 */
function renderQuiz(quizData, containerElement) {
    if (!quizData || !quizData.questions || quizData.questions.length === 0) {
        containerElement.innerHTML = '<p>No quiz questions available.</p>';
        return;
    }

    let html = `
        <div class="quiz-section">
            <h2 class="quiz-main-title">Test Your Knowledge</h2>
            <p class="quiz-format-prompt">Choose a format below to start the quiz.</p>
            <div class="quiz-format-selector">
                <button class="tab-button active" id="qa-list-btn">Q&A List</button>
                <button class="tab-button" id="flashcards-btn">Flashcards</button>
            </div>
            <div id="qa-list-view" class="quiz-view active">
                <h3 class="quiz-format-title">Quiz: Q&A Format</h3>
                <div id="qa-questions-container"></div>
            </div>
            <div id="flashcards-view" class="quiz-view" style="display: none;">
                <h3 class="quiz-format-title">Quiz: Flashcard Format</h3>
                <div id="flashcard-container" class="flashcard-container">
                    <div class="flashcard-card">
                        <div class="flashcard-front">
                            <p id="flashcard-question"></p>
                        </div>
                        <div class="flashcard-back">
                            <p id="flashcard-answer"></p>
                        </div>
                    </div>
                    <div class="flashcard-controls">
                        <button id="flashcard-prev" class="tab-button">Previous</button>
                        <span id="flashcard-counter"></span>
                        <button id="flashcard-next" class="tab-button">Next</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    containerElement.innerHTML = html;

    // Q&A List rendering
    const qaContainer = containerElement.querySelector('#qa-questions-container');
    quizData.questions.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'quiz-question';
        questionDiv.innerHTML = `
            <p><strong>${index + 1}. ${q.question}</strong></p>
            <button class="show-answer-btn">Show Answer</button>
            <div class="quiz-answer" style="display: none;">${q.answer}</div>
        `;
        qaContainer.appendChild(questionDiv);

        const showAnswerBtn = questionDiv.querySelector('.show-answer-btn');
        const quizAnswerDiv = questionDiv.querySelector('.quiz-answer');

        showAnswerBtn.addEventListener('click', () => {
            if (quizAnswerDiv.style.display === 'none') {
                quizAnswerDiv.style.display = 'block';
                showAnswerBtn.textContent = 'Hide Answer';
            } else {
                quizAnswerDiv.style.display = 'none';
                showAnswerBtn.textContent = 'Show Answer';
            }
        });
    });

    // Flashcard logic
    let currentFlashcardIndex = 0;
    const flashcardQuestion = containerElement.querySelector('#flashcard-question');
    const flashcardAnswer = containerElement.querySelector('#flashcard-answer');
    const flashcardCounter = containerElement.querySelector('#flashcard-counter');
    const flashcardPrevBtn = containerElement.querySelector('#flashcard-prev');
    const flashcardNextBtn = containerElement.querySelector('#flashcard-next');
    const flashcardCard = containerElement.querySelector('.flashcard-card');
    const flashcardFront = containerElement.querySelector('.flashcard-front');
    const flashcardBack = containerElement.querySelector('.flashcard-back');

    function updateFlashcard() {
        const currentQuestion = quizData.questions[currentFlashcardIndex];
        console.log('Updating flashcard. Current question:', currentQuestion);
        console.log('flashcardQuestion element:', flashcardQuestion);
        console.log('flashcardAnswer element:', flashcardAnswer);
        flashcardQuestion.textContent = currentQuestion.question;
        flashcardAnswer.textContent = currentQuestion.answer;
        flashcardCounter.textContent = `${currentFlashcardIndex + 1}/${quizData.questions.length}`;
        flashcardCard.classList.remove('flipped'); // Ensure card is not flipped when question changes
    }

    flashcardCard.addEventListener('click', () => {
        flashcardCard.classList.toggle('flipped');
    });

    flashcardPrevBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent card flip
        currentFlashcardIndex = (currentFlashcardIndex - 1 + quizData.questions.length) % quizData.questions.length;
        updateFlashcard();
    });

    flashcardNextBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent card flip
        currentFlashcardIndex = (currentFlashcardIndex + 1) % quizData.questions.length;
        updateFlashcard();
    });

    // Format selector logic
    const qaListBtn = containerElement.querySelector('#qa-list-btn');
    const flashcardsBtn = containerElement.querySelector('#flashcards-btn');
    const qaListView = containerElement.querySelector('#qa-list-view');
    const flashcardsView = containerElement.querySelector('#flashcards-view');

    qaListBtn.addEventListener('click', () => {
        qaListBtn.classList.add('active');
        flashcardsBtn.classList.remove('active');
        qaListView.style.display = 'block';
        flashcardsView.style.display = 'none';
    });

    flashcardsBtn.addEventListener('click', () => {
        flashcardsBtn.classList.add('active');
        qaListBtn.classList.remove('active');
        qaListView.style.display = 'none';
        flashcardsView.style.display = 'block';
        updateFlashcard(); // Initialize flashcard view
    });

    updateFlashcard(); // Initial load of the first flashcard
}

// Add other render functions here as needed

// Example for rendering other content types (placeholders)
function renderTextContent(textContent, containerElement) {
    if (!textContent) return;

    // Create the prose wrapper
    const proseDiv = document.createElement('div');
    proseDiv.className = 'prose max-w-none';

    // Check if textContent is an array of tag objects
    if (Array.isArray(textContent)) {
        textContent.forEach(item => {
            const element = document.createElement(item.tagType);

            // Add specific classes for different element types
            if (item.tagType === 'h1') {
                element.className = 'story-heading'; // Reusing story-heading for h1
            } else if (item.tagType === 'h2') {
                element.className = 'story-heading'; // Reusing story-heading for h2
            } else if (item.tagType === 'p') {
                element.className = 'story-paragraph';
            } else if (item.tagType === 'hr') {
                element.className = 'story-divider';
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
        // Fallback for simple string content, though we expect array now
        const p = document.createElement('p');
        p.className = 'story-paragraph';
        p.innerHTML = textContent.content; // Assuming it's an object with a 'content' key
        proseDiv.appendChild(p);
    }

    containerElement.appendChild(proseDiv);
}

function renderMindmap(mindmapData, containerElement) {
    if (!mindmapData || !mindmapData.nodes || mindmapData.nodes.length === 0) {
        containerElement.innerHTML = '<p>No mind map data available.</p>';
        return;
    }

    // Convert flat nodes to hierarchical tree
    function buildTree(nodes) {
        const map = new Map();
        nodes.forEach(node => map.set(node.id, { ...node, children: [] }));

        const tree = [];
        nodes.forEach(node => {
            if (node.parent) {
                const parentNode = map.get(node.parent);
                if (parentNode) {
                    parentNode.children.push(map.get(node.id));
                }
            } else {
                tree.push(map.get(node.id));
            }
        });
        return tree;
    }

    const hierarchicalNodes = buildTree(mindmapData.nodes);
    const mainNodeData = hierarchicalNodes.find(node => !node.parent); // Assuming the root has no parent

    if (!mainNodeData) {
        containerElement.innerHTML = '<p>Invalid mind map data: No root node found.</p>';
        return;
    }

    const wrapper = document.createElement('div');
    wrapper.className = 'mind-map-wrapper';
    
    const mapContainer = document.createElement('div');
    mapContainer.className = 'mind-map-container';
    
    // Create main node
    const mainNode = document.createElement('div');
    mainNode.className = 'mind-map-node main';
    mainNode.textContent = mainNodeData.text; // Use 'text' for content
    mapContainer.appendChild(mainNode);
    
    // Create branches recursively
    function createBranch(item) {
        const node = document.createElement('div');
        
        if (item.children && item.children.length > 0) {
            node.className = 'mind-map-node toggle-node';
            node.innerHTML = item.text + '<span class="toggle-icon">+</span>'; // Use 'text' for content
            
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
            node.textContent = item.text; // Use 'text' for content
            return [node];
        }
    }
    
    // Build the mind map tree from the main node's children
    if (mainNodeData.children && mainNodeData.children.length) {
        mainNodeData.children.forEach(branch => {
            const elements = createBranch(branch);
            elements.forEach(element => mapContainer.appendChild(element));
        });
    }
    
    wrapper.appendChild(mapContainer);
    containerElement.appendChild(wrapper);
}

function renderAccordian(accordianData, containerElement) {
    if (!accordianData || !accordianData.items || accordianData.items.length === 0) {
        containerElement.innerHTML = '<p>No accordian items available.</p>';
        return;
    }

    const accordianContainer = document.createElement('div');
    accordianContainer.className = 'accordian-container';

    if (accordianData.title) {
        const title = document.createElement('h2');
        title.className = 'accordian-title';
        title.textContent = accordianData.title;
        accordianContainer.appendChild(title);
    }

    if (accordianData.description) {
        const description = document.createElement('p');
        description.className = 'accordian-description';
        description.textContent = accordianData.description;
        accordianContainer.appendChild(description);
    }

    accordianData.items.forEach((item, index) => {
        const accordianItem = document.createElement('div');
        accordianItem.className = 'accordian-item';

        const accordianHeader = document.createElement('button');
        accordianHeader.className = 'accordian-header';
        accordianHeader.innerHTML = `<span>${item.header}</span><span class="accordian-toggle-icon">+</span>`;

        const accordianContent = document.createElement('div');
        accordianContent.className = 'accordian-content';
        accordianContent.innerHTML = item.content;
        accordianContent.style.display = 'none'; // Initially hidden

        accordianHeader.addEventListener('click', () => {
            const isOpen = accordianContent.style.display === 'block';
            accordianContent.style.display = isOpen ? 'none' : 'block';
            accordianHeader.classList.toggle('active', !isOpen);
            accordianHeader.querySelector('.accordian-toggle-icon').textContent = isOpen ? '+' : '-';
        });

        accordianItem.appendChild(accordianHeader);
        accordianItem.appendChild(accordianContent);
        accordianContainer.appendChild(accordianItem);
    });

    containerElement.appendChild(accordianContainer);
}

function renderGraphicsNovel(graphicsData, containerElement) {
    containerElement.innerHTML = `<h3>Graphics Novel: ${graphicsData.title}</h3><p>${graphicsData.description}</p><p>Graphics Novel rendering coming soon...</p>`;
}

function renderTimeline(timelineData, containerElement) {
    if (!timelineData || timelineData.length === 0) {
        containerElement.innerHTML = '<p>No timeline data available.</p>';
        return;
    }

    const timelineContainer = document.createElement('div');
    timelineContainer.className = 'timeline-container';

    timelineData.forEach((era, eraIndex) => {
        const eraDiv = document.createElement('div');
        eraDiv.className = 'timeline-era';
        
        const eraTitle = document.createElement('h2');
        eraTitle.textContent = era.era;
        eraDiv.appendChild(eraTitle);
        
        timelineContainer.appendChild(eraDiv);
        
        if (era.period) {
            const eraPeriod = document.createElement('p');
            eraPeriod.className = 'text-center text-gray-600 -mt-4 mb-8'; // Reusing classes from storyView.js
            eraPeriod.textContent = era.period;
            timelineContainer.appendChild(eraPeriod);
        }
        
        era.events.forEach((event, eventIndex) => {
            const eventDiv = document.createElement('div');
            eventDiv.className = `timeline-event ${eventIndex % 2 === 0 ? 'left' : 'right'}`;
            
            const contentDiv = document.createElement('div');
            contentDiv.className = 'timeline-content';
            
            const title = document.createElement('h3');
            title.className = 'text-xl font-bold mb-2'; // Reusing classes from storyView.js
            title.style.color = 'var(--primary-blue-dark)';
            title.textContent = event.title;
            contentDiv.appendChild(title);
            
            const description = document.createElement('p');
            description.innerHTML = event.description; // Use innerHTML to support rich content
            contentDiv.appendChild(description);
            
            if (event.characters && event.characters.length) {
                const chars = document.createElement('p');
                chars.className = 'mt-3 text-sm text-gray-600'; // Reusing classes from storyView.js
                chars.innerHTML = '<strong>People Involved:</strong> ' + event.characters.join(', ');
                contentDiv.appendChild(chars);
            }
            
            eventDiv.appendChild(contentDiv);
            timelineContainer.appendChild(eventDiv);
        });
    });
    
    containerElement.appendChild(timelineContainer);
}

function renderFlashCards(flashCardsData, containerElement) {
    if (!flashCardsData || flashCardsData.length === 0) {
        containerElement.innerHTML = '<p>No flashcard groups available.</p>';
        return;
    }

    flashCardsData.forEach(group => {
        const groupDiv = document.createElement('div');
        groupDiv.className = 'flashcard-group';

        if (group.title) {
            const title = document.createElement('h2');
            title.className = 'flashcard-group-title';
            title.textContent = group.title;
            groupDiv.appendChild(title);
        }

        if (group.description) {
            const description = document.createElement('p');
            description.className = 'flashcard-group-description';
            description.textContent = group.description;
            groupDiv.appendChild(description);
        }

        const cardsGrid = document.createElement('div');
        cardsGrid.className = 'flashcards-grid';

        group.cards.forEach(card => {
            const flashcardCard = document.createElement('div');
            flashcardCard.className = 'flashcard-card';

            // Apply custom colors if provided
            if (group.frontColor) {
                flashcardCard.style.backgroundColor = group.frontColor;
            }

            const flashcardFront = document.createElement('div');
            flashcardFront.className = 'flashcard-front';
            
            if (group.flippable === false) {
                // For non-flippable, both front and back are visible in the 'front' div
                flashcardFront.innerHTML = `
                    <p class="flashcard-non-flippable-front">${card.front}</p>
                    <p class="flashcard-non-flippable-back">${card.back}</p>
                `;
                flashcardFront.style.backgroundColor = group.frontColor; // Use frontColor for background
                flashcardFront.style.color = group.backColor; // Use backColor for text
            } else {
                flashcardFront.innerHTML = `<p>${card.front}</p>`;
            }

            const flashcardBack = document.createElement('div');
            flashcardBack.className = 'flashcard-back';
            flashcardBack.innerHTML = `<p>${card.back}</p>`;
            if (group.backColor) {
                flashcardBack.style.backgroundColor = group.backColor;
            }

            flashcardCard.appendChild(flashcardFront);
            // Only append back if flippable
            if (group.flippable !== false) {
                flashcardCard.appendChild(flashcardBack);
            }

            if (group.flippable !== false) {
                flashcardCard.addEventListener('click', () => {
                    flashcardCard.classList.toggle('flipped');
                });
            } else {
                flashcardCard.classList.add('non-flippable-card');
            }

            cardsGrid.appendChild(flashcardCard);
        });

        groupDiv.appendChild(cardsGrid);
        containerElement.appendChild(groupDiv);
    });
}
