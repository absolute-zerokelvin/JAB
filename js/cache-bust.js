// Cache busting utility
// This file helps prevent browser caching issues by adding version parameters to resource URLs

class CacheBuster {
    constructor() {
        // Manual version - increment this when you make significant changes
        this.version = '1.0.4';
        // Build timestamp - automatically updated
        this.buildTime = '20250611001'; // Format: YYYYMMDDHHMM
        // Session timestamp for additional cache busting
        this.sessionTime = Date.now();
    }

    // Get cache-busting parameter
    getCacheBustParam() {
        return `v=${this.version}&b=${this.buildTime}&s=${this.sessionTime}`;
    }

    // Add cache-busting to a URL
    addCacheBust(url) {
        // Skip external URLs (CDNs, etc.)
        if (url.includes('://') && !url.includes(window.location.hostname)) {
            return url;
        }
        
        const separator = url.includes('?') ? '&' : '?';
        return `${url}${separator}${this.getCacheBustParam()}`;
    }

    // Load CSS with cache busting
    loadCSS(href, id = null) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = this.addCacheBust(href);
        if (id) link.id = id;
        document.head.appendChild(link);
        return link;
    }

    // Load JavaScript with cache busting
    loadJS(src, async = true, defer = false) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = this.addCacheBust(src);
            script.async = async;
            script.defer = defer;
            script.onload = () => resolve(script);
            script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
            document.head.appendChild(script);
        });
    }

    // Replace existing CSS links with cache-busted versions
    updateExistingCSS() {
        const links = document.querySelectorAll('link[rel="stylesheet"]');
        links.forEach(link => {
            const originalHref = link.href;
            // Only update local resources (not CDNs)
            if (originalHref && !originalHref.includes('cdn.') && !originalHref.includes('v=')) {
                // Convert absolute URL back to relative if needed
                let href = originalHref;
                if (href.includes(window.location.origin)) {
                    href = href.replace(window.location.origin, '');
                }
                link.href = this.addCacheBust(href);
                console.log(`Cache-busted CSS: ${href} -> ${link.href}`);
            }
        });
    }

    // Replace existing script sources with cache-busted versions
    updateExistingJS() {
        const scripts = document.querySelectorAll('script[src]');
        scripts.forEach(script => {
            const originalSrc = script.src;
            // Only update local resources (not CDNs) and not this cache-bust script itself
            if (originalSrc && 
                !originalSrc.includes('cdn.') && 
                !originalSrc.includes('v=') && 
                !originalSrc.includes('cache-bust.js')) {
                // Convert absolute URL back to relative if needed
                let src = originalSrc;
                if (src.includes(window.location.origin)) {
                    src = src.replace(window.location.origin, '');
                }
                script.src = this.addCacheBust(src);
                console.log(`Cache-busted JS: ${src} -> ${script.src}`);
            }
        });
    }

    // Fetch with cache busting
    async fetchWithCacheBust(url, options = {}) {
        const cacheBustedUrl = this.addCacheBust(url);
        return fetch(cacheBustedUrl, options);
    }
}

// Global cache buster instance
window.cacheBuster = new CacheBuster();

// Auto-update existing resources when the page loads
document.addEventListener('DOMContentLoaded', () => {
    console.log('Applying cache busting...');
    window.cacheBuster.updateExistingCSS();
    // Note: We don't auto-update JS because it could break already loaded scripts
});

// Helper function to increment version (for development)
function incrementCacheVersion() {
    const current = window.cacheBuster.version.split('.');
    const patch = parseInt(current[2]) + 1;
    window.cacheBuster.version = `${current[0]}.${current[1]}.${patch}`;
    console.log(`Cache version updated to: ${window.cacheBuster.version}`);
    return window.cacheBuster.version;
}
