let cart = [];
const modal = document.getElementById('cart-modal');
const cartBtn = document.getElementById('cart-btn');
const closeBtn = document.getElementsByClassName('close')[0];
const cartItems = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const cartTotal = document.getElementById('cart-total');

// Product data
const products = [
    { id: 1, name: 'Brown Eggs', price: 5.99 },
    { id: 2, name: 'White Eggs', price: 5.49 }
];

// Add to cart functionality
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1
        });
    }
    updateCart();
}

// Update cart display
function updateCart() {
    cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <span>${item.name}</span>
            <span>${item.quantity} x $${item.price.toFixed(2)}</span>
            <button onclick="removeFromCart(${item.id})">Remove</button>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = total.toFixed(2);
}

// Remove from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// Modal controls
cartBtn.onclick = () => modal.style.display = "block";
closeBtn.onclick = () => modal.style.display = "none";
window.onclick = (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}

// Form submission
document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    alert('Thank you for your message! We will get back to you soon.');
    this.reset();
});

// Add click handlers to all "Add to Cart" buttons
document.querySelectorAll('.product-card button').forEach((button, index) => {
    button.onclick = () => addToCart(products[index].id);
}); 