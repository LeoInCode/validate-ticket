import DateTransform from '../../../../03.infra/adapters/dateTransform/dateTransform';
import { IBankSplip } from '../../interfaces/iBankSlip';
import BankSlip from '../bankSplip';
import CodeValidator from '../../../common/helpers/codeValidator';
import VerifyingDigit from '../utils/helpers/verifyingDigit';
import CodeCalculator from '../../../common/helpers/codeCalculator';

abstract class BankSlipFactory {
  public static build(): IBankSplip {
    const codeValidator = new CodeValidator();
    const codeCalculator = new CodeCalculator();
    const verifyingDigit = new VerifyingDigit(codeCalculator);
    const dateTransform = new DateTransform();
    return new BankSlip(codeValidator, verifyingDigit, dateTransform);
  }
}

export default BankSlipFactory;
