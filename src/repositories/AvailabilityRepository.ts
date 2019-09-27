import ResourceFactory from '../factories/ResourceFactory';
import ProductStatePromiseAdapter from '../adapters/AvailabilityStatePromiseAdapter';
import AvailabilityApiResource from '../api/AvailabilityApiResource';
import DateTimeHelper from '@/helpers/DateTimeHelper';
import {Store} from 'vuex';

interface AvailabilityRepositoryInterface {
  resourcePathName: string;

  get(state: Store<any>,
      startTime: string,
      endTime: string,
  ): Promise<any>;
}

class AvailabilityRepository implements AvailabilityRepositoryInterface {

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
   *
   * @returns {Promise<AxiosResponse<T>>}
   */
  public async get(
    state: Store<any>,
    startTime: string,
    endTime: string,
  ): Promise<any> {

    const dateTimeHelper = new DateTimeHelper();
    const startTimeKey = dateTimeHelper
      .getToday()
      .convertTimeToday(startTime)
      .dateTimeToUnix()
      .unixTimeStamp;

    const endTimeKey = dateTimeHelper
      .getToday()
      .convertTimeToday(endTime)
      .dateTimeToUnix()
      .unixTimeStamp;

    const params = {
      resource: {
        startTime: startTimeKey,
        endTime: endTimeKey,
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
        startTimeKey + '-' + endTimeKey,
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
