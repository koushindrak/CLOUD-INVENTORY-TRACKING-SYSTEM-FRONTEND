import {Box, Button, Checkbox, FormControlLabel, TextField} from "@mui/material";
import {Formik} from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import {useNavigate, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import Header from "../../containers/Header";
import {useEffect, useState} from "react";
import {
    createSuggestedComponent,
    createSuggestedComponentFailure,
    createSuggestedComponentSuccess,
    resetCreateSuggestedComponentSates
} from "./CreateSuggestedComponent";
import {getProductByIdSuccess} from "../Products/selectors";
import {errorToast, successToast} from "../../containers/react-toast-alert";

const AddSuggestedComponent = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const {id} = useParams();
    const dispatch = useDispatch();
    const [suggestedComponent, setSuggestedComponent] = useState(null);
    const createSuccess = useSelector(createSuggestedComponentSuccess);
    const createFailure = useSelector(createSuggestedComponentFailure);

    const getProductByIdSuccessResponse = useSelector(getProductByIdSuccess)

    const navigate = useNavigate();  // new
    let {productId} = useParams();

    useEffect(() => {
        if (createSuccess) {
            if (productId) {
                successToast(createSuccess.displayMessage)
                navigate('/products/' + productId + '/suggestedComponents/');
            } else {
                navigate('/suggestedComponents');
            }
            dispatch(resetCreateSuggestedComponentSates());
        }
    }, [createSuccess])

    useEffect(() => {
        if (createFailure) {
            errorToast(createFailure.error)
        }
    }, [createFailure])

    const handleFormSubmit = (values) => {
        console.log("values--", values)
        dispatch(createSuggestedComponent(values));
    };


    const suggestedComponentSchema = yup.object().shape({
        // name: yup.string().required("required"),
        // suggestedComponentCategoryName: yup.string().required("required"),
        // threshold: yup.number().integer().required("required"),
        // stock: yup.number().integer().required("required"),
        // isObselete: yup.boolean().required("required"),
    });

    return (
        <Box marginLeft="275px" marginRight="10px" marginBottom="10px">
            <Header title="Add New SuggestedComponent"/>
            <Formik
                onSubmit={handleFormSubmit}
                initialValues={{
                    id: '',
                    mfrptn: '',
                    description: '',
                    suggestedComponentCategoryName: '',
                    footprint: '',
                    value: '',
                    isObselete: false,
                    threshold: null,
                    stock: null,
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
                                Save SuggestedComponent
                            </Button>
                        </Box>
                    </form>

                )}
            </Formik>

        </Box>
    );
};

export default AddSuggestedComponent;

