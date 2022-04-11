import DifferentLengthError from '../exceptions/differentLengthError';
import IsNotANumberError from '../exceptions/isNotANumberError';
import MissingParamError from '../exceptions/missingParamError';
import { ICodeValidator } from './iCodeValidator';

class CodeValidator implements ICodeValidator {
  public hasCode(code: string): boolean {
    if (!code) {
      throw new MissingParamError('code');
    }
    return true;
  }

  public isEqualToLength(code: string, length: number): boolean {
    if (code.length !== length) {
      throw new DifferentLengthError(47);
    }
    return true;
  }

  public haveOnlyNumbers(code: string): boolean {
    if (Number.isNaN(+code)) {
      throw new IsNotANumberError(code);
    }
    return true;
  }
}

export default CodeValidator;
