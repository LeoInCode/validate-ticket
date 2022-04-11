class DealershipSlip {
  private codeValidator;

  constructor(codeValidator) {
    this.codeValidator = codeValidator;
  }

  public validate(originalCode: string) {
    try {
      this.codeValidator.hasCode(originalCode);
      this.codeValidator.isEqualToLength(originalCode, 48);
      return {
        statusCode: 200,
      };
    } catch (error) {
      return {
        statusCode: 400,
      };
    }
  }
}

export default DealershipSlip;
