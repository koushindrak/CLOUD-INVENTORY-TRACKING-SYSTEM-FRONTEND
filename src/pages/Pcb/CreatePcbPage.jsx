import {Box, Button, TextField} from "@mui/material";
import {Formik} from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import {useNavigate, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import Header from "../../containers/Header";
import {useEffect, useState} from "react";
import {createPcb, createPcbSuccess, resetCreatePcbSates} from "./CreatePcb";
import {getProductByIdSuccess} from "../Products/selectors";
import {getComponentByIdSuccess} from "../Components/GetComponentById";

const AddPcb = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const {id} = useParams();
    const dispatch = useDispatch();
    const [pcb, setPcb] = useState(null);
    const createSuccess = useSelector(createPcbSuccess)
    const getProductByIdSuccessResponse = useSelector(getProductByIdSuccess)
    const getComponentByIdSuccessResponse = useSelector(getComponentByIdSuccess)

    const navigate = useNavigate();  // new
    let {productId, componentId} = useParams();

    useEffect(() => {
        if (createSuccess) {
            if (productId) {
                navigate('/products/' + productId + '/pcbs/');
            } else if (componentId) {
                navigate('/components/' + componentId + '/pcbs/');
            } else {
                navigate('/pcbs');
            }
            dispatch(resetCreatePcbSates());
        }
    }, [createSuccess])

    const handleFormSubmit = (values) => {
        dispatch(createPcb(values));
    };


    const pcbSchema = yup.object().shape({
        name: yup.string().required("required"),
        pcbCategoryName: yup.string().required("required"),
    });

    const getTitle = () => {
        if (productId) {
            return `Add new PCB to Product - ${getProductByIdSuccessResponse?.data.name}`;
        }

        if (componentId) {
            return `Add new PCB to Component - ${getComponentByIdSuccessResponse?.data.mfrptn}`;
        }

        return "Add new PCB";
    };


    return (
        <Box m="20px">
            <Header title={getTitle()}/>
            <Formik
                onSubmit={handleFormSubmit}
                initialValues={{
                    id: '',
                    name: '',
                    description: '',
                    pcbCategoryName: '',
                    productId: productId && !isNaN(productId) ? parseInt(productId) : productId,
                    componentId: componentId && !isNaN(componentId) ? parseInt(componentId) : componentId
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
                            sx={{
                                "& > div": {gridColumn: isNonMobile ? undefined : "span 2"},
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
                        </Box>
                        <Box display="flex" justifyContent="end" mt="20px">
                            <Button type="submit" color="secondary" variant="contained">
                                Save Pcb
                            </Button>
                        </Box>
                    </form>
                )}
            </Formik>

        </Box>
    );
};

export default AddPcb;

