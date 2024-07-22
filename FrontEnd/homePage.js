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
            `;
  
            productList.appendChild(productElement);
          });
        });
    });
});
  
function navigateToLogin() {
  window.location.href = "login.html";
}