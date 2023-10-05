import { Box, Typography } from "@mui/material";
import React from "react";
import { theme } from "../../themes/theme";

type SectionHeaderProps = {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
};

export default function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  return (
    <Box
      sx={{
        p: theme.spacing(2),
      }}
    >
      <Typography
        sx={{
          fontSize: 20,
          lineHeight: "32px",
          fontWeight: "700",
        }}
      >
        {title}
      </Typography>
      {subtitle && (
        <Typography
          sx={{
            fontSize: 14,
            lineHeight: "20px",
          }}
        >
          {subtitle}
        </Typography>
      )}
    </Box>
  );
}
