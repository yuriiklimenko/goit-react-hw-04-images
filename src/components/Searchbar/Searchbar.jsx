import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import css from './Searchbar.module.css';
import { AiOutlineSearch } from 'react-icons/ai';
import { useState } from 'react';

const Searchbar = ({ onSubmit }) => {
  const [imageName, setImageName] = useState('');

  const handleNameChange = e => {
    setImageName(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (imageName.trim() === '') {
      toast.error('Enter the name of the picture');
      return;
    }

    onSubmit(imageName);

    setImageName('');
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleSubmit}>
        <button className={css.SearchFormButton} type="submit">
          <AiOutlineSearch className={css.SearchFormButtonLabel} />
        </button>

        <input
          className={css.SearchFormInput}
          name="imageName"
          value={imageName}
          onChange={handleNameChange}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
