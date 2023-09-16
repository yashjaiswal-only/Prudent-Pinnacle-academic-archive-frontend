import { useState } from 'react'
import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './Pages/Login';
import Register from './Pages/Register';
import { styled } from 'styled-components';
import Home from './Pages/Home';
import MyPapers from './Pages/MyPapers';
const Component=styled.div`
  top:0;
  left:0;
  position: absolute;
`
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home/>,
      
    },
    {
      path: "/papers",
      element: <MyPapers/>,
    },
    {
      path: "/register",
      element: <Register/>,
    },
    {
      path: "/login",
      element: <Login/>,
    },
  ]);
  return (
    <Component>
     <RouterProvider router={router} />
    </Component>
  )
}

export default App
