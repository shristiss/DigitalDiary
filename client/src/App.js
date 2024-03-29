import { React, useEffect, useState } from "react";
import { Container } from "@material-ui/core";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home/Home.js";
import Navbar from "./components/Navbar/Navbar.js";
import Auth from "./components/Auth/Auth.js";
import PostDetails from "./components/PostDetails/PostDetails.jsx";
const App = () => {
 const user= JSON.parse(localStorage.getItem('profile'))
  return(
    <BrowserRouter>
    <Container maxWidth="xl">
     <Navbar />
     <Routes>
       <Route path="/"  Component={() => <Navigate to="/posts" />}/>
       <Route path="/posts"  Component={Home} />
       <Route path="/posts/search"  Component={Home} />
       <Route path="/posts/:id"  Component={PostDetails} />
       <Route path="/auth"  Component={()=>(!user?<Auth/>:<Navigate to="/posts" />)}/>
     </Routes>
   </Container>
  </BrowserRouter>
  )
  
}

export default App;
