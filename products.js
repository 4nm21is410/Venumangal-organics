document.addEventListener("DOMContentLoaded", function () {

  const grid = document.getElementById("productGrid");

  /* =========================
     PRODUCT LIST
  ========================= */
  const products = [
    { name: "Cold-Pressed Safflower Oil", price: 450, unit: "L", category: "oil" },
    { name: "Cold-Pressed Sunflower Oil", price: 350, unit: "L", category: "oil" },
    { name: "Cold-Pressed Groundnut Oil", price: 350, unit: "L", category: "oil" },
    { name: "Cold-Pressed Coconut Oil", price: 560, unit: "L", category: "oil" },
    { name: "Cold-Pressed Virgin Coconut Oil", price: 960, unit: "L", category: "oil" },
    { name: "Cold-Pressed Mustard Oil", price: 450, unit: "L", category: "oil" },
    { name: "Cold-Pressed Sesame Oil", price: 600, unit: "L", category: "oil" },
    { name: "Cold-Pressed Castor Oil", price: 800, unit: "L", category: "oil" },
    { name: "Cold-Pressed Deepam Oil", price: 230, unit: "L", category: "oil" },

    { name: "Organic Jaggery Granules", price: 120, unit: "kg", category: "jaggery" },
    { name: "Organic Jaggery Powder", price: 120, unit: "kg", category: "jaggery" },
    { name: "Organic Jaggery Lump", price: 80, unit: "kg", category: "jaggery" },
    { name: "Organic Liquid Jaggery", price: 200, unit: "L", category: "jaggery" },

    { name: "Chana Dal", price: 150, unit: "kg", category: "grains" },
    { name: "Moong Dal (With and Without Skin)", price: 190, unit: "kg", category: "grains" },
    { name: "Toor Dal", price: 240, unit: "kg", category: "grains" },

    { name: "Emmer Wheat Flour", price: 120, unit: "kg", category: "flour" },
    { name: "Wheat Flour", price: 75, unit: "kg", category: "flour" },
    { name: "Jowar Flour", price: 75, unit: "kg", category: "flour" },
    { name: "Rice Flour", price: 100, unit: "kg", category: "flour" },
    { name: "Besan", price: 180, unit: "kg", category: "flour" },
    { name: "Moong Dal Flour", price: 220, unit: "kg", category: "flour" },

    { name: "A-2 Gir Cow Ghee", price: 1000, unit: "500 g", category: "special" },
    { name: "Chia Seeds", price: 100, unit: "50 g", category: "special" },
    { name: "Dry Ginger Powder", price: 80, unit: "100 g", category: "special" },
    { name: "Mango Ginger Powder", price: 50, unit: "100 g", category: "special" },
    { name: "Moringa Powder", price: 80, unit: "100 g", category: "special" },
    { name: "Jeera(Cumin seeds)", price: 40, unit: "100 g", category: "special" },
    { name: "Whole Methi", price: 60, unit: "100 g", category: "special" },
    { name: "White Sesame", price: 50, unit: "100 g", category: "special" },
    { name: "Mustard", price: 25, unit: "100 g", category: "special" },
    { name: "Non Bleached Poha", price: 90, unit: "kg", category: "special" },
    { name: "Cold-Processed Turmeric Powder", price: 400, unit: "kg", category: "special" },
    { name: "Cold-Processed Red Chilli Powder", price: 600, unit: "kg", category: "special" },
    { name: "Shenga Chutney (Hand Pounded)", price: 360, unit: "kg", category: "special" },
    { name: "Agarbatti( incense sticks)", price: 50, unit: "packet", category: "special" },
    { name: "Dhoop(frankincense)", price: 70, unit: "packet", category: "special" }
  ];

  let cart = [];

  /* =========================
     CLOSE CART (X BUTTON FIX)
  ========================= */
  const closeCartBtn = document.querySelector(".close-cart");
  const cartSidebar = document.getElementById("cartSidebar");

  if (closeCartBtn && cartSidebar) {
    closeCartBtn.addEventListener("click", function () {
      cartSidebar.classList.remove("active");
    });
  }

  /* ========================= */
  function renderProducts(list) {
    grid.innerHTML = "";

    list.forEach(p => {
      grid.innerHTML += `
        <div class="card">
          <h3>${p.name}</h3>
          <p class="price">₹${p.price} / ${p.unit}</p>

          <div class="qty">
            <button onclick="changeQty(this,-1)">−</button>
            <span>1</span>
            <button onclick="changeQty(this,1)">+</button>
          </div>

          <div class="card-buttons">
            <button class="add-cart-btn"
              onclick="addToCart('${p.name}', ${p.price}, '${p.unit}', this)">
              Add to Cart
            </button>

            <button class="order-btn"
              onclick="orderNow('${p.name}', ${p.price}, '${p.unit}', this)">
              Order Now
            </button>
          </div>
        </div>
      `;
    });
  }

  window.changeQty = function(btn, change) {
    const span = btn.parentElement.querySelector("span");
    let value = parseInt(span.textContent);
    value = Math.max(1, value + change);
    span.textContent = value;
  };

  window.addToCart = function(name, price, unit, btn) {
    const card = btn.closest(".card");
    const qty = parseInt(card.querySelector(".qty span").textContent);

    const existing = cart.find(item => item.name === name);

    if (existing) {
      existing.quantity += qty;
    } else {
      cart.push({ name, price, unit, quantity: qty });
    }

    updateCartUI();
  };

  window.removeItem = function(index) {
    cart.splice(index, 1);
    updateCartUI();
  };

  window.clearCart = function() {
    cart = [];
    updateCartUI();
  };

  function updateCartUI() {
    const cartItems = document.getElementById("cartItems");
    const cartCount = document.getElementById("cartCount");
    const cartTotal = document.getElementById("cartTotal");

    cartItems.innerHTML = "";

    let total = 0;
    let count = 0;

    cart.forEach((item, index) => {
      total += item.price * item.quantity;
      count += item.quantity;

      cartItems.innerHTML += `
        <div class="cart-item">
          <p><strong>${item.name}</strong></p>
          <p>₹${item.price} × ${item.quantity} ${item.unit}</p>
          <button onclick="removeItem(${index})" class="remove-btn">
            Remove
          </button>
        </div>
      `;
    });

    cartCount.innerText = count;
    cartTotal.innerText = "Total: ₹" + total;
  }

  window.orderCart = function() {
    if (cart.length === 0) {
      alert("Cart is empty!");
      return;
    }

    let message = "Hi! I would like to place an order for:\n\n";

    cart.forEach(item => {
      message += `- ${item.quantity} ${item.unit === 'L' ? 'liters' : item.unit} of ${item.name}\n`;
    });

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/918277553056?text=${encoded}`, "_blank");
  };

  window.orderNow = function(name, price, unit, btn) {
    const card = btn.closest(".card");
    const qty = parseInt(card.querySelector(".qty span").textContent);

    const message = `Hi! I would like to place an order for:

- ${qty} ${unit === 'L' ? 'liters' : unit} of ${name}.`;

    const url = `https://wa.me/918277553056?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  /* =========================
   CATEGORY FILTER
========================= */

const categoryItems = document.querySelectorAll(".categories li");

categoryItems.forEach(item => {
  item.addEventListener("click", function () {

    // remove active from all
    categoryItems.forEach(li => li.classList.remove("active"));

    // add active to clicked
    this.classList.add("active");

    const selected = this.textContent.trim().toLowerCase();

    if (selected === "all") {
      renderProducts(products);
      return;
    }

    let categoryKey = "";

    if (selected === "oils") categoryKey = "oil";
    if (selected === "jaggery") categoryKey = "jaggery";
    if (selected === "grains & dal") categoryKey = "grains";
    if (selected === "flours") categoryKey = "flour";
    if (selected === "special") categoryKey = "special";

    const filtered = products.filter(p => p.category === categoryKey);
    renderProducts(filtered);

  });
});

  renderProducts(products);

});