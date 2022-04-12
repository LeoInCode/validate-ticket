import InvalidCodeError from '../../common/exceptions/invalidCodeError';
import { ICodeValidator } from '../../common/helpers/iCodeValidator';
import ReplaceCode from '../../common/helpers/replaceCode';
import { IResponse } from '../interfaces/iResponse';
import { IVerifyingDigitDealership } from './utils/helpers/iVerifyingDigitDealership';

class DealershipSlip {
  private readonly codeValidator: ICodeValidator;

  private readonly verifyingDigitDealership: IVerifyingDigitDealership;

  constructor(
    codeValidator: ICodeValidator,
    verifyingDigitDealership: IVerifyingDigitDealership,
  ) {
    this.codeValidator = codeValidator;
    this.verifyingDigitDealership = verifyingDigitDealership;
  }

  public validate(originalCode: string): IResponse {
    try {
      this.validCode(originalCode);

      const replacedCode = ReplaceCode.replace(originalCode);

      const barCode = this.convertTypeableLineToBarcode(replacedCode);

      const isValid =
        this.verifyingDigitDealership.verifyDigitInBarcode(barCode);

      if (!isValid) throw new InvalidCodeError();

      const nominalValue = this.getNominalValue(replacedCode);

      return {
        statusCode: 200,
        data: {
          barCode,
          amount: nominalValue,
        },
      };
    } catch (error) {
      return {
        statusCode: 400,
        data: {
          message: error.message,
        },
      };
    }
  }

  private validCode(originalCode: string): void {
    const lengthOfCode = 48;
    this.codeValidator.hasCode(originalCode);
    const replacedCode = ReplaceCode.replace(originalCode);
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

  private getNominalValue(code: string): string {
    const codeWithValue = `${code.substring(0, 11)}${code.substring(
      12,
    )}`.substring(4, 15);

    const nominalValue = (parseInt(codeWithValue, 10) / 100.0).toFixed(2);

    return nominalValue;
  }
}

export default DealershipSlip;
