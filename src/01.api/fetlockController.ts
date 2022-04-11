import BankSlipFactory from '../02.application/useCases/bankSlip/factory/bankSlipFactory';

interface IRequest {
  params: { id: string };
}

interface IResponse {
  status(code: number);
  send(): void;
}

class FetlockController {
  public static getInformations(req: IRequest, res: IResponse) {
    const bankSlip = BankSlipFactory.build();
    const informationsOfFetlock = bankSlip.validate(req.params.id);

    return res
      .status(informationsOfFetlock.statusCode)
      .send(informationsOfFetlock.data);
  }
}

export default FetlockController;
