import React from 'react';
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import Header from "../../containers/Header";
import { tableData } from './TableData';

const AddPcb = () => {
  const handleFormSubmit = (values) => {
    console.log("Adding PCB:", values);
  
    // Find the largest existing ID in the tableData array
    const maxId = tableData.reduce((max, pcb) => Math.max(max, parseInt(pcb.id)), 0);
  
    // Generate a new ID by incrementing the largest ID by 1
    const newId = maxId + 1;
  
    const newPcb = {
      id: newId.toString(), // Convert the newId to a string
      ...values
    };
  
    const updatedTableData = [...tableData, newPcb]; // Create a new array with the updated PCBs
    console.log("Updated tableData:", updatedTableData);
    // Update the state or dispatch an action with the updatedTableData if needed
  };
  
  const pcbSchema = yup.object().shape({
    name: yup.string().required("Required"),
    description: yup.string().required("Required"),
    pcbCategoryName: yup.string().required("Required"),
  });

  return (
    <Box m="20px">
      <Header title="Add New PCB" />
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={{
          id: '',
          name: '',
          description: '',
          pcbCategoryName: ''
        }}
        validationSchema={pcbSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(2, minmax(0, 1fr))"
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                name="name"
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Description"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description}
                name="description"
                error={!!touched.description && !!errors.description}
                helperText={touched.description && errors.description}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Category"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.pcbCategoryName}
                name="pcbCategoryName"
                error={!!touched.pcbCategoryName && !!errors.pcbCategoryName}
                helperText={touched.pcbCategoryName && errors.pcbCategoryName}
                sx={{ gridColumn: "span 2" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Save PCB
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default AddPcb;
