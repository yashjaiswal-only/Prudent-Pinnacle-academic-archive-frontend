import { DateField } from '@mui/x-date-pickers'
import React from 'react'
import styled from 'styled-components'
import moment from "moment";
import dayjs from 'dayjs';
const Container=styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;    
    font-size:0.7rem;
    font-weight:700;
`

const DatePicker = ({date, setDate,title}) => {
  return (
    <Container>
      <DateField sx={{background:'white' , margin:'20px 10px 0px 0px', border:'0.1px solid black', ":focus":{
          border:'1px solid black',
          background:'blue'
        }}} slotProps={{ textField: { size: 'small',width:'40%' } }} 
        onChange={(newValue) => setDate(moment(newValue.$d).format('YYYY-MM-DD'))}
        value={date?dayjs(date,"YYYY-MM-DD"):null} 
        format="YYYY/MM/DD"
        />
        {title}

    </Container>
  )
}

export default DatePicker
