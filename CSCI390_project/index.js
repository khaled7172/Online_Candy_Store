document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('product-list');

    // Fetch products from the backend
    fetch('getProducts.php')
        .then(response => response.json())
        .then(products => {
            products.forEach(product => {
                // Create a product card
                const productCard = document.createElement('div');
                productCard.classList.add('product-card');

                productCard.innerHTML = `
                    <img src="${product.image_url}" alt="${product.name}" class="product-image">
                    <h2 class="product-name">${product.name}</h2>
                    <p class="product-description">${product.description}</p>
                    <p class="product-price">$${product.price}</p>
                    <button class="add-to-cart-btn" data-product-id="${product.id}">Add to Cart</button>
                `;

                // Add event listener for Add to Cart
                productCard.querySelector('.add-to-cart-btn').addEventListener('click', () => {
                    addToCart(product);
                });

                // Append the product card to the product list
                productList.appendChild(productCard);
            });
        })
        .catch(error => {
            console.error('Error fetching products:', error);
        });
});

// Floating Cart Button and Modal
function createCartUI() {
    // Floating cart button
    let cartBtn = document.getElementById('cart-btn');
    if (!cartBtn) {
        cartBtn = document.createElement('button');
        cartBtn.id = 'cart-btn';
        cartBtn.style.position = 'fixed';
        cartBtn.style.bottom = '30px';
        cartBtn.style.right = '30px';
        cartBtn.style.background = '#ec4899';
        cartBtn.style.color = '#fff';
        cartBtn.style.border = 'none';
        cartBtn.style.borderRadius = '50%';
        cartBtn.style.width = '60px';
        cartBtn.style.height = '60px';
        cartBtn.style.fontSize = '1.5rem';
        cartBtn.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';
        cartBtn.style.zIndex = '1000';
        cartBtn.innerHTML = '🛒<span id="cart-count" style="font-size:1rem;">0</span>';
        document.body.appendChild(cartBtn);
    }
    cartBtn.onclick = showCartModal;
    updateCartCount();

    // Cart modal
    let cartModal = document.getElementById('cart-modal');
    if (!cartModal) {
        cartModal = document.createElement('div');
        cartModal.id = 'cart-modal';
        cartModal.style.display = 'none';
        cartModal.style.position = 'fixed';
        cartModal.style.top = '0';
        cartModal.style.left = '0';
        cartModal.style.width = '100vw';
        cartModal.style.height = '100vh';
        cartModal.style.background = 'rgba(0,0,0,0.4)';
        cartModal.style.zIndex = '2000';
        cartModal.innerHTML = `
            <div style="background:#fff;max-width:400px;margin:60px auto;padding:24px;border-radius:12px;position:relative;">
                <button id="close-cart-modal" style="position:absolute;top:10px;right:10px;font-size:1.2rem;">&times;</button>
                <h2>Your Cart</h2>
                <div id="cart-items"></div>
                <button id="checkout-btn" style="margin-top:16px;background:#ec4899;color:#fff;padding:10px 20px;border:none;border-radius:6px;">Checkout</button>
            </div>
        `;
        document.body.appendChild(cartModal);
        document.getElementById('close-cart-modal').onclick = () => {
            cartModal.style.display = 'none';
        };
        document.getElementById('checkout-btn').onclick = () => {
            alert('Checkout coming soon!');
        };
    }
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCount = document.getElementById('cart-count');
    if (cartCount) cartCount.textContent = count;
}

function showCartModal() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartModal = document.getElementById('cart-modal');
    const cartItemsContainer = document.getElementById('cart-items');
    if (cartModal && cartItemsContainer) {
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        } else {
            cartItemsContainer.innerHTML = '';
            cart.forEach((item, index) => {
                const itemDiv = document.createElement('div');
                itemDiv.style.display = 'flex';
                itemDiv.style.justifyContent = 'space-between';
                itemDiv.style.alignItems = 'center';
                itemDiv.style.marginBottom = '8px';

                const itemName = document.createElement('span');
                itemName.textContent = `${item.name} x${item.quantity}`;

                const itemPrice = document.createElement('span');
                itemPrice.textContent = `$${(item.price * item.quantity).toFixed(2)}`;

                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = 'Delete';
                deleteBtn.style.background = '#ec4899';
                deleteBtn.style.color = '#fff';
                deleteBtn.style.border = 'none';
                deleteBtn.style.borderRadius = '4px';
                deleteBtn.style.padding = '4px 8px';
                deleteBtn.style.cursor = 'pointer';
                deleteBtn.onclick = () => {
                    cart.splice(index, 1);
                    localStorage.setItem('cart', JSON.stringify(cart));
                    updateCartModal();
                    updateCartCount();
                };

                itemDiv.appendChild(itemName);
                itemDiv.appendChild(itemPrice);
                itemDiv.appendChild(deleteBtn);
                cartItemsContainer.appendChild(itemDiv);
            });
        }
        cartModal.style.display = 'block';
    }
}

// Enhance addToCart to update UI
function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert(`${product.name} added to cart!`);
}

function updateCartModal() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cart-items');
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        cartItemsContainer.innerHTML = '';
        cart.forEach((item, index) => {
            const itemDiv = document.createElement('div');
            itemDiv.style.display = 'flex';
            itemDiv.style.justifyContent = 'space-between';
            itemDiv.style.alignItems = 'center';
            itemDiv.style.marginBottom = '8px';

            const itemName = document.createElement('span');
            itemName.textContent = `${item.name} x${item.quantity}`;

            const itemPrice = document.createElement('span');
            itemPrice.textContent = `$${(item.price * item.quantity).toFixed(2)}`;

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.style.background = '#ec4899';
            deleteBtn.style.color = '#fff';
            deleteBtn.style.border = 'none';
            deleteBtn.style.borderRadius = '4px';
            deleteBtn.style.padding = '4px 8px';
            deleteBtn.style.cursor = 'pointer';
            deleteBtn.onclick = () => {
                cart.splice(index, 1);
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartModal();
                updateCartCount();
            };

            itemDiv.appendChild(itemName);
            itemDiv.appendChild(itemPrice);
            itemDiv.appendChild(deleteBtn);
            cartItemsContainer.appendChild(itemDiv);
        });
    }
}

// Initialize cart UI on all pages

createCartUI();

