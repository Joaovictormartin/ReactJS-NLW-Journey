import { toast } from "sonner";
import { AxiosError } from "axios";
import { useQuery, useMutation, UseQueryResult, useQueryClient } from "@tanstack/react-query";

import { ParticipantsGet } from "../models/participants";
import { getParticipants, postParticipants, putParticipants } from "../services/participants";

export const GET_PARTICIPANTS_KEY = "participants";

export const useGetParticipants = (id: string): UseQueryResult<ParticipantsGet[]> =>
  useQuery<ParticipantsGet[]>({
    enabled: !!id,
    queryKey: [GET_PARTICIPANTS_KEY, id],
    queryFn: () => getParticipants(id),
  });

export const usePostParticipants = (): any => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postParticipants,
    onSuccess: () => {
      toast.success("Participante criado com sucesso!");
      queryClient.invalidateQueries({ queryKey: [GET_PARTICIPANTS_KEY] });
    },
    onError: (err: AxiosError) => {
      console.error(err);
    },
  });
};

export const usePutParticipants = (): any => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: putParticipants,
    onSuccess: () => {
      toast.success("Participante alterado com sucesso!");
      queryClient.invalidateQueries({ queryKey: [GET_PARTICIPANTS_KEY] });
    },
    onError: (err: AxiosError) => {
      console.error(err);
    },
  });
};
