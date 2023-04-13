import { Icon } from "react-icons-kit";
import { home } from "react-icons-kit/icomoon/home";
import { users } from "react-icons-kit/icomoon/users";
import { dice } from "react-icons-kit/icomoon/dice";
import { search } from "react-icons-kit/icomoon/search";
import { calculator } from "react-icons-kit/icomoon/calculator";
import { coinDollar } from "react-icons-kit/icomoon/coinDollar";
import { statsBars2 } from "react-icons-kit/icomoon/statsBars2";
import { bin } from "react-icons-kit/icomoon/bin";
import { plus } from "react-icons-kit/icomoon/plus";

export const IconHome = () => <Icon icon={home} size={32} />;
export const Clients = () => <Icon icon={users} size={32} />;
export const Games = () => <Icon icon={dice} size={32} />;
export const Search = () => <Icon icon={search} />;
export const Total = () => <Icon icon={calculator} size={32} />;
export const Revenue = () => <Icon icon={coinDollar} size={32} />;
export const Summery = () => <Icon icon={statsBars2} size={32} />;
export const Delete = () => <Icon icon={bin} size={16} />;
export const Plus = () => <Icon icon={plus} size={16} />;

export const menuItemsArray = [
  { icon: <IconHome />, displayName: "Dashboard", id: "1", isActive: true },
  { icon: <Clients />, displayName: "Clients", id: "2", isActive: false },
  { icon: <Games />, displayName: "Games", id: "3", isActive: false },
];

export const dashboardSummery = [
  {
    value: 0,
    title: "Total Games",
    icon: <Total />,
    color: "#0e9f6e",
    backgroundColor: "rgba(14,159,110,0.2)",
    id: 1,
  },
  {
    value: 0,
    title: "Total Customers",
    icon: <Clients />,
    color: "#ff5a1f",
    backgroundColor: "rgba(255,90,31,0.2)",
    id: 2,
  },
  {
    value: 0,
    title: "Total Revenue",
    icon: <Revenue />,
    color: "#3f83f8",
    backgroundColor: "rgba(63,131,248,0.2)",
    id: 3,
  },
];

export const gameColumns = [
  {
    Header: "Name",
    accessor: "game-col1", // accessor is the "key" in the data
  },
  {
    Header: "Category",
    accessor: "game-col2",
  },
  {
    Header: "Creation Date",
    accessor: "game-col3",
  },
  {
    Header: "Action",
    accessor: "game-col4",
  },
];

export const customerColumns = [
  {
    Header: "Name",
    accessor: "cust-col1", // accessor is the "key" in the data
  },
  {
    Header: "Email",
    accessor: "cust-col2",
  },
  {
    Header: "Address",
    accessor: "cust-col3",
  },
  {
    Header: "Action",
    accessor: "cust-col4",
  },
];
