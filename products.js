document.addEventListener("DOMContentLoaded", function () {

  const grid = document.getElementById("productGrid");
  const cartItemsDiv = document.getElementById("cartItems");
  const cartCountSpan = document.getElementById("cartCount");

  let cart = [];

  /* =========================
     COMPLETE PRODUCT LIST
  ========================= */
  const products = [

    // OILS
    { name: "Cold-Pressed Safflower Oil", price: 450, unit: "L", category: "oil" },
    { name: "Cold-Pressed Sunflower Oil", price: 350, unit: "L", category: "oil" },
    { name: "Cold-Pressed Groundnut Oil", price: 350, unit: "L", category: "oil" },
    { name: "Cold-Pressed Coconut Oil", price: 560, unit: "L", category: "oil" },
    { name: "Cold-Pressed Virgin Coconut Oil", price: 960, unit: "L", category: "oil" },
    { name: "Cold-Pressed Mustard Oil", price: 450, unit: "L", category: "oil" },
    { name: "Cold-Pressed Sesame Oil", price: 600, unit: "L", category: "oil" },
    { name: "Cold-Pressed Castor Oil", price: 800, unit: "L", category: "oil" },
    { name: "Cold-Pressed Deepam Oil", price: 230, unit: "L", category: "oil" },

    // JAGGERY
    { name: "Organic Jaggery Granules", price: 120, unit: "kg", category: "jaggery", bestseller: true },
    { name: "Organic Jaggery Powder", price: 120, unit: "kg", category: "jaggery", bestseller: true },
    { name: "Organic Jaggery Lump", price: 80, unit: "kg", category: "jaggery", bestseller: true },
    { name: "Organic Liquid Jaggery", price: 200, unit: "L", category: "jaggery", bestseller: true },

    // GRAINS
    { name: "Chana Dal", price: 150, unit: "kg", category: "grains" },
    { name: "Moong Dal (With and Without Skin)", price: 190, unit: "kg", category: "grains" },
    { name: "Toor Dal", price: 240, unit: "kg", category: "grains" },

    // FLOUR
    { name: "Emmer Wheat Flour", price: 120, unit: "kg", category: "flour" },
    { name: "Wheat Flour", price: 75, unit: "kg", category: "flour" },
    { name: "Jowar Flour", price: 75, unit: "kg", category: "flour" },
    { name: "Rice Flour", price: 100, unit: "kg", category: "flour" },
    { name: "Besan", price: 180, unit: "kg", category: "flour" },
    { name: "Moong Dal Flour", price: 220, unit: "kg", category: "flour" },

    // SPECIAL
    { name: "A-2 Gir Cow Ghee", price: 1000, unit: "500 g", category: "special" },
    { name: "Chia Seeds", price: 100, unit: "50 g", category: "special" },
    { name: "Dry Ginger Powder", price: 80, unit: "100 g", category: "special" },
    { name: "Mango Ginger Powder", price: 50, unit: "100 g", category: "special" },
    { name: "Moringa Powder", price: 80, unit: "100 g", category: "special" },
    { name: "Jeera (Cumin seeds)", price: 40, unit: "100 g", category: "special" },
    { name: "Whole Methi", price: 60, unit: "100 g", category: "special" },
    { name: "White Sesame", price: 50, unit: "100 g", category: "special" },
    { name: "Mustard", price: 25, unit: "100 g", category: "special" },
    { name: "Non Bleached Poha", price: 90, unit: "kg", category: "special" },
    { name: "Cold-Processed Turmeric Powder", price: 400, unit: "kg", category: "special" },
    { name: "Cold-Processed Red Chilli Powder", price: 600, unit: "kg", category: "special" },
    { name: "Shenga Chutney (Hand Pounded)", price: 360, unit: "kg", category: "special" },
    { name: "Agarbatti (Incense sticks)", price: 50, unit: "packet", category: "special" },
    { name: "Dhoop (Frankincense)", price: 70, unit: "packet", category: "special" }

  ];

  /* =========================
     SHOW POPUP MESSAGE
  ========================= */
  function showPopup(message) {
    const popup = document.createElement("div");
    popup.className = "cart-popup";
    popup.textContent = message;
    document.body.appendChild(popup);

    setTimeout(() => {
      popup.style.opacity = 0;
      setTimeout(() => popup.remove(), 500);
    }, 1500);
  }

  /* =========================
     RENDER PRODUCTS
  ========================= */
  function renderProducts(list) {
    grid.innerHTML = "";

    list.forEach((p, index) => {
      grid.innerHTML += `
        <div class="card">
          ${p.bestseller ? `<span class="badge">Best Seller</span>` : ""}
          <h3>${p.name}</h3>
          <p class="price">₹${p.price} / ${p.unit}</p>
          <div class="card-buttons">
            <button class="add-cart-btn" onclick="addToCart(${index})">Add to Cart</button>
            <button class="order-btn" onclick="orderNow(${index})">Order Now</button>
          </div>
        </div>
      `;
    });
  }

  /* =========================
     ADD TO CART
  ========================= */
  window.addToCart = function (index) {
    cart.push(products[index]);
    updateCart();
    showPopup(`${products[index].name} added to cart`);
  };

  /* =========================
     UPDATE CART
  ========================= */
  function updateCart() {
    cartItemsDiv.innerHTML = "";
    cartCountSpan.textContent = cart.length;

    let total = 0;

    cart.forEach((item, i) => {
      total += item.price;
      cartItemsDiv.innerHTML += `
        <p>
          ${item.name} - ₹${item.price}
          <button class="remove-btn" onclick="removeFromCart(${i})">Remove</button>
        </p>
      `;
    });

    if (cart.length > 0) {
      cartItemsDiv.innerHTML += `<h3>Total: ₹${total}</h3>`;
    
    }
  }

  /* =========================
     REMOVE SINGLE ITEM
  ========================= */
  window.removeFromCart = function (index) {
    cart.splice(index, 1);
    updateCart();
  };

  /* =========================
     CLEAR ENTIRE CART
  ========================= */
  window.clearCart = function () {
    cart = [];
    updateCart();
    showPopup("Cart cleared");
  };

  /* =========================
     ORDER SINGLE ITEM
  ========================= */
  window.orderNow = function(index) {
    const item = products[index];
    const phone = "918277553056";
    const message = `Hello, I want to order ${item.name} for ₹${item.price} / ${item.unit}`;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  /* =========================
     ORDER FULL CART
  ========================= */
  window.orderCart = function () {
    if (cart.length === 0) {
      showPopup("Cart is empty");
      return;
    }

    const phone = "918277553056";
    let message = "Hello, I want to order:\n\n";
    let total = 0;

    cart.forEach(item => {
      message += `${item.name} - ₹${item.price} / ${item.unit}\n`;
      total += item.price;
    });

    message += `\nTotal: ₹${total}`;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  /* =========================
     CATEGORY FILTER
  ========================= */
  const categoryItems = document.querySelectorAll(".categories li");

  categoryItems.forEach(item => {
    item.addEventListener("click", function () {
      categoryItems.forEach(li => li.classList.remove("active"));
      this.classList.add("active");

      const category = this.getAttribute("data-category");
      if (category === "all") {
        renderProducts(products);
        return;
      }

      const filtered = products.filter(p => p.category === category);
      renderProducts(filtered);
    });
  });
  

  /* INITIAL LOAD */
  renderProducts(products);

});