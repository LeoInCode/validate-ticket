import DifferentLengthError from '../exceptions/differentLengthError';
import IsNotANumberError from '../exceptions/isNotANumberError';
import MissingParamError from '../exceptions/missingParamError';
import { ICodeValidator } from './iCodeValidator';

class CodeValidator implements ICodeValidator {
  public hasCode(code: string): void {
    if (!code) {
      throw new MissingParamError('code');
    }
  }

  public isEqualToLength(code: string, length: number): void {
    if (code.length !== length) {
      throw new DifferentLengthError(47);
    }
  }

  public isANumber(code: string): void {
    if (Number.isNaN(+code)) {
      throw new IsNotANumberError(code);
    }
  }
}

export default CodeValidator;
