import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { category3 } from '../../data'
import { acrReport } from '../../api_calls/Papers'
import { useSelector } from 'react-redux'
import Loader from '../../Components/v1/Loader';
import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

const Wrapper = styled.div`
  width:100%;
  display:flex;
  flex-direction: column;
  background-color: rgb(0, 0, 0);
  color:white;


`

const Heading = styled.div`
  width:100%;
  display:flex;
  justify-content: space-around;
  align-items: center;
  font-weight: 700;
  font-size: 1.5rem;

  button{
    margin: 0.5rem;
    padding: 10px 20px;
    border-radius: 0;
    text-align: center;
    display: flex;
  }
`

const Container = styled.div`
    width:100%;
    height:max-content;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 3rem;
    min-height: 100vh;
    color:black;  
    background-color: #fff;
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
        width:100%;
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
  const [fetching, setFetching] = useState(true);
  const [myMap, setMyMap] = useState(new Map());

  const fetch = async (category, table) => {
    const res = await acrReport(category, table, user._id, token);
    var data = myMap;
    data.set(table, res.data);
    setMyMap(data)
  }
  const fetchAcrData = async () => {
    setFetching(true);
    await fetch("3", "a1")
    await fetch("3", "a2")
    await fetch("3", "b1")
    await fetch("3", "b2")
    await fetch("3", "c12")
    await fetch("3", "c34")
    await fetch("3", "e1")
    setFetching(false);
  }
  useEffect(() => {
    fetchAcrData();
  }, [])
  return (
    <Container id='report-export'>
      <h6>CATEGORY III</h6>
      <h5>RESEARCH, PUBLICATIONS AND ACADEMIC CONTRIBUTIONS</h5>
      {fetching == false && category3.table.map(row => (
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
                  <td>{index + 1}</td>
                  {row.prop.map((key, index) => {
                    return <td key={index}>{d[key]}</td>
                  })}
                </tr>;
              })}
            </tbody>
          </table>
        </section>
      ))}
      {fetching && <Loader />}
    </Container>
  )
}

const ReportPage = () => {

  const print = () => {
    var el = document.querySelector("#report-export");
    html2canvas(el, {
      width: el.scrollWidth,
      height: el.scrollHeight,
    })
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        console.log(imgData)
        const pdf = new jsPDF("p", "mm", "a4");
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('download.pdf');
      });
  }
  const print2 = () => {
    var data = document.getElementById('report-export');
    var positionInfo = data.getBoundingClientRect();

    const htmlWidth = positionInfo.width;
    const htmlHeight = positionInfo.height;

    const topLeftMargin = 15;

    let pdfWidth = htmlWidth + (topLeftMargin * 2);
    let pdfHeight = (pdfWidth * 1.5) + (topLeftMargin * 2);

    const canvasImageWidth = htmlWidth;
    const canvasImageHeight = htmlHeight;

    const totalPDFPages = Math.ceil(htmlHeight / pdfHeight) - 1;

    html2canvas(data, { allowTaint: true }).then(canvas => {

      canvas.getContext('2d');
      const imgData = canvas.toDataURL("image/jpeg", 1.0);
      let pdf = new jsPDF('p', 'pt', [pdfWidth, pdfHeight]);
      pdf.addImage(imgData, 'png', topLeftMargin, topLeftMargin, canvasImageWidth, canvasImageHeight);

      for (let i = 1; i <= totalPDFPages; i++) {
        pdf.addPage([pdfWidth, pdfHeight], 'p');
        pdf.addImage(imgData, 'png', topLeftMargin, - (pdfHeight * i) + (topLeftMargin * 4), canvasImageWidth, canvasImageHeight);
      }

      pdf.save(`Document ${new Date().toLocaleString()}.pdf`);
    });
  }
  return (
    <Wrapper>
      <Heading>
        <span>Annual Confidential Report (ACR)</span>
        <button onClick={() => print2()}><PictureAsPdfIcon /> Export </button>
      </Heading>
      <Report />
    </Wrapper>
  )
}
export default ReportPage