
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Header from "../../containers/Header";
import {useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
import {errorToast, successToast} from "../../containers/react-toast-alert";
import {getComponentById, getComponentByIdSuccess, resetGetComponentByIdSates} from "./GetComponentById";
import {resetUpdateComponentSates, updateComponent, updateComponentFailure, updateComponentSuccess} from "./UpdateComponent";

const UpdateComponentPage = () => {
    const { productId, componentId } = useParams();
    const dispatch = useDispatch();
    const componentSuccess = useSelector(getComponentByIdSuccess);
    const [component, setComponent] = useState(null);
    const updateSuccess = useSelector(updateComponentSuccess)
    const updateFailure = useSelector(updateComponentFailure)

    const navigate = useNavigate();

    useEffect(() => {
        console.log("componentSuccess--",componentSuccess)
        if (!componentSuccess) {
            dispatch(getComponentById(componentId));
        } else {
            setComponent(componentSuccess.data);
        }
    }, [dispatch, componentSuccess]);

    useEffect(() => {
        if(updateSuccess){
            successToast(updateSuccess.displayMessage)
            if(productId){
                /*get all components for a product
                 <Route path="/products/:productId/components" element={<Component />} />
                */
                navigate(`/products/${productId}/components/`)
            }else {
                navigate('/components');
            }
            dispatch(resetGetComponentByIdSates());
            dispatch(resetUpdateComponentSates());
        }
    },[updateSuccess])

    useEffect(() => {
        if(updateFailure){
            errorToast(updateFailure.error)
            dispatch(resetUpdateComponentSates());

        }
    },[updateFailure])

    const handleFormSubmit = (values) => {
        dispatch(updateComponent(values));
    };


    const componentSchema = yup.object().shape({
        id: yup.string().required("Required"),
        name: yup.string().required("Required"),
        componentCategoryName: yup.string().required("Required"),
    });

    return (
        <Box m="20px">
            <Header title="Edit Component" subtitle="Edit an Existing Component" />
            {component && (  // Conditional rendering
                <Formik
                    onSubmit={handleFormSubmit}
                    initialValues={{
                        id: component.id,
                        name: component.name,
                        description: component.description,
                        componentCategoryName: component.componentCategoryName
                    }}
                    validationSchema={componentSchema}
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
                                    value={values.componentCategoryName}
                                    name="componentCategoryName"
                                    error={!!touched.componentCategoryName && !!errors.componentCategoryName}
                                    helperText={touched.componentCategoryName && errors.componentCategoryName}
                                    sx={{ gridColumn: "span 2" }}
                                />
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    sx={{ gridColumn: "span 2" }}
                                >
                                    Update Component
                                </Button>
                            </Box>
                        </form>
                    )}
                </Formik>
            )}
        </Box>
    );
};

export default UpdateComponentPage;

