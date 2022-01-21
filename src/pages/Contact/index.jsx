import React, { useEffect } from 'react';
import { useForm, ValidationError } from '@formspree/react';

import './styles.scss';

import send from '../../media/icons/send.svg';
import success from '../../media/icons/success.svg';
import mail from '../../media/icons/mail.svg';
import phone from '../../media/icons/phone.svg';
import localisation from '../../media/icons/localisation.svg';

const Contact = () => {

  const [state, handleSubmit] = useForm('mknkynke');

  useEffect(() => {
    document.title = "Adrien Lacourpaille - Contact";
  }, []);

  if (state.succeeded) {
    return (
      <div className='contact'>
        <section className='contact__success'>
          <img
            src={success}
            alt='Succès'
            className='contact__success__icon'
          />
          <p className='contact__success__message'>
            Message envoyé !
          </p>
        </section>

        <section className='contact__infos'>
          <ul className='contact__infos__list'>

            <li
              key={1}
              className='contact__infos__list__item'
            >
              <img
                src={localisation}
                alt='Icône de la géolocalisation'
                className='contact__infos__list__item__icon'
              />
              <p className='contact__infos__list__item__label'>
                Couëron ~ 5 minutes de Nantes
              </p>
            </li>

            <li
              key={2}
              className='contact__infos__list__item'
            >
              <img
                src={mail}
                alt='Icône du mail'
                className='contact__infos__list__item__icon'
              />
              <p className='contact__infos__list__item__label'>
                adrienlcp@gmail.com
              </p>
            </li>
            
            <li
              key={3}
              className='contact__infos__list__item'
            >
              <img
                src={phone}
                alt='Icône du mail'
                className='contact__infos__list__item__icon'
              />
              <p className='contact__infos__list__item__label'>
                06.50.23.40.20
              </p>
            </li>

          </ul>
        </section>
      </div>
    );
  };

  return (
    <div className='contact'>
      <form
        className='contact__form'
        onSubmit={handleSubmit}
      >
        <input
          className='contact__form__input'
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
          className='contact__form__area'
          id='message'
          name='message'
          placeholder='Envoyez moi un message'
        />
        <ValidationError
          prefix='Message'
          field='message'
          errors={state.errors}
        />
        <button 
          className='contact__form__submit'
          type='submit'
          disabled={state.submitting}
        >
          <img
            className='contact__form__submit__icon'
            alt='Envoyer les message'
            src={send}
          />
          <p className='contact__form__submit__label'>
            Envoyer
          </p>
        </button>
      </form>

      <section className='contact__infos'>
        <ul className='contact__infos__list'>

          <li
            key={1}
            className='contact__infos__list__item'
          >
            <img
              src={localisation}
              alt='Icône de la géolocalisation'
              className='contact__infos__list__item__icon'
            />
            <p className='contact__infos__list__item__label'>
              Couëron ~ 5 minutes de Nantes
            </p>
          </li>

          <li
            key={2}
            className='contact__infos__list__item'
          >
            <img
              src={mail}
              alt='Icône du mail'
              className='contact__infos__list__item__icon'
            />
            <p className='contact__infos__list__item__label'>
              adrienlcp@gmail.com
            </p>
          </li>
          
          <li
            key={3}
            className='contact__infos__list__item'
          >
            <img
              src={phone}
              alt='Icône du mail'
              className='contact__infos__list__item__icon'
            />
            <p className='contact__infos__list__item__label'>
              06.50.23.40.20
            </p>
          </li>

        </ul>
      </section>
    </div>
  );
};

export default Contact;