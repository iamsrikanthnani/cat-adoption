import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { CATS_API_URL } from "@/apis";
import { toast } from "sonner";
import { useAuthContext } from "@/contexts/auth";
import { useCats } from "./useCats";
import { useNavigate, useParams } from "react-router-dom";

export const useManageCat = () => {
  let { id = null } = useParams<"id">();
  const { onSignOut } = useAuthContext();
  const { data, refetch } = useCats({ enabled: false });
  const navigate = useNavigate();

  const [catData, setCatData] = useState({
    name: "",
    age: 0,
    breed: "",
    gender: "male",
    images: [] as string[],
  });
  const [inputErrors, setInputErrors] = useState({
    name: "",
    age: "",
    breed: "",
    gender: "",
    images: "",
  });
  const [image, setImage] = useState("");

  useEffect(() => {
    if (id) {
      setCatData({
        name: data?.name,
        age: data?.age,
        breed: data?.breed,
        gender: data?.gender,
        images: data?.images,
      });
    }
  }, [id, data]);

  // Mutation hook for handling API calls
  const mutation = useMutation({
    // Define mutation function
    mutationFn: async (catData: any) => {
      // Define async mutation function
      const accessToken = localStorage.getItem("accessToken"); // Get access token from local storage
      try {
        const response = await fetch(
          // Send request to API
          id ? `${CATS_API_URL}/${id}` : `${CATS_API_URL}`, // Use id to determine URL
          {
            method: id ? "PUT" : "POST", // Determine HTTP method based on id existence
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`, // Attach authorization token
            },
            body: JSON.stringify({
              // Convert cat data to JSON string
              name: catData.name,
              age: parseInt(catData.age),
              breed: catData.breed,
              gender: catData.gender,
              images: catData.images,
            }),
          }
        );
        const responseData = await response.json(); // Parse response data
        if (response.status === 401) {
          onSignOut(); // Call sign out function
          toast.error("Unauthorized request. Please sign in again.");
          return null;
        }
        refetch(); // Refetch cat data
        navigate("/");
        toast.success(`Cat ${id ? "Updated" : "Added"} successfully`);
        return responseData; // Return response data
      } catch (error: any) {
        // Catch and handle errors
        throw new Error((error && error?.message) || "Failed to manage cat");
      }
    },
  });

  // FUNCTION TO ADD OR UPDATE CAT
  const manageCat = async () => {
    try {
      // Validate input data
      const errors = validateInput(catData);
      if (Object.keys(errors).length > 0) {
        // Check if there are validation errors
        setInputErrors(errors); // Set input errors
        return;
      }

      await mutation.mutateAsync(catData); // Call mutation function
    } catch (error) {
      console.error("Error managing cat:", error); // Log error message
    }
  };

  // Validate input data
  const validateInput = (data: any) => {
    const errors: any = {};

    // Required field validations
    if (!data.name.trim()) {
      errors.name = "Name is required";
    }
    if (!data.breed.trim()) {
      errors.breed = "Breed is required";
    }
    if (!data.gender) {
      errors.gender = "Gender is required";
    }
    if (!data.images || data.images.length === 0) {
      errors.images = "At least one image URL is required";
    } else {
      // Validate image URLs
      data.images.forEach((url: string, index: number) => {
        if (!url.trim()) {
          errors[`image-${index}`] = "Image URL is required";
        } else if (!isValidUrl(url)) {
          errors[`image-${index}`] = "Invalid URL";
        }
      });
    }

    // Age validation
    if (isNaN(data.age) || data.age <= 0 || data.age > 20) {
      errors.age = `Age must be a positive number and less than or equal to ${20}`;
    }

    return errors;
  };

  // Function to validate URL format
  const isValidUrl = (url: string) => {
    const pattern = new RegExp(
      "^(https?://)?((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$",
      "i"
    );
    return !!pattern.test(url); // Return true if URL matches pattern, false otherwise
  };

  // Function to handle adding a new image URL
  const handleAddImage = () => {
    // Define function to add a new image URL
    if (isValidUrl(image)) {
      // Check if image URL is valid
      if (catData.images.length + 1 <= 3) {
        // Check if maximum images limit is reached
        setCatData((prevCatData) => ({
          // Add image URL to cat data
          ...prevCatData,
          images: [...prevCatData.images, image],
        }));
        setImage(""); // Clear image URL input
      } else {
        toast.error("You can only add a maximum of 3 images");
      }
    } else {
      toast.error("Image URL is not valid");
    }
  };

  // Function to handle removing an image URL
  const handleRemoveImage = (index: number) => {
    setCatData((prevCatData) => {
      const updatedImages = [...prevCatData.images];
      updatedImages.splice(index, 1); // Remove image URL at specified index
      return {
        ...prevCatData,
        images: updatedImages, // Update images array
      };
    });
  };

  // RETURN
  return {
    catData,
    setInputs: setCatData,
    inputErrors,
    manageCat,
    mutation,
    setInputErrors,
    handleRemoveImage,
    handleAddImage,
    image,
    setImage,
    isCatEdit: Boolean(id),
  };
};
