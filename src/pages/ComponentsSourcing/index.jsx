import {useEffect, useState,useRef} from 'react';
import {Box, useTheme, Avatar, Button, Grid} from "@mui/material";
import {tokens} from "../../theme";
import {useDispatch, useSelector} from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import {getSuggestedComponent, getSuggestedComponentSuccess} from "./GetAllSuggestedComponent";
import {getSuggestedComponentById, getSuggestedComponentByIdSuccess} from "./GetSuggestedComponentById";
import { Card, CardContent, Typography, CardHeader, CardActions,Paper } from '@mui/material';
import './CardsStyle.css'; // import the new CSS file
const SuggestedComponent = () => {
    const getByPartNumberSuccessRes = useSelector(getSuggestedComponentByIdSuccess);
    const [suggestedComp, setSuggestedComp] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSuggestedComponentById("2056-GRILLEFR87-ND"));
    }, [dispatch]);

    useEffect(() => {
        if(getByPartNumberSuccessRes){
            setSuggestedComp(getByPartNumberSuccessRes.data)
        }
    },[getByPartNumberSuccessRes])

    return (
        <Box marginLeft="275px">
            <Typography variant="h4" className="header">Product Information</Typography>
            { suggestedComp &&
                <Paper className="card" elevation={3}>
                    <CardHeader
                        className="card-header"
                        avatar={
                            <Avatar
                                className="avatar"
                                aria-label="product"
                                src={suggestedComp.Product.PrimaryPhoto}
                            />
                        }
                        title={suggestedComp.Product.ProductDescription}
                        subheader={`Manufacturer: ${suggestedComp.Product.Manufacturer.Value}`}
                    />
                    <CardContent>
                        <Typography variant="body2" component="p">
                            Unit Price: {suggestedComp.Product.UnitPrice} <br/>
                            Available Quantity: {suggestedComp.Product.QuantityAvailable} <br/>
                            Packaging: {suggestedComp.Product.Packaging.Value} <br/>
                            Series: {suggestedComp.Product.Series.Value} <br/>
                            Manufacturer Lead Weeks: {suggestedComp.Product.ManufacturerLeadWeeks} <br/>
                            Category: {suggestedComp.Product.Category.Value} <br/>
                        </Typography>
                        <CardActions disableSpacing>
                            <Button size="small" color="primary" href={suggestedComp.Product.PrimaryDatasheet}>
                                View Datasheet
                            </Button>
                        </CardActions>
                    </CardContent>
                </Paper>
            }
            <Typography variant="h4" className="header" style={{marginTop: '30px'}}>Suggested Products</Typography>
            {suggestedComp && suggestedComp.SuggestedProducts &&
                <Grid container spacing={3}>
                    { suggestedComp.SuggestedProducts.map((product, index) => (
                        <Grid item xs={12} sm={6} key={index}>
                            <Paper className="card" elevation={3}>
                                <CardHeader
                                    className="card-header"
                                    avatar={
                                        <Avatar
                                            className="avatar"
                                            aria-label="product"
                                            src={product.PrimaryPhoto}
                                        />
                                    }
                                    title={product.ProductDescription}
                                    subheader={`Manufacturer: ${product.Manufacturer.Value}`}
                                />
                                <CardContent>
                                    <Typography variant="body2" component="p">
                                        Unit Price: {product.UnitPrice} <br/>
                                        Available Quantity: {product.QuantityAvailable} <br/>
                                        Packaging: {product.Packaging.Value} <br/>
                                        Series: {product.Series.Value} <br/>
                                        Manufacturer Lead Weeks: {product.ManufacturerLeadWeeks} <br/>
                                        Category: {product.Category.Value} <br/>
                                    </Typography>
                                    <CardActions disableSpacing>
                                        <Button size="small" color="primary" href={product.PrimaryDatasheet}>
                                            View Datasheet
                                        </Button>
                                    </CardActions>
                                </CardContent>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            }
        </Box>
    );
};

export default SuggestedComponent;