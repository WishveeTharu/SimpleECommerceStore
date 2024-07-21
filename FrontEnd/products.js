/*
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
                    <h3>${product.name}</h3>
                    <p>Rs.${product.price}</p>
                    <button onclick="addToCart('${product.id}')">Add to Cart</button>
                `;
                productList.appendChild(productElement);
            });
        });
});

function addToCart(productId) {
    fetch('/cart', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ productId, quantity: 1 })
    })
    .then(response => response.json())
    .then(data => {
        alert('Product added to cart');
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
*/

document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:3000/BackEnd/api/products")
    .then((response) => response.json())
    .then((products) => {
      const productList = document.getElementById("product-list");
      products.forEach((product) => {
        const productElement = document.createElement("div");
        productElement.classList.add("product");
        productElement.innerHTML = `
                    <img src="${product.image}" alt="${product.name}" onclick="navigateToLogin()">
                    <h3>${product.name}</h3>
                    <p>Rs.${product.price}</p>
                    <button onclick="addToCart('${product.id}')">Add to Cart</button>
                `;
        productList.appendChild(productElement);
      });
    });
});

function navigateToLogin() {
  window.location.href = "login.html";
}

function addToCart(productId) {
  fetch(`http://localhost:3000/BackEnd/api/products/${productId}`)
    .then((response) => response.json())
    .then((product) => {
      fetch("/BackEnd/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          alert("Product added to cart");
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    });
}
