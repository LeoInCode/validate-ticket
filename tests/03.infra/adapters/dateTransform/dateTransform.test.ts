import DateTransform from '../../../../src/03.infra/adapters/dateTransform/dateTransform';

const makeSut = () => {
  const dateTransform = new DateTransform();

  return { dateTransform };
};

describe('DateTransform Adaoter', () => {
  test('Should return two days after startDate', () => {
    const { dateTransform } = makeSut();

    const startDate = new Date('11-04-2022');
    const daysAfter = dateTransform.addDays(startDate, 2);

    expect(daysAfter).toEqual(new Date('11-06-2022'));
  });

  test('Should format date and return only date', () => {
    const { dateTransform } = makeSut();

    const date = new Date('11-04-2022');
    const onlyDate = dateTransform.getOnlyDate(date);

    expect(onlyDate).toEqual('2022-11-04');
  });
});
