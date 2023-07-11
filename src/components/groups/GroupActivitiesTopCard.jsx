import React from 'react';

const GroupActivitiesTopCard = ({heading , paragarph , backColor }) => {
  return (
    <>
    
    
    <div className="col-md-4">
        <div className="gact_topcard" style={{background: backColor }}>
            <h4>{heading}</h4>
            <p className='mt-3'>{paragarph}</p>
        </div>
    </div>
    
    
    </>
  )
}

export default GroupActivitiesTopCard;