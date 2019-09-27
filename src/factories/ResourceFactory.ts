import AvailabilityResourceInterface from '@/interfaces/AvailabilityResourceInterface';
import {Store} from 'vuex';
import StatePromiseInterface from '@/interfaces/StatePromiseInterface';
import ApiResourceInterface from '@/interfaces/ApiResourceInterface';

export default class ResourceFactory implements AvailabilityResourceInterface {
  public get: object;
  public params: object;
  public promise: object;
  public store: Store<any>;
  public state: any[string];

  /**
   * Defines the resources
   *
   * @param store object vuex state object
   * @param params object api parameters
   */
  constructor(store: any, params: object) {
    this.get = {};
    this.params = params;
    this.promise = {};
    this.store = store;
    this.state = store.state;
  }

  /**
   * Checks if there is availability stored in the state
   * if exists, uses state values as a promise
   *
   * @param adapter object instance of State Promise Adapter
   * @param stateKey string property of vuex state object
   *
   * @returns {ResourceFactory}
   */
  public hasState(adapter: StatePromiseInterface, stateKey: string) {
    this.promise = adapter
      .setState(this.state[stateKey])
      .transform();

    return this;
  }

  /**
   * Checks if there is API Resource
   *
   * @param resource object API resource
   * @param resourcePathName string URL of API Endpoint
   * @param apiParams object required parameters of an API resource
   * @returns {ResourceFactory}
   */
  public hasApi(resource: ApiResourceInterface, resourcePathName: string, apiParams: object) {
    this.promise = resource
      .setParams(apiParams)
      .setResourcePath(resourcePathName)
      .setState(this.store)
      .get();

    return this;
  }

  /**
   * Get all data from applicable resource
   *
   * @returns {Promise<ResourceFactory>}
   */
  public async resource(): Promise<any> {
    this.get = await this.promise;

    return this;
  }
}