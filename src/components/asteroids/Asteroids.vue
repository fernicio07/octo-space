<template>
  <v-container>
    <DatePicker
      :startDate="startDate"
      @changeDate="getAPOD($event)"
      @changeDateAsteroide="getAsteroids($event)"
    />

    <v-row class="nasa-box">
      <ApodSkeleton v-if="loadingApod" />
      <Apod v-else :todayImg="todayImg" />

      <v-col cols="12" sm="12" v-if="totalCount != 0">
        <v-text-field
          label="Search Asteroids"
          v-model="searchQuery"
        ></v-text-field>

        <v-select
          :items="magnitudItems"
          v-model="selectedMagnitud"
          label="Magnitude"
        ></v-select>

        <p class="subtitle-1 count">
          Total Asteroids Count: <strong>{{ totalCount }}</strong>
        </p>
      </v-col>

      <AsteroidsSkeleton v-if="loadingAsteroids" />
      <v-col
        cols="12"
        sm="12"
        v-else
        v-for="item in asteroidsFiltered"
        :key="item.id"
      >
        <AsteroidsCard :item="item" />
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
import ApodSkeleton from "@/components/apod/ApodSkeleton";
import AsteroidsSkeleton from "@/components/asteroids/AsteroidsSkeleton";
import AsteroidsCard from "@/components/asteroids/AsteroidsCard";
import DatePicker from "@/components/shared/DatePicker";

export default {
  name: "Asteroids",

  components: {
    Apod,
    ApodSkeleton,
    AsteroidsCard,
    AsteroidsSkeleton,
    DatePicker,
  },

  data() {
    return {
      startDate: moment().format("YYYY-MM-DD"),
      endDate: "",
      asteroids: {},
      todayImg: "",
      errorMessage: "",
      loadingApod: true,
      loadingAsteroids: true,
      snackbarError: false,
      totalCount: 0,
      searchQuery: "",
      magnitudItems: "",
      selectedMagnitud: "",
    };
  },

  computed: {
    asteroidsFiltered() {
      if (this.searchQuery || this.selectedMagnitud) {
        return this.asteroids
          .filter((item) => {
            return this.searchQuery
              .toLowerCase()
              .split(" ")
              .every((v) => item.name.toLowerCase().includes(v));
          })
          .filter(
            (asteroid) => asteroid.absolute_magnitude_h >= this.selectedMagnitud
          )
          .sort((a, b) => a.absolute_magnitude_h < b.absolute_magnitude_h);
      } else {
        return this.asteroids;
      }
    },
  },

  mounted() {
    this.getAPOD({ status: "start", date: this.startDate });
    this.getAsteroids({ status: "start", date: this.startDate });
  },

  methods: {
    async getAsteroids(event) {
      this.loadingAsteroids = true;
      this.totalCount = 0;

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

        this.asteroids = Object.keys(this.asteroids)
          .map((key) => {
            return this.asteroids[key];
          })
          .flat();
        this.magnitudItems = this.asteroids.map(
          (item) => item.absolute_magnitude_h
        );

        this.loadingAsteroids = false;
      } catch (error) {
        this.errorMessage = error;
        this.snackbarError = true;
      }
    },

    async getAPOD(event) {
      this.loadingApod = true;

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
        this.loadingApod = false;
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

.count {
  margin-left: 1.5rem;
}
</style>
