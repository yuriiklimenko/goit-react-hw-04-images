import { MagnifyingGlass } from 'react-loader-spinner';

import css from './Loader.module.css';

const Loader = () => {
  return (
    <div className={css.Loader}>
      <MagnifyingGlass
        visible={true}
        height="90"
        width="90"
        ariaLabel="MagnifyingGlass-loading"
        wrapperStyle={{}}
        wrapperClass="MagnifyingGlass-wrapper"
        glassColor="#c0efff"
        color="#3f51b5"
      />
    </div>
  );
};

export default Loader;
