/* =========================================================
   AURÉLIA - Site interactions
   ========================================================= */

// Let CSS know JS is available (enables reveal animations safely)
document.documentElement.classList.remove('no-js');

/* ---------- Dark mode toggle ---------- */
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

let theme = document.documentElement.getAttribute('data-theme') || 'light';

function applyTheme(t) {
    document.documentElement.setAttribute('data-theme', t);
    if (themeIcon) themeIcon.className = t === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

applyTheme(theme);

if (themeToggle) {
    themeToggle.addEventListener('click', function () {
        // Flag the switch so CSS can animate the colour transition
        document.documentElement.classList.add('theme-switching');
        theme = theme === 'dark' ? 'light' : 'dark';
        try { localStorage.setItem('aurela-theme', theme); } catch (e) {}
        applyTheme(theme);
        setTimeout(function () {
            document.documentElement.classList.remove('theme-switching');
        }, 500);
    });
}

const header = document.querySelector('header');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const backToTop = document.getElementById('back-to-top');

/* ---------- Sticky header shadow ---------- */
function onScroll() {
    if (header) header.classList.toggle('scrolled', window.scrollY > 10);
    if (backToTop) backToTop.classList.toggle('show', window.scrollY > 400);
}

window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ---------- Mobile navigation toggle ---------- */
function closeNav() {
    if (navLinks) navLinks.classList.remove('open');
    if (navToggle) {
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
    }
}

if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
        const open = navLinks.classList.toggle('open');
        navToggle.classList.toggle('open', open);
        navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    // Close the menu after choosing a link
    navLinks.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', closeNav);
    });

    // Close when clicking outside the menu
    document.addEventListener('click', function (e) {
        if (navLinks.classList.contains('open') && !navLinks.contains(e.target) && !navToggle.contains(e.target)) {
            closeNav();
        }
    });
}

/* ---------- Back to top ---------- */
if (backToTop) {
    backToTop.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/* ---------- Star rating helpers ---------- */
function starsHtml(rating) {
    var html = '';
    for (var i = 1; i <= 5; i++) {
        if (rating >= i) {
            html += '<i class="fas fa-star"></i>';
        } else if (rating >= i - 0.5) {
            html += '<i class="fas fa-star-half-alt"></i>';
        } else {
            html += '<i class="far fa-star"></i>';
        }
    }
    return html;
}

// Fill .product-rating[data-rating] placeholders on cards
function fillCardRatings() {
    document.querySelectorAll('.product-rating[data-rating]').forEach(function (el) {
        var r = parseFloat(el.getAttribute('data-rating')) || 0;
        var n = el.getAttribute('data-reviews') || '';
        el.innerHTML =
            '<span class="rating-stars" aria-label="' + r.toFixed(1) + ' out of 5 stars">' +
                starsHtml(r) +
            '</span>' +
            '<span class="rating-count">' + r.toFixed(1) + (n ? ' (' + n + ')' : '') + '</span>';
    });
}

fillCardRatings();

/* ---------- Shop search, sort & category filters ---------- */
const filterBtns = document.querySelectorAll('.filter-btn');
const shopCards = Array.prototype.slice.call(document.querySelectorAll('.product-card[data-category]'));
const filterCount = document.getElementById('product-count');
const searchInput = document.getElementById('product-search');
const sortSelect = document.getElementById('sort-select');

let activeFilter = 'all';
let searchTerm = '';

function applyShopControls() {
    if (!shopCards.length) return;

    // filter by category + search term
    let visible = shopCards.filter(function (card) {
        const catOk = activeFilter === 'all' || card.getAttribute('data-category') === activeFilter;
        const name = (card.getAttribute('data-name') || '').toLowerCase();
        const term = searchTerm.trim().toLowerCase();
        const searchOk = !term || name.indexOf(term) !== -1;
        return catOk && searchOk;
    });

    // sort
    if (sortSelect && sortSelect.value !== 'featured') {
        const mode = sortSelect.value;
        visible.sort(function (a, b) {
            if (mode === 'price-asc') return parseFloat(a.dataset.price) - parseFloat(b.dataset.price);
            if (mode === 'price-desc') return parseFloat(b.dataset.price) - parseFloat(a.dataset.price);
            if (mode === 'rating-desc') return parseFloat(b.dataset.rating) - parseFloat(a.dataset.rating);
            return 0;
        });
    }

    // hide all, then show + reorder the grid to match the sorted order
    shopCards.forEach(function (card) { card.style.display = 'none'; });
    visible.forEach(function (card) { card.style.display = ''; });
    const grid = document.querySelector('.product-grid');
    if (grid) visible.forEach(function (card) { grid.appendChild(card); });

    filterBtns.forEach(function (b) {
        b.classList.toggle('active', b.getAttribute('data-filter') === activeFilter);
    });
    if (filterCount) filterCount.textContent = 'Showing ' + visible.length + ' of ' + shopCards.length + ' items';
}

filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
        activeFilter = btn.getAttribute('data-filter');
        applyShopControls();
    });
});

if (searchInput) {
    searchInput.addEventListener('input', function () {
        searchTerm = searchInput.value;
        applyShopControls();
    });
}

if (sortSelect) {
    sortSelect.addEventListener('change', applyShopControls);
}

applyShopControls();

/* ---------- Scroll reveal ---------- */
const revealEls = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window && revealEls.length) {

    // Stagger sibling reveals (e.g. cards inside a grid)
    const groups = new Map();
    revealEls.forEach(function (el) {
        const parent = el.parentElement;
        if (!groups.has(parent)) groups.set(parent, []);
        groups.get(parent).push(el);
    });

    groups.forEach(function (group) {
        if (group.length > 1) {
            group.forEach(function (el, i) {
                el.style.transitionDelay = Math.min(i * 110, 600) + 'ms';
            });
        }
    });

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                const el = entry.target;
                el.classList.add('visible');
                observer.unobserve(el);

                // Drop the stagger delay + reveal classes once the animation is done,
                // so hover transforms on cards are not blocked afterwards.
                const delay = parseFloat(el.style.transitionDelay) || 0;
                setTimeout(function () {
                    el.classList.remove('reveal', 'reveal-left', 'reveal-right');
                    el.style.transitionDelay = '';
                }, delay + 850);
            }
        });
    }, { threshold: .12, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(function (el) {
        observer.observe(el);
    });

} else {
    // No IntersectionObserver support: show everything
    revealEls.forEach(function (el) {
        el.classList.add('visible');
    });
}
