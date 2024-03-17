"use client";
import React, { useState } from "react";
import Link from "next/link";
import { IGenericReponse, ISignupCredential, IToaster } from "@/types";
import InputField from "@/components/common/InputField";
import Button from "@/components/common/Button";
import { makeApiCall } from "@/utils/makeApiCall";
import { useRouter } from "next/navigation";
import { Toaster } from "@/components/common/Toaster";
const Login = () => {
  const router = useRouter()
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false);
  const [loginCreds, setLoginCreds] = useState<Partial<ISignupCredential>>({
    email: "",
    password: "",
  });
  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginCreds((oldValue) => ({
      ...oldValue,
      email: event.target.value,
    }));
  };
  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginCreds((oldValue) => ({
      ...oldValue,
      password: event.target.value,
    }));
  };
  const handleLogin = async () => {
    try {
      setIsLoading(true)
      const { email, password } = loginCreds;
      const response = await makeApiCall<IGenericReponse<null>>({
        endpoint: "login",
        method: "POST",
        data: { email, password },
      });
      if (response.type === "Success") {
        router.push('/meeting')
      }
    } catch (e) {
      setError(e as string)
    }
    setIsLoading(false)
  };
  return (
    <div className="h-screen p-2 md:p-4 grid grid-col-1 md:grid-cols-2">
      <div className="hidden md:block"></div>
      <div className="flex justify-center items-center">
        <div
          className="flex flex-col bg-[#5c7481ab] dark:bg-[#f4f5f66a] shadow-lg p-5 rounded-lg
        min-w-[305px] w-full max-w-[350px]"
        >
          <div>
            <div className="text-center dark:text-white text-black font-medium text-2xl py-2 mb-4">
              <span>Login Page</span>
            </div>
            <div className="flex flex-col gap-2 mb-6">
              <div className="mb-3">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium dark:text-white text-black"
                >
                  Username
                </label>
                <InputField
                  label="Email"
                  type="email"
                  id="email"
                  value={loginCreds.email}
                  onChange={handleChangeEmail}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium dark:text-white text-black"
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
                label="Login"
                variant="primary"
                disabled={!loginCreds.email || !loginCreds.password}
                loading={isLoading}
                onClick={handleLogin}
              />
            </div>
            {
              error &&
              <div className="bg-white bg-opacity-50 text-xs text-black text-center mb-1 p-1">
                {error}
              </div>
            }
            <div className="text-xs text-right">
              <Link href={"/signup"}>
                <span className="border-b border-b-transparent hover:text-blue-600 hover:cursor-pointer pb-0.5 hover:border-b-blue-600 font-medium">
                  Create an account
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;

