const taxvatValidator = (taxvat, locale) => {
  const localeValidators = {
    pt_BR: () => {
      let sum = 0;
      let remainder;

      taxvat = taxvat.replace(/[ .-]/g, '');

      let allEqual = true;
      for (let i = 0; i < taxvat.length - 1; i++) {
        if (taxvat[i] !== taxvat[i + 1]) allEqual = false;
      }

      if (allEqual) return false;

      for (let i = 1; i <= 9; i++) {
        sum = sum + parseInt(taxvat.substring(i - 1, i)) * (11 - i);
      }

      remainder = (sum * 10) % 11;

      if (remainder === 10 || remainder === 11) remainder = 0;
      if (remainder !== parseInt(taxvat.substring(9, 10))) return false;

      sum = 0;
      for (let i = 1; i <= 10; i++) {
        sum = sum + parseInt(taxvat.substring(i - 1, i)) * (12 - i);
      }

      remainder = (sum * 10) % 11;

      if (remainder === 10 || remainder === 11) remainder = 0;

      return remainder === parseInt(taxvat.substring(10, 11));
    },
  };

  return !!taxvat && localeValidators[locale]();
};

const cnpjValidator = (cnpj, locale) => {
  cnpj = cnpj.replace(/[^\d]+/g, '');

  if (cnpj === '') return false;

  if (cnpj.length !== 14) return false;

  if (
    cnpj === '00000000000000' ||
    cnpj === '11111111111111' ||
    cnpj === '22222222222222' ||
    cnpj === '33333333333333' ||
    cnpj === '44444444444444' ||
    cnpj === '55555555555555' ||
    cnpj === '66666666666666' ||
    cnpj === '77777777777777' ||
    cnpj === '88888888888888' ||
    cnpj === '99999999999999'
  )
    return false;

  let i;
  let size = cnpj.length - 2;
  let numbers = cnpj.substring(0, size);
  let digits = cnpj.substring(size);
  let sum = 0;
  let pos = size - 7;

  for (i = size; i >= 1; i--) {
    sum += numbers.charAt(size - i) * pos--;
    if (pos < 2) pos = 9;
  }

  let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

  if (result !== parseInt(digits.charAt(0))) return false;

  size = size + 1;
  numbers = cnpj.substring(0, size);
  sum = 0;
  pos = size - 7;
  for (i = size; i >= 1; i--) {
    sum += numbers.charAt(size - i) * pos--;
    if (pos < 2) pos = 9;
  }

  result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

  return result === parseInt(digits.charAt(1));
};

export default {
  email: value =>
    !!value &&
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
      value,
    ),
  postcode: (value, locale = 'pt_BR') => {
    const localeValidators = {
      pt_BR: () => value.replace(/\-/g, '').length === 8,
    };

    return !!value && localeValidators[locale]();
  },
  taxvat: (value, locale = 'pt_BR') => {
    return !!value && taxvatValidator(value, locale);
  },
  cnpj: (value, locale = 'pt_BR') => {
    return !!value && cnpjValidator(value, locale);
  },
};
