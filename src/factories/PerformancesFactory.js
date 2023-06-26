import Performance from '../models/Performance';
/**
 * Factory class for creating Performance instances.
 *
 * @class
 */
class PerformancesFactory {
  /**
   * Creates Performance instances based on the provided data.
   *
   * @static
   * @param {Object} data - The data to create Performance instances from.
   * @param {string} type - The type of data (e.g., 'api').
   * @returns {Array<Performance>|null} An array of Performance instances,
   * or null if the type is not supported
   */
  static create(data, type) {
    if (type === 'api') {
      return data.data.map((item) => {
        const { value, kind } = item;
        return new Performance(value, kind);
      });
    }
    return null;
  }
}

export default PerformancesFactory;
