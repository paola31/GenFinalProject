document.addEventListener("componentsLoaded", () => {
    console.log("🔥 Evento componentsLoaded recibido, ocultando loader...");

    const loader = document.getElementById("loaderContainer");
    const body = document.body;

    if (loader) {
        loader.classList.add("hidden");

        // ⏳ Esperamos la animación y mostramos el contenido
        setTimeout(() => {
            loader.remove();
            body.classList.remove("loading"); // 👈 Eliminamos loading
            body.classList.add("loaded"); // 👈 Agregamos loaded
            console.log("✅ Loader eliminado del DOM, contenido visible.");
        }, 500);
    }
});
