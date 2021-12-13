import GET_CUSTOMER_ADDRESSES from '../../queries/getCustomerAddresses.graphql';
import { useQuery } from '@apollo/react-hooks';

const useAddressList = () => {
  const { loading, error, data } = useQuery(GET_CUSTOMER_ADDRESSES);

  const addresses = (data && data.customer && data.customer.addresses) || [];

  return {
    loading,
    error,
    data: addresses,
  };
};

export default useAddressList;
