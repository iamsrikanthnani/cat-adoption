import { CATS_API_URL } from "@/apis";
import { useAuthContext } from "@/contexts/auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

export const useCats = ({ enabled }: { enabled?: boolean }) => {
  let { id = null } = useParams<"id">();
  const navigate = useNavigate();
  const { onSignOut } = useAuthContext();

  // UseQuery hook to fetch cat data
  const { data, isLoading, refetch } = useQuery({
    queryKey: id ? ["cats", id] : ["cats"],
    queryFn: async () => {
      const response = await fetch(
        id ? `${CATS_API_URL}/${id}` : `${CATS_API_URL}`
      );
      const data = await response.json();
      return data;
    },
    enabled: enabled,
  });

  // Mutation function for deleting a cat
  const deleteCatMutation = useMutation({
    mutationFn: async () => {
      const accessToken = localStorage.getItem("accessToken");
      try {
        const response = await fetch(`${CATS_API_URL}/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const data = await response.json();
        if (data?.statusCode === 401) {
          onSignOut(); // Call sign out function
          toast.error("Unauthorized request. Please sign in again.");
          return null;
        }
        if (data?.statusCode === 500) {
          toast.error("Cannot be able to delete cat.");
          return null;
        }
        refetch(); // Refetch cat data
        navigate("/");
        toast.success("Cat deleted successfully");
        return data;
      } catch (error: any) {
        throw new Error((error && error?.message) || "Failed to manage cat");
      }
    },
  });

  // Function to handle delete operation
  const deleteCat = async () => {
    try {
      await deleteCatMutation.mutate();
    } catch (error) {
      // Handle delete operation error
      console.error("Error deleting cat:", error);
    }
  };

  // Function to navigate to cat update page
  const onClickEdit = () => {
    navigate(`/cat/update/${id}`);
  };

  return {
    data,
    isLoading,
    refetch,
    deleteCat,
    deleteCatMutation,
    onClickEdit,
  };
};
