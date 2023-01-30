import PropTypes from 'prop-types';
import { useEffect } from 'react';
import css from './Modal.module.css';

const Modal = ({ closeModal, targetImage }) => {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeModal]);

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      closeModal();
    }
  };

  return (
    <div className={css.Overlay} onClick={handleBackdropClick}>
      <div className={css.Modal}>
        <img
          src={targetImage.image.largeImageURL}
          alt={targetImage.image.tags}
        ></img>
      </div>
    </div>
  );
};

export default Modal;

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  image: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),
};
