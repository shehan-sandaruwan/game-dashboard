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
import { ic_category_twotone } from "react-icons-kit/md/ic_category_twotone";
import { ic_close } from "react-icons-kit/md/ic_close";
import { ic_check_circle } from "react-icons-kit/md/ic_check_circle";
import { ic_highlight_off_twotone } from "react-icons-kit/md/ic_highlight_off_twotone";
import { ic_menu } from "react-icons-kit/md/ic_menu";
import { ic_warning_twotone } from "react-icons-kit/md/ic_warning_twotone";
import { ic_keyboard_arrow_right } from "react-icons-kit/md/ic_keyboard_arrow_right";
import { ic_keyboard_arrow_down } from "react-icons-kit/md/ic_keyboard_arrow_down";

export const IconHome = () => <Icon icon={home} size={32} />;
export const Clients = () => <Icon icon={users} size={32} />;
export const Games = () => <Icon icon={dice} size={32} />;
export const Search = () => <Icon icon={search} />;
export const Total = () => <Icon icon={calculator} size={32} />;
export const Revenue = () => <Icon icon={coinDollar} size={32} />;
export const Summery = () => <Icon icon={statsBars2} size={32} />;
export const Delete = () => <Icon icon={bin} size={16} />;
export const Plus = () => <Icon icon={plus} size={16} />;
export const Category = () => <Icon icon={ic_category_twotone} size={32} />;
export const Close = () => <Icon icon={ic_close} size={32} />;
export const Success = () => <Icon icon={ic_check_circle} size={16} />;
export const Error = () => <Icon icon={ic_highlight_off_twotone} size={16} />;
export const Menu = () => <Icon icon={ic_menu} size={32} />;
export const Warning = () => <Icon icon={ic_warning_twotone} size={32} />;
export const ArrowRight = () => (
  <Icon icon={ic_keyboard_arrow_right} size={32} />
);
export const ArrowDown = () => <Icon icon={ic_keyboard_arrow_down} size={32} />;

export const menuItemsArray = [
  { icon: <IconHome />, displayName: "Dashboard", id: "1", isActive: true },
  { icon: <Clients />, displayName: "Clients", id: "2", isActive: false },
  { icon: <Games />, displayName: "Games", id: "3", isActive: false },
];

export const dashboardSummery = [
  {
    value: 0,
    title: "Subscribed Games",
    icon: <Total />,
    color: "#0e9f6e",
    backgroundColor: "rgba(14,159,110,0.2)",
    id: 1,
  },
  {
    value: 0,
    title: "Subscribed Customers",
    icon: <Clients />,
    color: "#ff5a1f",
    backgroundColor: "rgba(255,90,31,0.2)",
    id: 2,
  },
  {
    value: 0,
    title: "Total Subscription",
    icon: <Revenue />,
    color: "#3f83f8",
    backgroundColor: "rgba(63,131,248,0.2)",
    id: 3,
  },
];

export const custSummery = [
  {
    value: 0,
    title: "Total Customers",
    icon: <Total />,
    color: "#0e9f6e",
    backgroundColor: "rgba(14,159,110,0.2)",
    id: 1,
  },
  {
    value: 0,
    title: "Total Revenue",
    icon: <Revenue />,
    color: "#3f83f8",
    backgroundColor: "rgba(63,131,248,0.2)",
    id: 2,
  },
];

export const gameSummery = [
  {
    value: 0,
    title: "Total Games",
    icon: <Total />,
    color: "#ff5a1f",
    backgroundColor: "rgba(255,90,31,0.2)",
    id: 1,
  },
  {
    value: 0,
    title: "Categories",
    icon: <Category />,
    color: "#3f83f8",
    backgroundColor: "rgba(63,131,248,0.2)",
    id: 2,
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
    Header: "Subscription ($)",
    accessor: "cust-col4",
  },
  {
    Header: "Action",
    accessor: "cust-col5",
  },
];
export const dashboardColumns = [
  {
    Header: "Game",
    accessor: "dash-col1", // accessor is the "key" in the data
  },
  {
    Header: "Subscribe Customer",
    accessor: "dash-col2",
  },
  {
    Header: "Subscription ($)",
    accessor: "dash-col3",
  },
  {
    Header: "Category",
    accessor: "dash-col4",
  },
];

export const customerData = {
  id: "",
  name: "",
  subscription: "0",
  email: "",
  avatar: "",
  address: {
    street: "",
    suite: "",
    city: "",
    zipcode: "",
  },
};

export const gameData = {
  id: "",
  title: "",
  thumbnail: "",
  genre: "",
  release_date: "",
};
