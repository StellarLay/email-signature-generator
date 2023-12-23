import PropTypes from "prop-types";

const Popup = (props) => {
  const { message } = props;

  return (
    <div className="notification-popup">
      <span className="notification-popup__title">{message}</span>
    </div>
  );
};

Popup.propTypes = {
  message: PropTypes.string,
};

export default Popup;
