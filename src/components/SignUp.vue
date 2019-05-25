<template>
  <v-container grid-list-md>
    <div class="display-2">Sign Up</div>
    <v-spacer></v-spacer>
    <v-layout row wrap align-center justify-center>
      <v-flex xs7 offset-xs1>
        <v-text-field label="Name" required v-model="name"></v-text-field>
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
import 'firebase/auth';
import 'firebase/firestore';
export default {
  data() {
    return {
      name: "",
      password: "",
      email: ""
    };
  },
  methods: {
    SignUp() {
        console.log(`${this.email} ${this.name}`)
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(function(user) {
            user.updateProfile( { 
                displayName: this.name 
            })
        })
        .catch(function(error) {
          alert(error);
        });
    }
  }
};
</script>

<style>
</style>
