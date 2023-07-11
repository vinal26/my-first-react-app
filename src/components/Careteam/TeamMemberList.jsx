import React from "react";
import { Dropdown } from "react-bootstrap";
import SquareAvatar from "../../commonComponent/SquareAvatar";
import { BsThreeDots } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import DeleteModal from "../../commonComponent/DeleteModal";

const TeamMemberList = () => {
  return (
    <>
      <div className="d-flex mt-4 mb-4">
        <div className="w-100">
          <div className="actsearch_simple shadow-sm me-2">
            <FiSearch className="boxicon" />
            <input
              placeholder="Search Care Team Member Name here..."
              className="ms-2"
              // onChange={(e) => onChangeSearchText(e)}
            />
          </div>
        </div>
      </div>
      <table class="table table-hover" style={{ marginTop: "-20px" }}>
        <thead>
          <tr>
            <td className="py-4" scope="col text-secondary">
              Team Member Name
            </td>
            <td className="py-4" scope="col text-secondary">
              Role
            </td>
            <td className="py-4" scope="col text-secondary">
              Group
            </td>
            <td className="py-4" scope="col text-secondary">
              Program
            </td>
            <td className="py-4" scope="col text-secondary">
              Status
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="text-muted">
              <SquareAvatar
                src={"images/avatar.png"}
                className="member_listimage squre_image2"
              />
              <span className="ms-3">Sofia Miller MD</span>
            </td>
            <td className="text-muted">Case manager</td>
            <td className="text-muted">Diabetes management</td>
            <td className="text-muted">EDVA</td>
            <td className="text-success cursor-pointer"  data-bs-toggle="modal"
                  data-bs-target="#deactivategroup">Active</td>
          </tr>

          <tr>
            <td className="text-muted">
              <SquareAvatar
                src={"images/avatar.png"}
                className="member_listimage squre_image2"
              />
              <span className="ms-3">Sofia Miller MD</span>
            </td>
            <td className="text-muted">Case manager</td>
            <td className="text-muted">Diabetes management</td>
            <td className="text-muted">EDVA</td>
            <td className="text-danger">Inactive</td>
          </tr>
        </tbody>
      </table>
      <DeleteModal
  title={"Delete"}
  content1={"Are you sure you want to deactivate"}
  content2={"this group?"}
  modalId={"deactivategroup"}
  button2={"No"}
  button1={"Yes"}
/>
    </>
  );
};

export default TeamMemberList;
