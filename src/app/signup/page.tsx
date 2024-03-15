"use client";
import React, { useState } from "react";
import Link from "next/link";
import { ILoginCredential } from "../../types/interface";
import InputField from "@/components/common/InputField";
import Button from "@/components/common/Button";
const Login = () => {
  const [loginCreds, setLoginCreds] = useState<ILoginCredential>({
    name: "",
    password: "",
  });
  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginCreds((oldValue) => ({
      ...oldValue,
      name: event.target.value,
    }));
  };
  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginCreds((oldValue) => ({
      ...oldValue,
      password: event.target.value,
    }));
  };
  const handleSignup = () => {};
  return (
    <div className="h-screen p-2 md:p-4 grid grid-col-1 md:grid-cols-2">
      <div className="hidden md:block"></div>
      <div className="flex justify-center items-center">
        <div
          className="flex flex-col bg-[#5c7481ab] dark:bg-[#f4f5f6ab] shadow-lg p-5 rounded-lg
        min-w-[305px] w-full max-w-[350px]"
        >
          <>
            <form onSubmit={handleSignup}>
              <div className="text-center dark:text-black text-white font-medium text-2xl py-4 mb-4">
                <span>Signup Page</span>
              </div>
              <div className="flex flex-col gap-2 mb-6">
                <div className="mb-3">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-white dark:text-black"
                  >
                    Username
                  </label>
                  <InputField
                    label="Email"
                    type="email"
                    id="email"
                    value={loginCreds.name}
                    onChange={handleChangeName}
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-white dark:text-black"
                  >
                    Password
                  </label>
                  <InputField
                    label="Password"
                    type="password"
                    id="password"
                    value={loginCreds.password}
                    onChange={handleChangePassword}
                  />
                </div>
              </div>
              <div className="text-center mb-2">
                <Button
                  label="Signup"
                  disabled={!loginCreds.name || !loginCreds.password}
                />
              </div>
              <div className="text-xs flex justify-end items-center gap-1">
                <span>Already have an account?</span>
                <Link href={"/login"}>
                  <span className="border-b border-b-transparent hover:text-blue-600 hover:cursor-pointer pb-0.5 hover:border-b-blue-600 font-medium">
                    sign in
                  </span>
                </Link>
              </div>
            </form>
          </>
        </div>
      </div>
    </div>
  );
};
export default Login;

