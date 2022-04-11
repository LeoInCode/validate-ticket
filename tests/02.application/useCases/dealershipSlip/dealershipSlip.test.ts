/* eslint-disable max-classes-per-file */
const makeCodeValidator = () => {
  class CodeValidatorSpy {
    public isValid: boolean;

    public hasCode(code: string): void {
      if (!this.isValid) throw new Error();
    }
  }

  const codeValidator = new CodeValidatorSpy();
  codeValidator.isValid = false;
  return codeValidator;
};

class DealershipSlip {
  private codeValidator;

  constructor(codeValidator) {
    this.codeValidator = codeValidator;
  }

  public validate(originalCode: string) {
    try {
      this.codeValidator.hasCode(originalCode);
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

const makeSut = () => {
  const codeValidatorSpy = makeCodeValidator();
  const dealershipSlip = new DealershipSlip(codeValidatorSpy);

  return { dealershipSlip, codeValidatorSpy };
};

describe('BankSlip UseCase ', () => {
  test('Should return statusCode 400 when code was not provided', () => {
    const { dealershipSlip } = makeSut();
    const result = dealershipSlip.validate(null);
    expect(result.statusCode).toBe(400);
  });
});
