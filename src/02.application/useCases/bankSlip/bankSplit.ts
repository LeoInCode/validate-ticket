import { IDateTransform } from '../../../03.infra/adapters/dateTransform/iDateTransform';
import { IBankSplip } from '../interfaces/iBankSlip';
import { IVerifyingDigit } from './utils/iVerifyingDigit';

interface IResponse {
  barCode: string;
  amount: string;
  expirationDate: string;
}

class BankSlip implements IBankSplip {
  private readonly verifyingDigit: IVerifyingDigit;

  private readonly dateTransform: IDateTransform;

  constructor(verifyingDigit: IVerifyingDigit, dateTrasnform: IDateTransform) {
    this.verifyingDigit = verifyingDigit;
    this.dateTransform = dateTrasnform;
  }

  public validate(originalCode: string): IResponse | boolean {
    console.log(originalCode);

    if (!originalCode) return false;

    const replacedCode = originalCode.replace(/( |\.|-)/g, '');

    if (replacedCode.length !== 47) return false;

    if (Number.isNaN(+replacedCode)) return false;

    const barCode = this.convertTypeableLineToBarcode(replacedCode);

    const isValid = this.verifyingDigit.verifyDigitInBarcode(barCode);

    if (!isValid) return false;

    const expirationDate = this.getExpirationDate(replacedCode);

    const valueNominal = this.getValueNominal(replacedCode);

    return {
      barCode: replacedCode,
      amount: valueNominal,
      expirationDate,
    };
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

  private getValueNominal(code: string): string {
    const codeWithValue = code.substring(37, 47).split('');
    this.deleteLastTwoPositions(codeWithValue);
    const valueNominal = +codeWithValue.join('');

    return valueNominal.toFixed(2);
  }

  private deleteLastTwoPositions(codeWithValue: string[]) {
    codeWithValue.splice(codeWithValue.length - 2, codeWithValue.length - 1);
  }
}

export default BankSlip;
