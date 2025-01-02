import { toast } from "sonner";
import { AxiosError } from "axios";
import { useQuery, useMutation, UseQueryResult, useQueryClient } from "@tanstack/react-query";

import { TripGet } from "../models/trips";
import { GET_ACTIVITIES_KEY } from "./activities";
import { getTrip, postTrip, putTrip } from "../services/trips";

export const GET_TRIPS_KEY = "trips";

export const useGetTrips = (id: string): UseQueryResult<TripGet> =>
  useQuery<TripGet>({
    enabled: !!id,
    queryKey: [GET_TRIPS_KEY, id],
    queryFn: () => getTrip(id),
  });

export const usePostTrips = (): any => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postTrip,
    onSuccess: ({ data }) => {
      toast.success("Viagem criada com sucesso!");
      queryClient.invalidateQueries({ queryKey: [GET_TRIPS_KEY] });

      return data;
    },
    onError: (err: AxiosError) => {
      if (err.response?.status === 400) {
        toast.error(err.response?.data?.message);
      } else {
        console.error(err);
      }
    },
  });
};

export const usePutTrips = (): any => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: putTrip,
    onSuccess: () => {
      toast.success("Viagem alterada com sucesso!");
      queryClient.invalidateQueries({ queryKey: [GET_TRIPS_KEY] });
      queryClient.invalidateQueries({ queryKey: [GET_ACTIVITIES_KEY] });
    },
    onError: (err: AxiosError) => {
      console.log("🚀 ~ usePutTrips ~ err:", err);
    },
  });
};
