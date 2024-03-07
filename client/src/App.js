import { React, useEffect, useState } from "react";
import { Container } from "@material-ui/core";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home.js";
import Navbar from "./components/Navbar/Navbar.js";
import Auth from "./components/Auth/Auth.js";
const App = () => ( 
 
   <BrowserRouter>
     <Container maxWidth="lg">
      <Navbar />
      <Routes>
        <Route path="/"  Component={Home}/>
        <Route path="/auth"  Component={Auth}/>
      </Routes>
    </Container>
   </BrowserRouter>
  
)

export default App;
