<template>
  <v-container fluid grid-list-sm d-flex>
    <Navigation></Navigation>
    <v-layout row wrap class="post__wrapper">
        <v-flex xs8 offset-md2>
            <div v-for="post in post" :key="post.id">
                <v-card>
                    <v-container fluid>
                        <v-layout class="px-3 pt-3 pb-0">
                        <v-flex xs9 align-end d-flex>
                            <span class="post__title text-xs-left">{{ post.title }}</span>
                        </v-flex>
                        <v-spacer></v-spacer>
                        <v-flex xs-2 justify-center>
                            <a :href="`${post.link}`" :target="_blank">
                            <v-btn icon right class="post__originlink" v-if="post.content!=''">
                                <v-icon>link</v-icon>
                            </v-btn>
                            </a>
                            <v-btn icon right @click="editPost(post.id)">
                                <v-icon>edit</v-icon>
                            </v-btn>
                            <v-btn icon right @click="deletePost(uid, post.id)">
                                <v-icon>delete</v-icon>
                            </v-btn>
                        </v-flex>
                        </v-layout>    
                    </v-container>
                    
                    <v-layout class="px-4 pa-0">
                        <v-card-text class="text-xs-left py-0">{{ post.date }}</v-card-text>
                    </v-layout>
                    <v-layout class="px-4 pt-5 pb-5">
                        <v-card-text class="text-xs-left">{{ post.content }}</v-card-text>
                    </v-layout>
                        <v-layout class="px-4 py-4">
                            <v-chip
                                color="secondary"
                                class="post__tag"
                                gray
                                v-for="(tag, index) in post.tags"
                                :key="index"
                                @click.prevent="$router.push(`/tag/${tag}`)"
                                >{{tag}}</v-chip>
                        </v-layout>
                </v-card>
            </div>
        </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Navigation from "./Navigation";
import { mapGetters } from 'vuex';
const fb = require("../config/db");
export default {
  name: "PostView",
  components: {
    Navigation
  },
  data() {
    return {
      key: this.$route.params.id,
      post: []
    };
  },
  computed: {
    ...mapGetters([ 'uid' ])
  },
  created() {
    let post_id = this.key
    let post_array = []
    fb.auth.onAuthStateChanged(function(user) {
        if (user) {
            const ref = fb.db.collection("posts").doc(user.uid).collection("posts").doc(post_id);
            ref.get().then(doc => {
                if (doc.exists) {
                    post_array.push({
                        id: doc.id,
                        title: doc.data().title,
                        content: doc.data().content,
                        link: doc.data().link,
                        tags: doc.data().tag,
                        date: doc.data().date
                    });
                } else {
                alert("Can't find the post");
                }
            });
        }
    })
    this.post = post_array
  },
  methods: {
    editPost(key) {
      this.$router.push({
        name: "edit",
        params: { id: key }
      });
    },
    deletePost(uid, key) {
      fb.db.collection("posts").doc(uid).collection("posts").doc(key).delete()
        .then(function() {
          alert("Successfully deleted");
        });
    }
  }
};
</script>

<style scoped>
a{
    text-decoration: none;
}
.post__wrapper{
    margin-top: 100px !important;
}
.post__title {
  cursor: pointer;
  font-size: 2rem;
  font-weight: 700;
}
.post__tag {
    padding: 0.4rem 0.6rem;
}
</style>
