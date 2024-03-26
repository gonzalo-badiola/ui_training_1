const productList = document.getElementById("product-list");
const cartButton = document.getElementById("cart-button");
const cart = document.getElementById("cart");

// Obtener el carrito del localStorage al cargar la página
let cartItems = JSON.parse(localStorage.getItem("cartItems"));

// Datos de ejemplo de productos
let productsPromise = fetch('https://fakestoreapi.com/products')
  .then(response => response.json());

// Mostrar productos en la página
async function displayProducts() {
  try {
    const products = await productsPromise;
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
  } catch (error) {
    console.error('Error al mostrar productos:', error);
  }
}

// Agregar producto al carrito
async function addToCart(productId) {
  try {
    const products = await productsPromise;
    const product = products.find((p) => p.id === productId);
    if (product) {
      cartItems.push(product); // Agregar el producto al array del carrito
      localStorage.setItem("cartItems", JSON.stringify(cartItems)); // Guardar el carrito en localStorage
      renderCart(); // Renderizar el carrito actualizado
    }
  } catch (error) {
    console.error('Error al agregar producto al carrito:', error);
  }
}

// Renderizar el carrito
function renderCart() {
  cart.innerHTML = ""; // Limpiar el contenido del carrito antes de renderizar de nuevo
  cartItems.forEach((product) => {
    const cartItem = document.createElement("div");
    cartItem.setAttribute("id", product.id);
    cartItem.innerHTML = `<button class="delete-product" onclick="deleteProduct(${product.id})">X</button> <img src="${product.image}" width=100> <br>
       ${product.title} <br> Precio: $${product.price} <hr>`;
    cart.appendChild(cartItem);
  });
}

// Mostrar o ocultar el carrito
cartButton.addEventListener("click", () => {
  cart.classList.toggle("hidden");
});

function deleteProduct(id) {
  cartItems = cartItems.filter((item) => item.id !== id); // Eliminar el producto del array del carrito
  localStorage.setItem("cartItems", JSON.stringify(cartItems)); // Actualizar el carrito en localStorage
  renderCart(); // Renderizar el carrito actualizado
}

function vaciarCarrito() {
  cartItems = []; // Vaciar el array del carrito
  localStorage.removeItem("cartItems"); // Eliminar el carrito del localStorage
  cart.innerHTML = ""; // Limpiar el contenido del carrito en la página
}

// Mostrar productos al cargar la página
window.onload = () => {
  displayProducts();
  renderCart(); // Renderizar el carrito guardado en localStorage
};