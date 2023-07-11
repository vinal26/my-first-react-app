import React, { useEffect, useState } from "react";
import Navbar from "../header/Navbar";
import Sidebar from "../sidebar/Sidebar";
import "../appointment/style.css";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
// import BlogTabs from "./BlogTabs";
import BlogBox from "./BlogBox";
import BlogTodayPost from "./BlogTodayPost";
import { Calendar } from "react-date-range";
import { format, isToday, parseISO } from "date-fns";
import { getBlogListService } from "../../services/BlogService";
const AllBlogs = () => {
  const navigate = useNavigate();
  const [scheduleDate, setScheduleDate] = useState();
  const [list, setList] = useState([]);
  const [newDate, setNewDate] = useState(new Date())

  useEffect(() => {
    getBlogList();
  }, [newDate]);

  const getBlogList = async () => {
    try {
      const response = await getBlogListService();
      if (response) {
        setList(
          response.filter((item) => {
            if(!item.publishTime) return false;
            return (
              format(parseISO(item.publishTime), "yyyy-MM-dd") ===
              format(newDate, "yyyy-MM-dd")
            );
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
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
            <div className="row">
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item pointer" onClick={() => navigate("/")}>Dashboard</li>
                  <li
                    class="breadcrumb-item active fw-bold"
                    aria-current="page"
                  >
                  Blogs
                  </li>
                </ol>
              </nav>
              <h4 className="blognew_header d-flex align-items-center justify-content-between">
                Blogs
                <span>
                  <Link
                    to="/addblog"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Add New"
                    className="btn btn-primary btn-custom me-2"
                  >
                    Add New
                  </Link>

                  <Link
                    to="/blogsdetail"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="View All"
                    className="btn btn-primary btn-custom"
                  >
                    View All
                  </Link>
                </span>
              </h4>
            </div>

            <div class="row mt-3">
              <div className="col-md-12 col-lg-4">
                <p className="scheduledpost_back rounded px-3">Scheduled Posts</p>
                <Calendar
                  color={"#1f7e78"}
                  date={newDate}
                  onChange={(item) => {
                    // setScheduleDate(format(item, "yyyy-MM-dd"));
                    setNewDate(item)
                  }}
                />

                <BlogTodayPost isToday={isToday(newDate)} list={list} />
              </div>
              <div className="col-md-12 col-lg-8">
                <p className="post_heading mt-2">{scheduleDate ? "Schedule blogs" : "Drafts"}</p>
                <BlogBox scheduleDate={scheduleDate} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllBlogs;
