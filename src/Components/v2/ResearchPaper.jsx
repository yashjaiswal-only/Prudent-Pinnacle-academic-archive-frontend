import React from 'react'
import { useLocation } from 'react-router-dom'

const ResearchPaper = () => {
    const location=useLocation();
    console.log(location)
  return (
    <div>ResearchPaper - {location.state&&location.state.type}</div>
  )
}

export default ResearchPaper