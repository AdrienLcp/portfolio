import React from 'react';

import './styles.scss';

import loading from '../../media/icons/loading.svg';

const Loader = () => {

  return (
    <div className='loader'>
      <img
        className='loader__img'
        alt='Chargement...'
        src={loading}
      />
    </div>
  );
};

export default Loader;