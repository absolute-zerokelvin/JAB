/**
 * JAB Manual - tabView.js
 * Contains functions to render dynamic content types for tabTemplate.html
 */
console.log('tabView.js v7 loaded at', new Date().toISOString());

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
                <div id="flashcard-container" class="tv-flashcard-container">
                    <div class="tv-flashcard-card">
                        <div class="tv-flashcard-front">
                            <p id="flashcard-question"></p>
                        </div>
                        <div class="tv-flashcard-back">
                            <p id="flashcard-answer"></p>
                        </div>
                    </div>
                    <div class="tv-flashcard-controls">
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
    const flashcardCard = containerElement.querySelector('.tv-flashcard-card');
    const flashcardFront = containerElement.querySelector('.tv-flashcard-front');
    const flashcardBack = containerElement.querySelector('.tv-flashcard-back');

    function updateFlashcard() {
        const currentQuestion = quizData.questions[currentFlashcardIndex];
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

function renderMixed(mixedData, containerElement) {
    if (!mixedData || !mixedData.items || mixedData.items.length === 0) {
        containerElement.innerHTML = '<p>No mixed content items available.</p>';
        return;
    }

    mixedData.items.forEach(item => {
        // Create a wrapper for each item to ensure separation
        const itemContainer = document.createElement('div');
        itemContainer.className = 'mixed-content-item mb-8'; // Add margin bottom for spacing
        containerElement.appendChild(itemContainer);

        switch (item.type) {
            case 'text':
                renderTextContent(item.data, itemContainer);
                break;
            case 'quiz':
                renderQuiz(item.data, itemContainer);
                break;
            case 'mindmap':
                renderMindmap(item.data, itemContainer);
                break;
            case 'accordian':
                renderAccordian(item.data, itemContainer);
                break;
            case 'graphicsNovel':
                renderGraphicsNovel(item.data, itemContainer);
                break;
            case 'timeline':
                renderTimeline(item.data, itemContainer);
                break;
            case 'flashCards':
                renderFlashcards(item.data, itemContainer);
                break;
            case 'table':
                renderTable(item.data, itemContainer);
                break;
            default:
                itemContainer.innerHTML = `<p>Unsupported content type in mixed view: ${item.type}</p>`;
        }
    });
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

    // Add CSS for tooltips if not already present
    if (!document.getElementById('mindmap-tooltip-styles')) {
        const styleElement = document.createElement('style');
        styleElement.id = 'mindmap-tooltip-styles';
        styleElement.textContent = `
            .mind-map-node {
                position: relative;
            }
            /* Styling for non-leaf nodes (with children) */
            .mind-map-node.toggle-node {
                background-color: #e6f0ff; /* Light blue background */
                border-left: 3px solid #3498db; /* Blue left border */
            }
            /* Styling for leaf nodes (without children) */
            .mind-map-node.leaf-node {
                background-color: #f5f5f5; /* Light gray background */
                border-left: 3px solid #aaaaaa; /* Gray left border */
            }
            .toggle-icon {
                display: inline-block;
                margin-left: 5px;
                font-weight: bold;
                color: #3498db;
            }
            .info-icon {
                display: inline-block;
                margin-left: 5px;
                width: 16px;
                height: 16px;
                background-color: #3498db;
                color: white;
                border-radius: 50%;
                text-align: center;
                line-height: 16px;
                font-size: 12px;
                cursor: help;
            }
            .tooltip {
                visibility: hidden;
                position: absolute;
                background-color: #1a4b8c; /* Dark blue background */
                color: white; /* White text */
                border: 1px solid #0d3266;
                border-radius: 4px;
                padding: 10px 15px;
                font-size: 1rem; /* At least 1rem font size */
                z-index: 100;
                max-width: 300px; /* Increased width */
                width: max-content;
                box-shadow: 0 3px 8px rgba(0,0,0,0.3);
                opacity: 0;
                transition: opacity 0.3s;
                text-align: left;
                white-space: normal;
                left: 100%;
                top: 0;
                margin-left: 10px;
                line-height: 1.4;
            }
            /* Show tooltip on hover of the node or info icon */
            .mind-map-node[data-has-description]:hover > .tooltip,
            .info-icon:hover + .tooltip {
                visibility: visible;
                opacity: 1;
            }
        `;
        document.head.appendChild(styleElement);
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

    // Create text content
    const textSpan = document.createElement('span');
    textSpan.textContent = mainNodeData.text;
    mainNode.appendChild(textSpan);

    // Add description tooltip if available
    if (mainNodeData.description) {
        const infoIcon = document.createElement('span');
        infoIcon.className = 'info-icon';
        infoIcon.textContent = 'i';
        mainNode.appendChild(infoIcon);

        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = mainNodeData.description;
        mainNode.appendChild(tooltip);

        // Add data attribute to indicate this node has a description
        mainNode.setAttribute('data-has-description', 'true');
    }

    mapContainer.appendChild(mainNode);

    // Create branches recursively
    function createBranch(item) {
        const node = document.createElement('div');

        if (item.children && item.children.length > 0) {
            node.className = 'mind-map-node toggle-node';

            // Create text content
            const textSpan = document.createElement('span');
            textSpan.textContent = item.text;
            node.appendChild(textSpan);

            // Add toggle icon
            const toggleIcon = document.createElement('span');
            toggleIcon.className = 'toggle-icon';
            toggleIcon.textContent = '+';
            node.appendChild(toggleIcon);

            // Add description tooltip if available
            if (item.description) {
                const infoIcon = document.createElement('span');
                infoIcon.className = 'info-icon';
                infoIcon.textContent = 'i';
                node.appendChild(infoIcon);

                const tooltip = document.createElement('div');
                tooltip.className = 'tooltip';
                tooltip.textContent = item.description;
                node.appendChild(tooltip);

                // Add data attribute to indicate this node has a description
                node.setAttribute('data-has-description', 'true');
            }

            const subBranches = document.createElement('div');
            subBranches.className = 'mind-map-sub-branches hidden';

            item.children.forEach(child => {
                const childElements = createBranch(child);
                childElements.forEach(element => subBranches.appendChild(element));
            });

            node.addEventListener('click', function (e) {
                // Don't toggle if clicking on the info icon
                if (e.target.classList.contains('info-icon')) {
                    e.stopPropagation();
                    return;
                }

                e.stopPropagation();
                const subBranchesElement = this.nextElementSibling;
                subBranchesElement.classList.toggle('hidden');
                const toggleIcon = this.querySelector('.toggle-icon');
                toggleIcon.textContent = subBranchesElement.classList.contains('hidden') ? '+' : '-';
            });

            return [node, subBranches];
        } else {
            node.className = 'mind-map-node leaf-node';

            // Create text content
            const textSpan = document.createElement('span');
            textSpan.textContent = item.text;
            node.appendChild(textSpan);

            // Add description tooltip if available
            if (item.description) {
                const infoIcon = document.createElement('span');
                infoIcon.className = 'info-icon';
                infoIcon.textContent = 'i';
                node.appendChild(infoIcon);

                const tooltip = document.createElement('div');
                tooltip.className = 'tooltip';
                tooltip.textContent = item.description;
                node.appendChild(tooltip);

                // Add data attribute to indicate this node has a description
                node.setAttribute('data-has-description', 'true');
            }

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

async function ensureTabulatorLoaded() {
    if (window.Tabulator) return;

    // Inject Tabulator CSS if not present
    const existingCss = document.querySelector('link[data-tabulator-css]');
    if (!existingCss) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/tabulator-tables@5.5.1/dist/css/tabulator.min.css';
        link.setAttribute('data-tabulator-css', 'true');
        document.head.appendChild(link);
    }

    // Inject Tabulator JS if not present
    if (!document.querySelector('script[data-tabulator-js]')) {
        await new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://unpkg.com/tabulator-tables@5.5.1/dist/js/tabulator.min.js';
            script.async = true;
            script.setAttribute('data-tabulator-js', 'true');
            script.onload = () => resolve();
            script.onerror = () => reject(new Error('Failed to load Tabulator library'));
            document.body.appendChild(script);
        });
    }
}

async function renderTable(tableData, containerElement) {
    if (!tableData || !tableData.headers || !tableData.rows) {
        containerElement.innerHTML = '<p>No table data available.</p>';
        return;
    }

    // Clear previous content
    containerElement.innerHTML = '';

    // Lazy-load Tabulator assets
    try {
        await ensureTabulatorLoaded();
    } catch (e) {
        console.error(e);
        containerElement.innerHTML = '<p>Table library failed to load. Please check your connection and try again.</p>';
        return;
    }

    // Add caption if present
    if (tableData.caption) {
        const captionElement = document.createElement('div');
        captionElement.className = 'table-caption';
        captionElement.innerHTML = tableData.caption;
        containerElement.appendChild(captionElement);
    }

    // Create a div for Tabulator to render into
    const tableDiv = document.createElement('div');
    tableDiv.id = 'tabulator-table'; // Give it an ID for Tabulator
    containerElement.appendChild(tableDiv);

    // Prepare columns for Tabulator
    const columns = tableData.headers.map((header, index) => ({
        title: header,
        field: `col${index}`,
        sorter: "string", // Enable sorting for all columns
        headerFilter: "input", // Enable filtering for all columns
    }));

    // Prepare data for Tabulator
    const data = tableData.rows.map(row => {
        const rowObject = {};
        row.forEach((cell, index) => {
            rowObject[`col${index}`] = cell;
        });
        return rowObject;
    });

    // Initialize Tabulator
    const table = new Tabulator(tableDiv, {
        data: data,
        columns: columns,
        layout: "fitColumns", // Fit columns to width of table
        pagination: "local", // Enable local pagination
        paginationSize: 50, // Show 50 rows per page
        paginationSizeSelector: [10, 25, 50, 100], // Allow user to select pagination size
        movableColumns: true, // Allow columns to be reordered
        resizableColumns: true, // Allow columns to be resized
        // Add a theme class for custom styling
        // This will apply a class to the top-level Tabulator element
        // You can then target this class in your CSS
        cssClass: "tabulator-blue-theme",
    });

    if (tableData.footnote) {
        const footnote = document.createElement('p');
        footnote.className = 'table-footnote';
        footnote.innerHTML = tableData.footnote;
        containerElement.appendChild(footnote);
    }
}


function getContrastColor(hexColor) {
    if (!hexColor) return '#ffffff';
    // Convert named colors or fallback
    if (!hexColor.startsWith('#')) return '#ffffff';

    const hex = hexColor.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return (yiq >= 128) ? '#000000' : '#ffffff';
}

function renderFlashcards(flashCardsData, containerElement) {
    if (!flashCardsData || flashCardsData.length === 0) {
        containerElement.innerHTML = '<p>No flashcard groups available.</p>';
        return;
    }

    flashCardsData.forEach((group, groupIndex) => {
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

        // Create single flashcard container with navigation
        const flashcardContainer = document.createElement('div');
        flashcardContainer.className = 'tv-flashcard-container';
        flashcardContainer.id = `tv-flashcard-container-${groupIndex}`;

        const flashcardCard = document.createElement('div');
        flashcardCard.className = 'tv-flashcard-card';
        flashcardCard.id = `tv-flashcard-card-${groupIndex}`;

        // Apply custom colors if provided
        if (group.frontColor) {
            flashcardCard.style.setProperty('--flashcard-front-color', group.frontColor);
        }
        if (group.backColor) {
            flashcardCard.style.setProperty('--flashcard-back-color', group.backColor);
        }

        const flashcardFront = document.createElement('div');
        flashcardFront.className = 'tv-flashcard-front';
        flashcardFront.id = `tv-flashcard-front-${groupIndex}`;
        if (group.frontColor) {
            flashcardFront.style.backgroundColor = group.frontColor;
            flashcardFront.style.color = getContrastColor(group.frontColor);
        }

        const flashcardBack = document.createElement('div');
        flashcardBack.className = 'tv-flashcard-back';
        flashcardBack.id = `tv-flashcard-back-${groupIndex}`;
        if (group.backColor) {
            flashcardBack.style.backgroundColor = group.backColor;
            flashcardBack.style.color = getContrastColor(group.backColor);
        }

        flashcardCard.appendChild(flashcardFront);
        flashcardCard.appendChild(flashcardBack);
        flashcardContainer.appendChild(flashcardCard);

        // Create navigation controls
        const controlsDiv = document.createElement('div');
        controlsDiv.className = 'tv-flashcard-controls';

        // Inline styles for flex layout to ensure it works even if CSS is slow
        controlsDiv.style.display = 'flex';
        controlsDiv.style.justifyContent = 'space-between';
        controlsDiv.style.width = '100%';
        controlsDiv.style.maxWidth = '500px';
        controlsDiv.style.marginTop = '6rem';
        controlsDiv.style.alignItems = 'center';

        const prevBtn = document.createElement('button');
        prevBtn.className = 'tab-button';
        prevBtn.textContent = 'Previous';
        prevBtn.id = `flashcard-prev-${groupIndex}`;

        const counter = document.createElement('span');
        counter.id = `flashcard-counter-${groupIndex}`;
        counter.className = 'flashcard-counter';
        counter.style.fontSize = '1.1rem';
        counter.style.fontWeight = '500';

        const nextBtn = document.createElement('button');
        nextBtn.className = 'tab-button';
        nextBtn.textContent = 'Next';
        nextBtn.id = `flashcard-next-${groupIndex}`;

        controlsDiv.appendChild(prevBtn);
        controlsDiv.appendChild(counter);
        controlsDiv.appendChild(nextBtn);
        flashcardContainer.appendChild(controlsDiv);

        groupDiv.appendChild(flashcardContainer);
        containerElement.appendChild(groupDiv);

        // Initialize flashcard logic for this group
        let currentIndex = 0;
        const cards = group.cards;

        if (!cards || cards.length === 0) {
            return;
        }

        function updateCard() {
            const card = cards[currentIndex];
            flashcardFront.innerHTML = `<p style="margin:0; padding:10px;">${card.front}</p>`;
            flashcardBack.innerHTML = `<p style="margin:0; padding:10px;">${card.back}</p>`;
            counter.textContent = `${currentIndex + 1} / ${cards.length}`;
            flashcardCard.classList.remove('flipped');
        }

        // Flip on click
        if (group.flippable !== false) {
            flashcardCard.addEventListener('click', () => {
                console.log(`Flashcard clicked: ${group.title}, toggling flip`);
                flashcardCard.classList.toggle('flipped');
            });
        }

        // Navigation
        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            currentIndex = (currentIndex - 1 + cards.length) % cards.length;
            updateCard();
        });

        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            currentIndex = (currentIndex + 1) % cards.length;
            updateCard();
        });

        // Initialize first card
        updateCard();
    });
}
