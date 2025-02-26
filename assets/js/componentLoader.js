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
    // Cargar el loader en su propio contenedor
    loadComponent("#loaderContainer", "components/loader.html").then(() => {
        return Promise.all([
            loadHead("components/head.html"),
            loadComponent("#offerBar", "components/offerBar.html"),
            loadComponent("#navbar", "components/navbar.html"),
            loadComponent("#mobileNavbar", "components/mobileNavbar.html"),
            loadComponent("#breadCrumb", "components/breadcrumb.html"),
            loadComponent("#banner", "components/banner.html"),
            loadComponent("#engagement", "components/engagement.html"),
            loadComponent("#categoriesContainer", "components/categories.html"),
            loadComponent("#footer", "components/footer.html"),
            loadComponent("#notifier", "components/notifier.html"),
            loadComponent("#videos", "components/videos.html")
        ]);
    }).then(() => {
        console.log("Todos los componentes han sido cargados.");

        return Promise.all([
            loadScript("https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js"),
            loadScript("https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"),
            loadScript("/assets/js/script.js"),
            loadScript("/assets/js/cart.js"),
            loadScript("/assets/js/offerBar.js"),
            loadScript("/assets/js/navbar.js"),
            loadScript("/assets/js/categories.js"),
            loadScript("/assets/js/breadcrumb.js"),
            loadScript("/assets/js/contactus.js"),
            loadScript("/assets/js/orderSuccess.js"),
            loadScript("/assets/js/loader.js")
        ]);
    }).then(() => {
        console.log("Todos los scripts han sido cargados.");

        setTimeout(() => {
            console.log("Los componentes han sido renderizados en la pantalla.");
            document.dispatchEvent(new Event("componentsLoaded"));
        }, 3000);
        /*waitForRender(() => {
            console.log("Los componentes han sido renderizados en la pantalla.");
            document.dispatchEvent(new Event("componentsLoaded"));
        });*/
    }).catch(error => console.error("Error en la carga de scripts:", error));
});

function waitForRender(callback) {
    let observer = new MutationObserver(() => {
        requestAnimationFrame(() => {
            // Verificar si todos los elementos esperados están en el DOM
            const requiredElements = [
                "#offerBar",
                "#navbar",
                "#mobileNavbar",
                "#breadCrumb",
                "#banner",
                "#engagement",
                "#categoriesContainer",
                "#footer",
                "#notifier"
            ];

            const allLoaded = requiredElements.every(selector => document.querySelector(selector) !== null);

            if (allLoaded) {
                console.log("Todos los elementos han sido detectados en el DOM.");
                callback();
                observer.disconnect();
            }
        });
    });

    observer.observe(document.body, { childList: true, subtree: true });
}

