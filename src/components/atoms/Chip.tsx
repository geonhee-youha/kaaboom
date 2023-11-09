import { Box, ButtonBase, Typography } from "@mui/material";
import { theme } from "../../themes/theme";
import { grey } from "@mui/material/colors";
import Icon from "./Icon";
import { MouseEventHandler } from "react";
import Visual from "./Visual";

type ChipProps = {
  checked?: boolean;
  children?: React.ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  thumbnail?: string;
};

export default function Chip({
  checked,
  children,
  onClick,
  thumbnail,
}: ChipProps) {
  const backgroundColor = checked ? '#ffffff' : grey[900];
  const color = checked ? "#121212" : grey[400];
  return (
    <ButtonBase
      sx={{
        display: "inline-flex",
        height: 36,
        alignItems: "center",
        p: theme.spacing(0, 2),
        backgroundColor: backgroundColor,
        borderRadius: 12,
        m: theme.spacing(1, 1, 0, 0),
      }}
      onClick={onClick}
    >
      {thumbnail && (
        <Box
          sx={{
            height: 24,
            width: 24,
            background: grey[900],
            borderRadius: "50%",
            overflow: "hidden",
            position: "relative",
            m: theme.spacing(0, 1, 0, -1),
          }}
        >
          <Visual src={thumbnail} absolute />
        </Box>
      )}
      <Typography
        sx={{
          fontSize: 12,
          lineHeight: "16px",
          fontWeight: "400",
          color: color,
        }}
      >
        {children}
      </Typography>
      {checked && (
        <Icon
          name="xmark-circle"
          prefix="fas"
          size={16}
          color={color}
          sx={{
            m: theme.spacing(0, -0.5, 0, 0.5),
          }}
        />
      )}
    </ButtonBase>
  );
}
