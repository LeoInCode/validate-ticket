class BankSlip {
  constructor() {}

  public validate(originalCode: string) {
    const replacedCode = originalCode.replace(/( |\.|-)/g, '');
    if (replacedCode.length !== 47) return false;

    if (Number.isNaN(+replacedCode)) return false;

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

  test('Shoud return true when code contain numbers, points and hairline', async () => {
    const { bankSlip } = makeSut();
    const isValid = bankSlip.validate(
      '49082.73612.345876.452039487564321094.736528756-3985',
    );
    expect(isValid).toBe(true);
  });
});
