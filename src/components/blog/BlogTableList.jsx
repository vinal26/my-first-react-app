import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import { format, parseISO } from "date-fns";
import ApiConfig from "../../config/ApiConfig";
let data = "";
const BlogTableList = ({ post, onDelete, showModal, onChangeModal }) => {
  if(!post.publishTime) return

  return (
    <>
      <tbody>
        <tr>
          <td className="text-muted">
            <div className="d-flex align-items-center">
                <img
                  src={
                    post.image &&
                    ApiConfig.ImageUrl +
                      "blog/" +
                      post.docId +
                      "/" +
                      post.image
                  }
                  className="blogdet_imgs"
                  alt="post"
                  onError={(e) => {
                    e.target.src =
                      "https://shcs.ucdavis.edu/sites/g/files/dgvnsk7846/files/inline-images/Wheel_0.png"; //replacement image imported above
                  }}
                />
                <p className="ms-2 mb-0">{post.title}</p>
            </div>
          </td>
          <td className="text-dark text-center">
            {format(parseISO(post?.createdAt), "MM-dd-yyyy")}
          </td>
          <td className="text-dark text-center">{post.category}</td>
          <td className="text-dark text-center">
            {post.publish == true ? "Yes" : "No"}
          </td>
          <td className="text-dark text-center">{post.publishTime ? format(parseISO(post?.publishTime), "MM-dd-yyyy") : "-"}</td>
          <td className="text-dark text-center">{post.likes.length}</td>
          <td className="text-dark text-center">{post.views.length}</td>
          <td className="text-dark text-center">
            <button class="btn post_dots" onClick={onChangeModal}>
              <BsThreeDotsVertical className="icon" />
            </button>
            <ul
              style={{ position: "absolute !important", right: "2%" }}
              class={`dropdown-menu dropdown-menu-end blog_clickbox ${
                showModal === post._id ? "show" : ""
              }`}
            >
              <li>
                <Link
                  class="dropdown-item blog_editbtn5"
                  to={`/viewblog`}
                  state={{ post }}
                >
                  <MdOutlineRemoveRedEye className="blog_editicon" /> View
                </Link>
              </li>
              <li>
                <hr class="dropdown-divider" />
              </li>
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
          </td>
        </tr>
      </tbody>
    </>
  );
};

export default BlogTableList;
