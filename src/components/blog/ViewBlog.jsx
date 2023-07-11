import React from "react";
import Navbar from "../header/Navbar";
import Sidebar from "../sidebar/Sidebar";
import { MdArrowBackIos } from "react-icons/md";
import { useNavigate , useLocation } from "react-router-dom";
import ApiConfig from "../../config/ApiConfig";

const ViewBlog = () => {
  const navigate = useNavigate();
  let location = useLocation();
  let blog = location?.state.post || [];
  console.log(blog);

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
                  style={{ marginTop: "-5px", cursor: "pointer" }}
                />
                View Blog
                <span></span>
              </h6>
            </div>

            <div className="row mt-2">
              <p className="viewblog_fpara">
             

<img
              className="view_imgwpara"
              src={
                blog.image &&
                ApiConfig.ImageUrl +
                  "blog/" +
                  blog.docId +
                  "/" +
                  blog.image
              }
              alt="post"
              onError={(e) => {
                e.target.src =
                  "https://shcs.ucdavis.edu/sites/g/files/dgvnsk7846/files/inline-images/Wheel_0.png"; //replacement image imported above
              }}
            />
                <b>{blog.title}</b><br />
                <span className="mt-4" dangerouslySetInnerHTML={{__html : blog.content}}>
              
                {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Phasellus imperdiet, nulla et dictum interdum, nisi lorem
                egestas odio, vitae scelerisque enim ligula venenatis dolor.
                Maecenas nisl est, ultrices nec congue eget, auctor vitae massa.
                Fusce luctus vestibulum augue ut aliquet. Mauris ante ligula,
                facilisis sed ornare eu, lobortis in odio. Praesent convallis
                urna a lacus interdum ut hendrerit risus congue. Nunc sagittis
                dictum nisi, sed ullamcorper ipsum dignissim ac. In at libero
                sed nunc venenatis imperdiet sed ornare turpis. Donec vitae dui
                eget tellus gravida venenatis. Integer fringilla congue eros non
                fermentum. Sed dapibus pulvinar nibh tempor porta. Cras ac leo
                purus. Mauris quis diam velit. interdum ut hendrerit risus
                congue. Nunc sagittis dictum nisi, sed ullamcorper ipsum
                dignissim ac. In at libero sed nunc venenatis imperdiet sed
                ornare turpis. Donec vitae dui eget tellus gravida venenatis.
                Integer fringilla congue eros non fermentum. Sed dapibus
                pulvinar nibh tempor porta. Cras ac leo purus. Mauris quis diam

                eget tellus gravida venenatis. Integer fringilla congue eros non
                fermentum. Sed dapibus pulvinar nibh tempor porta. Cras ac leo
                purus. Mauris quis diam velit. interdum ut hendrerit risus
                congue. Nunc sagittis dictum nisi, sed ullamcorper ipsum
                dignissim ac. In at libero sed nunc venenatis imperdiet sed
                ornare turpis. Donec vitae dui eget tellus gravida venenatis.
                Integer fringilla congue eros non fermentum. Sed dapibus
                pulvinar nibh tempor porta. Cras ac leo purus. Mauris quis diam
                velit. */}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewBlog;
