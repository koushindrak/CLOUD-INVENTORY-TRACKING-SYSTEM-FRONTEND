import './css/styles.css'
import {getSuggestedComponentById} from "../ComponentsSourcing/GetSuggestedComponentById";
import { Link } from 'react-router-dom';

export const componentColumns = (dispatch, navigate) => [
    {
        field: "id",
        headerName: "ID",
        headerAlign: "center",
        align: "center",
        hide: true,
        cellClassName: "id-column--cell",  // Add the className here
    },
    {
        field: "mfrptn",
        headerName: "MFRPTN",
        headerAlign: "center",
        align: "center",
        width: 150,
        renderCell: (params) => (
            <Link to={`/sourcing/${params.row.mfrptn}`}>
                {params.row.mfrptn}
            </Link>
        ),
        // flex: 1,
    },
    {
        field: "description",
        headerName: "Description",
        headerAlign: "center",
        align: "center",
        width: 200,
        // flex: 1,
    },
    {
        field: "componentCategoryName",
        headerName: "Category",
        flex: 1,
        headerAlign: "center",
        align: "center",
    },
    {
        field: "footprint",
        headerName: "FOOTPRINT",
        flex: 1,
        headerAlign: "center",
        align: "center",
    },
    {
        field: "value",
        headerName: "VALUE",
        flex: 1,
        headerAlign: "center",
        align: "center",
    },
    {
        field: "isObselete",
        headerName: "Obsolete",
        flex: 1,
        headerAlign: "center",
        align: "center",
    },
    {
        field: "threshold",
        headerName: "Threshold",
        flex: 1,
        headerAlign: "center",
        align: "center",
    },
    {
        field: "stock",
        headerName: "Stock",
        flex: 1,
        headerAlign: "center",
        align: "center",
    }

]