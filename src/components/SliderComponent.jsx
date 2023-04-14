import React from "react";
import Slider from "../elements/Slider";
import Logo from "../elements/Logo";
import MenuItem from "../elements/MenuItem";
import AddButton from "../elements/AddButton";

const SliderComponent = ({
  menuItems,
  onClickHandler,
  selectedMenuItem,
  handleAddItem,
}) => {
  return (
    <React.Fragment>
      <Slider>
        <Logo />
        <ul className="menu-list">
          {menuItems.map((item) => {
            return (
              <MenuItem
                icon={item.icon}
                isActive={item.isActive}
                id={item.id}
                displayName={item.displayName}
                key={item.id}
                onClickHandler={onClickHandler}
              />
            );
          })}
        </ul>
        {(selectedMenuItem === "Games" || selectedMenuItem === "Clients") && (
          <AddButton
            selectedMenuItem={selectedMenuItem}
            handleAddItem={handleAddItem}
          />
        )}
      </Slider>
    </React.Fragment>
  );
};

export default SliderComponent;
