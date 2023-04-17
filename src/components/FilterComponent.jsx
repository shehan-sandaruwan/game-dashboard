import React, { useCallback, useState } from "react";

const FilterComponent = ({
  selectedMenuItem,
  dates,
  category,
  useAsyncDebounce,
  value,
  setValue,
  filterTableData,
}) => {
  const onChange = useAsyncDebounce((event) => {
    const filterValues = { ...value };

    filterValues.name.push(event.target.name);
    filterValues[event.target.name] = event.target.value;

    setValue(filterValues);
  }, 200);

  const minMaxValidation = useCallback(() => {
    if (value.min && value.name.includes("max") && value.max < value.min) {
      return "invalid";
    } else if (
      value.max &&
      value.name.includes("min") &&
      value.min > value.min
    ) {
      return "invalid";
    } else {
      return "valid";
    }
  }, [value.min, value.max]);

  return (
    <React.Fragment>
      <div className="filter-container">
        {(selectedMenuItem === "Dashboard" ||
          selectedMenuItem === "Clients") && (
          <div>
            <h2>Subscription</h2>
            <div className="min-max">
              <label htmlFor="min">Min</label>
              <input
                type="number"
                id="min"
                name="min"
                onChange={onChange}
                data-valid={minMaxValidation()}
              />
              <label htmlFor="max">Max</label>
              <input
                type="number"
                id="max"
                name="max"
                onChange={onChange}
                data-valid={minMaxValidation()}
              />
            </div>
          </div>
        )}
        {selectedMenuItem === "Clients" && (
          <div>
            <h2 htmlFor="address">Address</h2>
            <input
              type="text"
              id="address"
              name="address"
              onChange={onChange}
            />
          </div>
        )}
        {selectedMenuItem === "Games" && (
          <div>
            <h2>Date Range</h2>
            <select onChange={onChange} name="date">
              <option value="">All</option>
              {dates?.map((option, i) => (
                <option key={i} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        )}
        {(selectedMenuItem === "Dashboard" || selectedMenuItem === "Games") && (
          <div>
            <h2>Category</h2>
            <select onChange={onChange} name="category">
              <option value="">All</option>
              {category?.map((option, i) => (
                <option key={i} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        )}

        <button className="filter-btn" onClick={filterTableData}>
          Filter
        </button>
      </div>
    </React.Fragment>
  );
};

export default FilterComponent;
