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
});
