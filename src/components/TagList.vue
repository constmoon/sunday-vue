<template>
  <v-container id="input-usage" grid-list-xl fluid>
    <v-layout row justify-space-between>
      <v-flex xs12>
        <v-card flat>
          <v-card-title class="display-1 font-weight-bold">Tag: {{ tag }}</v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
    data() {
        return {
            tag: ''
        }
    }
};
</script>

<style>
</style>
