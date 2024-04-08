import {
  FAVORITES_ADD_API_URL,
  FAVORITES_API_URL,
  FAVORITES_REMOVE_API_URL,
} from "@/apis";
import { useAuthContext } from "@/contexts/auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { useCats } from "./useCats";

export const useFavorites = ({ enabled }: { enabled: boolean }) => {
  const { onSignOut } = useAuthContext();
  const accessToken = localStorage.getItem("accessToken");
  const { refetch: refetchCats } = useCats({ enabled: false });

  const isFavorites = window.location.pathname.includes("/favorites");

  // UseQuery hook to fetch cat data
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["favorites"],
    queryFn: async () => {
      const response = await fetch(`${FAVORITES_API_URL}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await response.json();
      return data;
    },
    enabled: enabled,
  });

  // Mutation function for adding a favorite
  const addOrRemoveFavoriteMutation = useMutation({
    // Define addFavoriteMutation mutation function
    mutationFn: async (payload: {
      catId: number;
      action: "add" | "remove";
    }) => {
      // Define async mutation function with catId parameter
      try {
        const response = await fetch(
          payload?.action === "add"
            ? FAVORITES_ADD_API_URL
            : FAVORITES_REMOVE_API_URL,
          {
            // Send request to add favorite
            method: payload?.action === "add" ? "POST" : "DELETE", // Use POST method
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`, // Attach authorization token
            },
            body: JSON.stringify({ catId: payload?.catId }), // Convert catId to JSON string and send in the body
          }
        );
        const data = await response.json(); // Parse response data
        if (response.status === 401) {
          // Handle unauthorized access
          onSignOut(); // Call sign out function
          // Display error message
          toast.error("Unauthorized request. Please sign in again.");
          return null;
        }
        if (data?.statusCode === 400 || data?.statusCode === 404) {
          toast.error(data.message);
          return null;
        }
        if (isFavorites) {
          refetch();
        } else {
          refetchCats();
        }
        // Display success message
        toast.success(
          `Cat ${
            payload?.action === "add" ? "added to" : "removed from"
          }  favorites`
        );
        return data; // Return response data
      } catch (error: any) {
        // Catch and handle errors
        throw new Error((error && error?.message) || "Failed to add favorite"); // Display error message
      }
    },
  });

  // toggle add or remove favorite
  const onAddOrRemove = (catId: number, action: "add" | "remove") => {
    addOrRemoveFavoriteMutation.mutate({ catId, action });
  };

  return {
    favorites: data?.favorites,
    favoritesIsLoading: isLoading,
    favoritesRefetch: refetch,
    onAddOrRemove,
    addOrRemoveFavoriteMutation,
  };
};
