import {
  ConfigProvider,
  theme as antTheme,
  Button as AntButton,
  Tooltip,
} from "antd";
import type { ButtonProps } from "antd/es/button/button";
import { PropsWithChildren } from "react";
import { ColorVariant } from "@/types";
import { theme } from "../../../theme";

type PropsType = {
  variant?: ColorVariant;
  toolTipText?: string;
} & ButtonProps;

type ButtonWrapperPropsType = {
  toolTipText?: string;
};

const getButtonColor = (variant: ColorVariant) => {
  switch (variant) {
    case "danger": {
      return theme.colors.dangerColor;
    }

    case "warning": {
      return theme.colors.warningColor;
    }
  }
  return theme.colors.secondaryColor;
};

const { useToken } = antTheme;

const ButtonWrapper: React.FC<PropsWithChildren<ButtonWrapperPropsType>> = ({
  toolTipText,
  children,
}) => (
  <>
    {toolTipText ? <Tooltip title={toolTipText}>{children}</Tooltip> : children}
  </>
);

/**  This component renders a button */
export const Button: React.FC<PropsWithChildren<PropsType>> = ({
  children,
  variant = "primary",
  toolTipText,
  type = "primary",
  ...props
}) => {
  const { token } = useToken();
  const buttonColor: string = getButtonColor(variant);
  const modifiedTheme = {
    token: {
      ...token,
      colorPrimary: buttonColor,
      colorPrimaryHover: buttonColor + "AA",
      colorPrimaryActive: buttonColor,
    },
  };

  return (
    <ConfigProvider theme={modifiedTheme}>
      <ButtonWrapper toolTipText={toolTipText}>
        <AntButton type="primary" {...props}>
          {children}
        </AntButton>
      </ButtonWrapper>
    </ConfigProvider>
  );
};
