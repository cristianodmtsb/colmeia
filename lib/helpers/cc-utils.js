export const CC_BRAND_ELO = 'elo';
export const CC_BRAND_VISA = 'visa';
export const CC_BRAND_MASTER = 'master';
export const CC_BRAND_AMEX = 'amex';
export const CC_BRAND_DISCOVER = 'discover';
export const CC_BRAND_DINERS = 'diners';
export const CC_BRAND_HIPER = 'hiper';
const REPEATED_NUMBERS = 'not-valid';

export const getCardBrand = number => {
  const cleanNumber = number.replace(/[^0-9]/g, '');

  const tests = {
    [REPEATED_NUMBERS]: /\b(\d)\1+\b/,
    [CC_BRAND_ELO]: /^(636368|636369|438935|504175|451416|636297|5067|4576|4011|506699)/g,
    [CC_BRAND_VISA]: /^4[0-9]{12}(?:[0-9]{3})?$/g,
    [CC_BRAND_MASTER]: /^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/,
    [CC_BRAND_AMEX]: /^3[47]/g,
    [CC_BRAND_DISCOVER]: /^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)/g,
    [CC_BRAND_DINERS]: /^(?:5[45]|36|30[0-5]|3095|3[8-9])\d+$/g,
    [CC_BRAND_HIPER]: /^(606282\d{10}(\d{3})?)|(3841\d{15})$/g,
  };

  const result = Object.keys(tests).find(key => tests[key].exec(cleanNumber));

  return !!result && result !== REPEATED_NUMBERS && result;
};
