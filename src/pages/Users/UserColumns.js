import './css/styles.css'

export const userColumns = [
    {
        field: "id",
        headerName: "ID",
        headerAlign: "center",
        align: "center",
        cellClassName: "id-column--cell",  // Add the className here
    },
    {
        field: "name",
        headerName: "Name",
        headerAlign: "center",
        align: "center",
        flex: 1,
        valueGetter: (params) => `${params.row.firstName} ${params.row.lastName}`,
    },
    {
        field: "email",
        headerName: "Email",
        flex: 1,
        headerAlign: "center",
        align: "center",
    },
    {
        field: "role",
        headerName: "Role",
        flex: 1,
        headerAlign: "center",
        align: "center",
    }
    // {
    //     field: "enabled",
    //     headerName: "Enabled",
    //     flex: 1,
    //     headerAlign: "center",
    //     align: "center",
    // },

]