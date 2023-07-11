import React from "react";
import { fontSize } from "../../Utils/AllConstant";

const EmptyText = ({text = 'please select active program'}) => {
  return (
    <div >
      <br/> 
      <h3 className="mt-5 text-center text-capitalize" style={{fontSize: fontSize.font19, color: '#8f8f8f', fontWeight: '700', letterSpacing: 0.4 }}>{text}</h3>
    </div>
  );
};

export default EmptyText;
