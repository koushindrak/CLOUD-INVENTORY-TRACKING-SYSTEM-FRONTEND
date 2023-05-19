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
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  const handleEdit = () => {
    // Handle edit functionality here
  };

  const handleDelete = () => {
    // Handle delete functionality here
  };

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
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
            <EditIcon />
          </IconButton>
          <IconButton aria-label="delete" size="small" onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                <b>Components</b>
              </Typography>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell style={{ fontWeight: 'bold' }}>ID</TableCell>
                    <TableCell style={{ fontWeight: 'bold' }}>Component Name</TableCell>
                    <TableCell style={{ fontWeight: 'bold' }}>Serial Number</TableCell>
                    <TableCell style={{ fontWeight: 'bold' }}>Description</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.comps.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.Compid}</TableCell>
                      <TableCell>{item.Component}</TableCell>
                      <TableCell>{item.SerialNumber}</TableCell>
                      <TableCell>{item.Descript}</TableCell>
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
    description: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    pcbCategoryId: PropTypes.number.isRequired,
    pcbCategoryName: PropTypes.string.isRequired,
    productIds: PropTypes.array.isRequired
  }).isRequired
};

const data = {
  data: [
    {
      description: 'This is PCB 1',
      id: 1,
      name: 'PCB 1',
      pcbCategoryId: 1234,
      pcbCategoryName: 'Category Name 1',
      productIds: [45454545]
    },
    {
      description: 'This is PCB 2',
      id: 2,
      name: 'PCB 2',
      pcbCategoryId: 6789,
      pcbCategoryName: 'Category Name 5',
      productIds: [987654]
    }
  ],
  displayMessage: 'string'
};

const rows = data.data.map((item) =>
  createData(item.id, item.name, item.pcbCategoryId, item.pcbCategoryName, item.productIds, item.description)
);

export default function CollapsibleTable() {
  const handleAddPCB = () => {
    // Handle add PCB functionality here
    const columns = [
      {
        field: "id",
        headerName: "ID",
        headerAlign: "center",
        align: "center",
      },
      {
        field: "name",
        headerName: "Name",
        flex: 1,
        cellClassName: "name-column--cell",
        headerAlign: "center",
        align: "center",
      },
      {
        field: "description",
        headerName: "Description",
        headerAlign: "center",
        align: "center",
        flex: 1,
      },
      {
        field: "serialNumber",
        headerName: "Serial Number",
        flex: 1,
        headerAlign: "center",
        align: "center",
      },
      {
        field: "productCategoryName",
        headerName: "Category",
        flex: 1,
        headerAlign: "center",
        align: "center",
      },
      {
        headerName: "Actions",
        headerAlign: "center",
        align: "center",
        flex: 1,
        renderCell: (params) => {
          return (
            <div>
              <IconButton color="secondary" onClick={() => handleEdit(params.row)}>
                <EditOutlinedIcon />
              </IconButton>
              <IconButton color="secondary" onClick={() => handleDelete(params.row)}>
                <DeleteOutlinedIcon />
              </IconButton>
            </div>
          );
        },
      },
    ];
  };

  return (
    <Box>
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
          startIcon={<AddIcon />}
        >
          + Add PCBs
        </IconButton>
      </Box>
      <Box display="flex" justifyContent="center">
        <TableContainer component={Paper}>
          <Table aria-label="collapsibletable">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell style={{ fontWeight: 'bold' }}>ID</TableCell>
                <TableCell align="center" style={{ fontWeight: 'bold' }}>
                  Name
                </TableCell>
                <TableCell align="center" style={{ fontWeight: 'bold' }}>
                  PCB Category ID
                </TableCell>
                <TableCell align="center" style={{ fontWeight: 'bold' }}>
                  PCB Category Name
                </TableCell>
                <TableCell align="center" style={{ fontWeight: 'bold' }}>
                  Product IDs
                </TableCell>
                <TableCell align="center" style={{ fontWeight: 'bold' }}>
                  Description
                </TableCell>
                <TableCell align="center" style={{ fontWeight: 'bold' }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <Row key={row.id} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
