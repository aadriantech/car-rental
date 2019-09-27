<template>
  <v-app id="main">
    <!-- START::Navigation Bar -->
    <nav-bar></nav-bar><!-- END::Navigation Bar -->

    <!--START::Content-->
    <v-content>
      <v-container
        fluid
      >
        <router-view></router-view>
      </v-container>
    </v-content><!--END::Content-->

    <!-- START::Footer Bar -->
    <footer-bar></footer-bar><!-- END::Footer Bar -->
  </v-app>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import NavBar from '@/components/layouts/NavBar.vue';
  import FooterBar from '@/components/layouts/FooterBar.vue';

  @Component({
    components: {
      NavBar,
      FooterBar,
    },
  })

  export default class App extends Vue {}
</script>

