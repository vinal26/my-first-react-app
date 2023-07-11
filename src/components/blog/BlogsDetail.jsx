import React, { useState, useEffect } from "react";
import Navbar from "../header/Navbar";
import Sidebar from "../sidebar/Sidebar";
import { MdArrowBackIos } from "react-icons/md";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import Loader from "../../commonComponent/Loader";
import {
  deleteBlogService,
  getBlogListService,
} from "../../services/BlogService";
import BlogTableList from "./BlogTableList";
import { toastMsg } from "../../Utils/AllConstant";
import { showToastSuccess } from "../../Utils/Helper";

const BlogsDetail = () => {
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [showModal, setShowModal] = useState("");
  const [isLoading, setLoader] = useState(true);

  useEffect(() => {
    getBlogList();
  }, []);

  const getBlogList = async () => {
    try {
      const response = await getBlogListService();
      if (response) {
        setList(response.reverse());
        setLoader(false);
      }
    } catch (error) {
      console.log(error);
      setLoader(false);
    }
  };
  // console.log(list , "post");
  const onDelete = async (post) => {
    try {
      const response = await deleteBlogService(post._id);
      if (response) {
        // showToast(toastMsg.deleteBlog)
        showToastSuccess(toastMsg.deleteBlog);
        const result = list.filter((item) => item._id !== post._id);
        setList(result);
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
              {/* <h4 className="blognew_header">
                <MdArrowBackIos
                  style={{ marginTop: "-5px", cursor: "pointer" }}
                  onClick={() => navigate(-1)}
                />
                Blogs
                <span>
                  <Link
                    to="/addblog"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Add Program"
                    className="btn btn-primary btn-custom btn_radius45"
                  >
                    Create New
                  </Link>
                </span>
              </h4> */}
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item pointer" onClick={() => navigate("/")}>Dashboard</li>
                  <li
                    class="breadcrumb-item active pointer"
                    onClick={() => navigate(-1)}
                  >
                  Blogs
                  </li>
                  <li
                    class="breadcrumb-item active fw-bold"
                    aria-current="page"
                  >
                  All Blogs
                  </li>
                </ol>
              </nav>
            </div>
           
            <div className="row mt-2">
              <div className="table_resouter">
              <table class="table table-hover blogs_listscroll5">
                <thead>
                  <tr>
                    <td
                      className="py-4 text-muted "
                      style={{ width: "25%" }}
                      scope="col text-secondary"
                    >
                      Blog Title
                    </td>
                    <td
                      className="py-4 text-muted text-center"
                      style={{ width: "12%" }}
                      scope="col text-secondary"
                    >
                      Created Date
                    </td>
                    <td
                      className="py-4 text-muted text-center"
                      style={{ width: "15%" }}
                      scope="col text-secondary"
                    >
                      Category
                    </td>
                    <td
                      className="py-4 text-muted text-center"
                      style={{ width: "10%" }}
                      scope="col text-secondary"
                    >
                      Publish
                    </td>
                    
                    <td
                      className="py-4 text-muted text-center"
                      style={{ width: "14%" }}
                      scope="col text-secondary"
                    >
                      Publish Date
                    </td>
                    <td
                      className="py-4 text-muted text-center"
                      style={{ width: "10%" }}
                      scope="col text-secondary"
                    >
                      Likes
                    </td>
                    <td
                      className="py-4 text-muted text-center"
                      style={{ width: "10%" }}
                      scope="col text-secondary"
                    >
                      Views
                    </td>
                    <td
                      className="py-4 text-muted"
                      style={{ width: "4%" }}
                      scope="col text-secondary"
                    ></td>
                  </tr>
                  <tr style={{border: "1px solid white"}}><td colSpan={8}>
                  <Loader visible={isLoading} emptyTextKey={!list?.length && 'emptyBlog'} /></td></tr>
                </thead>
            
                {list.map((post, index) => (
                  <BlogTableList
                    showModal={showModal}
                    onChangeModal={() =>
                      setShowModal(showModal !== post._id ? post._id : null)
                    }
                    key={index}
                    index={index}
                    post={post}
                    onDelete={(data) => onDelete(data)}
                    isLoading={isLoading}
                  />
                ))}
              </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogsDetail;
