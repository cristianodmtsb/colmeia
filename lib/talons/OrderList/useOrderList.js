import GET_CUSTOMER_ORDERS from '../../queries/getCustomerOrders.graphql';
import { useQuery } from '@apollo/react-hooks';

const useOrderList = () => {
  const { loading, error, data } = useQuery(GET_CUSTOMER_ORDERS);

  const currencyCode =
    (data && data.storeConfig && data.storeConfig.base_currency_code) || 'USD';
  const orders =
    (data && data.customerOrders && data.customerOrders.items) || [];

  return {
    loading,
    error,
    data: {
      orders: orders,
      currencyCode,
    },
  };
};

export default useOrderList;
