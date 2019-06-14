<template>
  <v-container id="input-usage" grid-list-xl fluid>
    <v-toolbar :clipped-left="$vuetify.breakpoint.lgAndUp" color="gray darken-3" dark app fixed flat>
      <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
        <span class="hidden-sm-and-down"></span>
      </v-toolbar-title>
      <v-text-field
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="search"
        label="Search"
        class="hidden-sm-and-down"
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-avatar size="32px" tile>
          <v-icon light v-if="authenticated">account_balance</v-icon>
        </v-avatar>
      </v-btn>
    </v-toolbar>
    <!-- <v-layout row justify-space-between>
      <v-flex xs3>
        <v-card flat>
          <v-btn dark depressed color="teal" @click="$router.push('/create')">Create</v-btn>
          <v-btn outline color="gray" v-if="!authenticated" @click="$router.push('/signup')">Signup</v-btn>
          <v-btn outline color="gray" v-if="authenticated" @click="LogOut()">Logout</v-btn>
          <v-btn outline color="gray" v-else @click="$router.push('/login')">Login</v-btn>
        </v-card>
      </v-flex>
    </v-layout> -->
    <PostForm></PostForm>
    <PostList></PostList>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import PostList from "./PostList";
import PostForm from "./PostForm";
const fb = require("../config/db");
export default {
  data() {
    return {
      authenticated: false,
      drawer: null
    };
  },
  created() {
    // 로그인 이후 state에 상태 저장
    fb.auth.onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
        this.authenticated = true;
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
    PostList,
    PostForm
  },
  methods: {
    ...mapActions(["updateUid", "updateUserName"]),
    LogOut() {
      fb.auth.signOut().then(() => {
        this.$router.replace("/");
        // 버그... router 쓰지 말고 해야
        // replace는 히스토리 스택에 안 쌓임
        // push 는 쌓임
      });
    }
  }
};
</script>
<style scoped>
.user__info {
  border: 1px solid #000;
}
</style>