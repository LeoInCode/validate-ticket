import VerifyingDigit from '../../../../../src/02.application/useCases/bankSlip/utils/verifyingDigit';

const makeSut = () => {
  const verifiyingDigit = new VerifyingDigit();

  return { verifiyingDigit };
};

describe('VerifyingDigit UseCase ', () => {
  test('Shoud return false when sum of code and verifying digit is not equal', async () => {
    const { verifiyingDigit } = makeSut();
    const isValid = verifiyingDigit.verifyDigitInBarcode('9832098');
    expect(isValid).toBe(false);
  });

  test('Shoud return true when sum of code and verifying digit are equal', async () => {
    const { verifiyingDigit } = makeSut();
    const isValid = verifiyingDigit.verifyDigitInBarcode(
      '23799755200003700003381260007827139500006330',
    );
    expect(isValid).toBe(true);
  });
});
