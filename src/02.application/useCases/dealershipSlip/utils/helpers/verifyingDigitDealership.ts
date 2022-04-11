class VerifyingDigitDealership {
  private readonly codeCalculator;

  constructor(codeCalculator) {
    this.codeCalculator = codeCalculator;
  }

  public verifyDigitInBarcode(code: string): boolean {
    const positionOfIdentifierCoin = 2;
    const positionOfVerifyingDigit = 3;
    const identifierCoin = +code[positionOfIdentifierCoin];
    const verifyingDigit = +code[positionOfVerifyingDigit];

    const blockOfCode = code.substring(0, 3) + code.substring(4);
    if (identifierCoin === 6 || identifierCoin === 7) {
      // module 10
    }
    if (identifierCoin === 8 || identifierCoin === 9) {
      return (
        this.moduleElevenCalculateVerifyingDigit(blockOfCode) === verifyingDigit
      );
    }
    return true;
  }

  private moduleElevenCalculateVerifyingDigit(block: string): number {
    const code = block.split('').reverse();
    const remainder = this.codeCalculator.getRemainderOfSummation(code);
    const numberOfPositions = 11;

    if (remainder === 0 || remainder === 1) return 0;
    if (remainder === 10) return 1;

    const veyfyingDigit = numberOfPositions - remainder;

    return veyfyingDigit;
  }
}

export default VerifyingDigitDealership;
