import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import SquareAvatar from "../../commonComponent/SquareAvatar";
import { BsThreeDots } from "react-icons/bs";
import { getServiceList } from "../../services/MyService.js";
import { showToastError, showToastSuccess } from "../../Utils/Helper";
import Loader from "../../commonComponent/Loader";
import DeleteModal from "../../commonComponent/DeleteModal";
import { deleteMyService } from "../../services/MyService";

const MyServicesList = ({
  isLoading,
  search,
  filterdata,
  onServiceSearch,
  getMyServiceList,
}) => {
  const navigate = useNavigate();
  const [deleteId, setDeleteId] = useState("");

  useEffect(() => {
    onServiceSearch(search);
  }, [search]);

  const deleteServiceFunction = async (id) => {
    try {
      const response = await deleteMyService(id);
      if (response) {
        showToastSuccess("Service deleted successfully.");
        getMyServiceList();
      } else {
        showToastError(
          response?.data || response.message || "Some error occurred"
        );
      }
    } catch (error) {
      showToastError(
        error?.data?.data || error.data?.message || "Some error occurred"
      );
    }
  };

  return (
    <>
      <hr className="mb-4 mt-1" />
      {isLoading ? (
        <center>
          <Loader
            visible={isLoading}
            style={{ top: "48px", position: "relative" }}
          />
        </center>
      ) : (
        <table class="table table-hover" style={{ marginTop: "-20px" }}>
          <thead>
            <tr>
              <td className="py-4" scope="col text-secondary">
               Service Title
              </td>

              <td className="py-4" scope="col text-secondary">
                Location
              </td>
              <td className="py-4" scope="col text-secondary">
                Service Type
              </td>
              <td className="py-4" scope="col text-secondary">
                Action
              </td>
            </tr>
          </thead>
          <tbody>
            {filterdata.length ? (
              filterdata
                .slice(0)
                .reverse()
                .map((dt, index) => (
                  <tr style={{ height: "70px" }} key={index}>
                    <td className="text-muted">{dt.serviceName}</td>
                    <td className="text-muted">{dt.serviceType.join(", ")}</td>
                    <td className="text-muted">
                      {dt.group ? "Group Session" : "Individual Session"}
                    </td>
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
                          <Dropdown.Item>
                            <Link
                              className="link_text text-dark"
                              to={`/viewmyservice`}
                              state={{ dt }}
                            >
                              View
                            </Link>
                          </Dropdown.Item>
                          {/* <Dropdown.Item>Edit</Dropdown.Item> */}
                          <Dropdown.Item
                            data-bs-toggle="modal"
                            data-bs-target="#deletservice"
                            to=""
                            onClick={() => setDeleteId(dt._id)}
                          >
                            Remove
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </td>
                  </tr>
                ))
            ) : (
              <p className="p-2">No data found!</p>
            )}
          </tbody>
        </table>
      )}
      <DeleteModal
        title={"Delete"}
        content1={"Are you sure you want to delete"}
        content2={"this Service?"}
        modalId={"deletservice"}
        button2={"No"}
        button1={"Yes"}
        onDelete={() => deleteServiceFunction(deleteId)}
      />
    </>
  );
};

export default MyServicesList;
