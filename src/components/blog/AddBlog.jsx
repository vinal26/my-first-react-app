import React, { useState, useRef, useEffect } from "react";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { MdArrowBackIos } from "react-icons/md";
import {
  blogKeyWord,
  defaultCategory,
  toastMsg,
} from "../../Utils/AllConstant";
import { createBlogService, get_blog_tags } from "../../services/BlogService";
import {
  getUploadFileCategory,
  uploadFile,
} from "../../services/FileUploadService";
import { changeDateFormat, changeDateFormatYYYY, getFileName, isEmpty, showToastSuccess } from "../../Utils/Helper";
import { BlogEditorComponent } from "./BlogEditor";
import Select, { components } from "react-select";
import ToastBox from "../../commonComponent/ToastBox";
import Button from "../../commonComponent/Button";
import Attachments from "../../commonComponent/Attachments";
import moment from "moment";
import Navbar from "../header/Navbar";
import Sidebar from "../sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
import DateInput from "../../commonComponent/CutomDatePicker";
import TimePicker from "../../commonComponent/TimePicker";
import { addDays, format, parseISO } from "date-fns";

const defaultBlogDetail = {
  image: "",
  title: "",
  category: "",
  content: "",
  keyword: [],
  blogImages: [],
  publish: false,
  publishTime: "",
};

let filesNames = [];

