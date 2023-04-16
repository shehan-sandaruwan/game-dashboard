import React, { useMemo } from "react";
import { Success, Error } from "../constant";

const AddClientFormComponent = ({
  progress,
  error,
  onFileUpload,
  action,
  newCustomerData,
  onChangeHandler,
  handleSubmitForm,
}) => {
  const progressComponent = useMemo(() => {
    if (progress === 100) {
      return (
        <div className="file-upload-success">
          <Success />
        </div>
      );
    } else if (progress === -1) {
      return (
        <div className="file-upload-error">
          <Error />
          <span>{error}</span>
        </div>
      );
    } else if (progress === 0) {
      return (
        <div className="file-upload-progress">
          <span>File uploading...</span>
        </div>
      );
    }
  }, [progress]);
  return (
    <form
      className="general-form add-client-form"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmitForm(action);
      }}
    >
      <div className="input-group">
        <label htmlFor="name">Name: </label>
        <input
          type="text"
          required
          id="name"
          name="name"
          value={newCustomerData.name}
          onChange={onChangeHandler}
        />
      </div>
      <div className="input-group">
        <label htmlFor="email">Email: </label>
        <input
          type="email"
          required
          id="email"
          name="email"
          value={newCustomerData.email}
          onChange={onChangeHandler}
        />
      </div>
      <label>Address </label>
      <div className="address-form">
        <div className="input-group">
          <label htmlFor="street">Street:</label>
          <input
            type="text"
            required
            id="street"
            name="street"
            value={newCustomerData.address.street}
            onChange={onChangeHandler}
          />
        </div>
        <div className="input-group">
          <label htmlFor="suite">Suite:</label>
          <input
            type="text"
            required
            id="suite"
            name="suite"
            value={newCustomerData.address.suite}
            onChange={onChangeHandler}
          />
        </div>
        <div className="input-group">
          <label htmlFor="city">City:</label>
          <input
            type="text"
            required
            id="city"
            name="city"
            value={newCustomerData.address.city}
            onChange={onChangeHandler}
          />
        </div>
        <div className="input-group">
          <label htmlFor="zipcode">Zip Code:</label>
          <input
            type="text"
            required
            id="zipcode"
            name="zipcode"
            value={newCustomerData.address.zipcode}
            onChange={onChangeHandler}
          />
        </div>
      </div>
      <div className="input-group">
        <label htmlFor="avatar">Avatar:</label>
        <input type="file" id="avatar" name="avatar" onChange={onFileUpload} />
        {progressComponent}
      </div>
      <hr></hr>
      <div className="modal-footer">
        <input type="submit" value={action || "Add"} />
      </div>
    </form>
  );
};

export default AddClientFormComponent;
