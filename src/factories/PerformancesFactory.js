import Performance from '../models/Performance';

class PerformancesFactory {
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
