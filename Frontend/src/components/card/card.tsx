import { PropsWithChildren } from "react";

type PropsType = {
  header?: React.ReactNode;
};

/**  This component renders a card*/
export const Card: React.FC<PropsWithChildren<PropsType>> = ({
  children,
  header,
}) => {
  return (
    <div className="min-w-[200px] inline-block border-solid border border-gray-200 rounded-md shadow-md">
      <div className="p-4 border-0 border-solid border-b border-gray-200 font-bold">
        {header && <>{header}</>}
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
};
