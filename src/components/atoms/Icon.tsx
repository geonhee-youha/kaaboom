import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  IconLookup,
  IconName,
  IconPrefix,
} from "@fortawesome/fontawesome-svg-core";
import { Badge, Box, SxProps } from "@mui/material";
import { red } from "@mui/material/colors";
import { MouseEventHandler } from "react";

export type IconProps = {
  name: IconName;
  prefix?: IconPrefix;
  badgeCount?: number;
  size?: any;
  padding?: number;
  className?: string;
  color?: string;
  sx?: SxProps;
  onClick?: MouseEventHandler<HTMLSpanElement> | undefined;
};

export default function Icon({
  name = "circle",
  prefix = "fal",
  badgeCount,
  size = 20,
  padding = 2,
  className,
  color = "#ffffff",
  sx,
  onClick,
}: IconProps) {
  const icon: IconLookup = { prefix: prefix, iconName: name };
  const badgeInvisible = badgeCount === undefined;
  const badgeColor = red[400];
  return (
    <Box
      sx={{
        color: color,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: `${size + 4}px !important`,
        height: `${size + 4}px !important`,
        // padding: `${padding}px !important`,
        fontSize: `${size}px !important`,
        overflow: "visible",
        "& .fa-secondary": {
          opacity: 0.4,
        },
        ...sx,
      }}
      className={className}
      onClick={onClick}
    >
      <FontAwesomeIcon icon={icon} size="1x" fixedWidth={false} />
    </Box>
  );
}
