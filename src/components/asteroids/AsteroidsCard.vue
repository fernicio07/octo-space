<template>
  <v-card elevation="6">
    <v-card-title>{{ item.name }}</v-card-title>

    <v-card-text>
      <v-container fluid>
        <v-row>
          <v-col cols="12" sm="12" md>
            <div class="text-subtitle-1">Estimadated Diameter (miles)</div>
            <p class="body-1">
              <strong>Max:</strong>
              {{ item.estimated_diameter.miles.estimated_diameter_max }}

              <v-spacer />

              <strong>Min:</strong>
              {{ item.estimated_diameter.miles.estimated_diameter_min }}
            </p>
          </v-col>

          <v-col cols="12" sm="12" md>
            <div class="text-subtitle-1">
              Absolute Magnitude
              <p class="body-1">
                {{ item.absolute_magnitude_h }}
              </p>
            </div>
          </v-col>

          <v-col cols="12" sm="12" md>
            <div class="text-subtitle-1">
              NEO Reference Id
              <p class="body-1">
                {{ item.neo_reference_id }}
              </p>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "Apod",

  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },
};
</script>
