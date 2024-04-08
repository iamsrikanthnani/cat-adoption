import { CATS_API_URL } from "@/apis";
import { useQuery } from "@tanstack/react-query";

export const useCats = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["cats", "123"],
    queryFn: async () => {
      const response = await fetch(CATS_API_URL);
      const data = await response.json();
      return data;
    },
  });

  return { data, isLoading, refetch };
};
