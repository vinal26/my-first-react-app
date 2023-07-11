import { format, parse } from "date-fns";
import React, { useEffect, useState, useRef } from "react";
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from "react-icons/bs";
import { CustomChart } from "../../commonComponent/CustomChart";
import { getRandomColor, paginate } from "../../Utils/Helper";

const pageSize = 6


const AllPatientCurrentReading = ({ score }) => {
  const [readings, setReadings] = useState([])
  const [readingData, setReadingData] = useState([])
  const [lables, setLables] = useState([])
  const [lablesData, setLablesData] = useState([])
  const [pageNumber, setPageNumber] = useState(1)
  const [lastPageNumber, setLastPageNumber] = useState(1)
  const [bg, setBg] = useState([])
  const [bgArr, setBgArr] = useState([])


  useEffect(() => {
    if (Array.isArray(score)) {
      let lable = []
      let reading = []
      let lastPageNum = score.length / pageSize;
      score?.map((item) => {
        if(item?.scoreDate?.includes("/")){
          let updated = item.scoreDate.replaceAll("/","-")
          lable.push(updated)
        }else{
          lable.push(item?.scoreDate)
        }
        reading.push(item?.totalScore)
      })
      if (lable.length < 5) {
        for (let i = 0; i < 5; i++) {
          lable.push("")
        }
      }
      setReadings(reading);
      setLables(lable)
      setLastPageNumber(lastPageNum);
      setPageNumber(1);
      setReadingData(paginate(reading, pageSize, pageNumber))
      setLablesData(paginate(lable, pageSize, pageNumber))
      let bg = reading?.map(() => {
        return getRandomColor()
      });
      setBg(bg);
      setBgArr(paginate(bg, pageSize, pageNumber))
    }


  }, [score])

  console.log("Label Data :",lablesData.map(dt => dt && format(parse(dt, 'MM-dd-yyyy', new Date()), 'eee')));

  const finaldata = {
    labels: lablesData.map(dt => dt && format(parse(dt, 'MM-dd-yyyy', new Date()), 'eee')),
    datasets: [
      {
        label: 'Score',
        data: readingData,
        // backgroundColor: bgArr.length ? bgArr : 'rgba(31,126,120,1)',
        // borderColor: 'rgba(31,126,120,1)',
        // borderWidth: 3
        backgroundColor: "#1f7e78",
        borderWidth: 0,
      },
    ],
  };
  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
          <p className="mb-4 nutrishift_overview text-start" style={{fontSize: '0.8rem'}}>NutriShift Score vs Day</p>
          {/* <div className="d-flex justify-content-end">
            <div className="border-0 bg-white p-0 text-center"
             data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="New Readings" onClick={() => {
                if (pageNumber > 1) {
                  let data = paginate(readings, pageSize, pageNumber - 1)
                  let label = paginate(lables, pageSize, pageNumber - 1)
                  let color = paginate(bg, pageSize, pageNumber - 1)
                  setReadingData(data)
                  setLablesData(label)
                  setBgArr(color)
                  setPageNumber(pageNumber - 1)
                }
              }}>
              <BsFillArrowLeftCircleFill className="arrows_pagi mx-3" />
            </div>
            <div className="border-0 bg-white p-0 text-center" 
             data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Old Readings" onClick={() => {
                if (pageNumber < lastPageNumber) {
                  let data = paginate(readings, pageSize, pageNumber + 1)
                  let label = paginate(lables, pageSize, pageNumber + 1)
                  let color = paginate(bg, pageSize, pageNumber + 1)
                  setReadingData(data)
                  setLablesData(label)
                  setBgArr(color)
                  setPageNumber(pageNumber + 1)
                }
              }}><BsFillArrowRightCircleFill className="arrows_pagi" /></div>
          </div> */}
          <select className="metrix_select">
            <option value="breakfast">This week</option>
            <option value="Snacks">This month</option>
          </select>
      </div>

      <div className="row" style={{ width: "100%" }}>
        {/* <div className="col-md-6">
         <div className="mheight_fix">
         <img src="images/image/today/Sugar-Level.png" className="currread_imgt1" alt="" />
         </div>
          <p className="currread_text1">Sugar Level</p>
        </div>

        <div className="col-md-6">
        <div className="mheight_fix">
          <img src="images/image/today/Blood-Pressure.png" className="currread_imgt1" alt="" />
          </div>
          <p className="currread_text1">Blood Pressure</p>
        </div>

        <div className="col-md-6">
        <div className="mheight_fix">
          <img src="images/image/today/Spo2.png" className="currread_imgt1" alt="" />
          </div>
          <p className="currread_text1">Spo2</p>
        </div>

        <div className="col-md-6">
        <div className="mheight_fix">
          <img src="images/image/today/Cholesterol-Level.png" className="currread_imgt1" alt="" />
          </div>
          <p className="currread_text1">Cholesterol Level</p>
        </div> */}

        <CustomChart data={finaldata} />
      </div>
    </>
  );
};

export default AllPatientCurrentReading;
