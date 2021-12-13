import validators from '../../helpers/validators';
describe('Validators', () => {
  it('Validators - email', () => {
    expect(validators.email('test@test.com')).toBe(true);
    expect(validators.email('test@test')).toBe(false);
  });

  it('Validators - taxvat', () => {
    expect(validators.taxvat('129.875.140-34')).toBe(true);
    expect(validators.taxvat('12987514034')).toBe(true);
    expect(validators.taxvat('11111111111')).toBe(false);
    expect(validators.taxvat('12345678912')).toBe(false);
  });

  it('Validators - postcode', () => {
    expect(validators.postcode('11111-111')).toBe(true);
    expect(validators.postcode('11111111')).toBe(true);
    expect(validators.postcode('11111')).toBe(false);
    expect(validators.postcode('123456789123')).toBe(false);
  });

  it('Validators - CNPJ', () => {
    expect(validators.cnpj('85.655.060/0001-03')).toBe(true);
    expect(validators.cnpj('85655060000103')).toBe(true);
    expect(validators.cnpj('00000000000000')).toBe(false);
    expect(validators.cnpj('0000000000000')).toBe(false);
  });
});
