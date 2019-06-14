<template>
  <v-layout row wrap align-center>
    <v-flex xs8 offset-md2>
      <div v-for="post in posts" :key="post.id">
        <v-card>
          <v-container fluid>
            <v-layout>
              <v-flex xs12 align-end d-flex>
                <span
                  class="post__title text-xs-left"
                  @click.prevent="$router.push(`/post/${post.id}`)"
                >{{ post.title }}</span>
              </v-flex>
            </v-layout>
          </v-container>

          <v-card-text class="text-xs-left pt-0">{{ post.content | truncate(100, '...') }}</v-card-text>
          <v-card-actions>
            <v-chip
              small
              color="secondary"
              class="post__tag"
              gray
              v-for="(tag, index) in post.tags"
              :key="index"
              @click.prevent="$router.push(`/tag/${tag}`)"
            >{{tag}}</v-chip>
            <v-spacer></v-spacer>
            <v-btn icon right class="post__originlink">
              <v-icon small>link</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "PostList",
  created() {
    this.getPosts();
  },
  computed: {
    ...mapGetters({
      posts: "posts"
    })
  },
  methods: {
    ...mapActions({
      fetchPosts: "fetchPosts"
    }),
    getPosts() {
      this.fetchPosts();
    }
  },
  filters: {
    truncate: function(text, stop, clamp) {
      return text.slice(0, stop) + (stop < text.length ? clamp || "..." : "");
    }
  },
  data() {
    return {
      
    };
  }
};
</script>

<style scoped>
.post__title {
  cursor: pointer;
  font-size: 2rem;
  font-weight: 700;
}
</style>
