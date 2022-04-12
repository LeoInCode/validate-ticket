import BankSlipFactory from '../02.application/useCases/bankSlip/factory/bankSlipFactory';
import DealershipSlipFactory from '../02.application/useCases/dealershipSlip/factory/dealershipSlipFactory';

interface IRequest {
  params: { id: string };
}

interface IResponse {
  status(code: number);
  send(): void;
}

class FetlockController {
  public static getInformations(req: IRequest, res: IResponse): IResponse {
    const code = req.params.id;
    if (!code) return res.status(400).send({ message: 'Missing param: code' });

    let informationsOfFetlock;
    if (+code[0] === 8) {
      const dealershipSlip = DealershipSlipFactory.build();
      informationsOfFetlock = dealershipSlip.validate(req.params.id);
    } else {
      const bankSlip = BankSlipFactory.build();
      informationsOfFetlock = bankSlip.validate(req.params.id);
    }

    return res
      .status(informationsOfFetlock.statusCode)
      .send(informationsOfFetlock.data);
  }
}

export default FetlockController;
