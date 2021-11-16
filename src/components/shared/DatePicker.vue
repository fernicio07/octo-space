<template>
  <v-row>
    <v-col cols="12" sm="6">
      <v-menu
        ref="startDateMenu"
        v-model="startDateMenu"
        :close-on-content-click="false"
        transition="scale-transition"
        offset-y
        max-width="290px"
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="sDate"
            label="Start Date"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="sDate" no-title scrollable>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="startDateMenu = false">
            Cancel
          </v-btn>
          <v-btn text color="primary" @click="passDate('start')"> OK </v-btn>
        </v-date-picker>
      </v-menu>
    </v-col>

    <v-col cols="12" sm="6">
      <v-menu
        ref="endDateMenu"
        v-model="endDateMenu"
        :close-on-content-click="false"
        transition="scale-transition"
        offset-y
        max-width="290px"
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="eDate"
            label="End Date"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="eDate" no-title scrollable>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="endDateMenu = false">
            Cancel
          </v-btn>
          <v-btn text color="primary" @click="passDate('end')"> OK </v-btn>
        </v-date-picker>
      </v-menu>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "DatePicker",

  props: {
    startDate: {
      type: String,
      default: () => "",
    },
  },

  data() {
    return {
      sDate: this.startDate,
      eDate: "",
      startDateMenu: false,
      endDateMenu: false,
      modal: false,
    };
  },
  methods: {
    passDate() {
      this.menu = false;
    },
  },
};
</script>
