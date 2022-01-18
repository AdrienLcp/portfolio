import React, { useState, useEffect } from 'react';

import EasterEgg from '../../components/EasterEgg';

import './styles.scss';

import blackSnippet from '../../media/icons/snippet_black.svg';
import whiteSnippet from '../../media/icons/snippet_white.svg';

const Home = () => {

  const [toggleSnippet1, setToggleSnippet1] = useState(true);
  const [toggleSnippet2, setToggleSnippet2] = useState(true);
  const [toggleSnippet3, setToggleSnippet3] = useState(true);
  const [toggleSnippet4, setToggleSnippet4] = useState(true);
  const [toggleSnippet5, setToggleSnippet5] = useState(true);
  const [showEasterEgg, setShowEasterEgg] = useState(false);

  useEffect(() => {
    document.title = "Adrien Lacourpaille";
  }, []);

  useEffect(() => {
    if (
      toggleSnippet1 === false &&
      toggleSnippet2 === false &&
      toggleSnippet3 === false &&
      toggleSnippet4 === false &&
      toggleSnippet5 === false
    ) {
      setShowEasterEgg(true);
    };
  }, [toggleSnippet1, toggleSnippet2, toggleSnippet3, toggleSnippet4, toggleSnippet5]);

  return (
    <div className='home'>
      <header className='home__header'>
        <h1 className='home__header__title'>
          Adrien Lacourpaille
        </h1>

        <h2 className='home__header__subtitle'>
          Développeur Front
        </h2>
      </header>

      <img
        src={toggleSnippet1 ? blackSnippet : whiteSnippet}
        alt="Snippets de code"
        className="home__icon1"
        onClick={() => {
          setToggleSnippet1(!toggleSnippet1);
        }}
      />
      <img
        src={toggleSnippet2 ? blackSnippet : whiteSnippet}
        alt="Snippets de code"
        className="home__icon2"
        onClick={() => {
          setToggleSnippet2(!toggleSnippet2);
        }}
      />
      <img
        src={toggleSnippet3 ? blackSnippet : whiteSnippet}
        alt="Snippets de code"
        className="home__icon3"
        onClick={() => {
          setToggleSnippet3(!toggleSnippet3);
        }}
      />
      <img
        src={toggleSnippet4 ? blackSnippet : whiteSnippet}
        alt="Snippets de code"
        className="home__icon4"
        onClick={() => {
          setToggleSnippet4(!toggleSnippet4);
        }}
      />
      <img
        src={toggleSnippet5 ? blackSnippet : whiteSnippet}
        alt="Snippets de code"
        className="home__icon5"
        onClick={() => {
          setToggleSnippet5(!toggleSnippet5);
        }}
      />
      { showEasterEgg && (
        <EasterEgg
          setShowEasterEgg={setShowEasterEgg}
        />
      )}
    </div>
  );
};

export default Home;