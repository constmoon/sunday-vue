<template>
  <v-layout row justify-center>
    <v-card>
      <v-card-title>
        <span class="headline">Create Post</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-btn fab small dark @click="$router.push('/')">
            <v-icon>close</v-icon>
          </v-btn>
          <v-layout wrap>
            <v-flex xs12>
              <v-text-field label="title" v-model="post.title" required></v-text-field>
              <v-textarea label="content" v-model="post.content"></v-textarea>
            </v-flex>
            <v-flex xs12>
              <v-text-field label="tag" v-model="tag" @keyup.enter.native="makeTagChip"></v-text-field>
              <v-chip
                dark
                v-for="(item, index) in post.tags"
                :key="index"
                close
                @input="removeTag(index)"
              >{{item}}</v-chip>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
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
          <v-btn color="green darken-1" flat="flat" @click="dialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import { db } from "../config/db";
export default {
  data() {
    return {
      post: {
        title: "",
        content: "",
        tags: [], // db에 저장할 태그 배열
        date: new Date().toISOString().substr(0, 10)
      },
      tag: "", // 현재 입력하는 태그
      dialog: false,
      message: ""
    };
  },
  methods: {
    addPost() {
      if (this.title === "") {
        this.message = "Title is required";
        this.dialog = true;
      }
      db.collection("posts")
        .add({
          title: this.post.title,
          content: this.post.content,
          tag: this.post.tags,
          date: this.post.date
        })
        .then(response => {
          if (response) {
            this.post.title = "";
            this.post.content = "";
            this.post.tags = "";
            this.$router.push("/");
          }
        })
        .catch(error => alert(error.message));
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

<style>
</style>
