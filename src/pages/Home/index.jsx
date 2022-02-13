import React, { useState, useEffect, useRef } from 'react';

import EasterEgg from '../../components/EasterEgg';

import './styles.scss';

import blackSnippet from '../../media/icons/snippet_black.svg';
import whiteSnippet from '../../media/icons/snippet_white.svg';

import linkedin from '../../media/social/linkedin.svg';
import facebook from '../../media/social/facebook.svg';
import twitter from '../../media/social/twitter.svg';
import instagram from '../../media/social/instagram.svg';
import github from '../../media/social/github.svg';
import adrien from '../../media/social/adrien.png';

const Home = () => {
  const menu = useRef(null);
  const header = useRef(null);

  const [toggleSnippet1, setToggleSnippet1] = useState(false);
  const [toggleSnippet2, setToggleSnippet2] = useState(false);
  const [toggleSnippet3, setToggleSnippet3] = useState(false);
  const [toggleSnippet4, setToggleSnippet4] = useState(false);
  const [toggleSnippet5, setToggleSnippet5] = useState(false);
  const [showEasterEgg, setShowEasterEgg] = useState(false);

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

  const toggleMenu = () => {
    menu.current.classList.toggle('opened');
    header.current.classList.toggle('translate');
  };

  return (
    <main className='home'>
      <ul
        className='home__socials'
        ref={menu}
      >
        <div 
          className='home__socials__toggle'
          onClick={() => {
            toggleMenu();
          }}
        >
          <img
            src={adrien}
            alt='Adrien'
            className='home__socials__toggle__img'
          />

          <span className='home__socials__toggle__label'>
            Voir les réseaux
          </span>
        </div>

        <li
          key={1}
          className='home__socials__links social_0'
        >
          <a 
            href='https://www.linkedin.com/in/adrien-lacourpaille/'
            target='_blank'
            rel='noreferrer'
          >
            <img
              src={linkedin}
              alt='Lien vers mon LinkedIn'
              className='home__socials__links__item'
            />

            <p className='home__socials__links__label'>
              Linkedin
            </p>
          </a>
        </li>

        <li
          key={2}
          className='home__socials__links social_1'
        >
          <a 
            href='https://github.com/AdrienLcp'
            target='_blank'
            rel='noreferrer'
          >
            <img
              src={github}
              alt='Lien vers mon Github'
              className='home__socials__links__item'
            />

            <p className='home__socials__links__label'>
              Github
            </p>
          </a>
        </li>

        <li
          key={3}
          className='home__socials__links social_2'
        >
          <a 
            href='https://www.instagram.com/adrien.lcp/'
            target='_blank'
            rel='noreferrer'
          >
            <img
              src={instagram}
              alt='Lien vers mon Instagram'
              className='home__socials__links__item'
            />

            <p className='home__socials__links__label'>
              Instagram
            </p>
          </a>
        </li>

        <li
          key={4}
          className='home__socials__links social_3'
        >
          <a 
            href='https://twitter.com/Adrien_Lcp'
            target='_blank'
            rel='noreferrer'
          >
            <img
              src={twitter}
              alt='Lien vers mon Twitter'
              className='home__socials__links__item'
            />

            <p className='home__socials__links__label'>
              Twitter
            </p>
          </a>
        </li>

        <li
          key={5}
          className='home__socials__links social_4'
        >
          <a 
            href='https://www.facebook.com/profile.php?id=100008182473616'
            target='_blank'
            rel='noreferrer'
          >
            <img
              src={facebook}
              alt='Lien vers mon Facebook'
              className='home__socials__links__item'
            />

            <p className='home__socials__links__label'>
              Facebook
            </p>
          </a>
        </li>

      </ul>
      <header className='home__header' ref={header}>
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
    </main>
  );
};

export default Home;