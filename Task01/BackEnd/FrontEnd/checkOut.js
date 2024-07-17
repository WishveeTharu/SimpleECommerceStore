document.addEventListener("DOMContentLoaded", () => {
    // Sample data for order items
    const orderItems = [
        { id: 1, name: "Black Dress", price: 100, quantity: 1 },
        { id: 2, name: "Short Dress", price: 80, quantity: 1 },
        // Add more items as needed
    ];

    const orderItemsContainer = document.getElementById("order-items");
    const orderTotalElement = document.getElementById("order-total");

    function renderOrderItems() {
        orderItemsContainer.innerHTML = "";
        let total = 0;
        orderItems.forEach(item => {
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
