import 'firebase/messaging'
import { initializeApp, getApps, getApp  } from "firebase/app";
import { getMessaging } from "firebase/messaging";
import firebase from 'firebase/app'
import localforage from 'localforage'
 
const firebaseCloudMessaging = {
  //checking whether token is available in indexed DB
  tokenInlocalforage: async () => {
    return localforage.getItem('fcm_token')
  },
  //initializing firebase app
  init: async function () {
    if (!getApps().length) {
        const app =initializeApp({
        apiKey:`${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`,
        authDomain: "illboard.firebaseapp.com",
        projectId: "illboard",
        storageBucket: "illboard.appspot.com",
        messagingSenderId: `${process.env.NEXT_PUBLIC_FIREBASE_messagerID}`,
        appId: `${process.env.NEXT_PUBLIC_FIREBASE_appID}`,
        measurementId:`${process.env.NEXT_PUBLIC_FIREBASE_measurementID}`,
      });

      try {
        const messaging = getMessaging(app);
        const tokenInLocalForage = await this.tokenInlocalforage()
        //if FCM token is already there just return the token
        if (tokenInLocalForage !== null) {
          return tokenInLocalForage
        }
        //requesting notification permission from browser
        const status = await Notification.requestPermission()
        if (status && status === 'granted') {
          //getting token from FCM
          const fcm_token = await messaging.getToken({
            vapidKey: `${process.env.FIREBASE_MESSAGING_VAPID_KEY}`
          })
          if (fcm_token) {
            //setting FCM token in indexed db using localforage
            localforage.setItem('fcm_token', fcm_token)
            console.log('fcm token', fcm_token)
            //return the FCM token after saving it
            return fcm_token
          }
        }
      } catch (error) {
        console.error(error)
        return null
      }
    }
  }
}
export { firebaseCloudMessaging }