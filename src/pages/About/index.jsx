import React, { useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import './styles.scss';

import linkedin from '../../media/social/linkedin.svg';
import facebook from '../../media/social/facebook.svg';
import twitter from '../../media/social/twitter.svg';
import instagram from '../../media/social/instagram.svg';
import github from '../../media/social/github.svg';
import adrien from '../../media/social/adrien.png';
import poupette from '../../media/img/poupette.jpg';
import poupineau from '../../media/img/poupineau.jpg';
import snippet from '../../media/icons/snippet_white.svg';
import book from '../../media/icons/book.svg';
import warehouse from '../../media/icons/warehouse.svg';
import truck from '../../media/icons/truck.svg';

const About = () => {

  const menu = useRef(null);

  useEffect(() => {
    document.title = "Adrien Lacourpaille - À propos";
  }, []);

  const toggleMenu = () => {
    menu.current.classList.toggle('opened');
  };

  return (
    <div className='about'>
      <ul
        className='about__socials'
        ref={menu}
      >
        <div 
          className='about__socials__toggle'
          onClick={() => {
            toggleMenu();
          }}
        >
          <img
            src={adrien}
            alt='Adrien'
            className='about__socials__toggle__img'
          />
          <p className='about__socials__toggle__label'>
            Voir mes réseaux
          </p>
        </div>

        <li
          key={1}
          className='about__socials__links social_0'
        >
          <a 
            href='https://www.linkedin.com/in/adrien-lacourpaille/'
            target='_blank'
            rel='noreferrer'
          >
            <img
              src={linkedin}
              alt='Lien vers mon LinkedIn'
              className='about__socials__links__item'
            />

            <p className='about__socials__links__label'>
              Linkedin
            </p>
          </a>
        </li>

        <li
          key={2}
          className='about__socials__links social_1'
        >
          <a 
            href='https://github.com/AdrienLcp'
            target='_blank'
            rel='noreferrer'
          >
            <img
              src={github}
              alt='Lien vers mon Github'
              className='about__socials__links__item'
            />

            <p className='about__socials__links__label'>
              Github
            </p>
          </a>
        </li>

        <li
          key={3}
          className='about__socials__links social_2'
        >
          <a 
            href='https://www.instagram.com/adrien.lcp/'
            target='_blank'
            rel='noreferrer'
          >
            <img
              src={instagram}
              alt='Lien vers mon Instagram'
              className='about__socials__links__item'
            />

            <p className='about__socials__links__label'>
              Instagram
            </p>
          </a>
        </li>

        <li
          key={4}
          className='about__socials__links social_3'
        >
          <a 
            href='https://twitter.com/Adrien_Lcp'
            target='_blank'
            rel='noreferrer'
          >
            <img
              src={twitter}
              alt='Lien vers mon Twitter'
              className='about__socials__links__item'
            />

            <p className='about__socials__links__label'>
              Twitter
            </p>
          </a>
        </li>

        <li
          key={5}
          className='about__socials__links social_4'
        >
          <a 
            href='https://www.facebook.com/profile.php?id=100008182473616'
            target='_blank'
            rel='noreferrer'
          >
            <img
              src={facebook}
              alt='Lien vers mon Facebook'
              className='about__socials__links__item'
            />

            <p className='about__socials__links__label'>
              Facebook
            </p>
          </a>
        </li>

      </ul>

      <section className='about__history'>
        <h3 className='about__history__title'>
          À propos de moi
        </h3>

        <p className='about__history__text'>
          Je m'appelle<span className='about__history__text_violet'>Adrien</span>, j'ai 27 ans.
          <br />
          <br />
          J'habite à côté de Nantes, et suis mobile dans tout le département (44).
          <br />
          <br />
          J'ai toujours été passionné par le monde de l'informatique, et des nouvelles technologies. Je recherche actuellement un poste de développeur front, idéalement<span className='about__history__text_violet'>React</span>.
        </p>
      </section>

      <section className='about__history'>
        <h3 className='about__history__title'>
          Mon Parcours
        </h3>

        <p className='about__history__text'>
          À la fin de mes études, j'ai travaillé 4 années en remplacements, petits CDD et intérim, dans des dizaines d'entreprises différentes. Fort de diverses expériences variées, de travail en équipe comme en autonomie, j'ai appris la ponctualité, l'assiduité ainsi que le travail minutieux et acharné.
          <br />
          <br />
          J'ai ensuite été embauché chez un grossiste de pièces pour 2 roues, en tant que magasinier : Proconcept 2 Roues (P2R), à Couëron. J'y suis resté plus de 4 ans. L'ambiance y était bonne, l'équipe était comme une seconde famille pour moi. Mais...
          <br />
          <br />
          J'ai alors fait une découverte, dont je n'avais jamais entendu parler, donc je ne soupçonnais même pas l'existence :
          L'État français offre des aides pour les reconversions. Je n'en avais jamais eu les moyens, et, bien que je n'ai jamais su quoi faire de mes études (ou après mes études), j'ai toujours été attiré par le code. J'avais été initié, dans mes jeunes années, au HTML et au CSS par le Site du Zéro.
          <br />
          <br />

          J'ai alors rempli un dossier et fait une demande pour suivre une formation chez O'Clock, et devenir développeur web, qui a été accepté.
          <br />
          <br />
          Ma formation, qui a duré 6 mois, s'est donc déroulée de février à août 2021. J'y ai appris les bases de HTML, du CSS, de JavaScript, de Node, de SQL, ... (voir
          <NavLink
            exact to='/competences'
            className='about__history__text_violet'
          >
            mes compétences
          </NavLink>
          ) Les deux derniers mois de cette formation étaient encore plus passionnants. Un mois de spécialisation sur React (que j'ai choisi, car toujours été plus attiré par le front), puis un mois de projet avec trois autres camarades. Nous avons créé un site de blind test participatif.
          <br />
          <br />
          Depuis la fin de la formation, je crée de petits projets pour m'entraîner. J'ai cependant dû trouver un travail alimentaire pour continuer de payer mon loyer, en attendant de trouver un poste de développeur.
        </p>
      </section>
      <section className='about__knowledge'>
        <h3 className='about__knowledge__title'>
          Mes expériences
        </h3>

        <p className='about__knowledge__text'>
          <img 
            className='about__knowledge__text__icon'
            alt='Icône expérience'
            src={snippet}
          />
          2022 - <span className='about__knowledge__text_bold'>Lead Dev Front</span> -<span className='about__knowledge__text_violet'>Mon propre portfolio</span>
        </p>

        <p className='about__knowledge__text'>
          <img 
            className='about__knowledge__text__icon'
            alt='Icône expérience'
            src={snippet}
          />
          2021 - <span className='about__knowledge__text_bold'>Lead Dev Front</span> -<span className='about__knowledge__text_violet'>Les Poupets</span>
        </p>

        <p className='about__knowledge__text'>
          <img 
            className='about__knowledge__text__icon'
            alt='Icône expérience'
            src={snippet}
          />
          2021 - <span className='about__knowledge__text_bold'>Lead Dev Front</span> -<span className='about__knowledge__text_violet'>MAJA</span>
        </p>

        <p className='about__knowledge__text'>
          <img 
            className='about__knowledge__text__icon'
            alt='Icône expérience'
            src={book}
          />
          2021 - <span className='about__knowledge__text_bold'>Formation Développeur Web JavaScript</span> -<span className='about__knowledge__text_violet'>O'Clock</span>
        </p>

        <p className='about__knowledge__text'>
          <img 
            className='about__knowledge__text__icon'
            alt='Icône expérience'
            src={warehouse}
          />
          2016 à 2021 - <span className='about__knowledge__text_bold'>Magasinier polyvalent</span> -<span className='about__knowledge__text_violet'>P2R - Proconcept 2 Roues</span>
        </p>

        <p className='about__knowledge__text'>
          <img 
            className='about__knowledge__text__icon'
            alt='Icône expérience'
            src={warehouse}
          />
          2015 à 2016 - <span className='about__knowledge__text_bold'>Missions intérim diverses</span> -<span className='about__knowledge__text_violet'>Absolis, Samsic, Adwork's, ...</span>
        </p>

        <p className='about__knowledge__text'>
          <img 
            className='about__knowledge__text__icon'
            alt='Icône expérience'
            src={warehouse}
          />
          2014 à 2015 - <span className='about__knowledge__text_bold'>Remplacements polyvalents</span> -<span className='about__knowledge__text_violet'>Mairie de Vertou, piscine de Vertou, ...</span>
        </p>

        <p className='about__knowledge__text'>
          <img 
            className='about__knowledge__text__icon'
            alt='Icône expérience'
            src={truck}
          />
          2014 - <span className='about__knowledge__text_bold'>Conducteur de navette</span> -<span className='about__knowledge__text_violet'>Leclerc Pôle Sud</span>
        </p>

        <p className='about__knowledge__text'>
          <img 
            className='about__knowledge__text__icon'
            alt='Icône expérience'
            src={warehouse}
          />
          2012 à 2013 - <span className='about__knowledge__text_bold'>Agent de maintenance</span> -<span className='about__knowledge__text_violet'>Maison de retraite Saint-André</span>
        </p>

        <p className='about__knowledge__text last'>
          <img 
            className='about__knowledge__text__icon'
            alt='Icône expérience'
            src={book}
          />
          2012 - <span className='about__knowledge__text_bold'>CAP Maintenance des Bâtiments</span> -<span className='about__knowledge__text_violet'>La Baugerie</span>
        </p>
      </section>

      <section className='about__history'>
        <h3 className='about__history__title'>
          Mes activités
        </h3>

        <p className='about__history__text'>
          Quand j'étais plus jeune, j'ai fait de la natation, du judo et du tennis de table, ainsi que du solfège et du piano.
          <br />
          <br />
          J'ai passé beaucoup (trop) du temps de mon adolescence devant des jeux vidéos, des films et des séries.
          <br />
          <br />
          Aujourd'hui, j'écoute pas mal de musiques de films pendant que je code. Outre le développement, je passe mon temps libre ... devant des jeux vidéos, des films et des séries. Je m'intéresse aussi au poker, et de plus en plus à la cuisine.
          <br />
          <br />
          J'ai cependant deux chats, Poupette, et son fils, Poupineau, que j'aime beaucoup et qui me donnent beaucoup d'amour. Je leur ai d'ailleurs fait un petit site (voir
          <NavLink
            exact to='/portfolio'
            className='about__history__text_violet'
          >
            mon portfolio
          </NavLink>
          ).
        </p>
        <div className='about__history__images'>
          <img
            src={poupette}
            alt='Poupette'
            className='about__history__images__item'
          />

          <img
            src={poupineau}
            alt='Poupineau'
            className='about__history__images__item'
          />
        </div>
      </section>
    </div>
  );
};

export default About;