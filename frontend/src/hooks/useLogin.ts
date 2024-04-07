import { useState } from "react";
import { toast } from "sonner";
import { emailRegex } from "@/lib/reg";
import { TYPES_LOGIN } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { LOGIN_API_URL } from "@/apis";

export const useLogin = () => {
  // STATES
  const [inputs, setInputs] = useState<TYPES_LOGIN>({
    email: "",
    password: "",
  });
  const [inputErrors, setInputErrors] = useState<TYPES_LOGIN>({
    email: "",
    password: "",
  });

  // Mutation hook for handling API calls
  const mutation = useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      try {
        const response = await fetch(`${LOGIN_API_URL}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        if (data?.message) {
          toast.error(data?.message);
          return null;
        }
        toast.success(`Hello 👋, Welcome back!`);
        resetStates();
        return data;
      } catch (error: any) {
        throw new Error((error && error?.message) || "Login failed");
      }
    },
  });

  // RESTING STATES TO INITIAL
  const resetStates = () => {
    setInputs({
      email: "",
      password: "",
    });
    setInputErrors({
      email: "",
      password: "",
    });
  };

  // ON CLICK
  const onLogin = async () => {
    // Clear any previous input errors
    setInputErrors({ email: "", password: "" });

    // Destructure email and password from inputs
    const { email, password } = inputs;

    // Input validations
    if (!email) {
      setInputErrors((prevErrors) => ({
        ...prevErrors,
        email: "Email is required",
      }));
      return;
    }
    if (!emailRegex.test(email)) {
      setInputErrors((prevErrors) => ({
        ...prevErrors,
        email: "Invalid email address",
      }));
      return;
    }
    if (!password) {
      setInputErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password is required",
      }));
      return;
    }

    mutation.mutate({ email, password });
  };

  // RETURN
  return {
    inputs,
    setInputs,
    inputErrors,
    setInputErrors,
    onLogin,
    mutation,
  };
};
