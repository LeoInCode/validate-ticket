import BankSlip from '../../../../src/02.application/useCases/bankSlipt/bankSplit';

const makeVerifyingDigit = () => {
  class VerifyingDigitSpy {
    public isValid;

    public verifyDigitInBarcode(code) {
      return this.isValid;
    }
  }

  const verifyingDigit = new VerifyingDigitSpy();
  verifyingDigit.isValid = true;
  return verifyingDigit;
};

const makeSut = () => {
  const verifyDigitSpy = makeVerifyingDigit();
  const bankSlip = new BankSlip(verifyDigitSpy);

  return { bankSlip, verifyDigitSpy };
};

describe('BankSlip UseCase ', () => {
  test('Shoud return false when code was not provided', async () => {
    const { bankSlip } = makeSut();
    const isValid = bankSlip.validate(null);
    expect(isValid).toBe(false);
  });

  test('Shoud return false when code does not have 47 caracteres', async () => {
    const { bankSlip } = makeSut();
    const isValid = bankSlip.validate('any_code');
    expect(isValid).toBe(false);
  });

  test('Shoud return false when code does not contain only numbers', async () => {
    const { bankSlip } = makeSut();
    const isValid = bankSlip.validate(
      'any_code123458764520394875643210947365287563985',
    );
    expect(isValid).toBe(false);
  });

  test('Shoud return true when code contain numbers, points and hairline', async () => {
    const { bankSlip } = makeSut();
    const isValid = bankSlip.validate(
      '49082.73612.345876.452039487564321094.736528756-3985',
    );
    expect(isValid).toBe(true);
  });

  test('Shoud call verifyingDigit with correct code', async () => {
    const { bankSlip, verifyDigitSpy } = makeSut();
    const isValid = bankSlip.validate(
      '49082.73612.345876.452039487564321094.736528756-3985',
    );
    expect(isValid).toBe(true);
    expect(verifyDigitSpy.isValid).toBe(true);
  });

  test('Shoud call verifyingDigit with incorrect code', async () => {
    const { bankSlip, verifyDigitSpy } = makeSut();
    verifyDigitSpy.isValid = false;
    const isValid = bankSlip.validate(
      '49082.73612.345876.452039487564321094.736528756-3985',
    );
    expect(isValid).toBe(false);
    expect(verifyDigitSpy.isValid).toBe(false);
  });
});
