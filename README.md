# AURELA — Fashion Store

A polished, fully responsive fashion storefront built with **HTML5, CSS3, and vanilla JavaScript** — no frameworks, no build step. Click a product, choose a size, and check out, all client-side.

![AURELA](images/hero.jpg)

## ✨ Features

- **Product catalog** — 12 products across Dresses, Outerwear, Bags, and Shoes
- **Product pages** — dedicated detail page per product (`product.html?id=d1`) with breadcrumbs, size selector, quantity, ratings & reviews, and "You may also like" recommendations
- **Search, sort & filters** — live product search, category filters, and sorting by price or rating
- **Sales & badges** — discount pricing with strikethrough originals and New / Bestseller / Limited badges
- **Cart & checkout** — slide-in cart drawer, quantity controls, live totals, and a checkout modal; cart persists in `localStorage`
- **Dark mode** — toggle in the header, remembers your choice, and respects system preference on first visit
- **Animations** — scroll-reveal sections, staggered card entrances, image zooms, button shine effects, and smooth theme transitions (respects `prefers-reduced-motion`)
- **Fully responsive** — mobile-first layout with a hamburger menu; verified at 375px and desktop widths
- **SEO-ready** — per-page meta descriptions, Open Graph, and Twitter cards

## 🗂 Project structure

```
├── index.html      # Home — hero, categories, featured products, about
├── shop.html       # Full catalog with category filters
├── product.html    # Product detail page (?id=<product-id>)
├── about.html      # Brand story
├── contact.html    # Contact info & form
├── products.js     # Product catalog (single source of truth)
├── product.js      # Product page renderer
├── script.js       # Theme toggle, navigation, reveals, shop filters
├── cart.js         # Cart drawer, quantities, checkout, toasts
├── style.css       # All styling (light/dark themes via CSS variables)
└── images/         # Product & banner imagery (Unsplash-licensed photos)
```

## 🚀 Getting started

This is a static site — no dependencies or build step required.

1. Clone the repo:

   ```bash
   git clone https://github.com/mahnoorimranawan22/aurelia-fashion-store.git
   ```

2. Open `index.html` in your browser, or serve the folder locally:

   ```bash
   python -m http.server 8000
   # then visit http://localhost:8000
   ```

## 🛍 How the cart works

- Click **Add to Cart** on any product card (or choose a size/quantity on a product page first)
- Open the cart with the bag icon in the header
- Adjust quantities, remove items, or hit **Checkout** to place an order
- The cart survives page reloads via `localStorage`

## 🖼 Credits

Photography courtesy of [Unsplash](https://unsplash.com) (free license). Fonts: [Playfair Display](https://fonts.google.com/specimen/Playfair+Display) & [Poppins](https://fonts.google.com/specimen/Poppins) via Google Fonts. Icons by [Font Awesome](https://fontawesome.com).

## 📄 License

MIT — free to use and modify.
