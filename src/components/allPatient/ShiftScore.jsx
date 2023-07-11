import React from 'react';

const ShiftScore = ({ totalScore = 0 , fromScore = 0 , compText="", style , fromDisable=false}) => {
  return (
    <>
      <div className="nutrishiftdiv shadow-sm">
        <h5>{totalScore}{!fromDisable&& <span>/{fromScore}</span>}</h5>
        <p style={{...style}}>{compText}</p>
      </div>
    </>
  )
}

export default ShiftScore;