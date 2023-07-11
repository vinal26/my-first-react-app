import React from "react";
import Avatar from "../../commonComponent/Avatar";

const MemberProfileCard = () => {
  return (
    <>
      <div className="col-md-4">
        <div className="members_card text-center">
          <Avatar image={''} />
          <p>Laxy Smirth</p>
        </div>
      </div>
    </>
  );
};

export default MemberProfileCard;
