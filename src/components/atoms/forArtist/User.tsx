import { ButtonBase } from "@mui/material";
import { MouseEventHandler } from "react";
import { blue, brown, deepPurple, green, indigo, lightBlue, pink, purple, red, teal } from "@mui/material/colors";
import Visual from "../Visual";
import youhaGrey from "../../../constants/youhaGrey";
import Icon from "../Icon";

export default function User({
  item,
  onClick,
  size = 40,
}: {
  item: any;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  size?: number;
}) {
  return item.thumbnail ? (
    <ButtonBase onClick={onClick}>
      <Visual
        src={item.thumbnail}
        sx={{
          width: size,
          height: size,
          borderRadius: "50%",
          overflow: "hidden",
          backgroundColor: youhaGrey[800],
          border: `1px solid ${youhaGrey[600]}`,
        }}
      />
    </ButtonBase>
  ) : (
    <ButtonBase
      sx={{
        width: size,
        height: size,
        borderRadius: "50%",
        overflow: "hidden",
        backgroundColor:
          item.gender === "M"
            ? deepPurple['A400']
            : item.gender === "F"
            ? red['A400']
            : brown['A400'],
        border: `1px solid ${youhaGrey[600]}`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      onClick={onClick}
    >
      <Icon
        name="user"
        prefix="fas"
        color={youhaGrey[100]}
        size={(size / 5) * 3}
      />
    </ButtonBase>
  );
}
