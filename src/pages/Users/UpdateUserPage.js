import {Box, Button, Checkbox, FormControlLabel, TextField} from "@mui/material";
import {Formik} from "formik";
import * as yup from "yup";
import {useNavigate, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import Header from "../../containers/Header";
import {useEffect, useState} from "react";
import {errorToast, successToast} from "../../containers/react-toast-alert";
import {getUserById, getUserByIdSuccess, resetGetUserByIdSates} from "./GetUserById";
import {
    resetUpdateUserSates,
    updateUser,
    updateUserFailure,
    updateUserSuccess
} from "./UpdateUser";
import useMediaQuery from "@mui/material/useMediaQuery";

const UpdateUserPage = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const {productId, userId} = useParams();
    const dispatch = useDispatch();
    const userSuccess = useSelector(getUserByIdSuccess);
    const [user, setUser] = useState(null);
    const updateSuccess = useSelector(updateUserSuccess)
    const updateFailure = useSelector(updateUserFailure)

    const navigate = useNavigate();

    useEffect(() => {
        console.log("userSuccess--", userSuccess)
        if (!userSuccess) {
            dispatch(getUserById(userId));
        } else {
            setUser(userSuccess.data);
        }
    }, [dispatch, userSuccess]);

    useEffect(() => {
        if (updateSuccess) {
            successToast(updateSuccess.displayMessage)
            if (productId) {
                /*get all users for a product
                 <Route path="/products/:productId/users" element={<User />} />
                */
                navigate(`/products/${productId}/users/`)
            } else {
                navigate('/users');
            }
            dispatch(resetGetUserByIdSates());
            dispatch(resetUpdateUserSates());
        }
    }, [updateSuccess])

    useEffect(() => {
        if (updateFailure) {
            errorToast(updateFailure.error)
            dispatch(resetUpdateUserSates());

        }
    }, [updateFailure])

    const handleFormSubmit = (values) => {
        dispatch(updateUser(values));
    };


    const userSchema = yup.object().shape({
        // id: yup.string().required("Required"),
        // name: yup.string().required("Required"),
        // userCategoryName: yup.string().required("Required"),
    });

    return (
        <Box m="20px">
            <Header title="Edit User"/>
            {user && (<Formik
                    onSubmit={handleFormSubmit}
                    initialValues={{
                        id: user.id,
                        mfrptn: user.mfrptn,
                        description: user.description,
                        userCategoryName: user.userCategoryName,
                        footprint: user.footprint,
                        value: user.value,
                        isObselete: user.isObselete,
                        threshold: user.threshold,
                        stock: user.stock,
                    }}
                    validationSchema={userSchema}
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
                                    value={values.userCategoryName}
                                    name="userCategoryName"
                                    error={!!touched.userCategoryName && !!errors.userCategoryName}
                                    helperText={touched.userCategoryName && errors.userCategoryName}
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
                                    Update User
                                </Button>
                            </Box>
                        </form>

                    )}
                </Formik>
            )}
        </Box>
    );
};

export default UpdateUserPage;

