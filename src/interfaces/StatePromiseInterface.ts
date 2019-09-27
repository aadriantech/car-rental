import AvailabilityStatePromiseAdapter from '@/adapters/AvailabilityStatePromiseAdapter';

interface StatePromiseInterface {
  setState(productList: any): AvailabilityStatePromiseAdapter;
  transform(): Promise<any>;
}

export default StatePromiseInterface;
