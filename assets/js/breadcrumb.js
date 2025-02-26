document.addEventListener("componentsLoaded", () => {
    const breadcrumbMenu = document.querySelector(".breadcrumb__content--menu");
    if (breadcrumbMenu) {
        const path = window.location.pathname;
        const page = path.split("/").pop().replace(".html", "");

        // Ignorar index (home)
        if (page && page !== "index") {
            // Convierte a un nombre amigable, por ejemplo "about-us" → "About Us"
            const friendlyName = page
                .split("-")
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ");

            // Crear nuevo elemento del breadcrumb
            const newBreadcrumbItem = document.createElement("li");
            newBreadcrumbItem.className = "breadcrumb__content--menu__items active";
            newBreadcrumbItem.textContent = friendlyName;

            // Agregar el elemento activo
            breadcrumbMenu.appendChild(newBreadcrumbItem);
        }
    }
});
