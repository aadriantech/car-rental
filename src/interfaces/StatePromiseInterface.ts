import AvailabilityStatePromiseAdapter from '@/adapters/AvailabilityStatePromiseAdapter';

interface StatePromiseInterface {
  setState(resourceData: [any]): AvailabilityStatePromiseAdapter;
  transform(): Promise<any>;
}

export default StatePromiseInterface;
