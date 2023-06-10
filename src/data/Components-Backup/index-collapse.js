import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import AddComponents from './AddComponent-collapse';

function createData(id, name, pcbCategoryId, pcbCategoryName, productIds, description) {
    return {
        id,
        name,
        pcbCategoryId,
        pcbCategoryName,
        productIds,
        description,
        comps: [
            {
                Component: 'Component 1',
                Compid: '1',
                SerialNumber: '1234',
                Descript: 'Description 1'
            },
            {
                Component: 'Component 2',
                Compid: '2',
                SerialNumber: '6789',
                Descript: 'Description 2'
            }
        ]
    };
}

function Row(props) {
    const {row} = props;
    const [open, setOpen] = React.useState(false);

    const handleEdit = () => {
        // Handle edit functionality here
    };

    const handleDelete = () => {
        // Handle delete functionality here
    };

    return (
        <React.Fragment>
            <TableRow sx={{'& > *': {borderBottom: 'unset'}}}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="big"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.id}
                </TableCell>
                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center">{row.pcbCategoryId}</TableCell>
                <TableCell align="center">{row.pcbCategoryName}</TableCell>
                <TableCell align="center">{row.productIds.length}</TableCell>
                <TableCell align="center">{row.description}</TableCell>
                <TableCell align="center">
                    <IconButton aria-label="edit" size="small" onClick={handleEdit}>
                        <EditIcon/>
                    </IconButton>
                    <IconButton aria-label="delete" size="small" onClick={handleDelete}>
                        <DeleteIcon/>
                    </IconButton>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={8}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{margin: 1}}>
                            <Typography variant="h6" gutterBottom component="div">
                                Components
                            </Typography>
                            <Table size="small" aria-label="components">
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={{fontWeight: 'bold'}}>Component</TableCell>
                                        <TableCell style={{fontWeight: 'bold'}}>Comp ID</TableCell>
                                        <TableCell style={{fontWeight: 'bold'}}>Serial Number</TableCell>
                                        <TableCell style={{fontWeight: 'bold'}}>Description</TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.comps.map((comp) => (
                                        <TableRow key={comp.Compid}>
                                            <TableCell component="th" scope="row">
                                                {comp.Component}
                                            </TableCell>
                                            <TableCell>{comp.Compid}</TableCell>
                                            <TableCell>{comp.SerialNumber}</TableCell>
                                            <TableCell>{comp.Descript}</TableCell>
                                            <TableCell align="center">
                                                <IconButton aria-label="edit" size="small">
                                                    <EditOutlinedIcon/>
                                                </IconButton>
                                                <IconButton aria-label="delete" size="small">
                                                    <DeleteOutlinedIcon/>
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

Row.propTypes = {
    row: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        pcbCategoryId: PropTypes.number.isRequired,
        pcbCategoryName: PropTypes.string.isRequired,
        productIds: PropTypes.arrayOf(PropTypes.number).isRequired,
        description: PropTypes.string.isRequired,
        comps: PropTypes.arrayOf(
            PropTypes.shape({
                Component: PropTypes.string.isRequired,
                Compid: PropTypes.string.isRequired,
                SerialNumber: PropTypes.string.isRequired,
                Descript: PropTypes.string.isRequired
            })
        ).isRequired
    }).isRequired
};

const rows = [
    createData(1, 'PCB1', 1, 'Category 1', [1, 2, 3], 'Description 1'),
    createData(2, 'PCB2', 2, 'Category 2', [4, 5], 'Description 2')
];

function CollapsibleTable() {
    const [openAddComponent, setOpenAddComponent] = React.useState(false);

    const handleAddPCB = () => {
        setOpenAddComponent(true);
    };

    return (
        <div>
            <Box m="20px" display="flex" justifyContent="flex-end">
                <IconButton
                    onClick={handleAddPCB}
                    variant="outlined"
                    sx={{
                        top: 0,
                        right: 10,
                        zIndex: 1000,
                        color: 'white',
                        backgroundColor: 'lightseagreen',
                        borderRadius: 0,
                        padding: '8px',
                        fontSize: '18px'
                    }}
                    startIcon={<AddIcon/>}
                >
                    + Add PCBs
                </IconButton>
            </Box>
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell/>
                            <TableCell style={{fontWeight: 'bold'}}>ID</TableCell>
                            <TableCell style={{fontWeight: 'bold'}} align="center">Name</TableCell>
                            <TableCell style={{fontWeight: 'bold'}} align="center">PCB Category ID</TableCell>
                            <TableCell style={{fontWeight: 'bold'}} align="center">PCB Category Name</TableCell>
                            <TableCell style={{fontWeight: 'bold'}} align="center">Number of Products</TableCell>
                            <TableCell style={{fontWeight: 'bold'}} align="center">Description</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <Row key={row.id} row={row}/>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <AddComponents
                open={openAddComponent}
                handleClose={() => setOpenAddComponent(false)}
            />
        </div>
    );
}


export default CollapsibleTable;
