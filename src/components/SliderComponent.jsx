import React from "react";
import Slider from "../elements/Slider";
import Logo from "../elements/Logo";
import MenuItem from "../elements/MenuItem";

const SliderComponent = ({ menuItems, onClickHandler }) => {
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
      </Slider>
    </React.Fragment>
  );
};

export default SliderComponent;
