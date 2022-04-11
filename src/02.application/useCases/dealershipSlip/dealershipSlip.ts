import { ICodeValidator } from '../../common/helpers/iCodeValidator';
import replaceCode from '../../common/helpers/replaceCode';

class DealershipSlip {
  private readonly codeValidator: ICodeValidator;

  constructor(codeValidator: ICodeValidator) {
    this.codeValidator = codeValidator;
  }

  public validate(originalCode: string) {
    try {
      const replacedCode = replaceCode(originalCode);

      this.validCode(originalCode, replacedCode);

      const barCode = this.convertTypeableLineToBarcode(replaceCode as any); // Needs to refactor

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
