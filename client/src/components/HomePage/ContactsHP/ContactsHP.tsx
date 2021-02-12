import React from "react";
import {Container, Row} from "react-bootstrap";
import s from './ContactsHP.module.scss'
import { FiPhoneCall } from 'react-icons/fi'
import { AiOutlineInstagram } from 'react-icons/ai'
import { FaTelegramPlane } from 'react-icons/fa'
import { MdMailOutline } from 'react-icons/md'

const ContactsHP = () => {
    return (
        <Container className={s.contactsWrapper}>
            <Row className={s.titleContainer}>
                <h2 className={s.title}>Контакты</h2>
            </Row>
            <Row className={s.descriptionContainer}>
                <p className={s.description}>По любым вопросам вы можете связаться со мной по телефону или в социальных сетях.</p>
            </Row>
            <Row className={s.iconsWrapper}>
                <a className={s.iconContainer} href='tel:+375258431888'>
                    <FiPhoneCall className={s.icon}/>
                    +375 25 843 18 88
                </a>
                <a className={s.iconContainer}>
                    <AiOutlineInstagram  className={s.icon}/>
                    aperiti.v

                </a>
                <a className={s.iconContainer}>
                    <FaTelegramPlane  className={s.icon}/>
                    Alesya
                </a>
                <a className={s.iconContainer}>
                    <MdMailOutline  className={s.icon}/>
                    hello@gmail.com
                </a>
            </Row>
        </Container>
    )
}

export default ContactsHP