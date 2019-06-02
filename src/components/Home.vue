<template>
  <v-container id="input-usage" grid-list-xl fluid>
    <v-layout row justify-space-between>
      <v-flex xs2>
        <v-card flat>
          <v-card-text class="text-xs-left">{{ username }}</v-card-text>
          <v-card-text class="text-xs-left">{{ uid }}</v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs2>
        <v-card flat>
          <v-btn depressed fab dark color="gray">
            <v-icon dark @click="$router.push('/create')">+</v-icon>
          </v-btn>
          <v-btn depressed fab dark color="pink">
            <v-icon dark @click="$router.push('/signup')">++</v-icon>
          </v-btn>
          <v-btn depressed fab dark color="blue">
            <v-icon dark @click="$router.push('/login')">~</v-icon>
          </v-btn>
        </v-card>
      </v-flex>
    </v-layout>
    <PostList></PostList>
  </v-container>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { mapGetters, mapActions } from "vuex";
import PostList from "./PostList";
export default {
  created() {
    // 로그인 이후 state에 상태 저장
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
        const isAnonymous = user.isAnonymous;
        const username = isAnonymous ? "익명" : user.displayName;
        const uid = user.uid;
        this.updateUid(uid);
        this.updateUserName(username);
        // ...
      } else {
        // User is signed out.
        // ...
      }
    });
  },
  computed: {
    ...mapGetters(["uid", "username"])
  },
  components: {
    PostList
  },
  methods: {
    ...mapActions(["updateUid", "updateUserName"])
  }
};
</script>
<style scoped>
.text-align-center {
  text-align: center;
}
.user__info {
  border: 1px solid #000;
}
</style>