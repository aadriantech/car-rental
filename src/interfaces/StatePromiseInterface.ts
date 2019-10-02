import AvailabilityStatePromiseAdapter from '@/adapters/AvailabilityStatePromiseAdapter';
import {Store} from 'vuex';

interface StatePromiseInterface {
  setState(resourceData: Store<any>): AvailabilityStatePromiseAdapter;
  transform(): Promise<any>;
}

export default StatePromiseInterface;
