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
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import Btp from './Components/Records/Btp';
import EditBtp from './Components/Records/EditBtp';
import Mtp from './Components/Records/Mtp';
import EditMtp from './Components/Records/EditMtp';

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
        {
          path: "/btechproject",
          element: <Btp/>,
        },
        {
          path: "/btechproject/edit",
          element: <EditBtp />,
        },
        {
          path: "/mtechproject",
          element: <Mtp/>,
        },
        {
          path: "/mtechproject/edit",
          element: <EditMtp />,
        },
        {
          path: "/facultydevelopmentprogram",
          element: <Conference/>,
        },
        {
          path: "/facultydevelopmentprogram/edit",
          element: <EditConference />,
        },
        {
          path: "/shorttermcourses",
          element: <Conference/>,
        },
        {
          path: "/shorttermcourses/edit",
          element: <EditConference />,
        },
        {
          path: "/patents",
          element: <Conference/>,
        },
        {
          path: "/patents/edit",
          element: <EditConference />,
        },
        {
          path: "/projectgrands",
          element: <Conference/>,
        },
        {
          path: "/projectgrands/edit",
          element: <EditConference />,
        },
        {
          path: "/consultancy",
          element: <Conference/>,
        },
        {
          path: "/consultancy/edit",
          element: <EditConference />,
        },
        {
          path: "/invitedtalk",
          element: <Conference/>,
        },
        {
          path: "/invitedtalk/edit",
          element: <EditConference />,
        },
        {
          path: "/societymembership",
          element: <Conference/>,
        },
        {
          path: "/societymembership/edit",
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
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <RouterProvider router={router} />
      </LocalizationProvider>
    </Component>
  )
}

export default App
