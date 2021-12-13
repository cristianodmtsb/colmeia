import i18n from 'i18next';
import pt_BR from '../i18n/pt_BR';
import { initReactI18next } from 'react-i18next';

export default ({
  res = {},
  lng = 'pt_BR',
  fallbackLng = 'pt_BR',
  keySeparator = false,
  nsSeparator = false,
  escapeValue = false,
  ...rest
} = {}) => {
  const resources = Object.assign({ pt_BR }, res);

  i18n.use(initReactI18next).init({
    resources,
    lng,
    fallbackLng,
    keySeparator,
    nsSeparator,
    interpolation: {
      escapeValue,
    },
    ...rest,
  });

  return i18n;
};
