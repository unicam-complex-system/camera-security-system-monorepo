/* eslint-disable react/display-name */
import { Input as AntInput } from "antd";
import type { InputProps } from "antd";
import React from "react";

type PropsType = {
  label: string;
  error?: string;
  password?: boolean;
} & InputProps;

/**  This component renders a input field */
export const Input = React.forwardRef<HTMLInputElement, PropsType>(
  ({ label, password = false, error = undefined, ...props }, ref:any) => {
    return (
      <div className="py-1">
        <div className={"font-bold pb-2"}>{label}</div>
        {password && (
          <AntInput.Password
            status={error ? "error" : undefined}
            {...props}
            ref={ref}
          />
        )}
        {!password && (
          <AntInput status={error ? "error" : undefined} {...props} ref={ref} />
        )}
        {error && <p className="text-danger">{error}</p>}
      </div>
    );
  }
);
