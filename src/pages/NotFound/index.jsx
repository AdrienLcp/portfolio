import React, { useEffect } from 'react';

import './styles.scss';

const NotFound = () => {

  useEffect(() => {
    document.title = "Page inconnue";
  }, []);

  return (
    <div className='not-found'>
      <p>Incoming soon...</p>
    </div>
  );
};

export default NotFound;