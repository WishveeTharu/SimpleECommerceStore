document.addEventListener("DOMContentLoaded", () => {
    // Sample data for cart items
    const cartItems = [
        { id: 1, name: "Black Dress", price: 100, image: "Images/blackDress.jpeg", quantity: 1 },
        { id: 2, name: "Short Dress", price: 80, image: "Images/shortDress.jpeg", quantity: 1 },
        // Add more items as needed
    ];

    const cartItemsContainer = document.getElementById("cart-items");
    const totalAmountElement = document.getElementById("total-amount");

    function renderCartItems() {
        cartItemsContainer.innerHTML = "";
        cartItems.forEach(item => {
            const cartItemElement = document.createElement("div");
            cartItemElement.classList.add("cart-item");
            cartItemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <h3>${item.name}</h3>
                <p>Price: Rs.${item.price}</p>
                <div class="quantity-control">
                    <button onclick="decreaseQuantity(${item.id})">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="increaseQuantity(${item.id})">+</button>
                </div>
                <p>Total: Rs.${(item.price * item.quantity).toFixed(2)}</p>
                <button onclick="removeFromCart(${item.id})">Remove</button>
            `;
            cartItemsContainer.appendChild(cartItemElement);
        });
    }

    window.increaseQuantity = function(id) {
        const item = cartItems.find(item => item.id === id);
        if (item) {
            item.quantity++;
            renderCartItems();
        }
    };

    window.decreaseQuantity = function(id) {
        const item = cartItems.find(item => item.id === id);
        if (item && item.quantity > 1) {
            item.quantity--;
            renderCartItems();
        }
    };

    window.removeFromCart = function(id) {
        const itemIndex = cartItems.findIndex(item => item.id === id);
        if (itemIndex !== -1) {
            cartItems.splice(itemIndex, 1);
            renderCartItems();
        }
    };

    document.getElementById("calculate-total").addEventListener("click", () => {
        const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
        totalAmountElement.textContent = `Total: $${total.toFixed(2)}`;
    });

    renderCartItems();
});
