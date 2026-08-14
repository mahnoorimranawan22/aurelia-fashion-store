/* =========================================================
   AURELA - Cart & checkout
   ========================================================= */

(function () {
    'use strict';

    var KEY = 'aurela-cart';
    var cart = loadCart();

    function loadCart() {
        try {
            var data = JSON.parse(localStorage.getItem(KEY));
            return Array.isArray(data) ? data : [];
        } catch (e) {
            return [];
        }
    }

    function saveCart() {
        try { localStorage.setItem(KEY, JSON.stringify(cart)); } catch (e) {}
    }

    var cartBtn = document.getElementById('cart-btn');
    var cartCount = document.getElementById('cart-count');
    var drawer = document.getElementById('cart-drawer');
    var overlay = document.getElementById('cart-overlay');
    var cartItems = document.getElementById('cart-items');
    var cartTotal = document.getElementById('cart-total');
    var cartClose = document.getElementById('cart-close');
    var checkoutBtn = document.getElementById('cart-checkout');
    var checkoutModal = document.getElementById('checkout-modal');
    var checkoutBox = document.getElementById('checkout-box');
    var checkoutForm = document.getElementById('checkout-form');
    var toast = document.getElementById('toast');
    var toastTimer = null;

    function fmt(n) {
        return '$' + n.toFixed(2);
    }

    function updateBadge() {
        if (!cartCount) return;
        var n = cart.reduce(function (s, i) { return s + i.qty; }, 0);
        cartCount.textContent = n;
        cartCount.classList.toggle('show', n > 0);
    }

    function render() {
        updateBadge();
        if (!cartItems) return;

        if (!cart.length) {
            cartItems.innerHTML =
                '<div class="cart-empty"><i class="fas fa-shopping-bag"></i><p>Your cart is empty.</p></div>';
        } else {
            cartItems.innerHTML = '';
            cart.forEach(function (item) {
                var row = document.createElement('div');
                row.className = 'cart-item';
                row.innerHTML =
                    '<img src="' + item.img + '" alt="' + item.name + '">' +
                    '<div class="cart-item-info">' +
                        '<h4>' + item.name + '</h4>' +
                        '<p class="cart-price">' + fmt(item.price) + '</p>' +
                        '<div class="qty-controls">' +
                            '<button class="qty-minus" data-id="' + item.id + '" aria-label="Decrease quantity">&#8722;</button>' +
                            '<span>' + item.qty + '</span>' +
                            '<button class="qty-plus" data-id="' + item.id + '" aria-label="Increase quantity">+</button>' +
                        '</div>' +
                    '</div>' +
                    '<button class="cart-remove" data-id="' + item.id + '" aria-label="Remove item">' +
                        '<i class="fas fa-trash-alt"></i>' +
                    '</button>';
                cartItems.appendChild(row);
            });
        }

        var total = cart.reduce(function (s, i) { return s + i.price * i.qty; }, 0);
        if (cartTotal) cartTotal.textContent = fmt(total);
    }

    function openDrawer() {
        if (!drawer || !overlay) return;
        drawer.classList.add('open');
        overlay.classList.add('open');
        drawer.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeDrawer() {
        if (!drawer || !overlay) return;
        drawer.classList.remove('open');
        overlay.classList.remove('open');
        drawer.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    function openCheckout() {
        if (!cart.length) {
            showToast('Your cart is empty');
            return;
        }
        if (checkoutModal) checkoutModal.classList.add('open');
    }

    function closeCheckout() {
        if (checkoutModal) checkoutModal.classList.remove('open');
    }

    function showToast(msg) {
        if (!toast) return;
        toast.textContent = msg;
        toast.classList.add('show');
        clearTimeout(toastTimer);
        toastTimer = setTimeout(function () {
            toast.classList.remove('show');
        }, 2200);
    }

    /* ---------- Global click handling ---------- */
    document.addEventListener('click', function (e) {
        var addBtn = e.target.closest ? e.target.closest('.add-to-cart') : null;
        if (addBtn) {
            var id = addBtn.getAttribute('data-id');
            var name = addBtn.getAttribute('data-name');
            var price = parseFloat(addBtn.getAttribute('data-price')) || 0;
            var img = addBtn.getAttribute('data-img');

            var existing = cart.filter(function (i) { return i.id === id; })[0];
            if (existing) {
                existing.qty += 1;
            } else {
                cart.push({ id: id, name: name, price: price, img: img, qty: 1 });
            }
            saveCart();
            render();

            // Brief feedback on the button
            var original = addBtn.textContent;
            addBtn.textContent = '\u2713 Added';
            setTimeout(function () {
                addBtn.textContent = original;
            }, 1400);

            showToast(name + ' added to cart');
            return;
        }

        if (cartBtn && e.target.closest('#cart-btn')) {
            openDrawer();
            return;
        }

        if ((cartClose && e.target.closest('#cart-close')) || (overlay && e.target === overlay)) {
            closeDrawer();
            return;
        }

        var qtyBtn = e.target.closest ? e.target.closest('.qty-plus, .qty-minus') : null;
        if (qtyBtn) {
            var qId = qtyBtn.getAttribute('data-id');
            var qItem = cart.filter(function (i) { return i.id === qId; })[0];
            if (!qItem) return;
            if (qtyBtn.classList.contains('qty-plus')) {
                qItem.qty += 1;
            } else {
                qItem.qty -= 1;
                if (qItem.qty < 1) cart = cart.filter(function (i) { return i.id !== qId; });
            }
            saveCart();
            render();
            return;
        }

        var removeBtn = e.target.closest ? e.target.closest('.cart-remove') : null;
        if (removeBtn) {
            var rId = removeBtn.getAttribute('data-id');
            cart = cart.filter(function (i) { return i.id !== rId; });
            saveCart();
            render();
            return;
        }

        if (checkoutBtn && e.target.closest('#cart-checkout')) {
            openCheckout();
            return;
        }

        if (e.target.classList && e.target.classList.contains('checkout-overlay')) {
            closeCheckout();
            return;
        }

        var checkoutClose = document.getElementById('checkout-close');
        if (checkoutClose && e.target.closest('#checkout-close')) {
            closeCheckout();
            return;
        }
    });

    /* ---------- Checkout submit ---------- */
    if (checkoutForm && checkoutBox) {
        checkoutForm.addEventListener('submit', function (e) {
            e.preventDefault();

            cart = [];
            saveCart();
            render();

            var form = checkoutForm;
            form.style.display = 'none';

            var success = checkoutBox.querySelector('.order-success');
            if (!success) {
                success = document.createElement('div');
                success.className = 'order-success';
                checkoutBox.appendChild(success);
            }
            success.innerHTML =
                '<i class="fas fa-check-circle"></i>' +
                '<h3>Order Placed!</h3>' +
                '<p>Thank you for shopping with AURELA. A confirmation email is on its way.</p>';

            closeDrawer();

            setTimeout(function () {
                form.style.display = '';
                if (success && success.parentNode === checkoutBox) success.remove();
                checkoutModal.classList.remove('open');
            }, 2600);
        });
    }

    /* ---------- Escape closes overlays ---------- */
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            closeDrawer();
            closeCheckout();
        }
    });

    render();
})();
