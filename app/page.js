"use client";
// react
import { useEffect, useState } from "react";

// mui
import {
  Box,
  Stack,
  Typography,
  IconButton,
  Modal,
  Button,
  TextField,
} from "@mui/material";
import { useStyle } from "@mui/material/styles";
import homeStyles from "./style";
// mui icons
import AddIcon from "@mui/icons-material/Add";

// firebase
import { db } from "../firebase";
import {
  getDoc,
  getDocs,
  collection,
  firestore,
  query,
  onSnapshot,
  addDoc,
  doc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";


let items = ["potato", "tomato", "tomato", "tomato", "tomato", "tomato"];

export default function Home() {
  const classes = homeStyles;

  // used to update client with retrived data from db
  const [pantryItems, setPantryItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // getting data from the da tabase
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

  // modal window
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // used to get data from form and update db
  const [itemName, setItemName] = useState("");
  const addItem = async (item) => {
    await setDoc(doc(db, "pantry", item), {});
    console.log(item);
  };

  // used to delete an item from the db
  const removeItem = async (item) => {
    await deleteDoc(doc(db, "pantry", item));
  };

  return (
    <Box sx={classes.main}>
      <IconButton
        aria-label="add"
        size="large"
        variant="outlined"
        color="error"
        onClick={handleOpen}
        sx={classes.addButton}
      >
        <AddIcon size="small" /> Add
      </IconButton>

      {/**Active */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={classes.modal} spacing={3}>
          <Typography>Add Item</Typography>
          <Box sx={classes.modalForm} spacing={2}>
            <TextField
              variant="outlined"
              placeholder="Item"
              label="Item"
              required
              sx={classes.modalFormInput}
              value={itemName}
              onChange={(e) => {
                setItemName(e.target.value);
              }}
            />
            <Button
              variant="outlined"
              onClick={() => {
                addItem(itemName);
                setItemName("");
              }}
            >
              Add
            </Button>
          </Box>
        </Box>
      </Modal>
      <Box>
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
                <Box sx={classes.itemBox} key={i} paddingX={5}>
                  <Typography sx={classes.itemText} variant={"h3"}>
                    {i.charAt(0).toUpperCase() + i.slice(1)}
                  </Typography>
                  <Button
                    variant="contained"
                    onClick={() => {
                      removeItem(i);
                    }}
                  >
                    remove
                  </Button>
                </Box>
              ))
            )}
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
