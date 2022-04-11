import DifferentLengthError from '../../../../src/02.application/common/exceptions/differentLengthError';
import IsNotANumberError from '../../../../src/02.application/common/exceptions/isNotANumberError';
import MissingParamError from '../../../../src/02.application/common/exceptions/missingParamError';
import CodeValidator from '../../../../src/02.application/common/helpers/codeValidator';

const makeSut = () => {
  const codeValidator = new CodeValidator();

  return { codeValidator };
};

describe('BankSlip UseCase ', () => {
  test('Should to throw an error when code was not provided', () => {
    const { codeValidator } = makeSut();

    expect(() => codeValidator.hasCode(null)).toThrow(
      new MissingParamError('code'),
    );
  });

  test('Should to throw an error when code has different length', () => {
    const { codeValidator } = makeSut();

    expect(() => codeValidator.isEqualToLength('90324i03924i2309', 47)).toThrow(
      new DifferentLengthError(47),
    );
  });

  test('Should to throw an error when code is not a number', () => {
    const { codeValidator } = makeSut();

    expect(() => codeValidator.isANumber('90324i03924i2309')).toThrow(
      new IsNotANumberError('90324i03924i2309'),
    );
  });
  test('Should to throw an error when code is not a number', () => {
    const { codeValidator } = makeSut();

    expect(() => codeValidator.isANumber('90324i03924i2309')).toThrow(
      new IsNotANumberError('90324i03924i2309'),
    );
  });

  test('Should return true when code was provided', () => {
    const { codeValidator } = makeSut();

    const isValid = codeValidator.hasCode('90324i03924i2309');
    expect(isValid).toBe(true);
  });

  test('Should return true when code is equal to length', () => {
    const { codeValidator } = makeSut();

    const isValid = codeValidator.isEqualToLength('123', 3);
    expect(isValid).toBe(true);
  });
});
