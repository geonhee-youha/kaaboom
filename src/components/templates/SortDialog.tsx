import { Box, ButtonBase, Dialog, Typography } from "@mui/material";
import { SortProps, sorts } from "../../pages/projects";
import { Dispatch, SetStateAction } from "react";
import { useRouter } from "next/router";
import { grey, pink } from "@mui/material/colors";
import { theme } from "../../themes/theme";

type SortDialogProps = {
  sort: SortProps;
  setSort: Dispatch<SetStateAction<SortProps>>;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export default function SortDialog({
  sort,
  setSort,
  open,
  setOpen,
}: SortDialogProps) {
  const router = useRouter();
  const { lang } = router.query;
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      sx={{
        "& .MuiPaper-root": {
          width: "100%",
          maxWidth: 360,
        },
      }}
    >
      <Box
        sx={{
          p: theme.spacing(2),
          borderBottom: `1px solid ${grey[700]}`,
        }}
      >
        <Typography
          sx={{
            fontSize: 20,
            lineHeight: "32px",
            fontWeight: "700",
          }}
        >
          {lang?.toString() === "us" ? "Sort by" : "정렬"}
        </Typography>
      </Box>
      <Box sx={{ p: theme.spacing(1, 0) }}>
        {sorts.map((item, index) => {
          const checked = sort.value === item.value;
          const handleClick = () => {
            setSort(item);
            handleClose();
          };
          return (
            <ButtonBase
              key={index}
              onClick={handleClick}
              sx={{
                width: "100%",
                height: 44,
                alignItems: "center",
                p: theme.spacing(0, 2),
              }}
            >
              <Typography
                sx={{
                  fontSize: 14,
                  lineHeight: "20px",
                  color: checked ? pink[500] : "#ffffff",
                  fontWeight: checked ? "400" : "300",
                }}
              >
                {item.label[lang?.toString() ?? "kr"]}
              </Typography>
            </ButtonBase>
          );
        })}
      </Box>
    </Dialog>
  );
}
