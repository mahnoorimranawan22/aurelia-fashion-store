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
    priceEl.textContent = fmt(product.price);
    descEl.textContent = product.desc;
    crumbEl.textContent = product.name;

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

            var price = document.createElement('p');
            price.className = 'price';
            price.textContent = fmt(p.price);

            var btn = document.createElement('button');
            btn.className = 'btn add-to-cart';
            btn.setAttribute('data-id', p.id);
            btn.setAttribute('data-name', p.name);
            btn.setAttribute('data-price', p.price.toFixed(2));
            btn.setAttribute('data-img', p.img);
            btn.textContent = 'Add to Cart';

            card.appendChild(link);
            card.appendChild(price);
            card.appendChild(btn);
            relatedGrid.appendChild(card);
        });
    }
})();
