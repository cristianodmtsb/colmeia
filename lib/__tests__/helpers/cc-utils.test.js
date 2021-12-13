import {
  getCardBrand,
  CC_BRAND_ELO,
  CC_BRAND_VISA,
  CC_BRAND_MASTER,
  CC_BRAND_AMEX,
  CC_BRAND_DISCOVER,
  CC_BRAND_DINERS,
  CC_BRAND_HIPER,
} from '../../helpers/cc-utils';

const ELO_NUMBERS = [
  '5066 9913 7695 2198',
  '4389 3540 8898 5860',
  '5066 9977 4337 5559',
];
const VISA_NUMBERS = [
  '4716 4141 8296 3694',
  '4916 8527 3156 3945',
  '4716 7042 7034 9594',
];
const MASTER_NUMBERS = [
  '5410 6607 6355 6135',
  '5357 3154 7223 7585',
  '5226 0468 0116 4831',
];
const AMEX_NUMBERS = [
  '3717 406763 67271',
  '3472 618078 39246',
  '3709 406098 25947',
];
const DISCOVER_NUMBERS = [
  '6011 3189 3699 1827',
  '6011 6879 1256 1485',
  '6011 9948 0525 3935',
];
const DINERS_NUMBERS = [
  '3880 997000 5526',
  '3016 591901 3453',
  '3039 111152 3046',
];
const HIPER_NUMBERS = [
  '6062 8261 7047 1973',
  '6062 8283 9823 9059',
  '6062 8248 3920 1659',
];
const INVALID_NUMBERS = [
  '1111 1111 1111 1111',
  '2222 2222 2222 2222',
  '1111 2222 3333 4444',
];

describe('CC Utils', () => {
  it('[getCardBrand] should detect the correct card brand', () => {
    ELO_NUMBERS.forEach(number =>
      expect(getCardBrand(number)).toBe(CC_BRAND_ELO),
    );
    VISA_NUMBERS.forEach(number =>
      expect(getCardBrand(number)).toBe(CC_BRAND_VISA),
    );
    MASTER_NUMBERS.forEach(number =>
      expect(getCardBrand(number)).toBe(CC_BRAND_MASTER),
    );
    AMEX_NUMBERS.forEach(number =>
      expect(getCardBrand(number)).toBe(CC_BRAND_AMEX),
    );
    DISCOVER_NUMBERS.forEach(number =>
      expect(getCardBrand(number)).toBe(CC_BRAND_DISCOVER),
    );
    DINERS_NUMBERS.forEach(number =>
      expect(getCardBrand(number)).toBe(CC_BRAND_DINERS),
    );
    HIPER_NUMBERS.forEach(number =>
      expect(getCardBrand(number)).toBe(CC_BRAND_HIPER),
    );

    INVALID_NUMBERS.forEach(number => expect(getCardBrand(number)).toBeFalsy());
  });
});
