/**
 * JAB Manual - Main JavaScript File
 * Contains common functions used across the site
 */

// Navigation data
let navigationData = null;

// Fetch navigation data
async function fetchNavigationData() {
    try {
        // Use cache-busted fetch if available
        const response = await fetch('/data/navigation.json?v=' + Date.now());
        navigationData = await response.json();
        return navigationData;
    } catch (error) {
        console.error('Error fetching navigation data:', error);
        return null;
    }
}

// Create navigation HTML
function createNavigationHTML(navData, isMobile = false) {
    if (!navData) return '';
    
    const nav = navData.navigation;
    const mobileClass = isMobile ? 'mobile-nav' : 'desktop-nav';
    
    let html = `
        <nav class="navigation ${mobileClass}" id="${isMobile ? 'mobileNavigation' : 'mainNavigation'}">
            <div class="nav-container">
                ${isMobile ? '<button class="nav-close" onclick="toggleMobileNav()">&times;</button>' : ''}
                <div class="nav-header">
                    <h3 class="nav-title"><a href="./index.html" class="nav-home-link">${nav.title}</a></h3>
                    <p class="nav-subtitle">${nav.subtitle}</p>
                    ${isMobile ? '' : `
                    <div class="nav-controls">
                        <button class="nav-expand-all" onclick="expandAllSections()">Expand All</button>
                        <button class="nav-collapse-all" onclick="collapseAllSections()">Collapse All</button>
                    </div>
                    `}
                </div>
                <ul class="nav-sections">
    `;
    
    // Add main sections
    nav.sections.forEach(section => {
        html += `
            <li class="nav-section">
                <div class="section-header" ${isMobile ? '' : `onclick="toggleSection('${section.id}')"`}>
                    <span class="section-title">${section.title}</span>
                    ${isMobile ? '' : `<span class="section-toggle">▼</span>`}
                </div>
                <ul class="nav-subsections" id="${section.id}-subsections">
        `;
        
        section.subsections.forEach(subsection => {
            html += `
                <li class="nav-subsection">
                    <a href="${subsection.url}&v=${Date.now()}" class="subsection-link">
                        <span class="subsection-title">${subsection.title}</span>
                        <span class="subsection-name">${subsection.name}</span>
                    </a>
                </li>
            `;
        });
        
        html += `
                </ul>
            </li>
        `;
    });
    
    // Add additional pages
    if (nav.additionalPages) {
        nav.additionalPages.forEach(page => {
            html += `
                <li class="nav-section">
                    <a href="${page.url}" class="section-link">
                        <span class="section-title">${page.title}</span>
                    </a>
                </li>
            `;
        });
    }
    
    html += `
                </ul>
            </div>
        </nav>
    `;
    
    return html;
}

// Toggle section visibility
function toggleSection(sectionId) {
    const subsections = document.getElementById(sectionId + '-subsections');
    const toggle = document.querySelector(`[onclick="toggleSection('${sectionId}')"] .section-toggle`);
    
    if (subsections && toggle) {
        if (subsections.style.display === 'none' || subsections.style.display === '') {
            subsections.style.display = 'block';
            toggle.textContent = '▲';
        } else {
            subsections.style.display = 'none';
            toggle.textContent = '▼';
        }
    }
}

// Expand all navigation sections
function expandAllSections() {
    if (!navigationData) return;
    
    navigationData.navigation.sections.forEach(section => {
        const subsections = document.getElementById(section.id + '-subsections');
        const toggle = document.querySelector(`[onclick="toggleSection('${section.id}')"] .section-toggle`);
        
        if (subsections && toggle) {
            subsections.style.display = 'block';
            toggle.textContent = '▲';
        }
    });
}

// Collapse all navigation sections
function collapseAllSections() {
    if (!navigationData) return;
    
    navigationData.navigation.sections.forEach(section => {
        const subsections = document.getElementById(section.id + '-subsections');
        const toggle = document.querySelector(`[onclick="toggleSection('${section.id}')"] .section-toggle`);
        
        if (subsections && toggle) {
            subsections.style.display = 'none';
            toggle.textContent = '▼';
        }
    });
}

// Toggle mobile navigation
function toggleMobileNav() {
    const nav = document.getElementById('mobileNavigation');
    const overlay = document.getElementById('navOverlay');
    
    if (nav && overlay) {
        nav.classList.toggle('active');
        overlay.classList.toggle('active');
    }
}

