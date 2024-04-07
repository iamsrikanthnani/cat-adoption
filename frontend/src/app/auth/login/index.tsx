import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLogin } from "@/hooks";
import { inputOnChange } from "@/lib/inputOnChange";
import { LoaderIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { inputs, inputErrors, onLogin, mutation, setInputErrors, setInputs } =
    useLogin();
  return (
    <div className="mx-auto flex w-full flex-col justify-center px-8 sm:px-8 md:px-24 lg:px-16 h-screen sm:h-screen md:h-full">
      <div className="flex flex-col">
        <h1 className="text-2xl font-semibold tracking-tight">Welcome Back!</h1>
        <p className="text-sm text-muted-foreground">
          Securely sign in with your email and password.
        </p>
      </div>
      <div className="grid gap-4 mt-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            value={inputs.email}
            name="email"
            placeholder="name@example.com"
            type="email"
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect="off"
            onChange={(e) => inputOnChange({ e, setInputs, setInputErrors })()}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            value={inputs.password}
            name="password"
            placeholder="******"
            type="password"
            autoCapitalize="none"
            autoComplete="password"
            autoCorrect="off"
            onChange={(e) => inputOnChange({ e, setInputs, setInputErrors })()}
          />
        </div>
        {(inputErrors.email || inputErrors.password) && (
          <p className="text-center text-red-500">
            {inputErrors.email || inputErrors.password}
          </p>
        )}
        <Button onClick={onLogin} disabled={mutation.isPending}>
          {mutation.isPending && (
            <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
          )}{" "}
          Login
        </Button>
      </div>
      <p className="flex justify-center gap-1 text-center text-sm text-muted-foreground mt-6">
        Don't have an account?{" "}
        <div
          onClick={() => navigate("/auth/register", { replace: true })}
          className="cursor-pointer underline underline-offset-4 hover:text-primary"
        >
          Register!
        </div>
      </p>
    </div>
  );
};

export default Login;
