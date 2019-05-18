import firebase from 'firebase'
const config = {
    apiKey: "AIzaSyAHg6VaMPSiXQkPqi8iy1R-pZracArBRMA",
    authDomain: "sunday-vue.firebaseapp.com",
    databaseURL: "https://sunday-vue.firebaseio.com",
    projectId: "sunday-vue",
    storageBucket: "sunday-vue.appspot.com",
    messagingSenderId: "955001135196",
    appId: "1:955001135196:web:8d39bed8d6599731"
  };
firebase.initializeApp(config)
export const db = firebase.firestore()