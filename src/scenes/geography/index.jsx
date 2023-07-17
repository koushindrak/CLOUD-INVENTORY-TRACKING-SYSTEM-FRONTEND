import {Box, useTheme} from "@mui/material";
import GeographyChart from "../../containers/GeographyChart";
import Header from "../../containers/Header";
import {tokens} from "../../theme";

const Geography = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <Box marginLeft="275px" marginRight="10px" marginBottom="10px">
            <Header title="Geography" subtitle="Simple Geography Chart"/>

            <Box
                height="75vh"
                border={`1px solid ${colors.grey[100]}`}
                borderRadius="4px"
            >
                <GeographyChart/>
            </Box>
        </Box>
    );
};

export default Geography;
