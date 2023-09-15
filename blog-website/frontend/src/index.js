import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Login from "./components/login"
import Register from "./components/register"
import Post from "./components/Post"
import MainPost from "./components/MainPost";
import EditPost from "./components/EditPost"
import {BrowserRouter as Router , Routes, Route } from "react-router-dom"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path='/' element={<App/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/new-post' element={<Post/>}></Route>
        <Route path='/blogs/:id' element={<MainPost/>}></Route>
        <Route path='/edit/:id' element={<EditPost/>}></Route>
      </Routes>
    
    </Router>
  </React.StrictMode>
);


