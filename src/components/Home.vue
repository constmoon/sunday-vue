<template>
  <v-container id="input-usage" grid-list-xl fluid>
    <v-layout row justify-space-between>
      <v-flex xs2>
        <v-card flat>
          <v-card-text class="text-xs-left">{{ name }}</v-card-text>
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
import { mapGetters, mapActions } from "vuex";
import PostList from "./PostList";
export default {
  computed: {
    ...mapGetters([ 'uid', 'name' ])
  },
  components: {
    PostList
  },
  methods: {
    
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