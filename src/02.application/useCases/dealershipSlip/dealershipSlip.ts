import { ICodeValidator } from '../../common/helpers/iCodeValidator';
import replaceCode from '../../common/helpers/replaceCode';

class DealershipSlip {
  private readonly codeValidator: ICodeValidator;

  private readonly verifyingDigitDealership;

  constructor(codeValidator: ICodeValidator, verifyingDigitDealership) {
    this.codeValidator = codeValidator;
    this.verifyingDigitDealership = verifyingDigitDealership;
  }

  public validate(originalCode: string) {
    try {
      const replacedCode = replaceCode(originalCode);

      this.validCode(originalCode, replacedCode);

      const barCode = this.convertTypeableLineToBarcode(replacedCode); // Needs to refactor

      const isValid =
        this.verifyingDigitDealership.verifyDigitInBarcode(barCode);

      return {
        statusCode: 200,
      };
    } catch (error) {
      return {
        statusCode: 400,
      };
    }
  }

  private validCode(originalCode: string, replacedCode: string): void {
    const lengthOfCode = 48;
    this.codeValidator.hasCode(originalCode);
    this.codeValidator.isEqualToLength(replacedCode, lengthOfCode);
    this.codeValidator.haveOnlyNumbers(replacedCode);
  }

  private convertTypeableLineToBarcode(code: string): string {
    let barCode = '';
    barCode += code.substring(0, 11);
    barCode += code.substring(12, 23);
    barCode += code.substring(24, 35);
    barCode += code.substring(36, 47);
    return barCode;
  }
}

export default DealershipSlip;
