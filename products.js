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