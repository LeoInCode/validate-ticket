import DealershipSlip from '../../../../src/02.application/useCases/dealershipSlip/dealershipSlip';

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

  test('Should return statusCode 400 when code does not have 48 caracteres', async () => {
    const { dealershipSlip } = makeSut();
    const result = dealershipSlip.validate('any_code');
    expect(result.statusCode).toBe(400);
  });
});
