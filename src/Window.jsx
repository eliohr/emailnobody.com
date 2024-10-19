import './Window.css';
import PropTypes from 'prop-types';
import React from 'react';

const Window = ({ data, close, oopsy, ok, profanity }) => {

  const { title, image, content, isOpen } = data;

  if (!isOpen) return null;

  return (
    <div className="window">
      <div className="window-header">
        <div className="left-stuff">
          <img className="window-image" src={image} />
          <p className="window-title">{title}</p>
        </div>
        <button className="close-button" onClick={close}></button>
      </div>
      <div className="window-contents">
        {React.cloneElement(content, { close, oopsy, ok, profanity })}
      </div>
    </div>
  );
};

Window.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.node.isRequired,
    content: PropTypes.node.isRequired,
    isOpen: PropTypes.bool.isRequired
  }).isRequired,
  close: PropTypes.func.isRequired
};

export default Window;