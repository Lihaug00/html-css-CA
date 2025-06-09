const API_BASE = "https://v2.api.noroff.dev";
const productContainer = document.getElementById("product-details");

if (!productContainer) {
  alert("Missing #product-details in HTML");
}

const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

if (!productId) {
  productContainer.innerHTML = "<p>Product ID not found in URL.</p>";
  throw new Error("Product ID is missing");
}

async function fetchProduct() {
  productContainer.innerHTML = "<p>Loading product...</p>";

  try {
    const response = await fetch(`${API_BASE}/rainy-days/${productId}`);
    if (!response.ok) throw new Error("Failed to fetch product");

    const result = await response.json();
    const product = result.data;

    productContainer.innerHTML = `
      <div class="product-single">
        <img src="${product.image.url}" alt="${product.image.alt}" />
        <div class="product-info">
          <h1>${product.title}</h1>
          <p>${product.description}</p>
          <p class="price">Price: $${product.discountedPrice ?? product.price}</p>
          <button id="add-to-cart-btn">Add to Cart</button>
        </div>
      </div>
    `;

    document.getElementById("add-to-cart-btn").addEventListener("click", () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];

      const existing = cart.find(item => item.id === product.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        cart.push({
          id: product.id,
          title: product.title,
          price: product.price,
          discountedPrice: product.discountedPrice,
          image: product.image.url,
          quantity: 1
        });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      alert("Product added to cart!");
    });

  } catch (error) {
    productContainer.innerHTML = `<p>Error loading product: ${error.message}</p>`;
    console.error("Product fetch error:", error);
  }
}

fetchProduct();