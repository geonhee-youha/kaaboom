import { Box, ButtonBase } from "@mui/material";
import Screen from "../../components/atoms/forArtist/Screen";
import { useState } from "react";

type FilterItemProps = {
  value: string;
  lable: string;
};

const filterItems = [
  { value: "requested", label: "Requested" },
  { value: "completed", label: "Completed" },
  { value: "expired", label: "Expired" },
  { value: "declined", label: "Declined" },
  { value: "canceled", label: "Canceled" },
];

function FilterItem() {
  return <ButtonBase></ButtonBase>;
}

export default function Index() {
  const [filter, setFilter] = useState<FilterItemProps | undefined>(undefined);
  return (
    <Screen>
      <Box sx={{ height: 100, backgroundColor: "red" }} />
    </Screen>
  );
}
