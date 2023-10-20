import { Box } from "@mui/material";
import Screen from "../../components/atoms/forArtist/Screen";
import { useEffect, useState } from "react";
import { theme } from "../../themes/theme";
import {
  OrderProps,
  tempLoadedMessagesState,
  tempOrders,
} from "../../constants/recoils";
import _ from "lodash";
import { atom, useRecoilState } from "recoil";
import MessageItem from "../../components/molecules/forArtist/MessageItem";
import { useRouter } from "next/router";

export default function Index() {
  const router = useRouter()
  const [tempLoaded, setTempLoaded] = useRecoilState(tempLoadedMessagesState);
  const [data, setData] = useState<{ id: string; requests: OrderProps[] }[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(false);
  function getMessagesByUser() {
    let arr = [];
    const userIds = _.uniq(
      _.filter(tempOrders, (el) => el.state === "completed").flatMap(
        (el) => el.user.id
      )
    );
    arr = userIds.map((el) => {
      const id = el;
      return {
        id: id,
        requests: _.filter(tempOrders, (el) => el.user.id === id),
      };
    });
    return arr;
  }
  useEffect(() => {
    setLoading(true);
    if (!tempLoaded) {
      setTimeout(() => {
        setData(getMessagesByUser());
        setTempLoaded(true);
        setLoading(false);
      }, 350);
    } else {
      setData(getMessagesByUser());
      setLoading(false);
    }
  }, []);
  return <Screen loading={loading}>{data && <Page data={data} />}</Screen>;
}

function Page({ data }: { data: { id: string; requests: OrderProps[] }[] }) {
  return (
    <>
      <Box
        sx={{
          p: theme.spacing(2, 0),
        }}
      >
        {data.map((item, index) => {
          return <MessageItem key={index} item={item} />;
        })}
      </Box>
    </>
  );
}
