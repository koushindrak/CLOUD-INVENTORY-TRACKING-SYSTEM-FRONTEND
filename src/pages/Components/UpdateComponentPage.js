import {Box, Button, Checkbox, FormControlLabel, TextField} from "@mui/material";
import {Formik} from "formik";
import * as yup from "yup";
import {useNavigate, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import Header from "../../containers/Header";
import {useEffect, useState} from "react";
import {errorToast, successToast} from "../../containers/react-toast-alert";
import {getComponentById, getComponentByIdSuccess, resetGetComponentByIdSates} from "./GetComponentById";
import {
    resetUpdateComponentSates,
    updateComponent,
    updateComponentFailure,
    updateComponentSuccess
} from "./UpdateComponent";
import useMediaQuery from "@mui/material/useMediaQuery";

const UpdateComponentPage = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
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
        // id: yup.string().required("Required"),
        // name: yup.string().required("Required"),
        // componentCategoryName: yup.string().required("Required"),
    });

    return (
        <Box m="20px">
            <Header title="Edit Component"  />
            { component && ( <Formik
                onSubmit={handleFormSubmit}
                initialValues={{
                    id: component.id,
                    mfrptn: component.mfrptn,
                    description: component.description,
                    componentCategoryName: component.componentCategoryName,
                    footprint:component.footprint,
                    value: component.value,
                    isObselete: component.isObselete,
                    threshold: component.threshold,
                    stock: component.stock,
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
                            gridTemplateColumns="repeat(3, minmax(0, 1fr))"
                            sx={{
                                "& > div": { gridColumn: isNonMobile ? undefined : "span 2" },
                            }}
                        >
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="MFRPTN"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.mfrptn}
                                name="mfrptn"
                                error={!!touched.mfrptn && !!errors.mfrptn}
                                helperText={touched.mfrptn && errors.mfrptn}
                                sx={{ gridColumn: isNonMobile ? 'span 1' : 'span 2' }}
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
                                sx={{ gridColumn: isNonMobile ? 'span 2' : 'span 2' }}

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
                                sx={{ gridColumn: isNonMobile ? 'span 2' : 'span 2' }}
                            />

                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="FOOTPRINT"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.footprint}
                                name="footprint"
                                error={!!touched.footprint && !!errors.footprint}
                                helperText={touched.footprint && errors.footprint}
                                sx={{ gridColumn: isNonMobile ? 'span 1' : 'span 2' }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="VALUE"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.value}
                                name="value"
                                error={!!touched.value && !!errors.value}
                                helperText={touched.value && errors.value}
                                sx={{ gridColumn: isNonMobile ? 'span 1' : 'span 1' }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="number"
                                label="Threshold"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.threshold}
                                name="threshold"
                                error={!!touched.threshold && !!errors.threshold}
                                helperText={touched.threshold && errors.threshold}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="number"
                                label="Stock"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.stock}
                                name="stock"
                                error={!!touched.stock && !!errors.stock}
                                helperText={touched.stock && errors.stock}
                            />
                            <FormControlLabel
                                control={<Checkbox checked={values.isObselete} onChange={handleChange} name="isObselete" />}
                                label="Obselete"
                            />
                        </Box>
                        <Box display="flex" justifyContent="end" mt="20px">
                            <Button type="submit" color="secondary" variant="contained">
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

