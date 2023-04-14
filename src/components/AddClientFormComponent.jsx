import React from "react";

const AddClientFormComponent = () => {
  return (
    <form className="general-form add-client-form">
      <div className="input-group">
        <label htmlFor="name">Name: </label>
        <input type="text" required id="name" name="name" />
      </div>
      <div className="input-group">
        <label htmlFor="email">Email: </label>
        <input type="email" required id="email" name="email" />
      </div>
      <label>Address </label>
      <div className="address-form">
        <div className="input-group">
          <label htmlFor="street">Street:</label>
          <input type="text" required id="street" name="street" />
        </div>
        <div className="input-group">
          <label htmlFor="suite">Suite:</label>
          <input type="text" required id="suite" name="suite" />
        </div>
        <div className="input-group">
          <label htmlFor="city">City:</label>
          <input type="text" required id="city" name="city" />
        </div>
        <div className="input-group">
          <label htmlFor="zipcode">Zip Code:</label>
          <input type="text" required id="zipcode" name="zipcode" />
        </div>
      </div>
      <div className="input-group">
        <label htmlFor="avatar">Avatar:</label>
        <input type="file" id="avatar" name="avatar" />
      </div>
    </form>
  );
};

export default AddClientFormComponent;
