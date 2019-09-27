import StatePromiseInterface from '@/interfaces/StatePromiseInterface';
import {Store} from 'vuex';

export default class AvailabilityStatePromiseAdapter implements StatePromiseInterface {
  public resourceData: any[];

  constructor() {
    this.resourceData = [];
  }

  /**
   * Assigns data from state to property
   *
   * @param resourceData object data object from state
   */
  public setState(resourceData: Store<any>) {

    console.log(resourceData.state.availability.value);
    debugger;
    this.resourceData = resourceData.state.availability.value;

    return this;
  }

  public async transform() {
    return new Promise((resolve, reject) => {
      if (this.resourceData.length >= 1) {
        const data = {
          data: this.resourceData,
        };
        resolve(data);
      } else {
        const why = 'There is no data list stored in state.';
        reject(why);
      }
    });
  }
}
