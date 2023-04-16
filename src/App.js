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
import AddGameFormComponent from "./components/AddGameFormComponent";
import { Clients, Games, Success, Error } from "./constant";
import { fileUploader } from "./firebaseFileUploader";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [tableData, setTableData] = useState({ userData: [], gameData: [] });
  const [menuItems, setMenuItes] = useState(menuItemsArray);
  const [selectedMenuItem, setSelectedMenuItem] = useState("Dashboard");
  const [dashSummery, setDashSummery] = useState(dashboardSummery);
  const [customerSummery, setCustomerSummery] = useState(custSummery);
  const [game_Summery, setGames_Summery] = useState(gameSummery);
  const [openModal, setOpenModal] = useState({
    open: false,
    action: "",
  });
  const [newCustomerData, setNewCustomerData] = useState(customerData);
  const [newGameData, setNewGameData] = useState(gameData);
  const [progress, setProgress] = useState(-2);
  const [error, setError] = useState("");
  const [showMenuItem, setShowMenuItem] = useState(false);
  const [action, setAction] = useState("");

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

  const onFileUpload = async (event) => {
    await fileUploader(
      event.target.files[0],
      progressCallackFn,
      fileUploadErrorHandler,
      fileDownLoadUrl
    );
  };

  const progressCallackFn = (progress) => {
    setProgress(progress);
  };

  const fileUploadErrorHandler = (error) => {
    setProgress(-1);
    setError(error);
  };

  const fileDownLoadUrl = (url) => {
    const event = {
      target: {
        name: selectedMenuItem === "Client" ? "avatar" : "thumbnail",
        value: url,
      },
    };
    onChangeInputHandler(event);
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

  const onChangeInputHandler = (event) => {
    if (selectedMenuItem === "Clients") {
      const newDataObj = { ...newCustomerData };
      switch (event.target.name) {
        case "street":
          newDataObj.address.street = event.target.value;
          break;
        case "suite":
          newDataObj.address.suite = event.target.value;
          break;
        case "city":
          newDataObj.address.city = event.target.value;
          break;
        case "zipcode":
          newDataObj.address.zipcode = event.target.value;
          break;
        default:
          newDataObj[event.target.name] = event.target.value;
          break;
      }
      setNewCustomerData(newDataObj);
    } else {
      const newDataObj = { ...newGameData };
      newDataObj[event.target.name] = event.target.value;
      setNewGameData(newDataObj);
    }
  };

  const handleSubmitForm = (action) => {
    if (action === "edit" || action === "delete") {
      rowActionandler();
    } else {
      if (selectedMenuItem === "Clients") {
        newCustomerData.id = uuidv4();
        newCustomerData.isEdited = true;
        const newData = [newCustomerData, ...tableData.userData];
        setTableData({
          ...tableData,
          userData: newData,
        });
      } else {
        newGameData.id = uuidv4();
        newGameData.isEdited = true;
        const newData = [newGameData, ...tableData.gameData];
        setTableData({
          ...tableData,
          gameData: newData,
        });
      }
    }
  };

  const handleAddItem = (item) => {
    setOpenModal({
      open: true,
      action: "add",
    });
  };

  const handleModalClose = () => {
    setOpenModal({
      open: false,
      action: "",
    });
  };

  const handleHamburgerClick = () => {
    setShowMenuItem(!showMenuItem);
  };

  const onEditItem = (action, item) => {
    if (selectedMenuItem === "Clients") {
      const editItem = {
        id: item.id,
        name: item.name,
        subscription: item.subscription,
        email: item.email,
        avatar: item.avatar,
        address: {
          street: item.address.street,
          suite: item.address.suite,
          city: item.address.city,
          zipcode: item.address.zipcode,
        },
      };

      setNewCustomerData(editItem);
    } else {
      const editItem = {
        id: item.id,
        title: item.title,
        thumbnail: item.thumbnail,
        genre: item.genre,
        release_date: item.release_date,
      };

      setNewGameData(editItem);
    }
    setOpenModal({
      open: true,
      action: action,
    });
  };

  const rowActionandler = useCallback(() => {
    if (action === "edit") {
      if (selectedMenuItem === "Clients") {
        const modifiedClientData = tableData.userData.map((client) => {
          if (client.id === newCustomerData.id) {
            newCustomerData.isEdited = true;
            return newCustomerData;
          }
          return client;
        });

        setTableData({
          ...tableData,
          userData: modifiedClientData,
        });
      } else {
        const modifiedGameData = tableData.gameData.map((game) => {
          if (game.id === newGameData.id) {
            newGameData.isEdited = true;
            return newGameData;
          }
          return game;
        });

        setTableData({
          ...tableData,
          gameData: modifiedGameData,
        });
      }
    } else {
      if (selectedMenuItem === "Clients") {
        const modifiedClientData = tableData.userData.filter(
          (client) => client.id !== newCustomerData.id
        );

        setTableData({
          ...tableData,
          userData: modifiedClientData,
        });
      } else {
        const modifiedGameData = tableData.gameData.filter(
          (game) => game.id !== newGameData.id
        );

        setTableData({
          ...tableData,
          gameData: modifiedGameData,
        });
      }
    }
  });

  const modal = useMemo(() => {
    if (openModal.open) {
      if (selectedMenuItem === "Clients") {
        return (
          <Modal
            handleModalClose={handleModalClose}
            selectedMenuItem={selectedMenuItem}
            icon={<Clients />}
            action={openModal.action}
          >
            <AddClientFormComponent
              onChangeHandler={onChangeInputHandler}
              onFileUpload={onFileUpload}
              error={error}
              progress={progress}
              newCustomerData={newCustomerData}
              handleSubmitForm={handleSubmitForm}
              action={openModal.action}
            />
          </Modal>
        );
      } else if (selectedMenuItem === "Games") {
        return (
          <Modal
            handleModalClose={handleModalClose}
            selectedMenuItem={selectedMenuItem}
            icon={<Games />}
            action={openModal.action}
          >
            <AddGameFormComponent
              onChangeHandler={onChangeInputHandler}
              onFileUpload={onFileUpload}
              error={error}
              progress={progress}
              newGameData={newGameData}
              handleSubmitForm={handleSubmitForm}
              action={openModal.action}
            />
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
          showMenuItem={showMenuItem}
          handleHamburgerClick={handleHamburgerClick}
        />
        <div className="app-container">
          <NavbarComponent handleHamburgerClick={handleHamburgerClick} />
          <MainComponent
            tableData={tableData}
            selectedMenuItem={selectedMenuItem}
            game_Summery={game_Summery}
            customerSummery={customerSummery}
            dashSummery={dashSummery}
            onEditItem={onEditItem}
          />
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
