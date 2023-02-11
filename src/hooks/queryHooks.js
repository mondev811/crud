import {useQueryClient, useMutation, useQuery} from '@tanstack/react-query';
import axios from 'axios';
import * as CONSTANTS from '../helpers/constants';

const apiClient = axios.create({
  baseURL: CONSTANTS.SERVER_URL,
  'Content-type': 'application/json',
});

export const useClientsData = () => {
  const clientsQuery = useQuery({
    queryKey: ['clients'],
    queryFn: async () => {
      return await apiClient.get('/clients');
    },
    options: {
      staleTime: 1000 * 60 * 3, // three minutes
    },
  });
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
      return axios.put(`${CONSTANTS.SERVER_URL}/clients/${client.id}`, client);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['clients']});
    },
  });

  return updateMutation;
};
