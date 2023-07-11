import React from "react";
import { BsPlusLg } from "react-icons/bs";
import { MdArrowForwardIos } from "react-icons/md";
import CreateViewTeam from "./CreateViewTeam";
import AddProviders from "./AddProviders";

const CareTeamBox = () => {
  return (
    <>
      <div className="row">
        <div className="col-md-3">
          <div className="careteam_box13 carebox_back1 text-center pt-4 mb-4">
            <h1 className="mt-2">10</h1>
            <h5>Teams</h5>
            <div className="text-end" data-bs-toggle="modal" data-bs-target="#createviewteam">
              <BsPlusLg className="icon me-4 mt-3" />
            </div>
          </div>
        </div>
        <div className="col-md-3">
         <div className="careteam_box13 carebox_back2 text-center pt-4 mb-4">
            <h1 className="mt-2">26</h1>
            <h5>Providers</h5>
            <div className="text-end" 
            data-bs-toggle="modal" data-bs-target="#addproviders"
            >
              <BsPlusLg className="icon me-4 mt-3" />
            </div>
          </div>
        </div>
        <div className="col-md-3">
         <div className="careteam_box13 carebox_back3 text-center pt-4 mb-4">
            <h1 className="mt-2">12</h1>
            <h5>Groups</h5>
            <div className="text-end">
              <MdArrowForwardIos className="icon me-4 mt-3" />
            </div>
          </div>
        </div>
        <div className="col-md-3">
         <div className="careteam_box13 carebox_back4 text-center pt-4 mb-4">
            <h1 className="mt-2">8</h1>
            <h5>Programs</h5>
            <div className="text-end">
              <MdArrowForwardIos className="icon me-4 mt-3" />
            </div>
          </div>
        </div>
      </div>

      <CreateViewTeam />
      <AddProviders />
    </>
  );
};

export default CareTeamBox;
