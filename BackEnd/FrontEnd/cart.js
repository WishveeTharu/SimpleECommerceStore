document.addEventListener("DOMContentLoaded", () => {
    const cartItemsContainer = document.getElementById("cart-items");
    const totalAmountElement = document.getElementById("total-amount");

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

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
                    <button class="minus" data-index="${index}">-</button>
                    <span>${item.quantity}</span>
                    <button class="plus" data-index="${index}">+</button>
                </div>
                <p>Total: Rs.${(item.price * item.quantity).toFixed(2)}</p>
                <button class="remove" data-index="${index}">Remove</button>
            `;
            cartItemsContainer.appendChild(cartItemElement);
            total += item.price * item.quantity;
        });

        totalAmountElement.textContent = `Total: Rs.${total.toFixed(2)}`;
    }

    cartItemsContainer.addEventListener("click", event => {
        const index = event.target.dataset.index;

        if (event.target.classList.contains("plus")) {
            cart[index].quantity++;
        } else if (event.target.classList.contains("minus")) {
            if (cart[index].quantity > 1) {
                cart[index].quantity--;
            }
        } else if (event.target.classList.contains("remove")) {
            cart.splice(index, 1);
        }

        updateCart();
        renderCartItems();
    });

    function updateCart() {
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    document.getElementById("calculate-total").addEventListener("click", () => {
        renderCartItems();
    });

    renderCartItems();
});
