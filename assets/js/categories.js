document.addEventListener('componentsLoaded', function() {
    fetch('assets/js/data/categories.json')
        .then(response => response.text())
        .then(text => renderCategories(JSON.parse(text)))
        .catch(error => console.error('Error cargando el archivo JSON:', error));
});

function renderCategories(data) {
    let categoriesContainer = document.getElementById("categories");
    let categoriesHtml = '';
    let itemsPerSlide = 5; // Cantidad de tarjetas por slide
    let totalSlides = Math.ceil(data.length / itemsPerSlide);

    for (let i = 0; i < totalSlides; i++) {
        let activeClass = i === 0 ? 'active' : '';
        categoriesHtml += `<div class="carousel-item ${activeClass}">`;
        categoriesHtml += `<div class="d-flex justify-content-center">`;

        for (let j = 0; j < itemsPerSlide; j++) {
            let index = i * itemsPerSlide + j;
            if (index >= data.length) break;

            categoriesHtml += `
                <div id="cat${data[index].id}" class="card makeup-card-minimal me-3" onclick="navigate('${data[index].name}')">
                    <div class="card-img-top card-image" id="img-${data[index].id}">
                        <img class="product-image" src="${data[index].imgCover}">
                    </div>
                    <div class="card-body card-content pt-1 pb-0">
                        <h4 class="fs-5 fw-bold category-title">${data[index].name}</h4>
                        <p class="about__content--title--np--secundary">${data[index].description}</p>
                    </div>
                </div>
            `;
        }

        categoriesHtml += `</div></div>`; // Cierra el carousel-item y el contenedor interno
    }

    categoriesContainer.innerHTML = categoriesHtml;

    // Agregar estilos hover dinámicos
    for (let i = 0; i < data.length; i++) {
        let cardImage = document.getElementById("img-" + data[i].id);
        let hoverClass = "hover-bg-" + data[i].id;

        let style = document.createElement("style");
        style.innerHTML = `
            .makeup-card-minimal:hover .${hoverClass} {
                background-image: url('${data[i].imgHover}');
                background-size: cover;
                background-position: center;
            }
        `;
        document.head.appendChild(style);

        cardImage.classList.add(hoverClass);
    }
}

function navigate(category) {
    if (category) {
        window.location.href = 'products.html?category=' + encodeURIComponent(category);
    }
}
