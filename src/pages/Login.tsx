import React, { useState } from "react";

import { Button, ButtonVariant } from "../components/Button";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: Validate username and password and perform login
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <p className="pointer-events-none text-5xl  font-extrabold tracking-tight">
        DEV<span className="text-orange-500">AULT</span>
      </p>
      <form className="w-2/4" onSubmit={handleSubmit}>
        <label className="mb-2 block font-bold text-orange-700">Username</label>
        <input
          className="block w-full rounded-lg bg-orange-200 p-2"
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={handleUsernameChange}
        />
        <label className="mb-2 mt-4 block font-bold text-orange-700">
          Password
        </label>
        <input
          className="block w-full rounded-lg bg-orange-200 p-2"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={handlePasswordChange}
        />
        <div className="mt-4">
          <Button>Login</Button>
        </div>
        <div className="flex gap-2">
          <div className="mt-4 w-full">
            <Button variant={ButtonVariant.PRIMARY}>Registrar</Button>
          </div>
          <div className="mt-4 w-full">
            <Button>Recuperar senha</Button>
          </div>
        </div>
      </form>
    </div>
  );
};

Login.displayName = "LoginPage";
