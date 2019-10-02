import ResourceFactory from '@/factories/ResourceFactory';
import StatePromiseInterface from '@/interfaces/StatePromiseInterface';
import ApiResourceInterface from '@/interfaces/ApiResourceInterface';
import {Store} from 'vuex';

interface AvailabilityResourceInterface {
  setState(state: Store<any>): void;
  hasState(adapter: StatePromiseInterface): ResourceFactory;
  hasApi(resource: ApiResourceInterface, resourcePathName: string, apiParams: object): ResourceFactory;
  resource(): Promise<any>;
}

export default AvailabilityResourceInterface;
