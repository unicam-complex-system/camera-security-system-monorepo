"use client";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import type { FC } from "react";
import React from "react";
import { Input, Button } from "@/components";
import { loginFormSchema } from "@/data";
import { login } from "@/api";
import { useNotificationSlice, useSessionSlice } from "@/hooks";
import { isEmptyObject } from "@/utils";

/* This container renders login sections */
export const LoginContainer: FC = () => {
  /* state*/
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(loginFormSchema),
  });
  const { openNotification } = useNotificationSlice();
  const { logIn } = useSessionSlice();

  /* event handlers */
  const onSubmit = async (data: any) => {
    try {
      setIsLoading(true);
      const result = await login(data);
      logIn({
        accessToken: result.data.access_token,
        user: {
          firstName: "Nabil Mohammed",
          lastName: "Khelifa",
          email: "nabil.nablotech@gmail.com",
          mobileNumber: "393513117160",
        },
      });
    } catch (error: any) {
      openNotification({ type: "error", message: error.response.data.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="font-bold text-2xl">CSS</div>
      <div className="pb-4">Login into your account</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <Input label="name" error={errors?.name?.message} {...field} />
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <Input
              label="Password"
              password
              error={errors?.password?.message}
              {...field}
            />
          )}
        />

        <div className="pt-2">
          <Button htmlType="submit" disabled={!isValid} loading={isLoading}>
            Login
          </Button>
        </div>
      </form>
    </div>
  );
};
