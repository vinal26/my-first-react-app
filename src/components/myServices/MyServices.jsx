import React, { useState, useEffect } from "react";
import Navbar from "../header/Navbar";
import Sidebar from "../sidebar/Sidebar";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { AiOutlinePlusCircle } from "react-icons/ai";
import MyServicesList from "./MyServicesList";
import AddServices from "./AddServices";
import { getServiceList } from "../../services/MyService";


const MyServices = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("")
  const [serviceList, setServiceList] = useState([]);
  const [filterdata, setFilterData] = useState([]);
  const [isLoading, setLoader] = useState(true);

  const getMyServiceList = async () => {
    setLoader(true)
    setServiceList([])
    try {
      const response = await getServiceList();
      setLoader(false)
      if (response.status === 200) {
        setServiceList(response?.data?.data);
        setFilterData(response?.data?.data);
      }
    } catch (error) {
      setLoader(false)
    }
  };

  useEffect(() => {
    getMyServiceList()
  }, [])

  const onServiceSearch = async (searchWord) => {
    const result = serviceList?.filter((value) => {
      if (value) {
        return (
          value?.serviceName?.toLowerCase()?.includes(searchWord?.toLowerCase())
        );
      }
    });

    if (searchWord === "") {
      setFilterData(serviceList);
    } else {
      setFilterData(result);
    }
  };

  const renderSearchHeader = () => {
    return (
      <div className="d-flex mt-5 mb-3">
        <div className="w-50">
          <h4>My Services</h4>
          <p>Add services that you will be providing to your clients!</p>
        </div>
        <div className="w-50 d-flex">
          <div className="actsearch_simple me-2">
            <FiSearch className="boxicon" />
            <input
              placeholder="Search Services Name here..."
              className="ms-2"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button
               data-bs-toggle="modal" data-bs-target="#addservices"
            className="btn btn-primary btn-custom"          >
            <AiOutlinePlusCircle className="me-2" /> Add Service
          </button>

        </div>
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <div className="container-fluid mb-5">
        <div className="row">
          <div className="col-md-2">
            <Sidebar />
          </div>
          <div className="col-md-10 py-4 px-5">
                    <nav aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item cursor-pointer" onClick={() => navigate(-1)}>Dashboard</li>
                <li class="breadcrumb-item active fw-bold" aria-current="page">My Services</li>
              </ol>
            </nav>
            <div>
            {renderSearchHeader()}
             <MyServicesList isLoading={isLoading} search={search} getMyServiceList={getMyServiceList} filterdata={filterdata} onServiceSearch={onServiceSearch} />
            <AddServices />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyServices;

