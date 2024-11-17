window.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('.search-bar input');
    const productCards = document.querySelectorAll('.product-card');
  
    searchInput.addEventListener('input', () => {
      const searchTerm = searchInput.value.toLowerCase();
      productCards.forEach(card => {
        const productName = card.querySelector('h2').textContent.toLowerCase();
        if (productName.includes(searchTerm)) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });

    const loadingIndicator = document.createElement('div');
    loadingIndicator.classList.add('loading-indicator');
    loadingIndicator.textContent = 'Loading...';
    document.body.appendChild(loadingIndicator);

    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    let cartCount = 0;
    const cartButton = document.querySelector('.cart-button');

    addToCartButtons.forEach(button => {
     button.addEventListener('click', () => {
      cartCount++;
      updateCartCount();
      alert('Item added to cart!');
      });
    });

    function updateCartCount() {
      cartButton.textContent = `Cart (${cartCount})`;
    }

    const navButtons = document.querySelectorAll('.nav-button');

    navButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = button.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop,
            behavior: 'smooth'
          });
        }
      });
    });
    
    const removeFromCartButtons = document.querySelectorAll('.remove-from-cart-btn');

    removeFromCartButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const cartItem = button.closest('.cart-items');
        if (cartItem) {
        cartItem.remove();
        cartCount--;
        if (cartCount < 0) cartCount = 0;
        updateCartCount();
        alert('Item removed from cart!');
      }
    });
  });

    const quantityButtons = document.querySelectorAll('.quantity-controls');

  quantityButtons.forEach(control => {
    const minusButton = control.querySelector('.quantity-btn.minus');
    const plusButton = control.querySelector('.quantity-btn.plus');
    const quantityDisplay = control.querySelector('.quantity-value');
    let quantity = parseInt(quantityDisplay.textContent);

    minusButton.addEventListener('click', () => {
      if (quantity > 1) {
        quantity--;
        quantityDisplay.textContent = quantity;
      }
    });

    plusButton.addEventListener('click', () => {
      quantity++;
      quantityDisplay.textContent = quantity;
    });
  });
});