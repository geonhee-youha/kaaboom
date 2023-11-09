import { Box, ButtonBase, Typography } from "@mui/material";
import Visual from "../atoms/Visual";
import { useRouter } from "next/router";
import { theme } from "../../themes/theme";
import { grey } from "@mui/material/colors";

export type CelebProps = {
  id: string;
  name: { [key in string]: string };
  thumbnail: string;
};

export default function CelebItem({ item }: { item: CelebProps }) {
  const router = useRouter();
  const { lang } = router.query;
  const celeb = item;
  return (
    <ButtonBase
      sx={{
        width: "100%",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
      disableRipple
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
          aspectRatio: `1`,
          borderRadius: "50%",
          overflow: "hidden",
          backgroundColor: grey[900],
        }}
      >
        <Visual src={celeb.thumbnail} absolute forceShow />
      </Box>
      <Typography
        sx={{
          fontSize: 12,
          lineHeight: "16px",
          textAlign: "center",
          m: theme.spacing(1.5, 0, 0, 0),
        }}
      >
        {celeb.name[lang?.toString() ?? "kr"]}
      </Typography>
    </ButtonBase>
  );
}
