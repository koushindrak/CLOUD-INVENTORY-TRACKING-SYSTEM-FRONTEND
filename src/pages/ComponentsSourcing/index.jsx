import { useEffect, useState } from 'react';
import { Box, Avatar, Button, Grid, TextField, CircularProgress, Typography, CardHeader, CardContent, CardActions, Paper } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { getSuggestedComponentById, getSuggestedComponentByIdSuccess } from "./GetSuggestedComponentById";
import './CardsStyle.css'; // import the new CSS file
import SearchOffIcon from '@mui/icons-material/SearchOff';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const SuggestedComponent = () => {
    const getByPartNumberSuccessRes = useSelector(getSuggestedComponentByIdSuccess);
    const [suggestedComp, setSuggestedComp] = useState(null);
    const [loading, setLoading] = useState(false);
    const [searchId, setSearchId] = useState("");
    const [firstLoad, setFirstLoad] = useState(true);
    const dispatch = useDispatch();

    const handleSearch = (id) => {
        setFirstLoad(false);
        setLoading(true);
        dispatch(getSuggestedComponentById(id));
    };

    useEffect(() => {
        if(getByPartNumberSuccessRes){
            setLoading(false);
            setSuggestedComp(getByPartNumberSuccessRes.data)
        }
    },[getByPartNumberSuccessRes])

    return (
        <Box sx={{ width: '100%', height: '100vh', position: 'relative' }}>
            {loading && (
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    position="absolute"
                    top={0}
                    left={200}
                    right={0}
                    bottom={150}
                    bgcolor="rgba(255, 255, 255, 0.7)">
                    <CircularProgress />
                </Box>
            )}
            <Box marginLeft="275px" marginBottom="100px">
                <TextField
                    label="Search by Part Number"
                    variant="outlined"
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                    onKeyPress={(ev) => {
                        if (ev.key === 'Enter') {
                            handleSearch(searchId);
                            ev.preventDefault();
                        }
                    }}
                    style={{ marginBottom: '20px', width: '300px' }}
                />
                {!loading && suggestedComp ? (
                <>
                    <Typography variant="h4" className="header">Product Information</Typography>
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
                                Unit Price: {suggestedComp.Product.UnitPrice} <br />
                                Available Quantity: {suggestedComp.Product.QuantityAvailable} <br />
                                Packaging: {suggestedComp.Product.Packaging.Value} <br />
                                Series: {suggestedComp.Product.Series.Value} <br />
                                Manufacturer Lead Weeks: {suggestedComp.Product.ManufacturerLeadWeeks} <br />
                                Category: {suggestedComp.Product.Category.Value} <br />
                            </Typography>
                            <CardActions disableSpacing>
                                <Button size="small" color="primary" href={suggestedComp.Product.PrimaryDatasheet}>
                                    View Datasheet
                                </Button>
                            </CardActions>
                        </CardContent>
                    </Paper>
                    <Typography variant="h4" className="header" style={{ marginTop: '30px' }}>Suggested Products</Typography>
                    <Grid container spacing={3}>
                        {suggestedComp.SuggestedProducts.map((product, index) => (
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
                                            Unit Price: {product.UnitPrice} <br />
                                            Available Quantity: {product.QuantityAvailable} <br />
                                            Packaging: {product.Packaging.Value} <br />
                                            Series: {product.Series.Value} <br />
                                            Manufacturer Lead Weeks: {product.ManufacturerLeadWeeks} <br />
                                            Category: {product.Category.Value} <br />
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
                </>
                ) : (!firstLoad && !loading ? (
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        flexDirection="column"
                        minHeight="50vh"
                        boxShadow={3}
                        borderRadius={2}
                        margin={4}
                        padding={4}
                        style={{ background: 'white', color: 'black' }}
                    >
                        <Typography variant="h4" style={{ marginBottom: '20px', fontWeight: 'bold' }}>
                            No Results Found
                        </Typography>
                        <SearchOffIcon style={{ fontSize: 120, marginBottom: '20px', color: '#3f51b5' }}/>
                        <Typography variant="subtitle1">
                            We're sorry, but we couldn't find any results for "{searchId}"
                        </Typography>
                        <Typography variant="body2" style={{ marginTop: '20px', color: '#757575' }}>
                            Please try searching again with a different part number.
                        </Typography>
                    </Box>
                ) : null)}
            </Box>
        </Box>
    );
};

export default SuggestedComponent;
