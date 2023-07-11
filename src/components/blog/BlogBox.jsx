import React, { useEffect, useState } from "react";
import Loader from "../../commonComponent/Loader";
import ToastBox from "../../commonComponent/ToastBox";
import {
  deleteBlogService,
  getBlogListService,
  getBlogListServiceByDate,
} from "../../services/BlogService";
import { toastMsg } from "../../Utils/AllConstant";
import { showToastSuccess } from "../../Utils/Helper";
import Post from "./post";

const BlogBox = ({ scheduleDate }) => {
  const [list, setList] = useState([]);
  const [scheduleList, setScheduleList] = useState([]);
  const [isLoading, setLoader] = useState(true);
  const [showModal, setShowModal] = useState("");

  useEffect(() => {
    getBlogList();
  }, [scheduleDate]);

  console.log(scheduleDate);

  const getBlogList = async () => {
    if (scheduleDate) {
      try {
        const response = await getBlogListServiceByDate(scheduleDate);
        const schedulePostOnly = response.filter((res) =>
          res.publishTime ? res : null
        );

        // return  res.publishTime ? moment(res.publishTime).format("YYYY-MM-DD") : null

        if (schedulePostOnly) {
          setScheduleList(schedulePostOnly);
          setLoader(false);
        }
      } catch (error) {
        setLoader(false);
        console.log(error);
      }
    } else {
      try {
        const response = await getBlogListService();
        if (response) {
          setList(response.reverse());
          setLoader(false);
        }
      } catch (error) {
        setLoader(false);
        console.log(error);
      }
    }
  };

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
      {scheduleDate ? (
        <Loader
          visible={isLoading}
          emptyTextKey={!scheduleList?.length && "emptyBlog"}
        />
      ) : (
        <Loader
          visible={isLoading}
          emptyTextKey={!list?.length && "emptyBlog"}
        />
      )}

      <div className="blogpost_hscroll">
        {/* {scheduleList ? scheduleList.map((post, index) => (
          <div className="mb-4 col-md-12">          
              <Post
                showModal={showModal}
                onChangeModal={() =>
                  setShowModal(showModal !== post._id ? post._id : null)
                }
                key={index}
                index={index}
                post={post}
                onDelete={(data) => onDelete(data)}
              />
                </div>
))
             : null} */}

        {scheduleDate
          ? scheduleList.map((post, index) => (
            <div className="mb-4 col-md-12">
              <Post
                showModal={showModal}
                onChangeModal={() =>
                  setShowModal(showModal !== post._id ? post._id : null)
                }
                key={index}
                index={index}
                post={post}
                onDelete={(data) => onDelete(data)}
              />
              </div>
            ))
          : list.map((post, index) =>
              post.publish == false && !post.publishTime ? (
                <div className="mb-4 col-md-12">
                <Post
                  showModal={showModal}
                  onChangeModal={() =>
                    setShowModal(showModal !== post._id ? post._id : null)
                  }
                  key={index}
                  index={index}
                  post={post}
                  onDelete={(data) => onDelete(data)}
                />
                </div>
              ) : null
            )}

        {/* {list ? list.map((post, index) => (
          <div className="mb-4 col-md-12">


      
            {scheduleDate ? (
              <Post
                showModal={showModal}
                onChangeModal={() =>
                  setShowModal(showModal !== post._id ? post._id : null)
                }
                key={index}
                index={index}
                post={post}
                onDelete={(data) => onDelete(data)}
              />
            ) : !scheduleDate && post.publish == false && !post.publishTime ? <Post
            showModal={showModal}
            onChangeModal={() =>
              setShowModal(showModal !== post._id ? post._id : null)
            }
            key={index}
            index={index}
            post={post}
            onDelete={(data) => onDelete(data)}
          /> : null}





          </div>
        )) : null} */}
      </div>
      {/* <ToastBox toastShow={toast.visible} content={`${toast.msg}`} /> */}
    </>
  );
};

export default BlogBox;
