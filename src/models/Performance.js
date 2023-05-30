class Performance {
  #kind;

  #value;

  constructor(value, kind) {
    this.#value = value;
    this.kind = kind;
  }

  get value() {
    return this.#value;
  }

  get kind() {
    return this.#kind;
  }

  set kind(value) {
    const kindMapping = {
      1: 'cardio',
      2: 'energy',
      3: 'endurance',
      4: 'strength',
      5: 'speed',
      6: 'intensity',
    };

    this.#kind = kindMapping[value];
  }
}

export default Performance;
