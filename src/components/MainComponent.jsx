import React, { useEffect, useMemo } from "react";
import DashboardTitle from "../elements/DashboardTitle";
import SummeryCard from "../elements/SummeryCard";
import SummeryBorder from "../elements/SummeryBorder";
import TableComponent from "./TableComponent";
import { Summery } from "../constant";

const MainComponent = (props) => {
  const tableComponent = useMemo(() => {
    if (
      props.tableData.userData.length > 0 &&
      props.tableData.gameData.length > 0
    ) {
      return (
        <TableComponent
          tableData={props.tableData}
          selectedMenuItem={props.selectedMenuItem}
          onEditItem={props.onEditItem}
          tableFilterData={props.tableFilterData}
        />
      );
    } else {
      return <></>;
    }
  }, [props.tableData, props.selectedMenuItem, props.tableFilterData]);

  const summeryCard = useMemo(() => {
    const summeryCardArray =
      props.selectedMenuItem === "Games"
        ? props.game_Summery
        : props.selectedMenuItem === "Dashboard"
        ? props.dashSummery
        : props.customerSummery;
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
  }, [
    props.selectedMenuItem,
    props.game_Summery,
    props.dashSummery,
    props.customerSummery,
  ]);

  return (
    <div className="main-container">
      <DashboardTitle title={props.selectedMenuItem} />
      <SummeryBorder
        summery={`${props.selectedMenuItem} Summery`}
        icon={<Summery />}
      />
      {summeryCard}
      {tableComponent}
    </div>
  );
};

export default MainComponent;
