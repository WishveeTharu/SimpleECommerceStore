document.addEventListener("DOMContentLoaded", () => {
    const orderItemsContainer = document.getElementById("order-items");
    const orderTotalElement = document.getElementById("order-total");
    const shippingForm = document.getElementById("shipping-form");

    async function fetchCartItems() {
        try {
            const response = await fetch(`http://localhost:3000/BackEnd/api/cart`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const cartItems = await response.json();
            localStorage.setItem("cart", JSON.stringify(cartItems)); // Save the cart items to localStorage
            renderOrderItems(cartItems);
        } catch (error) {
            console.error("Error fetching cart items:", error);
        }
    }

    function renderOrderItems(cartItems) {
        if (orderItemsContainer) {
            orderItemsContainer.innerHTML = "";
            let total = 0;

            cartItems.forEach(item => {
                const orderItemElement = document.createElement("div");
                orderItemElement.classList.add("order-item");
                orderItemElement.innerHTML = `
                    <h3>${item.name}</h3>
                    <div id="product-image">
                        <img src="${item.image}" alt="${item.name}" onerror="this.src='path/to/default/image.png';"> <!-- Add a fallback image path -->
                    </div>
                    <p>Price: Rs.${item.price}</p>
                    <p>Quantity: ${item.quantity}</p>
                    <p>Total: Rs.${(item.price * item.quantity).toFixed(2)}</p>
                `;
                orderItemsContainer.appendChild(orderItemElement);
                total += item.price * item.quantity;
            });

            if (orderTotalElement) {
                orderTotalElement.textContent = `Total: Rs.${total.toFixed(2)}`;
            }
        }
    }

    async function clearCart() {
        try {
            const response = await fetch('http://localhost:3000/BackEnd/api/cart', {
                method: 'DELETE'
            });
            const data = await response.json();
            if (data.success) {
                localStorage.removeItem('cart');
            } else {
                console.error('Error clearing the cart:', data.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    if (shippingForm) {
        shippingForm.addEventListener("submit", async (event) => {
            event.preventDefault();

            // Additional validation if needed
            const zip = document.getElementById("zip").value;
            const cardNumber = document.getElementById("card-number").value;
            const cvv = document.getElementById("cvv").value;

            if (!/^\d{5}$/.test(zip)) {
                alert("Please enter a valid 5-digit Zip Code.");
                return;
            }

            if (!/^\d+$/.test(cardNumber)) {
                alert("Please enter a valid Card Number.");
                return;
            }

            if (!/^\d{3}$/.test(cvv)) {
                alert("Please enter a valid 3-digit CVV.");
                return;
            }

            const shippingInfo = {
                name: document.getElementById("name").value,
                address: document.getElementById("address").value,
                city: document.getElementById("city").value,
                state: document.getElementById("state").value,
                zip: zip
            };

            const paymentInfo = {
                cardNumber: cardNumber,
                expiryDate: document.getElementById("expiry-date").value,
                cvv: cvv
            };

            const cart = JSON.parse(localStorage.getItem("cart")) || [];

            const orderData = {
                cart: cart,
                shippingInfo: shippingInfo,
                paymentInfo: paymentInfo
            };

            try {
                const response = await fetch(`http://localhost:3000/BackEnd/api/checkout`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(orderData)
                });

                const data = await response.json();

                if (data.success) {
                    alert(data.message);
                    await clearCart();
                    window.location.href = "products.html";
                } else {
                    alert(data.message);
                }
            } catch (error) {
                console.error("Error:", error);
            }
        });
    } else {
        console.warn('Shipping form not found in the DOM');
    }

    fetchCartItems(); // Fetch and display cart items when the page loads
});