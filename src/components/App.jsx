import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react';
import Modal from './Modal/Modal';
import Searchbar from './Searchbar/Searchbar';
import FetchImages from 'services/api';
import Helpers from './Helpers/Helpers';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import css from './App.module.css';

export function App() {
  const [images, setImages] = useState([]);
  const [imageName, setImageName] = useState('');
  const [page, setPage] = useState(1);
  const [targetImage, setTargetImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [totalImages, setTotalImages] = useState(0);

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  useEffect(() => {
    if (imageName) {
      setIsLoading(true);

      FetchImages(imageName, page)
        .then(({ hits, totalHits }) => {
          if (totalHits === 0) {
            setTotalImages(0);
            return Promise.reject(new Error(`No ${imageName} images found`));
          }
          setTotalImages(totalHits);
          setImages([...images, ...Helpers(hits)]);
          setError(false);
        })
        .catch(error => {
          setError(error);
        })
        .finally(() => setIsLoading(false));
    }
  }, [imageName, page]);

  const onOpen = image => {
    setTargetImage(image);
  };

  const onClose = () => {
    setTargetImage(null);
  };

  const handleOnForm = imageName => {
    setPage(1);
    setImages([]);
    setImageName(imageName);
  };

  return (
    <div className={css.App}>
      <Searchbar onSubmit={handleOnForm} />
      <ImageGallery gallery={images} openModal={onOpen} />
      {images.length < totalImages && !isLoading && (
        <Button loadMore={loadMore} />
      )}
      {isLoading && <Loader />}
      {error && <h2>{error.message}</h2>}
      {targetImage && (
        <Modal targetImage={targetImage} closeModal={onClose}></Modal>
      )}
      <ToastContainer autoClose={3000} />
    </div>
  );
}

//  Line 45:6:  React Hook useEffect has a missing dependency:
// 'images'.Either include it or remove the dependency array.
// You can also do a functional update 'setImages(i => ...)
// ' if you only need 'images' in the 'setImages' call  react - hooks / exhaustive - deps
