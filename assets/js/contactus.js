document.addEventListener("componentsLoaded", function () {
    const form = document.querySelector("#contact-us-form");
    const formContainer = document.querySelector("#formContainer");
    const successContainer = document.querySelector("#successContainer");
    const successMessage = document.querySelector("#success");
    const errorsContainer = document.querySelector("#errors");

    if(form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();

            if (!form.checkValidity()) {
                event.stopPropagation();
            } else {
                const formData = new FormData(form);

                fetch("https://formspree.io/f/xyzkanjr", {
                    method: "POST",
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                })
                    .then(response => {
                        if (response.ok) {
                            // Oculta formulario con fade-out
                            fadeOut(formContainer, () => {
                                successMessage.innerHTML = `
                            <h1 class="text-center">Thank you for contacting us! We will get back to you shortly.</h1>
                            <img src="https://res.cloudinary.com/di1xiwdsn/image/upload/v1740000526/lwd6n5lgqgrktkdhiqbc.png" alt="Success Image" class="img-fluid mx-auto d-block mt-3" style="max-width:150px;">
                        `;
                                fadeIn(successContainer);

                                // Luego de 4 segundos, restablecer el formulario
                                setTimeout(() => {
                                    fadeOut(successContainer, () => {
                                        form.reset();
                                        form.classList.remove("was-validated");
                                        form.querySelectorAll(".bi-exclamation-circle").forEach(icon => icon.classList.add("d-none"));
                                        fadeIn(formContainer);
                                    });
                                }, 4000);
                            });
                        } else {
                            errorsContainer.innerHTML = '<div class="alert alert-danger">There was an error sending the form. Please try again.</div>';
                            fadeIn(errorsContainer);
                        }
                    })
                    .catch(error => {
                        console.error("Error:", error);
                        errorsContainer.innerHTML = '<div class="alert alert-danger">An unexpected error occurred. Please try again.</div>';
                        fadeIn(errorsContainer);
                    });
            }

            form.classList.add("was-validated");

            form.querySelectorAll("input, textarea").forEach(input => {
                const icon = input.nextElementSibling;
                if (!input.checkValidity()) {
                    icon.classList.remove("d-none");
                } else {
                    icon.classList.add("d-none");
                }
            });
        });
    }

    // Función para fade-in
    const fadeIn = (element) => {
        element.style.opacity = 0;
        element.style.display = 'block';
        let opacity = 0;
        const timer = setInterval(() => {
            if (opacity >= 1) {
                clearInterval(timer);
            }
            element.style.opacity = opacity;
            opacity += 0.1;
        }, 30);
    };

    // Función para fade-out
    const fadeOut = (element, callback) => {
        let opacity = 1;
        const timer = setInterval(() => {
            if (opacity <= 0.1) {
                clearInterval(timer);
                element.style.display = 'none';
                if (callback) callback();
            }
            element.style.opacity = opacity;
            opacity -= 0.1;
        }, 30);
    };


});
