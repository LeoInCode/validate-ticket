/* eslint-disable max-classes-per-file */
import DealershipSlip from '../../../../src/02.application/useCases/dealershipSlip/dealershipSlip';

const makeCodeValidator = () => {
  class CodeValidatorSpy {
    public isValid: boolean;

    public hasCode(code: string): void {
      if (!this.isValid) throw new Error();
    }

    public isEqualToLength(code: string, length: number): void {
      if (!this.isValid) throw new Error();
    }

    public haveOnlyNumbers(code: string): void {
      if (!this.isValid) throw new Error();
    }
  }

  const codeValidator = new CodeValidatorSpy();
  codeValidator.isValid = false;
  return codeValidator;
};

const makeVerifyingDigitDealership = () => {
  class VerifyingDigitDealershipSpy {
    public isValid: boolean;

    public verifyDigitInBarcode(code: string) {
      return this.isValid;
    }
  }
  const verifyingDigitDealership = new VerifyingDigitDealershipSpy();
  verifyingDigitDealership.isValid = true;
  return verifyingDigitDealership;
};

const makeSut = () => {
  const codeValidatorSpy = makeCodeValidator();
  const verifyingDigitDealershipSpy = makeVerifyingDigitDealership();
  const dealershipSlip = new DealershipSlip(
    codeValidatorSpy,
    verifyingDigitDealershipSpy,
  );

  return { dealershipSlip, codeValidatorSpy, verifyingDigitDealershipSpy };
};

describe('DealershipSlip UseCase ', () => {
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

  test('Should return statusCode 400 when code does not contain only numbers', async () => {
    const { dealershipSlip } = makeSut();
    const result = dealershipSlip.validate(
      'any_code123458764520394875643210947365287563985',
    );
    expect(result.statusCode).toBe(400);
  });

  test('Should call verifyingDigitDealership with correct code', async () => {
    const { dealershipSlip, verifyingDigitDealershipSpy, codeValidatorSpy } =
      makeSut();
    codeValidatorSpy.isValid = true;
    const result = dealershipSlip.validate(
      '83620000000566.780048100018.0975657313001.589636081',
    );
    expect(verifyingDigitDealershipSpy.isValid).toBe(true);
    expect(result.statusCode).toBe(200);
  });

  test('Should call verifyingDigitDealership with incorrect code', async () => {
    const { dealershipSlip, verifyingDigitDealershipSpy } = makeSut();
    verifyingDigitDealershipSpy.isValid = false;
    const result = dealershipSlip.validate(
      '83620000000566.780048100018.0975657313001.589636081',
    );
    expect(result.statusCode).toBe(400);
    expect(verifyingDigitDealershipSpy.isValid).toBe(false);
  });
});
