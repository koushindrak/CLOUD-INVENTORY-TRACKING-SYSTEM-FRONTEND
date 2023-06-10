import {Box, Button, TextField} from "@mui/material";
import {Formik} from "formik";
import * as yup from "yup";
import {useNavigate, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import Header from "../../containers/Header";
import {useEffect, useState} from "react";
import {errorToast, successToast} from "../../containers/react-toast-alert";
import {getPcbById, getPcbByIdSuccess, resetGetPcbByIdSates} from "./GetPCBById";
import {resetUpdatePcbSates, updatePcb, updatePcbFailure, updatePcbSuccess} from "./UpdatePcb";

const UpdatePcbPage = () => {
    const {productId, pcbId} = useParams();
    const dispatch = useDispatch();
    const pcbSuccess = useSelector(getPcbByIdSuccess);
    const [pcb, setPCB] = useState(null);
    const updateSuccess = useSelector(updatePcbSuccess)
    const updateFailure = useSelector(updatePcbFailure)

    const navigate = useNavigate();

    useEffect(() => {
        if (!pcbSuccess) {
            dispatch(getPcbById(pcbId));
        } else {
            setPCB(pcbSuccess.data);
        }
    }, [dispatch, pcbSuccess]);

    useEffect(() => {
        if (updateSuccess) {
            successToast(updateSuccess.displayMessage)
            if (productId) {
                /*get all pcbs for a product
                 <Route path="/products/:productId/pcbs" element={<Pcb />} />
                */
                navigate(`/products/${productId}/pcbs/`)
            } else {
                navigate('/pcbs');
            }
            dispatch(resetGetPcbByIdSates());
            dispatch(resetUpdatePcbSates());
        }
    }, [updateSuccess])

    useEffect(() => {
        if (updateFailure) {
            errorToast(updateFailure.error)
            dispatch(resetUpdatePcbSates());

        }
    }, [updateFailure])

    const handleFormSubmit = (values) => {
        dispatch(updatePcb(values));
    };


    const pcbSchema = yup.object().shape({
        id: yup.string().required("Required"),
        name: yup.string().required("Required"),
        pcbCategoryName: yup.string().required("Required"),
    });

    return (
        <Box m="20px">
            <Header title="Edit PCB" subtitle="Edit an Existing PCB"/>
            {pcb && (  // Conditional rendering
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
                                    sx={{gridColumn: "span 2"}}
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
                                    sx={{gridColumn: "span 2"}}
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
                                    sx={{gridColumn: "span 2"}}
                                />
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    sx={{gridColumn: "span 2"}}
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

export default UpdatePcbPage;

