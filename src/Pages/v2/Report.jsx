import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { category3 } from '../../data'
import { acrReport } from '../../api_calls/Papers'
import { useSelector } from 'react-redux'

const Container = styled.div`
    width:100%;
    height:100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 3rem;
    background-color: #fff;
    min-height: 100vh;
    /* background: linear-gradient(45deg, rgba(61,88,230,1) 0%, rgba(111,179,228,1) 33%); */
    >h6{
      font-size: 1.2rem;
    }
    >h5{
      font-size: 2rem;
      text-decoration:underline;
    }
    >section{
      width:90%;
      >h5{
        font-size:1.5rem;
      }
      .table{
        font-size:1rem;
        border:1px solid black;
        border-collapse: collapse;
        overflow:hidden;
        max-width:100%;
        margin-bottom:2rem;
        >th,td,tr{
          border:1px solid black;
          overflow:auto;
          max-width:20%;
          padding:0.5rem;
        }
        /* >thead{
          background-color:black;
          color:white;
        } */
      }
    }
`
const Report = () => {
  const user = useSelector(state => state.user.currentUser)
  const token = useSelector(state => state.user.token)
  const [fetching,setFetching]=useState(true);
  const [myMap, setMyMap] = useState(new Map());

  const fetch=async(category,table)=>{
    const res=await acrReport(category,table,user._id,token); 
    var data=myMap;
    data.set(table,res.data);
    setMyMap(data)
  }
  const fetchAcrData=async() => {
    setFetching(true);
    await fetch("3","a1")
    await fetch("3","a2")
    await fetch("3","b1")
    await fetch("3","b2")
    await fetch("3","c12")
    await fetch("3","c34")
    await fetch("3","e1")
    setFetching(false);
  }
  console.log(myMap.get("a1"))
  useEffect(()=>{ 
    fetchAcrData();
  },[])
  return (
    <Container>
      <h6>CATEGORY III</h6>
      <h5>RESEARCH, PUBLICATIONS AND ACADEMIC CONTRIBUTIONS</h5>
      {fetching==false && category3.table.map(row => (
        <section>
          <h5>{row.name}</h5>
          <table className="table">
            <thead className='tablehead'>
              <tr>
                {row.fields.map(heading => {
                  return <th key={heading}>{heading}</th>
                })}
              </tr>
            </thead>
            <tbody className='tablehead'>
              {myMap.has(row.values) && myMap.get(row.values).map((d, index) => {
                return <tr key={index}>
                  <td>{index+1}</td>
                  {row.prop.map((key, index) => {
                      return <td key={index}>{d[key]}</td>
                  })}
                </tr>;
              })}
            </tbody>
          </table>
        </section>
      ))}
    </Container>
  )
}

export default Report