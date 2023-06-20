import {tokens} from '../theme';

export const getTableStyle = (theme) => {
    const colors = tokens(theme.palette.mode);
    return {
        m: '40px 0 0 0',
        height: '75vh',
        '& .MuiDataGrid-root': {
            border: 'none',
        },
        '& .MuiDataGrid-cell': {
            fontSize: '1.2em',
            borderBottom: 'none',
        },
        '& .name-column--cell': {
            color: colors.greenAccent[300],
        },
        '& .id-column--cell': {
            // color: colors.redAccent[400],
            fontWeight: 'bold',
            fontSize: '1.2em',
        },
        '& .MuiDataGrid-columnHeaders': {
            backgroundColor: '#847343',
            color: 'white',
            borderBottom: 'none',
        },
        '& .MuiDataGrid-virtualScroller': {
            backgroundColor: colors.primary[400],
        },
        '& .MuiDataGrid-footerContainer': {
            borderTop: 'none',
            backgroundColor: '#847343',
        },
        '& .MuiCheckbox-root': {
            color: `${colors.greenAccent[200]} !important`,
        },
    };
};

