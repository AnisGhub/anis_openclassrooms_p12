/**
 * Class representing a Performance.
 * @class
 */
class Performance {
  /**
   * Create a Performance.
   * @constructor
   * @param {number} value - The value of the performance.
   * @param {number} kind - The kind of the performance.
   */
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

  /**
   * Set the kind of the performance.
   * @param {number} value - The value representing the kind of the performance.
   */
  set kind(value) {
    /**
     * A mapping of kind values to their corresponding labels.
     * @type {Object<number, string>}
     */
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
