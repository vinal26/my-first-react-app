import React from "react";
import { FaUserFriends } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import Avatar from "../../commonComponent/Avatar";

const MessageHeader = (props) => {
  return (
    <>
      <div className="message_header">
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-8">
            <div className="row">
              <div className="col-md-1 mchat_wid1">
                <Avatar image={''} className="message_profile8"/>
              </div>
              <div className="col-md-11 mchat_wid2">
                <p className="message_title">
                  <b className="textcover1">lisa jones </b>
                  <span>
                    <FaUserFriends />
                    &nbsp;
                    {!props.matches &&
                      (props.chatList ? (
                        <IoIosArrowUp onClick={() => props.Up()} />
                      ) : (
                        <IoIosArrowDown onClick={() => props.Down()} />
                      ))}
                  </span>
                </p>
                <p className="message_online">online</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MessageHeader;
