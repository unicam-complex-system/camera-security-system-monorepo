"use client";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import type { FC } from "react";
import React from "react";
import { generateSettingFormSchema } from "@/utils";
import { Input, Button } from "@/components";
import { updateCamera, queryClient } from "@/api";
import { useCameraSlice, useNotificationSlice } from "@/hooks";
import { useMutation } from "react-query";

/* This container renders setting form  */

type PropsType = {};

export const SettingsContainer: FC<PropsType> = () => {
  /* state*/
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { cameras } = useCameraSlice();
  console.log(cameras);
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    setValue
  } = useForm({
    resolver: yupResolver(
      generateSettingFormSchema(cameras.map((item) => item.id))
    ),
  });
  const { openNotification } = useNotificationSlice();
  const { mutate } = useMutation(updateCamera, {
    onSuccess: () => {
      queryClient.invalidateQueries('cameras')
    },
  });


  /* event handlers */
  const onSubmit = async (data: any) => {
    try {
      setIsLoading(true);
      console.log(data);
      mutate(data);
      openNotification({
        type: "success",
        message: "Updated Successfully.",
      });
    } catch (error: any) {
      openNotification({
        type: "error",
        message: error?.response?.data
          ? error.response?.data?.message
          : error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (cameras.length > 0) {
      cameras.forEach(
        (camera) => { setValue(camera.id.toString(), camera.name) }
      )
    }

  }, [cameras])

  return (
    <div className="flex flex-col">
      <form onSubmit={handleSubmit(onSubmit)}>
        {cameras.map((camera) => (
          <Controller
            key={camera.id}
            name={camera.id.toString()}
            control={control}
            render={({ field }) => (
              <Input
                label={`Camera: ${camera.id}`}
                error={errors?.[camera.id.toString()]?.message?.toString()}
                {...field}
              />
            )}
          />
        ))}

        <div className="pt-2">
          <Button
            htmlType="submit"
            disabled={!isValid}
            loading={isLoading}
          >
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};
