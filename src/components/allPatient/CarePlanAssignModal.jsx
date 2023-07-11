import React, { useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
import Select from "react-select";
import * as bootstrap from 'bootstrap';
import { formatDate, showToastError, showToastSuccess } from "../../Utils/Helper";
import { addPatientCarePlanService } from "../../services/ActivePrograms";
import { FiSearch } from "react-icons/fi";

const CarePlanAssignModal = ({ allList, existedList, userId, onComplete }) => {
  const [carePlan, setCarePlan] = useState([])
  const [newCarePlanList, setNewCarePlanList] = useState([])
  const [filterdata, setFilterData] = useState([]);

  const eliminatedList = () => {
    const list = allList.filter(it => !(existedList.filter(el => el._id===it._id)).length)
    setNewCarePlanList(list)
    setFilterData(list)
  }

  useEffect(() => {
    eliminatedList()
  }, [allList])
  

  const onChangeCheckBox = (id, checked) => {
    if (!checked) {
      let result = [...carePlan, id]
      setCarePlan([...new Set(result)])
    } else {
      const newArray = carePlan.filter(function (obj) {
        return obj !== id;
      });
      setCarePlan([...new Set(newArray)])
    }
  }

  const onSave = async (e) => {
    e.preventDefault();
    if (carePlan.length) {
      try {
        let params = {
          "careplanId": carePlan,
          "userId": userId
        }
        const response = await addPatientCarePlanService(params)
        if (response) {
          setCarePlan([]);
          onComplete()
          showToastSuccess("Care Plan Assigned Successfully");
        }
      } catch (error) {
        showToastError(error?.data?.data || error.data?.message || "An Error Occured");
      }
    } else {
      return;
    }

  }

  const checkSelectedStatus = (item) => {
    return carePlan.includes(item._id)
  }

  const onSearch = async (e) => {
      let searchWord = e.target.value;
      const result = newCarePlanList.filter((value) => {
          if (value) {
              return (
                  value?.name?.toLowerCase()?.includes(searchWord?.toLowerCase())
              );
          }
      });

      if (searchWord === "") {
          setFilterData(newCarePlanList);
          // getGroupLists(searchWord);
      } else {
          setFilterData(result);
      }
  };


  return (
    <div
      className="modal fade"
      id="careplanamassignnow"
      // tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content px-3">
        <div class="modal-header">
          <h5 class="modal-title">Assign Care Plan</h5>
          <button type="button" onClick={() => setCarePlan([])} class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
          <div className="modal-body">
            <div style={{display: "flex", "justifyContent": "end", marginBottom: "10px" }}>
                <div className="actsearch_box1">
                    <FiSearch className="boxicon" />
                    <input
                        placeholder="Search Here..."
                        className="ms-2"
                        onChange={(e) => onSearch(e)}
                    />
                </div>
            </div>
            <div className="my-4">
              <div className="lifestyle_scroll py-0" style={{maxHeight: "400px"}}>
                {filterdata.length>0 && filterdata.map((item, index) => <div key={index} className="card mb-2 py-2 px-3">
                      <div className="btn-group align-items-center gap-2">
                        <p className="affir_checkbox mb-0">
                          <input type="checkbox" onChange={() => onChangeCheckBox(item._id, checkSelectedStatus(item))} checked={checkSelectedStatus(item)} />
                        </p>
                        <div>
                          <h6 className='mb-1'>{item.name}</h6>
                          <p className="mb-1">{item.description}</p>
                        </div>
                      </div>
                      <div className="table_resouter card bg-light p-2 my-2">
                        <table class="table mb-0 table-borderless table_resinner4">
                          <tbody>
                            <tr>
                              <td><span className="fw-bold">Assign Date:</span> {formatDate(item.assignDate)}</td>
                              <td className='text-capitalize'><span className="fw-bold">Durartion:</span>  {item.duration}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                </div>)}
              </div>
            </div>
          </div>
          <div class="modal-footer">
            {/* <button type="button" class="btn btn-primary btn-custom-light" data-bs-dismiss="modal">Close</button> */}
            <button onClick={onSave} data-bs-dismiss="modal" type="submit" className="btn btn-primary btn-custom w-100 mx-0">
              Assign
            </button>
          </div>
        </div>
      </div>
    </div>
  )
};

export default CarePlanAssignModal;
