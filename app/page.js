import { Box } from "@mui/material";
import { useStyle } from "@mui/material/styles";
import homeStyles from "./style";
export default function Home() {
  const classes = homeStyles;
  return (
    <Box sx={classes.main}>
      <Box>Pantry Items</Box>
    </Box>
  );
}
