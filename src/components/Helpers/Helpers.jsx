// повертає масив обєктів без не потрібних властивостей
const Helpers = images => {
  return images.map(({ id, webformatURL, largeImageURL, tags }) => ({
    id,
    webformatURL,
    largeImageURL,
    tags,
  }));
};

export default Helpers;
