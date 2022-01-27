import React from 'react';

import './styles.scss';

const ScrollBar = () => {

  // const scrollBarContainer = useRef(null);
  // const scrollBarClick = useRef(null);

  // let totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

  // window.addEventListener('scroll', () => {
  //   let progress = (document.documentElement.scrollTop / totalHeight) * 100;
  //   scrollBarContainer.current?.style.height = progress + '%';
  // });

  // const scroll = (event) => {
  //   let newPageScroll = (event.clientY / scrollBarClick.current.offsetHeight) * totalHeight;
  //   window.scrollTo({
  //     top: newPageScroll,
  //     behavior: 'smooth'
  //   });
  // };

  return (
    <div className='scrollbar'>
      {/* <div
        className='scrollbar__container'
        ref={scrollBarContainer}
      ></div>

      <div
        className='scrollbar__click'
        ref={scrollBarClick}
        onClick={(event) => {
          scroll(event);
        }}
      ></div> */}
    </div>
  );
};

export default ScrollBar;