class Activity {
  #userId;

  #sessions;

  constructor(data) {
    this.#userId = data.userId;
    this.#sessions = data.sessions;
  }

  get userId() {
    return this.#userId;
  }

  get sessions() {
    return this.#sessions;
  }

  set sessions(newValues) {
    this.#sessions = newValues;
  }
}

export default Activity;
