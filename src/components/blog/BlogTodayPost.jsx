import React from "react";
import { format, parseISO } from "date-fns";

const BlogTodayPost = ({isToday, list }) => {
  return (
    <>
      {isToday ? <h6 className="mb-4">Today's Posts</h6> : <h6 className="mb-4">Posts</h6>}

      <div>
        {list.length > 0 ? list.map((post, index) => (
          <div className="row">
            <div className="col-md-3 col-lg-4 topost_wid25">
              <p className="btoday_postp1">
                {format(parseISO(post?.publishTime), "hh:mm a")}
              </p>
            </div>
            <div className="col-md-9 col-lg-8 topost_wid70">
              <p className="btoday_postp2"> {post.title} </p>
            </div>
          </div>
        )) : <p className="text-muted">No post scheduled or published</p>}
      </div>
    </>
  );
};

export default BlogTodayPost;
