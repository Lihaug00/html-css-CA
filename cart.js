function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
  }
  
  function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  
  function calculateTotal(cart) {
    return cart.reduce((total, item) => {
      const price = item.discountedPrice ?? item.price;
      return total + price * item.quantity;
    }, 0);
  }
  
  function renderCart() {
    const cart = getCart();
    const cartItemsContainer = document.querySelector(".cart-items");
    const totalDisplay = document.querySelector(".total-price");
  
    if (!cartItemsContainer || !totalDisplay) return;
  
    cartItemsContainer.innerHTML = "";
    let total = 0;
  
    if (cart.length === 0) {
      cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
      totalDisplay.textContent = "Total: $0.00";
      return;
    }
  
    cart.forEach(item => {
      const price = item.discountedPrice ?? item.price;
      const subTotal = price * item.quantity;
      total += subTotal;
  
      const cartItem = document.createElement("div");
      cartItem.className = "cart-item";
      cartItem.innerHTML = `
        <img src="${item.image}" alt="${item.title}" />
        <div class="item-details">
          <p>${item.title}</p>
          <div class="quantity-controls">
            <button class="quantity-btn minus" data-id="${item.id}">-</button>
            <span class="quantity-value">${item.quantity}</span>
            <button class="quantity-btn plus" data-id="${item.id}">+</button>
          </div>
          <p class="price">Sub-Total: $${subTotal.toFixed(2)}</p>
        </div>
        <button class="remove-from-cart-btn" data-id="${item.id}">Remove</button>
      `;
  
      cartItemsContainer.appendChild(cartItem);
    });
  
    totalDisplay.textContent = `Total: $${total.toFixed(2)}`;
  
    setupCartListeners();
  }
  
  function setupCartListeners() {
    document.querySelectorAll(".remove-from-cart-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.id;
        let cart = getCart().filter(item => item.id !== id);
        saveCart(cart);
        renderCart();
      });
    });
  
    document.querySelectorAll(".quantity-btn.plus").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.id;
        let cart = getCart();
        const item = cart.find(i => i.id === id);
        if (item) item.quantity++;
        saveCart(cart);
        renderCart();
      });
    });
  
    document.querySelectorAll(".quantity-btn.minus").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.id;
        let cart = getCart();
        const item = cart.find(i => i.id === id);
        if (item && item.quantity > 1) item.quantity--;
        saveCart(cart);
        renderCart();
      });
    });
  }
  
  renderCart();