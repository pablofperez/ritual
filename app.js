
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
  Notification.requestPermission().then(permission => {
    if (permission === "granted") {
      new Notification("¿Ya hiciste tu rutina facial de hoy?");
    }
  });
});

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}

// Notificaciones programadas
function scheduleNotification(title, body, hour, minute) {
  const now = new Date();
  const target = new Date();
  target.setHours(hour);
  target.setMinutes(minute);
  target.setSeconds(0);

  if (target <= now) target.setDate(target.getDate() + 1);

  const delay = target - now;

  setTimeout(() => {
    if (Notification.permission === "granted") {
      new Notification(title, { body });
    }
    scheduleNotification(title, body, hour, minute); // reprogramar
  }, delay);
}

if (Notification.permission === "granted") {
  scheduleNotification("Ritual", "¿Ya hiciste tu rutina de mañana?", 8, 30);
  scheduleNotification("Ritual", "Recordá tu rutina facial de noche", 0, 0);
} else {
  Notification.requestPermission().then(permission => {
    if (permission === "granted") {
      scheduleNotification("Ritual", "¿Ya hiciste tu rutina de mañana?", 8, 30);
      scheduleNotification("Ritual", "Recordá tu rutina facial de noche", 0, 0);
    }
  });
}
