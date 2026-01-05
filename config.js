/**
 * BASE_PATH Configuration
 * Automatically detects if running on GitHub Pages and sets the correct base path
 * Works for both local development and GitHub Pages repository hosting
 */

(function () {
    // Detect if we're on GitHub Pages
    const isGitHubPages = window.location.hostname === 'omaro-dev.github.io' ||
        window.location.hostname.endsWith('github.io');

    // Extract repository name from URL if on GitHub Pages
    let basePath = '/';

    if (isGitHubPages) {
        const pathParts = window.location.pathname.split('/').filter(part => part);
        if (pathParts.length > 0 && pathParts[0] !== 'ExamJS') {
            basePath = '/' + pathParts[0] + '/';
        } else if (window.location.pathname.includes('ExamJS')) {
            basePath = '/ExamJS/';
        }
    }

    // Expose globally
    window.BASE_PATH = basePath;

    /**
     * Navigate to a path using relative routing
     * @param {string} path - Relative path from root
     */
    window.navigateTo = function (path) {
        // Remove leading slash if present
        const cleanPath = path.startsWith('/') ? path.slice(1) : path;
        window.location.href = BASE_PATH + cleanPath;
    };

    /**
     * Get the correct path for any resource
     * @param {string} path - Relative path from root
     * @returns {string} - Corrected path with BASE_PATH prefix
     */
    window.getPath = function (path) {
        // Remove leading slash if present
        const cleanPath = path.startsWith('/') ? path.slice(1) : path;
        return BASE_PATH + cleanPath;
    };

    console.log('BASE_PATH set to:', BASE_PATH);
})();
