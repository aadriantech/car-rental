interface TimeInterface {
  availabilityData: [];
  picker: string;
  showTimePicker: boolean;
  startTime: string;
  endTime: string;
  showMaps: boolean;
  showSubmit: boolean;
  type: string;
  timeRules: [any];

  /**
   * Displays the time picker on click of text field start or end
   *
   * @param type
   * @return void
   */
  openTime(type: string): void;

  /**
   * Stores the time values in a variable from the time picker
   *
   * @return void
   */
  setValue(): void;
}

export default TimeInterface;
