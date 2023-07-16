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
            <Typography variant="h4" style={{color: theme.palette.primary.main}}>Product Information</Typography>
            { suggestedComp &&
                <Card className="card">
                    <CardHeader
                        avatar={
                            <Avatar
                                className="avatar"
                                aria-label="product"
                                src={suggestedComp.Product.PrimaryPhoto}
                            />
                        }
                        title={<Typography variant="h6" className="title">{suggestedComp.Product.ProductDescription}</Typography>}
                        subheader={<Typography variant="subtitle1" className="subheader">Manufacturer: {suggestedComp.Product.Manufacturer.Value}</Typography>}
                    />
                    <CardContent>
                        <Typography variant="body2" className="body-text" component="p">
                            Unit Price: {suggestedComp.Product.UnitPrice} <br/>
                            Available Quantity: {suggestedComp.Product.QuantityAvailable} <br/>
                            Packaging: {suggestedComp.Product.Packaging.Value} <br/>
                            Series: {suggestedComp.Product.Series.Value} <br/>
                            Manufacturer Lead Weeks: {suggestedComp.Product.ManufacturerLeadWeeks} <br/>
                            Category: {suggestedComp.Product.Category.Value} <br/>
                        </Typography>
                        <CardActions disableSpacing>
                            <Button size="small" style={{color: theme.palette.secondary.main}} href={suggestedComp.Product.PrimaryDatasheet}>
                                View Datasheet
                            </Button>
                        </CardActions>
                    </CardContent>
                </Card>
            }
            <Typography variant="h4" style={{color: theme.palette.primary.main, marginTop: '30px'}}>Suggested Products</Typography>
            {suggestedComp && suggestedComp.SuggestedProducts &&
                <Grid container spacing={3}>
                    { suggestedComp.SuggestedProducts.map((product, index) => (
                        <Grid item xs={12} sm={6} key={index}>
                            <Card className="card">
                                <CardHeader
                                    avatar={
                                        <Avatar
                                            className="avatar"
                                            aria-label="product"
                                            src={product.PrimaryPhoto}
                                        />
                                    }
                                    title={<Typography variant="h6" className="title">{product.ProductDescription}</Typography>}
                                    subheader={<Typography variant="subtitle1" className="subheader">Manufacturer: {product.Manufacturer.Value}</Typography>}
                                />
                                <CardContent>
                                    <Typography variant="body2" className="body-text" component="p">
                                        Unit Price: {product.UnitPrice} <br/>
                                        Available Quantity: {product.QuantityAvailable} <br/>
                                        Packaging: {product.Packaging.Value} <br/>
                                        Series: {product.Series.Value} <br/>
                                        Manufacturer Lead Weeks: {product.ManufacturerLeadWeeks} <br/>
                                        Category: {product.Category.Value} <br/>
                                    </Typography>
                                    <CardActions disableSpacing>
                                        <Button size="small" style={{color: theme.palette.secondary.main}} href={product.PrimaryDatasheet}>
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