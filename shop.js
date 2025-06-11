const API_BASE = "https://v2.api.noroff.dev";
const productGrid = document.querySelector(".product-grid");
const genderFilter = document.getElementById("genderFilter");

let allProducts = [];

async function fetchProducts() {
  productGrid.innerHTML = "<p>Loading products...</p>";
  try {
    const res = await fetch(`${API_BASE}/rainy-days`);
    if (!res.ok) throw new Error("Failed to fetch products");
    const result = await res.json();
    allProducts = result.data;
    renderProducts(allProducts);
  } catch (error) {
    productGrid.innerHTML = `<p>Error loading products: ${error.message}</p>`;
  }
}

function renderProducts(products) {
  productGrid.innerHTML = "";
  if (products.length === 0) {
    productGrid.innerHTML = "<p>No products match your filters.</p>";
    return;
  }

  products.forEach(product => {
    const card = document.createElement("a");
    card.className = "product-card";
    card.href = `product.html?id=${product.id}`;
    card.innerHTML = `
      <img src="${product.image.url}" alt="${product.image.alt}" />
      <h2>${product.title}</h2>
      <p>${product.description}</p>
      <p class="price">$${product.discountedPrice ?? product.price}</p>
    `;
    productGrid.appendChild(card);
  });
}

function applyFilters() {
  const selectedGender = genderFilter.value;

  const filtered = allProducts.filter(product => {
    return !selectedGender || product.gender?.toLowerCase() === selectedGender;
  });

  renderProducts(filtered);
}

genderFilter.addEventListener("change", applyFilters);

fetchProducts();
