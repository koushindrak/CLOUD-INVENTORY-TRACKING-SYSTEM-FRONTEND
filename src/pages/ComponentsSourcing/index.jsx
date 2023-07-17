import { useEffect, useState } from 'react';
import {
    Box,
    Avatar,
    Button,
    Grid,
    TextField,
    CircularProgress,
    Typography,
    CardHeader,
    CardContent,
    CardActions,
    Paper,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    AvatarGroup,
    ImageList,
    ImageListItem,
    Fade,
    Dialog
} from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { getSuggestedComponentById, getSuggestedComponentByIdSuccess } from "./GetSuggestedComponentById";
import './CardsStyle.css'; // import the new CSS file
import SearchOffIcon from '@mui/icons-material/SearchOff';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { indigo } from "@mui/material/colors";

const SuggestedComponent = () => {
    const getByPartNumberSuccessRes = useSelector(getSuggestedComponentByIdSuccess);
    const [suggestedComp, setSuggestedComp] = useState(null);
    const [loading, setLoading] = useState(false);
    const [searchId, setSearchId] = useState("");
    const [firstLoad, setFirstLoad] = useState(true);
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [openImage, setOpenImage] = useState("");


    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleSearch = (id) => {
        setFirstLoad(false);
        setLoading(true);
        dispatch(getSuggestedComponentById(id));
    };

    useEffect(() => {
        dispatch(getSuggestedComponentById("SPU0410LR5H-QB"));
    },[])


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
                        <Paper className="styled-card" elevation={3}>
                            <CardHeader
                                className="styled-card-header"
                                avatar={
                                    <Avatar
                                        className="avatar"
                                        aria-label="product"
                                        src={suggestedComp.Product.PrimaryPhoto}
                                        onClick={() => {handleClickOpen(); setOpenImage(suggestedComp.Product.PrimaryPhoto);}}
                                    />
                                }
                                title={
                                    <a href={suggestedComp.Product.ProductUrl} className="styled-title" target="_blank" rel="noopener noreferrer">
                                        <Typography variant="h5">
                                            {suggestedComp.Product.ProductDescription}
                                        </Typography>
                                    </a>
                                }
                                subheader={
                                    <a href={suggestedComp.Product.ManufacturerPageUrl} className="styled-subheader" target="_blank" rel="noopener noreferrer">
                                        <Typography variant="subtitle1">
                                            {`Manufacturer: ${suggestedComp.Product.Manufacturer.Value}`}
                                        </Typography>
                                    </a>
                                }
                            />

                            <CardContent>
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <List className="styled-list">
                                            <ListItem className="styled-list-item"><strong>Obsolete:</strong> {suggestedComp.Product.Obsolete?.toString() ?? 'N/A'}</ListItem>
                                            <ListItem className="styled-list-item"><strong>Unit Price:</strong> {suggestedComp.Product.UnitPrice}</ListItem>
                                            <ListItem className="styled-list-item"><strong>Available Quantity:</strong> {suggestedComp.Product.QuantityAvailable}</ListItem>
                                            <ListItem className="styled-list-item"><strong>Product URL:</strong> <a href={suggestedComp.Product.ProductUrl} target="_blank" rel="noopener noreferrer">Link to Product</a></ListItem>
                                            <ListItem className="styled-list-item"><strong>Primary Photo:</strong> <a href={suggestedComp.Product.PrimaryPhoto} target="_blank" rel="noopener noreferrer">View Primary Photo</a></ListItem>
                                            <ListItem className="styled-list-item"><strong>Manufacturer Page URL:</strong> <a href={suggestedComp.Product.ManufacturerPageUrl} target="_blank" rel="noopener noreferrer">Visit Manufacturer Page</a></ListItem>
                                        </List>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <List className="styled-list">
                                            <ListItem className="styled-list-item"><strong>Category:</strong> {suggestedComp.Product.Category.Value}</ListItem>
                                            <ListItem className="styled-list-item"><strong>Manufacturer Part Number:</strong> {suggestedComp.Product.ManufacturerPartNumber}</ListItem>
                                            <ListItem className="styled-list-item"><strong>Minimum Order Quantity:</strong> {suggestedComp.Product.MinimumOrderQuantity}</ListItem>
                                            <ListItem className="styled-list-item"><strong>NonStock:</strong> {suggestedComp.Product.NonStock?.toString() ?? 'N/A'}</ListItem>
                                            <ListItem className="styled-list-item"><strong>DigiKey Part Number:</strong> {suggestedComp.Product.DigiKeyPartNumber}</ListItem>
                                        </List>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Paper>
                        <Typography variant="h4" className="header" style={{ marginTop: '30px' }}>Suggested Products</Typography>
                        <Grid container spacing={3}>
                            {suggestedComp.SuggestedProducts.map((product, index) => (
                                <Grid item xs={12} sm={12} key={index}>
                                    <Paper className="card" elevation={3}>
                                        <CardHeader
                                            className="suggested-styled-card-header"
                                            avatar={
                                                <Avatar
                                                    className="avatar"
                                                    aria-label="product"
                                                    src={product.PrimaryPhoto}
                                                    onClick={() => {handleClickOpen(); setOpenImage(product.PrimaryPhoto);}}
                                                />
                                            }
                                            title={
                                                <a href={product.ProductUrl} className="styled-title" target="_blank" rel="noopener noreferrer">
                                                    <Typography variant="h5">
                                                        {product.ProductDescription}
                                                    </Typography>
                                                </a>
                                            }
                                            subheader={
                                                <a href={product.ManufacturerPageUrl} className="styled-subheader" target="_blank" rel="noopener noreferrer">
                                                    <Typography variant="subtitle1">
                                                        {`Manufacturer: ${product.Manufacturer.Value}`}
                                                    </Typography>
                                                </a>
                                            }
                                        />
                                        <CardContent>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12} sm={6}>
                                                    <Typography variant="h6" component="div" color="primary" sx={{ textDecoration: 'underline', marginBottom: '10px',marginLeft: '15px', fontSize: '1.2em', fontWeight: 'bold' }}>
                                                        Product Details
                                                    </Typography>
                                                    <List>
                                                        <ListItem><Typography color="textSecondary"><strong>Obsolete:</strong> {product.Obsolete?.toString() ?? 'N/A'}</Typography></ListItem>
                                                        <ListItem><Typography color="textSecondary"><strong>Unit Price:</strong> {product.UnitPrice}</Typography></ListItem>
                                                        <ListItem><Typography color="textSecondary"><strong>Available Quantity:</strong> {product.QuantityAvailable}</Typography></ListItem>
                                                        <ListItem><Typography color="textSecondary"><strong>Product URL:</strong> <a href={product.ProductUrl} target="_blank" rel="noopener noreferrer">Link to Product</a></Typography></ListItem>
                                                        <ListItem><Typography color="textSecondary"><strong>Manufacturer Page URL:</strong> <a href={product.ManufacturerPageUrl} target="_blank" rel="noopener noreferrer">Visit Manufacturer Page</a></Typography></ListItem>
                                                    </List>
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <Typography variant="h6" component="div" color="primary" sx={{ textDecoration: 'underline', marginBottom: '10px', marginLeft: '15px',fontSize: '1.2em', fontWeight: 'bold' }}>
                                                        Product Specifications
                                                    </Typography>
                                                    <List>
                                                        <ListItem><Typography color="textSecondary"><strong>Category:</strong> {product.Category.Value}</Typography></ListItem>
                                                        <ListItem><Typography color="textSecondary"><strong>Manufacturer Part Number:</strong> {product.ManufacturerPartNumber}</Typography></ListItem>
                                                        <ListItem><Typography color="textSecondary"><strong>Minimum Order Quantity:</strong> {product.MinimumOrderQuantity}</Typography></ListItem>
                                                        <ListItem><Typography color="textSecondary"><strong>NonStock:</strong> {product.NonStock?.toString() ?? 'N/A'}</Typography></ListItem>
                                                        <ListItem><Typography color="textSecondary"><strong>DigiKey Part Number:</strong> {product.DigiKeyPartNumber}</Typography></ListItem>
                                                    </List>
                                                </Grid>
                                            </Grid>
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
            <Dialog open={open} onClose={handleClose} >
                <img src={openImage} alt="Primary Photo" style={{width: '80vh', height: '80vh'}}/>
            </Dialog>
        </Box>
    );
};

export default SuggestedComponent;
