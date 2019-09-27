import ResourceParameterInterface from '@/interfaces/ResourceParameterInterface';
import AvailabilityApiResource from '@/api/AvailabilityApiResource';

interface ApiResourceInterface {
  productParams: object;
  products: object;
  resourcePathName: string;
  store: object;

  /**
   * Assigns parameter values to property
   *
   * @param params object required parameters of the API endpoint
   * @returns {AvailabilityApiResource}
   */
  setParams(params: ResourceParameterInterface): AvailabilityApiResource;

  /**
   * Assigns the resource url of API endpoint to property
   *
   * @param resourcePathName string
   * @returns {AvailabilityApiResource}
   */
  setResourcePath(resourcePathName: string): ApiResourceInterface;

  /**
   * Assigns the vuex state object to property
   *
   * @param store object vuex state object
   * @returns {AvailabilityApiResource}
   */
  setState(store);

  /**
   * Retrieves products from the API Endpoint
   *
   * @returns {Promise<*>}
   */
  get();

  /**
   * Stores the array data from promise to vuex state object
   *
   * @return void
   */
  storeResolve();
}

export default ApiResourceInterface;
