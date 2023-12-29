import { Input as AntInput } from "antd";
import type { InputProps } from "antd";

type PropsType = {
  label: string;
  error?: string;
  password?: boolean;
} & InputProps;

/**  This component renders a input field */
export const Input: React.FC<PropsType> = ({
  label,
  password = false,
  error = undefined,
  ...props
}) => {
  return (
    <div className="py-1">
      <div className={"font-bold pb-2"}>{label}</div>
      {password && (
        <AntInput.Password status={error ? "error" : undefined} {...props} />
      )}
      {!password && (
        <AntInput status={error ? "error" : undefined} {...props} />
      )}
      {error && <p className="text-danger">{error}</p>}
    </div>
  );
};
