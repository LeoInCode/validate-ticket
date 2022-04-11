import { ICodeCalculator } from '../../../../common/helpers/iCodeCalculator';
import { IVerifyingDigitDealership } from './iVerifyingDigitDealership';

/* eslint-disable @typescript-eslint/no-unused-expressions */
class VerifyingDigitDealership implements IVerifyingDigitDealership {
  private readonly codeCalculator: ICodeCalculator;

  constructor(codeCalculator: ICodeCalculator) {
    this.codeCalculator = codeCalculator;
  }

  public verifyDigitInBarcode(code: string): boolean {
    const positionOfIdentifierCoin = 2;
    const positionOfVerifyingDigit = 3;
    const identifierCoin = +code[positionOfIdentifierCoin];
    const verifyingDigit = +code[positionOfVerifyingDigit];

    const blockOfCode = code.substring(0, 3) + code.substring(4);
    if (identifierCoin === 6 || identifierCoin === 7) {
      return (
        this.moduleTeenCalculeVeryfingDigit(blockOfCode) === verifyingDigit
      );
    }
    if (identifierCoin === 8 || identifierCoin === 9) {
      return (
        this.moduleElevenCalculateVerifyingDigit(blockOfCode) === verifyingDigit
      );
    }
    return false;
  }

  private moduleTeenCalculeVeryfingDigit(block: string): number {
    const code = block.split('').reverse();
    let multiplier = 1;
    const summation = code.reduce((acc, cur) => {
      multiplier = multiplier === 2 ? 1 : 2;
      let sum = +cur * multiplier;
      let oldSum = 0;
      sum > 9
        ? `${sum}`.split('').forEach((separatedValue) => {
            sum = oldSum + +separatedValue;
            oldSum = +separatedValue;
          })
        : sum;
      return acc + sum;
    }, 0);

    const numberOfPositions = 10;
    return numberOfPositions - (summation % numberOfPositions);
  }

  private moduleElevenCalculateVerifyingDigit(block: string): number {
    const remainder = this.codeCalculator.getRemainderOfSummation(block);
    const numberOfPositions = 11;

    if (remainder === 0 || remainder === 1) return 0;
    if (remainder === 10) return 1;

    const veyfyingDigit = numberOfPositions - remainder;

    return veyfyingDigit;
  }
}

export default VerifyingDigitDealership;
