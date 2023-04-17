import React, { useEffect, useMemo } from "react";
import DashboardTitle from "../elements/DashboardTitle";
import SummeryCard from "../elements/SummeryCard";
import SummeryBorder from "../elements/SummeryBorder";
import TableComponent from "./TableComponent";
import { Summery } from "../constant";
import PropTypes from "prop-types";

const MainComponent = ({
  tableData,
  selectedMenuItem,
  tableFilterData,
  onEditItem,
  game_Summery,
  dashSummery,
  customerSummery,
}) => {
  const tableComponent = useMemo(() => {
    if (tableData.userData.length > 0 && tableData.gameData.length > 0) {
      return (
        <TableComponent
          tableData={tableData}
          selectedMenuItem={selectedMenuItem}
          onEditItem={onEditItem}
          tableFilterData={tableFilterData}
        />
      );
    } else {
      return <></>;
    }
  }, [tableData, selectedMenuItem, tableFilterData]);

  const summeryCard = useMemo(() => {
    const summeryCardArray =
      selectedMenuItem === "Games"
        ? game_Summery
        : selectedMenuItem === "Dashboard"
        ? dashSummery
        : customerSummery;
    return (
      <div className="sumery-section">
        {summeryCardArray.map((item) => {
          return (
            <React.Fragment key={item.id}>
              <SummeryCard {...item} />
            </React.Fragment>
          );
        })}
      </div>
    );
  }, [selectedMenuItem, game_Summery, dashSummery, customerSummery]);

  return (
    <div className="main-container">
      <DashboardTitle title={selectedMenuItem} />
      <SummeryBorder
        summery={`${selectedMenuItem} Summery`}
        icon={<Summery />}
      />
      {summeryCard}
      {tableComponent}
    </div>
  );
};

MainComponent.prototype = {
  tableData: PropTypes.object.isRequired,
  selectedMenuItem: PropTypes.string.isRequired,
  tableFilterData: PropTypes.object,
  onEditItem: PropTypes.func,
  game_Summery: PropTypes.object,
  dashSummery: PropTypes.object,
  customerSummery: PropTypes.object,
};

export default MainComponent;
