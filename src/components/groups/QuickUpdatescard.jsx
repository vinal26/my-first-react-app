import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BsHeartFill, BsHeart } from "react-icons/bs";
import { GrShareOption } from "react-icons/gr";
import { FaRegComment, FaHeart } from "react-icons/fa";
import { postLikeService } from "../../services/GroupService";
import { showToastError, showToastSuccess } from "../../Utils/Helper";
import moment from "moment";
import { useAuth } from "../../Context/AuthContext";

const QuickUpdatescard = ({ dt, getGroupPosts }) => {
  const auth = useAuth();
  const [likes, setLikes] = useState("");

  const postLike = async (postId) => {
    try {
      const response = await postLikeService(postId);
      if (response) {
        showToastSuccess(response?.data || "Post updated successfully.");
        setLikes(response);
        getGroupPosts();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="shadow-sm rounded py-2 px-3 quick_updateitem mb-3">
        <div className="row">
          <div className="col-md-2">
            <img
              src={dt.createdBy.proPicture && dt.createdBy.proPicture}
              onError={(e) => {
                e.target.src = "images/avatar.png"; //replacement image imported above
              }}
              alt=""
            />
          </div>
          <div className="col-md-10">
            <p className="fname">
              {dt.createdBy.full_name ? dt.createdBy.full_name : null}{" "}
              {/* <BsThreeDotsVertical className="icon" /> */}
            </p>
            <p className="fpara">
              Posted {moment(new Date(dt?.createdAt)).fromNow()}
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <p className="itemcontent">{dt.post}</p>
          </div>
          <div className="col-md-12">
            <p className="glike_comment">
              {dt?.likes?.filter((l) => l == auth?.authUser?._id).length ===
              1 ? (
                <BsHeartFill
                  className="icon1 me-1"
                  onClick={() => postLike(dt._id)}
                />
              ) : (
                <BsHeart
                  className="icon1 me-1"
                  onClick={() => postLike(dt._id)}
                />
              )}
              {dt?.likes ? dt?.likes.length : 0}{" "}
              {dt.likes?.length > 1 ? "likes" : "like"}
              <span className="float-end">
                <GrShareOption className="icon2 me-2" />
                <FaRegComment className="icon3  me-2" />
                {dt.comments ? dt.comments.length : 0} comments
              </span>
            </p>
          </div>
        </div>
        {/* <div className="row">
          <div className="col-md-4">
            <p className="gexpress">
              React
            </p>
          </div>
          <div className="col-md-4">
            <p className="gexpress">Reply</p>
          </div>
          <div className="col-md-4">
            <p className="gexpress">Delete</p>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default QuickUpdatescard;
