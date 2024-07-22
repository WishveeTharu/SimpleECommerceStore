document.addEventListener("DOMContentLoaded", () => {
  // Fetch products
  fetch("http://localhost:3000/BackEnd/api/products")
    .then((response) => response.json())
    .then((products) => {
      // Fetch product images
      fetch("http://localhost:3000/BackEnd/api/productImages")
        .then((response) => response.json())
        .then((images) => {
          const productList = document.getElementById("product-detail");
          products.forEach((product) => {
            // Find the image for the current product
            const productImage = images.find((img) => img.productId === product.id);
            const productElement = document.createElement("div");
            productElement.id = "product-info";
            productElement.innerHTML = `
              <div id="product-image">
                <img src="${productImage ? productImage.image : product.image}" alt="${product.Pname}">
              </div>
              <h3>${product.Pname}</h3>
              <p>Rs.${product.price}</p>
              <button id="add-to-cart" onclick="addToCart('${product.id}')">Add to Cart</button>
            `;

            productList.appendChild(productElement);
          });
        });
    });
});

function addToCart(productId) {
  fetch(`http://localhost:3000/BackEnd/api/products/${productId}`)
    .then((response) => response.json())
    .then((product) => {
      fetch("http://localhost:3000/BackEnd/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: product.id,
          name: product.Pname,
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