const grid = document.getElementById("productGrid");

/* =========================
   PRODUCT LIST (STATIC)
========================= */
const products = [

  // ---------------- OILS ----------------
  { name: "Cold-Pressed Safflower Oil", price: 450, unit: "L", category: "oil" },
  { name: "Cold-Pressed Sunflower Oil", price: 350, unit: "L", category: "oil" },
  { name: "Cold-Pressed Groundnut Oil", price: 330, unit: "L", category: "oil" },
  { name: "Cold-Pressed Coconut Oil", price: 560, unit: "L", category: "oil" },
  { name: "Cold-Pressed Virgin Coconut Oil", price: 960, unit: "L", category: "oil" },
  { name: "Cold-Pressed Mustard Oil", price: 450, unit: "L", category: "oil" },
  { name: "Cold-Pressed Sesame Oil", price: 600, unit: "L", category: "oil" },
  { name: "Cold-Pressed Castor Oil", price: 800, unit: "L", category: "oil" },
  { name: "Cold-Pressed Deepam Oil", price: 230, unit: "L", category: "oil" },

  // ---------------- JAGGERY ----------------
  { name: "Organic Jaggery Granules", price: 120, unit: "kg", category: "jaggery" },
  { name: "Organic Jaggery Powder", price: 120, unit: "kg", category: "jaggery" },
  { name: "Organic Liquid Jaggery", price: 140, unit: "L", category: "jaggery" },

  // ---------------- GRAINS ----------------
  { name: "Chana Dal", price: 150, unit: "kg", category: "grains" },
  { name: "Moong Dal (With and Without Skin)", price: 190, unit: "kg", category: "grains" },
  { name: "Toor Dal", price: 240, unit: "kg", category: "grains" },

  // ---------------- FLOURS ----------------
  { name: "Emmer Wheat Flour", price: 120, unit: "kg", category: "flour" },
  { name: "Wheat Flour", price: 75, unit: "kg", category: "flour" },
  { name: "Jowar Flour", price: 75, unit: "kg", category: "flour" },
  { name: "Rice Flour", price: 100, unit: "kg", category: "flour" },
  { name: "Besan", price: 180, unit: "kg", category: "flour" }, 
  { name: "Moong Dal Flour", price: 220, unit: "kg", category: "flour" },

  // ---------------- SPECIAL ----------------
  { name: "A-2 Gir Cow Ghee", price: 1000, unit: "500 g", category: "special" },
  { name: "Chia Seeds", price: 100, unit: "50 g", category: "special" },
  { name: "Dry Ginger Powder", price: 80, unit: "100 g", category: "special" },
  { name: "Mango Ginger Powder", price: 50, unit: "100 g", category: "special" },
  { name: "Moringa Powder", price: 80, unit: "100 g", category: "special" },
  { name: "Jeera", price: 40, unit: "100 g", category: "special" },
  { name: "Whole Methi", price: 60, unit: "100 g", category: "special" },
  { name: "White Sesame", price: 50, unit: "100 g", category: "special" },
  { name: "Mohri", price: 25, unit: "100 g", category: "special" },
  { name: "Non Bleached Poha", price: 90, unit: "kg", category: "special" },
  { name: "Cold-Processed Turmeric Powder", price: 400, unit: "kg", category: "special" },
  { name: "Cold-Processed Red Chilli Powder", price: 600, unit: "kg", category: "special" },
  { name: "Shenga Chutney (Pounding Method)", price: 360, unit: "kg", category: "special" },
  { name: "Agarbatti", price: 50, unit: "packet", category: "special" },
  { name: "Dhoop", price: 70, unit: "packet", category: "special" }
];

/* =========================
   RENDER PRODUCTS
========================= */
function renderProducts(list) {
  grid.innerHTML = "";

  if (list.length === 0) {
    grid.innerHTML = "<p>No products found.</p>";
    return;
  }

  list.forEach((p, index) => {
    grid.innerHTML += `
      <div class="card animate">
        <h3>${p.name}</h3>
        <p class="price">₹${p.price}${p.unit ? " / " + p.unit : ""}</p>
        <div class="qty">
          <button onclick="changeQty(this,-1)">−</button>
          <span>1</span>
          <button onclick="changeQty(this,1)">+</button>
        </div>
        <button onclick="order('${p.name.replace(/'/g, "\\'")}', this)">
          Order
        </button>
      </div>
    `;
  });

  // Stagger animations
  const cards = document.querySelectorAll(".card.animate");
  cards.forEach((card, i) => {
    card.style.animationDelay = `${i * 0.05}s`;
  });
}



/* =========================
   QUANTITY
========================= */
function changeQty(btn, change) {
  const span = btn.parentElement.querySelector("span");
  span.textContent = Math.max(1, Number(span.textContent) + change);
}

/* =========================
   ORDER VIA WHATSAPP
========================= */
function order(product, btn) {
  const qty = btn.previousElementSibling.querySelector("span").textContent;

  const message = `Hi, I want to order ${product} (Qty: ${qty})`;

  window.open(
    `https://wa.me/918277553056?text=${encodeURIComponent(message)}`,
    "_blank"
  );
}

/* =========================
   FILTER & SEARCH
========================= */
let currentCategory = "all";

function filterProducts(category, el) {
  currentCategory = category;

  document.querySelectorAll(".categories li").forEach(li =>
    li.classList.remove("active")
  );

  el.classList.add("active");
  applyFilters();
}

function searchProducts() {
  applyFilters();
}

function applyFilters() {
  const search = document
    .getElementById("searchInput")
    .value.toLowerCase();

  const filtered = products.filter(p =>
    (currentCategory === "all" || p.category === currentCategory) &&
    p.name.toLowerCase().includes(search)
  );

  renderProducts(filtered);
}

/* =========================
   INIT
========================= */
renderProducts(products);

