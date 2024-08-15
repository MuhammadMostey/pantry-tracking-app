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
import { homeStyles } from "./style";
import { useTheme } from "@mui/material/styles";

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
  const theme = useTheme();
  const classes = homeStyles(theme);

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
    // Ensure item and quantity are valid
    if (item.trim() === "" || quantity <= 0) {
      setError("Item name cannot be empty and quantity must be at least 1.");
      return;
    }

    const docRef = doc(db, "pantry", item);
    const docSnap = await getDoc(docRef);

    // Check if the document exists
    if (docSnap.exists()) {
      const data = docSnap.data();
      const currentQuantity = Number(data.quantity); // Ensure currentQuantity is a number
      const newQuantity = currentQuantity + Number(quantity);

      // Update the document with the new quantity
      await setDoc(docRef, { quantity: newQuantity }, { merge: true });
    } else {
      // If the document does not exist, create it with the initial quantity
      await setDoc(docRef, { quantity: Number(quantity) });
    }

    // Clear form fields
    setItemName("");
    setQuantity(1);
    setError("");
  };

  // used to delete an item from the db
  const removeItem = async (item) => {
    await deleteDoc(doc(db, "pantry", item));
  };

  // quantity of items
  const [quantity, setQuantity] = useState(1);

  return (
    <Box sx={classes.main}>
      <Box sx={classes.addButtonContainer}>
        <IconButton
          aria-label="add"
          size="large"
          variant="outlined"
          color="error"
          onClick={handleOpen}
          sx={classes.addButton}
        >
          <AddIcon size="small" />
        </IconButton>
      </Box>
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
                <Typography sx={classes.itemText} variant={"h5"}>
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

      <Box marginTop={"2rem"}>
        <footer>Developed with ❤️ by Muhammad Mostey</footer>
      </Box>
    </Box>
  );
}
