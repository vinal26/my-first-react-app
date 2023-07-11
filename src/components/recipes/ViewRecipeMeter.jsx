import React from 'react'

const ViewRecipeMeter = ({name , amount , measure}) => {
  return (
    <>
      <div className="col-md-3 viewrecipe_wid25">
            <div className="recipe_meter">
                <p className="meter1">
                    {name}
                </p>
                <p className="meter2">
                    {amount}
                </p>
                <p className="meter3">
                    {measure}
                </p>
            </div>
        </div>
        </>
  )
}

export default ViewRecipeMeter