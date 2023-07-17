import {Box} from "@mui/material";
import Header from "../../containers/Header";
import PieChart from "../../containers/PieChart";

const Pie = () => {
    return (
        <Box marginLeft="275px" marginRight="10px" marginBottom="10px">
            <Header title="Pie Chart" subtitle="Simple Pie Chart"/>
            <Box height="75vh">
                <PieChart/>
            </Box>
        </Box>
    );
};

export default Pie;
