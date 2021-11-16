<template>
  <v-app>
    <v-main>
      <h1 class="text-center">Astronomy Picture of the Day & NeoWs</h1>
      <Asteroids />
    </v-main>
  </v-app>
</template>

<script>
import Asteroids from "@/components/asteroids/Asteroids";

export default {
  name: "App",

  components: {
    Asteroids,
  },
};
</script>
