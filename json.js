const productList = document.getElementById("product-list");
const cartButton = document.getElementById("cart-button");
const cart = document.getElementById("cart");


// Datos de ejemplo de productos
let products;
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    console.log(data); // Output the JSON data to the console
    products = data
    // Use the JSON data as needed
  })
  .catch(error => {
    console.error('Error:', error);
  });
// Mostrar productos en la página
function displayProducts() {
  products.forEach((product) => {
    const productElement = document.createElement("div");
    productElement.classList.add("product");
    productElement.innerHTML = `
            <img src="${product.image}" width=100>
            <h2>${product.title}</h2>
            <p>Precio: $${product.price}</p>
            <button onclick="addToCart(${product.id})">Agregar al carrito</button>
        `;
    productList.appendChild(productElement);
  });
}

// Agregar producto al carrito
function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  if (product) {
    const cartItem = document.createElement("div");
    cartItem.innerHTML = `<img src="${product.image}" width=100> <br> ${product.title} - $${product.price}`;
    cart.appendChild(cartItem);
  }
}

// Mostrar o ocultar el carrito
cartButton.addEventListener("click", () => {
  cart.classList.toggle("hidden");
});

function eliminarItem(id) {
  const itemToRemove = document.querySelector(`.cart-item[data-id="${id}"]`);
  if (itemToRemove) {
      itemToRemove.remove();
  }
}
function vaciarCarrito() {
  cart.innerHTML = "";
}
// Mostrar productos al cargar la página
window.onload = displayProducts;
