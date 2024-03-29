import {Box} from "@mui/material";
import Header from "../../containers/Header";
import BarChart from "../../containers/BarChart";

const Bar = () => {
    return (
        <Box marginLeft="275px" marginRight="10px" marginBottom="10px">
            <Header title="Bar Chart" subtitle="Simple Bar Chart"/>
            <Box height="75vh">
                <BarChart/>
            </Box>
        </Box>
    );
};

export default Bar;
