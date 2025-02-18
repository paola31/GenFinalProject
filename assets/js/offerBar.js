function updateOffer(data, index)
{
    const iconElement = document.getElementById("offer-icon");
    const textElement = document.getElementById("offer-text");

    if (!iconElement || !textElement || data.length === 0) return; // Verificación por seguridad

    iconElement.textContent = data[index].icon;
    textElement.textContent = data[index].text;
}

// Ahora en el eventListener, la llamamos correctamente con `data`
document.addEventListener("componentsLoaded", function ()
{
    fetch("assets/js/data/offers.json")
        .then(response => response.text())
        .then(data =>
        {
            let index = 0;
            data = JSON.parse(data);
            updateOffer(data, index); // Primera ejecución

            setInterval(() =>
            {
                index = (index + 1) % data.length;
                updateOffer(data, index);
            }, 10000);
        })
        .catch(error => console.error("Error loading offers:", error));
});
