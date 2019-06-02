<template>
  <v-container grid-list-md>
    <div class="display-2">Sign Up</div>
    <v-spacer></v-spacer>
    <v-layout row wrap align-center justify-center>
      <v-flex xs7 offset-xs1>
        <v-text-field label="Username" required v-model="username"></v-text-field>
      </v-flex>
      <v-flex xs7 offset-xs1>
        <v-text-field label="Password*" type="password" required v-model="password"></v-text-field>
      </v-flex>
      <v-flex xs7 offset-xs1>
        <v-text-field label="Email*" required v-model="email"></v-text-field>
      </v-flex>
    </v-layout>
    <v-spacer></v-spacer>
    <v-btn color="blue darken-1" flat @click="$router.push('/')">Back</v-btn>
    <v-btn color="blue darken-1" flat @click="SignUp()">Submit</v-btn>
  </v-container>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { mapActions } from "vuex";
import { db } from "../config/db";
export default {
  data() {
    return {
      username: "",
      password: "",
      email: ""
    };
  },
  created() {},
  methods: {
    ...mapActions([ 'updateUid', 'updateUserName' ]),
    SignUp() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(() => {
          firebase
            .auth()
            .currentUser.updateProfile({
              displayName: this.username
            })
            .then(() => {
              db.collection("users")
                .add({
                  username: this.username,
                  email: this.email
                })
                .then(() => {
                  /* eslint-disable no-console */
                  console.log("user database successfully inserted");
                  this.$router.push("/");
                });
            })
            .catch(error => console.error("Error writing document: ", error));
        });
    }
  }
};
</script>

<style>
</style>
