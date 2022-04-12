import supertest from 'supertest';
import app from '../../app';

describe('Get informations about /boleto/', () => {
  test('should return 200 with informations by BankSlip', async () => {
    const result = await supertest(app).get(
      '/boleto/21290001192110001210904475617405975870000002000',
    );
    expect(result.status).toBe(200);
    expect(result.body.barCode).toBe(
      '21290001192110001210904475617405975870000002000',
    );
    expect(result.body.expirationDate).toBe('2018-07-16');
    expect(result.body.amount).toBe('20.00');
  });

  test('should return 400 because length of code by BankSlip', async () => {
    const result = await supertest(app).get(
      '/boleto/21290001192110001210904475617405975809870000002000',
    );
    expect(result.status).toBe(400);
    expect(result.body.message).toBe('Different length: 47');
  });

  test('should return 400 because does not have only numbers by BankSlip', async () => {
    const result = await supertest(app).get(
      '/boleto/21290001192110001kit904475617405975870000002000',
    );
    expect(result.status).toBe(400);
    expect(result.body.message).toBe(
      'Is not a number: 21290001192110001kit904475617405975870000002000',
    );
  });

  test('should return 400 because code have a invalid DV by BankSlip', async () => {
    const result = await supertest(app).get(
      '/boleto/21290001192110001210904475817405975870000002000',
    );
    expect(result.status).toBe(400);
    expect(result.body.message).toBe('Invalid Code Error: DV');
  });

  test('should return 200 with informations by DealershipSlip', async () => {
    const result = await supertest(app).get(
      '/boleto/836400000029318300863194034652180018100135235826',
    );
    expect(result.status).toBe(200);
    expect(result.body.barCode).toBe(
      '83640000002318300863190346521800110013523582',
    );
    expect(result.body.amount).toBe('231.83');
  });

  test('should return 400 because length of code by DealershipSlip', async () => {
    const result = await supertest(app).get(
      '/boleto/836400000029318300863194034652180018100135235826345',
    );
    expect(result.status).toBe(400);
    expect(result.body.message).toBe('Different length: 48');
  });

  test('should return 400 because code does not have only numbers by DealershipSlip', async () => {
    const result = await supertest(app).get(
      '/boleto/836400000029a3183s00631f403652180018100135235826',
    );
    expect(result.status).toBe(400);
    expect(result.body.message).toBe(
      'Is not a number: 836400000029a3183s00631f403652180018100135235826',
    );
  });
});
