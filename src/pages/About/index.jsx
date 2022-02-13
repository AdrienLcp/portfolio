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

    window.scrollTo(0, 0);
  }, []);

  const toggleMenu = () => {
    menu.current.classList.toggle('opened');
  };

  return (
    <div className='about'>
      <div className='about__img'>
        <img
          src={adrien}
          alt='Adrien'
          className='about__img__img'
        />
      </div>
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
        </p>
        <p className='about__history__text'>
          J'habite à côté de Nantes, et suis mobile dans tout le département (44).
        </p>
        <p className='about__history__text'>
          J'ai toujours été passionné par le monde de l'informatique, et des nouvelles technologies. Je recherche actuellement un poste de développeur front, idéalement<span className='about__history__text_violet'>React</span>.
        </p>
      </section>

      <section className='about__history'>
        <h3 className='about__history__title'>
          Mon Parcours
        </h3>

        <p className='about__history__text'>
          À la sortie du collège, je ne savais pas quoi faire de ma vie, ni quelles études faire. J'ai alors suivi un CAP en maintenance des bâtiments. J'y ai vu un moyen de sortir vite des études et entrer rapidement dans la vie active. J'ai obtenu mon diplôme en 2012.
        </p>

        <p className='about__history__text'>
          À la fin de mes études, j'ai travaillé 4 années en remplacements, petits CDD et intérim, dans des dizaines d'entreprises différentes. Fort de diverses expériences variées, de travail en équipe comme en autonomie, j'ai appris la ponctualité, l'assiduité ainsi que le travail minutieux et acharné.
        </p>

        <p className='about__history__text'>
          J'ai ensuite été embauché chez un grossiste de pièces pour 2 roues, en tant que magasinier : 
          <a
            href='https://www.p2r-expert.com/fr/'
            target='_blank'
            rel='noreferrer'
            className='about__history__text_violet'
          >
            Proconcept 2 Roues (P2R)
          </a>
          , à Couëron. J'y suis resté plus de 4 ans, l'entreprise est devenue une seconde famille pour moi.
        </p>

        <p className='about__history__text'>
          Malgré l'ambiance, le métier ne m'a jamais réellement plu, et la lassitude s'est installée. J'ai alors appris que Transition Pro finançait des formations pour des reconversions profesionnelles. J'y ai vu l'occasion de changer de vie en apprenant un nouveau métier qui me plairait davantage.
        </p>
      </section>

      <section className='about__history'>
        <h3 className="about__history__title">
          Ma formation
        </h3>

        <p className='about__history__text'>
          En février 2021, j'ai commencé la formation "Développeur JavaScript" de l'école du web O'clock, en téléprésentiel. Cette formation s'est déroulée sur un peu plus de 5 mois, et était découpée en "saisons". Les trois premiers mois étaient consacrées à l'apprentissage du HTML, du CSS, Node et surtout de Javascript. Nous avons également vu les bases de données avec PostgreSQL (voir
          <NavLink
            to='/competences'
            className='about__history__text_violet'
          >
            mes compétences
          </NavLink>).
        </p>

        <p className='about__history__text'>
          Le quatrième mois était centré sur une spécialisation, où nous avions le choix entre front et back. Étant plus à l'aise avec les intéractions, j'ai logiquement choisi d'apprendre <strong>React</strong>. Nous nous sommes concentrés sur l'apprentissage des <strong>Hooks</strong> et de React sous forme de fonctions.
        </p>

        <p className='about__history__text'>
          Le dernier mois était le plus passionnant. Nous avons pu réaliser un projet de A à Z, par équipe. J'ai alors été accompagné des géniaux Mathieu, Axel et Johanna. Nous avons suivi la méthode agile SCRUM : Johanna était Product Owner, Axel était le Git Master, Mathieu était notre Lead Dev Back, tandis que je faisais office de Lead Dev Front.
        </p>

        <p className='about__history__text'>
          Nous avons alors créé
          <a
            href='https://www.majagame.com'
            rel='noreferrer'
            target='_blank'
            className='about__history__text_violet'
          >
            MAJA
          </a> , un site de blind test participatif. J'y ai créé la plupart des pages visibles, animations et intéractions entre l'utilisateur et le serveur (le site est actuellement en maintenance pour remettre la base de données en ligne).
        </p>

        <p className='about__history__text'>
          Depuis la fin de ma formation, je continue de coder sur mon temps libre. J'ai cependant dû trouver un job, pour continuer de payer mon loyer, en attendant d'étoffer mon portfolio et d'être recruté en tant que développeur.
        </p>
      </section>

      <section className='about__knowledge'>
        <h3 className='about__knowledge__title'>
          Mes expériences
        </h3>

        <p className='about__knowledge__text'>
          <div className='about__knowledge__text__icon'>
            <img 
              className='about__knowledge__text__icon__img'
              alt='Icône expérience'
              src={snippet}
            />
          </div>
          2022 - <span className='about__knowledge__text_bold'>Lead Dev Front</span> -<span className='about__knowledge__text_violet'>Portfolio</span>
        </p>

        <p className='about__knowledge__text'>
          <div className='about__knowledge__text__icon'>
            <img 
              className='about__knowledge__text__icon__img'
              alt='Icône expérience'
              src={snippet}
            />
          </div>
          2021 - <span className='about__knowledge__text_bold'>Lead Dev Front</span> -<span className='about__knowledge__text_violet'>Les Poupets</span>
        </p>

        <p className='about__knowledge__text'>
          <div className='about__knowledge__text__icon'>
            <img 
              className='about__knowledge__text__icon__img'
              alt='Icône expérience'
              src={snippet}
            />
          </div>
          2021 - <span className='about__knowledge__text_bold'>Lead Dev Front</span> -<span className='about__knowledge__text_violet'>MAJA</span>
        </p>

        <p className='about__knowledge__text'>
          <div className='about__knowledge__text__icon'>
            <img 
              className='about__knowledge__text__icon__img'
              alt='Icône expérience'
              src={book}
            />
          </div>
          2021 - <span className='about__knowledge__text_bold'>Formation Développeur Web</span> -<span className='about__knowledge__text_violet'>O'Clock</span>
        </p>

        <p className='about__knowledge__text'>
          <div className='about__knowledge__text__icon'>
            <img 
              className='about__knowledge__text__icon__img'
              alt='Icône expérience'
              src={warehouse}
            />
          </div>
          2016 à 2021 - <span className='about__knowledge__text_bold'>Magasinier polyvalent</span> -<span className='about__knowledge__text_violet'>P2R - Proconcept 2 Roues</span>
        </p>

        <p className='about__knowledge__text'>
          <div className='about__knowledge__text__icon'>
            <img 
              className='about__knowledge__text__icon__img'
              alt='Icône expérience'
              src={warehouse}
            />
          </div>
          2015 à 2016 - <span className='about__knowledge__text_bold'>Missions intérim diverses</span> -<span className='about__knowledge__text_violet'>Absolis, Samsic, Adwork's, ...</span>
        </p>

        <p className='about__knowledge__text'>
          <div className='about__knowledge__text__icon'>
            <img 
              className='about__knowledge__text__icon__img'
              alt='Icône expérience'
              src={warehouse}
            />
          </div>
          2014 à 2015 - <span className='about__knowledge__text_bold'>Remplacements polyvalents</span> -<span className='about__knowledge__text_violet'>Mairie de Vertou, piscine de Vertou, ...</span>
        </p>

        <p className='about__knowledge__text'>
          <div className='about__knowledge__text__icon'>
            <img 
              className='about__knowledge__text__icon__img'
              alt='Icône expérience'
              src={truck}
            />
          </div>
          2014 - <span className='about__knowledge__text_bold'>Conducteur de navette</span> -<span className='about__knowledge__text_violet'>Leclerc Pôle Sud</span>
        </p>

        <p className='about__knowledge__text'>
          <div className='about__knowledge__text__icon'>
            <img 
              className='about__knowledge__text__icon__img'
              alt='Icône expérience'
              src={warehouse}
            />
          </div>
          2012 à 2013 - <span className='about__knowledge__text_bold'>Agent de maintenance</span> -<span className='about__knowledge__text_violet'>Maison de retraite Saint-André</span>
        </p>

        <p className='about__knowledge__text last'>
          <div className='about__knowledge__text__icon'>
            <img 
              className='about__knowledge__text__icon__img'
              alt='Icône expérience'
              src={book}
            />
          </div>
          2012 - <span className='about__knowledge__text_bold'>CAP Maintenance des Bâtiments</span> -<span className='about__knowledge__text_violet'>La Baugerie</span>
        </p>
      </section>

      <section className='about__history'>
        <h3 className='about__history__title'>
          Mes activités
        </h3>

        <p className='about__history__text'>
          Plus jeune, j'ai fait de la natation, du judo et du tennis de table, ainsi que du solfège et du piano.
        </p>
          
        <p className='about__history__text'>
          J'ai passé beaucoup (trop) du temps de mon adolescence devant des jeux vidéos, des films et des séries.
        </p>
        <p className='about__history__text'>
          Aujourd'hui, j'écoute pas mal de musiques de films pendant que je code. Outre le développement, je passe mon temps libre ... devant des jeux vidéos, des films et des séries. Je m'intéresse aussi au poker et aux nouvelles technologies.
        </p>
        <p className='about__history__text'>
          J'ai deux chats, Poupette, et son fils, Poupineau, que j'aime beaucoup et qui me donnent beaucoup d'amour. Je leur ai d'ailleurs fait un petit site (voir
          <NavLink
            to='/projets'
            className='about__history__text_violet'
          >
            mes projets
          </NavLink>
          ).
        </p>
        <div className='about__history__images'>
          <div className='about__history__images__item'>
            <img
              src={poupette}
              alt='Poupette'
              className='about__history__images__item__img'
            />
          </div>
          <div className='about__history__images__item'>
            <img
              src={poupineau}
              alt='Poupineau'
              className='about__history__images__item__img'
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;