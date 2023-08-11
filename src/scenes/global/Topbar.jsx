import {Box, IconButton, Tooltip, useTheme} from "@mui/material";
import {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import {ColorModeContext, tokens} from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import {useDispatch} from "react-redux";
import {resetLoginSates} from "../../pages/Login/Login";
// OR
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';

const Topbar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // State to control the settings dropdown menu
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };


    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        // Here you would typically have a function to handle the logout operation...
        // But for now, we just navigate to the "/" page
        dispatch(resetLoginSates())
        localStorage.token = '';
        navigate("/")
    };

    const handleNotificationIconClick = () => {
        navigate("/components/alerts")
        window.location.reload()


    }
    return (
        <Box display="flex" justifyContent="space-between" p={2}>
            <Box display="flex" alignItems="center"/>
            <Box display="flex" alignItems="center">

                <Tooltip title="Switch Theme" placement="top">
                <IconButton onClick={colorMode.toggleColorMode}>
                    {theme.palette.mode === "dark" ? (
                        <DarkModeOutlinedIcon/>
                    ) : (
                        <LightModeOutlinedIcon/>
                    )}
                </IconButton>
                </Tooltip>

                <Tooltip title="Low Stock Alerts" placement="top">
                <IconButton style={{color:"red"}} onClick={handleNotificationIconClick}>
                    <NotificationsOutlinedIcon/>
                </IconButton>
                </Tooltip>

                <Tooltip title="Logout" placement="top">
                <IconButton onClick={handleLogout}>
                    <PowerSettingsNewIcon/>
                </IconButton>
                </Tooltip>

                {/*<IconButton onClick={handleMenuOpen}>*/}
                {/*    <SettingsOutlinedIcon />*/}
                {/*    /!*<ClickAwayListener onClickAway={handleMenuClose}>*!/*/}
                {/*    <Menu*/}
                {/*        anchorEl={anchorEl}*/}
                {/*        keepMounted*/}
                {/*        open={Boolean(anchorEl)}*/}
                {/*        onClose={handleMenuClose}*/}

                {/*    >*/}
                {/*        <MenuItem onClick={handleLogout}>Logout</MenuItem>*/}
                {/*    </Menu>*/}
                {/*    /!*</ClickAwayListener>*!/*/}
                {/*</IconButton>*/}
            </Box>
        </Box>
    );
};

export default Topbar;
