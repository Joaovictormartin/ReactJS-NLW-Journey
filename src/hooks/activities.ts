import { toast } from "sonner";
import { AxiosError } from "axios";
import { useQuery, useMutation, UseQueryResult, useQueryClient } from "@tanstack/react-query";

import { ActivitiesGet } from "../models/activities";
import { getActivities, postActivities } from "../services/activities";

export const GET_ACTIVITIES_KEY = "activities";

export const useGetActivities = (id: string): UseQueryResult<ActivitiesGet[]> =>
  useQuery<ActivitiesGet[]>({
    enabled: !!id,
    queryKey: [GET_ACTIVITIES_KEY, id],
    queryFn: () => getActivities(id),
  });

export const usePostActivities = (): any => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postActivities,
    onSuccess: () => {
      toast.success("Atividade criada com sucesso!");
      queryClient.invalidateQueries({ queryKey: [GET_ACTIVITIES_KEY] });
    },
    onError: (err: AxiosError) => {
      console.error(err);
    },
  });
};
