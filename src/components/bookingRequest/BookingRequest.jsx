import React from "react";
import "../appointment/style.css";
import { Link } from "react-router-dom";
import Navbar from "../header/Navbar";
import { useNavigate } from "react-router-dom";
import { HiOutlineArrowSmLeft } from "react-icons/hi";
import Sidebar from "../sidebar/Sidebar";
import BookingRequesTable from "./BookingRequesTable";
import "./style.css";

const BookingRequest = () => {
  const navigate = useNavigate();
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
      <li class="breadcrumb-item cursor-pointer" onClick={() => navigate("/")}>Dashboard</li>
      <li class="breadcrumb-item active fw-bold" aria-current="page">Booking Request</li>
    </ol>
  </nav>
            
            <BookingRequesTable />
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingRequest;
