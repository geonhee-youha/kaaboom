import { Box, SxProps, Typography } from "@mui/material";
import youhaGrey from "../../constants/youhaGrey";
import { theme } from "../../themes/theme";
import React from "react";
import { pink } from "@mui/material/colors";

function DataRow({
  item,
}: {
  item: { label: string; value: React.ReactNode };
}) {
  return item.value ? (
    <Box
      sx={{
        width: "100%",
        display: "flex",
      }}
    >
      <Box
        sx={{
          width: 128,
          alignSelf: "stretch",
          borderRight: `1px solid ${youhaGrey[700]}`,
          display: "flex",
          //   justifyContent: "center",
          alignItems: "center",
          p: theme.spacing(1),
          background: youhaGrey[900],
        }}
      >
        <Typography
          sx={{
            fontSize: 14,
            lineHeight: "20px",
            fontWeight: "700",
            // textAlign: "center",
          }}
        >
          {item.label}
        </Typography>
      </Box>
      <Box
        sx={{
          flex: 1,
          alignSelf: "stretch",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          p: theme.spacing(0.25, 1.5),
          background: youhaGrey[800],
          fontFamily: "Poppins",
          "& .svg": {
            width: "auto",
            height: `16px !important`,
            mr: 1,
          },
          "& a": {
            color: pink[400],
          },
          fontSize: 14,
          lineHeight: "20px",
          flexWrap: "wrap",
          "& > *": {
            m: theme.spacing(0.25, 0),
          },
        }}
      >
        {item.value}
      </Box>
    </Box>
  ) : null;
}

export default function DataSection({
  data,
  sx,
}: {
  data: { label: string; value: React.ReactNode }[];
  sx?: SxProps;
}) {
  return (
    <Box
      sx={{
        ...sx,
      }}
    >
      <Box
        sx={{
          width: "100%",
          borderRadius: 1,
          border: `1px solid ${youhaGrey[700]}`,
          "& > *:not(:nth-of-type(1))": {
            borderTop: `1px solid ${youhaGrey[700]}`,
          },
          display: "flex",
          flexWrap: "wrap",
          overflow: "hidden",
        }}
      >
        {data.map((item, index) => {
          return <DataRow key={index} item={item} />;
        })}
      </Box>
    </Box>
  );
}
