import AverageSessions from '../models/AverageSessions';

class AverageSessionsFactory {
  static create(data, type) {
    if (type === 'api') {
      return new AverageSessions(data);
    }
    return null;
  }
}

export default AverageSessionsFactory;
