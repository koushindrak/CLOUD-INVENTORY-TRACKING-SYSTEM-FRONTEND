import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getProductById, updateProduct } from './actions';
import { getProductByIdSuccess } from './selectors';
import { TextField, Button, Box } from "@mui/material";

const EditProduct = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const product = useSelector(getProductByIdSuccess);

    const [productData, setProductData] = useState({ id: '', name: '', description: '', serialNumber: '', category: '' });

    useEffect(() => {
        dispatch(getProductById(id));
    }, [dispatch, id]);

    useEffect(() => {
        console.log("Edit---",product)
        if (product) {
            setProductData(product.data);
        }
    }, [product]);

    const handleChange = (e) => {
        setProductData({ ...productData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateProduct(productData));
    };

    return (
        <Box component="form" onSubmit={handleSubmit}>
            <TextField
                name="name"
                label="Name"
                value={productData.name}
                onChange={handleChange}
            />
            <TextField
                name="description"
                label="Description"
                value={productData.description}
                onChange={handleChange}
            />
            <TextField
                name="serialNumber"
                label="Serial Number"
                value={productData.serialNumber}
                onChange={handleChange}
            />
            <TextField
                name="category"
                label="Category"
                value={productData.category}
                onChange={handleChange}
            />
            <Button type="submit">Update</Button>
        </Box>
    );
};

export default EditProduct;
