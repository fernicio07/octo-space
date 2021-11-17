<template>
  <v-col cols="12" sm="12">
    <p class="title text-center">{{ todayImg.title }}</p>
    <v-img
      class="apod"
      contain
      max-width="500"
      max-height="500"
      :src="todayImg.url"
    />
  </v-col>
</template>

<script>
export default {
  name: "Apod",

  props: {
    todayImg: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style scoped>
.apod {
  display: block;
  margin: 0 auto;
}
</style>
