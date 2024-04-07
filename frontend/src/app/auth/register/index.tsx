import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRegister } from "@/hooks";
import { inputOnChange } from "@/lib/inputOnChange";
import { LoaderIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const Register = () => {
  const navigate = useNavigate();
  const {
    inputs,
    inputErrors,
    onRegister,
    mutation,
    setInputErrors,
    setInputs,
    registerAs,
    setRegisterAs,
  } = useRegister();

  return (
    <div className="mx-auto flex w-full flex-col justify-center px-8 sm:px-8 md:px-24 lg:px-16 h-screen sm:h-screen md:h-full">
      <div className="flex flex-col">
        <h1 className="text-2xl font-semibold tracking-tight">
          Create an account
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter your email below to create your account
        </p>
      </div>
      <div className="grid gap-4 mt-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input
            name="name"
            placeholder="Jhon doe"
            type="name"
            autoCapitalize="none"
            autoComplete="name"
            autoCorrect="off"
            value={inputs.name}
            onChange={(e) => inputOnChange({ e, setInputs, setInputErrors })()}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            name="email"
            placeholder="name@example.com"
            type="email"
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect="off"
            value={inputs.email}
            onChange={(e) => inputOnChange({ e, setInputs, setInputErrors })()}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            name="password"
            placeholder="*******"
            type="password"
            autoCapitalize="none"
            autoComplete="password"
            autoCorrect="off"
            value={inputs.password}
            onChange={(e) => inputOnChange({ e, setInputs, setInputErrors })()}
          />
        </div>
        <RadioGroup
          className="flex"
          defaultValue={registerAs}
          // @ts-ignore
          onValueChange={(selectedValue) => setRegisterAs(selectedValue)}
        >
          <Label htmlFor="user">Register as </Label>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="user" id="user" />
            <Label htmlFor="user">User</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="admin" id="admin" />
            <Label htmlFor="admin">Admin</Label>
          </div>
        </RadioGroup>
        {(inputErrors.name || inputErrors.email || inputErrors.password) && (
          <p className="text-center text-red-500">
            {inputErrors.name || inputErrors.email || inputErrors.password}
          </p>
        )}
        <Button onClick={onRegister} disabled={mutation.isPending}>
          {mutation.isPending && (
            <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
          )}{" "}
          Register
        </Button>
      </div>
      <p className="flex justify-center gap-1 text-center text-sm text-muted-foreground mt-6">
        Already have an account?{" "}
        <div
          onClick={() => navigate("/auth/login", { replace: true })}
          className="cursor-pointer underline underline-offset-4 hover:text-primary"
        >
          Login!
        </div>
      </p>
    </div>
  );
};

export default Register;
