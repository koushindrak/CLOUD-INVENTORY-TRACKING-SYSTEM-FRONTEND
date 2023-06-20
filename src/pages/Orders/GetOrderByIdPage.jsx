import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {
    Box,
    Card,
    CardContent,
    CircularProgress,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@mui/material';
import {styled} from '@mui/system';
import {useDispatch, useSelector} from 'react-redux';
import {getOrderById, getOrderByIdFailure, getOrderByIdSuccess} from "./GetOrderById";
import {errorToast} from "../../containers/react-toast-alert";

const StyledCard = styled(Card)(({theme}) => ({
    margin: theme.spacing(2),
    backgroundColor: '#C8FACD', // Added color here
    boxShadow: theme.shadows[3],
}));

const StyledTableCell = styled(TableCell)(({theme}) => ({
    color: '#05386B', // Changed color here
    fontWeight: 'bold',
}));

const ColorfulBox = styled(Box)(({theme}) => ({
    backgroundColor: '#EDF5E1', // Added color here
    color: '#05386B', // Added color here
}));

const OrderById = () => {
    const dispatch = useDispatch();
    const orderSuccess = useSelector(getOrderByIdSuccess);
    const orderFailure = useSelector(getOrderByIdFailure)

    const [selectedId, setSelectedId] = useState(null);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    let {id} = useParams();

    useEffect(() => {
        dispatch(getOrderById(id))
    }, [])

    useEffect(() => {
        if (orderSuccess) {
            setLoading(false)
        }
    }, [orderSuccess])

    useEffect(() => {
        if (orderFailure) {
            errorToast(orderFailure.error)
        }
    }, [orderFailure])

    const order = orderSuccess && orderSuccess.data;

    return (
        <ColorfulBox m="20px" p="20px" style={{maxWidth: '80vw', overflowX: 'hidden'}}>
            <Box position="relative">
                {loading ? (
                    <CircularProgress/>
                ) : (
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h4" gutterBottom color="text.secondary">Order Details</Typography>
                        </Grid>
                        <Grid item xs={6} md={4} lg={3}>
                            <Typography variant="h6">Sales Order ID:</Typography>
                            <Typography variant="h6">{order ? order.SalesorderId || 'N/A' : 'Loading...'}</Typography>
                        </Grid>
                        <Grid item xs={6} md={4} lg={3}>
                            <Typography variant="h6">Customer ID:</Typography>
                            <Typography variant="h6">{order ? order.CustomerId || 'N/A' : 'Loading...'}</Typography>
                        </Grid>
                        <Grid item xs={6} md={4} lg={3}>
                            <Typography variant="h6">Billing Account:</Typography>
                            <Typography variant="h6">{order ? order.BillingAccount || 'N/A' : 'Loading...'}</Typography>
                        </Grid>
                        <Grid item xs={6} md={4} lg={3}>
                            <Typography variant="h6">Email:</Typography>
                            <Typography variant="h6">{order ? order.Email || 'N/A' : 'Loading...'}</Typography>
                        </Grid>
                        <Grid item xs={6} md={4} lg={3}>
                            <Typography variant="h6">Purchase Order:</Typography>
                            <Typography variant="h6">{order ? order.PurchaseOrder || 'N/A' : 'Loading...'}</Typography>
                        </Grid>
                        <Grid item xs={6} md={4} lg={3}>
                            <Typography variant="h6">Payment Method:</Typography>
                            <Typography variant="h6">{order ? order.PaymentMethod || 'N/A' : 'Loading...'}</Typography>
                        </Grid>
                        <Grid item xs={6} md={4} lg={3}>
                            <Typography variant="h6">Supplier:</Typography>
                            <Typography variant="h6">{order ? order.Supplier || 'N/A' : 'Loading...'}</Typography>
                        </Grid>
                        <Grid item xs={6} md={4} lg={3}>
                            <Typography variant="h6">Shipping Method:</Typography>
                            <Typography variant="h6">{order ? order.ShippingMethod || 'N/A' : 'Loading...'}</Typography>
                        </Grid>
                        <Grid item xs={6} md={4} lg={3}>
                            <Typography variant="h6">Backorder Shipping Method:</Typography>
                            <Typography
                                variant="h6">{order ? order.BackorderShippingMethod || 'N/A' : 'Loading...'}</Typography>
                        </Grid>
                        <Grid item xs={6} md={4} lg={3}>
                            <Typography variant="h6">Shipper Account Number:</Typography>
                            <Typography
                                variant="h6">{order ? order.ShipperAccountNumber || 'N/A' : 'Loading...'}</Typography>
                        </Grid>
                        <Grid item xs={6} md={4} lg={3}>
                            <Typography variant="h6">Backorder Shipper Account Number:</Typography>
                            <Typography
                                variant="h6">{order ? order.BackorderShipperAccountNumber || 'N/A' : 'Loading...'}</Typography>
                        </Grid>
                        <Grid item xs={6} md={4} lg={3}>
                            <Typography variant="h6">Shipment Type:</Typography>
                            <Typography variant="h6">{order ? order.ShipmentType || 'N/A' : 'Loading...'}</Typography>
                        </Grid>
                        <Grid item xs={6} md={4} lg={3}>
                            <Typography variant="h6">Currency:</Typography>
                            <Typography variant="h6">{order ? order.Currency || 'N/A' : 'Loading...'}</Typography>
                        </Grid>
                    </Grid>
                )}

                <Box display="flex" justifyContent="space-between" marginTop={2}>
                    <StyledCard>
                        <CardContent>
                            <Typography variant="h6" color="text.secondary">Shipping Address</Typography>
                            {order && order.ShippingAddress && (
                                <>
                                    <Typography variant="body1">{order.ShippingAddress.Company}</Typography>
                                    <Typography
                                        variant="body1">{order.ShippingAddress.FirstName} {order.ShippingAddress.LastName}</Typography>
                                    <Typography variant="body2">{order.ShippingAddress.AddressLineOne}</Typography>
                                    <Typography variant="body2">{order.ShippingAddress.AddressLineTwo}</Typography>
                                    <Typography
                                        variant="body2">{order.ShippingAddress.City}, {order.ShippingAddress.Province} {order.ShippingAddress.PostalCode}</Typography>
                                    <Typography variant="body2">{order.ShippingAddress.Country}</Typography>
                                </>
                            )}
                        </CardContent>
                    </StyledCard>
                    <StyledCard>
                        <CardContent>
                            <Typography variant="h6" color="text.secondary">Billing Address</Typography>
                            {order && order.BillingAddress && (
                                <>
                                    <Typography variant="body1">{order.BillingAddress.Company}</Typography>
                                    <Typography
                                        variant="body1">{order.BillingAddress.FirstName} {order.BillingAddress.LastName}</Typography>
                                    <Typography variant="body2">{order.BillingAddress.AddressLineOne}</Typography>
                                    <Typography variant="body2">{order.BillingAddress.AddressLineTwo}</Typography>
                                    <Typography
                                        variant="body2">{order.BillingAddress.City}, {order.BillingAddress.Province} {order.BillingAddress.PostalCode}</Typography>
                                    <Typography variant="body2">{order.BillingAddress.Country}</Typography>
                                </>
                            )}
                        </CardContent>
                    </StyledCard>
                </Box>

                <Box marginY={2}>
                    <Typography variant="h5" color="text.secondary" marginBottom={2}>Order Line Items</Typography>
                    <TableContainer component={Paper} style={{maxWidth: '100%', overflowX: 'auto'}}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>Item</StyledTableCell>
                                    <StyledTableCell>Description</StyledTableCell>
                                    <StyledTableCell>Quantity</StyledTableCell>
                                    <StyledTableCell>Price</StyledTableCell>
                                    <StyledTableCell>PoLineItemNumber</StyledTableCell>
                                    <StyledTableCell>ManufacturerPartNumber</StyledTableCell>
                                    <StyledTableCell>Manufacturer</StyledTableCell>
                                    <StyledTableCell>CountryOfOrigin</StyledTableCell>
                                    <StyledTableCell>CustomerReference</StyledTableCell>
                                    <StyledTableCell>UnitPrice</StyledTableCell>
                                    <StyledTableCell>QuantityBackorder</StyledTableCell>
                                    <StyledTableCell>BackOrderDetails</StyledTableCell>
                                    <StyledTableCell>QuantityShipped</StyledTableCell>
                                    <StyledTableCell>DefaultShipping</StyledTableCell>
                                    <StyledTableCell>Schedule</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {order && order.LineItems.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{item.DigiKeyPartNumber || 'N/A'}</TableCell>
                                        <TableCell>{item.ProductDescription || 'N/A'}</TableCell>
                                        <TableCell>{item.Quantity || 'N/A'}</TableCell>
                                        <TableCell>{item.TotalPrice || 'N/A'}</TableCell>
                                        <TableCell>{item.PoLineItemNumber || 'N/A'}</TableCell>
                                        <TableCell>{item.ManufacturerPartNumber || 'N/A'}</TableCell>
                                        <TableCell>{item.Manufacturer || 'N/A'}</TableCell>
                                        <TableCell>{item.CountryOfOrigin || 'N/A'}</TableCell>
                                        <TableCell>{item.CustomerReference || 'N/A'}</TableCell>
                                        <TableCell>{item.UnitPrice || 'N/A'}</TableCell>
                                        <TableCell>{item.QuantityBackorder || 'N/A'}</TableCell>
                                        <TableCell>{item.BackOrderDetails || 'N/A'}</TableCell>
                                        <TableCell>{item.QuantityShipped || 'N/A'}</TableCell>
                                        <TableCell>{item.DefaultShipping ? JSON.stringify(item.DefaultShipping) : 'N/A'}</TableCell>
                                        <TableCell>{item.Schedule ? JSON.stringify(item.Schedule) : 'N/A'}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody> </Table>
                    </TableContainer>
                </Box>
                <Box marginY={2}>
                    <Typography variant="h5" color="text.secondary" marginBottom={2}>Shipping Details</Typography>
                    <TableContainer component={Paper} style={{maxWidth: '100%', overflowX: 'auto'}}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>InvoiceId</StyledTableCell>
                                    <StyledTableCell>DeliveryDate</StyledTableCell>
                                    <StyledTableCell>TrackingUrl</StyledTableCell>
                                    <StyledTableCell>Carrier</StyledTableCell>
                                    <StyledTableCell>CarrierPackageId</StyledTableCell>
                                    <StyledTableCell>CanceledOrVoided</StyledTableCell>
                                    <StyledTableCell>DateTransaction</StyledTableCell>
                                    <StyledTableCell>ShippingMethod</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {order && order.ShippingDetails.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{item.InvoiceId}</TableCell>
                                        <TableCell>{item.DeliveryDate ? item.DeliveryDate : 'N/A'}</TableCell>
                                        <TableCell>{item.TrackingUrl ? item.TrackingUrl : 'N/A'}</TableCell>
                                        <TableCell>{item.Carrier}</TableCell>
                                        <TableCell>{item.CarrierPackageId}</TableCell>
                                        <TableCell>{item.CanceledOrVoided ? 'Yes' : 'No'}</TableCell>
                                        <TableCell>{item.DateTransaction ? item.DateTransaction : 'N/A'}</TableCell>
                                        <TableCell>{item.ShippingMethod ? item.ShippingMethod : 'N/A'}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Box>
        </ColorfulBox>
    );
};

export default OrderById;
