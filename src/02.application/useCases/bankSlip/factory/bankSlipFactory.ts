import DateTransform from '../../../../03.infra/adapters/dateTransform/dateTransform';
import { IBankSplip } from '../../interfaces/iBankSlip';
import BankSlip from '../bankSplit';
import VerifyingDigit from '../utils/verifyingDigit';

abstract class BankSlipFactory {
  public static build(): IBankSplip {
    const verifyingDigit = new VerifyingDigit();
    const dateTransform = new DateTransform();
    return new BankSlip(verifyingDigit, dateTransform);
  }
}

export default BankSlipFactory;
