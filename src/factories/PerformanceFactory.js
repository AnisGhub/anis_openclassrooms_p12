import Performance from '../models/Performance';

class PerformanceFactory {
  static create(data, type) {
    if (type === 'api') {
      const { value, kind } = data;
      return new Performance(value, kind);
    }
    return null;
  }
}

export default PerformanceFactory;
