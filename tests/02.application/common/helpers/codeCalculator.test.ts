import CodeCalculator from '../../../../src/02.application/common/helpers/codeCalculator';

const makeSut = () => {
  const codeCalculator = new CodeCalculator();

  return { codeCalculator };
};

describe('CodeValidator Helper ', () => {
  test('Should return a unique number who represents the remainder', () => {
    const { codeCalculator } = makeSut();

    expect(
      codeCalculator.getRemainderOfSummation(
        '83860000000667800481001809756573100158963608',
      ),
    ).toBe(3);
  });
});
