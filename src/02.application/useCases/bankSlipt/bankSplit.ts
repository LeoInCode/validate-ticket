class BankSlip {
  constructor() {}

  public validate(originalCode: string): boolean {
    if (!originalCode) return false;

    const replacedCode = originalCode.replace(/( |\.|-)/g, '');

    if (replacedCode.length !== 47) return false;

    if (Number.isNaN(+replacedCode)) return false;

    return true;
  }
}

export default BankSlip;