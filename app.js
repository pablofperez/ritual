
const checklistData = {
  "Lunes": ["Limpieza", "Hyalu B5", "Contorno de ojos", "Retinoide", "Hidratante"],
  "Martes": ["Limpieza", "Hyalu B5", "Contorno de ojos", "Glicólico", "Hidratante"],
  "Miércoles": ["Limpieza", "Hyalu B5", "Contorno de ojos", "Hidratante"],
  "Jueves": ["Limpieza", "Hyalu B5", "Contorno de ojos", "Retinoide", "Hidratante"],
  "Viernes": ["Limpieza", "Hyalu B5", "Contorno de ojos", "Glicólico", "Hidratante"],
  "Sábado": ["Limpieza", "Hyalu B5", "Contorno de ojos", "Hidratante"],
  "Domingo": ["Limpieza", "Hyalu B5", "Contorno de ojos", "Retinoide", "Hidratante"]
};

const dayNames = ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"];
const today = new Date();
const dayName = dayNames[today.getDay()];
document.getElementById("day-title").textContent = "Ritual de " + dayName;

const checklist = document.getElementById("checklist");
const items = checklistData[dayName] || [];

items.forEach(item => {
  const li = document.createElement("li");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = item;
  checkbox.checked = localStorage.getItem(item + dayName) === "true";
  checkbox.addEventListener("change", () => {
    localStorage.setItem(item + dayName, checkbox.checked);
    checkCompleted();
  });
  const label = document.createElement("label");
  label.htmlFor = item;
  label.textContent = item;
  li.appendChild(checkbox);
  li.appendChild(label);
  checklist.appendChild(li);
});

function checkCompleted() {
  const allChecked = items.every(item => localStorage.getItem(item + dayName) === "true");
  const msg = document.getElementById("message");
  if (allChecked) {
    msg.textContent = "¡Ritual completado!";
  } else {
    msg.textContent = "";
  }
}

setTimeout(() => {
  document.getElementById("splash").style.display = "none";
  document.getElementById("app").style.display = "block";
  checkCompleted();
}, 3000);

// Notificaciones locales
function scheduleNotification(title, body, hour, minute) {
  const now = new Date();
  const target = new Date();
  target.setHours(hour, minute, 0, 0);
  if (target <= now) target.setDate(target.getDate() + 1);
  const delay = target - now;
  setTimeout(() => {
    new Notification(title, { body });
    scheduleNotification(title, body, hour, minute);
  }, delay);
}

if (Notification.permission !== "granted") {
  Notification.requestPermission();
} else {
  scheduleNotification("Ritual", "¿Hiciste tu ritual de mañana?", 8, 30);
  scheduleNotification("Ritual", "Recordá tu ritual de noche", 0, 0);
}
