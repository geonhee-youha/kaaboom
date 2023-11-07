import { Container } from "@mui/material";
import HomeMainBanner, {
  HomeMainBannerItemProps,
} from "../components/organisms/HomeMainBanner";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function App() {
  return (
    <Container>{/* <HomeMainBanner data={testHomeMainBanner} /> */}</Container>
  );
}
