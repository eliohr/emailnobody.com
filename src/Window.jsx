import './Window.css';
import PropTypes from 'prop-types';

const Window = ({ data, close }) => {

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

      <div className="window-content">
        { content }
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