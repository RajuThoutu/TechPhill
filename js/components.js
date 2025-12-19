// Component Loader
document.addEventListener('DOMContentLoaded', () => {
    loadHeader();
    loadFooter();
    // Check if sidebar is needed
    if (document.getElementById('blog-sidebar-container')) {
        loadSidebar();
    }
});

function getBasePath() {
    // Check if we are inside the blog directory
    if (window.location.pathname.includes('/blog/')) {
        return '..';
    }
    return '.';
}

function loadHeader() {
    const basePath = getBasePath();
    const headerHTML = `
        <div class="container">
            <nav>
                <a href="${basePath}/index.html" class="logo" style="margin-right: 3rem;">Tech Philosophers</a>
                <div class="nav-links">
                    <a href="${basePath}/index.html">Home</a>
                    <a href="${basePath}/services.html">Services</a>
                    <a href="${basePath}/projects.html">Projects</a>
                    <a href="${basePath}/blog/index.html">Insights</a>
                    <a href="${basePath}/podcasts.html">Podcasts</a>
                    <a href="${basePath}/contact.html" class="btn-outline">Contact</a>
                </div>
            </nav>
        </div>
    `;
    document.querySelector('header').innerHTML = headerHTML;

    // Highlight active link
    const currentPath = window.location.pathname;
    document.querySelectorAll('.nav-links a').forEach(link => {
        // Simple check for active state
        const href = link.getAttribute('href');
        // Normalize paths for comparison (remove ./ or ../)
        const normalizedHref = href.replace(/^\.\//, '').replace(/^\.\.\//, '');
        // Check if current path ends with the normalized href
        if (currentPath.endsWith(normalizedHref)) {
            link.classList.add('active');
        }
    });
}

function loadFooter() {
    const basePath = getBasePath();
    const footerHTML = `
        <div class="container">
            <div class="footer-content">
                <div class="footer-brand">
                    <h3>The Tech Philosophers</h3>
                    <p style="color: var(--text-secondary); margin-top: 0.5rem;">Bridging wisdom and tech.</p>
                </div>
                <div class="footer-links">
                    <a href="${basePath}/blog/index.html">Insights</a>
                    <a href="${basePath}/projects.html">Projects</a>
                    <a href="${basePath}/podcasts.html">Podcasts</a>
                    <a href="${basePath}/contact.html">Contact</a>
                </div>
                <div class="social-links">
                    <!-- Social Icons Placeholder -->
                    <a href="#">LinkedIn</a>
                    <a href="#">YouTube</a>
                </div>
            </div>
            <div class="copyright">
                &copy; ${new Date().getFullYear()} Tech Philosophers. All rights reserved.
            </div>
        </div>
    `;
    document.querySelector('footer').innerHTML = footerHTML;
}

function loadSidebar() {
    const sidebarHTML = `
        <div class="sidebar-content">
            <h3>Categories</h3>
            <ul class="category-list">
                <li>
                    <a href="#" class="filter-link" data-filter="all" style="font-weight: 600; color: var(--accent-primary);">View All</a>
                </li>
                <li>
                    <details open>
                        <summary>Technology & AI</summary>
                        <ul>
                            <li><a href="#" class="filter-link" data-filter="tech">All Tech</a></li>
                            <li><a href="#" class="filter-link" data-filter="llms">LLMs & SLMs</a></li>
                            <li><a href="#" class="filter-link" data-filter="enterprise">Enterprise Arch</a></li>
                            <li><a href="#" class="filter-link" data-filter="experiments">AI Experiments</a></li>
                        </ul>
                    </details>
                </li>
                <li>
                    <details>
                        <summary>Mythology & Analogies</summary>
                        <ul>
                            <li><a href="#" class="filter-link" data-filter="mythology">All Mythology</a></li>
                            <li><a href="#" class="filter-link" data-filter="mahabharata">Mahabharata</a></li>
                            <li><a href="#" class="filter-link" data-filter="ramayana">Ramayana</a></li>
                            <li><a href="#" class="filter-link" data-filter="analogies">Modern Analogies</a></li>
                        </ul>
                    </details>
                </li>
                <li>
                    <details>
                        <summary>Education</summary>
                        <ul>
                            <li><a href="#" class="filter-link" data-filter="education">All Education</a></li>
                            <li><a href="#" class="filter-link" data-filter="models">US vs Indic Models</a></li>
                            <li><a href="#" class="filter-link" data-filter="development">Child Development</a></li>
                        </ul>
                    </details>
                </li>
                <li>
                    <details>
                        <summary>Society & Life</summary>
                        <ul>
                            <li><a href="#" class="filter-link" data-filter="society">All Society</a></li>
                            <li><a href="#" class="filter-link" data-filter="genz">Gen Z Insights</a></li>
                            <li><a href="#" class="filter-link" data-filter="culture">Culture</a></li>
                        </ul>
                    </details>
                </li>
            </ul>
        </div>
    `;
    document.getElementById('blog-sidebar-container').innerHTML = sidebarHTML;
}
