import React from 'react'
import Avatar from '../../commonComponent/Avatar'

const SingleProfileCard = () => {
  return (
    <>
    <div className="col-md-4 ">
                    <div className="singleprofile_card text-center">
                      <Avatar image={''} />
                      <h5 className="mt-3">T&C Groups</h5>
                      <p>
                      Clinical oncology
                      </p>
                    </div>
                  </div>
                  </>
  )
}

export default SingleProfileCard