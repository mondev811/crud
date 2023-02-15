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
      return apiClient.post('/clients', newClient);
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
      return apiClient.put(`/clients/${client.id}`, client);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['clients']});
    },
  });

  return updateMutation;
};

export const useDeleteClient = () => {
  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: id => {
      return apiClient.delete(`/clients/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['clients']});
    },
  });

  return deleteMutation;
};
