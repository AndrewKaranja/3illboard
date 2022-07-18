import { getMessaging, getToken } from "firebase/messaging";
import { useState } from "react";
import { messaging } from "./firebase";

// Get registration token. Initially this makes a network call, once retrieved
// subsequent calls to getToken will return from cache.

export const getMessagingToken= getToken(messaging, { vapidKey: `${process.env.FIREBASE_MESSAGING_VAPID_KEY}` }).then((currentToken) => {
    
  if (currentToken) {
    // Send the token to your server and update the UI if necessary
    // ...
  } else {
    // Show permission request UI
    console.log('No registration token available. Request permission to generate one.');
    // ...
  }
}).catch((err) => {
  console.log('An error occurred while retrieving token. ', err);
  // ...
});