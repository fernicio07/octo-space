<template>
  <div>
    <v-card elevation="6" @click="showCode(item.id)">
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

    <v-dialog v-model="show">
      <v-card contenteditable="" class="dialog-card">
        <pre v-html="JSON.stringify(data, null, 2)"></pre>
        <v-card-actions>
          <v-btn
            color="primary"
            class="text-right"
            text
            @click.stop="show = false"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Apod",

  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },

  data() {
    return {
      show: false,
      data: {},
    };
  },

  methods: {
    async showCode(id) {
      const response = await axios.get(
        `https://api.nasa.gov/neo/rest/v1/neo/${id}?api_key=09OBCUpBuwFoXsFPjyv4d9XvqOGkrd7DD1kDlB80`
      );
      this.data = response.data;
      delete this.data.close_approach_data; //deleting to make it shorter and readable.
      this.show = true;
    },
  },
};
</script>

<style scoped>
.dialog-card {
  background-color: #000;
  color: #00ff00;
  padding: 1rem;
}
</style>
