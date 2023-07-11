import React from "react";

const AllpatientDiagram = ({ data, datalifeGoal, dataGoal, healthGoal}) => {
  return (
    <>
      {/* <div className="goals_symtoms mt-3">
        <div className="row h-100">
          <div className="col-md-6">
            <p>Goals</p>
            {dataGoal.length ? <ul>
              {dataGoal?.map((item, index) => <li key={item + index}>{item}</li>)}
            </ul> : <div className="no-data-found">No Goals Found</div>}
          </div>

          <div className="col-md-6">
            <p>Symptoms</p>
            {data.length ? <ul>
              {data?.map((item,index) => <li key={item?._id}>{item?.name}</li>)}
            </ul> : <div className="no-data-found">No Symptoms Found</div>}
          </div>
        </div>
      </div> */}

      <div className="row">
        <div className="col-md-6 my-3 goalsWarpper">
          <div className="card cardBg1" style={{width: "100%", height: "240px"}}>
              <div className="card-body">
                <h5 className="card-title">Nutrition Goals</h5>
                {dataGoal.length ? <ul>
                  {dataGoal?.map((item, index) => <li key={item + index}>{item}</li>)}
                </ul> : <div className="no-data-found">No Nutrition Goal Found</div>}
              </div>
            </div>
        </div>
        <div className="col-md-6 my-3 goalsWarpper">
          <div className="card cardBg2" style={{width: "100%", height: "240px"}}>
              <div className="card-body">
                <h5 className="card-title">Lifestyle Goals</h5>
                {datalifeGoal.length ? <ul>
                  {datalifeGoal?.map((item, index) => <li key={item + index}>{item}</li>)}
                </ul> : <div className="no-data-found">No Lifestyle Goal Found</div>}
              </div>
            </div>
        </div>
        <div className="col-md-6 goalsWarpper">
          <div className="card cardBg4" style={{width: "100%", height: "240px"}}>
              <div className="card-body">
                <h5 className="card-title">Health Goals</h5>
                {healthGoal.length ? <ul>
                  {healthGoal?.map((item, index) => <li key={item + index}>{item}</li>)}
                </ul> : <div className="no-data-found">No health Goal Found</div>}
              </div>
            </div>
        </div>
        <div className="col-md-6 goalsWarpper">
          <div className="card cardBg3" style={{width: "100%", height: "240px"}}>
              <div className="card-body">
                <h5 className="card-title">Symptoms</h5>
                {data.length ? <ul>
                  {data?.map((item,index) => <li key={item?._id}>{item?.name}</li>)}
                </ul> : <div className="no-data-found">No Symptoms Found</div>}
              </div>
            </div>
        </div>
        
      </div>
    </>
  );
};

AllpatientDiagram.defaultProps = {
  data : [],
  datalifeGoal: [],
  dataGoal : []
}
  

export default AllpatientDiagram;
