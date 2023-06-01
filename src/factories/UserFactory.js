import User from '../models/User';

class UserFactory {
  static create(data, type) {
    if (type === 'api') {
      return new User(data);
    }
    return null;
  }
}

export default UserFactory;
