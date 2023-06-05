class User {
  #userId;

  #firstName;

  #lastName;

  #age;

  #score;

  #calorieCount;

  #proteinCount;

  #carbohydrateCount;

  #lipidCount;

  constructor(data) {
    this.#userId = data.id;
    this.#firstName = data.userInfos.firstName;
    this.#lastName = data.userInfos.lastName;
    this.#age = data.userInfos.age;
    this.#score = data.score;
    this.#calorieCount = data.keyData.calorieCount;
    this.#proteinCount = data.keyData.proteinCount;
    this.#carbohydrateCount = data.keyData.carbohydrateCount;
    this.#lipidCount = data.keyData.lipidCount;
  }

  get userId() {
    return this.#userId;
  }

  get firstName() {
    return this.#firstName;
  }

  get lastName() {
    return this.#lastName;
  }

  get age() {
    return this.#age;
  }

  get score() {
    return this.#score;
  }

  get calorieCount() {
    return this.#calorieCount;
  }

  get proteinCount() {
    return this.#proteinCount;
  }

  get carbohydrateCount() {
    return this.#carbohydrateCount;
  }

  get lipidCount() {
    return this.#lipidCount;
  }

  get userDetails() {
    return `User ID: ${this.#userId}
            First Name: ${this.#firstName}
            Last Name: ${this.#lastName}
            Age: ${this.#age}
            Score: ${this.#score}
            Calorie Count: ${this.#calorieCount}
            Protein Count: ${this.#proteinCount}
            Carbohydrate Count: ${this.#carbohydrateCount}
            Lipid Count: ${this.#lipidCount}`;
  }
}

export default User;
