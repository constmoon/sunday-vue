<template>
  <v-container grid-list-xl fluid>
    <Navigation></Navigation>
    <div v-if="authenticated">
      <PostForm></PostForm>
      <PostList></PostList>
    </div>
    <div v-else class="please_sign_up">
      <h1>You need to sign up</h1>
    </div>
  </v-container>
</template>

<script>
import Navigation from "./Navigation";
import PostForm from "./PostForm";
import PostList from "./PostList";
const fb = require('../config/db')
export default {
  data() {
    return {
      authenticated: false
    }
  },
  components: {
    Navigation,
    PostForm,
    PostList
  },
  created() {
    fb.auth.onAuthStateChanged(user => {
      if (user) {
        this.authenticated = true
      }
    })
  }
  
  
};
</script>
<style scoped>
.please_sign_up{
  margin-top: 100px !important;
}
</style>