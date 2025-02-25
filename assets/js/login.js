const formLogin = document.querySelector("#login-form");
const resultMessageDiv = document.querySelector("#result-message");

formLogin.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.querySelector("#email").value.trim();
  const password = document.querySelector("#password").value.trim();

  if (!email || !password) {
    showAlert("Email and password are required", "danger");
    return;
  }

  // Datos a enviar al backend
  const loginData = {
    email: email,
    password: password,
  };

  // Enviar credenciales al backend
  fetch("http://localhost:8080/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
  })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Invalid credentials");
        }
        return response.text(); // Recibe el token como texto plano
      })
      .then((token) => {
        console.log("✅ Login exitoso, token recibido:", token);
        localStorage.setItem("authToken", token); // Guardamos el token en localStorage

        showAlert("Successful login. Redirecting...", "success");

        setTimeout(() => {
          goHome() // Redirigir al home
        }, 2000);
      })
      .catch((error) => {
        console.error("❌ Error en el login:", error);
        showAlert("Invalid credentials", "danger");
        document.querySelector("#password").value = "";
      });
});

// Función para mostrar alertas
function showAlert(message, type) {
  resultMessageDiv.innerHTML = `
    <div class="alert alert-${type} alert-dismissible fade show" role="alert">
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  `;
}


function goHome()
{
  window.location.href = window.location.origin + '/' + window.location.pathname.split('/')[1] + '/';
}
