import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Header from "../../containers/Header";
import {useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
import {createComponent, createComponentSuccess, resetCreateComponentSates} from "./CreateComponent";
import {getProductByIdSuccess} from "../Products/selectors";

const AddComponent = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const { id } = useParams();
    const dispatch = useDispatch();
    const [component, setComponent] = useState(null);
    const createSuccess = useSelector(createComponentSuccess)
    const getProductByIdSuccessResponse = useSelector(getProductByIdSuccess)

    const navigate = useNavigate();  // new
    let { productId }  = useParams();

    useEffect(() => {
        if(createSuccess){
             if(productId){
                 navigate('/products/'+productId+'/components/');
             }else {
                 navigate('/components');
             }
            dispatch(resetCreateComponentSates());
        }
    },[createSuccess])

    const handleFormSubmit = (values) => {
        dispatch(createComponent(values));
    };



    const componentSchema = yup.object().shape({
        name: yup.string().required("required"),
        componentCategoryName: yup.string().required("required"),
    });


    return (
        <Box m="20px">
            <Header title={productId ? `Add new COMPONENT to Product - ${getProductByIdSuccessResponse ? getProductByIdSuccessResponse.data.name : getProductByIdSuccessResponse }` : "Add new COMPONENT"} />
                <Formik
                    onSubmit={handleFormSubmit}
                    initialValues={{
                        id: '',
                        name: '',
                        description: '',
                        componentCategoryName: '',
                        productId:productId && !isNaN(productId) ? parseInt(productId) : productId
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
                                label="Category"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.componentCategoryName}
                                name="componentCategoryName"
                                error={!!touched.componentCategoryName && !!errors.componentCategoryName}
                                helperText={touched.componentCategoryName && errors.componentCategoryName}
                                sx={{ gridColumn: "span 2" }}
                            />
                        </Box>
                        <Box display="flex" justifyContent="end" mt="20px">
                            <Button type="submit" color="secondary" variant="contained">
                                Save Component
                            </Button>
                        </Box>
                    </form>
                )}
            </Formik>

        </Box>
    );
};

export default AddComponent;

