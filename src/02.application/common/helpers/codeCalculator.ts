class CodeCalculator {
  public getRemainderOfSummation(code: string[]): number {
    let multiplier = 2;
    const limitOfMultiplier = 9;
    const summation = code.reduce((acc, cur) => {
      const sum = +cur * multiplier;
      multiplier = multiplier === limitOfMultiplier ? 2 : multiplier + 1;
      return acc + sum;
    }, 0);

    const numberOfPositions = 11;
    const remainder = summation % numberOfPositions;

    return remainder;
  }
}

export default CodeCalculator;
