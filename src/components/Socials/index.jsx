import React, { useRef } from 'react';

import './styles.scss';

import linkedin from '../../media/social/linkedin.svg';
import facebook from '../../media/social/facebook.svg';
import twitter from '../../media/social/twitter.svg';
import instagram from '../../media/social/instagram.svg';
import github from '../../media/social/github.svg';
import adrien from '../../media/social/adrien.png';

const Socials = (props) => {

  const menuRef = useRef(null);

  const toggleMenu = () => {
    props.setTranslateTitle(!props.translateTitle);
    menuRef.current.classList.toggle('opened');
  };

  return (
    <section className='socials'>
      
      <div className='socials__icon'>
        <img
          src={adrien}
          alt='Adrien'
          className='socials__icon__img'
        />
      </div>
      
      <ul
        className='socials__container'
        ref={menuRef}
      >
        <div
          className='socials__container__toggle'
          onClick={() => {
            toggleMenu();
          }}
        >
          <img
            src={adrien}
            alt='Adrien'
            className='socials__container__toggle__img'
          />
          <span className='socials__container__toggle__label'>
            Voir mes réseaux
          </span>
        </div>

        <li
          key={1}
          className='socials__container__links social_0'
        >
          <a
            href='https://www.linkedin.com/in/adrien-lacourpaille/'
            target='_blank'
            rel='noreferrer'
          >
            <div className='socials__container__links__item'>
              <img
                className='socials__container__links__item__img'
                src={linkedin}
                alt='Lien vers mon LinkedIn'
              />
            </div>

            <p className='socials__container__links__label'>
              Linkedin
            </p>
          </a>
        </li>

        <li
          key={2}
          className='socials__container__links social_1'
        >
          <a
            href='https://github.com/AdrienLcp'
            target='_blank'
            rel='noreferrer'
          >
            <div className='socials__container__links__item'>
              <img
                src={github}
                alt='Lien vers mon Github'
                className='socials__container__links__item__img'
              />
            </div>

            <p className='socials__container__links__label'>
              Github
            </p>
          </a>
        </li>

        <li
          key={3}
          className='socials__container__links social_2'
        >
          <a
            href='https://www.instagram.com/adrien.lcp/'
            target='_blank'
            rel='noreferrer'
          >
            <div className='socials__container__links__item'>
              <img
                src={instagram}
                alt='Lien vers mon Instagram'
                className='socials__container__links__item__img'
              />
            </div>

            <p className='socials__container__links__label'>
              Instagram
            </p>
          </a>
        </li>

        <li
          key={4}
          className='socials__container__links social_3'
        >
          <a
            href='https://twitter.com/Adrien_Lcp'
            target='_blank'
            rel='noreferrer'
          >
            <div className='socials__container__links__item'>
              <img
                src={twitter}
                alt='Lien vers mon Twitter'
                className='socials__container__links__item__img'
              />
            </div>

            <p className='socials__container__links__label'>
              Twitter
            </p>
          </a>
        </li>

        <li
          key={5}
          className='socials__container__links social_4'
        >
          <a 
            href='https://www.facebook.com/profile.php?id=100008182473616'
            target='_blank'
            rel='noreferrer'
          >
            <div className='socials__container__links__item'>
              <img
                src={facebook}
                alt='Lien vers mon Facebook'
                className='socials__container__links__item__img'
              />
            </div>

            <p className='socials__container__links__label'>
              Facebook
            </p>
          </a>
        </li>
      </ul>
    </section>
  );
};

export default Socials;