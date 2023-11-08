import { useRouter } from "next/router";
import BackHeader from "../../components/organisms/BackHeader";
import { testCelebs, testProjects } from "../home";
import Visual from "../../components/atoms/Visual";
import _ from "lodash";
import { Box, Container } from "@mui/material";

export default function Index() {
  const router = useRouter();
  const { id, en } = router.query;
  const contents =
    testProjects[_.findIndex(testProjects, (el) => el.id === id)];
  const celeb =
    testCelebs[_.findIndex(testCelebs, (el) => el.id === contents.celeb.id)];
  return (
    <>
      <BackHeader />
      <Container>
        <Box sx={{ position: "absolute", top: 0, left: 0, right: 0 }}>
          <Box
            sx={{
              position: "relative",
              aspectRatio: `10 / 16`,
            }}
          >
            <Visual src={contents.thumbnail} absolute />
          </Box>
        </Box>
      </Container>
    </>
  );
}
