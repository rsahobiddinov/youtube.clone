import { useQuery } from "@tanstack/react-query";
import { api } from "../../config/axios";

export const useGetVideos = () => {
  const { isSuccess, data, isPending } = useQuery({
    queryKey: ["get-all-videos"],
    queryFn: async () => {
      return await api.get(`/video/feed/videos?limit=${20}&page=${1}`);
    },
    refetchOnWindowFocus: false,
    staleTime: 0,
  });
  return { isSuccess, data, isPending };
};
