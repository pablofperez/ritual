
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getMessaging, getToken, onMessage } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-messaging.js";

const firebaseConfig = {
  apiKey: "AIzaSyDcE6cUF9mr8ZCxBniJY2daqLuccecPbbM",
  authDomain: "ritual-2cca9.firebaseapp.com",
  projectId: "ritual-2cca9",
  storageBucket: "ritual-2cca9.firebasestorage.app",
  messagingSenderId: "755807451083",
  appId: "1:755807451083:web:a0fb0b36d8fa62855f684e"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

Notification.requestPermission().then((permission) => {
  if (permission === "granted") {
    getToken(messaging, {
      vapidKey: "BC70s8MosYRhcmjbv5c2HaEVqkzkeHVGec94Zlj4_JEFGL5IJ4Y-5a8yKQLIT5SgMGo8OesSWw-10EpzKu2d7BQ"
    }).then((currentToken) => {
      if (currentToken) {
        console.log("Token recibido:", currentToken);
      }
    });
  }
});

onMessage(messaging, (payload) => {
  console.log("Mensaje recibido:", payload);
  new Notification(payload.notification.title, {
    body: payload.notification.body
  });
});
