/* eslint-disable max-classes-per-file */
import BankSlip from '../../../../src/02.application/useCases/bankSlip/bankSplip';

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

const makeVerifyingDigit = () => {
  class VerifyingDigitSpy {
    public isValid: boolean;

    public verifyDigitInBarcode(code: string) {
      return this.isValid;
    }
  }
  const verifyingDigit = new VerifyingDigitSpy();
  verifyingDigit.isValid = true;
  return verifyingDigit;
};

const makeDateTransform = () => {
  class DateTransformSpy {
    public addDays(startDate: Date, days: number) {
      return startDate;
    }

    public getOnlyDate(date: Date): string {
      return '';
    }
  }
  const dateTransform = new DateTransformSpy();
  return dateTransform;
};

const makeSut = () => {
  const verifyDigitSpy = makeVerifyingDigit();
  const dateTrasnformSpy = makeDateTransform();
  const codeValidatorSpy = makeCodeValidator();
  const bankSlip = new BankSlip(
    codeValidatorSpy,
    verifyDigitSpy,
    dateTrasnformSpy,
  );

  return { bankSlip, verifyDigitSpy, codeValidatorSpy, dateTrasnformSpy };
};

describe('BankSlip UseCase ', () => {
  test('Should return statusCode 400 when code was not provided', () => {
    const { bankSlip } = makeSut();
    const result = bankSlip.validate(null);
    expect(result.statusCode).toBe(400);
  });

  test('Should return statusCode 400 when code does not have 47 caracteres', async () => {
    const { bankSlip } = makeSut();
    const result = bankSlip.validate('any_code');
    expect(result.statusCode).toBe(400);
  });

  test('Should return statusCode 400 when code does not contain only numbers', async () => {
    const { bankSlip } = makeSut();
    const result = bankSlip.validate(
      'any_code123458764520394875643210947365287563985',
    );
    expect(result.statusCode).toBe(400);
  });

  test('Should call verifyingDigit with correct code', async () => {
    const { bankSlip, verifyDigitSpy, codeValidatorSpy } = makeSut();
    codeValidatorSpy.isValid = true;
    const result = bankSlip.validate(
      '49082.73612.345876.452039487564321094.736528756-3985',
    );
    expect(verifyDigitSpy.isValid).toBe(true);
    expect(result.statusCode).toBe(200);
  });

  test('Should call verifyingDigit with incorrect code', async () => {
    const { bankSlip, verifyDigitSpy, codeValidatorSpy } = makeSut();
    codeValidatorSpy.isValid = true;
    verifyDigitSpy.isValid = false;
    const result = bankSlip.validate(
      '49082.73612.345876.452039487564321094.736528756-3985',
    );
    expect(result.statusCode).toBe(400);
    expect(verifyDigitSpy.isValid).toBe(false);
  });
});
