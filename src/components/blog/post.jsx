import React, { useState } from "react";
import "./style.css";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { EditBlog } from "./EditBlog";
import { Link } from "react-router-dom";
import ApiConfig from "../../config/ApiConfig";

let data = "";

const Post = ({ post, onDelete, showModal, onChangeModal }) => {
  // const [showModal, setModal] = useState(false)
  return (
    <div className="post_container">
      <div className="row">
        <div className="col-md-6 ">
          <div className="img_cover position-relative position-relative-example">
            <div className="blognew_editicon">
              <div class="btn-group">
                <button
                  type="button"
                  class="btn dropdown-toggle post_dots"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  onClick={onChangeModal}
                >
                  <MdOutlineModeEditOutline className="icon" />
                </button>
                <ul
                  class={`dropdown-menu dropdown-menu-end blog_clickbox ${
                    showModal === post._id ? "show" : ""
                  }`}
                >
                  <li>
                    <Link
                      class="dropdown-item blog_editbtn5"
                      to={`/EditBlog`}
                      state={{ post }}
                    >
                      <FiEdit className="blog_editicon" /> Edit
                    </Link>
                  </li>
                  <li>
                    <hr class="dropdown-divider" />
                  </li>
                  <li>
                    <div
                      class="dropdown-item blog_editbtn5"
                      style={{ cursor: "pointer" }}
                      data-bs-toggle="modal"
                      data-bs-target="#staticBackdrop"
                      onClick={() => {
                        data = post;
                        onChangeModal();
                      }}
                    >
                      <FiTrash2 className="blog_editicon" /> Delete
                    </div>
                  </li>
                </ul>
              </div>
              <div
                class="modal fade"
                id="staticBackdrop"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabindex="-1"
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog blog_modal_dialog ">
                  <div class="modal-content blog_modal_content">
                    <div class="modal-header border-0 text-center">
                      <h5 class="modal-title w-100" id="staticBackdropLabel">
                        Delete
                      </h5>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div class="modal-body">
                      <p className="modal_text_body">
                        Are you sure, you want to delete
                        <br /> this Blog?
                      </p>
                    </div>
                    <div>
                      <center>
                        <button
                          type="button"
                          class="cancel_delete_blog"
                          data-bs-dismiss="modal"
                        >
                          Cancel
                        </button>
                        <button
                          data-bs-dismiss="modal"
                          onClick={() => onDelete(data)}
                          type="button"
                          class="delete_blog"
                        >
                          Delete
                        </button>
                      </center>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <img
              className="post_image rounded"
              src={
                post.image &&
                ApiConfig.ImageUrl +
                  "blog/" +
                  post.docId +
                  "/" +
                  post.image
              }
              alt="post"
              onError={(e) => {
                e.target.src =
                  "https://shcs.ucdavis.edu/sites/g/files/dgvnsk7846/files/inline-images/Wheel_0.png"; //replacement image imported above
              }}
            />
          </div>
        </div>
        <div className="col-md-6 py-2">
          <Link
            class="dropdown-item blog_editbtn5"
            to={`/viewblog`}
            state={{ post }}
          >
            {" "}
            <p className="post_heading">{post.title}</p>
          </Link>
          <p className="post_text">{post.category}</p>
        </div>
      </div>
    </div>
  );
};

export default Post;
