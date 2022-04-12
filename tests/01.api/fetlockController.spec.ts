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
  });
  test('should return 400 because length of code by BankSlip', async () => {
    const result = await supertest(app).get(
      '/boleto/21290001192110001210904475617405975809870000002000',
    );
    expect(result.status).toBe(400);
    expect(result.body.message).toBe('Different length: 47');
  });
});
