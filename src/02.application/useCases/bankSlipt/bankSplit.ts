class BankSlip {
  private verifyingDigit;

  constructor(verifyingDigit) {
    this.verifyingDigit = verifyingDigit;
  }

  public validate(originalCode: string): boolean {
    if (!originalCode) return false;

    const replacedCode = originalCode.replace(/( |\.|-)/g, '');

    if (replacedCode.length !== 47) return false;

    if (Number.isNaN(+replacedCode)) return false;

    const barCode = this.convertTypeableLineToBarcode(replacedCode);

    this.verifyingDigit.verifyDigitInBarcode(barCode);

    return true;
  }

  public convertTypeableLineToBarcode(code: string): string {
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
}

export default BankSlip;
