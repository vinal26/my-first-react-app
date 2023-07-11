import React, { useEffect, useState } from "react";
import { BsFillPlusCircleFill } from "react-icons/bs";
import Navbar from "../header/Navbar";
import Sidebar from "../sidebar/Sidebar";
import { HiOutlineArrowSmLeft } from "react-icons/hi";
import { MdArrowBackIos } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import "./style.css";
import {
  blogKeyWord,
  defaultCategory,
  toastMsg,
} from "../../Utils/AllConstant";
import { updateBlogService } from "../../services/BlogService";
import { changeDateFormat, changeDateFormatYYYY, getFileName, isEmpty, showToastSuccess } from "../../Utils/Helper";
import {
  getUploadFileCategory,
  uploadFile,
} from "../../services/FileUploadService";
import { BlogEditorComponent } from "./BlogEditor";
import Select, { components } from "react-select";
import ToastBox from "../../commonComponent/ToastBox";
import Button from "../../commonComponent/Button";
import Attachments from "../../commonComponent/Attachments";
import ApiConfig from "../../config/ApiConfig";
import DateInput from "../../commonComponent/CutomDatePicker";
import TimePicker from "../../commonComponent/TimePicker";
import moment from "moment";
import { addDays, parseISO } from "date-fns";

let filesNames = [];

