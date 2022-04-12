import ReplaceCode from '../../../../src/02.application/common/helpers/replaceCode';

describe('CodeValidator Helper ', () => {
  test('Should return a code without points or hairline', () => {
    const replacedCode = ReplaceCode.replace('902834.90324832.093-8923');

    expect(replacedCode).toBe('902834903248320938923');
  });
});
