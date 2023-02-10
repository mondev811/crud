import {useQueryClient, useMutation, useQuery} from '@tanstack/react-query';
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

export const useAddNewClient = () => {
  const queryClient = useQueryClient();
  const addMutation = useMutation({
    mutationFn: newClient => {
      return axios.post(`${CONSTANTS.SERVER_URL}/clients`, newClient);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['clients']});
    },
  });

  return addMutation;
};

export const useUpdateClient = () => {
  const queryClient = useQueryClient();
  const updateMutation = useMutation({
    mutationFn: client => {
      return axios.put(`${CONSTANTS.SERVER_URL}/clients`, client);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['clients']});
    },
  });

  return updateMutation;
};
