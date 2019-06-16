<template>
  <v-toolbar :clipped-left="$vuetify.breakpoint.lgAndUp" color="gray darken-3" dark app fixed flat>
    <v-toolbar-title style="width: 300px" class="ml-4 pl-3 text-xs-left logo__text" @click="$router.push('/')">
      <span class="hidden-sm-and-down">thumb-archive</span>
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

    <v-btn icon @click.stop="drawer = !drawer">
      <v-avatar size="32px" tile>
        <v-icon light>account_balance</v-icon>
      </v-avatar>
    </v-btn>
    <v-navigation-drawer v-model="drawer" dark right temporary absolute width="150vw">
      <v-list class="grow pa-0">
        <v-list-tile v-if="!authenticated" @click="$router.push('/signup')">
          <span class="text-xs-right">SignUp</span>
        </v-list-tile>
        <v-list-tile v-if="!authenticated" @click="$router.push('/login')">
          <span class="text-xs-right">Login</span>
        </v-list-tile>
        <v-list-tile v-if="authenticated" @click="LogOut()">
          <span class="text-xs-right">Logout</span>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </v-toolbar>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
const fb = require("../config/db");
export default {
  name: "Navigation",
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
.v-navigation-drawer {
  top: 100%;
  height: auto !important;
  box-shadow: none !important;
}
.logo__text{
  cursor: pointer;
}
</style>
