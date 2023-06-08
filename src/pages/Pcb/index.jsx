
import { useState } from 'react';
import { Box, Typography, useTheme, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../containers/Header";
import IconButton from '@mui/material/IconButton';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import AddIcon from '@mui/icons-material/Add';
import { getPcbStyles } from "./css/PcbStyles";
// import EditPcb from './EditPcb';
import { tableData as initialTableData } from './TableData';
import { useNavigate } from 'react-router-dom';
import { navigate } from 'react-router-dom';

const Pcb = () => {
  //style constants
  const theme = useTheme();
  const pcbStyles = getPcbStyles(theme);
  const colors = tokens(theme.palette.mode);

  const navigate = useNavigate();
  //state constants
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedPcb, setSelectedPcb] = useState(null);
  const [tableData, setTableData] = useState(initialTableData);

  /* Button click actions start here */
  const handleEdit = (row) => {
    navigate(`/pcbs/edit/${row.id}`);
  };
  

  const handleDelete = (row) => {
    handleClickOpen(row);
  };

  const handleClickOpen = (pcb) => {
    setSelectedPcb(pcb);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirmDelete = () => {
    const updatedData = tableData.filter((pcb) => pcb.id !== selectedPcb.id);
    setTableData(updatedData);
    setOpen(false);
  };

  const handleAdd = () => {
    navigate('/pcbs/add');
  };
  /* Button click actions ends here */

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
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "pcbCategoryName",
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

  function Header({ title, subtitle, subtitleStyle }) {
    return (
        <header>
            <h1>{title}</h1>
            <h2 style={subtitleStyle}>{subtitle}</h2>
        </header>
    );
}
  return (
    <Box m="20px">
      <Box position="relative">
        <Button
          onClick={handleAdd}
          variant="outlined"
          sx={{
            position: 'absolute',
            top: 0,
            right: 10,
            zIndex: 1000,
            color: 'white',
            backgroundColor: '#4b2eae'
          }}
          startIcon={<AddIcon />}
        >
          Add Pcb
        </Button>
        <Header subtitleStyle={{ color: 'black' }} subtitle="Managing the Pcbs" />
        <Box m="40px 0 10 0" height="75vh" sx={pcbStyles}>
          <DataGrid rows={tableData} columns={columns} />
        </Box>
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Pcb"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete the pcb - {selectedPcb?.name}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Pcb;
