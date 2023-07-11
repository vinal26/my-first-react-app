import react, { useEffect, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { ImCross } from 'react-icons/im';
import ApiConfig from '../../config/ApiConfig';
import { formatDate, showToastError, showToastSuccess } from '../../Utils/Helper';
import { assignGroupToCarePlanService } from '../../services/CreateCarePlanService';

const GroupAssignModal = ({ allList, existedList, groupId, onComplete }) => {
  const [selectedProgram, setSelectedProgram] = useState([])
  const [newProgramList, setNewProgramList] = useState([])
  const [filterdata, setFilterData] = useState([]);

  const eliminatedList = () => {
    const list = allList.filter(it => it.status && !(existedList.filter(el => el._id===it._id)).length)
    setNewProgramList(list)
    setFilterData(list)
  }

  useEffect(() => {
    eliminatedList()
  }, [allList])
  

  const onChangeCheckBox = (id, checked) => {
    if (!checked) {
      let result = [...selectedProgram, id]
      setSelectedProgram([...new Set(result)])
    } else {
      const newArray = selectedProgram.filter(function (obj) {
        return obj !== id;
      });
      setSelectedProgram([...new Set(newArray)])
    }
  }

  const onSave = async (e) => {
    e.preventDefault();
    if (selectedProgram.length) {
      try {
        let params = {
            "programId": selectedProgram,
            "groupId": [groupId]
        }
        const response = await assignGroupToCarePlanService(params)
        if (response) {
          setSelectedProgram([]);
          onComplete()
          showToastSuccess(response?.message || "Program Assigned Successfully");
        }
      } catch (error) {
        showToastError(error?.data?.data || error.data?.message || "An Error Occured");
      }
    } else {
      return;
    }

  }

  const checkSelectedStatus = (item) => {
    return selectedProgram.includes(item._id)
  }

  const onSearch = async (e) => {
      let searchWord = e.target.value;
      const result = newProgramList.filter((value) => {
          if (value) {
              return (
                  value?.programName?.toLowerCase()?.includes(searchWord?.toLowerCase())
              );
          }
      });

      if (searchWord === "") {
          setFilterData(newProgramList);
          // getGroupLists(searchWord);
      } else {
          setFilterData(result);
      }
  };


  return (
    <div
      className="modal fade"
      id="activeprogramassignnow"
      // tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content px-3">
        <div class="modal-header">
          <h5 class="modal-title">Assign programs</h5>
          <button type="button" onClick={() => setSelectedProgram([])} class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
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
                        <div className="p-0 actlist_wid1 d-flex mb-0 justify-content-center align-items-center affir_checkbox" >
                            <img src={ApiConfig.ImageUrl + 'programs/' + item.createdBy + '/' + item.programImage} onError={(e) => {
                                e.target.src = "images/group.png" //replacement image imported above
                            }} alt="" className="member_listimage" />
                        </div>
                        <p className='ms-2 mb-0'>{item.programName}</p>
                      </div>
                      <div className="table_resouter card bg-light p-2 my-2">
                        <table class="table mb-0 table-borderless table_resinner4">
                          <tbody>
                            <tr>
                              <td><span className="fw-bold">Start Date:</span> {formatDate(item.startDate)}</td>
                              <td className='text-capitalize'><span className="fw-bold">Program Type:</span> {item.programType}</td>
                              <td><span className="fw-bold">Status:</span> {item.status ? <span className='text-success'>◉ Active</span> : <span className='text-danger'>◉ In Active</span>}</td>
                            </tr>
                            <tr>
                              <td><span className="fw-bold">End Date:</span>  {formatDate(item.endDate)}</td>
                              <td><span className="fw-bold">Price:</span> {item.price}</td>
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
}

export default GroupAssignModal;