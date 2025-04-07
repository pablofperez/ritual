
importScripts('https://www.gstatic.com/firebasejs/9.6.10/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.10/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyDcE6cUF9mr8ZCxBniJY2daqLuccecPbbM",
  authDomain: "ritual-2cca9.firebaseapp.com",
  projectId: "ritual-2cca9",
  storageBucket: "ritual-2cca9.firebasestorage.app",
  messagingSenderId: "755807451083",
  appId: "1:755807451083:web:a0fb0b36d8fa62855f684e"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
  });
});
