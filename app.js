const routineItems = [
  "Limpieza (mañana)",
  "Hidratante (mañana)",
  "Protector solar",
  "Limpieza (noche)",
  "Hidratante (noche)",
  "Contorno de ojos",
  "Mandíbula (cuello)",
  "'O' + sonrisa",
  "Cejas (resistencia)",
  "Papada (beso al techo)",
  "Exfoliación",
  "Revisión espejo",
  "Limpieza cejas/corte"
];

const checklist = document.getElementById("checklist");

routineItems.forEach(item => {
  const li = document.createElement("li");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = item;
  checkbox.checked = localStorage.getItem(item) === "true";
  checkbox.addEventListener("change", () => {
    localStorage.setItem(item, checkbox.checked);
  });
  li.appendChild(checkbox);

  const label = document.createElement("label");
  label.htmlFor = item;
  label.textContent = item;
  li.appendChild(label);
  checklist.appendChild(li);
});

document.getElementById("notify").addEventListener("click", () => {
  if (Notification.permission === "granted") {
    new Notification("¿Ya hiciste tu rutina facial de hoy?");
  } else {
    Notification.requestPermission();
  }
});

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}
