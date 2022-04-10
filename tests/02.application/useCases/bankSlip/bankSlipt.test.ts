class BankSlip {
  constructor() {}

  public validate(code: string) {
    if (code.length !== 47) return false;
  }
}

const makeSut = () => {
  const bankSlip = new BankSlip();

  return { bankSlip };
};

describe('BankSlip UseCase ', () => {
  test('Shoud return false when does not have 47 caracteres', async () => {
    const { bankSlip } = makeSut();
    const isValid = bankSlip.validate('any_code');
    expect(isValid).toBe(false);
  });
});
