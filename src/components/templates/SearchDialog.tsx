import {
  Box,
  Dialog,
  InputBase,
  Paper,
  Stack,
  Typography,
  alpha,
} from "@mui/material";
import { ChangeEvent, KeyboardEvent, useState } from "react";
import { theme } from "../../themes/theme";
import IconButton from "../atoms/IconButton";
import TextButton from "../atoms/TextButton";
import youhaGrey from "../../constants/youhaGrey";
import youhaBlue from "../../constants/youhaBlue";
import { useRouter } from "next/router";
import _ from "lodash";
import { artists } from "../../data/artist";
import { groups } from "../../data/group";
import { agencies } from "../../data/agency";
import SearchItem from "../molecules/SearchItem";
import Empty from "../atoms/Empty";
import { InputProps, inputDefaultProps } from "../../constants";

export default function SearchDialog({}: {}) {
  //#region [router] 이동 및 쿼리
  const router = useRouter();
  const { searching, id } = router.query;
  const open = searching === "true";
  //#endregion [router] 이동 및 쿼리
  //#region [state] 본문
  const [input, setInput] = useState<InputProps>(inputDefaultProps);
  //#endregion [state] 본문
  //#region [임시] 검색결과
  const searchText = input.value;
  const searchedArtists = _.filter(artists, (el) => {
    return el.name.toLowerCase().includes(`${searchText}`.toLowerCase());
  });
  const searchedGroups = _.filter(groups, (el) => {
    return el.name.toLowerCase().includes(`${searchText}`.toLowerCase());
  });
  const searchedAgencies = _.filter(agencies, (el) => {
    return el.name.toLowerCase().includes(`${searchText}`.toLowerCase());
  });
  //#endregion [임시] 검색결과
  //#region [function] 본문
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const input = {
      ...inputDefaultProps,
      value: value,
    };
    setInput(input);
  };
  const onKeyPress = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      if (input.value !== "") {
        router.push(`/explore/search?searchText=${input.value}`);
      }
      onClose();
    }
  };
  //#endregion [function] 본문
  //#region [function] 닫기
  const onClose = () => {
    const firstOnly = "?searching=true";
    const first = "?searching=true&";
    const second = "&searching=true";
    const firstOnlyQuery = router.asPath.includes(firstOnly);
    const firstQuery = router.asPath.includes(first);
    const secondQuery = router.asPath.includes(second);
    router.push(
      secondQuery
        ? `${router.asPath.replace(second, "")}`
        : firstOnlyQuery
        ? `${router.asPath.replace(firstOnly, "")}`
        : firstQuery
        ? `${router.asPath.replace(first, "?")}`
        : router.asPath,
      undefined,
      {
        shallow: true,
      }
    );
    setInput(inputDefaultProps);
  };
  //#endregion [function] 닫기
  return (
    <Dialog
      open={open}
      onClose={onClose}
      onBackdropClick={onClose}
      aria-labelledby="playlist-dialog-title"
      aria-describedby="playlist-dialog-description"
      sx={{
        "& .MuiBackdrop-root": {
          backdropFilter: `blur(4px)`,
          backgroundColor: alpha(youhaGrey[900], 0.7),
        },
        "& .MuiDialog-paper": {
          backgroundColor: youhaGrey[900],
          border: `1px solid ${youhaGrey[700]}`,
          backgroundImage: `none`,
          width: "100%",
          maxWidth: 700,
          height: 480,
          "@media(max-width: 767px)": {
            maxWidth: "initial",
            maxHeight: "initial",
            m: theme.spacing(0),
            border: "none",
            height: "100%",
          },
        },
        position: "fixed",
        zIndex: 999999,
      }}
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={2}
        sx={{
          p: theme.spacing(0, 2, 0, 0),
          borderBottom: `1px solid ${youhaGrey[700]}`,
        }}
      >
        <Box
          sx={{
            flex: 1,
            position: "relative",
          }}
        >
          <IconButton
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: 56,
              height: 56,
              zIndex: 99,
              "@media(min-width: 961px)": {
                color: `${youhaGrey[300]} !important`,
              },
            }}
            disableRipple
            name="search"
            size={24}
            color={youhaBlue[500]}
          />
          <InputBase
            value={input.value}
            onChange={onChange}
            onKeyPress={onKeyPress}
            placeholder="Search for Kpop idols"
            sx={{
              borderRadius: 1,
              width: "100%",
              height: 56,
              p: theme.spacing(0, 5, 0, 7),
              display: "flex",
              alignItems: "center",
              "& input": {
                fontSize: 16,
                lineHeight: "24px !important",
                "&::placeholder": {
                  fontSize: 16,
                  lineHeight: "24px !important",
                  color: youhaGrey[400],
                  opacity: `1 important`,
                  fontWeight: "400",
                },
                "@media(min-width: 961px)": {
                  fontSize: 20,
                  lineHeight: "32px !important",
                  "&::placeholder": {
                    fontSize: 20,
                    lineHeight: "32px !important",
                  },
                },
              },
            }}
          />
        </Box>
        <TextButton
          size="sm"
          label="Cancel"
          borderColor={youhaGrey[700]}
          backgroundColor={alpha(youhaGrey[800], 1)}
          onClick={onClose}
        />
      </Stack>
      <Box
        sx={{
          height: "100%",
          flex: 1,
          overflowY: "scroll",
          position: "relative",
        }}
      >
        {input.value === "" ? (
          <></>
        ) : [...searchedArtists, ...searchedGroups, ...searchedAgencies]
            .length <= 0 ? (
          <Empty full>
            <Typography
              sx={{
                fontSize: 14,
                lineHeight: "20px",
                color: youhaGrey[200],
              }}
            >
              No results for "{input.value}"
            </Typography>
          </Empty>
        ) : (
          <Box
            sx={{
              p: theme.spacing(7, 0, 1, 0),
              "@media(min-width: 961px)": {
                p: theme.spacing(1, 0, 7, 0),
              },
            }}
          >
            {searchedArtists.map((item, index) => {
              const newItem = {
                id: item.id,
                name: item.name,
                description: item.group?.name ?? "SOLO",
                thumbnail: item.thumbnail,
              };
              return (
                <SearchItem
                  key={index}
                  searchText={input.value}
                  type="artist"
                  item={newItem}
                />
              );
            })}
            {searchedGroups.map((item, index) => {
              const newItem = {
                id: item.id,
                name: item.name,
                description: item.agency?.name ?? "SOLO",
                thumbnail: item.thumbnail,
              };
              return (
                <SearchItem
                  key={index}
                  searchText={input.value}
                  type="group"
                  item={newItem}
                />
              );
            })}
            {searchedAgencies.map((item, index) => {
              const newItem = {
                id: item.id,
                name: item.name,
                thumbnail: item.thumbnail,
              };
              return (
                <SearchItem
                  key={index}
                  searchText={input.value}
                  type="agency"
                  item={newItem}
                />
              );
            })}
          </Box>
        )}
      </Box>
      {input.value !== "" &&
        [...searchedArtists, ...searchedGroups, ...searchedAgencies].length >
          0 && (
          <Paper
            onClick={() => {
              if (input.value !== "") {
                router.push(`/explore/search?searchText=${input.value}`);
              }
              onClose();
            }}
            sx={{
              position: "absolute",
              top: 56 + 16,
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 9,
              height: 32,
              p: theme.spacing(0, 2),
              display: "flex",
              alignItems: "center",
              borderRadius: 2,
              backgroundColor: youhaGrey[900],
              border: `1px solid ${youhaGrey[600]}`,
              "@media(min-width: 961px)": {
                top: "initial",
                bottom: 16,
              },
            }}
          >
            <Typography
              sx={{
                fontSize: 12,
                lineHeight: "16px",
              }}
            >
              View all results
            </Typography>
          </Paper>
        )}
    </Dialog>
  );
}
