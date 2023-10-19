import { Box, ButtonBase, Typography } from "@mui/material";
import { OrderProps, tempUsers } from "../../../constants/recoils";
import User from "../../atoms/forArtist/User";
import _ from "lodash";
import { theme } from "../../../themes/theme";
import Typo from "../../atoms/Typo";
import youhaGrey from "../../../constants/youhaGrey";
import moment from "moment";
import { useRouter } from "next/router";

export default function MessageItem({
  item,
}: {
  item: { id: string; requests: OrderProps[] };
}) {
  const router = useRouter();
  const user = tempUsers[_.findIndex(tempUsers, (el) => el.id === item.id)];
  const lastOrder = item.requests[item.requests.length - 1];
  const onClick = () => {
    router.push(
      {
        query: { ...router.query, messageId: item.id },
      },
      undefined,
      { shallow: true }
    );
  };
  return (
    <ButtonBase
      sx={{
        width: "100%",
        p: theme.spacing(1.5, 2),
      }}
      disableRipple
      onClick={onClick}
    >
      <User item={user} size={48} />
      <Box
        sx={{
          flex: 1,
          m: theme.spacing(0, 0, 0, 2),
        }}
      >
        <Typo
          lines={1}
          sx={{
            flex: 1,
            fontSize: 14,
            lineHeight: "20px",
            fontWeight: "700",
          }}
        >
          {user.name}
        </Typo>
        <Typo
          lines={1}
          sx={{
            flex: 1,
            fontSize: 14,
            lineHeight: "20px",
            // color: youhaGrey[300],
            m: theme.spacing(0.5, 0, 0, 0),
          }}
        >
          Request completed
        </Typo>
        <Typography
          sx={{
            fontSize: 12,
            lineHeight: "16px",
            color: youhaGrey[300],
            m: theme.spacing(0.5, 0, 0, 0),
          }}
        >
          {moment(lastOrder.date).format("hh:mm A MM/DD/YYYY")}
        </Typography>
      </Box>
    </ButtonBase>
  );
}
