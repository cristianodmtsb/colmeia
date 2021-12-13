import React from 'react';
import useOrderList from '../../talons/OrderList/useOrderList';
import parseDate from '../../helpers/parseDate';
import { Price } from '@magento/peregrine';
import defaultClasses from './orderList.scss';
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import { Link } from '@magento/venia-drivers';
import { useTranslation } from 'react-i18next';

const LinesLoader = ({ classes }) =>
  Array(6)
    .fill('')
    .map((value, index) => (
      <div key={index} className={classes.rowLoader}>
        {Array(4)
          .fill('')
          .map((value, index) => (
            <span key={index} className={classes.columnLoader} />
          ))}
      </div>
    ));

const OrderList = ({ classes: propClasses, orderUrl = '/order/:id' }) => {
  const classes = mergeClasses(defaultClasses, propClasses);
  const { t } = useTranslation();
  const {
    loading,
    data: { currencyCode, orders },
  } = useOrderList();

  return (
    <div className={classes.orderListContainer}>
      <div className={classes.orderListRow}>
        <span className={classes.orderListColumn}>{t('Order Number')}</span>
        <span className={classes.orderListColumn}>{t('Date')}</span>
        <span className={classes.orderListColumn}>{t('Total')}</span>
        <span className={classes.orderListColumn}>{t('Status')}</span>
      </div>
      {loading && orders.length === 0 && <LinesLoader classes={classes} />}
      {!loading && orders.length === 0 && (
        <span className={classes.emptyTable}>
          {t('There are no orders yet.')}
        </span>
      )}
      {orders &&
        orders.map(({ created_at, grand_total, id, order_number, status }) => (
          <Link
            key={id}
            className={classes.orderListRow}
            to={orderUrl.replace(':id', id)}
          >
            <span className={classes.orderListColumn}>{order_number}</span>
            <span className={classes.orderListColumn}>
              {parseDate(created_at)}
            </span>
            <span className={classes.orderListColumn}>
              <Price currencyCode={currencyCode} value={grand_total} />
            </span>
            <span className={classes.orderListColumn}>{t(status)}</span>
          </Link>
        ))}
    </div>
  );
};

export default OrderList;
