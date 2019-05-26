<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { mapActions } from 'vuex';
export default {
  name: 'App',
  created(){
    // 익명 사용자 로그인
    firebase.auth().signInAnonymously().catch((error) => {
      const errorCode = error.code;
      if (errorCode === 'auth/operation-not-allowed') {
        alert('You must enable Anonymous auth in the Firebase Console.');
      } 
      else {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    });
  },
  methods: {
    ...mapActions([ 'updateUid', 'updateName' ]),
    insertUser (uid, name, isAnonymous) {
      // Add a new document in collection 'users'
      firebase.firestore().collection('users').doc(uid).set({
        name,
        isAnonymous
      }, { merge: true }).then(function() {
      /* eslint-disable no-console */
        console.log('user database successfully inserted');
      }).catch(function(error) {
        console.error("Error writing document: ", error);
      });
    },
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
