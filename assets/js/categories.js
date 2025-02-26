/*document.addEventListener('componentsLoaded', function() {
    console.log('Components Loaded received in categories');
    fetch('assets/js/data/categories.json')
        .then(response => response.text())
        .then(text => renderCategories(JSON.parse(text)))
        .catch(error => console.error('Error cargando el archivo JSON:', error));
});*/

function setupResponsiveCategories(data) {
    renderCategories(data);

    window.addEventListener('resize', function() {
        renderCategories(data);
    });
}

document.addEventListener('componentsLoaded', function() {
    fetch('http://localhost:8080/api/v1/categories') // Llamada al backend
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener categorías desde el backend');
            }
            return response.json();
        })
        .then(data => {
            localStorage.setItem("categories", JSON.stringify(data));
            setupResponsiveCategories(data);
            document.dispatchEvent(new Event("categoriesPersisted"));
        })
        .catch(error => console.error('Error al cargar las categorías:', error));
});

function getItemsPerSlide() {
    const width = window.innerWidth;

    if (width < 768) { // Pantallas pequeñas (móviles y tablets pequeñas)
        return 3;
    } else { // Pantallas más grandes (desktop, tabletas grandes, etc.)
        return 5;
    }
}

function renderCategories(data) {
    console.log("Rendering categories");
    let categoriesContainer = document.getElementById("categories");
    if(categoriesContainer  != null){
        let categoriesHtml = '';
        let itemsPerSlide = getItemsPerSlide(); //  Cantidad de tarjetas por slide calculado segun tamaño de pantalla
        let totalSlides = Math.ceil(data.length / itemsPerSlide);

        for (let i = 0; i < totalSlides; i++) {
            let activeClass = i === 0 ? 'active' : '';
            categoriesHtml += `<div class="carousel-item ${activeClass}">`;
            categoriesHtml += `<div class="d-flex justify-content-center">`;

            for (let j = 0; j < itemsPerSlide; j++) {
                let index = i * itemsPerSlide + j;
                if (index >= data.length) break;

                categoriesHtml += `
                <div id="cat${data[index].id_categories}" class="card makeup-card-minimal me-3" onclick="navigate('${data[index].name}')">
                    <div class="card-img-top card-image" id="img-${data[index].id_categories}">
                        <img class="product-image" src="${data[index].imageCover}">
                    </div>
                    <div class="card-body card-content pt-1 pb-0">
                        <h4 class="fs-5 fw-bold category-title">${data[index].name}</h4>
                        <p class=" about__content--title--np--secundary">${data[index].description}</p>
                    </div>
                </div>
            `;
            }

            categoriesHtml += `</div></div>`; // Cierra el carousel-item y el contenedor interno
        }

        categoriesContainer.innerHTML = categoriesHtml;

        // Agregar estilos hover dinámicos
        for (let i = 0; i < data.length; i++) {
            let cardImage = document.getElementById("img-" + data[i].id_categories);
            let hoverClass = "hover-bg-" + data[i].id_categories;

            let style = document.createElement("style");
            style.innerHTML = `
            .makeup-card-minimal:hover .${hoverClass} {
                background-image: url('${data[i].imageHover}');
                background-size: cover;
                background-position: center;
            }
        `;
            document.head.appendChild(style);

            cardImage.classList.add(hoverClass);
        }
    }
}

function navigate(category) {
    if (category) {
        window.location.href = 'products.html?category=' + encodeURIComponent(category);
    }
}
