<template>
  <div>
    <div
      v-for="post in this.$store.getters.getPosts"
      :key="post.id"
      @click.prevent="$router.push(`/post/${post.id}`)"
    >
      <div>
        <strong>{{ post.title }}</strong>
        {{ post.content }}
      </div>
      <small>{{ post.date }}</small>
      <span v-for="(tag, index) in post.tags" :key="index">{{ tag }}</span>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex"
export default {
  name: "PostList",
  created() {
    this.fetchPosts()
  },
  methods: {
    ...mapActions(["fetchPosts"])
  },
  data() {
    return {
      taglist: [],
      postList: []
    };
  },
  computed: {
  }
};
</script>

<style>
</style>