const EditBlog = () => {
  const navigate = useNavigate();
  let location = useLocation();
  let blog = location?.state.post || [];
  blog.category =
    blog?.category?.charAt(0)?.toUpperCase() + blog?.category?.slice(1);

  const keyword =
    blog?.keyword?.map((item) => {
      return {
        label: item,
        value: item,
      };
    }) || [];
  const [blogDetail, setBlogDetail] = useState({ ...blog, keyword });

  const [isLoading, setLoader] = useState(false);
  const [isLoading2, setLoader2] = useState(false);
  const [isLoading3, setLoader3] = useState(false);
  const [titleError, setTitleError] = useState(false);
  const [categoryError, setCategoryError] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [keyWordError, setKeyWordError] = useState(false);
  const [mainBtn, setMainBtn] = useState("");
  const [schdate, setSchdate] = useState(blog.publishTime ? parseISO(blog.publishTime) : new Date());
  const [schTime, setSchTime] = useState("");
  const [schTime24, setSchTime24] = useState("");
  const [showTimePicker, setTimePickerVisible] = useState(false);
  const [contentError, setContentError] = useState(false);
  const [toast, setToast] = useState({});
  const [adShow, setAdShow] = useState(false);

  const schdateFilter = moment(schdate).format("yyyy-MM-DD");

  var momentObj = moment(schdateFilter + schTime, "YYYY-MM-DDLT");
  var dateTime = momentObj.format("YYYY-MM-DD[T]HH:mm:ss");

  const startTimeSetting = (date12, date24) => {
    setSchTime(date12);
    const myArray = date24.split(":");
    if (myArray[0] < 10) {
      date24 = "0" + date24;
    }
    setSchTime24(date24);
  };
  const handleSubmit = (e) => {
    if(e) e.preventDefault();
    let isValid = true;

    if (!blogDetail.title || isEmpty(blogDetail.title)) {
      isValid = false;
      setTitleError(true);
    }

    if (!blogDetail.image) {
      isValid = false;
      setImageError(true);
    }

    if (!blogDetail.category || isEmpty(blogDetail.category)) {
      isValid = false;
      setCategoryError(true);
    }

    if (!blogDetail.keyword || !blogDetail.keyword?.length) {
      isValid = false;
      setKeyWordError(true);
    }

    if (
      !blogDetail.content ||
      isEmpty(blogDetail.content) ||
      blogDetail.content === "<p><br></p>"
    ) {
      isValid = false;
      setContentError(true);
    }
    if (mainBtn === "draft") {
      onChangeDetail("publishTime", "");
      if (isValid && !isLoading) {
        setLoader(true);
        updateBlog();
      }
    }

    if (mainBtn === "publish") {
      if (isValid && !isLoading2) {
        setLoader2(true);
        updateBlog();
      }
    }

    if (mainBtn === "schedulepublish") {
      setAdShow(false)
      if (isValid && !isLoading3) {
        setLoader3(true);
        updateBlog();
      }
    }
    // if (isValid) {
    //   setLoader(true);
    //   updateBlog();
    // }
  };

  useEffect(() => {
    if(adShow) handleSubmit();
    
  }, [adShow])
  

  const renderSchedulePublish = () => {
    return (
      <div
        className="modal fade"
        id="schedule_publish"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content chooselist_mdiv8">
            <div className="modal-header px-4">
              <h5 className="modal-title text-center">
                Schedule publish date & time
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body p-4">
              <div className="row">
                <div className="col-md-12">
                  <DateInput
                    value={schdate}
                    minDate={addDays(new Date(), 1)}
                    onChangeDate={(date) => {
                      setSchdate(date);
                      //  setError({ ...error, start_date: false })
                    }}
                    inputClassName={
                      "description_inputf d-flex align-items-center mb-0"
                    }
                  />
                  {/* <div className="schdule_datetime">
                    <TimePicker
                      value={schTime ? schTime : null}
                      visibility={showTimePicker}
                      onChangeDate={startTimeSetting}
                      onDone={() => setTimePickerVisible(false)}
                    >
                      <span
                        onClick={() => setTimePickerVisible(!showTimePicker)}
                      >
                        <input
                          required
                          placeholder="--:--"
                          disabled
                          className="description_inputf"
                          value={schTime}
                        />
                        <img src="images/clock.png" className="clock_icon" />
                      </span>
                    </TimePicker>
                  </div> */}
                </div>
              </div>
            </div>
            <div className="modal-footer px-3">
              <button
                type="button"
                data-bs-dismiss="modal"
                disabled={schdate.length===0}
                className="description_btnsave w-100"
                onClick={() => {
                  onChangeDetail("publishTime", parseISO(dateTime));
                  setAdShow(true);
                  setLoader(false);
                  setLoader2(false);
                  setLoader3(false);
                }}
              >
                {"Save"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  const updateBlog = async () => {
    try {
      const keyword = blogDetail.keyword?.map((item) => {
        return item.value;
      });
      if (blog.image !== blogDetail.image) {
        const fileName = getFileName(blogDetail.image);
        const result = await uploadFile(
          blogDetail.image,
          getUploadFileCategory.blog,
          fileName
        );
        const response = await updateBlogService(blogDetail._id, {
          ...blogDetail,
          keyword,
          image: fileName,
          blogImages: [...blogDetail.blogImages, ...filesNames],
        });
        setLoader(false);
        if (response) {
          showToastSuccess(toastMsg.updateBlog);
          navigate(-1);
        }
      } else {
        const fileName = blogDetail.image.split("/");
        const imageName = fileName[fileName.length - 1];
        const response = await updateBlogService(blogDetail._id, {
          ...blogDetail,
          keyword,
          image: imageName,
          blogImages: [...blogDetail.blogImages, ...filesNames],
        });
        setLoader(false);
        if (response) {
          showToastSuccess(toastMsg.updateBlog);
          navigate(-1);
        }
      }
    } catch (error) {
      setLoader(false);
      console.log(error);
    }
  };

  const getBlogOption = () => {
    const result = blogKeyWord.map((item) => {
      return {
        label: item,
        value: item,
      };
    });
    return result || [];
  };

  const onChangeDetail = (key, value) => {
    setBlogDetail({ ...blogDetail, [key]: value });
  };

  const onAddAttachment = async (file) => {
    setLoader(true);
    try {
      const fileName = getFileName(file);
      const result = await uploadFile(
        file,
        getUploadFileCategory.blogAttachment,
        fileName,
        true
      );
      onChangeDetail("attachments", [
        ...blogDetail.attachments,
        ...[result.fetchUrl],
      ]);
      setLoader(false);
    } catch (error) {
      console.log(error);
      setLoader(false);
    }
  };

  const onRemoveAttachment = (index) => {
    const list = blogDetail.attachments;
    list.splice(index, 1);
    onChangeDetail("attachments", [...list]);
  };

  console.log(blogDetail.image);
  console.log(blog.image);

  return (
    <>
      <Navbar />
      <form onSubmit={handleSubmit}>
        <div className="container-fluid mb-5">
          <div className="row">
            <div className="col-md-2">
              <Sidebar />
            </div>
            <div className="col-md-10 py-4 px-5">
              <div className="row mt-2">
                <h6 className="blognew_header pointer" onClick={() => navigate(-1)}>
                  <MdArrowBackIos
                    style={{ marginTop: "-5px", cursor: "pointer" }}
                  />{" "}
                  Edit Blogs
                  <span></span>
                </h6>
              </div>

              <div className="row mt-5">
                  <div className="col-md-6 position-relative">
                    <img
                      src={
                        blog.image !== blogDetail.image
                          ? ApiConfig.ImageUrl +
                          "blog/" +
                          blogDetail.docId +
                          "/" +
                          blogDetail.image
                          : ApiConfig.ImageUrl +
                          "blog/" +
                          blog.docId +
                          "/" +
                          blog.image
                      }
                      alt=""
                      className="active_dummyimage blognew_editwid"
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        onChangeDetail("image", e.target.files[0]);
                        setImageError(false);
                      }}
                      className="form-control uploader-input-add222"
                    />
                    {imageError ? (
                      <h6 className="blog_error_text4">Please select image</h6>
                    ) : null}
                    {/* <div className="uploader-mask d-flex justify-content-center align-items-center">
                        <BsFillPlusCircleFill className="upload-icon" />
                      </div> */}
                  </div>
                  <div className="col-md-6 blog-select">
                    <p className="whole_label">blog tags</p>
                    <Select
                      closeMenuOnSelect={false}
                      isMulti
                      value={blogDetail.keyword || []}
                      placeholder="Choose tags"
                      options={getBlogOption()}
                      onChange={(data) => {
                        onChangeDetail("keyword", data);
                        setKeyWordError(false);
                      }}
                    />
                    {keyWordError ? (
                      <h6 className="text-danger error" style={{marginTop:-28}}>
                        Please choose tags
                      </h6>
                    ) : null}
                  </div>
                  <div className="col-md-6" style={{ marginTop: 15 }}>
                    <p className="whole_label">blog name</p>
                    <input
                      type="text"
                      placeholder=""
                      value={blogDetail.title}
                      style={{ marginBottom: 0 }}
                      className={`description_inputf`}
                      onChange={(e) => {
                        onChangeDetail("title", e.target.value);
                        setTitleError(false);
                      }}
                    />
                    {titleError ? (
                      <h6 className="text-danger error mt-2">Please enter name</h6>
                    ) : null}
                  </div>

                  <div className="col-md-6" style={{ marginTop: 15 }}>
                    <p className="whole_label">blog category</p>
                    <select
                      aria-label=".form-select-lg example form-select"
                      value={blogDetail.category}
                      onChange={(e) => {
                        onChangeDetail("category", e.target.value);
                        setCategoryError(false);
                      }}
                      className={`description_inputf mb-3 ${categoryError ? "border_color_red" : null
                        }`}
                    >
                      <option disabled value="">
                        Please choose
                      </option>
                      {defaultCategory.map((item) => (
                        <option value={item}>{item}</option>
                      ))}
                    </select>
                  </div>

                <div className="col-md-12 ">
                  <p className="whole_label">blog</p>
                  <BlogEditorComponent
                    onAddNewFile={(fileName) => {
                      filesNames = [...filesNames, fileName];
                    }}
                    onChange={(content) => {
                      onChangeDetail("content", content);
                      setContentError(false);
                    }}
                    value={blogDetail.content}
                  />
                  {contentError ? (
                    <h6 className="text-danger error mt-2">Please add content</h6>
                  ) : null}
                </div>
                {/* <div className="text-editor " style={{ marginTop: 20 }}>
                        {!isLoading ? <Attachments
                          title={'Attachments'}
                          attachmentLists={blogDetail.attachments}
                          addAttachment={onAddAttachment}
                          removeAttachment={onRemoveAttachment} /> : <p>Uploading...</p>}
                        </div> */}
                <div className="col-md-12  margin_top_20">
                  {/* <Button
                    isLoading={isLoading}
                    type="submit"
                    id="jhsv"
                    text={"Update Now"}
                    style={isLoading ? { cursor: "none" } : {}}
                    className="description_btnsave btn_radius45 blogbtn_widfix"
                  /> */}
                  <div className="row">
                    <div className="col-md-4">
                      {!blogDetail.publish && <Button
                        value="draft"
                        onClick={(e) => {
                          onChangeDetail("publish", false);
                          onChangeDetail("publishTime", "");
                          setTitleError(false);
                          setMainBtn("draft");
                        }}
                        isLoading={isLoading}
                        type="submit"
                        id="jhsv"
                        text={"save as draft"}
                        style={isLoading ? { cursor: "none" } : {}}
                        className="description_btnsave blogbtn_widfix w-100"
                      />}
                    </div>

                    <div className="col-md-4 px-0">
                      {/* {!adShow ? ( */}
                        <center>
                          {!blogDetail.publish && <Button
                            type="button"
                            text={"Schedule publish"}
                            isLoading={isLoading3}
                            style={isLoading ? { cursor: "none" } : {}}
                            onClick={(e) => {
                              onChangeDetail("publish", false);
                              setTitleError(false);
                              setMainBtn("schedulepublish");
                            }}
                            className="description_btnsave blogbtn_widfix w-100"
                            data-bs-toggle="modal"
                            data-bs-target="#schedule_publish"
                          />}
                        </center>
                      {/* ) : (
                        <center>
                          {!blogDetail.publish && <Button
                            text={"Schedule publish"}
                            type="submit"
                            isLoading={isLoading3}
                            style={isLoading ? { cursor: "none" } : {}}
                            className="description_btnsave blogbtn_widfix"
                            value="schedulepublish"
                            onClick={(e) => {
                              onChangeDetail("publish", false);
                              setTitleError(false);
                              setMainBtn("schedulepublish");
                            }}
                          />}
                        </center>
                      )} */}
                    </div>

                    <div className="col-md-4">
                      <Button
                        isLoading={isLoading2}
                        text={"Publish"}
                        style={isLoading ? { cursor: "none" } : {}}
                        type="submit"
                        className="description_btnsave blogbtn_widfix2 float-end w-100"
                        value="Publish"
                        onClick={(e) => {
                          setBlogDetail({ ...blogDetail, publish: true, publishTime: parseISO(new Date()) });
                          setTitleError(false);
                          setMainBtn("publish");
                        }}
                      />
                    </div>
                    {renderSchedulePublish()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default EditBlog;
