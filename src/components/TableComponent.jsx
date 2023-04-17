import React, { useCallback, useEffect, useState } from "react";
import {
  useTable,
  usePagination,
  useSortBy,
  useAsyncDebounce,
} from "react-table";
import {
  gameColumns,
  customerColumns,
  dashboardColumns,
  ArrowDown,
  ArrowRight,
} from "../constant";
import ActionComponent from "./ActionComponent";
import Avatar from "../elements/Avatar";
import FilterComponent from "./FilterComponent";

const TableComponent = (props) => {
  const [showFilterOption, setShowFilterOption] = useState(false);
  const [value, setValue] = useState({
    name: [],
    min: "",
    max: "",
    date: "",
    category: "",
    address: "",
  });

  const [localTableData, setLocalTableData] = useState({
    userData: [],
    gameData: [],
  });

  useEffect(() => {
    setLocalTableData({
      userData: props.tableData.userData,
      gameData: props.tableData.gameData,
    });
  }, [props.tableData]);

  const columns = React.useMemo(() => {
    if (props.selectedMenuItem === "Clients") {
      return [...customerColumns];
    } else if (props.selectedMenuItem === "Games") {
      return [...gameColumns];
    } else {
      return [...dashboardColumns];
    }
  }, [props.selectedMenuItem]);

  const data = React.useMemo(() => {
    if (props.selectedMenuItem === "Clients") {
      const clientRows = localTableData.userData?.map((item) => {
        return {
          "cust-col1": (
            <div className="game-name">
              <Avatar avatar={item.avatar} />
              {item.name} <span></span>
            </div>
          ),
          "cust-col2": item.email,
          "cust-col3": `${item.address?.street || ""}, ${
            item.address?.suite || ""
          }, ${item.address?.city || ""}, ${item.address?.zipcode || ""}`,
          "cust-col4": item.subscription,
          "cust-col5": (
            <ActionComponent onEditItem={props.onEditItem} rowItem={item} />
          ),
        };
      });

      return clientRows;
    } else if (props.selectedMenuItem === "Games") {
      const gamesRow = localTableData.gameData?.map((item) => {
        return {
          "game-col1": (
            <div className="game-name">
              <Avatar avatar={item.thumbnail} />
              {item.title} <span></span>
            </div>
          ),
          "game-col2": item.genre,
          "game-col3": item.release_date,
          "game-col4": (
            <ActionComponent onEditItem={props.onEditItem} rowItem={item} />
          ),
        };
      });
      return gamesRow;
    } else if (props.selectedMenuItem === "Dashboard") {
      const gamesWithCustomer = localTableData.gameData?.filter(
        (item) => item.customer_id
      );
      const dashBoardData = [];

      for (let i = 0; i < gamesWithCustomer.length; i++) {
        const custObj = localTableData.userData?.find(
          (item) => item.id === gamesWithCustomer[i].customer_id
        );
        if (custObj) {
          const dashboardObj = {
            "dash-col1": (
              <div className="game-name">
                <Avatar avatar={gamesWithCustomer[i].thumbnail} />
                {gamesWithCustomer[i].title} <span></span>
              </div>
            ),
            "dash-col2": (
              <div className="game-name">
                <Avatar avatar={custObj.avatar} />
                <span> {custObj.name}</span>
              </div>
            ),
            "dash-col3": custObj.subscription,
            "dash-col4": gamesWithCustomer[i].genre,
          };

          dashBoardData.push(dashboardObj);
        }
      }

      return dashBoardData;
    } else {
    }
  }, [props.selectedMenuItem, localTableData]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    nextPage,
    previousPage,
    state,
  } = useTable(
    { columns, data, initialState: { pageIndex: 0 } },
    useSortBy,
    usePagination
  );

  const filterTableData = useCallback(() => {
    let filterUserData = localTableData.userData;
    let filterGameData = localTableData.gameData;
    if (value.name.includes("address")) {
      filterUserData = filterUserData.filter(
        (item) =>
          item.address.street.includes(value.address) ||
          item.address.suite.includes(value.address) ||
          item.address.city.includes(value.address) ||
          item.address.zipcode.includes(value.address)
      );
    }

    if (value.name.includes("category")) {
      filterGameData = filterGameData.filter(
        (item) => item.genre?.toLowerCase() === value.category.toLowerCase()
      );
    }

    if (value.name.includes("date")) {
      filterGameData = filterGameData.filter(
        (item) => item.release_date.split("-")[0] === value.date
      );
    }

    if (value.name.includes("min") && value.name.includes("max")) {
      filterUserData = filterUserData.filter(
        (item) =>
          Number(item.subscription) >= Number(value.min) &&
          Number(item.subscription) <= Number(value.max)
      );
    } else if (value.name.includes("min")) {
      filterUserData = filterUserData.filter(
        (item) => Number(item.subscription) >= Number(value.min)
      );
    } else if (value.name.includes("max")) {
      filterUserData = filterUserData.filter(
        (item) => Number(item.subscription) <= Number(value.max)
      );
    }

    setLocalTableData({
      userData: filterUserData,
      gameData: filterGameData,
    });

    setShowFilterOption(false);
    setValue({
      name: [],
      min: "",
      max: "",
      date: "",
      category: "",
      address: "",
    });
  }, [value, localTableData]);

  const onClickFilterOptions = () => {
    setLocalTableData({
      userData: props.tableData.userData,
      gameData: props.tableData.gameData,
    });
    setShowFilterOption(!showFilterOption);
  };

  return (
    <React.Fragment>
      <div className="table-wrapper">
        <button className="filter-option" onClick={onClickFilterOptions}>
          <div className="btn-inner-wrapper">
            <span>Filter Options</span>
            {showFilterOption ? <ArrowDown /> : <ArrowRight />}
          </div>
        </button>
        {showFilterOption && (
          <FilterComponent
            selectedMenuItem={props.selectedMenuItem}
            useAsyncDebounce={useAsyncDebounce}
            dates={props.tableFilterData.dates}
            category={props.tableFilterData.category}
            value={value}
            setValue={setValue}
            filterTableData={filterTableData}
          />
        )}

        <table
          {...getTableProps()}
          className="tabel-container"
          data-filter={showFilterOption ? "show" : "hide"}
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.length > 0 ? (
              page.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                      );
                    })}
                  </tr>
                );
              })
            ) : (
              <tr className="no-data">
                <td colSpan={columns.length?.toString()}>No Data Available!</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {"<"}
        </button>{" "}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {">"}
        </button>
        <span>
          Page
          <strong>
            {state.pageIndex + 1} of {pageOptions.length}
          </strong>
        </span>
      </div>
    </React.Fragment>
  );
};

export default TableComponent;
