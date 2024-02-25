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
import ResearchPaper from './Components/v2/ResearchPaper';
import Programs from './Components/v2/Programs';
import Projects from './Components/v2/Projects';
import Activities from './Components/v2/Activities';
import Students from './Components/v2/Students';

const Component=styled.div`
  width:100vw;
`
function App() {
  const router = createBrowserRouter([
    {
      path: "/v1",
      element: <Home/>,
      children: [
        {
          path: "/v1",
          element: <Profie  />,
        },
        {
          path: "/v1/profile/edit",
          element: <EditProfile />,
        },
        {
          path: "/v1/researchpaper/chapter",
          element: <Chapter/>,
        },
        {
          path: "/v1/chapter/edit",
          element: <EditChapter />,
        },
        {
          path: "/v1/researchpaper/book",
          element: <Book/>,
        },
        {
          path: "/v1/book/edit",
          element: <EditBook />,
        },
        {
          path: "/v1/researchpaper/journal",
          element: <Journal/>,
        },
        {
          path: "/v1/journal/edit",
          element: <EditJournal />,
        },
        {
          path: "/v1/researchpaper/conference",
          element: <Conference/>,
        },
        {
          path: "/v1/conference/edit",
          element: <EditConference />,
        },
        {
          path: "/v1/phdscholar",
          element: <Phd/>,
        },
        {
          path: "/v1/phdscholar/edit",
          element: <EditPhd />,
        },
        {
          path: "/v1/btechproject",
          element: <Btp/>,
        },
        {
          path: "/v1/btechproject/edit",
          element: <EditBtp />,
        },
        {
          path: "/v1/mtechproject",
          element: <Mtp/>,
        },
        {
          path: "/v1/mtechproject/edit",
          element: <EditMtp />,
        },
        {
          path: "/v1/facultydevelopmentprogram",
          element: <Fdp/>,
        },
        {
          path: "/v1/facultydevelopmentprogram/edit",
          element: <EditFdp />,
        },
        {
          path: "/v1/shorttermcourses",
          element: <Stc/>,
        },
        {
          path: "/v1/shorttermcourses/edit",
          element: <EditStc />,
        },
        {
          path: "/v1/patents",
          element: <Patents/>,
        },
        {
          path: "/v1/patents/edit",
          element: <EditPatents />,
        },
        {
          path: "/v1/projectgrands",
          element: <Project/>,
        },
        {
          path: "/v1/projectgrands/edit",
          element: <EditProject />,
        },
        {
          path: "/v1/consultancy",
          element: <Consultancy/>,
        },
        {
          path: "/v1/consultancy/edit",
          element: <EditConsultancy />,
        },
        {
          path: "/v1/invitedtalk",
          element: <Talk/>,
        },
        {
          path: "/v1/invitedtalk/edit",
          element: <EditTalk />,
        },
        {
          path: "/v1/societymembership",
          element: <Society/>,
        },
        {
          path: "/v1/societymembership/edit",
          element: <EditSociety />,
        },
      ],
    },
    
    {
      path: "/",
      element: <Home2/>,
      children: [
        {
          path: "/",
          element: <HomeBanner  />,
        },
        {
          path: "//profile",
          element: <MyProfile  />,
        },
        {
          path: "/research/",
          element: <ResearchPaper  />,
        },
        {
          path: "/programs",
          element: <Programs/>,
        },
        {
          path: "/projects",
          element: <Projects/>,
        },
        {
          path: "/activities",
          element: <Activities/>,
        },
        {
          path: "/students",
          element: <Students/>,
        },

      ]
    },
    {
      path: "/register",
      element: <Register2/>,
    },
    {
      path: "/login",
      element: <Login2/>,
    },
    {
      path: "/v1/register",
      element: <Register/>,
    },
    {
      path: "/v1/login",
      element: <Login/>,
    },
    {
      path: "*",
      element: <div>Error! no such page present</div>,
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
