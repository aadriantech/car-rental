<template>
  <v-row>
    <v-col>
      <div id="google_maps_header"></div>
      <div id="map" class="google-map"></div>
    </v-col>
  </v-row>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';
  import AvailabilityLocationsInterface from '@/interfaces/AvailabilityLocationsInterface';
  import GoogleMapsHelper from '@/helpers/GoogleMapsHelper';

  @Component({
    components: {},
  })

  export default class GoogleMaps extends Vue {
    @Prop(Array) public readonly availabilityData!: [];

    constructor() {
      super();
      console.log('test');
      console.log(this.availabilityData);
    }

    public created() {
      this.loadGoogleMaps();
    }

    /**
     * Loads the google map that contains hotels
     *
     * @returns {Promise<void>}
     */
    public async loadGoogleMaps() {
      try {
        const google = await GoogleMapsHelper();

        // @ts-ignore
        const geoCoder = new google.maps.Geocoder();

        // @ts-ignore
        const map = new google.maps.Map(document.getElementById('map'), {
          zoom: 7,
          mapTypeControl: false,
          fullscreenControl: false,
        });

        if (this.availabilityData.length > 0) {
          // Add some markers to the map.
          // Note: The code uses the JavaScript Array.prototype.map() method to
          // create an array of markers based on a given "this.availabilityData" array.
          // The map() method here has nothing to do with the Google Maps API.
          const markers = this.availabilityData.map((location: any) => {
            // @ts-ignore
            const marker = new google.maps.Marker({
              position: {
                lat: parseFloat(location.location[0]),
                lng: parseFloat(location.location[1]),
              },
              label: location.hotel_name,
              title: 'Click to save location',
              id: location.id,
            });

            // On Marker click event
            marker.addListener('click', () => {
              map.setZoom(8);
              map.setCenter(marker.getPosition());
            });

            return marker;
          });

          // Add a marker Cluster to manage the markers.
          // this.markerClusterer(map, markers);
        }
      } catch (error) {
        console.error(error);
      }
    }
  }

</script>

<style lang="scss" scoped>
  /* Optional: Makes the sample page fill the window. */
  /*html, body {*/
  /*  height: 100%;*/
  /*  margin: 0;*/
  /*  padding: 0;*/
  /*}*/
  .google-map {
    height: 20vh;
  }
  /* Always set the map height explicitly to define the size of the div
   * element that contains the map. */
  /*#map {*/
  /*  height: 100%;*/
  /*  width: 100%;*/
  /*}*/
</style>
