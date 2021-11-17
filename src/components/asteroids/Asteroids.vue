<template>
  <v-container>
    <DatePicker
      :startDate="startDate"
      @changeDate="getAPOD($event)"
      @changeDateAsteroide="getAsteroids($event)"
    />

    <v-row class="nasa-box">
      <Apod :todayImg="todayImg" />

      <p class="subtitle-1" v-if="totalCount != 0">
        Total Asteroids Count: <strong>{{ totalCount }}</strong>
      </p>

      <v-col cols="12" sm="12" v-for="(asteroid, id) in asteroids" :key="id">
        <v-col cols="12" sm="12" v-for="item in asteroid" :key="item.idx">
          <AsteroidsCard :item="item" />
        </v-col>
      </v-col>
    </v-row>

    <v-snackbar v-model="snackbarError" color="error" top right outlined>
      {{ errorMessage }}
    </v-snackbar>
  </v-container>
</template>

<script>
import axios from "axios";
import moment from "moment";
// Components
import Apod from "@/components/apod/Apod";
import AsteroidsCard from "@/components/asteroids/AsteroidsCard";
import DatePicker from "@/components/shared/DatePicker";

export default {
  name: "Asteroids",

  components: {
    Apod,
    AsteroidsCard,
    DatePicker,
  },

  data() {
    return {
      startDate: moment().format("YYYY-MM-DD"),
      endDate: "",
      asteroids: {},
      todayImg: "",
      errorMessage: "",
      snackbarError: false,
      totalCount: 0,
    };
  },

  mounted() {
    this.getAPOD({ status: "start", date: this.startDate });
    this.getAsteroids({ status: "start", date: this.startDate });
  },

  methods: {
    async getAsteroids(event) {
      if (event.status == "start") {
        this.startDate = event.date;
      } else if (event.status == "end") {
        this.endDate = event.date;
      }

      let response = false;

      try {
        if (this.endDate != "") {
          response = await axios.get(
            `https://api.nasa.gov/neo/rest/v1/feed?api_key=09OBCUpBuwFoXsFPjyv4d9XvqOGkrd7DD1kDlB80&start_date=${this.startDate}&end_date=${this.endDate}`
          );
        } else {
          response = await axios.get(
            `https://api.nasa.gov/neo/rest/v1/feed?api_key=09OBCUpBuwFoXsFPjyv4d9XvqOGkrd7DD1kDlB80&start_date=${this.startDate}`
          );
        }

        this.totalCount = response.data.element_count;
        this.asteroids = response.data.near_earth_objects;
      } catch (error) {
        this.errorMessage = error;
        this.snackbarError = true;
      }
    },

    async getAPOD(event) {
      if (event.status == "start") {
        this.startDate = event.date;
      } else if (event.status == "end") {
        this.endDate = event.date;
      }

      let response = false;

      try {
        if (this.endDate != "") {
          response = await axios.get(
            `https://api.nasa.gov/planetary/apod?api_key=09OBCUpBuwFoXsFPjyv4d9XvqOGkrd7DD1kDlB80&start_date=${this.startDate}&end_date=${this.endDate}`
          );
        } else {
          response = await axios.get(
            `https://api.nasa.gov/planetary/apod?api_key=09OBCUpBuwFoXsFPjyv4d9XvqOGkrd7DD1kDlB80&start_date=${this.startDate}`
          );
        }

        var index = Math.floor(Math.random() * response.data.length);
        this.todayImg = response.data[index];
      } catch (error) {
        this.errorMessage = error;
        this.snackbarError = true;
      }
    },
  },
};
</script>

<style scoped>
.nasa-box {
  border: 1px solid #b8b8b8;
  border-radius: 20px;
  padding: 1rem;
}
</style>
