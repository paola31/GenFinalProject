function loadComponent(selector, file) {
    return new Promise((resolve, reject) => {
        fetch(file)
            .then(response => response.text())
            .then(data => {
                document.querySelector(selector).innerHTML = data;
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
        // Emitimos un evento cuando todo está listo
        console.log("Todos los componentes han sido cargados.");
        document.dispatchEvent(new Event("componentsLoaded"));
    });
});

