<template>
  <v-bottom-navigation
    v-model="bottomNav"
    app
    color="orange darken-1"
    fixed
    grow
    :value="activeItem"
  >
    <v-btn value="recent">
      <span>Recent</span>
      <v-icon>mdi-history</v-icon>
    </v-btn>

    <v-btn value="favorites">
      <span>Favorites</span>
      <v-icon>mdi-heart</v-icon>
    </v-btn>

    <v-btn value="nearby">
      <span>Nearby</span>
      <v-icon>mdi-map-marker</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';

  @Component({
    components: {},
  })

  export default class Footer extends Vue {
    public bottomNav: string = 'recent';
    public activeItem: string = 'top';
  }
</script>
