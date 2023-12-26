class numberGenerator {
  generateNumber = (min, max) => {
    return Math.max(min, Math.round(Math.random() * max));
  };
  generateNumbers = (count, min, max) => {
    const numbers = [];
    let randomNumber;
    do {
      randomNumber = this.generateNumber(min, max);
      if (!numbers.includes(randomNumber)) {
        numbers.push(randomNumber);
      }
    } while (numbers.length < count);
    return numbers;
  };
}

export default new numberGenerator();

