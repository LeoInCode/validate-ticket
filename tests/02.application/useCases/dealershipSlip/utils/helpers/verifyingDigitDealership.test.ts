import VerifyingDigitDealership from '../../../../../../src/02.application/useCases/dealershipSlip/utils/helpers/verifyingDigitDealership';

const makeCodeCalculator = () => {
  class CodeCalculatorSpy {
    public getRemainderOfSummation(block: string) {
      const code = block.split('').reverse();
      let multiplier = 2;
      const limitOfMultiplier = 9;
      const summation = code.reduce((acc, cur) => {
        const sum = +cur * multiplier;
        multiplier = multiplier === limitOfMultiplier ? 2 : multiplier + 1;
        return acc + sum;
      }, 0);

      const numberOfPositions = 11;
      const remainder = summation % numberOfPositions;

      return remainder;
    }
  }

  const codeCalculator = new CodeCalculatorSpy();
  return codeCalculator;
};

const makeSut = () => {
  const codeCalculatorSpy = makeCodeCalculator();
  const verifiyingDigitDealership = new VerifyingDigitDealership(
    codeCalculatorSpy,
  );

  return { verifiyingDigitDealership };
};

describe('VerifyingDigitDealership Helper ', () => {
  test('Should return false when sum of code and verifying digit is not equal', async () => {
    const { verifiyingDigitDealership } = makeSut();
    const isValid = verifiyingDigitDealership.verifyDigitInBarcode('9832098');
    expect(isValid).toBe(false);
  });

  test('Shoud return true when sum of code and verifying digit are equal in moduleTeen', async () => {
    const { verifiyingDigitDealership } = makeSut();
    const isValid = verifiyingDigitDealership.verifyDigitInBarcode(
      '836200000005667800481000180975657313001589636081',
    );
    expect(isValid).toBe(true);
  });

  test('Shoud return true when sum of code and verifying digit are equal in moduleEleven', async () => {
    const { verifiyingDigitDealership } = makeSut();
    const isValid = verifiyingDigitDealership.verifyDigitInBarcode(
      '83860000000667800481001809756573100158963608',
    );
    expect(isValid).toBe(true);
  });
});