const AddBlog = ({ onSubmitBlog }) => {
  const navigate = useNavigate();
  const [blogDetail, setBlogDetail] = useState(defaultBlogDetail);
  const [isLoading, setLoader] = useState(false);
  const [isLoading2, setLoader2] = useState(false);
  const [isLoading3, setLoader3] = useState(false);
  const [titleError, setTitleError] = useState(false);
  const [categoryError, setCategoryError] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [contentError, setContentError] = useState(false);
  const [keyWordError, setKeyWordError] = useState(false);
  const [list, setList] = useState([]);
  const [attachmentList, setAttachmentList] = useState([]);
  const [mainBtn, setMainBtn] = useState("");
  const [schdate, setSchdate] = useState("");
  const [schTime, setSchTime] = useState("");
  const [schTime24, setSchTime24] = useState("");
  const [showTimePicker, setTimePickerVisible] = useState(false);
  const [toast, setToast] = useState({});
  const [schTimeDate, setSchTimeDate] = useState("");
  const [adShow, setAdShow] = useState(false);

  const editorRef = useRef(null);
  useEffect(() => {
    getBlogTags();
  }, []);

  const schdateFilter = moment(schdate).format("yyyy-MM-DD");

  var momentObj = moment(schdateFilter + schTime, "YYYY-MM-DDLT");

  var dateTime = momentObj.format("YYYY-MM-DD[T]HH:mm:ss");

  const getBlogTags = async () => {
    try {
      const response = await get_blog_tags();
      if (response) {
        let data = response.map((item) => {
          return item.name;
        });
        setList(data);
      }
    } catch (error) {
      console.log(error);
    }
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

    // if (isValid && !isLoading) {
    //   setLoader(true);
    //   // createBlog();
    // }

    if (mainBtn === "draft") {
      onChangeDetail("publishTime", "");
      if (isValid && !isLoading) {
        setLoader(true);
        createBlog();
      }
    }

    if (mainBtn === "publish") {
      if (isValid && !isLoading2) {
        setLoader2(true);
        createBlog();
      }
    }

    if (mainBtn === "schedulepublish") {
      setAdShow(false)
      if (isValid && !isLoading3) {
        setLoader3(true);
        createBlog();
      }
    }
  };


  const createBlog = async () => {
    try {
      const keyword = blogDetail.keyword?.map((item) => {
        return item.value;
      });
      const fileName = getFileName(blogDetail.image);
      const result = await uploadFile(
        blogDetail.image,
        getUploadFileCategory.blog,
        fileName
      );
      const response = await createBlogService({
        ...blogDetail,
        keyword,
        image: fileName,
        blogImages: filesNames,
        attachments: attachmentList,
      });
      if (response) {
        showToastSuccess(toastMsg.addBlog);
        navigate(-1);
        onSubmitBlog();
        setBlogDetail(defaultBlogDetail);
      }
      setLoader(false);
    } catch (error) {
      setLoader(false);
      console.log(error);
    }
  };

  const onChangeDetail = (key, value) => {
    setBlogDetail({ ...blogDetail, [key]: value });
  };

  const getBlogOption = () => {
    const result = list.map((item) => {
      return {
        label: item,
        value: item,
      };
    });
    return result || [];
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
      setAttachmentList([...attachmentList, ...[result.fetchUrl]]);
      setLoader(false);
    } catch (error) {
      console.log(error);
      setLoader(false);
    }
  };

  const onRemoveAttachment = (index) => {
    const list = attachmentList;
    list.splice(index, 1);
    setAttachmentList([...list]);
  };

  const startTimeSetting = (date12, date24) => {
    setSchTime(date12);
    const myArray = date24.split(":");
    if (myArray[0] < 10) {
      date24 = "0" + date24;
    }
    setSchTime24(date24);
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
                className="description_btnsave w-100"
                disabled={schdate.length===0}
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

  return (
    <>
      <Navbar />

      <div className="container-fluid mb-5">
        <div className="row">
          <div className="col-md-2">
            <Sidebar />
          </div>
          <div className="col-md-10 py-4 px-5">
            <div className="row mt-2">
              <h6 className="blognew_header pointer" onClick={() => navigate(-1)}>
                <MdArrowBackIos
                  style={{ marginTop: "-5px" }}
                />{" "}
                Add New Blogs
                <span></span>
              </h6>
            </div>

            <div class="row mt-5">
              <form onSubmit={handleSubmit}>
                <div className="col-md-12">
                  <p className="whole_label">
                    Title<span class="text-danger"> *</span>
                  </p>
                  <input
                    type="text"
                    value={blogDetail.title}
                    className={`description_inputf`}
                    placeholder="Type"
                    style={{ marginBottom: 0 }}
                    onChange={(e) => {
                      onChangeDetail("title", e.target.value);
                      setTitleError(false);
                    }}
                  />
                  {titleError ? (
                    <h6 className="text-danger error mt-2">Please enter name</h6>
                  ) : null}
                </div>

                <div className="col-md-12 position-relative mt-3">
                  <p className="whole_label">
                    Thumbnail<span class="text-danger"> *</span>
                  </p>
                  <img
                    src={
                      (blogDetail.image &&
                        URL.createObjectURL(blogDetail.image)) ||
                      "images/upload_banner.png"
                    }
                    alt=""
                    className="active_dummyimg"
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
                    <h6 className="text-danger error mt-2">Please select image</h6>
                  ) : null}
                  {/* <div className="uploader-mask d-flex justify-content-center align-items-center">
              <BsFillPlusCircleFill className="upload-icon" />
            </div> */}
                </div>

                <div className="row">
                  <div className="col-md-6 blog-select mt-3">
                    <p className="whole_label">
                      blog Tags<span class="text-danger"> *</span>
                    </p>
                    <Select
                      closeMenuOnSelect={false}
                      isMulti
                      value={blogDetail.keyword}
                      placeholder="Choose tags"
                      options={getBlogOption()}
                      onChange={(data) => {
                        onChangeDetail("keyword", data);
                        console.log(data, "data");
                        setKeyWordError(false);
                      }}
                    />
                    {keyWordError ? (
                      <h6
                        className="text-danger error mt-2"
                        style={{ position: "relative", top: "-26px" }}
                      >
                        Please choose tags
                      </h6>
                    ) : null}
                  </div>

                  <div className="col-md-6 mt-3">
                    <p className="whole_label">
                      blog category<span class="text-danger"> *</span>
                    </p>
                    <select
                      value={blogDetail.category}
                      onChange={(e) => {
                        onChangeDetail("category", e.target.value);
                        setCategoryError(false);
                      }}
                      className={`description_inputf mb-3`}
                    >
                      <option disabled value="">
                        Please choose
                      </option>
                      {defaultCategory.map((item, index) => (
                        <option value={item} key={index}>
                          {item}
                        </option>
                      ))}
                    </select>
                    {categoryError ? (
                      <h6 className="text-danger error" style={{ marginTop: -6 }}>
                        Please select category
                      </h6>
                    ) : null}
                  </div>
                </div>

                <div
                  className="col-md-12"
                  style={{ marginTop: -15 }}
                >
                  <p className="whole_label">
                    blog<span class="text-danger"> *</span>
                  </p>
                  <div className="text-editor">
                    <BlogEditorComponent
                      onChange={(data) => {
                        onChangeDetail("content", data);
                        setContentError(false);
                      }}
                      value={blogDetail.content}
                      onAddNewFile={(fileName) => {
                        filesNames = [...filesNames, fileName];
                      }}
                    />
                    {contentError ? (
                      <h6 className="text-danger error mt-2">Please add content</h6>
                    ) : null}
                  </div>
                </div>
                {/* <div className="text-editor " style={{ marginTop: 20 }}>
                {!isLoading ? <Attachments
                  title={'Attachments'}
                  attachmentLists={attachmentList}
                  addAttachment={onAddAttachment}
                  removeAttachment={onRemoveAttachment} /> : <p>Uploading...</p>}
              </div> */}
                <div className="col-md-12 margin_top_20">
                  <div className="row">
                    <div className="col-md-4">
                      <Button
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
                        className="description_btnsave blogbtn_widfix"
                      />
                    </div>

                    <div className="col-md-4">
                      {/* {!adShow ? ( */}
                        <center>
                          <Button
                            type="button"
                            text={"Schedule publish"}
                            isLoading={isLoading3}
                            style={isLoading ? { cursor: "none" } : {}}
                            onClick={(e) => {
                              onChangeDetail("publish", false);
                              setTitleError(false);
                              setMainBtn("schedulepublish");
                            }}
                            className="description_btnsave blogbtn_widfix"
                            data-bs-toggle="modal"
                            data-bs-target="#schedule_publish"
                          />
                        </center>
                      {/* ) : (
                        <center>
                          <Button
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
                          />
                        </center>
                          )} */}
                    </div>

                    <div className="col-md-4">
                      <Button
                        isLoading={isLoading2}
                        text={"Publish"}
                        style={isLoading ? { cursor: "none" } : {}}
                        type="submit"
                        className="description_btnsave blogbtn_widfix2 float-end"
                        value="Publish"
                        onClick={(e) => {
                          onChangeDetail("publish", true);
                          setTitleError(false);
                          setMainBtn("publish");
                        }}
                      />
                    </div>
                    {renderSchedulePublish()}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddBlog;
