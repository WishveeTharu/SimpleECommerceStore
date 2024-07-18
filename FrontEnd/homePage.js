document.addEventListener("DOMContentLoaded", () => {
    fetch("/BackEnd/api/productImages")
        .then(response => response.json())
        .then(products => {
            const productList = document.getElementById("product-list");
            products.forEach(product => {
                const productElement = document.createElement("div");
                productElement.classList.add("product");
                productElement.innerHTML = `
                    <img src="${product.image}" alt="${product.name}" onclick="navigateToLogin()">
					<!--
                    <h3>${product.name}</h3>
                    <p>Rs.${product.price}</p>
                    <button onclick="addToCart('${product.id}')">Add to Cart</button>
					-->
                `;
                productList.appendChild(productElement);
            });
        });
});

function navigateToLogin() {
    window.location.href = "login.html";
}