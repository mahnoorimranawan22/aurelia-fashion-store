/* =========================================================
   AURELA - Product catalog (single source of truth)
   ========================================================= */

var PRODUCTS = [
    {
        id: 'd1', name: 'Elegant Dress', price: 59.99, oldPrice: 74.99, img: 'images/dress1.jpg', category: 'dresses',
        rating: 4.6, reviewCount: 18, sizes: ['XS', 'S', 'M', 'L', 'XL'],
        desc: 'A timeless floor-length silhouette in lustrous satin. The Elegant Dress cinches softly at the waist and drapes to perfection — ideal for galas, dinners, and evenings that call for understated glamour.',
        reviews: [
            { name: 'Ayesha K.', star: 5, date: 'June 2026', verified: true, text: 'The satin drapes beautifully and the fit is true to size. Wore it to a dinner and got compliments all night.' },
            { name: 'Sarah M.', star: 4, date: 'May 2026', verified: true, text: 'Lovely dress, slightly long for my height, but a tailor fixed it easily.' },
            { name: 'Hira R.', star: 5, date: 'April 2026', verified: false, text: 'Elegant, comfortable, and the colour is even prettier in person.' }
        ]
    },
    {
        id: 'd2', name: 'Classic Blazer', price: 79.99, img: 'images/dress2.jpg', category: 'outerwear',
        rating: 4.8, reviewCount: 24, sizes: ['XS', 'S', 'M', 'L', 'XL'],
        desc: 'Sharp, structured, endlessly versatile. Cut from a premium wool blend with a tailored shoulder and single-button closure, this blazer moves effortlessly from boardroom to dinner.',
        reviews: [
            { name: 'Omar T.', star: 5, date: 'June 2026', verified: true, text: 'Perfect cut. The shoulders are structured without feeling stiff.' },
            { name: 'Lena P.', star: 5, date: 'May 2026', verified: true, text: 'My go-to work blazer now. The fabric feels premium.' },
            { name: 'Zain A.', star: 4, date: 'April 2026', verified: false, text: 'Great quality for the price. Runs slightly roomy.' }
        ]
    },
    {
        id: 'd3', name: 'Luxury Handbag', price: 89.99, badge: 'Bestseller', img: 'images/dress3.jpg', category: 'bags',
        rating: 4.9, reviewCount: 31, sizes: ['One Size'],
        desc: 'Handcrafted from pebbled Italian leather with brushed-gold hardware. Spacious enough for the day, refined enough for the night — the Luxury Handbag is your signature piece.',
        reviews: [
            { name: 'Maria S.', star: 5, date: 'June 2026', verified: true, text: 'The leather is stunning and the gold hardware looks expensive.' },
            { name: 'Dua F.', star: 5, date: 'May 2026', verified: true, text: 'Fits everything and keeps its shape. Worth every penny.' },
            { name: 'Emily R.', star: 5, date: 'April 2026', verified: false, text: 'Beautiful bag — the smell of the leather alone is worth it.' }
        ]
    },
    {
        id: 'd4', name: 'Modern Heels', price: 69.99, oldPrice: 84.99, img: 'images/dress4.jpg', category: 'shoes',
        rating: 4.4, reviewCount: 15, sizes: ['36', '37', '38', '39', '40', '41'],
        desc: 'A sculpted 90 mm heel with a cushioned insole and elegant pointed toe. Modern Heels pair quiet comfort with a striking silhouette you will reach for every season.',
        reviews: [
            { name: 'Nadia B.', star: 4, date: 'June 2026', verified: true, text: 'Comfortable for a night out. The cushioning is a lifesaver.' },
            { name: 'Sofia L.', star: 4, date: 'May 2026', verified: true, text: 'Elegant silhouette, a bit narrow for wide feet.' },
            { name: 'Areeba S.', star: 5, date: 'April 2026', verified: false, text: 'Heels that don\'t hurt? Yes. Highly recommend.' }
        ]
    },
    {
        id: 'd9', name: 'Silk Evening Dress', price: 119.99, badge: 'New', img: 'images/dress6.jpg', category: 'dresses',
        rating: 4.7, reviewCount: 22, sizes: ['XS', 'S', 'M', 'L', 'XL'],
        desc: 'Floating bias-cut silk with a plunging neckline and delicate spaghetti straps. The Silk Evening Dress catches the light — and every eye in the room.',
        reviews: [
            { name: 'Isabelle C.', star: 5, date: 'June 2026', verified: true, text: 'The silk feels incredible and the bias cut is very flattering.' },
            { name: 'Maira A.', star: 4, date: 'May 2026', verified: true, text: 'Gorgeous dress. Runs small in the bust — size up.' },
            { name: 'Chloe D.', star: 5, date: 'April 2026', verified: false, text: 'Wore it to a wedding — absolute showstopper.' }
        ]
    },
    {
        id: 'd10', name: 'Floral Midi Dress', price: 64.99, oldPrice: 79.99, img: 'images/dress7.jpg', category: 'dresses',
        rating: 4.5, reviewCount: 17, sizes: ['XS', 'S', 'M', 'L', 'XL'],
        desc: 'A romantic midi in a hand-drawn floral print. Ruffled sleeves, a flattering wrap waist, and a skirt that moves with you.',
        reviews: [
            { name: 'Fatima N.', star: 5, date: 'June 2026', verified: true, text: 'The print is so pretty and the wrap waist is flattering.' },
            { name: 'Priya V.', star: 4, date: 'May 2026', verified: true, text: 'Light and comfy for summer days.' },
            { name: 'Noor H.', star: 4, date: 'April 2026', verified: false, text: 'Cute dress, the fabric is a little thin but fine for warm weather.' }
        ]
    },
    {
        id: 'd11', name: 'Tailored Trench', price: 109.99, img: 'images/dress8.jpg', category: 'outerwear',
        rating: 4.8, reviewCount: 26, sizes: ['XS', 'S', 'M', 'L', 'XL'],
        desc: 'The definitive trench: double-breasted, water-resistant, and precision-tailored. A timeless layer for every season.',
        reviews: [
            { name: 'James K.', star: 5, date: 'June 2026', verified: true, text: 'The definitive trench coat. Water-repellent and sharp.' },
            { name: 'Amna Q.', star: 5, date: 'May 2026', verified: true, text: 'Tailoring is excellent — it sits perfectly on the shoulders.' },
            { name: 'Daniel E.', star: 4, date: 'April 2026', verified: false, text: 'Great coat, runs long. I\'m tall and it\'s just right.' }
        ]
    },
    {
        id: 'd12', name: 'Designer Tote', price: 94.99, img: 'images/dress9.jpg', category: 'bags',
        rating: 4.6, reviewCount: 19, sizes: ['One Size'],
        desc: 'Room for a laptop and then some. Structured saffiano leather, magnetic closure, and an interior that keeps everything in its place.',
        reviews: [
            { name: 'Ruby T.', star: 5, date: 'June 2026', verified: true, text: 'Holds my 15-inch laptop plus everything else.' },
            { name: 'Sana J.', star: 4, date: 'May 2026', verified: true, text: 'Sturdy and sleek. The zipper could be smoother.' },
            { name: 'Grace W.', star: 5, date: 'April 2026', verified: false, text: 'Professional look, incredible capacity.' }
        ]
    },
    {
        id: 'd13', name: 'Evening Gown', price: 139.99, badge: 'Limited', img: 'images/dress10.jpg', category: 'dresses',
        rating: 4.9, reviewCount: 28, sizes: ['XS', 'S', 'M', 'L', 'XL'],
        desc: 'Full-length drama in liquid jersey with a subtle cowl neck and open back. The Evening Gown is reserved for unforgettable nights.',
        reviews: [
            { name: 'Elena M.', star: 5, date: 'June 2026', verified: true, text: 'Liquid jersey hugs in all the right places. Unforgettable.' },
            { name: 'Rania H.', star: 5, date: 'May 2026', verified: true, text: 'The cowl neck is stunning. Fits like a dream.' },
            { name: 'Katya S.', star: 5, date: 'April 2026', verified: false, text: 'Wore it to a gala — received endless compliments.' }
        ]
    },
    {
        id: 'd14', name: 'Statement Blazer', price: 129.99, oldPrice: 159.99, img: 'images/dress11.jpg', category: 'outerwear',
        rating: 4.3, reviewCount: 12, sizes: ['XS', 'S', 'M', 'L', 'XL'],
        desc: 'Bold shoulders, sharp peak lapels, and a slightly cropped cut. The Statement Blazer turns the simplest outfit into a look.',
        reviews: [
            { name: 'Bilal R.', star: 4, date: 'June 2026', verified: true, text: 'Bold shoulders exactly as pictured. Very fashion-forward.' },
            { name: 'Inaya M.', star: 4, date: 'May 2026', verified: true, text: 'Love the cropped cut — pairs great with high-waisted pants.' },
            { name: 'Sam P.', star: 4, date: 'April 2026', verified: false, text: 'Sharp look; the fabric is mid-weight.' }
        ]
    },
    {
        id: 'd15', name: 'Weekend Bag', price: 84.99, img: 'images/dress12.jpg', category: 'bags',
        rating: 4.7, reviewCount: 21, sizes: ['One Size'],
        desc: 'A spacious carry-all in textured canvas and leather trim. The Weekend Bag makes every escape effortless.',
        reviews: [
            { name: 'Lucas F.', star: 5, date: 'June 2026', verified: true, text: 'Spacious, rugged, and looks premium.' },
            { name: 'Mehwish T.', star: 5, date: 'May 2026', verified: true, text: 'Perfect for weekend trips — fits a week\'s worth of clothes.' },
            { name: 'Hana Y.', star: 4, date: 'April 2026', verified: false, text: 'Excellent bag, the strap could be a bit longer.' }
        ]
    },
    {
        id: 'd16', name: 'Leather Ankle Boots', price: 119.99, oldPrice: 144.99, img: 'images/dress13.jpg', category: 'shoes',
        rating: 4.5, reviewCount: 16, sizes: ['36', '37', '38', '39', '40', '41'],
        desc: 'Sleek Chelsea boots in supple leather with a stacked heel and elastic side panels. Year-round polish, straight from the box.',
        reviews: [
            { name: 'Alex G.', star: 5, date: 'June 2026', verified: true, text: 'Buttery leather, perfect fit, and they go with everything.' },
            { name: 'Rimsha K.', star: 4, date: 'May 2026', verified: true, text: 'Great boots — took a few wears to break in.' },
            { name: 'Jonah W.', star: 4, date: 'April 2026', verified: false, text: 'Sleek and sturdy. True to size.' }
        ]
    }
];

var CATEGORY_LABELS = {
    dresses: 'Dresses',
    outerwear: 'Outerwear',
    bags: 'Bags',
    shoes: 'Shoes'
};

function getProduct(id) {
    return PRODUCTS.filter(function (p) { return p.id === id; })[0] || PRODUCTS[0];
}

function discountPct(p) {
    return p.oldPrice ? Math.round((1 - p.price / p.oldPrice) * 100) : 0;
}

function badgeText(p) {
    if (p.badge) return p.badge;
    return p.oldPrice ? '-' + discountPct(p) + '%' : '';
}

function badgeClass(p) {
    if (p.badge) return p.badge.toLowerCase();
    return 'sale';
}
