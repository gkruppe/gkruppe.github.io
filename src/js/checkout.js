// LÓGICA DEL CHECKOUT
// Gestiona la visualización y edición del carrito en la página de pago.

document.addEventListener('DOMContentLoaded', () => {
    renderCheckout();
});

// Leemos el carrito de la memoria
let cart = JSON.parse(localStorage.getItem('pecato_cart')) || [];

// Función principal de renderizado
function renderCheckout() {
    const itemsContainer = document.getElementById('checkout-items');
    const subtotalEl = document.getElementById('checkout-subtotal');
    const totalEl = document.getElementById('checkout-total');

    if (!itemsContainer) return;

    itemsContainer.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        itemsContainer.innerHTML = '<p style="padding:20px; text-align:center; color: white;">YOUR CART IS EMPTY</p>';
        if (subtotalEl) subtotalEl.textContent = "€0.00";
        if (totalEl) totalEl.textContent = "€0.00";
    } else {
        // Generamos el HTML con la NUEVA ESTÉTICA (igual que el carrito)
        cart.forEach((item, index) => {
            const quantity = item.quantity || 1;
            const price = parseFloat(item.price);
            const itemTotal = price * quantity;
            total += itemTotal;

            // FIX DE RUTA DE IMAGEN (igual que antes)
            let imagePath = item.image;
            if (imagePath.startsWith('../')) {
                imagePath = imagePath.substring(3);
            }

            // Usamos estilos en línea para replicar exactamente el diseño del cart overlay
            const html = `
                <div class="summary-item" style="display: flex; justify-content: space-between; width: 100%; margin-bottom: 25px; border-bottom: 1px solid rgba(255,255,255,0.3); padding-bottom: 20px; color: white;">
                    <div style="display: flex; gap: 20px;">
                        <!-- IMAGEN GRANDE -->
                        <img src="${imagePath}" alt="${item.name}" style="width: 100px; height: 135px; object-fit: cover; border: 1px solid white; flex-shrink: 0; background-color: #333;" onerror="this.src='https://placehold.co/100x135/333/fff?text=IMG'">
                        
                        <div style="text-align: left; display: flex; flex-direction: column; justify-content: space-between;">
                            <div>
                                <!-- TÍTULO GRANDE -->
                                <div style="font-family: 'Impact', sans-serif; font-size: 1.5rem; text-transform: uppercase; line-height: 1; margin-bottom: 5px;">${item.name}</div>
                                <div style="font-size: 1rem; color: #ccc;">SIZE: ${item.selectedSize}</div>
                            </div>
                            
                            <!-- CONTROLES DE CANTIDAD -->
                            <div style="display: flex; align-items: center; gap: 10px; margin-top: 10px;">
                                <button onclick="updateCheckoutQuantity(${index}, -1)" style="background: transparent; border: 1px solid white; color: white; width: 30px; height: 30px; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 1.2rem;">-</button>
                                <span style="font-family: 'Impact', sans-serif; font-size: 1.2rem;">${quantity}</span>
                                <button onclick="updateCheckoutQuantity(${index}, 1)" style="background: white; border: 1px solid white; color: black; width: 30px; height: 30px; cursor: pointer; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 1.2rem;">+</button>
                            </div>
                        </div>
                    </div>
                    
                    <div style="display: flex; flex-direction: column; justify-content: space-between; align-items: flex-end;">
                        <div style="font-weight: bold; font-size: 1.3rem;">€${itemTotal.toFixed(2)}</div>
                        <!-- BOTÓN REMOVE ESTILIZADO -->
                        <button onclick="removeCheckoutItem(${index})" style="background: transparent; border: 1px solid white; color: white; font-size: 0.8rem; cursor: pointer; padding: 6px 10px; text-transform: uppercase; letter-spacing: 1px; transition: all 0.2s;" onmouseover="this.style.background='white'; this.style.color='black'" onmouseout="this.style.background='transparent'; this.style.color='white'">
                            REMOVE
                        </button>
                    </div>
                </div>
            `;
            itemsContainer.innerHTML += html;
        });

        // Actualizar Totales
        if (subtotalEl) subtotalEl.textContent = `€${total.toFixed(2)}`;
        if (totalEl) totalEl.textContent = `€${total.toFixed(2)}`;
    }
}

// --- FUNCIONES GLOBALES PARA INTERACTUAR ---

// Actualizar Cantidad
window.updateCheckoutQuantity = function (index, change) {
    if (cart[index]) {
        cart[index].quantity = (cart[index].quantity || 1) + change;

        // Si baja de 1, preguntar o eliminar
        if (cart[index].quantity < 1) {
            removeCheckoutItem(index);
        } else {
            saveAndRender();
        }
    }
};

// Eliminar Item
window.removeCheckoutItem = function (index) {
    cart.splice(index, 1);
    saveAndRender();
};

// Guardar en LocalStorage y repintar
function saveAndRender() {
    localStorage.setItem('pecato_cart', JSON.stringify(cart));
    renderCheckout();
}