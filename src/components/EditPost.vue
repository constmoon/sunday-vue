<template>
  <v-container fluid grid-list-sm d-flex>
    <Navigation></Navigation>
    <v-layout row wrap align-center class="post__wrapper">
    <v-flex xs8 offset-md2>
      <v-card>
        <v-container fluid>
          <v-form>
            <v-text-field single-line full-width required label="title" v-model="post[0].title"></v-text-field>
            <v-textarea full-width label="content" v-model="post[0].content"></v-textarea>
            <v-text-field single-line full-width label="link" v-model="post[0].link"></v-text-field>
            <v-text-field
              single-line
              full-width
              label="tag"
              v-model="tag"
              @keyup.enter.native="makeTagChip"
            ></v-text-field>
            <v-layout align-start justify-start pl-3>
              <v-chip
                dark
                v-for="(item, index) in post[0].tags"
                :key="index"
                close
                @input="removeTag(index)"
              >{{item}}</v-chip>
            </v-layout>
          </v-form>
        </v-container>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="addPost()">Save</v-btn>
        </v-card-actions>
      </v-card>
      <v-dialog v-model="dialog" max-width="290">
        <v-card>
          <v-card-title class="headline"></v-card-title>
          <v-card-text>{{message}}</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" flat="flat" @click="dialog=false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-flex>
  </v-layout>
  </v-container>
</template>

<script>
import Navigation from "./Navigation";
import { mapGetters } from 'vuex';
const fb = require("../config/db");
export default {
  name: "EditPost",
  components: {
    Navigation,
  },
  data() {
    return {
      key: this.$route.params.id,
      post: {
        title: "",
        content: "",
        tags: [], // db에 저장할 태그 배열
        link: "",
        date: new Date().toISOString().substr(0, 10)
      },
      tag: "", // 현재 입력하는 태그
      dialog: false,
      message: ""
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
      addPost() {
      if (this.title === "") {
        this.message = "Title is required";
        this.dialog = true;
      } else {
        fb.db
          .collection("posts")
          .doc(this.uid)
          .collection("posts")
          .add({
            title: this.post.title,
            content: this.post.content,
            link: this.post.link,
            tag: this.post.tags,
            date: this.post.date
          })
          .then(response => {
            if (response) {
              this.post.title = "";
              this.post.content = "";
              this.post.link = "";
              this.post.tags = "";
              this.$router.push("/");
            }
          })
          .catch(error => alert(error.message));
      }
    },
    makeTagChip() {
      this.post.tags.push(this.tag);
      this.tag = ""; 
    },
    removeTag(idx) {
      this.post.tags.splice(idx, 1);
    }
  }
};
</script>

<style scoped>
.post__wrapper {
  margin-top: 100px !important;
  margin-bottom: 20px !important;
}
</style>
