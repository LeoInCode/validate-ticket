import BankSlipFactory from '../02.application/useCases/bankSlip/factory/bankSlipFactory';
import DealershipSlipFactory from '../02.application/useCases/dealershipSlip/factory/dealershipSlipFactory';

interface IRequest {
  params: { code: string };
}

interface IResponse {
  status(code: number);
  send(): void;
}

class FetlockController {
  public static getInformations(req: IRequest, res: IResponse): IResponse {
    const { code } = req.params;
    let informationsOfFetlock;

    if (+code[0] === 8) {
      const dealershipSlip = DealershipSlipFactory.build();
      informationsOfFetlock = dealershipSlip.validate(code);
    } else {
      const bankSlip = BankSlipFactory.build();
      informationsOfFetlock = bankSlip.validate(code);
    }

    return res
      .status(informationsOfFetlock.statusCode)
      .send(informationsOfFetlock.data);
  }
}

export default FetlockController;
