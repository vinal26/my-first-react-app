import React from 'react'
import Avatar from '../../commonComponent/Avatar'

const DoctorProfileHeader = () => {
  return (
    <>
    <div className="drprofile_header mb-5">
        <div className="row">
          <div className="col-md-1 mchat_wid1">
            <Avatar image={''} className="message_profile8"/>
          </div>
          <div className="col-md-11 mchat_wid2">
            <p className="drprofile_title">lisa jones</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default DoctorProfileHeader