import { ICodeCalculator } from '../../../../common/helpers/iCodeCalculator';
import { IVerifyingDigit } from './iVerifyingDigit';

class VerifyingDigit implements IVerifyingDigit {
  private readonly codeCalculator: ICodeCalculator;

  constructor(codeCalculator: ICodeCalculator) {
    this.codeCalculator = codeCalculator;
  }

  public verifyDigitInBarcode(code: string): boolean {
    const positionOfVerifyingDigit = 4;
    const verifyingDigit = code[positionOfVerifyingDigit];
    const block = code.substring(0, 4) + code.substring(5);
    const isValid =
      this.moduleElevenCalculateVerifyingDigit(block) === +verifyingDigit;

    return isValid;
  }

  private moduleElevenCalculateVerifyingDigit(block: string): number {
    const remainder = this.codeCalculator.getRemainderOfSummation(block);
    const numberOfPositions = 11;

    const veyfyingDigit = numberOfPositions - remainder;
    if (veyfyingDigit === 0 || veyfyingDigit === 10 || veyfyingDigit === 11)
      return 1;

    return veyfyingDigit;
  }
}

export default VerifyingDigit;
