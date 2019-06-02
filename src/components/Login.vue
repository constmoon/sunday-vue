<template>
  <v-container grid-list-md>
    <div class="display-2">Login</div>
    <v-spacer></v-spacer>
    <v-layout row wrap align-center justify-center>
      <v-flex xs7 offset-xs1>
        <v-text-field label="Email*" required v-model="email"></v-text-field>
      </v-flex>
      <v-flex xs7 offset-xs1>
        <v-text-field label="Password*" type="password" required v-model="password"></v-text-field>
      </v-flex>
    </v-layout>
    <v-spacer></v-spacer>
    <v-btn color="blue darken-1" flat @click="$router.push('/')">Back</v-btn>
    <v-btn color="blue darken-1" flat @click="Login()">Login</v-btn>
  </v-container>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  computed: {
    ...mapGetters([ 'uid', 'username' ])
  },
  methods: {
    Login() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(user => {
          /* eslint-disable no-console */
          console.log(user);
          this.$router.push("/");
        })
        .catch(error => console.error("Error writing document: ", error));
    }
  }
};
</script>

<style>
</style>
