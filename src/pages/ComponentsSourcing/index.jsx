import {useEffect, useState,useRef} from 'react';
import {Box, useTheme, Avatar, Button, Grid} from "@mui/material";
import {tokens} from "../../theme";
import {useDispatch, useSelector} from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import {getSuggestedComponent, getSuggestedComponentSuccess} from "./GetAllSuggestedComponent";
import {getSuggestedComponentById, getSuggestedComponentByIdSuccess} from "./GetSuggestedComponentById";
import { Card, CardContent, Typography, CardHeader, CardActions } from '@mui/material';
import './CardsStyle.css'; // import the new CSS file

const SuggestedComponent = () => {
    const getByPartNumberSuccessRes = useSelector(getSuggestedComponentByIdSuccess);
    const [suggestedComp, setSuggestedComp] = useState(null);
    const dispatch = useDispatch();

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    useEffect(() => {
        dispatch(getSuggestedComponentById("2056-GRILLEFR87-ND"));
    }, [dispatch]);

    useEffect(() => {
        if(getByPartNumberSuccessRes){
            console.log("getSuggestedComponentSuccessResponse-----",getByPartNumberSuccessRes)
            setSuggestedComp(getByPartNumberSuccessRes.data)
        }
    },[getByPartNumberSuccessRes])

    return (
        <Box marginLeft="275px">
            <Typography variant="h4">Product Information</Typography>

            { suggestedComp &&
                <Card>
                    <CardHeader
                        avatar={
                            <Avatar
                                aria-label="product"
                                src={suggestedComp.Product.PrimaryPhoto}
                            />
                        }
                        title={suggestedComp.Product.ProductDescription}
                        subheader={`Manufacturer: ${suggestedComp.Product.Manufacturer.Value}`}
                    />
                    <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Unit Price: {suggestedComp.Product.UnitPrice} <br/>
                            Available Quantity: {suggestedComp.Product.QuantityAvailable} <br/>
                            Packaging: {suggestedComp.Product.Packaging.Value} <br/>
                            Series: {suggestedComp.Product.Series.Value} <br/>
                            Manufacturer Lead Weeks: {suggestedComp.Product.ManufacturerLeadWeeks} <br/>
                            Category: {suggestedComp.Product.Category.Value} <br/>
                            // continue adding more fields here...
                        </Typography>
                        <CardActions disableSpacing>
                            <Button size="small" color="primary" href={suggestedComp.Product.PrimaryDatasheet}>
                                View Datasheet
                            </Button>
                        </CardActions>
                    </CardContent>
                </Card>
            }
            {suggestedComp && suggestedComp.SuggestedProducts &&
                <Grid container spacing={3}>
                    { suggestedComp.SuggestedProducts.map((product, index) => (
                        <Grid item xs={12} key={index}>
                            <Card>
                                <CardHeader
                                    avatar={
                                        <Avatar
                                            aria-label="product"
                                            src={product.PrimaryPhoto}
                                        />
                                    }
                                    title={product.ProductDescription}
                                    subheader={`Manufacturer: ${product.Manufacturer.Value}`}
                                />
                                <CardContent>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        Unit Price: {product.UnitPrice} <br/>
                                        Available Quantity: {product.QuantityAvailable} <br/>
                                        Packaging: {product.Packaging.Value} <br/>
                                        Series: {product.Series.Value} <br/>
                                        Manufacturer Lead Weeks: {product.ManufacturerLeadWeeks} <br/>
                                        Category: {product.Category.Value} <br/>
                                        // continue adding more fields here...
                                    </Typography>
                                    <CardActions disableSpacing>
                                        <Button size="small" color="primary" href={product.PrimaryDatasheet}>
                                            View Datasheet
                                        </Button>
                                    </CardActions>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            }
        </Box>
    );
};

export default SuggestedComponent;
