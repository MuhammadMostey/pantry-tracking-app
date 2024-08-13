"use client";
// react
import { useEffect, useState } from "react";

// mui
import { Box, Stack, Typography } from "@mui/material";
import { useStyle } from "@mui/material/styles";
import homeStyles from "./style";

// firebase
import { db } from "../firebase";
import {
  getDoc,
  getDocs,
  collection,
  firestore,
  query,
  onSnapshot,
} from "firebase/firestore";


let items = ["potato", "tomato", "tomato", "tomato", "tomato", "tomato"];

export default function Home() {
  const classes = homeStyles;

  // geting data from the db
  // const data = async () => {
  //   const d = await getDoc(collection(db, "pantry"));
  //   console.log(d);
  // };

  const [pantryItems, setPantryItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const updatePantry = () => {
      const q = query(collection(db, "pantry"));
      const unsubscribe = onSnapshot(q, (docs) => {
        const pantryList = [];
        docs.forEach((doc) => {
          pantryList.push(doc.id);
        });
        setPantryItems(pantryList);
        setLoading(false);
      });
      return unsubscribe;
    };
    updatePantry();
  }, []);

  return (
    <Box sx={classes.main}>
      <Box sx={classes.boxTable}>
        <Box sx={classes.boxHeader}>
          <Typography sx={classes.headerText} variant={"h2"}>
            Pantry Items
          </Typography>
        </Box>
        <Stack sx={classes.boxBody} spacing={2}>
          {loading ? (
            <Box sx={classes.loading}>loading..</Box>
          ) : (
            pantryItems.map((i) => (
              <Box sx={classes.itemBox} key={i}>
                <Typography sx={classes.itemText} variant={"h3"}>
                  {i.charAt(0).toUpperCase() + i.slice(1)}
                </Typography>
              </Box>
            ))
          )}
        </Stack>
      </Box>
    </Box>
  );
}
