import React from "react";
import Avatar from "../../commonComponent/Avatar";

const MessageChat = () => {
  return (
    <>
      <div className="message_chat5 mt-1">
        <div className="row">
          <span className="today_text mx-auto">today</span>
        </div>

        {/* first user */}

        <div className="row">
          <div className="col-md-9">
            <div className="row">
              <div className="col-md-2 mctxt_wid1">
                <Avatar image={''} className="chat_image6"/>
              </div>
              <div className="col-md-10 mctxt_wid2">
                <p className="chat_para54">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quam
                  sint, error nesciunt eius, pariatur doloremque quae deleniti
                  iusto repellendus ipsa numquam eos exercitationem facilis
                  architecto esse temporibus dolorem voluptates velit!
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-3"></div>
        </div>

        <div className="row">
          <div className="col-md-9">
            <div className="row">
              <div className="col-md-2 mctxt_wid1">
                <Avatar image={''} className="chat_image6"/>
              </div>
              <div className="col-md-10 mctxt_wid2">
                <p className="chat_para54">
                  doloremque quae deleniti iusto repellendus ipsa numquam eos
                  voluptates velit!
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-3"></div>
        </div>

        {/* second  user */}

        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-9">
            <div className="row">
              <div className="col-md-2"></div>
              <div className="col-md-10">
                <p className="chat_parasec float-end">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quam
                  sint, error nesciunt eius, pariatur doloremque quae deleniti
                  iusto repellendus ipsa numquam eos exercitationem facilis
                  architecto esse temporibus dolorem voluptates velit!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* third user */}

        <div className="row">
          <div className="col-md-9">
            <div className="row">
              <div className="col-md-2 mctxt_wid1">
                <Avatar image={''} className="chat_image6"/>
              </div>
              <div className="col-md-10 mctxt_wid2">
                <p className="chat_para54">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quam
                  sint, error nesciunt eius,
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-3"></div>
        </div>

        {/* fourth  user */}

        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-9">
            <div className="row">
              <div className="col-md-2"></div>
              <div className="col-md-10">
                <p className="chat_parasec float-end">Lorem ipsum dolor sit, amet</p>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-9">
            <div className="row">
              <div className="col-md-2"></div>
              <div className="col-md-10">
                <p className="chat_parasec float-end">
                  Lorem ipsum dolor sit, amet dolor sit, amet
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* end chat */}
      </div>

      <div className="btn-group chat_inputsection mt-4">
        <input
          type="text"
          placeholder="Type a message..."
        />
        <img src="images/arrow.png" alt="" />
      </div>
    </>
  );
};

export default MessageChat;
