document.addEventListener("DOMContentLoaded", () => {
    fetch("/api/products")
        .then(response => response.json())
        .then(products => {
            const productList = document.getElementById("product-list");
            products.forEach(product => {
                const productElement = document.createElement("div");
                productElement.classList.add("product");
                productElement.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>$${product.price}</p>
                    <button onclick="addToCart('${product.id}')">Add to Cart</button>
                `;
                productList.appendChild(productElement);
            });
        });
});

function addToCart(productId) {
    console.log(`Product ${productId} added to cart`);
    // Implement add to cart functionality here
}
