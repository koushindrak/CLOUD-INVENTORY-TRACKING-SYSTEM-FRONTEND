import {Box, Button, Checkbox, FormControlLabel, TextField} from "@mui/material";
import {Formik} from "formik";
import * as yup from "yup";
import {useNavigate, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import Header from "../../containers/Header";
import {useEffect, useState} from "react";
import {errorToast, successToast} from "../../containers/react-toast-alert";
import {getSuggestedComponentById, getSuggestedComponentByIdSuccess, resetGetSuggestedComponentByIdSates} from "./GetSuggestedComponentById";
import {
    resetUpdateSuggestedComponentSates,
    updateSuggestedComponent,
    updateSuggestedComponentFailure,
    updateSuggestedComponentSuccess
} from "./UpdateSuggestedComponent";
import useMediaQuery from "@mui/material/useMediaQuery";

const UpdateSuggestedComponentPage = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const {productId, suggestedComponentId} = useParams();
    const dispatch = useDispatch();
    const suggestedComponentSuccess = useSelector(getSuggestedComponentByIdSuccess);
    const [suggestedComponent, setSuggestedComponent] = useState(null);
    const updateSuccess = useSelector(updateSuggestedComponentSuccess)
    const updateFailure = useSelector(updateSuggestedComponentFailure)

    const navigate = useNavigate();

    useEffect(() => {
        console.log("suggestedComponentSuccess--", suggestedComponentSuccess)
        if (!suggestedComponentSuccess) {
            dispatch(getSuggestedComponentById(suggestedComponentId));
        } else {
            setSuggestedComponent(suggestedComponentSuccess.data);
        }
    }, [dispatch, suggestedComponentSuccess]);

    useEffect(() => {
        if (updateSuccess) {
            successToast(updateSuccess.displayMessage)
            if (productId) {
                /*get all suggestedComponents for a product
                 <Route path="/products/:productId/suggestedComponents" element={<SuggestedComponent />} />
                */
                navigate(`/products/${productId}/suggestedComponents/`)
            } else {
                navigate('/suggestedComponents');
            }
            dispatch(resetGetSuggestedComponentByIdSates());
            dispatch(resetUpdateSuggestedComponentSates());
        }
    }, [updateSuccess])

    useEffect(() => {
        if (updateFailure) {
            errorToast(updateFailure.error)
            dispatch(resetUpdateSuggestedComponentSates());

        }
    }, [updateFailure])

    const handleFormSubmit = (values) => {
        dispatch(updateSuggestedComponent(values));
    };


    const suggestedComponentSchema = yup.object().shape({
        // id: yup.string().required("Required"),
        // name: yup.string().required("Required"),
        // suggestedComponentCategoryName: yup.string().required("Required"),
    });

    return (
        <Box marginLeft="275px" marginRight="10px" marginBottom="10px">
            <Header title="Edit SuggestedComponent"/>
            {suggestedComponent && (<Formik
                    onSubmit={handleFormSubmit}
                    initialValues={{
                        id: suggestedComponent.id,
                        mfrptn: suggestedComponent.mfrptn,
                        description: suggestedComponent.description,
                        suggestedComponentCategoryName: suggestedComponent.suggestedComponentCategoryName,
                        footprint: suggestedComponent.footprint,
                        value: suggestedComponent.value,
                        isObselete: suggestedComponent.isObselete,
                        threshold: suggestedComponent.threshold,
                        stock: suggestedComponent.stock,
                    }}
                    validationSchema={suggestedComponentSchema}
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
                                    "& > div": {gridColumn: isNonMobile ? undefined : "span 2"},
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
                                    sx={{gridColumn: isNonMobile ? 'span 1' : 'span 2'}}
                                />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Category"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.suggestedComponentCategoryName}
                                    name="suggestedComponentCategoryName"
                                    error={!!touched.suggestedComponentCategoryName && !!errors.suggestedComponentCategoryName}
                                    helperText={touched.suggestedComponentCategoryName && errors.suggestedComponentCategoryName}
                                    sx={{gridColumn: isNonMobile ? 'span 2' : 'span 2'}}

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
                                    sx={{gridColumn: isNonMobile ? 'span 2' : 'span 2'}}
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
                                    sx={{gridColumn: isNonMobile ? 'span 1' : 'span 2'}}
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
                                    sx={{gridColumn: isNonMobile ? 'span 1' : 'span 1'}}
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
                                    control={<Checkbox checked={values.isObselete} onChange={handleChange}
                                                       name="isObselete"/>}
                                    label="Obselete"
                                />
                            </Box>
                            <Box display="flex" justifyContent="end" mt="20px">
                                <Button type="submit" color="secondary" variant="contained">
                                    Update SuggestedComponent
                                </Button>
                            </Box>
                        </form>

                    )}
                </Formik>
            )}
        </Box>
    );
};

export default UpdateSuggestedComponentPage;

