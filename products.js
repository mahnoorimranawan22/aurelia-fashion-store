/* =========================================================
   AURELA - Product catalog (single source of truth)
   ========================================================= */

var PRODUCTS = [
    {
        id: 'd1', name: 'Elegant Dress', price: 59.99, img: 'images/dress1.jpg', category: 'dresses',
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        desc: 'A timeless floor-length silhouette in lustrous satin. The Elegant Dress cinches softly at the waist and drapes to perfection — ideal for galas, dinners, and evenings that call for understated glamour.'
    },
    {
        id: 'd2', name: 'Classic Blazer', price: 79.99, img: 'images/dress2.jpg', category: 'outerwear',
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        desc: 'Sharp, structured, endlessly versatile. Cut from a premium wool blend with a tailored shoulder and single-button closure, this blazer moves effortlessly from boardroom to dinner.'
    },
    {
        id: 'd3', name: 'Luxury Handbag', price: 89.99, img: 'images/dress3.jpg', category: 'bags',
        sizes: ['One Size'],
        desc: 'Handcrafted from pebbled Italian leather with brushed-gold hardware. Spacious enough for the day, refined enough for the night — the Luxury Handbag is your signature piece.'
    },
    {
        id: 'd4', name: 'Modern Heels', price: 69.99, img: 'images/dress4.jpg', category: 'shoes',
        sizes: ['36', '37', '38', '39', '40', '41'],
        desc: 'A sculpted 90 mm heel with a cushioned insole and elegant pointed toe. Modern Heels pair quiet comfort with a striking silhouette you will reach for every season.'
    },
    {
        id: 'd5', name: 'Summer Dress', price: 54.99, img: 'images/dress5.jpg', category: 'dresses',
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        desc: 'Lightweight, breathable, and cut for warm days. The Summer Dress features a breezy A-line skirt, adjustable straps, and a delicate tie at the waist.'
    },
    {
        id: 'd6', name: 'Formal Coat', price: 99.99, img: 'images/dress2.jpg', category: 'outerwear',
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        desc: 'A long-line coat in a structured double-faced weave. With its clean lapels and generous cut, the Formal Coat finishes any outfit with quiet authority.'
    },
    {
        id: 'd7', name: 'Leather Bag', price: 74.99, img: 'images/dress3.jpg', category: 'bags',
        sizes: ['One Size'],
        desc: 'Supple full-grain leather, minimal hardware, and a design that only gets better with age. The Leather Bag is built to carry everything that matters.'
    },
    {
        id: 'd8', name: 'Fashion Heels', price: 84.99, img: 'images/dress4.jpg', category: 'shoes',
        sizes: ['36', '37', '38', '39', '40', '41'],
        desc: 'Statement heels with a chunky sculpted block and glossy finish. Designed for all-day wear without compromise.'
    },
    {
        id: 'd9', name: 'Silk Evening Dress', price: 119.99, img: 'images/dress6.jpg', category: 'dresses',
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        desc: 'Floating bias-cut silk with a plunging neckline and delicate spaghetti straps. The Silk Evening Dress catches the light — and every eye in the room.'
    },
    {
        id: 'd10', name: 'Floral Midi Dress', price: 64.99, img: 'images/dress7.jpg', category: 'dresses',
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        desc: 'A romantic midi in a hand-drawn floral print. Ruffled sleeves, a flattering wrap waist, and a skirt that moves with you.'
    },
    {
        id: 'd11', name: 'Tailored Trench', price: 109.99, img: 'images/dress8.jpg', category: 'outerwear',
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        desc: 'The definitive trench: double-breasted, water-resistant, and precision-tailored. A timeless layer for every season.'
    },
    {
        id: 'd12', name: 'Designer Tote', price: 94.99, img: 'images/dress9.jpg', category: 'bags',
        sizes: ['One Size'],
        desc: 'Room for a laptop and then some. Structured saffiano leather, magnetic closure, and an interior that keeps everything in its place.'
    },
    {
        id: 'd13', name: 'Evening Gown', price: 139.99, img: 'images/dress10.jpg', category: 'dresses',
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        desc: 'Full-length drama in liquid jersey with a subtle cowl neck and open back. The Evening Gown is reserved for unforgettable nights.'
    },
    {
        id: 'd14', name: 'Statement Blazer', price: 129.99, img: 'images/dress11.jpg', category: 'outerwear',
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        desc: 'Bold shoulders, sharp peak lapels, and a slightly cropped cut. The Statement Blazer turns the simplest outfit into a look.'
    },
    {
        id: 'd15', name: 'Weekend Bag', price: 84.99, img: 'images/dress12.jpg', category: 'bags',
        sizes: ['One Size'],
        desc: 'A spacious carry-all in textured canvas and leather trim. The Weekend Bag makes every escape effortless.'
    },
    {
        id: 'd16', name: 'Leather Ankle Boots', price: 119.99, img: 'images/dress13.jpg', category: 'shoes',
        sizes: ['36', '37', '38', '39', '40', '41'],
        desc: 'Sleek Chelsea boots in supple leather with a stacked heel and elastic side panels. Year-round polish, straight from the box.'
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
