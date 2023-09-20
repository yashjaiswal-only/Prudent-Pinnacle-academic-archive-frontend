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
import Profie from './Components/Profie';
import EditProfile from './Components/EditProfile';
import Chapter from './Components/Chapter';
import EditChapter from './Components/EditChapter';
import Book from './Components/Book';
import EditBook from './Components/EditBook';
import Journal from './Components/Journal';
import EditJournal from './Components/EditJournal';
import Conference from './Components/Conference';
import EditConference from './Components/EditConference';
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
      children: [
        {
          path: "/",
          element: <Profie  />,
        },
        {
          path: "/profile/edit",
          element: <EditProfile />,
        },
        {
          path: "/researchpaper/chapter",
          element: <Chapter/>,
        },
        {
          path: "/chapter/edit",
          element: <EditChapter />,
        },
        {
          path: "/researchpaper/book",
          element: <Book/>,
        },
        {
          path: "/book/edit",
          element: <EditBook />,
        },
        {
          path: "/researchpaper/journal",
          element: <Journal/>,
        },
        {
          path: "/journal/edit",
          element: <EditJournal />,
        },
        {
          path: "/researchpaper/conference",
          element: <Conference/>,
        },
        {
          path: "/conference/edit",
          element: <EditConference />,
        },
      ],
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
