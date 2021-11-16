<template>
  <v-container>
    <DatePicker :startDate="startDate" />
  </v-container>
</template>

<script>
import moment from "moment";
// Components
import DatePicker from "@/components/shared/DatePicker";

export default {
  name: "Asteroids",

  components: {
    DatePicker,
  },

  data() {
    return {
      startDate: moment().format("YYYY-MM-DD"),
      endDate: "",
    };
  },
};
</script>
