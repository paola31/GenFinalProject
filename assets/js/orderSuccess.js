document.addEventListener('componentsLoaded', function () {
    const productsInCart = JSON.parse(localStorage.getItem('productsInCart')) || [];

    const summaryList = document.getElementById('order-summary');
    const totalElement = document.getElementById('order-total');
    let subtotal = 0;

    if (productsInCart.length > 0) {
        productsInCart.forEach(product => {
            summaryList.innerHTML += `
                <li class="list-group-item d-flex align-items-center">
                    <img src="${product.img}" alt="${product.name}" class="img-thumbnail me-3" style="width: 60px; height: 60px;">
                    <div class="flex-grow-1">
                        <h5 class="mb-1">${product.name}</h5>
                        <small>Quantity: ${product.qty}</small>
                    </div>
                </li>`;
            subtotal += product.price * product.qty;
        });

        totalElement.innerHTML = `$${(subtotal * 1.11).toLocaleString(undefined, {maximumFractionDigits: 2, minimumFractionDigits: 2})}`;
    } else {
        summaryList.innerHTML = `<li class="list-group-item text-center">No products found in your order.</li>`;
        totalElement.innerHTML = "$0.00";
    }

    // Limpiar carrito después de mostrar orden
    localStorage.removeItem('productsInCart');

    // Animación fade-in con Bootstrap (opcional pero recomendado)
    document.querySelector('.card').classList.add('fade-in');
});

// Animación Fade-in CSS (agregar a tu CSS global)
const style = document.createElement('style');
style.innerHTML = `
    .fade-in {
        opacity: 0;
        animation: fadeIn ease-in 1.2s forwards;
    }

    @keyframes fadeIn {
        0% {opacity:0;}
        100% {opacity:1;}
    }
`;
document.head.appendChild(style);
