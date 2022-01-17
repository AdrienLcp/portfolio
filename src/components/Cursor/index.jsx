import React, { useEffect, useRef } from 'react';

import './styles.scss';

const Cursor = () => {

  const cursor = useRef(null);

  useEffect(() => {
    document.addEventListener('mousemove', (event) => {
      const { clientX, clientY } = event;
      const mouseX = clientX - cursor.current.clientWidth / 2;
      const mouseY = clientY - cursor.current.clientHeight / 2;

      cursor.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) rotate(45deg)`;
    });
  }, []);

  return (
    <div className='cursor' ref={cursor}>
    </div>
  );
};

export default Cursor;