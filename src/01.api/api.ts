import BankSlip from '../02.application/useCases/bankSlip/bankSplit';
import VerifyingDigit from '../02.application/useCases/bankSlip/utils/verifyingDigit';
import DateTransform from '../03.infra/adapters/dateTransform/dateTransform';

const verifyingDigit = new VerifyingDigit();
const dateTransform = new DateTransform();
const bankSlip = new BankSlip(verifyingDigit, dateTransform);

console.log(
  bankSlip.validate('21290001192110001210904475617405975870000002000'),
);
