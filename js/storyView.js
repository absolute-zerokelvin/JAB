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
            eraPeriod.className = 'text-center text-secondary -mt-4 mb-8';
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
                chars.className = 'mt-3 text-sm text-secondary';
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
        charCard.className = 'content-card rounded-lg shadow-md overflow-hidden border-l-4';
        charCard.style.borderLeftColor = 'var(--primary-blue)';

        const cardBody = document.createElement('div');
        cardBody.className = 'p-5';

        const name = document.createElement('h3');
        name.className = 'text-xl font-bold mb-2';
        name.style.color = 'var(--primary-blue-dark)';
        name.textContent = character.name;
        cardBody.appendChild(name);

        const description = document.createElement('p');
        description.className = '';
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

    // Add a title for the quiz section
    const quizTitle = document.createElement('h2');
    quizTitle.className = 'text-center mb-8 text-2xl font-bold';
    quizTitle.style.color = 'var(--primary-blue-dark)';
    quizTitle.textContent = '';
    container.appendChild(quizTitle);

    // Create format selector
    const formatSelector = document.createElement('div');
    formatSelector.className = 'quiz-format-selector';

    const formatLabel = document.createElement('p');
    formatLabel.className = 'format-label';
    formatLabel.textContent = 'Choose format:';
    formatSelector.appendChild(formatLabel);

    // Create a button group container for better styling
    const buttonGroup = document.createElement('div');
    buttonGroup.className = 'format-button-group';
    buttonGroup.style.display = 'flex';
    buttonGroup.style.gap = '10px';

    const flashcardButton = document.createElement('button');
    flashcardButton.className = 'format-button active'; // Set active by default
    flashcardButton.textContent = 'Flash Cards';
    flashcardButton.setAttribute('data-format', 'flashcard');
    flashcardButton.addEventListener('click', () => switchQuizFormat('flashcard', quizData));
    buttonGroup.appendChild(flashcardButton);

    const qaButton = document.createElement('button');
    qaButton.className = 'format-button';
    qaButton.textContent = 'Q & A Format';
    qaButton.setAttribute('data-format', 'qa');
    qaButton.addEventListener('click', () => switchQuizFormat('qa', quizData));
    buttonGroup.appendChild(qaButton);

    formatSelector.appendChild(buttonGroup);
    container.appendChild(formatSelector);

    // Create content container with a transition effect
    const contentContainer = document.createElement('div');
    contentContainer.id = 'quiz-content-container';
    contentContainer.style.transition = 'opacity 0.3s ease';
    container.appendChild(contentContainer);

    // Default to Flashcard format on load
    renderFlashcardFormat(quizData, contentContainer);
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

            node.addEventListener('click', function (e) {
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

// --- AI Art (Imagery) Generation ---
let slideshowInterval = null;
let isSlideshowPlaying = false;

function generateImagery(imageryData) {
    if (!imageryData || !imageryData.length) return;

    const container = document.getElementById('imagery-tab');
    if (!container) return;

    // Add Slideshow Control Bar
    const controlsDiv = document.createElement('div');
    controlsDiv.className = 'imagery-controls';

    const slideshowBtn = document.createElement('button');
    slideshowBtn.className = 'btn-primary';
    slideshowBtn.innerHTML = '▶ Start Slideshow';
    slideshowBtn.onclick = () => openImageryLightbox(imageryData, 0, true);

    controlsDiv.appendChild(slideshowBtn);
    container.appendChild(controlsDiv);

    // Create the grid container
    const imageryGrid = document.createElement('div');
    imageryGrid.className = 'imagery-grid';

    imageryData.forEach((panel, index) => {
        const panelDiv = document.createElement('div');
        panelDiv.className = 'imagery-panel';

        // Create image container with loading state
        const imgContainer = document.createElement('div');
        imgContainer.className = 'imagery-image-container';

        // Create image
        const img = document.createElement('img');
        img.src = panel.imageSrc;
        img.alt = panel.title;
        img.loading = 'lazy'; // Lazy load for performance
        img.className = 'imagery-image';

        // Add click handler for lightbox
        img.addEventListener('click', () => openImageryLightbox(imageryData, index, false));

        imgContainer.appendChild(img);
        panelDiv.appendChild(imgContainer);

        // Create caption container
        const captionDiv = document.createElement('div');
        captionDiv.className = 'imagery-caption';

        // Add scene number
        const sceneNumber = document.createElement('span');
        sceneNumber.className = 'imagery-scene-number';
        sceneNumber.textContent = `Scene ${index + 1}`;
        captionDiv.appendChild(sceneNumber);

        // Add title
        const title = document.createElement('p');
        title.className = 'imagery-title';
        title.textContent = panel.title;
        captionDiv.appendChild(title);

        // Add description
        const description = document.createElement('p');
        description.className = 'imagery-description';
        description.textContent = panel.description;
        captionDiv.appendChild(description);

        panelDiv.appendChild(captionDiv);
        imageryGrid.appendChild(panelDiv);
    });

    container.appendChild(imageryGrid);
}

// --- Imagery Lightbox / Slideshow ---
function openImageryLightbox(imageryData, startIndex, autoPlay = false) {
    // Clear any existing interval
    if (slideshowInterval) clearInterval(slideshowInterval);
    isSlideshowPlaying = autoPlay;

    // Create lightbox overlay
    const overlay = document.createElement('div');
    overlay.className = 'imagery-lightbox-overlay';

    // Create lightbox content
    const lightbox = document.createElement('div');
    lightbox.className = 'imagery-lightbox';

    // Navigation and Controls
    const prevBtn = document.createElement('button');
    prevBtn.className = 'imagery-nav-btn prev';
    prevBtn.innerHTML = '&#10094;'; // Left arrow

    const nextBtn = document.createElement('button');
    nextBtn.className = 'imagery-nav-btn next';
    nextBtn.innerHTML = '&#10095;'; // Right arrow

    // Image container
    const imgContainer = document.createElement('div');
    imgContainer.className = 'imagery-lightbox-content';

    const img = document.createElement('img');
    img.className = 'imagery-lightbox-image';
    imgContainer.appendChild(img);

    // Caption container
    const captionContainer = document.createElement('div');
    captionContainer.className = 'imagery-lightbox-caption';

    // Controls container (Play/Pause, Counter)
    const controlsContainer = document.createElement('div');
    controlsContainer.className = 'imagery-lightbox-controls';

    const playPauseBtn = document.createElement('button');
    playPauseBtn.className = 'imagery-play-btn';
    playPauseBtn.innerHTML = isSlideshowPlaying ? '⏸ Pause' : '▶ Play';

    const counter = document.createElement('span');
    counter.className = 'imagery-counter';

    controlsContainer.appendChild(playPauseBtn);
    controlsContainer.appendChild(counter);

    // Close button
    const closeBtn = document.createElement('button');
    closeBtn.className = 'imagery-lightbox-close';
    closeBtn.innerHTML = '×';

    // Append elements
    lightbox.appendChild(closeBtn);
    lightbox.appendChild(imgContainer);
    lightbox.appendChild(prevBtn);
    lightbox.appendChild(nextBtn);
    lightbox.appendChild(controlsContainer); // Add controls above caption
    lightbox.appendChild(captionContainer);
    overlay.appendChild(lightbox);
    document.body.appendChild(overlay);

    let currentIndex = startIndex;

    // Update function
    function updateSlide(index) {
        currentIndex = (index + imageryData.length) % imageryData.length;
        const panel = imageryData[currentIndex];

        // Fade effect
        img.style.opacity = '0';
        setTimeout(() => {
            img.src = panel.imageSrc;
            img.alt = panel.title;
            captionContainer.innerHTML = `<strong>${panel.title}</strong><p>${panel.description}</p>`;
            counter.textContent = `${currentIndex + 1} / ${imageryData.length}`;
            img.style.opacity = '1';
        }, 200);
    }

    // Navigation handlers
    function nextSlide() {
        updateSlide(currentIndex + 1);
    }

    function prevSlide() {
        updateSlide(currentIndex - 1);
    }

    function togglePlay() {
        isSlideshowPlaying = !isSlideshowPlaying;
        playPauseBtn.innerHTML = isSlideshowPlaying ? '⏸ Pause' : '▶ Play';

        if (isSlideshowPlaying) {
            startSlideshow();
        } else {
            clearInterval(slideshowInterval);
        }
    }

    function startSlideshow() {
        if (slideshowInterval) clearInterval(slideshowInterval);
        slideshowInterval = setInterval(nextSlide, 5000); // 5 seconds
    }

    // Event Listeners
    prevBtn.onclick = (e) => { e.stopPropagation(); prevSlide(); clearInterval(slideshowInterval); isSlideshowPlaying = false; playPauseBtn.innerHTML = '▶ Play'; };
    nextBtn.onclick = (e) => { e.stopPropagation(); nextSlide(); clearInterval(slideshowInterval); isSlideshowPlaying = false; playPauseBtn.innerHTML = '▶ Play'; };
    playPauseBtn.onclick = (e) => { e.stopPropagation(); togglePlay(); };
    closeBtn.onclick = () => closeLightbox();
    overlay.onclick = (e) => { if (e.target === overlay) closeLightbox(); };

    // Keyboard navigation
    function keyHandler(e) {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') { prevSlide(); clearInterval(slideshowInterval); isSlideshowPlaying = false; playPauseBtn.innerHTML = '▶ Play'; }
        if (e.key === 'ArrowRight') { nextSlide(); clearInterval(slideshowInterval); isSlideshowPlaying = false; playPauseBtn.innerHTML = '▶ Play'; }
        if (e.key === ' ') { e.preventDefault(); togglePlay(); }
    }
    document.addEventListener('keydown', keyHandler);

    function closeLightbox() {
        if (slideshowInterval) clearInterval(slideshowInterval);
        document.removeEventListener('keydown', keyHandler);
        overlay.remove();
    }

    // Initialize
    updateSlide(currentIndex);
    if (autoPlay) startSlideshow();
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
        // Build tabs array dynamically based on available data
        const tabsData = [
            { id: 'original-story', label: 'Story' },
            { id: 'timeline-tab', label: 'Timeline' },
            { id: 'mindmap-v1-tab', label: 'Mind Map (v1)' },
            { id: 'mindmap-v2-tab', label: 'Mind Map (v2)' },
            { id: 'graphics-tab', label: 'Graphics' }
        ];

        // Only add AI Art tab if imageryData exists and has content
        if (storyData && storyData.imageryData && storyData.imageryData.length > 0) {
            tabsData.push({ id: 'imagery-tab', label: 'AI Art' });
        }

        // Add remaining tabs
        tabsData.push({ id: 'characters-tab', label: 'Characters' });
        tabsData.push({ id: 'quiz-tab', label: 'Quiz' });

        tabsData.forEach(tab => {
            const button = document.createElement('button');
            button.className = 'tab-button';
            button.onclick = function () { openTab(event, tab.id); };
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

        // Generate AI Art imagery
        generateImagery(storyData.imageryData);

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

// --- Quiz Format Functions ---
function renderQAFormat(quizData, container) {
    // Clear container
    container.innerHTML = '';

    const quizContainer = document.createElement('div');
    quizContainer.className = 'quiz-container qa-format';

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

function renderFlashcardFormat(quizData, container) {
    // Clear container
    container.innerHTML = '';

    const flashcardContainer = document.createElement('div');
    flashcardContainer.className = 'flashcard-container';

    // Create flashcard navigation
    const navContainer = document.createElement('div');
    navContainer.className = 'flashcard-navigation';

    const prevButton = document.createElement('button');
    prevButton.className = 'flashcard-nav-btn';
    prevButton.textContent = '← Previous';
    prevButton.onclick = (e) => {
        e.stopPropagation(); // Prevent triggering card flip when clicking navigation
        navigateFlashcard('prev');
    };
    navContainer.appendChild(prevButton);

    const cardCounter = document.createElement('span');
    cardCounter.className = 'flashcard-counter';
    cardCounter.id = 'flashcard-counter';
    cardCounter.textContent = '1/' + quizData.length;
    navContainer.appendChild(cardCounter);

    const nextButton = document.createElement('button');
    nextButton.className = 'flashcard-nav-btn';
    nextButton.textContent = 'Next →';
    nextButton.onclick = (e) => {
        e.stopPropagation(); // Prevent triggering card flip when clicking navigation
        navigateFlashcard('next');
    };
    navContainer.appendChild(nextButton);

    flashcardContainer.appendChild(navContainer);

    // Create flashcard display
    const cardDisplay = document.createElement('div');
    cardDisplay.className = 'flashcard-display';
    cardDisplay.id = 'flashcard-display';
    cardDisplay.setAttribute('data-current-card', '0');
    cardDisplay.setAttribute('data-total-cards', quizData.length);

    // Create the cards
    quizData.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'flashcard';
        card.id = `flashcard-${index}`;
        card.style.display = index === 0 ? 'block' : 'none';

        const cardInner = document.createElement('div');
        cardInner.className = 'flashcard-inner';
        cardInner.setAttribute('data-flipped', 'false');
        card.appendChild(cardInner);

        const cardFront = document.createElement('div');
        cardFront.className = 'flashcard-front';
        cardFront.innerHTML = `<p>${item.question}</p>`;
        cardInner.appendChild(cardFront);

        const cardBack = document.createElement('div');
        cardBack.className = 'flashcard-back';
        cardBack.innerHTML = `<p>${item.answer}</p>`;
        cardInner.appendChild(cardBack);

        card.addEventListener('click', function (e) {
            const isFlipped = cardInner.getAttribute('data-flipped') === 'true';
            cardInner.setAttribute('data-flipped', !isFlipped);
            cardInner.classList.toggle('flipped');
        });

        cardDisplay.appendChild(card);
    });

    flashcardContainer.appendChild(cardDisplay);
    container.appendChild(flashcardContainer);

    // Add instructions text
    const instructionsText = document.createElement('p');
    instructionsText.className = 'flashcard-instructions';
    instructionsText.textContent = 'Click on the card to flip it and reveal the answer.';
    instructionsText.style.textAlign = 'center';
    instructionsText.style.marginTop = '20px';
    instructionsText.style.color = '#6c757d';
    instructionsText.style.fontStyle = 'italic';
    container.appendChild(instructionsText);
}

function navigateFlashcard(direction) {
    const cardDisplay = document.getElementById('flashcard-display');
    if (!cardDisplay) return;

    const currentIndex = parseInt(cardDisplay.getAttribute('data-current-card'));
    const totalCards = parseInt(cardDisplay.getAttribute('data-total-cards'));

    let newIndex;
    if (direction === 'next') {
        newIndex = (currentIndex + 1) % totalCards;
    } else {
        newIndex = (currentIndex - 1 + totalCards) % totalCards;
    }

    // Hide current card with a fade-out effect
    const currentCard = document.getElementById(`flashcard-${currentIndex}`);
    currentCard.style.opacity = '0';

    // Use a short timeout for the transition effect
    setTimeout(() => {
        currentCard.style.display = 'none';
        currentCard.style.opacity = '1';

        // Show new card
        const newCard = document.getElementById(`flashcard-${newIndex}`);
        newCard.style.display = 'block';

        // Ensure card is not flipped initially
        const cardInner = newCard.querySelector('.flashcard-inner');
        cardInner.setAttribute('data-flipped', 'false');
        cardInner.classList.remove('flipped');

        // Update counter with card number indicator
        document.getElementById('flashcard-counter').textContent = `${newIndex + 1}/${totalCards}`;

        // Update current card index
        cardDisplay.setAttribute('data-current-card', newIndex);
    }, 150);
}

function switchQuizFormat(format, quizData) {
    const contentContainer = document.getElementById('quiz-content-container');
    if (!contentContainer) return;

    // Add fade-out transition
    contentContainer.style.opacity = '0';

    // Update active button with visual feedback
    const buttons = document.querySelectorAll('.format-button');
    buttons.forEach(btn => {
        btn.classList.remove('active');
        // Remove any transition classes if they exist
        btn.classList.remove('btn-pulse');

        if (btn.getAttribute('data-format') === format) {
            // Add a small delay before adding the active class for better visual effect
            setTimeout(() => {
                btn.classList.add('active');
                // Optional: add a pulse effect to the button when activated
                btn.classList.add('btn-pulse');
            }, 50);
        }
    });

    // Use a short timeout for the transition effect
    setTimeout(() => {
        // Render appropriate format
        if (format === 'qa') {
            renderQAFormat(quizData, contentContainer);
        } else if (format === 'flashcard') {
            renderFlashcardFormat(quizData, contentContainer);
        }

        // Fade back in
        setTimeout(() => {
            contentContainer.style.opacity = '1';
        }, 50);
    }, 300);
}
