import { tokens } from "../../../theme";

export const getPcbStyles = (theme) => {
    const colors = tokens(theme.palette.mode);
    return {
        m: "40px 0 0 0",
        height: "75vh",
        "& .MuiDataGrid-root": {
            border: "none",
        },
        "& .MuiDataGrid-cell": {
            borderBottom: "none",
        },
        "& .name-column--cell": {
            color: colors.greenAccent[300],
        },
        "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "lightseagreen",
            color: "white",
            borderBottom: "none",
        },
        "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
        },
        "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: "lightseagreen",
        },
        "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
        },
    }
}
