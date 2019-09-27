import ResourceFactory from '../factories/ResourceFactory';
import ProductStatePromiseAdapter from '../adapters/AvailabilityStatePromiseAdapter';
import AvailabilityApiResource from '../api/AvailabilityApiResource';
import {Store} from 'vuex';

class AvailabilityRepository {

  public resourcePathName: string;

  constructor() {
    this.resourcePathName = '/availability';
  }

  /**
   * Retrieves the list of car availabilities from API Endpoint
   *
   * @param state object vuex state object
   * @param startTime string
   * @param endTime string
   * @param limit number
   * @param page number
   *
   * @returns {Promise<AxiosResponse<T>>}
   */
  public async getAvailability(
    state: any,
    startTime: string,
    endTime: string,
    limit = 20,
    page = 1,
  ) {
    const params = {
      resource: {
        startTime,
        endTime,
        limit,
        page,
      },
    };

    const resource = new ResourceFactory(
      state,
      params,
    );

    const availabilityApiResource = new AvailabilityApiResource();
    const productStatePromiseAdapter = new ProductStatePromiseAdapter();
    resource
      .hasState(
        productStatePromiseAdapter,
        'productList',
      )
      .hasApi(
        availabilityApiResource,
        this.resourcePathName,
        params,
      );
    await resource.resource();

    return resource.get;
  }
}

export default new AvailabilityRepository();
