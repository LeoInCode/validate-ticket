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
}

export default DealershipSlip;
