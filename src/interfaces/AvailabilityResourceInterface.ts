import ResourceFactory from '@/factories/ResourceFactory';
import StatePromiseInterface from '@/interfaces/StatePromiseInterface';
import ApiResourceInterface from '@/interfaces/ApiResourceInterface';

interface AvailabilityResourceInterface {
  hasState(adapter: StatePromiseInterface, stateKey: string): ResourceFactory;
  hasApi(resource: ApiResourceInterface, resourcePathName: string, apiParams: object): ResourceFactory;
  resource(): Promise<any>;
}

export default AvailabilityResourceInterface;