// Initialize navigation
async function initializeNavigation() {
    const navData = await fetchNavigationData();
    if (!navData) return;
    
    // Create desktop navigation
    const desktopNavContainer = document.getElementById('desktop-nav-container');
    if (desktopNavContainer) {
        desktopNavContainer.innerHTML = createNavigationHTML(navData, false);
    }
    
    // Create mobile navigation
    const mobileNavContainer = document.getElementById('mobile-nav-container');
    if (mobileNavContainer) {
        mobileNavContainer.innerHTML = createNavigationHTML(navData, true);
    }
    
    // Initialize sections as collapsed for desktop but expanded for mobile
    navData.navigation.sections.forEach(section => {
        // For desktop navigation - collapsed
        const desktopSubsections = document.querySelector('#mainNavigation #' + section.id + '-subsections');
        if (desktopSubsections) {
            desktopSubsections.style.display = 'none';
        }
        
        // For mobile navigation - expanded
        const mobileSubsections = document.querySelector('#mobileNavigation #' + section.id + '-subsections');
        if (mobileSubsections) {
            mobileSubsections.style.display = 'block';
        }
    });
    
    // Store the navigation data globally for use in expand/collapse all functions
    navigationData = navData;
}

// Render homepage content
async function renderHomepageContent() {
    const navData = await fetchNavigationData();
    if (!navData) return;
    
    const contentContainer = document.getElementById('homepage-content');
    if (!contentContainer) return;
    
    let html = '';
    
    // Add About section at the top
    html += `
        <div class="section-card" id="about">
            <h2 class="section-card-title">About JAB Manual Interactive</h2>
            <p class="section-card-description">
                Welcome to the JAB Manual Interactive - your comprehensive digital companion for exploring 
                Jain Academic Bowl content. The source is JAB Manual 5th edition Oct 2024. This interactive platform brings traditional stories and teachings 
                to life through engaging digital experiences to help prepare for JAB.
            </p>
            <p class="section-card-description">
                By no means this interactive guide is meant to be exhaustive or a replacement for the manual, but just an aid in helping revise the material already studied through the manual.
            </p>
            <p class="section-card-description">
                This interactive manual was developed with valuable input and guidance from the JAB Teachers of JCNC (Jain Center of Northern California).
            </p>
            <p class="section-card-description important-notice">
                <strong>Important Notice:</strong> Content is generated through LLM and spot checked, but it's possible that due to hallucination or wrong prompts, there may be factual errors with respect to what is in the source manual. If you notice errors, please report them as issues on GitHub  <a href="https://github.com/absolute-zerokelvin/JAB/issues" target="_blank" rel="noopener noreferrer">https://github.com/absolute-zerokelvin/JAB/issues</a> Feel free to submit a PR as well with changes.
            </p>
        </div>
    `;
    
    // Render sections after the About section
    navData.navigation.sections.forEach(section => {
        html += `
            <div class="section-card">
                <h2 class="section-card-title">${section.title}</h2>
                <p class="section-card-description">${section.description}</p>
                <div class="subsection-grid">
        `;
        
        section.subsections.forEach(subsection => {
            const isComingSoon = subsection.name === 'Coming Soon';
            html += `
                <a href="${subsection.url}" class="subsection-card ${isComingSoon ? 'coming-soon' : ''}">
                    <h3 class="subsection-card-title">${subsection.title}</h3>
                    <p class="subsection-card-name">${subsection.name}</p>
                    ${isComingSoon ? '<span class="coming-soon-badge">Coming Soon</span>' : ''}
                </a>
            `;
        });
        
        html += `
                </div>
            </div>
        `;
    });
    
    // Render additional pages as a special section
    if (navData.navigation.additionalPages && navData.navigation.additionalPages.length > 0) {
        html += `
            <div class="section-card">
                <h2 class="section-card-title">Additional Resources</h2>
                <p class="section-card-description">Timelines and other comprehensive resources</p>
                <div class="subsection-grid">
        `;
        
        navData.navigation.additionalPages.forEach(page => {
            html += `
                <a href="${page.url}" class="subsection-card">
                    <h3 class="subsection-card-title">${page.title}</h3>
                    <p class="subsection-card-name">${page.name || ''}</p>
                </a>
            `;
        });
        
        html += `
                </div>
            </div>
        `;
    }
    
    contentContainer.innerHTML = html;
}

// Add event listener when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('JAB Manual - Scripts initialized');
    
    // Initialize navigation
    initializeNavigation();
    
    // Render homepage content if on homepage
    if (document.getElementById('homepage-content')) {
        renderHomepageContent();
    }
});
