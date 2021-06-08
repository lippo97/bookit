import generator from '.';

describe('Shared module tests', () => {
  it('should generate a random number', () => {
    const num = generator();
    expect(num).toBeTruthy();
  });
});
