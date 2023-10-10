import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";
import { grey, pink } from "@mui/material/colors";
import Icon from "../atoms/Icon";
import { FaqProps } from "../../data";
import { theme } from "../../themes/theme";
import youhaGrey from "../../constants/youhaGrey";

export default function FaqItem({
  item,
  open,
}: {
  item: FaqProps;
  open?: boolean;
}) {
  const { question, answer } = item;
  return (
    <>
      <Accordion
        defaultExpanded={open}
        sx={{
          borderBottom: "none",
          background: "none",
          color: "rgb(242, 242, 242)",
          boxShadow: "none",
          "&.MuiPaper-root.Mui-expanded": {
            mt: `0 !important`,
            mb: `0 !important`,
          },
          "&.MuiAccordion-root:after": {
            top: "-1px",
            left: 0,
            right: 0,
            height: "1px",
            content: '""',
            opacity: "1 !important",
            position: "absolute",
            transition: "none",
            backgroundColor: youhaGrey[700],
          },
          "&.Mui-expanded": {
            "& .icon-angle-down": {
              transform: "rotate(180deg)",
            },
          },
        }}
      >
        <AccordionSummary
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{
            pl: "0 !important",
            pr: "0 !important",
            minHeight: `56px !important`,
            height: `56px !important`,
            maxHeight: `56px !important`,
            alignItems:'center',
            "& .MuiAccordionSummary-content": {
              m: `0 !important`,
            },
          }}
        >
          <Typography
            sx={{
              flex: 1,
              fontSize: 14,
              lineHeight: "20px",
              fontWeight: "700",
              p: theme.spacing(1, 2),
            }}
          >
            Q. {question}
          </Typography>
          <Box
            sx={{
              p: theme.spacing(1, 2),
            }}
          >
            <Icon
              name="angle-down"
              size={20}
              sx={{
                transition: "all 0.35s ease",
                width: 24,
                height: 24,
                color: youhaGrey[300],
              }}
              prefix="fas"
              className="icon-angle-down"
            />
          </Box>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            pl: "0 !important",
            pr: "0 !important",
            pt: `0 !important`,
          }}
        >
          <Typography
            sx={{
              fontSize: 14,
              lineHeight: "20px",
              color: youhaGrey[300],
              "& a": {
                textDecoration: "underline",
                color: "#ffffff",
              },
              wordBreak: "keep-all",
              p: theme.spacing(0, 2, 0, 2),
            }}
          >
            A. {answer}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </>
  );
}
