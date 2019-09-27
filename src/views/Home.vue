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
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import Repository from '@/repositories/Repository';

  interface Time {
    openTime(type: string): void;

    setValue(): void;
  }

  @Component({
    components: {},
  })

  export default class Home extends Vue implements Time {

    public picker: string = '';
    public showTimePicker: boolean = false;
    public startTime: string = '';
    public endTime: string = '';
    public showSubmit: boolean = false;
    public type: string = '';
    public timeRules: [any] = [
      (v: any) => !!v || 'Time is required',
    ];

    public callAvailabilityApi() {
      Repository.get('availability');
    }

    public checkValuesExist(show: boolean) {
      this.showSubmit = show;
    }

    public openTime(type: string) {
      this.showTimePicker = true;
      this.type = type;
    }

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
