import DateTransform from '../../../../03.infra/adapters/dateTransform/dateTransform';
import { IBankSplip } from '../../interfaces/iBankSlip';
import BankSlip from '../bankSplit';
import CodeValidator from '../../../common/helpers/codeValidator';
import VerifyingDigit from '../utils/helpers/verifyingDigit';

abstract class BankSlipFactory {
  public static build(): IBankSplip {
    const codeValidator = new CodeValidator();
    const verifyingDigit = new VerifyingDigit();
    const dateTransform = new DateTransform();
    return new BankSlip(codeValidator, verifyingDigit, dateTransform);
  }
}

export default BankSlipFactory;
