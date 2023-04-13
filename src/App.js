import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import SliderComponent from "./components/SliderComponent";
import NavbarComponent from "./components/NavabarComponent";
import MainComponent from "./components/MainComponent";
import { fetchData } from "./service";
import { menuItemsArray } from "./constant";

function App() {
  const [tableData, setTableData] = useState({ userData: [], gameData: [] });
  const [menuItems, setMenuItes] = useState(menuItemsArray);
  const [selectedMenuItem, setSelectedMenuItem] = useState("Dashboard");

  useEffect(() => {
    fetchTableData();
  }, []);

  const fetchTableData = async () => {
    const response = await fetchData();

    const dataObject = {
      userData: response.users,
      gameData: response.games,
    };

    setTableData(dataObject);
  };

  const menuItemClickHandler = useCallback((id) => {
    const modifiedMenuItems = menuItems.map((item) => {
      item.isActive = false;
      if (item.id === id) {
        item.isActive = true;
        setSelectedMenuItem(item.displayName);
      }
      return item;
    });

    setMenuItes(modifiedMenuItems);
  });

  return (
    <div className="App">
      <SliderComponent
        menuItems={menuItems}
        onClickHandler={menuItemClickHandler}
      />
      <div className="app-container">
        <NavbarComponent />
        <MainComponent
          tableData={tableData}
          selectedMenuItem={selectedMenuItem}
        />
      </div>
    </div>
  );
}

export default App;
