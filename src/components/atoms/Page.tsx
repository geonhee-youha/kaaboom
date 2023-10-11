import { Box, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { theme } from "../../themes/theme";
import { useRouter } from "next/router";

export default function Page({ needId, aside, narrow, children }: { needId?: boolean, aside?: boolean, narrow?: boolean, children?: React.ReactNode }) {
    const router = useRouter();
    const { id } = router.query;
    const [mounted, setMounted] = useState<boolean>(false);
    useEffect(() => {
        setMounted(true);
    }, []);
    return mounted && (needId ? (id !== '' && id !== undefined && id !== null) : true) ? (
        <Box
            sx={narrow ?
                {
                    width: `100%`,
                    minWidth: "280px",
                    maxWidth: `480px`,
                    minHeight: "60vh",
                    m: theme.spacing(0, "auto"),
                    p: theme.spacing(0, 0, 12, 0),
                } : aside ? {
                    display: "flex",
                    width: `100%`,
                    minWidth: "280px",
                    maxWidth: `1280px`,
                    m: theme.spacing(0, "auto"),
                    minHeight: "100vh",
                    flexDirection: "column-reverse",
                    "@media(min-width: 960px)": {
                        flexDirection: "row-reverse",
                    },
                } :
                    {
                        width: `100%`,
                        minWidth: "280px",
                        maxWidth: `1280px`,
                        m: theme.spacing(0, "auto"),
                        minHeight: "100vh",
                        p: theme.spacing(0, 0, 12, 0),
                    }}
        >{children}</Box>) : <Box sx={{ minHeight: "100vh" }} />
}