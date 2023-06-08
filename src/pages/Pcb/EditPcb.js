import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import Header from "../../containers/Header";
import { tableData } from './TableData';

const EditPcb = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [pcb, setPcb] = useState({
    id: '',
    name: '',
    description: '',
    pcbCategoryName: ''
  });

  useEffect(() => {
    const selectedPcb = tableData.find(pcb => pcb.id === parseInt(id));
    if (selectedPcb) {
      setPcb(selectedPcb);
    }
  }, [id]);

  const handleFormSubmit = (values) => {
    console.log("Updating PCB");
    
    // Update the PCB values
    setPcb(prevState => ({
      ...prevState,
      name: values.name,
      description: values.description,
      pcbCategoryName: values.pcbCategoryName
    }));
  
    // Navigate back to the '/pcbs' page
    navigate('/pcbs');
  };
  
  const pcbSchema = yup.object().shape({
    name: yup.string().required("Required"),
    description: yup.string().required("Required"),
    pcbCategoryName: yup.string().required("Required"),
  });

  return (
    <Box m="20px">
      <Header title="Edit PCB" subtitle="Edit an Existing PCB" />
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={{
          id: pcb.id,
          name: pcb.name,
          description: pcb.description,
          pcbCategoryName: pcb.pcbCategoryName
        }}
        validationSchema={pcbSchema}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
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
                label="ID"
                disabled
                value={pcb.id}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={pcb.name}
                name="name"
                error={touched.name && !!errors.name}
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
                value={pcb.description}
                name="description"
                error={touched.description && !!errors.description}
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
                value={pcb.pcbCategoryName}
                name="pcbCategoryName"
                error={touched.pcbCategoryName && !!errors.pcbCategoryName}
                helperText={touched.pcbCategoryName && errors.pcbCategoryName}
                sx={{ gridColumn: "span 2" }}
              />
              <Box display="flex" justifyContent="flex-end" mt="20px">
                <Button type="submit" color="secondary" variant="contained">
                  Update PCB
                </Button>
              </Box>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default EditPcb;
