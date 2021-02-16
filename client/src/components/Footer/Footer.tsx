import React from "react";
import {Container, Image, Row} from "react-bootstrap";
import { NavLink } from "react-router-dom";
import logo from './../../assets/img/logo.png'
import s from './Footer.module.scss'

const Footer = () => {
    return (
        <div className={s.footerWrapper}>
            <Container >
                <Row>
                  <NavLink to={'/home'}>

                    <Image src={logo} className={s.logo}/>
                  </NavLink>
                </Row>
            </Container>
        </div>
    )
}

export default Footer