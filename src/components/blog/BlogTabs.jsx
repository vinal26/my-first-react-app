import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import BlogBox from "./BlogBox";
import AddBlog from "./AddBlog";

const BlogTabs = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const [selectedTab, setSelectedTab] = useState(parseInt(params.get("tab") ? params.get("tab") : 0));

  useEffect(() => {
    navigate({
      search: `?tab=${selectedTab}`
    });

  }, [selectedTab])
  return (
    <>
      <Tabs selectedIndex={selectedTab} onSelect={(index) => setSelectedTab(index)}>
        <TabList>
          <Tab>View all Blogs</Tab>
          <Tab>Add Blogs</Tab>
        </TabList>

        <TabPanel>
          <div className="container">
            <div className="row">
              <BlogBox />
            </div>
          </div>
        </TabPanel>
        <TabPanel>
          <h2>
            <AddBlog onSubmitBlog={() => setSelectedTab(0)}/>
          </h2>
        </TabPanel>
      </Tabs>
    </>
  );
};

export default BlogTabs;
