import React, { useState, useEffect } from 'react';

import Socials from '../../components/Socials';
import EasterEgg from '../../components/EasterEgg';

import './styles.scss';

import blackSnippet from '../../media/icons/snippet_black.svg';
import whiteSnippet from '../../media/icons/snippet_white.svg';

const Home = () => {

  const [toggleSnippet1, setToggleSnippet1] = useState(false);
  const [toggleSnippet2, setToggleSnippet2] = useState(false);
  const [toggleSnippet3, setToggleSnippet3] = useState(false);
  const [toggleSnippet4, setToggleSnippet4] = useState(false);
  const [toggleSnippet5, setToggleSnippet5] = useState(false);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [translateTitle, setTranslateTitle] = useState(false);

  useEffect(() => {
    document.title = "Adrien Lacourpaille";

    window.scrollTo(0, 0);
  }, []); 

  useEffect(() => {
    if (
      toggleSnippet1 === true &&
      toggleSnippet2 === true &&
      toggleSnippet3 === true &&
      toggleSnippet4 === true &&
      toggleSnippet5 === true
    ) {
      setShowEasterEgg(true);
    };
  }, [toggleSnippet1, toggleSnippet2, toggleSnippet3, toggleSnippet4, toggleSnippet5]);

  return (
    <section className='home'>

      <Socials
        setTranslateTitle={setTranslateTitle}
        translateTitle={translateTitle}
      />
      
      <header className={translateTitle ? 'home__header translate' : 'home__header'}>
        <h1 className='home__header__title'>
          Adrien Lacourpaille
        </h1>

        <h2 className='home__header__subtitle'>
          Développeur Front
        </h2>
      </header>

      <img
        src={toggleSnippet1 ? whiteSnippet : blackSnippet}
        alt="Snippets de code"
        className="home__icon1"
        onClick={() => {
          setToggleSnippet1(!toggleSnippet1);
        }}
      />
      <img
        src={toggleSnippet2 ? whiteSnippet : blackSnippet}
        alt="Snippets de code"
        className="home__icon2"
        onClick={() => {
          setToggleSnippet2(!toggleSnippet2);
        }}
      />
      <img
        src={toggleSnippet3 ? whiteSnippet : blackSnippet}
        alt="Snippets de code"
        className="home__icon3"
        onClick={() => {
          setToggleSnippet3(!toggleSnippet3);
        }}
      />
      <img
        src={toggleSnippet4 ? whiteSnippet : blackSnippet}
        alt="Snippets de code"
        className="home__icon4"
        onClick={() => {
          setToggleSnippet4(!toggleSnippet4);
        }}
      />
      <img
        src={toggleSnippet5 ? whiteSnippet : blackSnippet}
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
    </section>
  );
};

export default Home;