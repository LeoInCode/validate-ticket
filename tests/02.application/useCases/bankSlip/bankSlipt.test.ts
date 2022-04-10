class BankSlip {
  constructor() {}

  public validate(code: string) {
    if (code.length !== 47) return false;

    if (Number.isNaN(+code)) return false;

    return true;
  }
}

const makeSut = () => {
  const bankSlip = new BankSlip();

  return { bankSlip };
};

describe('BankSlip UseCase ', () => {
  test('Shoud return false when code does not have 47 caracteres', async () => {
    const { bankSlip } = makeSut();
    const isValid = bankSlip.validate('any_code');
    expect(isValid).toBe(false);
  });

  test('Shoud return false when code does not contain only numbers', async () => {
    const { bankSlip } = makeSut();
    const isValid = bankSlip.validate(
      'any_code123458764520394875643210947365287563985',
    );
    expect(isValid).toBe(false);
  });
});
