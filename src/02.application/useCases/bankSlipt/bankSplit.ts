import { IVerifyingDigit } from './utils/iVerifyingDigit';

class BankSlip {
  private readonly verifyingDigit: IVerifyingDigit;

  private readonly dateTransform;

  constructor(verifyingDigit: IVerifyingDigit, dateTrasnform) {
    this.verifyingDigit = verifyingDigit;
    this.dateTransform = dateTrasnform;
  }

  public validate(originalCode: string): any {
    if (!originalCode) return false;

    const replacedCode = originalCode.replace(/( |\.|-)/g, '');

    if (replacedCode.length !== 47) return false;

    if (Number.isNaN(+replacedCode)) return false;

    const barCode = this.convertTypeableLineToBarcode(replacedCode);

    const isValid = this.verifyingDigit.verifyDigitInBarcode(barCode);

    if (!isValid) return false;

    const expirationDate = this.getExpirationDate(replacedCode);

    return {
      barCode: replacedCode,
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

  private getExpirationDate(code: string) {
    const days = +code.substring(33, 37);
    const expirationDate = this.dateTransform.addDays(
      new Date('1997-10-07'),
      days,
    );

    return expirationDate;
  }
}

export default BankSlip;
