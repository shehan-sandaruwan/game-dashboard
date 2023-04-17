import React, { useMemo } from "react";
import { Success, Error } from "../constant";
import PropTypes from "prop-types";

const AddGameFormComponent = ({
  action,
  handleSubmitForm,
  newGameData,
  error,
  progress,
  onChangeHandler,
  onFileUpload,
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
      className="general-form add-game-form"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmitForm(action);
      }}
    >
      <div className="input-group">
        <label htmlFor="title">Name: </label>
        <input
          type="text"
          required
          id="title"
          name="title"
          value={newGameData.title}
          onChange={onChangeHandler}
        />
      </div>
      <div className="input-group">
        <label htmlFor="genre">Category: </label>
        <input
          type="text"
          required
          id="genre"
          name="genre"
          value={newGameData.genre}
          onChange={onChangeHandler}
        />
      </div>
      <div className="input-group">
        <label htmlFor="release_date">Date: </label>
        <input
          type="date"
          required
          id="release_date"
          name="release_date"
          value={newGameData.release_date}
          onChange={onChangeHandler}
        />
      </div>
      <div className="input-group">
        <label htmlFor="thumbnail">Avatar:</label>
        <input
          type="file"
          id="thumbnail"
          name="thumbnail"
          onChange={onFileUpload}
        />
        {progressComponent}
      </div>
      <hr></hr>
      <div className="modal-footer">
        <input type="submit" value={action || "Add"} />
      </div>
    </form>
  );
};

AddGameFormComponent.prototype = {
  progress: PropTypes.number,
  error: PropTypes.string,
  onFileUpload: PropTypes.func.isRequired,
  action: PropTypes.string.isRequired,
  newGameData: PropTypes.object,
  onChangeHandler: PropTypes.func,
  handleSubmitForm: PropTypes.func.isRequired,
};

export default AddGameFormComponent;
