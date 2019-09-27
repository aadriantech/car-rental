import Repository from '../repositories/Repository';
import ApiResourceInterface from '@/interfaces/ApiResourceInterface';
import ResourceParameterInterface from '@/interfaces/ResourceParameterInterface';

interface Params {
  startTime?: string;
  endTime?: string;
  limit?: number;
  page?: number;
}

export default class AvailabilityApiResource implements ApiResourceInterface {
  public params: Params;
  public products: object;
  public resourcePathName: string;
  public store: object;

  constructor() {
    this.params = {
      startTime: '',
      endTime: '',
      limit: 20,
      page: 1,
    };
    this.products = {};
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
  public setState(store) {
    this.store = store;

    return this;
  }

  /**
   * Retrieves products from the API Endpoint
   *
   * @returns {Promise<*>}
   */
  public async get() {
    const {
      startTime,
      endTime,
      limit,
      page,
    } = this.params;

    this.products = await Repository.post(`${this.resourcePathName}/buy_products`,
      {
        startTime,
        endTime,
        limit,
        page,
      });

    // save the products in the state
    this.storeResolve();

    return this.products;
  }

  /**
   * Stores the array data from promise to vuex state object
   *
   * @return void
   */
  public storeResolve() {
    const {data} = this.products;
    this.store.commit('setProducts', data.output);
  }
}
