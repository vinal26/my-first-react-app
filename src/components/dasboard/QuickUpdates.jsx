import React, { useState } from "react";
import { useEffect } from "react";
import { GoPrimitiveDot } from "react-icons/go";
import { getQuickUpdatesService } from "../../services/DashboardService";

const randomColor = ["#FFC702", "#FF5964", "#80B4FB", "#72E943", "#00B6CE"];

const QuickUpdates = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    // getQuickUpdates();
  }, [])

  const getQuickUpdates = async () => {
    try {
      const response = await getQuickUpdatesService();
      if (response) {
        setList(response.data)
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {list?.[1]?.pendingBookingsCount ||  list?.[0]?.endingCareplanGoals?.length || list?.[2]?.endingEliminationProgram?.length ?
        <>
          <p className="dashboard_title mt-4">quick updates</p>
          {list?.[1]?.pendingBookingsCount &&
            <div className="quick_update d-flex mb-2">
              <GoPrimitiveDot className="icon" style={{ color: randomColor[1] }} />
              <p style={{ textTransform: 'none' }}>{`You have ${list?.[1]?.pendingBookingsCount} booking request today`}</p>
            </div> || null}

          {list?.[0]?.endingCareplanGoals?.length &&
            list?.[0]?.endingCareplanGoals.map((item, index) =>
              <div className="quick_update d-flex mb-2">
                <GoPrimitiveDot className="icon" style={{ color: randomColor[index % 5] }} />
                <p style={{ textTransform: 'none' }}>{`${item.name} is about to end today.`}</p>
              </div>) || null}

          {list?.[2]?.endingEliminationProgram?.length &&
            list?.[2]?.endingEliminationProgram.map((item, index) =>
              <div className="quick_update d-flex mb-2">
                <GoPrimitiveDot className="icon" style={{ color: randomColor[index % 5] }} />
                <p style={{ textTransform: 'none' }}>{`${item.title} program is ending today.`}</p>
              </div>) || null}
        </> : null}
    </>
  );
};

export default QuickUpdates;
