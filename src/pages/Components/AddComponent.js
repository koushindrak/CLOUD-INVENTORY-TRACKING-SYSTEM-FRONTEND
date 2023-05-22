import React from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Box } from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';

export default function AddComponents(props) {
  const { open, handleClose } = props;

  const handleSave = (values) => {
    // Handle save functionality here
    console.log('Saving component:', values);

    // Close the AddComponents dialog
    handleClose();
  };

  const componentSchema = yup.object().shape({
    componentName: yup.string().required('Component Name is required'),
    categoryID: yup.string().required('Component ID is required'),
    serialNumber: yup.string().required('Serial Number is required'),
    numberprod: yup.string().required('Number of Products is required'),
  });

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add Component</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={{
            componentName: '',
            categoryID: '',
            serialNumber: '',
            numberprod: '',
            description: '',
          }}
          validationSchema={componentSchema}
          onSubmit={handleSave}
        >
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <TextField
                autoFocus
                margin="dense"
                id="componentName"
                label="Component Name"
                type="text"
                fullWidth
                value={values.componentName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.componentName && !!errors.componentName}
                helperText={touched.componentName && errors.componentName}
              />
              <TextField
                margin="dense"
                id="categoryID"
                label="Category ID"
                type="text"
                fullWidth
                value={values.categoryID}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.categoryID && !!errors.categoryID}
                helperText={touched.categoryID && errors.categoryID}
              />
              <TextField
                margin="dense"
                id="serialNumber"
                label="Serial Number"
                type="text"
                fullWidth
                value={values.serialNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.serialNumber && !!errors.serialNumber}
                helperText={touched.serialNumber && errors.serialNumber}
              />
              <TextField
                margin="dense"
                id="numberprod"
                label="Number of Products"
                type="text"
                fullWidth
                value={values.numberprod}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.numberprod && !!errors.numberprod}
                helperText={touched.numberprod && errors.numberprod}
              />
              <TextField
                margin="dense"
                id="description"
                label="Description"
                type="text"
                fullWidth
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.description && !!errors.description}
                helperText={touched.description && errors.description}
              />
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit" color="primary">
                  Save
                </Button>
              </DialogActions>
            </form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}

AddComponents.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};
