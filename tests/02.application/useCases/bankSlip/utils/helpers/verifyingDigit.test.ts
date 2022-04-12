import VerifyingDigit from '../../../../../../src/02.application/useCases/bankSlip/utils/helpers/verifyingDigit';

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
  const verifiyingDigit = new VerifyingDigit(codeCalculatorSpy);

  return { verifiyingDigit, codeCalculatorSpy };
};

describe('VerifyingDigit Helper ', () => {
  test('Should return false when sum of code and verifying digit is not equal', async () => {
    const { verifiyingDigit } = makeSut();
    const isValid = verifiyingDigit.verifyDigitInBarcode('9832098');
    expect(isValid).toBe(false);
  });

  test('Should return true when sum of code and verifying digit are equal', async () => {
    const { verifiyingDigit } = makeSut();
    const isValid = verifiyingDigit.verifyDigitInBarcode(
      '23799755200003700003381260007827139500006330',
    );
    expect(isValid).toBe(true);
  });
});
