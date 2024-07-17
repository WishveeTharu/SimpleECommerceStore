/*
document.addEventListener("DOMContentLoaded", () => {
    // Fetch product details from API or database
    fetch("/api/product/1") // Example endpoint
        .then(response => response.json())
        .then(product => {
            document.getElementById("product-image").querySelector("img").src = product.image;
            document.getElementById("product-name").textContent = product.name;
            document.getElementById("product-description").textContent = product.description;
            document.getElementById("product-price").textContent = `$${product.price}`;
            document.getElementById("product-availability").textContent = product.availability ? "In Stock" : "Out of Stock";
        });

    document.getElementById("add-to-cart").addEventListener("click", () => {
        // Implement add to cart functionality here
        console.log("Product added to cart");
    });
});
*/



document.addEventListener("DOMContentLoaded", () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    document.querySelectorAll("#add-to-cart").forEach(button => {
        button.addEventListener("click", event => {
            const productInfo = event.target.closest("#product-info");
            const product = {
                name: productInfo.querySelector("#product-name").textContent,
                price: parseFloat(productInfo.querySelector("#product-price").textContent.replace('Rs.', '')),
                image: productInfo.querySelector("#product-image img").src,
                quantity: 1
            };
            cart.push(product);
            alert("Item is added to the cart");
            updateCart();
        });
    });

    function updateCart() {
        localStorage.setItem("cart", JSON.stringify(cart));
    }
});


