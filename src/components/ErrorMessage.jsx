import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "./ErrorMessage.css";

const ErrorMessage = ({ isError, errorMessage, onClick, ...props }) => {
  return (
    <div
      className={`error-message-container${isError ? " error" : ""}`}
      {...props}
    >
      {isError && (
        // This component is not structured how it should,
        // But this is done to keep backwards compatibility
        <h3 data-test="error-text">
          <button className="error-button" onClick={onClick} data-test="button-close-error" title="error-close-button">
            <FontAwesomeIcon icon={faTimes} />
          </button>
          {errorMessage}
        </h3>
      )}
    </div>
  );
};

ErrorMessage.propTypes = {
  /**
   * If this is an isError field yes or no
   */
  isError: PropTypes.bool.isRequired,
  /**
   * The value of the input
   */
  errorMessage: PropTypes.string.isRequired,
  /**
   * The on change handler
   */
  onClick: PropTypes.func.isRequired,
};

export default ErrorMessage;
