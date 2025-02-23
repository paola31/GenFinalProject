document.addEventListener('categoriesPersisted', function () {
    console.log('categories persisted received in navbar');

    let categories = localStorage.getItem("categories");

    if (categories) {
        console.log("Usando categorías desde localStorage");
        renderNavbarCategories(JSON.parse(categories));
    } else {
        console.log("No hay datos en localStorage, consultando backend...");
        fetch('http://localhost:8080/api/v1/categories')
            .then(response => response.json())
            .then(data => {
                localStorage.setItem("categories", JSON.stringify(data)); // Guardar en localStorage
                renderNavbarCategories(data);
            })
            .catch(error => console.error('Error al cargar las categorías en el navbar:', error));
    }
});

function renderNavbarCategories(data) {
    let navbarCategories = document.querySelector(".header__sub--menu");
    if (!navbarCategories) return;

    let categoriesHtml = "";
    data.forEach(category => {
        categoriesHtml += `
            <li class="header__sub--menu__items">
                <a href="products.html?category=${encodeURIComponent(category.name)}" class="header__sub--menu__link">
                    ${category.name}
                </a>
            </li>
        `;
    });

    navbarCategories.innerHTML = categoriesHtml;
}

function goHome()
{
    window.location.href = window.location.origin + '/' + window.location.pathname.split('/')[1] + '/';
}
