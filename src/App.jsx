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
import Profie from './Components/v1/Profie';
import EditProfile from './Components/v1/EditProfile';
import Chapter from './Components/v1/Chapter';
import EditChapter from './Components/v1/EditChapter';
import Book from './Components/v1/Book'; 
import EditBook from './Components/v1/EditBook';
import Journal from './Components/v1/Journal';
import EditJournal from './Components/v1/EditJournal';
import Conference from './Components/v1/Conference';
import EditConference from './Components/v1/EditConference';
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
import Register2 from './Pages/v2/authentication/Register2';
import Login2 from './Pages/v2/authentication/Login2';
import Home2 from './Pages/v2/Home/Home2';
import HomeBanner from './Components/v2/HomeBanner';
import MyProfile from './Pages/v2/MyProfile/MyProfile';

const Component=styled.div`
  width:100vw;
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
      path: "/v2/home",
      element: <Home2/>,
      children: [
        {
          path: "/v2/home",
          element: <HomeBanner  />,
        },
        {
          path: "/v2/home/profile",
          element: <MyProfile  />,
        },
      ]
    },
    {
      path: "/v2/register",
      element: <Register2/>,
    },
    {
      path: "/v2/login",
      element: <Login2/>,
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
