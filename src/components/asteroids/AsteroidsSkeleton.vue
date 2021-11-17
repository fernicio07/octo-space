<template>
  <v-col>
    <v-card elevation="6">
      <v-skeleton-loader max-width="275" type="list-item" />

      <v-container fluid>
        <v-row>
          <v-col cols="12" sm="12" md>
            <v-skeleton-loader class="mx-auto" type="list-item" />
          </v-col>

          <v-col cols="12" sm="12" md>
            <v-skeleton-loader class="mx-auto" type="list-item" />
          </v-col>

          <v-col cols="12" sm="12" md>
            <v-skeleton-loader class="mx-auto" type="list-item" />
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-col>
</template>

<script>
export default {
  name: "AsteroidsSkeleton",
};
</script>
