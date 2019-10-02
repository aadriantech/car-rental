import ResourceFactory from '../factories/ResourceFactory';
import AvailabilityStatePromiseAdapter from '../adapters/AvailabilityStatePromiseAdapter';
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
   * @param store object vuex store object
   * @param startTime string
   * @param endTime string
   *
   * @returns {Promise<AxiosResponse<T>>}
   */
  public async get(
    store: Store<any>,
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
      store,
      params,
    );

    const availabilityApiResource = new AvailabilityApiResource();
    const productStatePromiseAdapter = new AvailabilityStatePromiseAdapter();
    resource
      .setState(store.state.availability[startTimeKey + '-' + endTimeKey])
      .hasState(
        productStatePromiseAdapter,
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
