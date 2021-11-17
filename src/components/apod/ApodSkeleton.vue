<template>
  <v-col cols="12" sm="12">
    <v-skeleton-loader class="mx-auto" max-width="275" type="list-item" />
    <v-skeleton-loader class="mx-auto" max-width="500" type="image" />
  </v-col>
</template>

<script>
export default {
  name: "ApodSkeleton",
};
</script>
