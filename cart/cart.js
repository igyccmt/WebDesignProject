// Array to hold cart items
let cartItems = [];

// Function to run when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Clear localStorage for testing
    localStorage.removeItem('cart');
    
    // Add test product
    cartItems.push({
        id: 1,
        name: "HIFI WALKER H2",
        price: 300,
        image: "../images/hifih22.jpg"
    });
    
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cartItems));
    
    loadCart();
    displayCart();
});

// Load cart from localStorage
function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cartItems = JSON.parse(savedCart);
    }
}

// Display cart
function displayCart() {
    const cartContainer = document.querySelector('.cart-items');
    cartContainer.innerHTML = '';

    if (cartItems.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty</p>';
        updateTotals(0);
        return;
    }

    cartItems.forEach((item, index) => {
        const cartItem = `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="item-details">
                    <div class="item-name">${item.name}</div>
                    <div class="item-price">$${item.price}</div>
                </div>
                <button onclick="removeItem(${index})" class="remove-item">Remove</button>
            </div>
        `;
        cartContainer.innerHTML += cartItem;
    });

    updateTotals();
}

// Remove item
function removeItem(index) {
    cartItems.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cartItems));
    displayCart();
}

// Update totals
function updateTotals(discountAmount = 0) {
    const subtotal = cartItems.reduce((total, item) => total + item.price, 0);
    const shipping = subtotal > 0 ? 30 : 0;
    const total = subtotal - discountAmount + shipping;

    document.querySelector('.subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.querySelector('.shipping').textContent = `$${shipping.toFixed(2)}`;
    document.querySelector('.total-amount').textContent = `$${total.toFixed(2)}`;
}

// Clear cart function
function clearCart() {
    cartItems = [];
    localStorage.removeItem('cart'); // Remove cart from localStorage
    displayCart();
}

// Checkout button event listener
document.querySelector('.checkout-btn').addEventListener('click', async () => {
    if (cartItems.length > 0) {
        const checkoutBtn = document.querySelector('.checkout-btn');
        checkoutBtn.disabled = true;
        checkoutBtn.textContent = 'Processing Payment...';
        
        // Simulate payment processing
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Generate random order number
        const orderNumber = 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase();
        
        alert(`Order successfully processed!\nOrder Number: ${orderNumber}`);
        
        // Clear cart after successful order
        clearCart();
        
        // Reset button
        checkoutBtn.disabled = false;
        checkoutBtn.textContent = 'Proceed to Checkout';
    } else {
        alert('Your cart is empty!');
    }
});

// İndirim kodunu kontrol et ve uygula
function applyDiscount() {
    const discountCode = document.getElementById('discountCode').value.toUpperCase();
    const discountRow = document.querySelector('.discount-row');
    
    if (discountCode === 'KHAS') {
        // %90 indirim uygula
        const subtotal = cartItems.reduce((total, item) => total + item.price, 0);
        const discountAmount = subtotal * 0.9; // %90 indirim
        
        // İndirim satırını göster
        discountRow.style.display = 'flex';
        document.querySelector('.discount-amount').textContent = `-$${discountAmount.toFixed(2)}`;
        
        // Toplamı güncelle
        updateTotals(discountAmount);
    } else {
        alert('Invalid discount code!');
        discountRow.style.display = 'none';
        updateTotals(0);
    }
}
