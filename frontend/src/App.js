import React from "react";
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";
 // We import all the components we need in our app
import Welcome from "./views/welcome";
import RecordList from "./views/recordList";
import Edit from "./views/edit";
import Layout from "./components/layout";
import Create from "./views/create";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./App.scss";
 
const theme = createTheme({
  // add whatever themes here, will take precedence over default theme
  palette: {
    primary: {
      // instead of set main color, can just set primary to a color object
      main: "#00cc99",
    },
    secondary: {
      main: "#f50057",
    },
  },
});

const App = () => {
return (
  <ThemeProvider theme={theme}>
   <div style={{margin: -8}}>
    <Layout>
     {/* <Navbar /> */}
     <Routes>
       <Route exact path="/" element={<Welcome />} />
       <Route exact path="/list" element={<RecordList />} />
       <Route path="/edit/:id" element={<Edit />} />
       <Route path="/create" element={<Create />} />
     </Routes>
     </Layout>
   </div>
   </ThemeProvider>
);
};
export default App;