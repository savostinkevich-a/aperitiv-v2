import React from 'react';
import { Container, Row } from 'react-bootstrap';
import s from './Contacts.module.scss';
import { FiPhoneCall } from 'react-icons/fi';
import { AiOutlineInstagram } from 'react-icons/ai';
import { FaTelegramPlane } from 'react-icons/fa';
import { MdMailOutline } from 'react-icons/md';

import Telegram from '../../../assets/svg/TelegramLogo.svg';

const Contacts = () => {
  return (
    <Container className={s.contactsWrapper} fluid={'md'} id='contacts'>

      <Row className={s.titleContainer}>
        <h2 className={s.title}>Контакты</h2>
      </Row>
      <Row className={s.descriptionContainer}>
        <p className={s.description}>По любым вопросам вы можете связаться со мной по телефону или в социальных
          сетях.</p>
      </Row>
      <Row className={s.iconsWrapper} xs={2} sm={4}>
        <a className={s.iconContainer} href='tel:+375258431888'>
          <svg className={s.icon} width="40" height="40" viewBox="0 0 40 40" fill="none"
               xmlns="http://www.w3.org/2000/svg">
            <path
              d="M24.9087 6.25C27.0277 6.8199 28.9599 7.9366 30.5115 9.48823C32.0631 11.0399 33.1798 12.972 33.7497 15.091"
              stroke="#DDD6CE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path
              d="M23.6145 11.0808C24.8859 11.4228 26.0452 12.0928 26.9762 13.0238C27.9072 13.9547 28.5772 15.114 28.9191 16.3854"
              stroke="#DDD6CE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path
              d="M14.4494 19.5024C15.746 22.1533 17.8948 24.2922 20.5515 25.5768C20.7459 25.6689 20.9609 25.7088 21.1754 25.6926C21.3899 25.6763 21.5964 25.6045 21.7747 25.4842L25.6866 22.8757C25.8596 22.7604 26.0586 22.69 26.2657 22.671C26.4728 22.6519 26.6813 22.6849 26.8724 22.7668L34.1907 25.9032C34.4393 26.0088 34.6469 26.1923 34.7821 26.4262C34.9173 26.66 34.9729 26.9314 34.9405 27.1996C34.7092 29.0096 33.826 30.6732 32.4564 31.879C31.0869 33.0847 29.3247 33.7499 27.5 33.75C21.8641 33.75 16.4591 31.5112 12.474 27.526C8.48883 23.5409 6.25 18.1359 6.25 12.5C6.2501 10.6753 6.9153 8.91317 8.12106 7.54359C9.32683 6.174 10.9905 5.29087 12.8005 5.05956C13.0686 5.02711 13.34 5.08269 13.5739 5.21791C13.8077 5.35313 13.9912 5.56068 14.0968 5.80929L17.236 13.134C17.3172 13.3234 17.3502 13.53 17.3323 13.7353C17.3143 13.9407 17.2458 14.1384 17.1329 14.3109L14.5335 18.2827C14.4152 18.4614 14.3453 18.6677 14.3305 18.8815C14.3158 19.0952 14.3567 19.3092 14.4494 19.5024V19.5024Z"
              stroke="#DDD6CE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          +375 25 843 18 88
        </a>
        <a className={s.iconContainer}>
          <svg className={s.icon} width="32" height="31" viewBox="0 0 32 31" fill="none"
               xmlns="http://www.w3.org/2000/svg">
            <path
              d="M16 21.625C19.4518 21.625 22.25 18.8268 22.25 15.375C22.25 11.9232 19.4518 9.125 16 9.125C12.5482 9.125 9.75 11.9232 9.75 15.375C9.75 18.8268 12.5482 21.625 16 21.625Z"
              stroke="#DDD6CE" stroke-width="2" stroke-miterlimit="10" />
            <path
              d="M22.875 1H9.125C4.98286 1 1.625 4.35786 1.625 8.5V22.25C1.625 26.3921 4.98286 29.75 9.125 29.75H22.875C27.0171 29.75 30.375 26.3921 30.375 22.25V8.5C30.375 4.35786 27.0171 1 22.875 1Z"
              stroke="#DDD6CE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path
              d="M24.125 9.125C25.1605 9.125 26 8.28553 26 7.25C26 6.21447 25.1605 5.375 24.125 5.375C23.0895 5.375 22.25 6.21447 22.25 7.25C22.25 8.28553 23.0895 9.125 24.125 9.125Z"
              fill="#EAE8DF" stroke="#DDD6CE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          aperiti.v

        </a>
        <a className={s.iconContainer}>
          <svg className={s.icon} width="40" height="40" viewBox="0 0 40 40" fill="none"
               xmlns="http://www.w3.org/2000/svg">
            <path
              d="M13.75 21.0738L27.7995 33.4374C27.9621 33.5804 28.159 33.6788 28.371 33.7228C28.5831 33.7669 28.8029 33.7551 29.009 33.6887C29.215 33.6222 29.4003 33.5034 29.5467 33.3438C29.693 33.1841 29.7954 32.9893 29.8437 32.7782L35.7209 7.13249C35.7717 6.91076 35.761 6.67936 35.6901 6.46324C35.6191 6.24711 35.4905 6.05446 35.3181 5.90603C35.1457 5.7576 34.9361 5.65902 34.7118 5.62093C34.4875 5.58283 34.2571 5.60665 34.0454 5.68983L5.2084 17.0187C4.95708 17.1174 4.74449 17.2948 4.60243 17.5245C4.46038 17.7541 4.3965 18.0236 4.42036 18.2925C4.44421 18.5615 4.55452 18.8155 4.73478 19.0166C4.91503 19.2176 5.15554 19.3549 5.42032 19.4078L13.75 21.0738Z"
              stroke="#DDD6CE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M13.75 21.0738L35.0175 5.71387" stroke="#DDD6CE" stroke-width="2" stroke-linecap="round"
                  stroke-linejoin="round" />
            <path
              d="M20.7667 27.2484L15.8839 32.1313C15.7091 32.3061 15.4863 32.4252 15.2439 32.4734C15.0014 32.5216 14.7501 32.4969 14.5216 32.4023C14.2932 32.3077 14.098 32.1474 13.9607 31.9419C13.8233 31.7363 13.75 31.4946 13.75 31.2474V21.0737"
              stroke="#DDD6CE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          Alesya
        </a>
        <a className={s.iconContainer}>
          <svg className={s.icon} width="40" height="40" viewBox="0 0 40 40" fill="none"
               xmlns="http://www.w3.org/2000/svg">
            <path d="M35 8.75L20 22.5L5 8.75" stroke="#DDD6CE" stroke-width="2" stroke-linecap="round"
                  stroke-linejoin="round" />
            <path
              d="M5 8.75H35V30C35 30.3315 34.8683 30.6495 34.6339 30.8839C34.3995 31.1183 34.0815 31.25 33.75 31.25H6.25C5.91848 31.25 5.60054 31.1183 5.36612 30.8839C5.1317 30.6495 5 30.3315 5 30V8.75Z"
              stroke="#DDD6CE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M17.2728 20L5.38547 30.8967" stroke="#DDD6CE" stroke-width="2" stroke-linecap="round"
                  stroke-linejoin="round" />
            <path d="M34.6146 30.8968L22.7271 20" stroke="#DDD6CE" stroke-width="2" stroke-linecap="round"
                  stroke-linejoin="round" />
          </svg>
          hello@gmail.com
        </a>
      </Row>
    </Container>
  );
};

export default Contacts;