import StatePromiseInterface from '@/interfaces/StatePromiseInterface';

export default class AvailabilityStatePromiseAdapter implements StatePromiseInterface {
  public productList: any[];

  constructor() {
    this.productList = [];
  }

  /**
   * Assigns products from state to property
   *
   * @param productList object products object from state
   */
  public setState(productList: any) {
    this.productList = productList;

    return this;
  }

  public async transform() {
    return new Promise((resolve, reject) => {
      if (this.productList.length >= 1) {
        const products = {
          data: {
            output: this.productList,
          },
        };
        resolve(products);
      } else {
        const why = 'There is no product list stored in state.';
        reject(why);
      }
    });
  }
}
