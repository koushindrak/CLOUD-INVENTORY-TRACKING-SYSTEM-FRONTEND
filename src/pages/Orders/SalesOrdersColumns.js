import IconButton from "@mui/material/IconButton";
import {ViewList} from "@mui/icons-material";

export const columns = [
    {
        field: "SalesorderId",
        headerName: "Sales Order Id",
        headerAlign: "center",
        align: "center",
        flex: 1,
    },
    {
        field: "CustomerId",
        headerName: "Customer Id",
        headerAlign: "center",
        align: "center",
        cellClassName: "id-column--cell",  // Add the className here
    },
    {
        field: "PurchaseOrder",
        headerName: "Purchase Order",
        headerAlign: "center",
        align: "center",
        flex: 1,
    },
    {
        field: "DateEntered",
        headerName: "Date Entered",
        flex: 1,
        headerAlign: "center",
        align: "center",
        valueFormatter: (params) => {
            const date = new Date(params.value);
            return new Intl.DateTimeFormat('en-US', {
                year: 'numeric',
                month: 'short',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            }).format(date);
        },
    }
];
