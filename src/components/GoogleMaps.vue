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
  // @ts-ignore
  import * as MarkerClusterer from '@google/markerclusterer';

  @Component({
    components: {},
  })

  export default class GoogleMaps extends Vue {
    @Prop(Array) public readonly availabilityData!: [];

    public googleMaps?: Promise<any>;

    constructor() {
      super();
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
        this.googleMaps = await GoogleMapsHelper();

        // @ts-ignore
        const geoCoder = new this.googleMaps.maps.Geocoder();

        // @ts-ignore
        const mapInit = this.initMap(this.googleMaps, 10);
        const map = this.geocodeCountry(mapInit, geoCoder, 'Singapore');

        if (this.availabilityData.length > 0) {
          // Add some markers to the map.
          // Note: The code uses the JavaScript Array.prototype.map() method to
          // create an array of markers based on a given "this.hotelPickupPoints" array.
          // The map() method here has nothing to do with the Google Maps API.
          const markers = this.availabilityData.map((availability: AvailabilityLocationsInterface) => {
            // @ts-ignore
            const marker = new this.googleMaps.maps.Marker({
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
              // @ts-ignore
              const directionsService = new this.googleMaps.maps.DirectionsService();
              // @ts-ignore
              const directionsRenderer = new this.googleMaps.maps.DirectionsRenderer();
              // @ts-ignore
              const regenerateMap = this.initMap(this.googleMaps, 12);
              const directionsMap = this.geocodeCountry(regenerateMap, geoCoder, 'Singapore');
              directionsRenderer.setMap(directionsMap);

              const start = `${availability.location[0]}, ${availability.location[1]}`;
              // @ts-ignore
              const lat = availability.dropoff_locations[0].location[0];
              // @ts-ignore
              const long = availability.dropoff_locations[0].location[1];
              const end = `${lat}, ${long}`;
              const request = {
                origin: start,
                destination: end,
                travelMode: 'DRIVING',
              };

              directionsService.route(request, (result: any, status: any) => {
                if (status === 'OK') {
                  directionsRenderer.setDirections(result);
                }
              });
            });

            return marker;
          });

          // Add a marker Cluster to manage the markers.
          this.markerClusterer(map, markers);
        }
      } catch (error) {
        throw new Error(error);
      }
    }

    /**
     * Returns geocode object for google maps set center options
     *
     * @return map google maps object
     */
    public geocodeCountry(map: any, geoCoder: any, country: string) {
      geoCoder.geocode({address: country}, (results: any, status: any) => {
        if (status !== 'OK' || !results[0]) {
          throw new Error(status);
        }

        // set Center of Map
        map.setCenter(results[0].geometry.location);
      });

      return map;
    }

    /**
     * Sets the Marker cluster google feature
     *
     * @return MarkerClusterer
     */
    public markerClusterer(map: any, markers: any) {
      return new MarkerClusterer(
        map,
        markers,
        {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'},
      );
    }

    /**
     * Initializes the google map api object
     *
     * @param googleMaps
     * @param zoomValue
     */
    public initMap(googleMaps: any, zoomValue: number) {
      return new googleMaps.maps.Map(document.getElementById('map'), {
        zoom: zoomValue,
      });
    }
  }

</script>

<style lang="scss" scoped>
  .google-map {
    height: 40vh;
  }
</style>
