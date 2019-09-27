import AvailabilityRepository from '../repositories/AvailabilityRepository';

class RepositoryFactory {
  public repositories: any;

  constructor() {
    this.repositories = {
      availability: AvailabilityRepository,
    };
  }

  /**
   * Retrieves the API Resource
   *
   * @param resource
   */
  public get(resource: string) {
    return this.repositories[resource];
  }
}

export default new RepositoryFactory();
