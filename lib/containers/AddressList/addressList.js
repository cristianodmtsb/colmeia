import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from '@magento/venia-drivers';
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import Text from '../../components/Text';
import defaultClasses from './addressList.scss';
import useAddressList from '../../talons/AddressList/useAddressList';

const AddressList = ({
  classes: propClasses,
  addressUrl = '/customer/address/:id',
}) => {
  const classes = mergeClasses(defaultClasses, propClasses);
  const { data } = useAddressList();
  const { t } = useTranslation();
  const getAddressClasses = isDefaultAddress => {
    return (
      classes.addressContainer +
      (isDefaultAddress ? ` ${classes.defaultAddress}` : '')
    );
  };

  return (
    <div className={classes.addressListContainer}>
      <Text type='h1' subType='primary' className={classes.addressListTitle}>
        {t('Address List')}
      </Text>
      {data &&
        data.map(
          ({
            id,
            street,
            city,
            company,
            country_code,
            default_billing,
            default_shipping,
            firstname,
            lastname,
            postcode,
            region: { region },
            telephone,
          }) => (
            <Link
              key={id}
              className={getAddressClasses(default_billing || default_shipping)}
              to={addressUrl.replace(':id', id)}
            >
              {street &&
                street.map((line, index) => (
                  <span key={`${id}-${index}`}>{line}</span>
                ))}
              {(firstname || lastname) && (
                <div className={classes.fullname}>
                  {firstname && <span>{firstname}</span>}
                  {lastname && <span>{lastname}</span>}
                </div>
              )}
              {city && (
                <span>
                  <span className={classes.label}>{t('City')}: </span>
                  {city}
                </span>
              )}
              {company && (
                <span>
                  <span className={classes.label}>{t('Company')}: </span>
                  {company}
                </span>
              )}
              {country_code && (
                <span>
                  <span className={classes.label}>{t('Country')}: </span>
                  {country_code}
                </span>
              )}
              {postcode && (
                <span>
                  <span className={classes.label}>{t('Postcode')}: </span>
                  {postcode}
                </span>
              )}
              {region && (
                <span>
                  <span className={classes.label}>{t('Region')}: </span>
                  {region}
                </span>
              )}
              {telephone && (
                <span>
                  <span className={classes.label}>{t('Telephone')}: </span>
                  {telephone}
                </span>
              )}
            </Link>
          ),
        )}
    </div>
  );
};

export default AddressList;
