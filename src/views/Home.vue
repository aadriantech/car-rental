<template>
  <div class="home">
    <!-- START:: Forms -->
    <v-row>
      <v-col sm="3">
        <v-text-field
          label="Start Time"
          placeholder="click to open time"
          outlined
          v-model="startTime"
          @click="openTime('start')"
          :rules="timeRules"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col sm="3">
        <v-text-field
          label="End Time"
          placeholder="click to open time"
          outlined
          v-model="endTime"
          @click="openTime('end')"
          :rules="timeRules"
        ></v-text-field>
      </v-col>
    </v-row><!-- END:: Forms -->

    <!-- START:: Time Picker -->
    <v-row v-if="showTimePicker">
      <v-col sm="12" xl="12">
        <v-time-picker
          v-model="picker"
          width="250"
          height="200"
        ></v-time-picker>
      </v-col>
    </v-row>

    <v-row v-if="showTimePicker">
      <v-col class="offset-2 col-4">
        <v-btn
          color="error"
          @click="setValue"
        >
          Cancel
        </v-btn>
      </v-col>
      <v-col class="col-4">
        <v-btn
          @click="setValue"
          color="success"
        >
          Okay
        </v-btn>
      </v-col>
    </v-row>

    <v-row v-if="showSubmit">
      <v-col class="col-12">
        <v-btn
          @click="callAvailabilityApi"
          color="success"
        >
          Okay
        </v-btn>
      </v-col>
    </v-row><!-- END:: Time Picker -->

<!--    <v-row v-if="showMaps">-->
<!--      <google-maps v-bind:availabilityData="availabilityData"></google-maps>-->
<!--    </v-row>-->
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import RepositoryFactory from '@/factories/RepositoryFactory';
  import TimeInterface from '@/interfaces/TimeInterface';
  import GoogleMaps from '@/components/GoogleMaps.vue';

  @Component({
    components: {
      GoogleMaps,
    },
  })

  export default class Home extends Vue implements TimeInterface {

    public availabilityData: [] = [];
    public picker: string = '';
    public showTimePicker: boolean = false;
    public startTime: string = '';
    public endTime: string = '';
    public showMaps: boolean = true;
    public showSubmit: boolean = false;
    public type: string = '';
    public timeRules: [any] = [
      (v: any) => !!v || 'Time is required',
    ];

    /**
     * Get the availability data from API endpoint
     *
     * @return void
     */
    public async callAvailabilityApi() {
      const availabilityRepository = RepositoryFactory.get('availability');
      const {data} = await availabilityRepository.get(this.$store, this.startTime, this.endTime);
      this.availabilityData = data.data;
      if (this.availabilityData.length > 0) {
        console.log(this.availabilityData);
        this.showMaps = true;
      }
    }

    /**
     * Shows the submit button if time values exist
     *
     * @param show boolean
     * @return void
     */
    public checkValuesExist(show: boolean) {
      this.showSubmit = show;
    }

    /**
     * Displays the time picker on click of text field start or end
     *
     * @param type
     * @return void
     */
    public openTime(type: string) {
      this.showTimePicker = true;
      this.type = type;
    }

    /**
     * Stores the time values in a variable from the time picker
     *
     * @return void
     */
    public setValue() {
      if (this.type === 'start') {
        this.startTime = this.picker;
      } else if (this.type === 'end') {
        this.endTime = this.picker;
      }
      this.showTimePicker = false;

      if (this.startTime && this.endTime) {
        this.checkValuesExist(true);
      }
    }
  }
</script>

