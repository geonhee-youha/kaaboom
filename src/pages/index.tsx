import { Container } from "@mui/material";
import HomeMainBanner, {
  HomeMainBannerItemProps,
} from "../components/organisms/HomeMainBanner";

const testHomeMainBanner: HomeMainBannerItemProps[] = [
  {
    id: "1",
    thumbnail:
      "/temp/celeb/1.jpeg",
    title: (
      <>
        당신이 도경수에게
        <br />
        원하는 콘텐츠는?
      </>
    ),
    description: (
      <>
        아이돌부터 영화배우까지,<br/>
        완벽주의자 도경수의 다음 콘텐츠는?
      </>
    ),
  },
  {
    id: "2",
    thumbnail:
      "https://www.circlin.co.kr/assets/banners/home/banner_home_02.png",
    title: "300명 코치 양성\n민주쌤의 노하우",
    description:
      "국제재활코어필라테스 본부장,\n체형교정 코치에게만 공개했던\n진짜 체형교정 노하우",
  },
  {
    id: "3",
    thumbnail:
      "https://www.circlin.co.kr/assets/banners/home/banner_home_03.png",
    title: "VIP들의 코치\n제니쌤의 비밀수업",
    description:
      "강북 최대규모의 필라테스 센터,\n필라테스 모브의 원장 제니쌤이\nVIP 코칭을 공개합니다.",
  },
];

export default function App() {
  return (
    <Container>
      <HomeMainBanner data={testHomeMainBanner} />
    </Container>
  );
}
