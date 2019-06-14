<template>
  <v-container id="input-usage" grid-list-xl fluid>
    <v-layout row justify-space-between>
      <v-flex xs2>
        <v-card flat>
          <v-card-text class="text-xs-left">{{ username }}</v-card-text>
          <v-card-text class="text-xs-left">{{ uid }}</v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs3>
        <v-card flat>
          <v-btn dark depressed color="teal" @click="$router.push('/create')">Create</v-btn>
          <v-btn outline color="gray" v-if="!authenticated" @click="$router.push('/signup')">Signup</v-btn>
          <v-btn outline color="gray" v-if="authenticated" @click="LogOut()">Logout</v-btn>
          <v-btn outline color="gray" v-else @click="$router.push('/login')">Login</v-btn>
        </v-card>
      </v-flex>
    </v-layout>
    <PostList></PostList>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import PostList from "./PostList";
const fb = require('../config/db')
export default {
  data() {
    return {
      authenticated: false
    }
  },
  created() {
    // 로그인 이후 state에 상태 저장
    fb.auth.onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
        this.authenticated = true
        const isAnonymous = user.isAnonymous;
        const username = isAnonymous ? "익명" : user.displayName;
        const uid = user.uid;
        this.updateUid(uid);
        this.updateUserName(username);
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
    ...mapActions(["updateUid", "updateUserName"]),
    LogOut() {
      fb.auth.signOut().then(() => {
        this.$router.replace("/");
        // 버그... router 쓰지 말고 해야
        // replace는 히스토리 스택에 안 쌓임
        // push 는 쌓임
      })
    }
  },
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