class VerifyingDigitDealership {
  public verifyDigitInBarcode(code: string): boolean {
    const positionOfIdentifierCoin = 2;
    const positionOfVerifyingDigit = 3;
    const identifierCoin = +code[positionOfIdentifierCoin];
    const verifyingDigit = +code[positionOfVerifyingDigit];

    if (identifierCoin === 6 || identifierCoin === 7) {
      // module 10
    }
    if (identifierCoin === 8 || identifierCoin === 9) {
      // module 11
    }
    const block = code.substring(0, 3) + code.substring(4);
    return true;
    // const isValid =
    //   this.moduleElevenCalculateVerifyingDigit(block) === verifyingDigit;

    // return isValid;
  }
}

export default VerifyingDigitDealership;
