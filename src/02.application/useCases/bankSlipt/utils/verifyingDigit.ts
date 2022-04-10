class VerifyingDigit {
  public verifyDigitInBarcode(code: string): boolean {
    const positionOfVerifyingDigit = 4;
    const verifyingDigit = code[positionOfVerifyingDigit];
    const block = code.substring(0, 4) + code.substring(5);
    const isValid =
      this.moduleElevenCalculateVerifyingDigit(block) === +verifyingDigit;

    return isValid;
  }

  moduleElevenCalculateVerifyingDigit(block: string): number {
    const code = block.split('').reverse();
    const summation = this.getSummationOfCode(code);

    const numberOfPositions = 11;
    const remainder = summation % numberOfPositions;

    const veyfyingDigit = numberOfPositions - remainder;
    if (veyfyingDigit === 0 || veyfyingDigit === 10 || veyfyingDigit === 11)
      return 1;

    return veyfyingDigit;
  }

  getSummationOfCode(code: string[]): number {
    let multiplier = 2;
    const limitOfMultiplier = 9;
    const summation = code.reduce((acc, cur) => {
      const sum = +cur * multiplier;
      multiplier = multiplier === limitOfMultiplier ? 2 : multiplier + 1;
      return acc + sum;
    }, 0);

    return summation;
  }
}

export default VerifyingDigit;
