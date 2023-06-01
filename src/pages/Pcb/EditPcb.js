import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import { getPcbById, resetUpdateSuccess, updatePcb } from './actions';
import { getPcbByIdSuccess, updatePcbSuccess } from './selectors';
import Header from "../../containers/Header";

const EditPcb = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const pcbFromStore = useSelector(getPcbByIdSuccess);
    const updateSuccess = useSelector(updatePcbSuccess);

    const navigate = useNavigate();

    const [pcb, setPcb] = useState(null);

    useEffect(() => {
        if (!pcbFromStore) {
            dispatch(getPcbById(id));
        } else {
            setPcb(pcbFromStore.data);
        }
    }, [dispatch, id, pcbFromStore]);

    useEffect(() => {
        if (updateSuccess) {
            navigate('/pcbs');
            dispatch(resetUpdateSuccess());
        }
    }, [updateSuccess, dispatch, navigate]);

    const handleFormSubmit = (values) => {
        dispatch(updatePcb(values));
    };

    const pcbSchema = yup.object().shape({
        id: yup.string().required("Required"),
        name: yup.string().required("Required"),
        description: yup.string().required("Required"),
        pcbCategoryName: yup.string().required("Required"),
    });

    return (
        <Box m="20px">
            <Header title="Edit PCB" subtitle="Edit an Existing PCB" />
            {pcb && (
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
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    sx={{ gridColumn: "span 2" }}
                                >
                                    Update PCB
                                </Button>
                            </Box>
                        </form>
                    )}
                </Formik>
            )}
        </Box>
    );
};

export default EditPcb;
