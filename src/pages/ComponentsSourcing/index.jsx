import {useEffect, useState} from 'react';
import {Box, useTheme} from "@mui/material";
import {tokens} from "../../theme";
import {useDispatch, useSelector} from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import {getSuggestedComponent, getSuggestedComponentSuccess} from "./GetAllSuggestedComponent";
import {getSuggestedComponentById, getSuggestedComponentByIdSuccess} from "./GetSuggestedComponentById";
import { Card, CardContent, Grid, Typography, CardMedia, Link } from '@mui/material';

const SuggestedComponent = () => {
    const getByPartNumberSuccessRes = useSelector(getSuggestedComponentByIdSuccess);
    const [suggestedComp, setSuggestedComp] = useState(null);
    const dispatch = useDispatch();

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    useEffect(() => {
        dispatch(getSuggestedComponentById("TC-35064-000-ND"));
    }, [dispatch]);

    useEffect(() => {
        if(getByPartNumberSuccessRes){
            console.log("getSuggestedComponentSuccessResponse-----",getByPartNumberSuccessRes)
            setSuggestedComp(getByPartNumberSuccessRes.data)
        }
    },[getByPartNumberSuccessRes])

    return (
        <Box m="20px">
            <Grid container spacing={3}>
                { suggestedComp &&
                    <Grid item xs={12}>
                        <Typography variant="h4">Product Information</Typography>

                        <Card>
                            <CardMedia
                                component="img"
                                height="140"
                                image={suggestedComp.Product.PrimaryPhoto}
                                alt={suggestedComp.Product.ProductDescription}
                            />
                            <CardContent>
                                <Typography variant="h5">{suggestedComp.Product.ProductDescription}</Typography>
                                <Typography variant="subtitle1">Manufacturer: {suggestedComp.Product.Manufacturer.Value}</Typography>
                                <Typography variant="subtitle1">Unit Price: {suggestedComp.Product.UnitPrice}</Typography>
                                <Typography variant="subtitle1">Available Quantity: {suggestedComp.Product.QuantityAvailable}</Typography>
                                <Typography variant="subtitle1">Packaging: {suggestedComp.Product.Packaging.Value}</Typography>
                                <Link href={suggestedComp.Product.PrimaryDatasheet}>Datasheet</Link>
                            </CardContent>
                        </Card>
                    </Grid>
                }
                {suggestedComp && suggestedComp.SuggestedProducts && suggestedComp.SuggestedProducts.map((product, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Typography variant="h4">Suggested Product</Typography>
                        <Card>
                            <CardMedia
                                component="img"
                                height="140"
                                image={product.PrimaryPhoto}
                                alt={product.ProductDescription}
                            />
                            <CardContent>
                                <Typography variant="h5">{product.ProductDescription}</Typography>
                                <Typography variant="subtitle1">Manufacturer: {product.Manufacturer.Value}</Typography>
                                <Typography variant="subtitle1">Unit Price: {product.UnitPrice}</Typography>
                                <Typography variant="subtitle1">Available Quantity: {product.QuantityAvailable}</Typography>
                                <Typography variant="subtitle1">Packaging: {product.Packaging.Value}</Typography>
                                <Link href={product.PrimaryDatasheet}>Datasheet</Link>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default SuggestedComponent;
