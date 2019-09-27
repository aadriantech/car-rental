import Repository from '../repositories/Repository';
import ApiResourceInterface from '@/interfaces/ApiResourceInterface';
import AvailabilityParamsInterface from '@/interfaces/AvailabilityParamsInterface';
import AvailabilityDataInterface from '@/interfaces/AvailabilityDataInterface';
import ResourceParameterInterface from '@/interfaces/ResourceParameterInterface';
import {Store} from 'vuex';

export default class AvailabilityApiResource implements ApiResourceInterface {
  public params: AvailabilityParamsInterface;
  public resource: AvailabilityDataInterface;
  public resourcePathName: string;
  public store: any;

  constructor() {
    this.params = {
      startTime: '',
      endTime: '',
      limit: 20,
      page: 1,
    };
    this.resource = {};
    this.resourcePathName = '';
    this.store = {};
  }

  /**
   * Assigns parameter values to property
   * @param params ResourceParameterInterface
   *
   * @return AvailabilityApiResource
   */
  public setParams(params: ResourceParameterInterface): AvailabilityApiResource {
    this.params = params.resource;

    return this;
  }

  /**
   * Assigns the resource url of API endpoint to property
   *
   * @param resourcePathName string
   * @returns {AvailabilityApiResource}
   */
  public setResourcePath(resourcePathName: string): AvailabilityApiResource {
    this.resourcePathName = resourcePathName;

    return this;
  }

  /**
   * Assigns the vuex state object to property
   *
   * @param store object vuex state object
   * @returns {AvailabilityApiResource}
   */
  public setState(store: Store<any>): AvailabilityApiResource {
    this.store = store;

    return this;
  }

  /**
   * Retrieves resource from the API Endpoint
   *
   * @returns {Promise<*>}
   */
  public async get(): Promise<any> {
    const {
      startTime,
      endTime,
      limit,
      page,
    } = this.params;

    this.resource = await Repository.post(`${this.resourcePathName}/buy_resource`,
      {
        startTime,
        endTime,
        limit,
        page,
      });

    // save the resource in the state
    this.storeResolve();

    return this.resource;
  }

  /**
   * Stores the array resource from promise to vuex state object
   *
   * @return void
   */
  public storeResolve(): void {
    const {data} = this.resource;
    this.store.commit('setAvailability',
      {
        params: this.params,
        data,
      },
    );
  }
}
