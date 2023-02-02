import {useQuery} from '@tanstack/react-query';
import axios from 'axios';
import * as CONSTANTS from '../helpers/constants';

export const useClientsData = () => {
  const clientsQuery = useQuery(
    ['clients'],
    () => axios.get(`${CONSTANTS.SERVER_URL}/clients`),
    {
      staleTime: 1000 * 60 * 3, // three minutes
    },
  );
  return clientsQuery;
};
