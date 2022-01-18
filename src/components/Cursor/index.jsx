import React, { useEffect, useRef } from 'react';

import './styles.scss';

const Cursor = () => {

  const cursor = useRef(null);

  useEffect(() => {
    document.addEventListener('mousemove', (event) => {
      const { clientX, clientY } = event;
      const mouseX = clientX - cursor.current.clientWidth / 2;
      const mouseY = clientY - cursor.current.clientHeight / 2;

      cursor.current.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    });
  }, []);

  return (
    <div
      className='cursor'
      ref={cursor}
    >
      <div className='cursor__element'></div>
    </div>
  );
};

export default Cursor;