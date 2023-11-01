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
import Fdp from './Components/Records/Fdp';
import EditFdp from './Components/Records/EditFdp';
import Stc from './Components/Records/Stc';
import EditStc from './Components/Records/EditStc';
import Patents from './Components/Records/Patents';
import EditPatents from './Components/Records/EditPatents';
import Society from './Components/Records/Society';
import EditSociety from './Components/Records/EditSociety';
import Talk from './Components/Records/Talk';
import EditTalk from './Components/Records/EditTalk';
import Phd from './Components/Records/Phd';
import EditPhd from './Components/Records/EditPhd';
import Project from './Components/Records/Project';
import EditProject from './Components/Records/EditProject';
import Consultancy from './Components/Records/Consultancy';
import EditConsultancy from './Components/Records/EditConsultancy';

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
          path: "/phdscholar",
          element: <Phd/>,
        },
        {
          path: "/phdscholar/edit",
          element: <EditPhd />,
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
          element: <Fdp/>,
        },
        {
          path: "/facultydevelopmentprogram/edit",
          element: <EditFdp />,
        },
        {
          path: "/shorttermcourses",
          element: <Stc/>,
        },
        {
          path: "/shorttermcourses/edit",
          element: <EditStc />,
        },
        {
          path: "/patents",
          element: <Patents/>,
        },
        {
          path: "/patents/edit",
          element: <EditPatents />,
        },
        {
          path: "/projectgrands",
          element: <Project/>,
        },
        {
          path: "/projectgrands/edit",
          element: <EditProject />,
        },
        {
          path: "/consultancy",
          element: <Consultancy/>,
        },
        {
          path: "/consultancy/edit",
          element: <EditConsultancy />,
        },
        {
          path: "/invitedtalk",
          element: <Talk/>,
        },
        {
          path: "/invitedtalk/edit",
          element: <EditTalk />,
        },
        {
          path: "/societymembership",
          element: <Society/>,
        },
        {
          path: "/societymembership/edit",
          element: <EditSociety />,
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
