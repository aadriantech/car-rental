interface AvailabilityLocationsInterface {
  id: number;
  location: [string, string];
  available_cars: number;
  dropoff_locations: object[];
}

export default AvailabilityLocationsInterface;
