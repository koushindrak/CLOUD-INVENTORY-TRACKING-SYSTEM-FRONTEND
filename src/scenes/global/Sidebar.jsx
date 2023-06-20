import {useState} from "react";
import {Menu, MenuItem, ProSidebar} from "react-pro-sidebar";
import {Box, IconButton, Typography, useTheme} from "@mui/material";
import {Link} from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import {tokens} from "../../theme";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import StorefrontIcon from '@mui/icons-material/Storefront';
import DeveloperBoardIcon from '@mui/icons-material/DeveloperBoard';
import MemoryIcon from '@mui/icons-material/Memory';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import Business from '@mui/icons-material/Business';

import AssignmentIndRoundedIcon from '@mui/icons-material/AssignmentIndRounded';
import HelpCenterRoundedIcon from '@mui/icons-material/HelpCenterRounded';
import LockResetRoundedIcon from '@mui/icons-material/LockResetRounded';
import {UserOutlined} from "@ant-design/icons";

const Item = ({title, to, icon, selected, setSelected}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <MenuItem
            active={selected === title}
            style={{
                color: colors.grey[100],
            }}
            onClick={() => setSelected(title)}
            icon={icon}
        >
            <Typography>{title}</Typography>
            <Link to={to}/>
        </MenuItem>
    );
};

const Sidebar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState("Dashboard");

    return (
        <Box
            sx={{
                "& .pro-sidebar-inner": {
                    background: `${colors.primary[400]} !important`,
                },
                "& .pro-icon-wrapper": {
                    backgroundColor: "transparent !important",
                },
                "& .pro-inner-item": {
                    padding: "5px 35px 5px 20px !important",
                },
                "& .pro-inner-item:hover": {
                    color: "#868dfb !important",
                },
                "& .pro-menu-item.active": {
                    color: "#6870fa !important",
                },
            }}
        >
            <ProSidebar collapsed={isCollapsed}>
                <Menu iconShape="square">
                    {/* LOGO AND MENU ICON */}
                    <MenuItem
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        icon={isCollapsed ? <MenuOutlinedIcon/> : undefined}
                        style={{
                            margin: "10px 0 20px 0",
                            color: colors.grey[100],
                        }}
                    >
                        {!isCollapsed && (
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                ml="15px"
                            >
                                <Typography variant="h5" color={colors.grey[100]}>
                                    Ecosystem informatics
                                </Typography>
                                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                                    <MenuOutlinedIcon/>
                                </IconButton>
                            </Box>
                        )}
                    </MenuItem>

                    {!isCollapsed && (
                        <Box mb="25px">
                            <Box display="flex" justifyContent="center" alignItems="center">
                                <img
                                    alt="profile-user"
                                    width="100px"
                                    height="100px"
                                    src={`../../assets/ecossystem.jpeg`}
                                    style={{cursor: "pointer", borderRadius: "20%"}}
                                />
                            </Box>
                            <Box textAlign="center">
                                <Typography
                                    variant="h2"
                                    color={colors.grey[100]}
                                    fontWeight="bold"
                                    sx={{m: "10px 0 0 0"}}
                                >
                                    Leslie Mills
                                </Typography>
                                <Typography variant="h5" color={colors.greenAccent[500]}>
                                    Admin
                                </Typography>
                            </Box>
                        </Box>
                    )}

                    <Box paddingLeft={isCollapsed ? undefined : "10%"}>
                        <Item
                            title="Manage Users"
                            to="/users"
                            icon={<UserOutlined/>}
                            selected={selected}
                            setSelected={setSelected}
                        />

                        {/*<Item*/}
                        {/*    title="Forgot Password"*/}
                        {/*    to="/forgot-pass"*/}
                        {/*    icon={<HelpCenterRoundedIcon/>}*/}
                        {/*    selected={selected}*/}
                        {/*    setSelected={setSelected}*/}
                        {/*/>*/}

                        {/*<Item*/}
                        {/*    title="New Password"*/}
                        {/*    to="/new-pass"*/}
                        {/*    icon={<LockResetRoundedIcon/>}*/}
                        {/*    selected={selected}*/}
                        {/*    setSelected={setSelected}*/}
                        {/*/>*/}

                        <Item
                            title="Products"
                            to="/products"
                            icon={<StorefrontIcon/>}
                            selected={selected}
                            setSelected={setSelected}
                        />

                        <Item
                            title="PCB's"
                            to="/pcbs"
                            icon={<DeveloperBoardIcon/>}
                            selected={selected}
                            setSelected={setSelected}
                        />

                        <Item
                            title="Components"
                            to="/components"
                            icon={<MemoryIcon/>}
                            selected={selected}
                            setSelected={setSelected}
                        />

                        <Item
                            title="Suppliers"
                            to="/suppliers"
                            icon={<Business/>}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Track Orders"
                            to="/orders"
                            icon={<LocalShippingIcon/>}
                            selected={selected}
                            setSelected={setSelected}
                        />

                    </Box>
                </Menu>
            </ProSidebar>
        </Box>
    );
};

export default Sidebar;
