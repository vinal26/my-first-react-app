import React from "react";
import { Dropdown } from "react-bootstrap";
import SquareAvatar from "../../commonComponent/SquareAvatar";
import { BsThreeDots } from "react-icons/bs";

const AllProviders = () => {
  return (
    <>
      <table class="table table-hover" style={{ marginTop: "-20px" }}>
        <thead>
          <tr>
            <td className="py-4" scope="col text-secondary">
              Name
            </td>
            <td className="py-4" scope="col text-secondary">
              Manager
            </td>
            <td className="py-4" scope="col text-secondary">
              Groups
            </td>
            <td className="py-4" scope="col text-secondary">
              Members
            </td>
            <td className="py-4" scope="col text-secondary">
              Status
            </td>
            <td className="py-4" scope="col text-secondary"></td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="text-muted">CCM Team</td>
            <td className="text-muted">Sofia Miller MD</td>
            <td className="text-muted">2</td>
            <td className="text-muted">200</td>
            <td className="text-success">Active</td>
            <td
              className="text-muted fw-bold text-left overflow-visible"
              style={{ cursor: "pointer" }}
            >
              <Dropdown>
                <Dropdown.Toggle
                  variant="light"
                  className="custom"
                  id="dropdown-basic"
                >
                  <BsThreeDots className="icon" />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item>View team</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </td>
          </tr>
          <tr>
            <td className="text-muted">CCM Team</td>
            <td className="text-muted">Sofia Miller MD</td>
            <td className="text-muted">2</td>
            <td className="text-muted">200</td>
            <td className="text-danger">Inactive</td>
            <td
              className="text-muted fw-bold text-left overflow-visible"
              style={{ cursor: "pointer" }}
            >
              <Dropdown>
                <Dropdown.Toggle
                  variant="light"
                  className="custom"
                  id="dropdown-basic"
                >
                  <BsThreeDots className="icon" />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item>View team</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default AllProviders;
