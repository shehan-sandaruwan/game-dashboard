import React from "react";
import { useTable, usePagination } from "react-table";
import { gameColumns, customerColumns, dashboardColumns } from "../constant";
import ActionComponent from "./ActionComponent";
import Avatar from "../elements/Avatar";

const TableComponent = (props) => {
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
      const clientRows = props.tableData.userData?.map((item) => {
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
      const gamesRow = props.tableData.gameData?.map((item) => {
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
      const gamesWithCustomer = props.tableData.gameData?.filter(
        (item) => item.customer_id
      );
      const dashBoardData = [];

      for (let i = 0; i < gamesWithCustomer.length; i++) {
        const custObj = props.tableData.userData?.find(
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
                {custObj.name} <span></span>
              </div>
            ),
            "dash-col3": custObj.subscription,
            "dash-col4": gamesWithCustomer[i].genre,
          };

          dashBoardData.push(dashboardObj);
        }
      }

      return dashBoardData;
    }
  }, [props.selectedMenuItem, props.tableData]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,

    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    { columns, data, initialState: { pageIndex: 0 } },
    usePagination
  );

  return (
    <React.Fragment>
      <div className="table-wrapper">
        <table {...getTableProps()} className="tabel-container">
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
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
            })}
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
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </span>
      </div>
    </React.Fragment>
  );
};

export default TableComponent;
