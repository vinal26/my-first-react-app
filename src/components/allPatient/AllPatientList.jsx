import React, { useState } from "react";
import Navbar from "../header/Navbar";
import Sidebar from "../sidebar/Sidebar";
import { FiSearch } from "react-icons/fi";
import { AiOutlineCloseCircle, AiOutlinePlus } from "react-icons/ai";
import { HiOutlineArrowSmLeft } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { read, utils, writeFile } from "xlsx";
import PatientTabs from "./PatientTabs";
import { useAuth } from "../../Context/AuthContext";
import { AddExcelSheetService } from "../../services/PatientService";
import { showToastSuccess, isEmpty, validateEmail, showToastError } from "../../Utils/Helper";
import Button from "../../commonComponent/Button";
import { inviteMembers } from "../../services/ActivePrograms";

const AllPatientList = () => {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const [divShow, setDivShow] = useState(false);
  const [excelData, setExcelData] = useState([]);
  const [excelError, setExcelError] = useState(false);
  const [formatError, setFormatError] = useState(false);
  const [xlname, setXlname] = useState("");
  const [searchWord, setSearchWord] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [imported, setImported] = useState(false);
  const [formValues, setFormValues] = useState([{ email: "", first_name: "", last_name: "" }])

  // console.log(excelData, "excelData");

  const renderSearchHeader = () => {
    return (
      <div className="d-flex mt-5 mb-3">
        <div className="w-50">
          <h4>{isAdmin ? "All Clients" : "My Clients"}</h4>
          <p>
            View your client information and get information about your
            clients here.
          </p>
        </div>
        <div className="w-50 d-flex">
          <div
            className="actsearch_simple me-2"
          >
            <FiSearch className="boxicon" />
            <input
                placeholder="Search Client Name here..."
                className="ms-2"
                // value={searchText}
                onChange={(e) => setSearchWord(e.target.value)}
            />
          </div>

          <button
            className="btn btn-primary btn-custom dropdown-toggle position-relative"
            onBlur={() => setDivShow(false)}
            onClick={() => setDivShow(!divShow)}
          >
            <AiOutlinePlus className="me-2" /> Add New Client
            {divShow ? (
              <div className="home-image-video">
                <span 
                  onClick={() => {
                    setDivShow(false);
                    setImported(false);
                  }}
                  data-bs-toggle="modal"
                  data-bs-target="#memberModal"
                >Import List</span>
                <span
                  onClick={() => navigate("/addnewpatient")}
                >
                  Add individual
                </span>

                <span
                  onClick={() => {
                    setDivShow(false);
                    setImported(false);
                  }}
                  data-bs-toggle="modal"
                  data-bs-target="#importexcelsheet"
                >
                  Import Excel Sheet
                </span>
              </div>
            ) : null}
          </button>
        </div>


        {renderModal()}
      </div>
    );
  };

  let handleChange = (i, e) => {
    let newFormValues = [...formValues];
    newFormValues[i][e.target.name] = e.target.value;
    setFormValues(newFormValues);
  }

  let addFormFields = () => {
    setFormValues([...formValues, { email: "", first_name: "", last_name: "" }])
  }

  let removeFormFields = (i) => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues)
  }

  let handleInvites = async (event) => {
    event.preventDefault();
    var parms = {};
    parms["EmailList"] = formValues

    try {
      const response = await inviteMembers(parms);
      // setAskLoader(false)
      if (response.status === 200) {
        // updateProgram(response?.data?.data)
        showToastSuccess("Invite sent successfully")
        setImported(true)
        // console.log(response.data.data, "response data")

        setFormValues([{ email: "", first_name: "", last_name: "" }]);
      } else {
        showToastError(response?.data || response.message || "Some error occurred")
      }
    } catch (error) {
      // setAskLoader(false)
      showToastError(error?.data?.data || error.data?.message || "Some error occurred")
    }
  }

  const renderModal = () => {
    return (
      <div class="modal fade" id="memberModal" aria-labelledby="memberModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header p-4">
              {/* <h5 class="modal-title" id="exampleModalLabel">Modal title</h5> */}
              <h5 className="mb-0">Add new clients</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body pb-4 px-4">
              {/* <h4 className="text-green mb-2">{props.singleActiveProgram[0]?.programName}</h4>
              <p className="mb-5">{props.singleActiveProgram[0]?.description}</p> */}
              <form onSubmit={handleInvites}>
                <div className="mb-1">
                  <div className="row mb-2">
                    <div className="col-md-5">
                      <label className="form-label" for="email">Email Address<span className="text-danger"> *</span></label>
                    </div>
                    <div className="col-md-5">
                      <label className="form-label">Name<span> (Optional)</span></label>
                    </div>
                  </div>
                  {formValues.map((element, index) => (
                    <div className="row" key={index}>
                      <div className="col-md-5">
                        {/* <label className="form-label">Email Address</label> */}
                        <input className="form-control description_inputf mb-2" type="email" id="email" name="email" placeholder="e.g. sharonjames@gmail.com" value={element.email || ""} onChange={e => handleChange(index, e)} />
                        {(element.email !== "" && !validateEmail(element.email)) ? <label className="text-danger m-1">Email format is not valid.</label> : null}
                      </div>
                      <div className="col-md-5">
                        {/* <label className="form-label">Name</label> */}
                        <input className="form-control description_inputf mb-2" type="text" name="first_name" placeholder="e.g. Sharon James" value={element.first_name || ""} onChange={e => handleChange(index, e)} />
                      </div>

                      <div className="col-md-2 d-flex align-items-center">
                        {
                          index ?
                            <button type="button" title="Remove" className="btn btn-outline-danger px-2" onClick={() => removeFormFields(index)}><AiOutlineCloseCircle style={{ marginTop: "-4px" }} size="22px" /></button>
                            : null
                        }
                      </div>
                    </div>
                  ))}
                </div>
                <div className="btn-custom-link ms-0 mt-3 mb-5" onClick={() => addFormFields()}><AiOutlinePlus className="me-2" /> Add new</div>
                <hr className="mt-4 px-3" />
                <div className="d-flex justify-content-between">
                  <button type="button" className="btn btn-outline-secondary px-4" data-bs-dismiss="modal">Cancel</button>
                  <button disabled={(formValues.filter(dt => !validateEmail(dt.email))).length > 0} className="btn btn-primary btn-custom" type="submit" data-bs-dismiss="modal">Send Invitation</button>
                </div>
              </form>
            </div>

          </div>
        </div>
      </div>
    )
  }

  const handleImport = async ($event) => {
    const files = $event.target.files;
    setXlname(files[0].name);
    if (files.length) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = async (event) => {
        const wb = read(event.target.result);
        const sheets = wb.SheetNames;

        if (sheets.length) {
          const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);
          setExcelData(rows);
          setExcelError(false);
        }
      };
      reader.readAsArrayBuffer(file);
    }

    $event.target.value = null;
  };

  const handleExport = () => {
    const headings = [["email", "first_name", "last_name"]];
    const wb = utils.book_new();
    const ws = utils.json_to_sheet([]);
    utils.sheet_add_aoa(ws, headings);
    utils.sheet_add_json(ws, excelData, { origin: "A2", skipHeader: true });
    utils.book_append_sheet(wb, ws, "Report");
    writeFile(wb, "Movie Report.xlsx");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    let isValid = true;
    if (!excelData || isEmpty(excelData)) {
      isValid = false;
      setExcelError(true);
    }

const EmailFormat = excelData.map((dt)=>{
  return dt.email
})    

const notValidEmails = EmailFormat.filter((email) => {
  return !validateEmail(email);
});

if (notValidEmails.length) {
  isValid = false;
  setFormatError(true);
}

    if (isValid) {    
      const response = await AddExcelSheetService({ EmailList: excelData });
      if (response) {
        document.getElementById('btn-close').click()
        setLoading(false)
        setImported(true)
        setXlname("")
        showToastSuccess("Excel Sheet import successfully added.");
        setExcelData([]);
      }
    }
    setLoading(false)
  };

  const renderModelExcelSheet = () => {
    return (
      <div
        className="modal fade"
        id="importexcelsheet"
        aria-labelledby="exampleModalLabel"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        aria-hidden="true"
      >
        <form onSubmit={handleSubmit}>
          <div className="modal-dialog">
            <div className="modal-content chooselist_mdiv8">
              <div className="modal-header px-4">
                <h5 className="modal-title text-center">Upload Excel Sheet</h5>
                <button
                 onClick={() => {
                  setXlname(""); 
                 setExcelData([]);
                 setExcelError(false); 
                 setFormatError(false);}}
                  type="button"
                  className="btn-close"
                  id="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body p-4">
                <div className="row">
                  <div className="col-md-12 mt-1 position-relative">
                    {xlname ? 
                    <>
                    <p className="fw-bold xlname">{xlname}</p>
                    <p className="xlname fw-light" style={{top: 120}}>Click again to replace the sheet</p>
                    <img
                      src={"images/xlxs_blank.PNG"}
                      alt=""
                      style={{ height: "170px" }}
                      className="active_dummyimg"
                    />
                    </> : 
                    <img
                      src={"images/xlxs.PNG"}
                      alt=""
                      style={{ height: "170px" }}
                      className="active_dummyimg"
                    />
                    }

                    <input
                      type="file"
                      name="file"
                      className="form-control uploader-input-add222"
                      id="inputGroupFile"
                      onChange={handleImport}
                      accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                    />
                  </div>
                  {excelError ? (
                    <h6 className="blog_error_text4" style={{fontSize:13,fontWeight:500}}>Please upload an excel sheet</h6>
                    ) : null}

                    {!excelError && formatError? (
                    <h6 className="blog_error_text4" style={{fontSize:13,fontWeight:500}}>Please check email format</h6>
                    ) : null}
                  <p className="mt-2 mb-0 fw-normal" style={{top: 120}}>Check this <a href="/assets/Sample.xlsx">Sample.xlsx</a>, before uploading one</p>
                </div>
              </div>
              <div className="modal-footer px-3 d-flex justify-content-between">
                {/* <button onClick={() => {setXlname(""); setExcelData([]);}} type="button" data-bs-dismiss="modal" className="excel_sheetbtn">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary btn-custom">Done</button> */}
                
                <div style={{pointerEvents: isLoading ? 'none' : 'auto', backgroundColor: '#fff', color: 'black', border: '1px solid #bbb9b9' }} className="description_btnsave pointer d-flex justify-content-center align-items-center"
                 onClick={() => {
                  setXlname(""); 
                 setExcelData([]);
                 setExcelError(false); 
                 setFormatError(false);}}
                  type="button"
                   data-bs-dismiss="modal">
                    Cancel
                    </div>
                <Button
                    isLoading={isLoading} disabled={isLoading} type="submit" text={"Done"} style={isLoading ? { pointerEvents: 'none' } : {}} className="description_btnsave" />
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  };

  return (
    <>
      <Navbar />

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <Sidebar />
          </div>
          <div className="col-md-10 py-4 px-5">
            <div className="row">
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                  <li
                    class="breadcrumb-item  cursor-pointer"
                    onClick={() => navigate("/")}
                  >
                    Dashboard
                  </li>
                  <li
                    class="breadcrumb-item active fw-bold"
                    aria-current="page"
                  >
                    My Client
                  </li>
                </ol>
              </nav>
              {renderSearchHeader()}

              <div>
                <PatientTabs imported={imported} search={searchWord} />
              </div>
            </div>
          </div>
        </div>
      </div>
      {renderModelExcelSheet()}
    </>
  );
};

export default AllPatientList;
