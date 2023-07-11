import React from "react";
import { BsFillStarFill } from "react-icons/bs";
import Avatar from "../../commonComponent/Avatar";

const RatingsListComponent = () => {
  return (
    <>
      <div className="ratinglist_card1 mt-3">
        <div className="row">
          <div className="col-md-1 text-center">
            <Avatar image={''} alt="profile"/>
          </div>
          <div className="col-md-7 myrating_sideline">
            <p className="rating_parag1">Jennifer Connecy</p>
            <p className="rating_parag2">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s,
            </p>
          </div>
          <div className="col-md-4 text-center">
            <p className="myratinglist_star">
              <BsFillStarFill className="yellow" />
              <BsFillStarFill className="yellow" />
              <BsFillStarFill className="yellow" />
              <BsFillStarFill className="grey" />
              <BsFillStarFill className="grey" />
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default RatingsListComponent;
