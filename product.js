/* =========================================================
   AURELA - Product detail page
   ========================================================= */

(function () {
    'use strict';

    var params = new URLSearchParams(window.location.search);
    var product = getProduct(params.get('id'));

    var img = document.getElementById('p-img');
    var nameEl = document.getElementById('p-name');
    var catEl = document.getElementById('p-cat');
    var priceEl = document.getElementById('p-price');
    var descEl = document.getElementById('p-desc');
    var crumbEl = document.getElementById('crumb-name');
    var sizesEl = document.getElementById('p-sizes');
    var addBtn = document.getElementById('p-add');
    var qtyVal = document.getElementById('qty-val');
    var qtyMinus = document.getElementById('qty-minus');
    var qtyPlus = document.getElementById('qty-plus');
    var relatedGrid = document.getElementById('related-grid');

    var size = product.sizes[0];
    var qty = 1;

    function fmt(n) {
        return '$' + n.toFixed(2);
    }

    /* ---------- Fill in product details ---------- */
    document.title = product.name + ' | AURELA Fashion Store';

    var ogTitle = document.querySelector('meta[property="og:title"]');
    var ogImage = document.querySelector('meta[property="og:image"]');
    var ogDesc = document.querySelector('meta[property="og:description"]');
    var metaDesc = document.querySelector('meta[name="description"]');
    if (ogTitle) ogTitle.setAttribute('content', product.name + ' | AURELA');
    if (ogImage) ogImage.setAttribute('content', product.img);
    if (ogDesc) ogDesc.setAttribute('content', product.desc);
    if (metaDesc) metaDesc.setAttribute('content', product.desc);

    img.src = product.img;
    img.alt = product.name;
    nameEl.textContent = product.name;
    catEl.textContent = CATEGORY_LABELS[product.category] || product.category;
    priceEl.innerHTML = fmt(product.price) + (product.oldPrice ? ' <del class="price-old">' + fmt(product.oldPrice) + '</del>' : '');
    descEl.textContent = product.desc;

    var pBadge = document.getElementById('p-badge');
    if (pBadge) {
        var bText = badgeText(product);
        if (bText) {
            pBadge.textContent = bText;
            pBadge.className = 'card-badge product-page-badge badge-' + badgeClass(product);
            pBadge.style.display = 'inline-block';
        } else {
            pBadge.style.display = 'none';
        }
    }
    crumbEl.textContent = product.name;

    var pRating = document.getElementById('p-rating');
    if (pRating) {
        pRating.innerHTML =
            '<span class="rating-stars">' + (typeof starsHtml === 'function' ? starsHtml(product.rating) : '') + '</span>' +
            '<span class="rating-count">' + product.rating.toFixed(1) + ' (' + product.reviewCount + ')</span>';
    }

    /* ---------- Size selector ---------- */
    product.sizes.forEach(function (s, i) {
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'size-btn' + (i === 0 ? ' selected' : '');
        btn.textContent = s;
        btn.addEventListener('click', function () {
            size = s;
            sizesEl.querySelectorAll('.size-btn').forEach(function (b) {
                b.classList.toggle('selected', b === btn);
            });
            syncAddBtn();
        });
        sizesEl.appendChild(btn);
    });

    /* ---------- Quantity ---------- */
    function setQty(n) {
        qty = Math.max(1, Math.min(9, n));
        qtyVal.textContent = qty;
        syncAddBtn();
    }

    qtyMinus.addEventListener('click', function () { setQty(qty - 1); });
    qtyPlus.addEventListener('click', function () { setQty(qty + 1); });

    /* ---------- Keep the Add-to-Cart button in sync ---------- */
    function syncAddBtn() {
        addBtn.setAttribute('data-id', product.id);
        addBtn.setAttribute('data-name', product.name);
        addBtn.setAttribute('data-price', product.price.toFixed(2));
        addBtn.setAttribute('data-img', product.img);
        addBtn.setAttribute('data-size', size);
        addBtn.setAttribute('data-qty', qty);
    }

    syncAddBtn();

    /* ---------- Related products ---------- */
    if (relatedGrid) {
        var related = PRODUCTS.filter(function (p) {
            return p.id !== product.id;
        }).sort(function (a, b) {
            // same category first, then by name for a stable order
            var aSame = a.category === product.category ? 0 : 1;
            var bSame = b.category === product.category ? 0 : 1;
            return aSame - bSame || a.name.localeCompare(b.name);
        }).slice(0, 4);

        related.forEach(function (p) {
            var card = document.createElement('div');
            card.className = 'product-card';

            var link = document.createElement('a');
            link.className = 'card-link';
            link.href = 'product.html?id=' + p.id;
            link.innerHTML =
                '<img src="' + p.img + '" alt="' + p.name + '" loading="lazy">' +
                '<h3>' + p.name + '</h3>';

            var badge = document.createElement('div');
            if (badgeText(p)) {
                badge.className = 'card-badge badge-' + badgeClass(p);
                badge.textContent = badgeText(p);
            }

            var price = document.createElement('p');
            price.className = 'price';
            price.innerHTML = fmt(p.price) + (p.oldPrice ? ' <del class="price-old">' + fmt(p.oldPrice) + '</del>' : '');

            var rating = document.createElement('div');
            rating.className = 'product-rating';
            rating.innerHTML =
                '<span class="rating-stars">' + (typeof starsHtml === 'function' ? starsHtml(p.rating) : '') + '</span>' +
                '<span class="rating-count">' + p.rating.toFixed(1) + ' (' + p.reviewCount + ')</span>';

            var btn = document.createElement('button');
            btn.className = 'btn add-to-cart';
            btn.setAttribute('data-id', p.id);
            btn.setAttribute('data-name', p.name);
            btn.setAttribute('data-price', p.price.toFixed(2));
            btn.setAttribute('data-img', p.img);
            btn.textContent = 'Add to Cart';

            if (badge.textContent) card.insertBefore(badge, card.firstChild);
            card.appendChild(link);
            card.appendChild(price);
            card.appendChild(rating);
            card.appendChild(btn);
            relatedGrid.appendChild(card);
        });
    }

    /* ---------- Reviews ---------- */
    var revAvgEl = document.getElementById('rev-avg');
    var revStarsEl = document.getElementById('rev-stars');
    var revCountEl = document.getElementById('rev-count');
    var revBreakdownEl = document.getElementById('rev-breakdown');
    var revListEl = document.getElementById('reviews-list');
    var reviewForm = document.getElementById('review-form');
    var starPicker = document.getElementById('star-picker');

    function esc(s) {
        return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    if (revAvgEl && revListEl) {

        var STORE_KEY = 'aurela-reviews-' + product.id;
        var submitted = [];
        try { submitted = JSON.parse(localStorage.getItem(STORE_KEY)) || []; } catch (e) { submitted = []; }

        // Build a plausible star distribution whose mean matches the product rating
        function distFromRating(r, n) {
            var out = [0, 0, 0, 0, 0];
            for (var i = 0; i < n; i++) out[4]++;
            var mean = 5;
            var guard = 0;
            while (mean > r + 0.001 && guard < n * 5) {
                var moved = false;
                for (var s = 4; s >= 1; s--) {
                    if (out[s] > 0) {
                        out[s]--;
                        out[s - 1]++;
                        mean -= 1 / n;
                        moved = true;
                        break;
                    }
                }
                if (!moved) break;
                guard++;
            }
            return out;
        }

        function avgFromDist(d) {
            var sum = 0, total = 0;
            d.forEach(function (c, i) { sum += c * (i + 1); total += c; });
            return total ? sum / total : 0;
        }

        function reviewCardHtml(rv) {
            var initial = (rv.name || '?').trim().charAt(0).toUpperCase() || '?';
            return '<div class="review-card">' +
                '<div class="review-head">' +
                    '<div class="review-avatar">' + esc(initial) + '</div>' +
                    '<div>' +
                        '<div class="review-name">' + esc(rv.name) + '</div>' +
                        '<div class="review-date">' + esc(rv.date) + '</div>' +
                    '</div>' +
                    (rv.verified ? '<span class="review-badge"><i class="fas fa-check-circle"></i> Verified</span>' : '') +
                '</div>' +
                '<div class="rating-stars review-stars">' + (typeof starsHtml === 'function' ? starsHtml(rv.star) : '') + '</div>' +
                '<p class="review-text">' + esc(rv.text) + '</p>' +
            '</div>';
        }

        function renderReviews() {
            var dist = distFromRating(product.rating, product.reviewCount);
            var total = product.reviewCount;
            submitted.forEach(function (rv) {
                var star = Math.max(1, Math.min(5, Math.round(rv.star)));
                dist[star - 1]++;
                total++;
            });
            var avg = avgFromDist(dist);

            revAvgEl.textContent = avg.toFixed(1);
            revStarsEl.innerHTML = typeof starsHtml === 'function' ? starsHtml(avg) : '';
            revCountEl.textContent = 'Based on ' + total + ' reviews';

            var html = '';
            for (var s = 5; s >= 1; s--) {
                var pct = total ? Math.round((dist[s - 1] / total) * 100) : 0;
                html += '<div class="breakdown-row">' +
                    '<span>' + s + ' <i class="fas fa-star"></i></span>' +
                    '<div class="breakdown-bar"><div class="breakdown-fill" style="width:' + pct + '%"></div></div>' +
                    '<span>' + dist[s - 1] + '</span>' +
                '</div>';
            }
            revBreakdownEl.innerHTML = html;

            var reviewsHtml = '';
            submitted.slice().reverse().forEach(function (rv) { reviewsHtml += reviewCardHtml(rv); });
            product.reviews.forEach(function (rv) { reviewsHtml += reviewCardHtml(rv); });
            revListEl.innerHTML = reviewsHtml || '<p class="reviews-empty">No reviews yet — be the first to write one!</p>';
        }

        /* ---------- Star picker ---------- */
        var pickedStar = 0;

        function paint(val) {
            var icons = starPicker.querySelectorAll('i');
            for (var i = 0; i < icons.length; i++) {
                icons[i].className = i < val ? 'fas fa-star on' : 'far fa-star';
            }
        }

        if (starPicker) {
            for (var i = 1; i <= 5; i++) {
                var icon = document.createElement('i');
                icon.className = 'far fa-star';
                icon.setAttribute('data-val', i);
                icon.addEventListener('mouseenter', function () { paint(parseInt(this.getAttribute('data-val'), 10)); });
                icon.addEventListener('click', function () {
                    pickedStar = parseInt(this.getAttribute('data-val'), 10);
                    paint(pickedStar);
                });
                starPicker.appendChild(icon);
            }
            starPicker.addEventListener('mouseleave', function () { paint(pickedStar); });
            paint(0);
        }

        /* ---------- Submit ---------- */
        if (reviewForm) {
            reviewForm.addEventListener('submit', function (e) {
                e.preventDefault();
                var name = reviewForm.elements.rname.value.trim();
                var text = reviewForm.elements.rtext.value.trim();

                if (pickedStar === 0) {
                    if (window.showToast) window.showToast('Please select a star rating');
                    return;
                }

                var now = new Date();
                var date = now.toLocaleString('en-US', { month: 'long', year: 'numeric' });
                submitted.push({ name: name, star: pickedStar, date: date, verified: false, text: text });
                try { localStorage.setItem(STORE_KEY, JSON.stringify(submitted)); } catch (err) {}

                reviewForm.reset();
                pickedStar = 0;
                paint(0);
                renderReviews();
                if (window.showToast) window.showToast('Thanks for your review!');
            });
        }

        renderReviews();
    }
})();
