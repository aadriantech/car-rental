<template>
  <div>
    <div id="google_maps_header"></div>
    <div id="map" class="google-map"></div>
  </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';
  import AvailabilityLocationsInterface from '@/interfaces/AvailabilityLocationsInterface';
  import GoogleMapsHelper from '@/helpers/GoogleMapsHelper';
  import Google from '@/helpers/Google';

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

    /**
     * Loads the google map that contains availability points
     *
     * @returns {Promise<void>}
     */
    public async loadGoogleMaps(listener: ((this: MediaQueryList, ev: MediaQueryListEvent) => any) | null) {
      try {
        const googleMapsHelper = new GoogleMapsHelper(window);
        const googleService = await googleMapsHelper.init();
        const google = new Google(googleService);
        const geoCoder = new google.maps.Geocoder();
        const map = new google.maps.Map(document.getElementById('map'), {
          zoom: 7,
          mapTypeControl: false,
          fullscreenControl: false,
        });

        // map.controls[google.maps.ControlPosition.TOP_CENTER].push(this.$refs.markers_dropdown);
        // this.displaySearch = true;
        // geoCoder.geocode({ address: this.country }, (results, status) => {
        //   if (status !== 'OK' || !results[0]) {
        //     throw new Error(status);
        //   }
        //
        //   // set Center of Map
        //   map.setCenter(results[0].geometry.location);
        //   // map.fitBounds(results[0].geometry.viewport);
        // });
        //
        // this.map = map;

        if (this.availabilityData.length > 0) {
          // Add some markers to the map.
          // Note: The code uses the JavaScript Array.prototype.map() method to
          // create an array of markers based on a given "this.hotelPickupPoints" array.
          // The map() method here has nothing to do with the Google Maps API.
          const markers = await this.availabilityData.map((availability: AvailabilityLocationsInterface) => {
            const marker = new google.maps.Marker({
              position: {
                lat: parseFloat(availability.location[0]),
                lng: parseFloat(availability.location[1]),
              },
              label: availability.available_cars,
              title: 'Click to see possible drop of locations',
              id: availability.id,
            });

            // On Marker click event
            marker.addListener('click', () => {
              // do something
              console.log('test click on marker');

              map.setZoom(8);
              map.setCenter(marker.getPosition());
            });

            return marker;
          });

          // Add a marker Cluster to manage the markers.
          // this.markerClusterer(map, markers);
        }
      } catch (error) {
        throw new Error(error);
      }
    }
  }

</script>

<style lang="scss" scoped>
  .google-map {
    width: 92vw;
    height: 85vh;
  }
</style>
