import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  IconLookup,
  IconName,
  IconPrefix,
} from "@fortawesome/fontawesome-svg-core";
import { Badge, SxProps } from "@mui/material";
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
    <Badge
      max={999}
      invisible={badgeInvisible}
      badgeContent={badgeCount}
      variant="dot"
      overlap="circular"
      color="error"
      sx={{
        color: color,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: `${size}px !important`,
        height: `${size}px !important`,
        // padding: `${padding}px !important`,
        fontSize: `${(size - 4) / 2}px !important`,
        overflow: "visible",
        "& .fa-secondary": {
          opacity: 0.4,
        },
        ...sx,
        "& .MuiBadge-badge": {
          width: 12,
          height: 12,
          minWidth: 4,
          backgroundColor: badgeColor,
          border: `1px solid #ffffff`,
          fontSize: 12,
          lineHeight: "16px",
          fontWeight: "700",
          borderRadius: "50%",
        },
      }}
      className={className}
      onClick={onClick}
    >
      <FontAwesomeIcon icon={icon} size="2x" className="fa-fw" />
    </Badge>
  );
}
