<template>
  <v-flex xs12>
    <v-card flat>
      <v-card-title>
        <span class="display-1 font-weight-bold">Archive</span>
        <v-spacer></v-spacer>
        <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="posts"
        :search="search"
        flat
        disable-initial-sort
        class="elevation-1"
      >
        <template v-slot:items="props">
          <tr>
            <td class="text-xs-left">{{ props.item.date }}</td>
            <td
              class="text-xs-left"
              @click.prevent="$router.push(`/post/${props.item.id}`)"
            >{{ props.item.title }}</td>
            <td class="text-xs-left">{{ props.item.content | truncate(100, '...') }}</td>
            <td class="text-xs-left">
              <v-chip gray v-for="(tag, index) in props.item.tags" :key="index">{{tag}}</v-chip>
            </td>
          </tr>
        </template>
        <template v-slot:no-results>
          <v-alert
            :value="true"
            color="error"
            icon="warning"
          >Your search for "{{ search }}" found no results.</v-alert>
        </template>
      </v-data-table>
    </v-card>
  </v-flex>
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
      search: "",
      headers: [
        { text: "Date", value: "date", width: "14%" },
        { text: "Title", value: "title", width: "20%" },
        { text: "Content", value: "content", sortable: false, width: "41%" },
        { text: "Tags", value: "tags", width: "25%" }
      ]
    };
  }
};
</script>

<style scoped>
.post__title {
  font-weight: 700;
  cursor: pointer;
}
</style>
