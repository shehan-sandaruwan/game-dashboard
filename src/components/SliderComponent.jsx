import React from "react";
import Slider from "../elements/Slider";
import Logo from "../elements/Logo";
import MenuItem from "../elements/MenuItem";
import AddButton from "../elements/AddButton";
import PropTypes from "prop-types";

const SliderComponent = ({
  menuItems,
  onClickHandler,
  selectedMenuItem,
  handleAddItem,
  showMenuItem,
  handleHamburgerClick,
}) => {
  return (
    <React.Fragment>
      <Slider
        showMenuItem={showMenuItem}
        handleHamburgerClick={handleHamburgerClick}
      >
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

SliderComponent.prototype = {
  menuItems: PropTypes.array.isRequired,
  onClickHandler: PropTypes.func.isRequired,
  selectedMenuItem: PropTypes.string.isRequired,
  handleAddItem: PropTypes.func,
  showMenuItem: PropTypes.bool,
  handleHamburgerClick: PropTypes.func,
};

export default SliderComponent;
