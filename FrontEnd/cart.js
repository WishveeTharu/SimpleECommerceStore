document.addEventListener("DOMContentLoaded", () => {
    const cartItemsContainer = document.getElementById("cart-items");
    const totalAmountElement = document.getElementById("total-amount");

    fetch("http://localhost:3000/BackEnd/api/cart")
        .then(response => response.json())
        .then(cart => {
            function renderCartItems() {
                cartItemsContainer.innerHTML = "";
                let total = 0;

                cart.forEach((item, index) => {
                    const cartItemElement = document.createElement("div");
                    cartItemElement.classList.add("cart-item");
                    cartItemElement.innerHTML = `
                        <img src="${item.image}" alt="${item.name}">
                        <h3>${item.name}</h3>
                        <p>Price: Rs.${item.price}</p>
                        <div class="quantity-control">
                            <button class="minus" data-index="${index}" data-id="${item.id}">-</button>
                            <span>${item.quantity}</span>
                            <button class="plus" data-index="${index}" data-id="${item.id}">+</button>
                        </div>
                        <p>Total: Rs.${(item.price * item.quantity).toFixed(2)}</p>
                        <button class="remove" data-id="${item.id}">Remove</button>
                    `;
                    cartItemsContainer.appendChild(cartItemElement);
                    total += item.price * item.quantity;
                });

                totalAmountElement.textContent = `Total: Rs.${total.toFixed(2)}`;
            }

            cartItemsContainer.addEventListener("click", event => {
                const index = event.target.dataset.index;
                const itemId = event.target.dataset.id;

                if (event.target.classList.contains("plus")) {
                    cart[index].quantity++;
                    updateCartItemQuantity(itemId, cart[index].quantity);
                } else if (event.target.classList.contains("minus")) {
                    if (cart[index].quantity > 1) {
                        cart[index].quantity--;
                        updateCartItemQuantity(itemId, cart[index].quantity);
                    }
                } else if (event.target.classList.contains("remove")) {
                    fetch(`http://localhost:3000/BackEnd/api/cart/${itemId}`, {
                        method: 'DELETE'
                    })
                    .then(response => response.json())
                    .then(data => {
                        cart.splice(index, 1);
                        renderCartItems();
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
                }

                renderCartItems();
            });

            function updateCartItemQuantity(itemId, quantity) {
                fetch(`http://localhost:3000/BackEnd/api/cart/${itemId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ quantity: quantity })
                })
                .then(response => response.json())
                .then(data => {
                    if (!data.success) {
                        console.error('Error:', data.message);
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });
            }

            document.getElementById("total-amount").addEventListener("click", () => {
                renderCartItems();
            });

            renderCartItems();
        });
});
