<template>
  <v-container fluid grid-list-sm d-flex>
    <Navigation></Navigation>
    <v-layout row justify-space-between class="post__wrapper">
      <v-flex xs8 offset-md2>
        <v-card flat>
          <v-card-title class="display-1 font-weight-bold text-xs-left">Tag: {{ tag }}</v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Navigation from "./Navigation";
export default {
  name: "TagList",
  components: {
    Navigation
  },
  data() {
    return {
      tag: ''
    }
  },
  created() {
    console.log(this.$router.params.id)
  }
};
</script>

<style>
.post__wrapper{
    margin-top: 100px !important;
}
</style>
