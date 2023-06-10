import {Box, useTheme} from "@mui/material";
import StaticDateTimePickerLandscape from "../../containers/MyDateTimePicker";
import Header from "../../containers/Header";
import {tokens} from "../../theme";

const StaticDateTimePickerLandscape1 = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <Box m="20px">
            <Header title="Date Time Picker" subtitle="Simple Date Time Picker "/>

            <Box height="75vh" border={`1px solid ${colors.grey[100]}`} borderRadius="4px">
                <StaticDateTimePickerLandscape/>
            </Box>
        </Box>
    );
};

export default StaticDateTimePickerLandscape1;
