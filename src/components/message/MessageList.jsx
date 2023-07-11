import React from "react";
import Avatar from "../../commonComponent/Avatar";

const MessageList = () => {
  return (
    <>
      <div className="row">
        <div className="col-md-3 mlist_wid1">
          <Avatar image={''} className="side_image8 mx-auto d-block"/>
        </div>
        <div className="col-md-9 mlist_wid2">
          <p className="messide_title">
            lisa jones <span>10:02 AM</span>
          </p>
          <div className="btn-group">
            <p className="messide__text">
              Lorem ipsum dolor sit ame cons ec tetur adipisicing elit.
            </p>
            <span className="message_badge">1</span>
          </div>
          <hr className="message_hr5" />
        </div>
      </div>
    </>
  );
};

export default MessageList;
