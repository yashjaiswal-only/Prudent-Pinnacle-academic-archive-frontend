import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { category1, category2, category3 } from '../../data'
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
    align-items: center;
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
    padding:1rem 2rem;
    /* background: linear-gradient(45deg, rgba(61,88,230,1) 0%, rgba(111,179,228,1) 33%); */
    >h6{
      font-size: 1.2rem;
    }
    >h5{
      font-size: 1.5rem;
      text-decoration:underline;
    }
    >section{
      width:100%;
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
        th,td,tr{
          border:1px solid black;
          overflow:auto;
          max-width:20%;
          padding:0.5rem;
        }
        td{
          font-weight: 400;
        }
        th{
          font-weight: 700;
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
  const [fetching, setFetching] = useState(false);
  const [myMap1, setMyMap1] = useState(new Map());
  const [myMap2, setMyMap2] = useState(new Map());
  const [myMap3, setMyMap3] = useState(new Map());

  const fetch = async (category, table, myMap, setMyMap) => {
    const res = await acrReport(category, table, user._id, token);
    var data = myMap;
    data.set(table, res.data);
    setMyMap(data)
  }
  const fetchAcrData = async () => {
    setFetching(true);
    await fetch("1", "a1", myMap1, setMyMap1);
    await fetch("1", "a2", myMap1, setMyMap1);
    await fetch("1", "a3", myMap1, setMyMap1);
    await fetch("1", "a4", myMap1, setMyMap1);
    await fetch("2", "a1", myMap2, setMyMap2);
    await fetch("3", "a1",myMap3,setMyMap3)
    await fetch("3", "a2",myMap3,setMyMap3)
    await fetch("3", "b1",myMap3,setMyMap3)
    await fetch("3", "b2",myMap3,setMyMap3)
    await fetch("3", "c12",myMap3,setMyMap3)
    await fetch("3", "c34",myMap3,setMyMap3)
    await fetch("3", "e1",myMap3,setMyMap3)
    setFetching(false);
  }
  useEffect(() => {
    fetchAcrData();
  }, [])
  return (
    <Container id='report-export'>
      {fetching == false &&
        <>
          <Category1 myMap={myMap1} />
          <Category2 myMap={myMap2} />
          <Category3 myMap={myMap3} />
        </>
      }
      {fetching && <Loader />}
    </Container>
  )
}

const Category1 = ({ myMap }) => {
  const [p1, setP1] = useState(0);
  const [p2, setP2] = useState(0);
  const [p3, setP3] = useState(0);
  const [p4, setP4] = useState(0);
  const [p5, setP5] = useState(0);

  useEffect(() => {
    if (myMap.has('a1')) {
      var sum1 = 0;
      myMap.get('a1').forEach(ele => {
        // sum1+=ele[7];
        var per = parseInt(ele[7].replace('%', ''));
        sum1 += per;
      });
      setP1((sum1 / myMap.get('a1').length) * 0.5)
    }
    if (myMap.has('a2')) {
      setP3(Math.min(20, myMap.get('a2').length * 4))
    }
    if (myMap.has("a3")) {
      var sum = 0;
      myMap.get("a3").forEach(a => {
        sum += a;
      })
      setP4(sum);
    }
    if (myMap.has("a4")) {
      var sum = 0;
      myMap.get("a4").forEach(a => {
        sum += a - '0';
      })
      setP5(sum);
    }
  }, [])
  return (
    <>
      <h5>ACADEMIC PERFORMANCE INDICATORS (API) (CATEGORY: I)</h5>
      <h6>(Please see detailed instructions of this PBAS Proforma before filling out this section)</h6>
      <h6>Also refer AICTE regulation 2012 dated 8th November 2012</h6>
      <h5>TEACHING, LEARNING AND EVALUATION RELATED ACTIVITIES</h5>
      <section>
        <table className="table">
          <thead >
            <tr>
              {category1.table1.fields.map(heading => {
                return <th key={heading}>{heading}</th>
              })}
            </tr>
          </thead>
          <tbody >
            {category1.table1.rows.map((r, index) => {
              return <tr key={index}>
                {r.text.map((key, index) => {
                  return <td key={index}>{key}</td>
                })}
                {index == 0 && <td>{p1}</td>}
                {index == 1 && <td>{p2}</td>}
                {index == 2 && <td>{p3}</td>}
                {index == 3 && <td>{p4}</td>}
                {index == 4 && <td>{p5}</td>}
              </tr>;
            })}
            <tr>
              <td style={{ fontWeight: '700' }} colSpan={2}>Total Score Obtained</td>
              <td style={{ fontWeight: '700' }}>175</td>
              <td style={{ fontWeight: '700' }}>{p1 + p2 + p3 + p4 + p5}</td>
            </tr>
            <tr><td style={{ fontWeight: '700' }} colSpan={4}>Minimum API score required per year 75</td></tr>
          </tbody>
        </table>
      </section>

      <h5>Details of the above given Table </h5>
      <h6>Details of Part 1 and 2:    Lectures, Seminars, Tutorials, Practical, Contact Hours and duties in excess of the AICTE norms </h6>
      <section>
        <table className="table">
          <thead>
            <tr>
              <th rowSpan={2}>{category1.table2.fields.a}</th>
              <th rowSpan={2}>{category1.table2.fields.b}</th>
              <th rowSpan={2}>{category1.table2.fields.c}</th>
              <th colSpan={2}>{category1.table2.fields.d}</th>
              <th rowSpan={2}>{category1.table2.fields.e}</th>
              <th colSpan={2}>{category1.table2.fields.h}</th>
              <th rowSpan={2}>{category1.table2.fields.k}</th>
              <th rowSpan={2}>{category1.table2.fields.l}</th>
            </tr>
            <tr>
              <th>{category1.table2.fields.f}</th>
              <th>{category1.table2.fields.g}</th>
              <th>{category1.table2.fields.i}</th>
              <th>{category1.table2.fields.j}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {myMap.has('a1') && myMap.get('a1').map((ele, idx) => (
                <>
                  <td>{idx + 1}</td>
                  {ele.length > 0 && ele.map(val => (
                    <td>{val}</td>
                  ))}
                </>
              ))}
            </tr>
            <tr>
              <td colSpan={9} style={{ fontWeight: '700' }}>Total Points Acquired (Max. 50 per Year for Part 1 & 10 per year for Part 2):
                <br />*Lecture (L), Seminar (S), Tutorial (T), Practical (P), Contact Hours (C)
              </td>
              <td style={{ fontWeight: '700' }}>{p1}</td>
            </tr>
          </tbody>
        </table>
      </section>

      <h6>Details of Part 3:	Reading/Instructional material consulted and additional knowledge resources provided to students</h6>
      <section>
        <table className="table">
          <thead>
            <tr>
              {category1.table3.fields.map(r => (
                <th>{r}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {myMap.has('a2') && myMap.get('a2').map((ele, idx) => (
                <>
                  <td>{idx + 1}</td>
                  {ele.length > 0 && ele.map(val => (
                    <td>{val}</td>
                  ))}
                </>
              ))}
            </tr>
            <tr>
              <td colSpan={5} style={{ fontWeight: '700' }}>Total Points acquired (Max. 20):</td>
              <td style={{ fontWeight: '700' }}>{p3}</td>
            </tr>
          </tbody>
        </table>
      </section>

      <h6>Details of Part 4:	Use of Participatory and innovative Teaching-Learning (T-L) Methodologies, Updating of subject content, Course Improvement etc.</h6>
      <section>
        <table className="table">
          <thead >
            <tr>
              {category1.table4.fields.map(heading => {
                return <th key={heading}>{heading}</th>
              })}
            </tr>
          </thead>
          <tbody >
            {category1.table4.rows.map((r, index) => {
              return <tr key={index}>
                {r.text.map((key, index) => {
                  return <td key={index}>{key}</td>
                })}
                <td>{myMap.has("a3") && myMap.get("a3")[index]}</td>
              </tr>;
            })}
            <tr>
              <td colSpan={2} style={{ fontWeight: '700' }}>Total Score (Max. Score per Year 20)</td>
              <td style={{ fontWeight: '700' }}>20</td>
              <td style={{ fontWeight: '700' }}>{p4}</td>
            </tr>
          </tbody>
        </table>
      </section>

      <h6>Details of Part 5 : Examination Duties Assigned and Performed</h6>
      <section>
        <table className="table">
          <thead >
            <tr>
              {category1.table5.fields.map(heading => {
                return <th key={heading}>{heading}</th>
              })}
            </tr>
          </thead>
          <tbody >
            {category1.table5.rows.map((r, index) => {
              return <tr key={index}>
                {r.text.map((key, index) => {
                  return <td key={index}>{key}</td>
                })}
                <td>{myMap.has("a4") && myMap.get("a4")[index]}</td>
              </tr>;
            })}
            <tr>
              <td colSpan={2} style={{ fontWeight: '700' }}>Total Score (Max. Score per Year 25)</td>
              <td style={{ fontWeight: '700' }}>25</td>
              <td style={{ fontWeight: '700' }}>{p5}</td>
            </tr>
          </tbody>
        </table>
      </section>
    </>
  )
}

const Category2 = ({ myMap }) => {
  const [p1, setP1] = useState(0);
  const [p2, setP2] = useState(0);
  const [p3, setP3] = useState(0);

  useEffect(() => {
    if (myMap.has("a1")) {
      var sum = 0;
      myMap.get("a1").one.forEach(a => {
        sum += a;
      })
      setP1(Math.min(20, sum));
      sum = 0;
      myMap.get("a1").two.forEach(a => {
        sum += a;
      })
      setP2(Math.min(15, sum));
      sum = 0;
      myMap.get("a1").three.forEach(a => {
        sum += a;
      })
      setP3(Math.min(15, sum));
    }
  }, [])
  return (
    <>
      <h5>ACADEMIC PERFORMANCE INDICATORS (API) – CATEGORY- II</h5>
      <h6>Co-Curricular, Extension, Professional Development Related Activities</h6>
      <h6>(Provide details of activities in separate sheet(s) as enclosure)</h6>
      <section>
        <table className="table">
          <thead>
            <tr>
              {/* <th>S No.</th> */}
              <th colSpan={2} >Type of Activity</th>
              <th>API Score</th>
            </tr>
          </thead>
          <tbody>
            <tr><th colSpan={2} style={{ textAlign: 'left' }}>(i) Extension, Co-curricular & Field based activities.</th></tr>
            {category2.rows1.map((r, idx) => (
              <tr>
                {r.text.map(t => (
                  <td>{t}</td>
                ))}
                <td>{myMap.has('a1') && myMap.get('a1')['one'][idx]}</td>
              </tr>
            ))}
            <tr>
              <td style={{ fontWeight: '500' }}>Total (Max. aggregate limit: 20)</td>
              <td style={{ fontWeight: '500' }}>20</td>
              <td style={{ fontWeight: '500' }}>{p1}</td>
            </tr>
            <tr><th colSpan={2} style={{ textAlign: 'left' }}>(ii) Contribution to Corporate Life and Management of the Institution</th></tr>
            {category2.rows2.map((r, idx) => (
              <tr>
                {r.text.map(t => (
                  <td>{t}</td>
                ))}
                <td>{myMap.has('a1') && myMap.get('a1')['two'][idx]}</td>
              </tr>
            ))}
            <tr>
              <td style={{ fontWeight: '500' }}>Total (Max aggregate limit: 15)</td>
              <td style={{ fontWeight: '500' }}>15</td>
              <td style={{ fontWeight: '500' }}>{p2}</td>
            </tr>
            <tr><th colSpan={2} style={{ textAlign: 'left' }}>(iii) Professional Development Activitie.</th></tr>
            {category2.rows3.map((r, idx) => (
              <tr>
                {r.text.map(t => (
                  <td>{t}</td>
                ))}
                <td>{myMap.has('a1') && myMap.get('a1')['three'][idx]}</td>
              </tr>
            ))}
            <tr>
              <td style={{ fontWeight: '500' }}>Total (Max aggregate limit: 15)</td>
              <td style={{ fontWeight: '500' }}>15</td>
              <td style={{ fontWeight: '500' }}>{p3}</td>
            </tr>
            <tr>
              <td style={{ fontWeight: '700' }} colSpan={2}>Total Score Acquired of  ( i to iii ) <br />(Min. Score needed is 15)</td>
              <td style={{ fontWeight: '700' }}>{p1 + p2 + p3}</td>
            </tr>
          </tbody>
        </table>
      </section>
    </>
  )

}
const Category3 = ({ myMap }) => {
  return (
    <>
      <h6>CATEGORY III</h6>
      <h5>RESEARCH, PUBLICATIONS AND ACADEMIC CONTRIBUTIONS</h5>
      {category3.table.map(row => (
        <section>
          <h5>{row.name}</h5>
          <table className="table">
            <thead >
              <tr>
                {row.fields.map(heading => {
                  return <th key={heading}>{heading}</th>
                })}
              </tr>
            </thead>
            <tbody >
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
    </>
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