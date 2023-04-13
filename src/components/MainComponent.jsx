import React, { useEffect, useMemo } from "react";
import DashboardTitle from "../elements/DashboardTitle";
import { dashboardSummery } from "../constant";
import SummeryCard from "../elements/SummeryCard";
import SummeryBorder from "../elements/SummeryBorder";
import TableComponent from "./TableComponent";

const MainComponent = (props) => {
  const tableComponent = useMemo(() => {
    if (
      props.selectedMenuItem === "Clients" ||
      props.selectedMenuItem === "Games"
    ) {
      return (
        <TableComponent
          tableData={props.tableData}
          selectedMenuItem={props.selectedMenuItem}
        />
      );
    } else {
      return <></>;
    }
  }, [props.tableData, props.selectedMenuItem]);
  return (
    <div className="main-container">
      <DashboardTitle title={props.selectedMenuItem} />
      <SummeryBorder summery={props.selectedMenuItem} />
      <div className="sumery-section">
        {dashboardSummery.map((item) => {
          return (
            <React.Fragment key={item.id}>
              <SummeryCard {...item} />
            </React.Fragment>
          );
        })}
      </div>
      {tableComponent}
    </div>
  );
};

export default MainComponent;
