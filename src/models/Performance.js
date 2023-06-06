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
      1: 'Cardio',
      2: 'Energie',
      3: 'Endurance',
      4: 'Force',
      5: 'Vitesse',
      6: 'Intensité',
    };

    this.#kind = kindMapping[value];
  }
}

export default Performance;
