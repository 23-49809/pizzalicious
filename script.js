// Search and menu toggle
const searchbtn = document.querySelector('#search');
const searchfrm = document.querySelector('.head .search-bar');
const menu = document.querySelector('.head .navbar');

if (searchbtn && searchfrm && menu) {
    searchbtn.onclick = () => {
        searchfrm.classList.toggle('active');
        menu.classList.remove('active');
    };
}

const menuToggle = document.querySelector('#ba');
if (menuToggle && menu && searchfrm) {
    menuToggle.onclick = () => {
        menu.classList.toggle('active');
        searchfrm.classList.remove('active');
    };
}

window.onscroll = () => {
    if (menu) menu.classList.remove('active');
    if (searchfrm) searchfrm.classList.remove('active');
};

// Simple cart
const cartItemsEl = document.querySelector('.cart-items');
const cartTotalEl = document.querySelector('.cart-total');
const checkoutBtn = document.querySelector('.checkout-btn');
const addToCartButtons = document.querySelectorAll('.add-to-cart');
let cart = [];

const formatPrice = (value) => `PHP ${value.toFixed(2)}`;

const renderCart = () => {
    if (!cartItemsEl) return;

    cartItemsEl.innerHTML = '';

    if (!cart.length) {
        cartItemsEl.innerHTML = '<p class="empty-cart">Your cart is empty.</p>';
    } else {
        cart.forEach((item) => {
            const row = document.createElement('div');
            row.className = 'cart-item';
            row.innerHTML = `<span>${item.name}</span><span>${formatPrice(item.price)}</span>`;
            cartItemsEl.appendChild(row);
        });
    }

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    if (cartTotalEl) cartTotalEl.textContent = formatPrice(total);
    if (checkoutBtn) checkoutBtn.disabled = cart.length === 0;
};

addToCartButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
        const name = btn.dataset.name || 'Item';
        const price = parseFloat(btn.dataset.price || '0');
        cart.push({ name, price });
        renderCart();
        const cartSection = document.getElementById('cart');
        if (cartSection) cartSection.scrollIntoView({ behavior: 'smooth' });
    });
});

if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
        if (!cart.length) return;
        const total = cart.reduce((sum, item) => sum + item.price, 0);
        alert(`Checking out ${cart.length} item(s) totaling ${formatPrice(total)}.`);
        cart = [];
        renderCart();
    });
}

renderCart();
