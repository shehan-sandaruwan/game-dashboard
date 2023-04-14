import React, { useCallback, useEffect, useMemo, useState } from "react";
import "./App.css";
import SliderComponent from "./components/SliderComponent";
import NavbarComponent from "./components/NavabarComponent";
import MainComponent from "./components/MainComponent";
import { fetchData } from "./service";
import {
  menuItemsArray,
  dashboardSummery,
  custSummery,
  gameSummery,
  customerData,
  gameData,
} from "./constant";
import Modal from "./elements/Modal";
import AddClientFormComponent from "./components/AddClientFormComponent";

function App() {
  const [tableData, setTableData] = useState({ userData: [], gameData: [] });
  const [menuItems, setMenuItes] = useState(menuItemsArray);
  const [selectedMenuItem, setSelectedMenuItem] = useState("Dashboard");
  const [dashSummery, setDashSummery] = useState(dashboardSummery);
  const [customerSummery, setCustomerSummery] = useState(custSummery);
  const [game_Summery, setGames_Summery] = useState(gameSummery);
  const [openModal, setOpenModal] = useState(false);
  const [addNewItem, setAddNewItem] = useState("");
  const [newCustomerData, setNewCustomerData] = useState(customerData);
  const [newGameData, setNewGameData] = useState(gameData);

  useEffect(() => {
    fetchTableData();
  }, []);

  useEffect(() => {
    if (tableData.userData.length > 0 && tableData.gameData.length > 0) {
      calculateSummery(tableData);
    }
  }, [tableData]);

  const fetchTableData = async () => {
    const response = await fetchData();

    const dataObject = {
      userData: response.users,
      gameData: response.games,
    };
    setTableData(dataObject);
  };

  const calculateSummery = useCallback((dataObject) => {
    const totalGames = dataObject.gameData.length;
    const totalSubscription = dataObject.userData.reduce(
      (accumulator, currentValue) =>
        accumulator + Number(currentValue.subscription),
      0
    );
    const categories = [];
    const subscribedCustomers = [];
    let subscribeAmount = 0;
    let suscribedGame = 0;

    dataObject.gameData.forEach((item) => {
      if (!categories.includes(item.genre.toLowerCase())) {
        categories.push(item.genre.toLowerCase());
      }

      if (!subscribedCustomers.includes(item.customer_id)) {
        subscribedCustomers.push(item.customer_id);
      }

      if (item.customer_id) {
        suscribedGame++;
      }
    });
    const totalCustomers = dataObject.userData.length;

    dataObject.userData.forEach((item) => {
      if (subscribedCustomers.includes(item.id)) {
        subscribeAmount += Number(item.subscription);
      }
    });

    const newDashSummery = dashSummery.map((item) => {
      if (item.id === 1) {
        item.value = suscribedGame;
      } else if (item.id === 2) {
        item.value = subscribedCustomers.length;
      } else {
        item.value = subscribeAmount;
      }

      return item;
    });

    setDashSummery(newDashSummery);

    const newCustSummery = customerSummery.map((item) => {
      if (item.id === 1) {
        item.value = totalCustomers;
      } else {
        item.value = totalSubscription;
      }

      return item;
    });

    setCustomerSummery(newCustSummery);

    const newGameSummery = game_Summery.map((item) => {
      if (item.id === 1) {
        item.value = totalGames;
      } else {
        item.value = categories.length;
      }

      return item;
    });

    setGames_Summery(newGameSummery);
  });

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

  const handleSubmitForm = () => {};

  const handleAddItem = (item) => {
    setOpenModal(true);
    setAddNewItem(item);
  };

  const handleModalClose = () => {
    setOpenModal(false);
    setAddNewItem("");
  };

  const modal = useMemo(() => {
    if (openModal) {
      if (addNewItem === "Clients") {
        return (
          <Modal
            handleModalClose={handleModalClose}
            selectedMenuItem={selectedMenuItem}
          >
            <AddClientFormComponent />
          </Modal>
        );
      } else {
        return <></>;
      }
    }
  });

  return (
    <React.Fragment>
      {modal}
      <div className="App">
        <SliderComponent
          menuItems={menuItems}
          onClickHandler={menuItemClickHandler}
          selectedMenuItem={selectedMenuItem}
          handleAddItem={handleAddItem}
        />
        <div className="app-container">
          <NavbarComponent />
          <MainComponent
            tableData={tableData}
            selectedMenuItem={selectedMenuItem}
            game_Summery={game_Summery}
            customerSummery={customerSummery}
            dashSummery={dashSummery}
          />
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
