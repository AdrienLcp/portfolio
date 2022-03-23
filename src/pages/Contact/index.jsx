import React, { useEffect, useRef } from 'react';
import { useForm, ValidationError } from '@formspree/react';

import './styles.scss';

import send from '../../media/icons/send.svg';
import success from '../../media/icons/success.svg';
import mail from '../../media/icons/mail.svg';
import phone from '../../media/icons/phone.svg';
import localisation from '../../media/icons/localisation.svg';

const Contact = () => {

  const copied = useRef(null);
  const [state, handleSubmit] = useForm('mknkynke');

  useEffect(() => {
    document.title = "Adrien Lacourpaille - Contact";

    window.scrollTo(0, 0);
  }, []);

  const copyOnClipboard = (text) => {
    navigator.clipboard.writeText(text);
    copied.current.classList.add('copied');

    setTimeout(() => {
      copied.current.classList.remove('copied');
    }, 3000);
  };

  if (state.succeeded) {
    return (
      <div className='contact'>

        <h4 className='contact__title'>
          Contactez-moi
        </h4>
        <section className='contact__container'>
          <section className='contact__container__success'>
            <div className='contact__container__success__icon'>
              <img
                src={success}
                alt='Succès'
                className='contact__container__success__icon__img'
              />
            </div>
            <p className='contact__container__success__message'>
              Message envoyé !
            </p>
          </section>

          <footer className='contact__container__infos'>
            <ul className='contact__container__infos__list'>

              <li
                key={1}
                className='contact__container__infos__list__item'
              >
                <div className='contact__container__infos__list__item__icon'>
                  <img
                    src={localisation}
                    alt='Icône de la géolocalisation'
                    className='contact__container__infos__list__item__icon__img'
                  />
                </div>
                <p className='contact__container__infos__list__item__label'>
                  Couëron ~ 5 minutes de Nantes
                </p>
              </li>

              <li
                key={2}
                className='contact__container__infos__list__item'
                ref={copied}
                onClick={() => {
                  copyOnClipboard('adrienlcp@gmail.com');
                }}
              >
                <div className='contact__container__infos__list__item__icon'>
                  <img
                    src={mail}
                    alt='Icône du mail'
                    className='contact__container__infos__list__item__icon__img'
                  />
                </div>
                <p className='contact__container__infos__list__item__label'>
                  adrienlcp@gmail.com
                </p>
                <span className='contact__container__infos__list__item__span'>
                  Copié dans le presse-papier
                </span>
                <span className='contact__container__infos__list__item__hover'>
                  Cliquez pour copier le mail dans le presse-papier
                </span>
              </li>
              
              <li
                key={3}
                className='contact__container__infos__list__item'
              >
                <div className='contact__container__infos__list__item__icon'>
                  <img
                    src={phone}
                    alt='Icône du mail'
                    className='contact__container__infos__list__item__icon__img'
                  />
                </div>
                <p className='contact__container__infos__list__item__label'>
                  06.50.23.40.20
                </p>
              </li>

            </ul>
          </footer>
        </section>
      </div>
    );
  };

  return (
    <div className='contact'>

      <h4 className='contact__title'>
        Contactez-moi
      </h4>
      <section className='contact__container'>
        <form
          className='contact__container__form'
          onSubmit={handleSubmit}
        >
          <input
            className='contact__container__form__input'
            id='email'
            type='email' 
            name='email'
            placeholder='Insérez votre adresse mail'
          />
          <ValidationError
            prefix='Email' 
            field='email'
            errors={state.errors}
          />
          <textarea
            className='contact__container__form__area'
            id='message'
            name='message'
            type='text'
            placeholder='Envoyez moi un message'
          />
          <ValidationError
            prefix='Message'
            field='message'
            errors={state.errors}
          />
          <button 
            className='contact__container__form__submit'
            type='submit'
            disabled={state.submitting}
          >
            <div className='contact__container__form__submit__icon'>
              <img
                className='contact__container__form__submit__icon__img'
                alt='Envoyer le message'
                src={send}
              />
            </div>
            <p className='contact__container__form__submit__label'>
              Envoyer
            </p>
          </button>
        </form>

        <footer className='contact__container__infos'>
          <ul className='contact__container__infos__list'>

            <li
              key={1}
              className='contact__container__infos__list__item'
            >
              <div className='contact__container__infos__list__item__icon'>
                <img
                  src={localisation}
                  alt='Icône de la géolocalisation'
                  className='contact__container__infos__list__item__icon__img'
                />
              </div>
              <p className='contact__container__infos__list__item__label'>
                Couëron ~ 5 minutes de Nantes
              </p>
            </li>

            <li
              key={2}
              className='contact__container__infos__list__item mail'
              ref={copied}
              onClick={() => {
                copyOnClipboard('adrienlcp@gmail.com');
              }}
            >
              <div className='contact__container__infos__list__item__icon'>
                <img
                  src={mail}
                  alt='Icône du mail'
                  className='contact__container__infos__list__item__icon__img'
                />
              </div>
              <p className='contact__container__infos__list__item__label'>
                adrienlcp@gmail.com
              </p>
              <span className='contact__container__infos__list__item__span'>
                Copié dans le presse-papier
              </span>
              <span className='contact__container__infos__list__item__hover'>
                Cliquez pour copier le mail dans le presse-papier
              </span>
            </li>
            
            <li
              key={3}
              className='contact__container__infos__list__item'
            >
              <div className='contact__container__infos__list__item__icon'>
                <img
                  src={phone}
                  alt='Icône du mail'
                  className='contact__container__infos__list__item__icon__img'
                />
              </div>
              <p className='contact__container__infos__list__item__label'>
                06.50.23.40.20
              </p>
            </li>

          </ul>
        </footer>
      </section>
    </div>
  );
};

export default Contact;