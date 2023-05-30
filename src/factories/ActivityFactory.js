import Activity from '../models/Activity';

class ActivityFactory {
  static create(data, type) {
    if (type === 'api') {
      return new Activity(data);
    }
    return null;
  }
}

export default ActivityFactory;
