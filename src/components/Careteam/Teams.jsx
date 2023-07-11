import React from "react";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import SquareAvatar from "../../commonComponent/SquareAvatar";
import { BsThreeDots } from "react-icons/bs";

const Teams = () => {
  const navigate = useNavigate();
  return (
    <>
      <table class="table table-hover" style={{ marginTop: "-20px" }}>
        <thead>
          <tr>
            <td className="py-4" scope="col text-secondary">
              Name
            </td>
            <td className="py-4" scope="col text-secondary">
              Role
            </td>
            <td className="py-4" scope="col text-secondary">
              Category
            </td>
            <td className="py-4" scope="col text-secondary">
              Capacity
            </td>
            <td className="py-4" scope="col text-secondary">
              Status
            </td>
            <td className="py-4" scope="col text-secondary"></td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="text-muted">
              <SquareAvatar
                src={"images/avatar.png"}
                className="member_listimage squre_image2"
              />
              <span className="ms-3">Dr. Giver Site</span>
            </td>
            <td className="text-muted">Health Coach</td>
            <td className="text-muted">Nurse</td>
            <td className="text-muted">25/55</td>
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
                  <Dropdown.Item onClick={() => navigate("/viewcareteam")}>
                    View
                  </Dropdown.Item>
                  <Dropdown.Item>Edit</Dropdown.Item>
                  <Dropdown.Item>Remove</Dropdown.Item>
                  <Dropdown.Item>Assign to patient</Dropdown.Item>
                  <Dropdown.Item>Assign to group</Dropdown.Item>
                  <Dropdown.Item>Assign to program</Dropdown.Item>
                  <Dropdown.Item>Assign to team</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </td>
          </tr>
          <tr>
            <td className="text-muted">
              <SquareAvatar
                src={"images/avatar.png"}
                className="member_listimage squre_image2"
              />
              <span className="ms-3">Dr. Giver Site</span>
            </td>
            <td className="text-muted">Health Coach</td>
            <td className="text-muted">Nurse</td>
            <td className="text-muted">25/55</td>
            <td className="text-danger">Inative</td>
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
                  <Dropdown.Item onClick={() => navigate("/viewcareteam")}>
                    View
                  </Dropdown.Item>
                  <Dropdown.Item>Edit</Dropdown.Item>
                  <Dropdown.Item>Remove</Dropdown.Item>
                  <Dropdown.Item>Assign to patient</Dropdown.Item>
                  <Dropdown.Item>Assign to group</Dropdown.Item>
                  <Dropdown.Item>Assign to program</Dropdown.Item>
                  <Dropdown.Item>Assign to team</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default Teams;
