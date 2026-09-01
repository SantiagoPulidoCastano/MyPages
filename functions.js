// Solicitudes
function fun() {
  alert("Enviado")
}

document.getElementById("formSolicitud").addEventListener("submit", async (e) => {
  e.preventDefault();

  const datos = {
    nombre: document.getElementById("nombre").value.trim(),
    message: document.getElementById("message").value.trim()
  };

  const texto = `Solicitud de ${datos.nombre}: ${datos.message}`;
  const telefono = "573502412537";

  window.open(
    `https://wa.me/${telefono}?text=${encodeURIComponent(texto)}`,
    "_blank"
  );

  try {
    const respuesta = await fetch("http://localhost:8080", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams(datos)
    });

    if (!respuesta.ok) {
      throw new Error("No se pudo guardar la solicitud");
    }

    e.target.reset();
    alert("Solicitud enviada correctamente");
  } catch (error) {
    console.error(error);
    alert("Se abrió WhatsApp, pero no se pudo guardar la solicitud en el CSV.");
  }
});
