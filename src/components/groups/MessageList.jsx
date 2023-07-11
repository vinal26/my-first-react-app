import React from "react";
import Avatar from "../../commonComponent/Avatar";

const MessageList = ({item, onClick, selectedGroup}) => {
  return (
    <>
      <div className={`row messageSingle ${item._id == selectedGroup?._id? "active":""}`} onClick={()=>onClick(item)}>
        <div className="col-md-3 mlist_wid1">
          <Avatar image={item?.image} defaultImg={"images/dash6.png"} className="side_image8 mx-auto d-block"/>
        </div>
        <div className="col-md-9 mlist_wid2">
          <p className={`messide_title ${item._id == selectedGroup?._id? "active":""}`}>
            {item?.title}
          </p>
          <div className="btn-group">
            <p className={`messide__text ${item._id == selectedGroup._id? "active":""}`}>
              {item?.description}
            </p>
            {/* <span className="message_badge">1</span> */}
          </div>
          <hr className="message_hr5" />
        </div>
      </div>
    </>
  );
};

export default MessageList;
