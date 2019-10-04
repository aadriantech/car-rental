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
  import 'google-maps-api-typings';
  import {createClient} from '@google/maps';
  import 'markerclustererplus';
  import MarkerClusterer from '@google/markerclusterer';

  @Component({
    components: {},
  })

  export default class GoogleMaps extends Vue {
    @Prop(Array) public readonly availabilityData!: [];

    public googleClient: any;

    constructor() {
      super();
      this.googleClient = createClient({
        key: `${process.env.VUE_APP_GOOGLE_MAPS_API_KEY}`,
        language: 'en',
        Promise: Promise
      });
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
      // const map = this.googleClient.Map(document.getElementById('map'), {
      //   zoom: 10,
      //   mapTypeControl: false,
      //   fullscreenControl: false,
      // });
      //
      // const address = 'Singapore';
      // this.googleClient
      //   .geocode({address})
      //   .asPromise()
      //   .then((response: any) => {
      //     response.json.results.forEach((result: any) => {
      //       console.log(response.geometry.location);
      //       debugger;
      //       map.setCenter(response.geometry.location);
      //     });
      //   });
      //
      // if (this.availabilityData.length > 0) {
      //   // Add some markers to the map.
      //   // Note: The code uses the JavaScript Array.prototype.map() method to
      //   // create an array of markers based on a given "this.hotelPickupPoints" array.
      //   // The map() method here has nothing to do with the Google Maps API.
      //   const markers = await this.availabilityData.map((availability: AvailabilityLocationsInterface) => {
      //     // @ts-ignore
      //     const marker = new google.maps.Marker({
      //       position: {
      //         lat: parseFloat(availability.location[0]),
      //         lng: parseFloat(availability.location[1]),
      //       },
      //       label: availability.available_cars.toString(),
      //       title: 'Click to see available drop off points',
      //       id: availability.id,
      //     });
      //
      //     // On Marker click event
      //     marker.addListener('click', () => {
      //       // do something
      //       console.log('do after click');
      //
      //       map.setZoom(8);
      //       map.setCenter(marker.getPosition());
      //
      //       this.hideGoogleMaps();
      //     });
      //
      //     return marker;
      //   });
      //
      //   // Add a marker Cluster to manage the markers.
      //   this.markerClusterer(map, markers);
      // }

      try {
        const google = await GoogleMapsHelper();

        // @ts-ignore
        const geoCoder = new google.maps.Geocoder();

        // @ts-ignore
        const map = new google.maps.Map(document.getElementById('map'), {
          zoom: 10,
          mapTypeControl: false,
          fullscreenControl: false,
        });

        const address = 'Singapore';
        geoCoder.geocode({address}, (results: any, status: any) => {
          if (status !== 'OK' || !results[0]) {
            throw new Error(status);
          }

          // set Center of Map
          map.setCenter(results[0].geometry.location);
        });

        if (this.availabilityData.length > 0) {
          // Add some markers to the map.
          // Note: The code uses the JavaScript Array.prototype.map() method to
          // create an array of markers based on a given "this.hotelPickupPoints" array.
          // The map() method here has nothing to do with the Google Maps API.
          const markers = await this.availabilityData.map((availability: AvailabilityLocationsInterface) => {
            // @ts-ignore
            const marker = new google.maps.Marker({
              position: {
                lat: parseFloat(availability.location[0]),
                lng: parseFloat(availability.location[1]),
              },
              label: availability.available_cars.toString(),
              title: 'Click to see available drop off points',
              id: availability.id,
            });

            // On Marker click event
            marker.addListener('click', () => {
              // do something
              console.log('do after click');

              map.setZoom(8);
              map.setCenter(marker.getPosition());

              this.hideGoogleMaps(true);
            });

            return marker;
          });

          // Add a marker Cluster to manage the markers.
          this.markerClusterer(map, markers);
        }
      } catch (error) {
        console.error(error);
      }
    }

    /**
     * Hides the google map after choosing a car pickup point
     *
     * @return void
     */
    hideGoogleMaps() {
      this.$emit('hide-google-maps', true);
    }

    /**
     * Sets the Marker cluster google feature
     *
     // * @return MarkerClusterer
     */
    markerClusterer(map: any, markers: any) {
      return new MarkerClusterer(
        map,
        markers,
        {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'},
      );
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
