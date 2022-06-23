// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp  } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore} from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import localforage from 'localforage'

// importScripts('https://www.gstatic.com/firebasejs/8.2.1/firebase-app.js');
// importScripts('https://www.gstatic.com/firebasejs/8.2.1/firebase-messaging.js');
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey:`${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`,
  authDomain: "illboard.firebaseapp.com",
  projectId: "illboard",
  storageBucket: "illboard.appspot.com",
  messagingSenderId: `${process.env.NEXT_PUBLIC_FIREBASE_messagerID}`,
  appId: `${process.env.NEXT_PUBLIC_FIREBASE_appID}`,
  measurementId:`${process.env.NEXT_PUBLIC_FIREBASE_measurementID}`,
};

// Initialize Firebase
// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// const app = initializeApp(firebaseConfig);
//  const analytics = getAnalytics(app);
export const db=getFirestore(app);
export const auth=getAuth();
export const storage = getStorage(app);
// export const messaging = getMessaging(app);


const firebaseCloudMessaging = {
  tokenInlocalforage: async () => {
    const token = await localforage.getItem("fcm_token");
    console.log("fcm_token tokenInlocalforage", token);
    return token;
  },
  onMessage: async () => {
    const messaging = getMessaging();
    onMessage(messaging, (payload) => {
      console.log("Message received. ", payload);
      alert("Notification");
    });
  },

  init: async function () {
    try {
      if ((await this.tokenInlocalforage()) !== null) {
        console.log("it already exists");
        return false;
      }
      console.log("it is creating it.");
      const messaging = getMessaging();
      console.log("messaging",messaging)
      await Notification.requestPermission();
      getToken(messaging, {
        vapidKey:`${process.env.FIREBASE_MESSAGING_VAPID_KEY}`,
      })
        .then((currentToken) => {
          console.log("current Token", currentToken);
          if (currentToken) {
            // Send the token to your server and update the UI if necessary
            // save the token in your database
            localforage.setItem("fcm_token", currentToken);
            console.log("fcm_token", currentToken);
          } else {
            // Show permission request UI
            console.log(
              "NOTIFICATION, No registration token available. Request permission to generate one."
            );
            // ...
          }
        })
        .catch((err) => {
          console.log(
            "NOTIFICATION An error occurred while retrieving token . "
          );
          console.log(err);
        });
    } catch (error) {
      console.error(error);
    }
  },
};

export { firebaseCloudMessaging };


// export const getToken = (setTokenFound) => {
//   const messaging = getMessaging(app);
//   return getToken(messaging, {vapidKey: `${process.env.FIREBASE_MESSAGING_VAPID_KEY}`}).then((currentToken) => {
//     if (currentToken) {
//       console.log('current token for client: ', currentToken);
//       setTokenFound(true);
//       // Track the token -> client mapping, by sending to backend server
//       // show on the UI that permission is secured
//     } else {
//       console.log('No registration token available. Request permission to generate one.');
//       setTokenFound(false);
//       // shows on the UI that permission is required 
//     }
//   }).catch((err) => {
//     console.log('An error occurred while retrieving token. ', err);
//     // catch error while creating client token
//   });
// }

// export const onMessageListener=()=>
// new Promise((resolve)=>{
//   messaging.onMessage((payload)=>{
//     resolve(payload);
//   });
// });