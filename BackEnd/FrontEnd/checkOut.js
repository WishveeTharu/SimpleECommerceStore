/*
document.addEventListener("DOMContentLoaded", () => {
    const orderItemsContainer = document.getElementById("order-items");
    const orderTotalElement = document.getElementById("order-total");

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    function renderOrderItems() {
        orderItemsContainer.innerHTML = "";
        let total = 0;
        cart.forEach(item => {
            const orderItemElement = document.createElement("div");
            orderItemElement.classList.add("order-item");
            orderItemElement.innerHTML = `
                <h3>${item.name}</h3>
                <p>Price: Rs.${item.price}</p>
                <p>Quantity: ${item.quantity}</p>
                <p>Total: Rs.${(item.price * item.quantity).toFixed(2)}</p>
            `;
            orderItemsContainer.appendChild(orderItemElement);
            total += item.price * item.quantity;
        });
        orderTotalElement.textContent = `Total: Rs.${total.toFixed(2)}`;
    }

    document.getElementById("shipping-form").addEventListener("submit", (event) => {
        event.preventDefault();
        alert("Order submitted successfully!");
        // Here you can add further processing like sending the data to the server
    });

    renderOrderItems();
});
*/


document.addEventListener("DOMContentLoaded", () => {
    const orderItemsContainer = document.getElementById("order-items");
    const orderTotalElement = document.getElementById("order-total");

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    function renderOrderItems() {
        orderItemsContainer.innerHTML = "";
        let total = 0;
        cart.forEach(item => {
            const orderItemElement = document.createElement("div");
            orderItemElement.classList.add("order-item");
            orderItemElement.innerHTML = `
                <h3>${item.name}</h3>
                <p>Price: Rs.${item.price}</p>
                <p>Quantity: ${item.quantity}</p>
                <p>Total: Rs.${(item.price * item.quantity).toFixed(2)}</p>
            `;
            orderItemsContainer.appendChild(orderItemElement);
            total += item.price * item.quantity;
        });
        orderTotalElement.textContent = `Total: Rs.${total.toFixed(2)}`;
    }

    document.getElementById("shipping-form").addEventListener("submit", (event) => {
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

        alert("Order submitted successfully!");
        // Here you can add further processing like sending the data to the server
    });

    renderOrderItems();
});

