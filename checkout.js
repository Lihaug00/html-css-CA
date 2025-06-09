function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
  }
  
  function saveOrder(order) {
    localStorage.setItem("order", JSON.stringify(order));
  }
  
  function clearCart() {
    localStorage.removeItem("cart");
  }
  
  function renderCartSummary() {
    const cart = getCart();
    const container = document.getElementById("summary-items");
  
    if (!container) return;
  
    if (cart.length === 0) {
      container.innerHTML = "<p>Your cart is empty.</p>";
      return;
    }
  
    let total = 0;
    container.innerHTML = cart.map(item => {
      const price = item.discountedPrice ?? item.price;
      const subTotal = price * item.quantity;
      total += subTotal;
  
      return `
        <div class="checkout-item">
          <span>${item.title} × ${item.quantity}</span>
          <span>$${subTotal.toFixed(2)}</span>
        </div>
      `;
    }).join("");
  
    container.innerHTML += `
      <div class="checkout-total">
        <strong>Total:</strong>
        <strong>$${total.toFixed(2)}</strong>
      </div>
    `;
  }
  
  function setupCheckoutButton() {
    const button = document.getElementById("checkout-btn");
    if (!button) return;
  
    button.addEventListener("click", () => {
      const cart = getCart();
  
      if (cart.length === 0) {
        alert("Your order is empty.");
        return;
      }
  
      saveOrder(cart);
      clearCart();
      window.location.href = "order.html";
    });
  }
  
  renderCartSummary();
  setupCheckoutButton();