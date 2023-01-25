import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Component } from 'react';
import Modal from './Modal/Modal';
import Searchbar from './Searchbar/Searchbar';
import FetchImages from 'services/api';
import Helpers from './Helpers/Helpers';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import css from './App.module.css';

export class App extends Component {
  state = {
    showModal: false,
    images: [],
    imageName: '',
    page: 1,
    targetImage: null,
    isLoading: false,
    error: false,
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.imageName !== this.state.imageName) {
      this.setState({ page: 1, images: [] });
      this.getImages();
    }

    if (prevState.page !== this.state.page) {
      this.getImages();
    }
  }

  getImages = () => {
    this.setState({ isLoading: true });

    const { imageName, page } = this.state;

    if (imageName)
      FetchImages(imageName, page)
        .then(({ hits, totalHits }) => {
          if (totalHits === 0) {
            return Promise.reject(new Error(`No ${imageName} images found`));
          }
          this.setState(prevState => ({
            images: [...prevState.images, ...Helpers(hits)],
            error: false,
          }));
        })
        .catch(error => {
          this.setState(() => ({
            error: error,
          }));
        })
        .finally(() => this.setState({ isLoading: false }));
  };

  onOpen = image => {
    this.setState({
      targetImage: image,
    });
  };

  onClose = () => {
    this.setState({
      targetImage: null,
    });
  };

  handleOnForm = imageName => {
    this.setState({ imageName });
  };

  render() {
    const { images, targetImage, isLoading, error } = this.state;
    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.handleOnForm} />
        <ImageGallery gallery={images} openModal={this.onOpen} />
        {images.length > 0 && isLoading !== true && (
          <Button loadMore={this.loadMore} />
        )}
        {isLoading && <Loader />}
        {error && <h2>{error.message}</h2>}
        {targetImage && (
          <Modal targetImage={targetImage} closeModal={this.onClose}></Modal>
        )}

        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}
