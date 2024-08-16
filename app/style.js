export const homeStyles = (theme) => {
  return {
    main: {
      width: "100vw",
      height: "calc(100vh - 100px)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "1rem",
      position: "relative",
      [theme.breakpoints.down("md")]: {
        // Tablets and below
        padding: "0.5rem",
      },
      [theme.breakpoints.down("sm")]: {
        // Mobile phones
        padding: "0.5rem",
      },
    },
    addButtonContainer: {
      position: "absolute",
      bottom: "0.75rem",
      right: "6rem",
      zIndex: 10,
      [theme.breakpoints.down("md")]: {
        // Tablets and below
        bottom: "1rem",
        right: "1rem",
      },
      [theme.breakpoints.down("sm")]: {
        // Mobile phones
        bottom: "1rem",
        right: "1rem",
      },
    },
    camButtonContainer: {
      position: "absolute",
      bottom: "4rem",
      right: "6rem",
      zIndex: 10,
      [theme.breakpoints.down("md")]: {
        // Tablets and below
        bottom: "4rem",
        right: "1rem",
      },
      [theme.breakpoints.down("sm")]: {
        // Mobile phones
        bottom: "4rem",
        right: "1rem",
      },
    },
    camModal: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "80%",
      height: "90%",
      bgcolor: "background.paper",
      borderRadius: 1,
      boxShadow: 24,
      p: 2,
      display: "flex",
      // justifyContent: "space-between",
      flexDirection: "row",
      gap: 3,
      overflow: "auto",
      [theme.breakpoints.down("sm")]: {
        width: "85%",
        flexDirection: "column",
      },
    },
    addButton: {
      backgroundColor: "#FF7F7F",
      border: "2px solid #FF7F7F",
      padding: "1rem",
      height: "2.5rem",
      width: "2.5rem",
      fontSize: "large",
      fontWeight: "bold",
      borderRadius: "50%",
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
      [theme.breakpoints.down("md")]: {
        // Tablets and below
        height: "2rem",
        width: "2rem",
        fontSize: "medium",
      },
      [theme.breakpoints.down("sm")]: {
        // Mobile phones
        height: "1.5rem",
        width: "1.5rem",
        fontSize: "small",
      },
    },
    boxTable: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      border: "1px solid #333",
      borderRadius: "15px",
      paddingBottom: "1rem",
      flexGrow: 1,
      width: "100%",
      maxWidth: "1000px",
      [theme.breakpoints.down("md")]: {
        // Tablets and below
        maxWidth: "90%",
        paddingBottom: "0.5rem",
      },
      [theme.breakpoints.down("sm")]: {
        // Mobile phones
        maxWidth: "100%",
      },
    },
    boxHeader: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#ADD8E6",
      padding: "1rem",
      borderBottom: "1px solid black",
      borderRadius: "15px",
      width: "100%",
      marginBottom: "1rem",
    },
    headerText: {
      height: "100%",
      color: "#333",
      textAlign: "center",
    },
    boxBody: {
      display: "flex",
      overflowY: "auto",
      flexDirection: "column",
      height: "600px",
      width: "100%",
      padding: "0 1rem",
      [theme.breakpoints.down("md")]: {
        // Tablets and below
        height: "650px",
        // width: "700px",
      },
      [theme.breakpoints.down("sm")]: {
        // Mobile phones
        height: "650px",
        // width: "450px",
      },
    },
    itemBox: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      minHeight: "150px",
      width: "100%",
      backgroundColor: "#f0f0f0",
      borderRadius: "1rem",
      padding: "1rem",
      [theme.breakpoints.down("md")]: {
        // Tablets and below
        minHeight: "120px",
        padding: "0.75rem",
      },
      [theme.breakpoints.down("sm")]: {
        // Mobile phones
        minHeight: "100px",
        padding: "0.75rem",
      },
    },
    itemText: {
      color: "#333",
      textAlign: "center",
      [theme.breakpoints.down("md")]: {
        // Tablets and below
        fontSize: "0.875rem",
      },
      [theme.breakpoints.down("sm")]: {
        // Mobile phones
        fontSize: "0.75rem",
      },
    },
    loading: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
    },
    modal: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 400,
      borderRadius: "1rem",
      backgroundColor: "white",
      color: "black",
      border: "2px solid #000",
      boxShadow: 24,
      padding: 4,
      display: "flex",
      flexDirection: "column",
      gap: 2,
      [theme.breakpoints.down("md")]: {
        // Tablets and below
        width: "90%",
      },
      [theme.breakpoints.down("sm")]: {
        // Mobile phones
        width: "100%",
      },
    },
    modalForm: {
      display: "flex",
      flexDirection: "column",
      gap: 2,
    },
  };
};
