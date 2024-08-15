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

// formating numbers for quanitity field
const formatNumber = (number) => {
  return new Intl.NumberFormat().format(number);
};

export default function Home() {
  const classes = homeStyles;

  // used to update client with retrived data from db
  const [pantryItems, setPantryItems] = useState([{}]);
  const [loading, setLoading] = useState(true);

  // getting data from the da tabase
  useEffect(() => {
    const updatePantry = () => {
      const q = query(collection(db, "pantry"));
      const unsubscribe = onSnapshot(q, (docs) => {
        const pantryList = [];
        docs.forEach((doc) => {
          const data = doc.data();
          pantryList.push({ name: doc.id, quantity: data.quantity });
        });
        setPantryItems(pantryList);
        console.log(pantryList);
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
  const [error, setError] = useState("");
  const addItem = async (item, quantity) => {
    if (item.trim() === "" || quantity <= 0) {
      setError("Item name cannot be empty and quantity must be at least 1.");
      return; // Exit the function early
    }

    try {
      await setDoc(doc(db, "pantry", item), { quantity });
      setError("");
      setItemName("");
      setQuantity(1);
    } catch (error) {
      setError("Failed to add item. Please try again.");
    }
    console.log(item);
  };

  // used to delete an item from the db
  const removeItem = async (item) => {
    await deleteDoc(doc(db, "pantry", item));
  };

  // quantity of items
  const [quantity, setQuantity] = useState(1);

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
            <TextField
              variant="outlined"
              placeholder="quantity"
              label="Quantity"
              type="number"
              required
              sx={classes.modalFormInput}
              value={quantity}
              onChange={(e) => {
                setQuantity(e.target.value);
              }}
            />
            <Button
              variant="outlined"
              onClick={() => {
                addItem(itemName, quantity);
              }}
            >
              Add
            </Button>
          </Box>
          <Box>
            {error && (
              <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                {error}
              </Typography>
            )}
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
              pantryItems.map((object, index) => (
                <Box sx={classes.itemBox} key={index} paddingX={5}>
                  <Typography sx={classes.itemText} variant={"h4"}>
                    {object.name.charAt(0).toUpperCase() + object.name.slice(1)}
                  </Typography>

                  <Typography sx={classes.itemText} variant={"h6"}>
                    Quantity: {formatNumber(object.quantity)}
                  </Typography>

                  <Button
                    variant="contained"
                    onClick={() => {
                      removeItem(object.name);
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
