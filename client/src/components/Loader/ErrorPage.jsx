import React from "react";
import logo from './../../assets/img/logo.png'
import s from './Loader.module.scss'
import { NavLink } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const ErrorPage = () => {
  return(
    <div className={s.loaderContainer}>
      <h1>Тут нужно прписать сообщение об ошибке</h1>
      <Button type='link' href={'/home'}>
        Вернуться на главную страницу
      </Button>
    </div>
  )
}

export default ErrorPage