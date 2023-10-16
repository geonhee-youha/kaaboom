import { Box, InputBase, SxProps, Typography, alpha } from "@mui/material";
import { red } from "@mui/material/colors";
import { ChangeEvent, KeyboardEventHandler, useEffect, useState } from "react";
import youhaBlue from "../../constants/youhaBlue";
import youhaGrey from "../../constants/youhaGrey";
import { theme } from "../../themes/theme";
import Icon from "./Icon";
import IconButton from "./IconButton";

export default function Input({
  error,
  helperText,
  type,
  maxLength,
  minLength,
  multiline,
  essential,
  searchIcon,
  size,
  placeholder,
  value,
  onChange,
  onKeyPress,
  onKeyDown,
  onClickSearch,
  label,
  sx,
  children,
  timer,
  showMaxLength,
  uneditable,
  maxRows = 3,
  minRows,
  allowtMaxLength = false,
}: {
  error?: boolean;
  helperText?: React.ReactNode;
  type?: string;
  maxLength?: number;
  minLength?: number;
  multiline?: boolean;
  essential?: boolean;
  searchIcon?: boolean;
  size?: string;
  placeholder?: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onKeyPress?: React.KeyboardEventHandler<HTMLDivElement> | undefined;
  onKeyDown?:
    | KeyboardEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined;
  onClickSearch?: (e: any) => void;
  label?: React.ReactNode;
  sx?: SxProps;
  children?: React.ReactNode;
  timer?: string;
  showMaxLength?: boolean;
  uneditable?: boolean;
  maxRows?: number;
  minRows?: number;
  allowtMaxLength?: boolean;
}) {
  const [inputType, setInputType] = useState<string | undefined>(undefined);
  const onChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (!allowtMaxLength && maxLength && value.length > maxLength) return;
    onChange(event);
  };
  const onClickEye = () => {
    setInputType(inputType === "password" ? undefined : "password");
  };
  useEffect(() => {
    setInputType(type);
  }, [type]);
  return (
    <Box
      sx={{
        position: "relative",
        ...sx,
      }}
    >
      {label && (
        <InputLabel>
          {label}
          {essential && <span>*</span>}
        </InputLabel>
      )}
      <Box
        sx={{
          position: "relative",
          display: "flex",
        }}
      >
        <InputBase
          type={inputType}
          value={value}
          onChange={onChangeValue}
          onKeyPress={onKeyPress}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          multiline={multiline}
          maxRows={minRows ?? maxRows}
          sx={{
            opacity: uneditable ? 0.4 : 1,
            width: "100%",
            height: multiline
              ? minRows
                ? minRows * 24 + (size === "small" ? 12 : 16) * 2 + 16
                : "auto"
              : size === "sm"
              ? 40
              : 48,
            minHeight: multiline
              ? size === "sm"
                ? 40 * 2
                : 48 * 2
              : "initial",
            p: multiline
              ? theme.spacing(
                  size === "small" ? 1.5 : 2,
                  2,
                  size === "small" ? 1.5 : 4,
                  2
                )
              : theme.spacing(0, 5, 0, 2),
            borderRadius: 1,
            display: "flex",
            alignItems: multiline ? "flex-start" : "center",
            boxShadow: `${
              error ? red[500] : youhaGrey[600]
            } 0px 0px 0px 1px inset`,
            "&:hover": {
              boxShadow: `${
                error ? red[500] : youhaGrey[400]
              } 0px 0px 0px 1px inset`,
            },
            "&.Mui-focused": {
              boxShadow: `${
                error ? red[500] : "#ffffff"
              } 0px 0px 0px 2px inset`,
              "& input": {
                "&::placeholder": {
                  color: youhaGrey[400],
                },
              },
              "& textarea": {
                "&::placeholder": {
                  color: youhaGrey[400],
                },
              },
            },
            backgroundColor: alpha(youhaGrey[700], 1),
            "& input": {
              fontSize: size === "sm" ? 14 : 16,
              lineHeight: size === "sm" ? "20px" : "24px",
              "&::placeholder": {
                color: youhaGrey[500],
                opacity: 1,
              },
            },
            "& textarea": {
              fontSize: size === "sm" ? 14 : 16,
              lineHeight: size === "sm" ? "20px" : "24px",
              "&::placeholder": {
                color: youhaGrey[500],
                opacity: 1,
              },
            },
          }}
        />
        {searchIcon && (
          <IconButton
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              width: size === "sm" ? 40 : 48,
              height: size === "sm" ? 40 : 48,
            }}
            disableRipple
            onClick={onClickSearch}
            name="search"
            size={size === "sm" ? 16 : 20}
          />
        )}
        {type === "password" && (
          <IconButton
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              width: size === "sm" ? 40 : 48,
              height: size === "sm" ? 40 : 48,
            }}
            disableRipple
            onClick={onClickEye}
            name={inputType === "password" ? "eye" : "eye-slash"}
            color={youhaGrey[400]}
            className="eye"
          />
        )}
        {(maxLength || timer) && showMaxLength && (
          <Typography
            sx={{
              position: "absolute",
              right: 12,
              bottom: 8,
              fontSize: 12,
              lineHeight: "16px",
              color: timer
                ? Number(timer.replace(":", "")) < 5
                  ? red[500]
                  : youhaBlue[500]
                : youhaGrey[200],
              "& span": {
                color: error ? red[500] : youhaGrey[100],
                fontWeight: error ? "700" : "initial",
              },
            }}
          >
            {timer ? (
              timer
            ) : (
              <>
                <span>{value.length}</span>/{maxLength}
              </>
            )}
          </Typography>
        )}
        {children}
      </Box>
      {helperText && (
        <Box
          sx={{
            m: theme.spacing(1, 0, 0, 0),
            display: "flex",
            alignItems: "flex-start",
          }}
        >
          <Icon
            size={14}
            name="exclamation-circle"
            color={red[500]}
            sx={{
              m: theme.spacing(0.125, 0.5, 0, 0),
            }}
          />
          <Typography
            sx={{
              fontSize: 12,
              lineHeight: "16px",
              color: red[500],
            }}
          >
            {helperText}
          </Typography>
        </Box>
      )}
    </Box>
  );
}

export function InputLabel({ children }: { children: React.ReactNode }) {
  return (
    <Typography
      sx={{
        fontSize: 14,
        lineHeight: "20px",
        fontWeight: 500,
        m: theme.spacing(0, 0, 1, 0),
        "& span": {
          color: youhaBlue[500],
          m: theme.spacing(0, 0, 0, 0.5),
        },
      }}
    >
      {children}
    </Typography>
  );
}
