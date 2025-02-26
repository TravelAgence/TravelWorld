import * as React from "react";
import { ThemeProvider, createTheme, styled } from "@mui/material/styles"; // Import styled here
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { Outlet } from "react-router-dom";
import Navbar from "./navbar/Navbar"; 
import SideBar from "./sidebar/Sidebar"; 
import { DarkModeContext } from "./context/darkModeContext"; 

const DrawerHeader = styled("div")(({ theme }) => ({
  ...theme.mixins.toolbar,
}));

const AdminLayout = () => {
  const { darkMode } = React.useContext(DarkModeContext); 
  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light", // Set theme mode based on darkMode state
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Navbar />
        <SideBar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          <Outlet />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default AdminLayout;
