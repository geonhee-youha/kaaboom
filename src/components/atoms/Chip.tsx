import { ButtonBase, SxProps, Typography, alpha } from "@mui/material";
import youhaGrey from "../../constants/youhaGrey";
import { theme } from "../../themes/theme";
import { MouseEventHandler } from "react";
import youhaBlue from "../../constants/youhaBlue";

export default function Chip({
  fullWidth,
  focused,
  onClick,
  label,
  sx,
}: {
  fullWidth?: boolean;
  focused?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  label: string;
  sx?: SxProps;
}) {
  return (
    <ButtonBase
      onClick={onClick}
      sx={{
        height: 32,
        borderRadius: 16,
        border: `1px solid ${focused ? youhaBlue[500] : youhaGrey[400]}`,
        backgroundColor: focused ? alpha(youhaBlue[500], 0.4) : youhaGrey[700],
        justifyContent: "center",
        alignItems: "center",
        p: theme.spacing(2),
        flex: fullWidth ? 1 : "initial",
        ...sx
      }}
    >
      <Typography
        sx={{
          fontSize: 14,
          lineHeight: `20px`,
        }}
      >
        {label}
      </Typography>
    </ButtonBase>
  );
}
