// ESTADO DEL CARRITO
// Intentamos cargar lo que haya en memoria, si no, empezamos vacío.
let cart = JSON.parse(localStorage.getItem('pecato_cart')) || [];

// --- FUNCIONES DEL CARRITO ---

// A. Guardar y Actualizar UI
function updateCartUI() {
    // 1. Calcular total de items (sumando cantidades)
    const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

    // Actualizar botones
    const cartBtns = document.querySelectorAll('.cart-btn');
    cartBtns.forEach(btn => {
        btn.textContent = `CART (${totalItems})`;
    });

    // 2. Rellenar el Overlay del Carrito
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartTotalElement = document.querySelector('.cart-total span:last-child');

    if (cartItemsContainer) {
        cartItemsContainer.innerHTML = '';
        let total = 0;

        if (cart.length === 0) {
            cartItemsContainer.style.flexDirection = 'row';
            cartItemsContainer.style.justifyContent = 'center';
            cartItemsContainer.style.alignItems = 'center';
            cartItemsContainer.innerHTML = '<p style="width:100%; text-align:center;">YOUR CART IS EMPTY</p>';
        } else {
            cartItemsContainer.style.flexDirection = 'column';
            cartItemsContainer.style.justifyContent = 'flex-start';
            cartItemsContainer.style.overflowY = 'auto';

            cart.forEach((item, index) => {
                const quantity = item.quantity || 1;
                const price = parseFloat(item.price);
                const itemTotal = price * quantity;

                total += itemTotal;

                const itemHTML = `
                    <div class="cart-item" style="display: flex; justify-content: space-between; width: 100%; margin-bottom: 25px; border-bottom: 1px solid rgba(255,255,255,0.3); padding-bottom: 20px; flex-shrink: 0;">
                        <div style="display: flex; gap: 20px;">
                            <!-- IMAGEN AUMENTADA (100px x 135px) -->
                            <img src="${item.image}" style="width: 100px; height: 135px; object-fit: cover; border: 1px solid white;">
                            
                            <div style="text-align: left; display: flex; flex-direction: column; justify-content: space-between;">
                                <div>
                                    <!-- NOMBRE AUMENTADO (1.8rem) -->
                                    <div style="font-family: var(--font-heading); font-size: 1.8rem; text-transform: uppercase; line-height: 1;">${item.name}</div>
                                    <!-- TALLA AUMENTADA (1.1rem) -->
                                    <div style="font-size: 1.1rem; color: #ccc; margin-top: 5px;">SIZE: ${item.selectedSize}</div>
                                </div>
                                <!-- CONTROLES DE CANTIDAD (Ajustados al nuevo tamaño) -->
                                <div style="display: flex; align-items: center; gap: 10px; margin-top: 10px;">
                                    <button onclick="updateQuantity(${index}, -1)" style="background: transparent; border: 1px solid white; color: white; width: 30px; height: 30px; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 1.2rem;">-</button>
                                    <span style="font-family: var(--font-heading); font-size: 1.2rem;">${quantity}</span>
                                    <button onclick="updateQuantity(${index}, 1)" style="background: white; border: 1px solid white; color: black; width: 30px; height: 30px; cursor: pointer; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 1.2rem;">+</button>
                                </div>
                            </div>
                        </div>
                        <div style="display: flex; flex-direction: column; justify-content: space-between; align-items: flex-end;">
                            <div style="font-weight: bold; font-size: 1.3rem;">€${itemTotal.toFixed(2)}</div>
                            <button onclick="removeItem(${index})" style="background: transparent; border: 1px solid white; color: white; font-size: 0.8rem; cursor: pointer; padding: 6px 10px; text-transform: uppercase; letter-spacing: 1px; transition: all 0.2s;" onmouseover="this.style.background='white'; this.style.color='black'" onmouseout="this.style.background='transparent'; this.style.color='white'">
                                REMOVE
                            </button>
                        </div>
                    </div>
                `;
                cartItemsContainer.innerHTML += itemHTML;
            });
        }

        if (cartTotalElement) {
            cartTotalElement.textContent = `€${total.toFixed(2)}`;
        }
    }

    localStorage.setItem('pecato_cart', JSON.stringify(cart));
}

// B. Añadir al Carrito (Global para ser llamada desde HTML o store.js)
window.addToCart = function (productId, size = 'M') {
    // Nota: 'products' debe estar definido en store.js y cargado antes
    if (typeof products === 'undefined') {
        console.error("Error: products database not loaded.");
        return;
    }

    const product = products.find(p => p.id === productId);

    if (product) {
        const existingItemIndex = cart.findIndex(item => item.id === productId && item.selectedSize === size);

        if (existingItemIndex > -1) {
            cart[existingItemIndex].quantity = (cart[existingItemIndex].quantity || 1) + 1;
        } else {
            cart.push({
                ...product,
                selectedSize: size,
                quantity: 1
            });
        }

        updateCartUI();
    }
};

// C. Actualizar Cantidad
window.updateQuantity = function (index, change) {
    if (cart[index]) {
        cart[index].quantity = (cart[index].quantity || 1) + change;

        if (cart[index].quantity < 1) {
            removeItem(index);
        } else {
            updateCartUI();
        }
    }
};

// D. Eliminar del Carrito
window.removeItem = function (index) {
    cart.splice(index, 1);
    updateCartUI();
};

// Inicializar al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    updateCartUI();
});