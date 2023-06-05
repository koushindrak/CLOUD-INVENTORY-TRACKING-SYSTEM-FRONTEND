import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Header from "../../containers/Header";
import {useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
import {createPcb, createPcbSuccess, resetCreatePcbSates} from "./CreatePcb";
import {getProductByIdSuccess} from "../Products/selectors";

const AddPcb = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const { id } = useParams();
    const dispatch = useDispatch();
    const [pcb, setPcb] = useState(null);
    const createSuccess = useSelector(createPcbSuccess)
    const getProductByIdSuccessResponse = useSelector(getProductByIdSuccess)

    const navigate = useNavigate();  // new
    let { productId }  = useParams();

    useEffect(() => {
        if(createSuccess){
             if(productId){
                 navigate('/product/'+productId+'/pcb/');
             }else {
                 navigate('/pcbs');
             }
            dispatch(resetCreatePcbSates());
        }
    },[createSuccess])

    const handleFormSubmit = (values) => {
        dispatch(createPcb(values));
    };



    const pcbSchema = yup.object().shape({
        name: yup.string().required("required"),
        pcbCategoryName: yup.string().required("required"),
    });


    return (
        <Box m="20px">
            <Header title={productId ? `Add new PCB to Product - ${getProductByIdSuccessResponse ? getProductByIdSuccessResponse.data.name : getProductByIdSuccessResponse }` : "Add new PCB"} />
                <Formik
                    onSubmit={handleFormSubmit}
                    initialValues={{
                        id: '',
                        name: '',
                        description: '',
                        pcbCategoryName: '',
                        productId:productId && !isNaN(productId) ? parseInt(productId) : productId
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
                                value={values.pcbCategoryName}
                                name="pcbCategoryName"
                                error={!!touched.pcbCategoryName && !!errors.pcbCategoryName}
                                helperText={touched.pcbCategoryName && errors.pcbCategoryName}
                                sx={{ gridColumn: "span 2" }}
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

