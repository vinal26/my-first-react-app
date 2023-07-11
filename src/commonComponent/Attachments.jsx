import React from 'react';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { getFileName, getFileNameFromUrl, onStartSession } from '../Utils/Helper';
import './attachments.css';


const Attachments = ({ title, attachmentLists = [], addAttachment, removeAttachment, isType="url" }) => {

  const downloadFile = (url) => {
    if(isType=="url") onStartSession(url)
  }

  return (
    <div className='pdfAttached'>
      {title ? <div class="row" className="col-md-12">
        <p className="whole_label">{`${title}`}</p>
      </div> : null}
      <div>
        <div className="default_container">
          <div className="add_icon">
            <input onChange={(e) => e?.target?.files?.length && addAttachment(e.target.files[0])} className='fileUploader' type="file" id="myfile" name="myfile" accept="application/pdf" />
            <BsFillPlusCircleFill size={"3rem"} color={"#1f7e78"} />
          </div>
          {attachmentLists.map((attachment, index) => {
            return (
              <div key={index} className="attached">
                <img src="images/pdf.png" alt="" onClick={() => downloadFile(attachment)} />
                <span onClick={() => removeAttachment(index)} className="close_button"></span>
                {isType=="url" ? <p className="file-name">{`${getFileNameFromUrl(attachment)}`}</p> : <p className="file-name">{`${attachment.name}`}</p>}
              </div>)
          })}
        </div>
      </div>
    </div>
  );
};


export default Attachments;