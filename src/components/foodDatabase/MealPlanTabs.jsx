import React, { useState, useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import "react-tabs/style/react-tabs.css";
import CreatedMealPlans from "./CreatedMealPlans";
import DefaultMealPlans from "./DefaultMealPlans";
import { useAuth } from "../../Context/AuthContext";

const MealPlanTabs = ({tabIndex, setTabIndex, mealPlanList, isLoading }) => {
  const [mealListCreated, setMealListCreated] = useState([mealPlanList]);
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const [selectedTab, setSelectedTab] = useState(
    parseInt(params.get("tab") ? params.get("tab") : 0)
  );

  useEffect(() => {
    navigate({
      search: `?tab=${selectedTab}`,
    });
  }, [selectedTab]);
  
  useEffect(() => {
    setMealListCreated(mealPlanList);
  }, [mealPlanList]);
  return (
    <>
      <Tabs selectedIndex={(tabIndex , selectedTab)} onSelect={(index) => {setTabIndex(index)
         setSelectedTab(index)}}>
        <TabList>
          <Tab>All Meal Plans </Tab>
          {isAdmin ? null : <Tab>Recommended Meal Plans</Tab>}
        </TabList>
        <TabPanel>
          <CreatedMealPlans
            mealPlanList={mealListCreated}
            isLoading={isLoading}
          />
        </TabPanel>
        {isAdmin ? null : <TabPanel>
          <DefaultMealPlans mealPlanList={mealListCreated}
            isLoading={isLoading} />
        </TabPanel>}
      </Tabs>
    </>
  );
};

export default MealPlanTabs;
