import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import AddRecipe from "./AddRecipe";
import RecipeView from "./RecipeView";

const RecipeTabs = () => {
    return (
        <>
            <Tabs>
                <TabList className="react-tabs__tab-list custom">
                    <Tab>All <span className="text-lowercase">recipes</span></Tab>
                    <Tab>Recommended <span className="text-lowercase">Recipes</span></Tab>
                </TabList>

                <TabPanel>
                    <div>
                        <RecipeView/>
                    </div>
                </TabPanel>
                {/* <TabPanel>
                    <h2><AddRecipe /></h2>
                </TabPanel> */}

            </Tabs>
        </>
    );
};

export default RecipeTabs;
