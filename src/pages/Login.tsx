import React from "react";
import { useForm, Controller } from "react-hook-form";

import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { useAuth } from "../contexts/AuthContex";

export const Login = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "teste@teste.com",
      password: "123456",
    },
  });
  const { handleLogin } = useAuth();

  const onSubmit = async (data: Record<string, unknown>) => {
    const { email, password } = data;
    await handleLogin(email as string, password as string);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <p className="pointer-events-none text-5xl  font-extrabold tracking-tight">
        DEV<span className="text-orange-500">AULT</span>
      </p>
      <form className="w-2/4" onSubmit={handleSubmit(onSubmit)}>
        <label className="mb-2 block font-bold text-orange-700">E-Mail</label>
        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ field: { onChange, value } }) => {
            return (
              <Input
                placeholder="Enter your Email"
                value={value}
                onChange={(e) => {
                  onChange(e.target.value);
                }}
              />
            );
          }}
        />
        <label className="mb-2 mt-4 block font-bold text-orange-700">
          Password
        </label>
        <Controller
          name="password"
          control={control}
          defaultValue=""
          render={({ field: { onChange, value } }) => {
            return (
              <Input
                type="password"
                placeholder="Enter your Password"
                value={value}
                onChange={(e) => {
                  onChange(e.target.value);
                }}
              />
            );
          }}
        />
        <div className="mt-4">
          <Button type="submit">Login</Button>
        </div>
        <div className="flex gap-2">
          <div className="mt-4 w-full">
            <Button>Sign Up</Button>
          </div>
          <div className="mt-4 w-full">
            <Button>Recover Password</Button>
          </div>
        </div>
      </form>
    </div>
  );
};

Login.displayName = "LoginPage";
