function getOrder() {
    return JSON.parse(localStorage.getItem("order")) || [];
  }
  
  function renderOrderSummary() {
    const order = getOrder();
    const container = document.getElementById("order-summary");
  
    if (!container) return;
  
    if (order.length === 0) {
      container.innerHTML = "<p>No recent order found.</p>";
      return;
    }
  
    let total = 0;
  
    container.innerHTML = order.map(item => {
      const price = item.discountedPrice ?? item.price;
      const subTotal = price * item.quantity;
      total += subTotal;
  
      return `
        <div class="order-item">
          <span>${item.title} × ${item.quantity}</span>
          <span>$${subTotal.toFixed(2)}</span>
        </div>
      `;
    }).join("");
  
    container.innerHTML += `
      <div class="order-total">
        <strong>Total Paid:</strong>
        <strong>$${total.toFixed(2)}</strong>
      </div>
    `;
  }
  
  renderOrderSummary();
  