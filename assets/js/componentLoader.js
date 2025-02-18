function loadComponent(selector, file) {
    return new Promise((resolve, reject) => {
        fetch(file)
            .then(response => response.text())
            .then(data => {
                let element = document.querySelector(selector);
                if (element) {
                    element.innerHTML = data;
                }
                resolve();
            })
            .catch(error => {
                console.error(`Error al cargar el componente ${file}:`, error);
                reject(error);
            });
    });
}

function loadHead(file) {
    return new Promise((resolve, reject) => {
        fetch(file)
            .then(response => response.text())
            .then(data => {
                document.head.insertAdjacentHTML("beforeend", data);
                resolve();
            })
            .catch(error => reject(error));
    });
}

function loadScript(src)
{
    return new Promise((resolve, reject) =>
    {
        const script = document.createElement("script");
        script.src = src;
        script.onload = resolve;
        script.onerror = () => reject(new Error(`Error al cargar el script ${src}`));
        document.body.appendChild(script);
    });
}


document.addEventListener("DOMContentLoaded", () => {
    Promise.all([
        loadHead("components/head.html"),
        loadComponent("#offerBar", "components/offerBar.html"),
        loadComponent("#navbar", "components/navbar.html"),
        loadComponent("#mobileNavbar", "components/mobileNavbar.html"),
        loadComponent("#breadCrumb", "components/breadcrumb.html"),
        loadComponent("#banner", "components/banner.html"),
        loadComponent("#engagement", "components/engagement.html"),
        loadComponent("#categoriesContainer", "components/categories.html"),
        loadComponent("#sustainable", "components/sustainable.html"),
        loadComponent("#footer", "components/footer.html"),
        loadComponent("#notifier", "components/notifier.html"),
    ]).then(() => {
        console.log("Todos los componentes han sido cargados.");

        // Primero cargamos los scripts antes de emitir el evento
        return Promise.all([
            loadScript("https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js"),
            loadScript("https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"),
            loadScript("assets/js/plugins/glightbox.min.js"),
            loadScript("/assets/js/script.js"),
            loadScript("/assets/js/cart.js"),
            loadScript("/assets/js/modal-influencers.js"),
            loadScript("/assets/js/offerBar.js"),
        ]);
    }).then(() => {
        console.log("Todos los scripts han sido cargados.");

        // Ahora sí, emitimos el evento porque sabemos que los scripts ya están cargados
        document.dispatchEvent(new Event("componentsLoaded"));
    }).catch(error => console.error("Error en la carga de scripts:", error));
});


