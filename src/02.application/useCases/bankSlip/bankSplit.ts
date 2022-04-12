import { IDateTransform } from '../../../03.infra/adapters/dateTransform/iDateTransform';
import InvalidCodeError from '../../common/exceptions/invalidCodeError';
import { ICodeValidator } from '../../common/helpers/iCodeValidator';
import replaceCode from '../../common/helpers/replaceCode';
import { IBankSplip } from '../interfaces/iBankSlip';
import { IVerifyingDigit } from './utils/helpers/iVerifyingDigit';

interface IResponse {
  statusCode: number;
  data: {
    barCode?: string;
    amount?: string;
    expirationDate?: string;
    message?: string;
  };
}

class BankSlip implements IBankSplip {
  private readonly verifyingDigit: IVerifyingDigit;

  private readonly dateTransform: IDateTransform;

  private readonly codeValidator: ICodeValidator;

  constructor(
    codeValidator: ICodeValidator,
    verifyingDigit: IVerifyingDigit,
    dateTrasnform: IDateTransform,
  ) {
    this.codeValidator = codeValidator;
    this.verifyingDigit = verifyingDigit;
    this.dateTransform = dateTrasnform;
  }

  public validate(originalCode: string): IResponse {
    try {
      this.validCode(originalCode);

      const replacedCode = replaceCode(originalCode);

      const barCode = this.convertTypeableLineToBarcode(replacedCode);

      const isValid = this.verifyingDigit.verifyDigitInBarcode(barCode);

      if (!isValid) throw new InvalidCodeError();

      const expirationDate = this.getExpirationDate(replacedCode);

      const valueNominal = this.getNominalValue(replacedCode);

      return {
        statusCode: 200,
        data: {
          barCode: replacedCode,
          amount: valueNominal,
          expirationDate,
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
    const lengthOfCode = 47;
    this.codeValidator.hasCode(originalCode);
    const replacedCode = replaceCode(originalCode);
    this.codeValidator.isEqualToLength(replacedCode, lengthOfCode);
    this.codeValidator.haveOnlyNumbers(replacedCode);
  }

  private convertTypeableLineToBarcode(code: string): string {
    let barCode = '';
    barCode += code.substring(0, 3); // Bank identifier
    barCode += code.substring(3, 4); // Coin code
    barCode += code.substring(32, 33); // DV (Verifying digit)
    barCode += code.substring(33, 37); // Expiration date
    barCode += code.substring(37, 47); // Nominal value
    barCode += code.substring(4, 9); // Free block one
    barCode += code.substring(10, 20); // Free block two
    barCode += code.substring(21, 31); // Free block three
    return barCode;
  }

  private getExpirationDate(code: string): string {
    const days = +code.substring(33, 37);
    const startDate = '1997-10-07';
    const expirationDate = this.dateTransform.addDays(
      new Date(startDate),
      days,
    );

    const expirationDateTransformed =
      this.dateTransform.getOnlyDate(expirationDate);

    return expirationDateTransformed;
  }

  private getNominalValue(code: string): string {
    const codeWithValue = code.substring(37, 47).split('');
    const deletedPositions = this.deleteLastTwoPositions(codeWithValue);
    const valueNominal = `${+codeWithValue.join('')}.${deletedPositions.join(
      '',
    )}`;

    return valueNominal;
  }

  private deleteLastTwoPositions(codeWithValue: string[]): string[] {
    return codeWithValue.splice(
      codeWithValue.length - 2,
      codeWithValue.length - 1,
    );
  }
}

export default BankSlip;
