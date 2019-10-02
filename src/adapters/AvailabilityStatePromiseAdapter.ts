import StatePromiseInterface from '@/interfaces/StatePromiseInterface';
import {Store} from 'vuex';

class AvailabilityStatePromiseAdapter implements StatePromiseInterface {
  public resourceData?: Store<any>;

  /**
   * Assigns data from state to property
   *
   * @param resourceData object data object from state
   */
  public setState(resourceData: Store<any>) {
    this.resourceData = resourceData;

    return this;
  }

  public async transform() {
    return new Promise((resolve, reject) => {
      if (this.resourceData) {
        const data = {
          data: {
            data: this.resourceData,
          },
        };
        resolve(data);
      } else {
        const why = 'There is no data list stored in state.';
        reject(why);
      }
    });
  }
}

export default AvailabilityStatePromiseAdapter;
