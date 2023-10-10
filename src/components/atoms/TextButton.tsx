import { ButtonBase, SxProps, Typography } from "@mui/material";
import React, { MouseEventHandler } from "react";
import { theme } from "../../themes/theme";

type TextButtonProps = {
  fullWidth?: boolean;
  disableRipple?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  label?: React.ReactNode;
  borderColor?: string;
  backgroundColor?: string;
  color?: string;
  fontWeight?: string;
  sx?: SxProps;
  size?: string;
  children?: React.ReactNode;
};

export default function TextButton({
  fullWidth,
  disableRipple = false,
  onClick,
  label = "button",
  borderColor = "transparent",
  backgroundColor = "transparent",
  color = "#ffffff",
  fontWeight = "400",
  size,
  sx,
  children,
}: TextButtonProps) {
  return (
    <ButtonBase
      sx={{
        width: fullWidth ? "100%" : "auto",
        height: size === "sm" ? 32 : size === "lg" ? 48 : 40,
        borderRadius: 1,
        justifyContent: "center",
        alignItems: "center",
        p: theme.spacing(0, size === "sm" ? 1 : size === "lg" ? 2 : 1.5),
        border: `1px solid ${borderColor}`,
        backgroundColor: backgroundColor,
        ...sx,
      }}
      disableRipple={disableRipple}
      onClick={onClick}
    >
      <>
        <Typography
          sx={{
            fontSize: size === "sm" ? 12 : size === "lg" ? 16 : 14,
            lineHeight:
              size === "sm" ? `16px` : size === "lg" ? "24px" : "20px",
            fontWeight: fontWeight,
            color: color,
          }}
        >
          {label}
        </Typography>
        {children}
      </>
    </ButtonBase>
  );
}
