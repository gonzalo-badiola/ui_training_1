const productList = document.getElementById("product-list");
const cartButton = document.getElementById("cart-button");
const cart = document.getElementById("cart");


// Datos de ejemplo de productos
let productsPromise = fetch('https://fakestoreapi.com/products')
  .then(response => response.json())
  .catch(error => {
    console.error('Error:', error);
    return []; // En caso de error, devolver un array vacío
  });

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
    
    const products = await productsPromise; // Esperar a que se resuelva la promesa de los productos
    const product = products.find((p) => p.id === productId);
    if (product) {
      const cartItem = document.createElement("div");
      cartItem.setAttribute("id", product.id);
      cartItem.innerHTML = `<button class="borrar-curso" onclick="deleteProduct(${product.id})">X</button> <img src="${product.image}" width=100> <br>
       ${product.title} <br> Precio: $${product.price} <hr>`;
      cart.appendChild(cartItem);
    }
  } catch (error) {
    console.error('Error al agregar producto al carrito:', error);
  }
}

// Mostrar o ocultar el carrito
cartButton.addEventListener("click", () => {
  cart.classList.toggle("hidden");
});

function deleteProduct(id) {
  const productToRemove = document.getElementById(`${id}`);
  if (productToRemove) {
    productToRemove.remove();
  }
}

function vaciarCarrito() {
  cart.innerHTML = "";
}
// Mostrar productos al cargar la página
window.onload = displayProducts;
