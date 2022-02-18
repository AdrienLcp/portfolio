import React, { useEffect, useRef } from 'react';

import './styles.scss';

const Cursor = () => {

  const cursorRef = useRef(null);
  const pulseRef = useRef(null);

  useEffect(() => {
    if (document.documentElement.clientWidth >= 850) {
      document.addEventListener('mousemove', (event) => {
        const { clientX, clientY } = event;
        const mouseX = clientX - cursorRef.current.clientWidth / 2;
        const mouseY = clientY - cursorRef.current.clientHeight / 2;

        cursorRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
      });

      document.addEventListener('click', () => {
        pulseRef.current.classList.add('pulse');

        setTimeout(() => {
          pulseRef.current.classList.remove('pulse');
        }, 300);
      });
    };
  }, []);

  return (
    <div
      className='cursor'
      ref={cursorRef}
    >
      <div 
        className='cursor__element'
        ref={pulseRef}
      ></div>
    </div>
  );
};

export default Cursor;