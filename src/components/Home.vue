<template>
  <v-container id="input-usage" grid-list-xl fluid>
    <v-layout wrap align-center>
      <v-flex xs12>
          <div class="display-3 text-align-center">Welcome, {{ name }}</div>
        <v-btn fab dark color="gray">
          <v-icon dark @click="$router.push('/create')">+</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["uid", "name"])
  },
};
</script>
<style scoped>
.text-align-center{
    text-align: center;
}
</style>