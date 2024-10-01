import { toast } from "sonner";
import { AxiosError } from "axios";
import { useQuery, useMutation, UseQueryResult, useQueryClient } from "@tanstack/react-query";

import { LinksGet } from "../models/links";
import { getLinks, postLinks } from "../services/links";

export const GET_LINKS_KEY = "links";

export const useGetLinks = (id: string): UseQueryResult<LinksGet[]> =>
  useQuery<LinksGet[]>({
    enabled: !!id,
    queryKey: [GET_LINKS_KEY, id],
    queryFn: () => getLinks(id),
  });

export const usePostLinks = (): any => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postLinks,
    onSuccess: () => {
      toast.success("Link criado com sucesso!");
      queryClient.invalidateQueries({ queryKey: [GET_LINKS_KEY] });
    },
    onError: (err: AxiosError) => {
      console.error(err);
    },
  });
};
