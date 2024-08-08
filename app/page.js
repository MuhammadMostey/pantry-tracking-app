import { Box, Stack, Typography } from "@mui/material";
import { useStyle } from "@mui/material/styles";
import homeStyles from "./style";
export default function Home() {
  const classes = homeStyles;
  let items = ["potato", "tomato", "tomato", "tomato", "tomato", "tomato"];
  return (
    <Box sx={classes.main}>
      <Box sx={classes.boxTable}>
        <Box sx={classes.boxHeader}>
          <Typography sx={classes.headerText} variant={"h2"}>
            Pantry Items
          </Typography>
        </Box>
        <Stack sx={classes.boxBody} spacing={2}>
          {items.map((i) => (
            <Box sx={classes.itemBox} key={i}>
              <Typography sx={classes.itemText} variant={"h3"}>
                {i.charAt(0).toUpperCase() + i.slice(1)}
              </Typography>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
