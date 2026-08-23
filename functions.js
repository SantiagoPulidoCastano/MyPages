// Modo Oscuro
const body = document.body;
const modoToggle = document.getElementById("modoToggle");

body.classList.toggle("dark", localStorage.getItem("modoToggle") === "true");

modoToggle.addEventListener("click", () => {
  body.classList.toggle("dark");
  localStorage.setItem("modoToggle", body.classList.contains("dark"));
});

// Solicitudes
const solicitudes = [];

document.getElementById("formSolicitud").addEventListener("submit", function (e) {
  e.preventDefault();
  const nombre = document.getElementById("nombre").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!nombre || !email || !message) return;

  const nueva = { nombre, email, message };
  solicitudes.push(nueva);
  agregarSolicitud(nueva);
  this.reset();
});

function agregarSolicitud(s) {
  const lista = document.getElementById("formSolicitud");
  if (document.querySelector(".vacio")) lista.innerHTML = "";

  const li = document.createElement("li");
  li.textContent = `${s.nombre} pidió: "${s.message}"`;

  const btn = document.createElement("button");
  btn.textContent = "🗑️";
  btn.onclick = () => {
    lista.removeChild(li);
    const i = solicitudes.indexOf(s);
    if (i !== -1) solicitudes.splice(i, 1);
    if (solicitudes.length === 0) {
      lista.innerHTML = '<li class="vacio">Ninguna solicitud aún</li>';
    }
  };

  li.appendChild(btn);
  lista.appendChild(li);
}

document.getElementById("descargarBtn").addEventListener("click", function () {
  if (solicitudes.length === 0) return;

  let csv = "Nombre,Correo,message\n";
  solicitudes.forEach(s => {
    csv += `"${s.nombre}","${s.email}","${s.message.replace(/"/g, '""')}"\n`;
  });

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.target = "_blank";"asdada.com" 
  a.download = "solicitudes.csv";
  a.click();
});

