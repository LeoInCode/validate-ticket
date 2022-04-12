import { IBankSplip } from '../../interfaces/iBankSlip';
import CodeValidator from '../../../common/helpers/codeValidator';
import CodeCalculator from '../../../common/helpers/codeCalculator';
import DealershipSlip from '../dealershipSlip';
import VerifyingDigitDealership from '../utils/helpers/verifyingDigitDealership';

abstract class DealershipSlipFactory {
  public static build(): IBankSplip {
    const codeValidator = new CodeValidator();
    const codeCalculator = new CodeCalculator();
    const verifyingDigit = new VerifyingDigitDealership(codeCalculator);
    return new DealershipSlip(codeValidator, verifyingDigit);
  }
}

export default DealershipSlipFactory;
