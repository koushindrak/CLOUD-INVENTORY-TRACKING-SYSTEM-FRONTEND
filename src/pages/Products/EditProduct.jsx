import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {getProductById, resetUpdateSuccess, updateProduct} from './actions';
import {getProductByIdSuccess, updateProductFailure, updateProductSuccess} from './selectors';
import Header from "../../containers/Header";
import {useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
import {errorToast, successToast} from "../../containers/react-toast-alert";

const EditProduct = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const { id } = useParams();
    const dispatch = useDispatch();
    const productFromStore = useSelector(getProductByIdSuccess);
    const [product, setProduct] = useState(null);
    const updateSuccess = useSelector(updateProductSuccess)
    const updateFailure = useSelector(updateProductFailure)

    const navigate = useNavigate();  // new

    useEffect(() => {
        if (!productFromStore) {
            dispatch(getProductById(id));
        } else {
            setProduct(productFromStore.data);
        }
    }, [dispatch, id, productFromStore]);

    useEffect(() => {
        if(updateSuccess){
             successToast(updateSuccess.displayMessage)
             navigate('/');
            dispatch(resetUpdateSuccess());
        }
    },[updateSuccess])

    useEffect(() => {
        if(updateFailure){
            errorToast(updateFailure.error)
            dispatch(resetUpdateSuccess());

        }
    },[updateFailure])

    const handleFormSubmit = (values) => {
        dispatch(updateProduct(values));
    };


    const productSchema = yup.object().shape({
        id: yup.string().required("required"),
        name: yup.string().required("required"),
        description: yup.string().required("required"),
        serialNumber: yup.string().required("required"),
        productCategoryName: yup.string().required("required"),
    });

    return (
        <Box m="20px">
            <Header title="Edit Product" subtitle="Edit an Existing Product" />
            {product && (  // Conditional rendering
                <Formik
                    onSubmit={handleFormSubmit}
                    initialValues={{
                        id: product.id,
                        name: product.name,
                        description: product.description,
                        serialNumber: product.serialNumber,
                        productCategoryName: product.productCategoryName
                    }}
                    validationSchema={productSchema}
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
                            sx={{
                                "& > div": { gridColumn: isNonMobile ? undefined : "span 2" },
                            }}
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
                                label="Serial Number"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.serialNumber}
                                name="serialNumber"
                                error={!!touched.serialNumber && !!errors.serialNumber}
                                helperText={touched.serialNumber && errors.serialNumber}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Category"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.productCategoryName}
                                name="productCategoryName"
                                error={!!touched.productCategoryName && !!errors.productCategoryName}
                                helperText={touched.productCategoryName && errors.productCategoryName}
                                sx={{ gridColumn: "span 2" }}
                            />
                        </Box>
                        <Box display="flex" justifyContent="end" mt="20px">
                            <Button type="submit" color="secondary" variant="contained">
                                Update Product
                            </Button>
                        </Box>
                    </form>
                )}
            </Formik>
                )}
        </Box>
    );
};

export default EditProduct;

