import { Box, Stack, Typography } from "@mui/material";
import { theme } from "../../themes/theme";
import _ from "lodash";
import ExploreHeader from "../../components/organisms/ExploreHeader";
import Page from "../../components/atoms/Page";
import { useRecoilState } from "recoil";
import { ordersState, tempOrders } from "../../constants/recoils";
import Empty from "../../components/atoms/Empty";
import youhaGrey from "../../constants/youhaGrey";
import TextButton from "../../components/atoms/TextButton";
import Link from "next/link";
import youhaBlue from "../../constants/youhaBlue";
import { OrderItem } from "../../components/molecules/OrderItem";

export default function Index() {
  const [orders, setOrders] = useRecoilState(ordersState);
  const data = _.sortBy(tempOrders, "date");
  return (
    <Page>
      <Box
        sx={{
          p: theme.spacing(6, 2, 0, 2),
        }}
        className="Section"
      >
        <ExploreHeader title="My Orders" data={data} label="results" />
        {data.length === 0 ? (
          <Empty>
            <Typography
              sx={{
                fontSize: 16,
                lineHeight: "24px",
                textAlign: "center",
                fontWeight: "500",
              }}
            >
              No purchased KAABOOM
            </Typography>
            <Link href="/explore/artists" passHref>
              <TextButton
                size="lg"
                label={"Browse artists"}
                color={youhaBlue[400]}
              />
            </Link>
            <Typography
              sx={{
                fontSize: 14,
                lineHeight: "20px",
                color: youhaGrey[200],
                textAlign: "center",
              }}
            >
              you might like.
            </Typography>
          </Empty>
        ) : (
          <Stack spacing={2}>
            {data.map((item, index) => {
              return <OrderItem key={index} item={item} />;
            })}
          </Stack>
        )}
      </Box>
    </Page>
  );
}
