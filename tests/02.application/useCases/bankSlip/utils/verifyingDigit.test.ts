import VerifyingDigit from '../../../../../src/02.application/useCases/bankSlipt/utils/verifyingDigit';

const makeSut = () => {
  const verifiyingDigit = new VerifyingDigit();

  return { verifiyingDigit };
};

describe('VerifyingDigit UseCase ', () => {
  test('Shoud return false when code when sum of code and verifying digit is not equal', async () => {
    const { verifiyingDigit } = makeSut();
    const isValid = verifiyingDigit.verifyDigitInBarcode('9832098');
    expect(isValid).toBe(false);
  });
});
