import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import AddNutrition from "./AddNutrition";
import NutritionView from "./NutritionView";

const NutritionTabs = () => {
  return (
    <>
      <Tabs>
        <TabList>
          <Tab>View all food database</Tab>
          <Tab>Add more to food database</Tab>
        </TabList>

        <TabPanel>
          <NutritionView />
        </TabPanel>
        <TabPanel>
          <AddNutrition />
        </TabPanel>
      </Tabs>
    </>
  );
};

export default NutritionTabs;
