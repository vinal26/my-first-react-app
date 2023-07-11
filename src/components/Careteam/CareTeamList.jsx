import React,{useState} from 'react';
import { FiSearch } from "react-icons/fi";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import {  useSearchParams } from "react-router-dom";
import Teams from './Teams';
import AllProviders from './AllProviders';

const CareTeamList = () => {
  const [params] = useSearchParams();
  const [selectedTab, setSelectedTab] = useState(
    parseInt(params.get("tab") ? params.get("tab") : 0)
  );
  return (
    <>
    
    <div className="d-flex mt-3 mb-3">
      
          <div className="w-100">
            <div className="actsearch_simple shadow-sm me-2">
              <FiSearch className="boxicon" />
              <input
                placeholder="Search Care Team Name here..."
                className="ms-2"
                // onChange={(e) => onChangeSearchText(e)}
              />
            </div>
          
          </div>
       
      </div>

      <Tabs
                  selectedIndex={selectedTab}
                  onSelect={(index) => setSelectedTab(index)}
                >
                  <TabList>
                    <Tab>Teams </Tab>
                    <Tab>All Providers</Tab>
                  </TabList>
                  <TabPanel>
                <Teams />
                  </TabPanel>
                  <TabPanel>
                    <AllProviders />
                  </TabPanel>
                </Tabs>
    
    
    </>
  )
}

export default CareTeamList;