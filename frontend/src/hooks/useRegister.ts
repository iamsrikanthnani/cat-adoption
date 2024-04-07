import { useState } from "react";
import { toast } from "sonner";
import { emailRegex } from "@/lib/reg";
import { TYPES_REGISTER } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { REGISTER_API_URL } from "@/apis";

export const useRegister = () => {
  // STATES
  const [inputs, setInputs] = useState<TYPES_REGISTER>({
    name: "",
    email: "",
    password: "",
  });
  const [inputErrors, setInputErrors] = useState<TYPES_REGISTER>({
    name: "",
    email: "",
    password: "",
  });
  const [registerAs, setRegisterAs] = useState<"user" | "admin">("user");

  // Mutation hook for handling API calls
  const mutation = useMutation({
    mutationFn: async ({
      name,
      email,
      password,
    }: {
      name: string;
      email: string;
      password: string;
    }) => {
      try {
        const response = await fetch(`${REGISTER_API_URL}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password, role: registerAs }),
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
        throw new Error((error && error?.message) || "Register failed");
      }
    },
  });

  // RESTING STATES TO INITIAL
  const resetStates = () => {
    setInputs({
      name: "",
      email: "",
      password: "",
    });
    setInputErrors({
      name: "",
      email: "",
      password: "",
    });
  };

  // ON CLICK
  const onRegister = async () => {
    // Clear any previous input errors
    setInputErrors({ name: "", email: "", password: "" });

    // Destructure email and password from inputs
    const { name, email, password } = inputs;

    // Input validations
    if (!name) {
      setInputErrors((prevErrors) => ({
        ...prevErrors,
        name: "Name is required",
      }));
      return;
    }
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
    // @ts-ignore
    mutation.mutate({ name, email, password });
  };

  // RETURN
  return {
    inputs,
    setInputs,
    inputErrors,
    setInputErrors,
    onRegister,
    mutation,
    registerAs,
    setRegisterAs,
  };
};
